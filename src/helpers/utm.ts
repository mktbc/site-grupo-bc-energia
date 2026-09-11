export type UtmChannel = 'Formulario Site' | 'Widget Site'

interface UtmParams {
  utm_font: string
  utm_campaign: string
  utm_channel: string
  utm_project_id: string
}

const BASE_UTM: Omit<UtmParams, 'utm_channel'> = {
  utm_font: 'Inbound',
  utm_campaign: 'SEO',
  utm_project_id: 'BCCAMPMKT033'
}

/**
 * Constrói a URL do simulador BC Energia com os parâmetros UTM padrão.
 * @param channel - Ponto de contato: 'Formulario Site' (embeds) ou 'Widget Site' (pop-up)
 */
export const buildSimulatorUrl = (channel: UtmChannel): string => {
  const url = new URL('https://simulador.bcenergiacomdesconto.com.br/')
  const params: UtmParams = { ...BASE_UTM, utm_channel: channel }

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  return url.toString()
}

/** URL do simulador para formulários embedados (Entre em contato / Quero economizar) */
export const SIMULATOR_FORM_URL = buildSimulatorUrl('Formulario Site')

/** URL do simulador para o widget pop-up (Simule Agora) */
export const SIMULATOR_WIDGET_URL = buildSimulatorUrl('Widget Site')
