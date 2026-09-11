/**
 * Leitura normalizada do contexto de campanha (mídia paga).
 *
 * NÃO cria persistência paralela: lê exclusivamente o que `./utm.ts` já
 * captura e persiste na sessão (`bc_utm`, `bc_utm_first`, `bc_landing_page`),
 * com prioridade para a querystring atual.
 *
 * Regras:
 * - first touch nunca é sobrescrito aqui (a escrita continua em `initUtmSession`);
 * - nenhum valor é inventado: campos ausentes simplesmente não aparecem;
 * - nenhum dado pessoal trafega neste módulo.
 */
import { getFirstTouch, getLandingPage, getSessionUtms, readUtmsFromUrl } from './utm'

/** Contexto de campanha normalizado — somente campos suportados pelo projeto. */
export type CampaignContext = {
  source?: string
  medium?: string
  campaign?: string
  campaignCode?: string
  adset?: string
  content?: string
  term?: string
  channel?: string
  product?: string
  landingPage?: string
}

const pick = (bag: Record<string, string | undefined>, keys: string[]): string | undefined => {
  for (const key of keys) {
    const value = bag[key]
    if (value) return value
  }
  return undefined
}

/**
 * Resolve o contexto atual: URL > sessão persistida.
 * `campaignCode` aceita `utm_campaign_code` e, na ausência dele, os
 * identificadores já usados pelo projeto (`utm_campaign_id`, `utm_id`).
 */
export const getCampaignContext = (): CampaignContext => {
  const bag: Record<string, string | undefined> = {
    ...getSessionUtms(),
    ...readUtmsFromUrl()
  }

  const ctx: CampaignContext = {
    source: pick(bag, ['utm_source', 'utm_fonte', 'utm_font']),
    medium: pick(bag, ['utm_medium']),
    campaign: pick(bag, ['utm_campaign']),
    campaignCode: pick(bag, ['utm_campaign_code', 'utm_campaign_id', 'utm_id']),
    adset: pick(bag, ['utm_adset', 'utm_adgroup', 'utm_adset_id']),
    content: pick(bag, ['utm_content']),
    term: pick(bag, ['utm_term']),
    channel: pick(bag, ['utm_channel']),
    product: pick(bag, ['utm_product']),
    landingPage: pick(bag, ['utm_lp']) ?? getLandingPage()
  }

  return ctx
}

/**
 * Contexto de campanha achatado para o Data Layer, com as mesmas chaves
 * `utm_*` já usadas pelo site (chaves vazias são removidas em `pushDataLayerEvent`).
 * O first touch é anexado como veio de `getFirstTouch()`, sem recomputar.
 */
export const getCampaignEventParams = (): Record<string, string> => {
  const ctx = getCampaignContext()
  const out: Record<string, string> = {}

  const set = (key: string, value?: string) => {
    if (value) out[key] = value
  }

  set('utm_source', ctx.source)
  set('utm_medium', ctx.medium)
  set('utm_campaign', ctx.campaign)
  set('utm_campaign_code', ctx.campaignCode)
  set('utm_adset', ctx.adset)
  set('utm_content', ctx.content)
  set('utm_term', ctx.term)
  set('utm_channel', ctx.channel)
  set('utm_product', ctx.product)
  set('utm_lp', ctx.landingPage)

  Object.entries(getFirstTouch()).forEach(([key, value]) => {
    if (value) out[key] = value
  })

  return out
}
