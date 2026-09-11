/**
 * Tipagem dos eventos do Data Layer (GTM).
 *
 * Padrão único de nomenclatura: snake_case, tanto para o nome do evento
 * quanto para os parâmetros. Nenhum evento pode carregar PII (nome, e-mail,
 * telefone, CPF/CNPJ, endereço, nº de instalação, conteúdo digitado etc.).
 */

/** Classificação de página derivada da rota. */
export type PageType =
  | 'home'
  | 'solution'
  | 'segment'
  | 'regional'
  | 'institutional'
  | 'content'
  | 'contact'
  | 'simulator'
  | 'success'
  | 'other'

/** Locais padronizados de CTA (não usar textos arbitrários). */
export type CtaLocation =
  | 'hero'
  | 'header'
  | 'solution_section'
  | 'segment_section'
  | 'regional_section'
  | 'content_section'
  | 'hub_navigation'
  | 'form_section'
  | 'simulator'
  | 'footer'
  | 'floating'

/** Contexto comum — campos não aplicáveis simplesmente não são enviados. */
export type EventContext = {
  page_path?: string
  page_title?: string
  page_type?: PageType
  solution?: string
  segment?: string
  region?: string
  region_uf?: string
  region_city?: string
}

export type EventName =
  | 'virtual_page_view'
  | 'view_solution'
  | 'view_segment'
  | 'view_regional'
  | 'cta_click'
  | 'whatsapp_click'
  | 'form_start'
  | 'form_step'
  | 'bill_upload'
  | 'form_submit'
  | 'form_error'
  | 'lead_generated'
  | 'content_engagement'
  | 'content_view'
  | 'content_cta_click'
  | 'simulator_view'
  | 'simulator_state_select'
  | 'simulator_value_change'
  | 'simulator_result_view'
  | 'simulator_cta_click'
  | 'lead_form_view'
  | 'next_action'
  | 'web_vital'
  | 'route_performance'
  | 'chunk_load_error'

export type AnalyticsEvent = EventContext & {
  event: EventName
  cta_name?: string
  action_name?: string
  cta_location?: CtaLocation
  link_url?: string
  form_name?: string
  form_step?: number
  step_name?: string
  file_type?: string
  error_type?: 'validation' | 'submission'
  field_name?: string
  conversion_type?: 'lead'
  content_type?: string
  content_id?: string
  content_slug?: string
  content_cluster?: string
  /** Simulador de economia — nunca carrega valor exato nem PII. */
  state?: string
  discount_percent?: number
  value_range?: string
  estimated_savings_range?: string
  source?: string
  destination?: string
  /** RUM — Core Web Vitals de campo (sem PII). */
  metric_name?: 'LCP' | 'CLS' | 'INP' | 'FCP' | 'TTFB'
  metric_value?: number
  metric_rating?: 'good' | 'needs-improvement' | 'poor'
  navigation_type?: 'initial' | 'soft'
  device_type?: 'mobile' | 'tablet' | 'desktop'
  connection_type?: string
  route?: string
  route_pattern?: string
  previous_route?: string
  route_from?: string
  route_from_pattern?: string
  route_transition_ms?: number
  viewport_width?: number
  [key: string]: unknown
}
