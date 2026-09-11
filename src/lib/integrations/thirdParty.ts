/**
 * PERFORMANCE 04 — Loader central de scripts de terceiros.
 *
 * Regras:
 * - Uma única inicialização por page load (guard por chave).
 * - IDs vêm de `src/config/integrations.ts` (nunca hardcoded em componentes).
 * - Carregamento adiado para o idle/load, para não competir com o LCP.
 * - Em preview/localhost os scripts de marketing NÃO são injetados: os eventos
 *   continuam sendo empilhados em `window.dataLayer` (debug preservado),
 *   mas nenhum dado real é enviado às plataformas.
 *
 * Meta Pixel, TikTok Pixel e RD Station não possuem script ativo no projeto
 * (ver docs/PERFORMANCE-THIRD-PARTY.md). Quando forem aprovados, devem ser
 * carregados por este mesmo helper — nunca no index.html.
 */
import { INTEGRATIONS, loadAppConfig } from '@/config/integrations'
import { isPreviewEnvironment } from '@/config/site'

const loaded = new Set<string>()

/** Injeta um <script async> uma única vez por src. */
const injectScript = (key: string, src: string): void => {
  if (typeof document === 'undefined') return
  if (loaded.has(key)) return
  if (document.querySelector(`script[data-tp="${key}"]`)) {
    loaded.add(key)
    return
  }
  loaded.add(key)
  const el = document.createElement('script')
  el.async = true
  el.src = src
  el.dataset.tp = key
  document.head.appendChild(el)
}

/** Executa após o load, em idle, sem atrasar o LCP. */
const whenIdle = (fn: () => void): void => {
  if (typeof window === 'undefined') return
  const run = () => {
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void })
      .requestIdleCallback
    if (typeof ric === 'function') ric(fn, { timeout: 3000 })
    else window.setTimeout(fn, 1200)
  }
  if (document.readyState === 'complete') run()
  else window.addEventListener('load', run, { once: true })
}

/** GTM: inicialização única, ID vindo da config central. */
const initGtm = (gtmId: string): void => {
  if (!gtmId) return
  if (loaded.has('gtm')) return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
  injectScript('gtm', `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`)
}

/**
 * Ponto único de bootstrap dos terceiros. Deve ser chamado uma vez no boot.
 * As UTMs/click IDs já foram capturados antes disso (initUtmSession em main.tsx),
 * então a atribuição não é afetada pelo atraso.
 */
export const initThirdPartyScripts = (): void => {
  if (typeof window === 'undefined') return
  if (isPreviewEnvironment()) return

  whenIdle(() => {
    void loadAppConfig().then(() => {
      initGtm(INTEGRATIONS.GTM_ID)
    })
  })
}
