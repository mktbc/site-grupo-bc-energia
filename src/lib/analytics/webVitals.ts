/**
 * RUM — Real User Monitoring do Grupo BC Energia.
 *
 * Mede performance de usuários reais, em dispositivos reais, por ROTA real,
 * incluindo navegações internas da SPA. Sem biblioteca externa: apenas
 * `PerformanceObserver` + Performance API nativas.
 *
 * Destino: o MESMO Data Layer já usado pelo site (GTM/GA4). Nenhum sistema
 * paralelo, nenhum SDK no caminho crítico, nenhum dado pessoal.
 *
 * Eventos emitidos:
 *  - `web_vital`        → LCP, CLS, INP, FCP, TTFB (com rating e rota)
 *  - `route_performance`→ tempo de transição entre rotas na SPA
 *  - `chunk_load_error` → falha ao carregar o código de uma rota
 *
 * Amostragem: 20% das sessões, mas métricas "poor" são sempre enviadas.
 */
import { pushDataLayerEvent } from './dataLayer'
import { getPageType } from './pageType'

type Metric = 'LCP' | 'CLS' | 'INP' | 'FCP' | 'TTFB'
type Rating = 'good' | 'needs-improvement' | 'poor'

/** Percentual de sessões amostradas. Ajustável conforme o volume de tráfego. */
const SAMPLE_RATE = 0.2

/** Transição de rota acima disso é considerada lenta (ver alertas no doc). */
const SLOW_TRANSITION_MS = 1000

const THRESHOLDS: Record<Metric, [number, number]> = {
  LCP: [2500, 4000],
  INP: [200, 500],
  CLS: [0.1, 0.25],
  FCP: [1800, 3000],
  TTFB: [800, 1800]
}

const isDev = import.meta.env.DEV

const state = {
  started: false,
  sampled: false,
  values: {} as Partial<Record<Metric, number>>,
  sent: new Set<Metric>(),
  navigationType: 'initial' as 'initial' | 'soft',
  route: typeof window === 'undefined' ? '/' : window.location.pathname,
  previousRoute: undefined as string | undefined,
  transitionStart: undefined as number | undefined,
  transitionFrom: undefined as string | undefined,
  // Instante do clique no link interno: a transição começa na intenção do
  // usuário, não no commit do router.
  pendingStart: undefined as number | undefined
}

/* ------------------------------------------------------------------ */
/* Normalização de rota — sem query string, sem PII, sem cardinalidade */
/* ------------------------------------------------------------------ */

const trimSlash = (path: string): string =>
  path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path

/**
 * Padrão da rota (dimensão de baixa cardinalidade).
 * Ex.: `/conteudo/blog/energia-solar` → `/conteudo/blog/:slug`
 */
export const getRoutePattern = (pathname: string): string => {
  const path = trimSlash(pathname)
  const parts = path.split('/').filter(Boolean)

  if (parts.length === 0) return '/'

  const [first, second] = parts

  if (first === 'produtos') return parts.length > 1 ? '/produtos/:slug' : '/produtos'
  if (first === 'segmentos') return parts.length > 1 ? '/segmentos/:slug' : '/segmentos'
  if (first === 'sobre') return parts.length > 1 ? `/sobre/${second}` : '/sobre'
  if (first === 'conteudo') {
    if (second === 'blog') return parts.length > 2 ? '/conteudo/blog/:slug' : '/conteudo/blog'
    if (second === 'bc-cast')
      return parts.length > 2 ? '/conteudo/bc-cast/:slug' : '/conteudo/bc-cast'
    return parts.length > 1 ? `/conteudo/${second}` : '/conteudo'
  }
  if (first === 'contato') return parts.length > 1 ? '/contato/:step' : '/contato'

  // Regionais e institucionais de primeiro nível mantêm o caminho real.
  return parts.length > 2 ? `/${first}/${second}` : path
}

/* ------------------------------------------------------------------ */
/* Contexto do dispositivo (amplo — nunca fingerprinting)              */
/* ------------------------------------------------------------------ */

const rate = (metric: Metric, value: number): Rating => {
  const [good, poor] = THRESHOLDS[metric]
  if (value <= good) return 'good'
  return value <= poor ? 'needs-improvement' : 'poor'
}

const deviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const width = window.innerWidth
  if (width < 768) return 'mobile'
  return width < 1024 ? 'tablet' : 'desktop'
}

const connectionType = (): string | undefined => {
  const nav = navigator as Navigator & { connection?: { effectiveType?: string } }
  return nav.connection?.effectiveType
}

const baseContext = (route: string) => ({
  route,
  route_pattern: getRoutePattern(route),
  page_type: getPageType(route),
  device_type: deviceType(),
  viewport_width: window.innerWidth,
  connection_type: connectionType()
})

/* ------------------------------------------------------------------ */
/* Coleta                                                              */
/* ------------------------------------------------------------------ */

const record = (metric: Metric, value: number): void => {
  const current = state.values[metric]
  // CLS acumula no trecho; as demais guardam o maior valor observado.
  if (metric === 'CLS') state.values[metric] = (current ?? 0) + value
  else state.values[metric] = Math.max(current ?? 0, value)
}

/** Envia o valor FINAL de cada métrica do trecho atual (nunca por frame). */
const flush = (): void => {
  ;(Object.keys(state.values) as Array<Metric>).forEach((metric) => {
    if (state.sent.has(metric)) return
    const value = state.values[metric]
    if (value === undefined) return

    const rating = rate(metric, value)
    // Fora da amostra, ainda assim reportamos o que está ruim.
    if (!state.sampled && rating !== 'poor') return

    state.sent.add(metric)

    const payload = {
      event: 'web_vital' as const,
      metric_name: metric,
      metric_value: metric === 'CLS' ? Number(value.toFixed(3)) : Math.round(value),
      metric_rating: rating,
      navigation_type: state.navigationType,
      previous_route: state.previousRoute,
      ...baseContext(state.route)
    }

    pushDataLayerEvent(payload)
    if (isDev) {
      // eslint-disable-next-line no-console
      console.debug('[rum]', payload)
    }
  })
}

