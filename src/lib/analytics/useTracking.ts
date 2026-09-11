/**
 * Hooks de tracking. Concentram os "quando" dos eventos para que os
 * componentes não precisem conhecer o Data Layer.
 */
import { useCallback, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { routeChangeStart, routeReady } from './webVitals'
import {
  trackCtaClick,
  trackFormError,
  trackFormStart,
  trackLead,
  trackLeadFormView,
  trackViewRegional,
  trackViewSegment,
  trackViewSolution,
  trackVirtualPageView,
  trackWhatsappClick
} from './events'
import { getRegion, getSegment, getSolution } from './pageType'
import type { CtaLocation } from './types'

const WHATSAPP_HOSTS = ['wa.me', 'wa.link', 'api.whatsapp.com', 'web.whatsapp.com']

const isWhatsapp = (href: string): boolean =>
  WHATSAPP_HOSTS.some((host) => href.includes(host))

const readCtaLocation = (el: HTMLElement): CtaLocation => {
  const holder = el.closest<HTMLElement>('[data-cta-location]')
  return (holder?.dataset.ctaLocation as CtaLocation) ?? 'content_section'
}

const readCtaName = (el: HTMLElement): string =>
  el.dataset.ctaName?.trim() ||
  el.getAttribute('aria-label')?.trim() ||
  (el.textContent ?? '').trim().slice(0, 80) ||
  'sem_rotulo'

/**
 * virtual_page_view + view_solution / view_segment / view_regional.
 *
 * Estratégia SPA documentada em docs/TRACKING.md: o container GTM atual não
 * possui History Change configurado para este SPA, então o page view virtual é
 * emitido pela aplicação, uma vez por mudança real de rota. O guard por `ref`
 * evita duplicidade em re-render e no StrictMode do React.
 */
export const useRouteTracking = (): void => {
  const { pathname } = useLocation()
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    if (lastPath.current === pathname) return

    // rAF: espera o commit da rota; o guard só é marcado quando o evento
    // realmente dispara (evita perder o page view no StrictMode).
    const id = window.requestAnimationFrame(() => {
      if (lastPath.current === pathname) return
      const previous = lastPath.current
      lastPath.current = pathname

      // RUM: fecha o trecho anterior e mede a transição da SPA.
      if (previous) {
        routeChangeStart(previous, pathname)
        window.requestAnimationFrame(() => routeReady(pathname))
      }

      trackVirtualPageView(pathname)

      const solution = getSolution(pathname)
      if (solution) trackViewSolution(solution)

      const segment = getSegment(pathname)
      if (segment) trackViewSegment(segment)

      const region = getRegion(pathname)
      if (region) trackViewRegional(region.slug)
    })

    return () => window.cancelAnimationFrame(id)
  }, [pathname])
}

/**
 * Delegação de cliques: evita `dataLayer.push` espalhado por dezenas de
 * componentes. Rastreia apenas links com valor analítico —
 * links de WhatsApp e elementos marcados com `data-cta-name`.
 */
export const useClickTracking = (): void => {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const el = target?.closest<HTMLElement>('a[href], button[data-cta-name]')
      if (!el) return

      const href = el.getAttribute('href') ?? ''
      const cta_location = readCtaLocation(el)
      const cta_name = readCtaName(el)

      if (href && isWhatsapp(href)) {
        // Não registra o número de telefone como dado analítico.
        trackWhatsappClick({ cta_name, cta_location })
        return
      }

      if (el.dataset.ctaName !== undefined) {
        trackCtaClick({ cta_name, cta_location, link_url: href || undefined })
      }
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])
}

/**
 * Tracking de formulário com proteção contra duplicidade:
 * - form_start dispara uma única vez por instância do formulário;
 * - form_submit/lead_generated disparam uma única vez, apenas após sucesso
 *   confirmado pela integração.
 */
export const useFormTracking = (formName: string) => {
  const started = useRef(false)
  const converted = useRef(false)

  const onFormStart = useCallback(() => {
    if (started.current) return
    started.current = true
    trackFormStart(formName)
  }, [formName])

  const onValidationError = useCallback(
    (fields: string[]) => {
      fields.forEach((field) =>
        trackFormError({ form_name: formName, error_type: 'validation', field_name: field })
      )
    },
    [formName]
  )

  const onSubmitError = useCallback(() => {
    trackFormError({ form_name: formName, error_type: 'submission' })
  }, [formName])

  const onSubmitSuccess = useCallback(() => {
    if (converted.current) return
    converted.current = true
    trackLead({ form_name: formName })
  }, [formName])

  return { onFormStart, onValidationError, onSubmitError, onSubmitSuccess }
}

/**
 * `lead_form_view`: dispara uma única vez quando o bloco do formulário entra
 * de fato no viewport. Não é tracking genérico de scroll — observa apenas o
 * elemento do formulário do funil do simulador. Não altera foco nem teclado.
 */
export const useLeadFormView = (source: string) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const fired = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || fired.current) return
          fired.current = true
          trackLeadFormView({ source })
          observer.disconnect()
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [source])

  return ref
}
