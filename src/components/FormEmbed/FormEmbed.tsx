import { useEffect, useRef } from 'react'

import { Section } from '@/components'
import { SIMULATOR_FORM_URL } from '@/helpers'

const ORIGIN = 'https://simulador.bcenergiacomdesconto.com.br'

const theme = {
  primary: '#1f7a6b',
  buttonBg: '#1f7a6b',
  buttonText: '#FFFFFF',
  cardBg: '#FFFFFF',
  text: '#1f2937',
  inputBg: '#FFFFFF',
  inputBorder: '#1f7a6b',
  primaryText: '#FFFFFF',
  accent: '#27bdb1'
}

/** Itens de apoio baseados em soluções reais já publicadas no site. */
const defaultSupportItems = [
  'Mercado Livre de Energia para empresas com alto consumo',
  'Consórcio BC Energia para quem está no mercado cativo',
  'Gestão de Energia e acompanhamento contínuo do consumo'
]

const FormEmbed = ({
  title,
  description,
  supportItems = defaultSupportItems,
  variant = 'section',
  id = 'contato'
}: {
  title?: string
  description?: string
  supportItems?: Array<string>
  /**
   * `section` mantém o bloco teal completo (usado em produtos, segmentos e
   * regionais). `bare` entrega apenas o card do embed, para páginas que já
   * possuem cabeçalho próprio (ex.: /contato). A lógica do iframe, os
   * parâmetros de URL, o tema e o resize são idênticos nos dois casos.
   */
  variant?: 'section' | 'bare'
  id?: string
}) => {

  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    let themeIntervalId: ReturnType<typeof setInterval> | null = null

    // Repassa query params da página pai para o iframe
    try {
      const incoming = String(window.location.search || '').replace(/^\?/, '')
      if (incoming) {
        const base = iframe.getAttribute('src') || ''
        try {
          const u = new URL(base)
          const merged = new URLSearchParams(u.search)
          new URLSearchParams(incoming).forEach((v, k) => merged.set(k, v))
          u.search = merged.toString()
          const finalUrl = u.toString()
          if (finalUrl !== base) iframe.setAttribute('src', finalUrl)
        } catch {
          iframe.setAttribute('src', base + window.location.search)
        }
      }
    } catch {
      /* ignore */
    }

    const setHeight = (h: number) => {
      if (h) iframe.style.height = Math.max(400, Math.ceil(h)) + 'px'
    }

    const sendTheme = () => {
      try {
        iframe.contentWindow?.postMessage({ type: 'host:theme', theme }, ORIGIN)
      } catch {
        /* ignore */
      }
    }

    const requestResize = () => {
      try {
        iframe.contentWindow?.postMessage({ type: 'host:request-resize' }, ORIGIN)
      } catch {
        /* ignore */
      }
    }

    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== ORIGIN) return
      const msg = (e.data || {}) as { type: string; height?: number }
      if (msg.type === 'simulator:ready') {
        setHeight(msg.height ?? 0)
        sendTheme()
      }
    }

    const handleLoad = () => {
      requestResize()
      sendTheme()
      let tries = 0
      themeIntervalId = setInterval(() => {
        sendTheme()
        if (++tries >= 6) {
          if (themeIntervalId) clearInterval(themeIntervalId)
          themeIntervalId = null
        }
      }, 500)
    }

    window.addEventListener('message', handleMessage)
    window.addEventListener('resize', requestResize, { passive: true })
    iframe.addEventListener('load', handleLoad)

    return () => {
      window.removeEventListener('message', handleMessage)
      window.removeEventListener('resize', requestResize)
      iframe.removeEventListener('load', handleLoad)
      if (themeIntervalId) clearInterval(themeIntervalId)
    }
  }, [])

  const embed = (
    <iframe
      ref={iframeRef}
      src={SIMULATOR_FORM_URL}
      // Altura inicial = piso de setHeight (400px): evita o salto a partir dos
      // 150px padrão do iframe até a altura real chegar por postMessage.
      height={400}
      style={{
        width: '100%',
        border: '0',
        background: 'transparent',
        display: 'block',
        overflow: 'hidden'
      }}
      loading="lazy"
      title="Simulador de Economia"
    />
  )

  if (variant === 'bare') {
    // Altura mínima reservada pelo próprio iframe (min 400px) + ajuste por
    // postMessage — sem altura fixa arbitrária.
    return (
      <div
        id={id}
        className="mx-auto w-full measure-intro overflow-hidden rounded-card border border-border-subtle bg-surface p-2 shadow-sm sm:p-3"
      >
        {embed}
      </div>
    )
  }

  return (
    <Section id={id} className="relative overflow-hidden bg-bc-dark py-16 lg:py-24">
      {/* VISUAL SYSTEM 02 — blocos de formulário permanecem sem grafismo
          (círculos e filete gradiente removidos: contrariavam esta regra). */}

      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-9 lg:grid-cols-12 lg:gap-10 xl:gap-10">
        <div className="text-white lg:col-span-6 lg:pr-2">
          <span className="block t-label uppercase tracking-[0.24em] text-bc-cyan">
            Fale com nossa equipe
          </span>

          <h2 className="t-h2 mt-4 measure-title-tight text-white">
            {title || 'Entre em contato'}
          </h2>

          <span aria-hidden="true" className="mt-6 block h-1 w-16 rounded-full bg-bc-yellow" />

          <p className="mt-6 max-w-[50ch] t-body-lg text-white/85">
            {description ||
              'Preencha os dados ao lado para que nossa equipe analise o seu perfil de consumo e indique a solução de energia mais adequada para você.'}
          </p>

          <ul className="mt-7 space-y-5 border-t border-white/15 pt-7 t-body text-white/90">
            {supportItems.map((item) => (
              <li key={item} className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-bc-cyan/40 bg-bc-cyan/10"
                >
                  <svg
                    viewBox="0 0 12 10"
                    className="h-2.5 w-2.5 text-bc-cyan"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 5.5 4.2 8.5 11 1.5" />
                  </svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full lg:col-span-6">
          <div className="mx-auto w-full measure-intro overflow-hidden rounded-card border border-white/25 bg-white p-3 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.4)] ring-1 ring-black/5 sm:p-4">
            {embed}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default FormEmbed