const observe = (type: string, callback: (entries: PerformanceEntryList) => void): void => {
  try {
    const observer = new PerformanceObserver((list) => callback(list.getEntries()))
    observer.observe({ type, buffered: true } as PerformanceObserverInit)
  } catch {
    /* tipo de entrada não suportado no navegador — ignora silenciosamente */
  }
}

/** Falha ao carregar o código (chunk) de uma rota — sempre reportada. */
export const reportChunkLoadError = (route: string): void => {
  pushDataLayerEvent({
    event: 'chunk_load_error',
    ...baseContext(route)
  })
}

/** Inicializa a coleta. Chamado uma única vez, no boot da aplicação. */
export const initWebVitals = (): void => {
  if (state.started || typeof window === 'undefined') return
  if (typeof PerformanceObserver === 'undefined') return

  state.started = true
  // Em desenvolvimento (ou com a flag de QA) medimos 100% para conferência.
  const forced = isDev || window.localStorage?.getItem('bc_rum_debug') === '1'
  state.sampled = forced || Math.random() < SAMPLE_RATE
  state.route = window.location.pathname

  observe('largest-contentful-paint', (entries) => {
    const last = entries[entries.length - 1]
    if (last) record('LCP', last.startTime)
  })

  observe('paint', (entries) => {
    const fcp = entries.find((entry) => entry.name === 'first-contentful-paint')
    if (fcp) record('FCP', fcp.startTime)
  })

  observe('layout-shift', (entries) => {
    entries.forEach((entry) => {
      const shift = entry as PerformanceEntry & { value: number; hadRecentInput: boolean }
      if (!shift.hadRecentInput) record('CLS', shift.value)
    })
  })

  observe('event', (entries) => {
    entries.forEach((entry) => {
      const event = entry as PerformanceEntry & { duration: number; interactionId?: number }
      if (event.interactionId) record('INP', event.duration)
    })
  })

  const navigation = performance.getEntriesByType('navigation')[0] as
    | PerformanceNavigationTiming
    | undefined
  if (navigation) record('TTFB', navigation.responseStart)

  // Marca o início real da transição no clique em links internos.
  addEventListener(
    'click',
    (event) => {
      const target = event.target as HTMLElement | null
      const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!anchor || anchor.target === '_blank' || anchor.origin !== window.location.origin) return
      if (anchor.pathname === window.location.pathname) return
      state.pendingStart = performance.now()
    },
    { capture: true }
  )

  // Falha ao carregar o código de uma rota (chunk) — sempre reportada.
  addEventListener('unhandledrejection', (event) => {
    const message = String((event.reason as Error)?.message ?? event.reason ?? '')
    if (/dynamically imported module|Loading chunk|Importing a module script failed/i.test(message)) {
      reportChunkLoadError(window.location.pathname)
    }
  })

  addEventListener('pagehide', flush, { capture: true })
  addEventListener(
    'visibilitychange',
    () => {
      if (document.visibilityState === 'hidden') flush()
    },
    { capture: true }
  )
}

/* ------------------------------------------------------------------ */
/* Navegações internas (SPA)                                           */
/* ------------------------------------------------------------------ */

const mark = (name: string): void => {
  try {
    performance.mark(name)
  } catch {
    /* Performance API indisponível — segue sem marcação */
  }
}

/**
 * Início de uma navegação interna. Fecha o trecho anterior (Web Vitals da
 * rota que o usuário está deixando) e inicia a medição da transição.
 */
export const routeChangeStart = (from: string, to: string): void => {
  if (!state.started || from === to) return

  flush()

  mark('route_change_start')
  const now = performance.now()
  const primed = state.pendingStart
  // Usa o clique quando recente (até 5s); senão, o commit da rota.
  state.transitionStart = primed !== undefined && now - primed < 5000 ? primed : now
  state.pendingStart = undefined
  state.transitionFrom = from
  state.previousRoute = from
  state.route = to
  state.navigationType = 'soft'
  state.values = {}
  state.sent = new Set<Metric>()
}

/**
 * Rota visualmente pronta. Emite `route_performance` com a duração real da
 * transição — proxy de "route ready", nunca chamado de LCP.
 */
export const routeReady = (route: string): void => {
  if (!state.started || state.transitionStart === undefined) return

  mark('route_ready')
  try {
    performance.measure('route_transition', 'route_change_start', 'route_ready')
  } catch {
    /* marcas ausentes — a duração abaixo já é suficiente */
  }

  const duration = Math.round(performance.now() - state.transitionStart)
  const from = state.transitionFrom
  state.transitionStart = undefined
  state.transitionFrom = undefined

  const slow = duration > SLOW_TRANSITION_MS
  if (!state.sampled && !slow) return

  const payload = {
    event: 'route_performance' as const,
    route_from: from,
    route_from_pattern: from ? getRoutePattern(from) : undefined,
    route_transition_ms: duration,
    metric_rating: (slow ? 'poor' : duration > 500 ? 'needs-improvement' : 'good') as Rating,
    navigation_type: 'soft' as const,
    ...baseContext(route)
  }

  pushDataLayerEvent(payload)
  if (isDev) {
    // eslint-disable-next-line no-console
    console.debug('[rum]', payload)
  }
}
