/**
 * Eventos tipados do site. Toda origem de evento passa por aqui.
 * Regra de privacidade: nenhum parâmetro pode conter PII.
 */
import { getCampaignEventParams } from './campaign'
import { pushDataLayerEvent } from './dataLayer'
import { getPageContext } from './pageType'
import { getSimulatorContext, toValueRange } from './simulatorContext'
import type { AnalyticsEvent, CtaLocation, EventContext } from './types'
import { getAttributionContext } from './utm'

type Extra = Omit<AnalyticsEvent, 'event'>

const emit = (event: AnalyticsEvent['event'], extra: Extra = {}, ctx?: EventContext): void => {
  pushDataLayerEvent({ event, ...getPageContext(ctx?.page_path), ...ctx, ...extra })
}

export const trackVirtualPageView = (pathname: string): void => {
  emit('virtual_page_view', {}, getPageContext(pathname))
}

export const trackViewSolution = (solution: string): void => emit('view_solution', { solution })

export const trackViewSegment = (segment: string): void => emit('view_segment', { segment })

export const trackViewRegional = (region: string): void => emit('view_regional', { region })

export const trackCtaClick = (params: {
  cta_name: string
  cta_location: CtaLocation
  link_url?: string
}): void => emit('cta_click', params)

export const trackWhatsappClick = (params: {
  cta_name: string
  cta_location: CtaLocation
}): void => emit('whatsapp_click', params)

export const trackFormStart = (form_name: string): void => emit('form_start', { form_name })

export const trackFormStep = (params: {
  form_name: string
  form_step: number
  step_name: string
}): void => emit('form_step', params)

/**
 * Upload de conta de energia. Hoje NENHUM formulário do site possui campo de
 * arquivo — o helper existe para quando o fluxo for criado. Nunca envia nome,
 * conteúdo, URL ou qualquer dado do arquivo além do tipo MIME.
 */
export const trackBillUpload = (params: { form_name: string; file_type?: string }): void =>
  emit('bill_upload', params)

export const trackFormError = (params: {
  form_name: string
  error_type: 'validation' | 'submission'
  field_name?: string
}): void => emit('form_error', params)

/**
 * Conversão. Só deve ser chamada após confirmação real de envio bem-sucedido.
 * Dispara form_submit + lead_generated (com contexto de origem/UTM).
 */
export const trackLead = (params: { form_name: string }): void => {
  emit('form_submit', params)
  emit('lead_generated', { ...params, conversion_type: 'lead', ...getAttributionContext() })
}

export const trackContentEngagement = (params: {
  content_type: string
  content_id?: string
}): void => emit('content_engagement', params)

/** Contexto de uma peça editorial. Nunca carrega PII. */
type ContentContext = {
  content_type: 'blog' | 'bc_cast'
  content_slug: string
  content_cluster?: string
  page_path?: string
}

/** Visualização de um conteúdo editorial (artigo do Blog ou episódio). */
export const trackContentView = (params: ContentContext): void =>
  emit('content_view', params, { page_path: params.page_path })

/** Clique em CTA editorial dentro de um conteúdo. */
export const trackContentCtaClick = (
  params: ContentContext & { cta_name: string; cta_location: CtaLocation; link_url?: string }
): void => emit('content_cta_click', params, { page_path: params.page_path })

/**
 * Clique em "próxima ação" (link de continuidade de navegação ao fim de uma
 * seção). Evento próprio para não duplicar `cta_click` nem `content_cta_click`.
 */
export const trackNextAction = (params: { action_name: string; destination: string }): void =>
  emit('next_action', params)

/* -------------------------------------------------------------------------
 * Simulador de economia (/simulador-de-economia).
 * Nenhum evento carrega PII. O valor da conta nunca é enviado em números
 * exatos: apenas a faixa (bucket), conforme a política de privacidade atual.
 * Todo evento do funil recebe o contexto de campanha normalizado
 * (`getCampaignEventParams`), que reutiliza a persistência de UTM existente.
 * ---------------------------------------------------------------------- */

const simulatorEmit = (event: AnalyticsEvent['event'], extra: Extra = {}): void =>
  emit(event, { ...getCampaignEventParams(), ...extra })

export const trackSimulatorView = (): void =>
  simulatorEmit('simulator_view', { source: 'simulador' })

export const trackSimulatorStateSelect = (params: {
  state: string
  discount_percent: number
}): void => simulatorEmit('simulator_state_select', params)

export const trackSimulatorValueChange = (value: number): void =>
  simulatorEmit('simulator_value_change', { value_range: toValueRange(value) })

/**
 * Resultado efetivamente visto após interação do usuário.
 * O componente garante que só dispare após interação e com debounce,
 * nunca a cada render.
 */
export const trackSimulatorResultView = (params: {
  state: string
  discount_percent: number
  value_range: string
  estimated_savings_range: string
}): void => simulatorEmit('simulator_result_view', params)

export const trackSimulatorCtaClick = (params: {
  cta_name: string
  link_url?: string
  state?: string
  discount_percent?: number
  value_range?: string
}): void =>
  simulatorEmit('simulator_cta_click', {
    ...params,
    cta_location: 'simulator',
    source: 'simulador',
    destination: 'lead-form'
  })

/**
 * Chegada visual ao formulário de lead. Não existe evento global equivalente
 * (`form_start` só dispara na interação e o embed é cross-origin), por isso o
 * evento próprio. Dispara uma única vez por sessão de página.
 */
export const trackLeadFormView = (params: { source: string; form_name?: string }): void =>
  simulatorEmit('lead_form_view', { ...params, ...getSimulatorContext() })

