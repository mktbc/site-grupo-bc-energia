import BrandGraphic from '@/components/BrandGraphic/BrandGraphic'
import Link from '@/components/Link'
import Reveal from '@/components/Reveal/Reveal'

import type { SectionGraphic } from '@/components/Product/ProductSection'

export type FinalCtaAction = {
  label: string
  href: string
  target?: string
  rel?: string
  ariaLabel?: string
}

export type FinalCtaSectionProps = {
  eyebrow?: string
  title: string
  /** Segunda linha do H2 (quebra editorial controlada). */
  titleLine2?: string
  description?: string
  /** Texto curto do bloco de ação (coluna direita). */
  actionText?: string
  primaryCta: FinalCtaAction
  secondaryCta?: FinalCtaAction
  /**
   * VISUAL SYSTEM 07 — 1 elemento oficial de apoio por seção.
   * `radial` (sol) é proibido nesta família e é normalizado para chevrons.
   */
  graphic?: SectionGraphic
  /** Valor de `data-cta-location` preservado por rota (tracking). */
  location?: string
  /** Conteúdo complementar abaixo do grid (ex.: faixa "Conheça também"). */
  footerSlot?: React.ReactNode
  id?: string
  className?: string
}

/**
 * VISUAL SYSTEM 07 — padrão global das seções de CTA / próximo passo.
 *
 * Arquitetura única para todos os fechamentos comerciais do site:
 * - fundo institucional navy → teal (sem glass, sem gradiente chamativo)
 * - coluna esquerda: eyebrow (Onest) + H2 (Barlow Condensed via `t-h2`) +
 *   régua amarela + texto de apoio
 * - coluna direita: texto curto + CTA amarelo + link editorial (sem ícone)
 * - no máximo 1 grafismo oficial, nunca o sol/radial
 *
 * Textos, rotas, `data-cta-name` e `data-cta-location` são recebidos por
 * props — o componente muda apenas composição e tipografia.
 */
const FinalCtaSection = ({
  eyebrow,
  title,
  titleLine2,
  description,
  actionText,
  primaryCta,
  secondaryCta,
  graphic = { variant: 'chevrons' },
  location = 'page_closing',
  footerSlot,
  id,
  className = ''
}: FinalCtaSectionProps) => {
  // Regra dura do sistema: o elemento radial (sol) não é permitido aqui.
  const safeGraphic: SectionGraphic =
    graphic.variant === 'radial' ? { ...graphic, variant: 'chevrons' } : graphic
  const isHomeFinalCta = id === 'home_cta_final'

  return (
    <section
      id={id}
      data-cta-location={location}
      className={`relative isolate overflow-hidden bc-level-lead text-text-inverse lg:py-[64px] ${className}`}
      style={{
        backgroundImage: isHomeFinalCta
          ? 'linear-gradient(115deg, hsl(var(--bc-dark)) 0%, #123E43 72%, hsl(var(--bc-primary)) 100%)'
          : 'linear-gradient(115deg, hsl(var(--bc-dark)) 0%, #123E43 45%, hsl(var(--bc-primary)) 100%)'
      }}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 ${isHomeFinalCta ? 'bg-[radial-gradient(70%_100%_at_100%_50%,rgba(27,157,147,0.14),transparent_68%)]' : 'bg-[radial-gradient(90%_120%_at_100%_50%,rgba(27,157,147,0.24),transparent_65%)'}`}
      />

      <BrandGraphic
        {...safeGraphic}
        size="small"
        position={safeGraphic.position ?? 'bottom-right'}
        tone={safeGraphic.tone ?? 'light'}
        opacity={0.04}
        className="-z-10 hidden lg:block"
      />

      <div className="mx-auto w-full max-w-[1080px] px-5 sm:px-6 lg:px-10">
        <Reveal className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:gap-[clamp(2rem,3.5vw,3rem)]">
          <div>
            {eyebrow ? (
              <p className="t-eyebrow text-bc-cyan">{eyebrow}</p>
            ) : null}

            <h2 className="t-h2-lead mt-2 max-w-[26ch] text-balance text-text-inverse">
              {title}
              {titleLine2 ? <span className="block">{titleLine2}</span> : null}
            </h2>

            <span aria-hidden="true" className="mt-4 block h-[3px] w-[46px] bg-bc-accent" />

            {description ? (
              <p className="mt-4 max-w-[52ch] t-body-lg text-text-inverse/85">
                {description}
              </p>
            ) : null}
          </div>

          <div
            className="w-full border-t border-white/20 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
          >
            {actionText ? (
              <p className="t-body-sm text-text-inverse/90">{actionText}</p>
            ) : null}

            <Link
              href={primaryCta.href}
              target={primaryCta.target}
              rel={primaryCta.rel}
              aria-label={primaryCta.ariaLabel}
              data-cta-name={primaryCta.label}
              className={`${actionText ? 'mt-5' : ''} flex min-h-[52px] w-full items-center justify-center gap-2 rounded-md bg-bc-accent px-6 text-center t-label font-bold uppercase tracking-[0.04em] text-surface-dark shadow-sm transition-[transform,filter,box-shadow] duration-fast ease-bc hover:-translate-y-0.5 hover:brightness-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60 motion-reduce:transform-none motion-reduce:transition-none`}
            >
              {primaryCta.label}
            </Link>

            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                target={secondaryCta.target}
                rel={secondaryCta.rel}
                aria-label={secondaryCta.ariaLabel}
                data-cta-name={secondaryCta.label}
                className="group mt-4 inline-flex min-h-[44px] items-center gap-2 t-label uppercase tracking-[0.08em] text-text-inverse underline-offset-4 transition-colors duration-200 hover:text-bc-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                {secondaryCta.label}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transform-none"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M2.5 8h11m0 0L9.5 4m4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            ) : null}
          </div>
          </Reveal>

        {footerSlot ? <div className="mt-10">{footerSlot}</div> : null}
      </div>
    </section>
  )
}

export default FinalCtaSection
