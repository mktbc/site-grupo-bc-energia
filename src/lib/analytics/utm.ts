/**
 * Captura e persistência de UTMs da sessão.
 *
 * - Persistência em `sessionStorage` (nunca dados pessoais).
 * - First touch preservado: a primeira origem válida da sessão não é
 *   sobrescrita por navegação interna nem por chegadas sem UTM.
 * - `utm_project_id` é preservado EXATAMENTE como recebido (sem normalização).
 */

export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_campaign_id',
  'utm_campaign_code',
  'utm_content',
  'utm_term',
  'utm_id',
  'utm_project_id',
  'utm_adset',
  'utm_adset_id',
  'utm_adgroup',
  'utm_ad_id',
  'utm_product',
  'utm_segment',
  'utm_public',
  'utm_region',
  'utm_state',
  'utm_city',
  'utm_contract',
  'utm_lp',
  // Parâmetros já utilizados pelo site / plataformas
  'utm_fonte',
  'utm_font',
  'utm_channel',
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'msclkid'
] as const

export type UtmKey = (typeof UTM_KEYS)[number]
export type UtmData = Partial<Record<string, string>>

const STORAGE_KEY = 'bc_utm'
const FIRST_KEY = 'bc_utm_first'
const LANDING_KEY = 'bc_landing_page'

const FIRST_TOUCH_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_campaign_id',
  'utm_campaign_code',
  'utm_content'
] as const

const hasStorage = (): boolean => {
  try {
    return typeof window !== 'undefined' && !!window.sessionStorage
  } catch {
    return false
  }
}

const read = (key: string): UtmData => {
  if (!hasStorage()) return {}
  try {
    const raw = window.sessionStorage.getItem(key)
    return raw ? (JSON.parse(raw) as UtmData) : {}
  } catch {
    return {}
  }
}

const write = (key: string, value: UtmData): void => {
  if (!hasStorage()) return
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage indisponível — segue sem persistir */
  }
}

/** Lê UTMs válidas da querystring atual (valores preservados como recebidos). */
export const readUtmsFromUrl = (search?: string): UtmData => {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(search ?? window.location.search)
  const found: UtmData = {}
  UTM_KEYS.forEach((key) => {
    const value = params.get(key)
    if (value !== null && value.trim() !== '') found[key] = value
  })
  return found
}

/**
 * Inicializa a captura da sessão. Deve rodar uma vez no boot.
 * Não sobrescreve uma origem válida durante navegação interna.
 */
export const initUtmSession = (): void => {
  if (typeof window === 'undefined') return

  const incoming = readUtmsFromUrl()
  if (Object.keys(incoming).length > 0) {
    write(STORAGE_KEY, { ...read(STORAGE_KEY), ...incoming })

    const first = read(FIRST_KEY)
    if (Object.keys(first).length === 0) {
      const firstTouch: UtmData = {}
      FIRST_TOUCH_KEYS.forEach((key) => {
        if (incoming[key]) firstTouch[`first_${key}`] = incoming[key]
      })
      if (Object.keys(firstTouch).length > 0) write(FIRST_KEY, firstTouch)
    }
  }

  if (hasStorage() && !window.sessionStorage.getItem(LANDING_KEY)) {
    try {
      window.sessionStorage.setItem(LANDING_KEY, window.location.pathname)
    } catch {
      /* ignore */
    }
  }
}

/** UTMs persistidas da sessão. */
export const getSessionUtms = (): UtmData => read(STORAGE_KEY)

/** Primeira origem conhecida da sessão (first_utm_*). */
export const getFirstTouch = (): UtmData => read(FIRST_KEY)

/** Pathname inicial da sessão. */
export const getLandingPage = (): string | undefined => {
  if (!hasStorage()) return undefined
  try {
    return window.sessionStorage.getItem(LANDING_KEY) ?? undefined
  } catch {
    return undefined
  }
}

/** Contexto de origem para anexar a eventos de conversão. */
export const getAttributionContext = (): UtmData => {
  const landing = getLandingPage()
  return {
    ...getSessionUtms(),
    ...getFirstTouch(),
    ...(landing ? { landing_page: landing } : {})
  }
}

/**
 * UTMs para o payload de formulário: mantém exatamente as chaves e os valores
 * padrão já usados pelo site, mas recupera a origem persistida da sessão
 * quando o usuário navegou internamente antes de converter.
 * A URL atual tem prioridade sobre a sessão.
 */
export const getFormUtms = (defaults: Record<string, string>): Record<string, string> => {
  const session = getSessionUtms()
  const url = readUtmsFromUrl()
  const out: Record<string, string> = {}
  Object.entries(defaults).forEach(([key, def]) => {
    out[key] = url[key] ?? session[key] ?? def
  })
  return out
}

