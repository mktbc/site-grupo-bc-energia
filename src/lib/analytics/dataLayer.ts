/**
 * Camada central de acesso ao Data Layer do GTM.
 *
 * Nenhum componente deve chamar `window.dataLayer.push` diretamente.
 * O helper é seguro para SSR/prerender e nunca lança erro se o GTM
 * estiver indisponível ou bloqueado.
 */
import type { AnalyticsEvent } from './types'

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

const isDev = import.meta.env.DEV

/** Remove chaves com valor undefined/null/'' para não poluir o Data Layer. */
const clean = <T extends Record<string, unknown>>(payload: T): T => {
  const out: Record<string, unknown> = {}
  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    out[key] = value
  })
  return out as T
}

export const pushDataLayerEvent = (payload: AnalyticsEvent): void => {
  if (typeof window === 'undefined') return
  try {
    window.dataLayer = window.dataLayer || []
    const event = clean(payload)
    window.dataLayer.push(event)
    if (isDev) {
      // Debug apenas em desenvolvimento.
      // eslint-disable-next-line no-console
      console.debug('[dataLayer]', event)
    }
  } catch {
    /* tracking nunca pode quebrar a aplicação */
  }
}
