import FinalCtaSection from '@/components/Cta/FinalCtaSection'
import Link from '@/components/Link'

import { ClosingCtaProps } from './ClosingCta.type'

/**
 * VISUAL SYSTEM 07 — encerramento de página.
 *
 * O bloco principal usa o padrão global `FinalCtaSection` (mesma arquitetura,
 * tipografia e hierarquia de ações de todas as CTAs do site). A faixa
 * "Conheça também" permanece como navegação editorial complementar,
 * agora sem ícones decorativos.
 *
 * Textos, rotas, `data-cta-name` e `data-cta-location` preservados.
 */
const ClosingCta = ({
  eyebrow,
  title,
  titleLine2,
  description,
  primaryCta,
  secondaryCta,
  linksTitle = 'Conheça também',
  links,
  graphic = { variant: 'chevrons' },
  className = '',
  id
}: ClosingCtaProps) => (
  <FinalCtaSection
    id={id}
    className={className}
    location="page_closing"
    eyebrow={eyebrow}
    title={title}
    titleLine2={titleLine2}
    description={description}
    actionText="Análise inicial sem compromisso."
    primaryCta={primaryCta}
    secondaryCta={secondaryCta}
    graphic={graphic.variant === 'none' ? { variant: 'chevrons' } : graphic}
    footerSlot={
      links?.length ? (
        <nav aria-label={linksTitle}>
          <p className="t-eyebrow text-text-inverse/70">{linksTitle}</p>

          <ul className="mt-4 grid grid-cols-1 divide-y divide-white/[0.08] sm:grid-cols-3 sm:divide-y-0 sm:divide-x sm:divide-white/[0.08]">
            {links.map((link, index) => (
              <li
                key={link.href}
                className={`${index === 0 ? 'sm:pl-0' : ''} ${index === links.length - 1 ? 'sm:pr-0' : ''}`}
              >
                <Link
                  href={link.href}
                  aria-label={link.ariaLabel}
                  {...(link.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : { target: link.target })}
                  data-cta-name={link.label}
                  className="group flex w-full items-center gap-3 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:px-6 lg:py-4"
                >
                  <span className="flex-1 t-body-sm font-semibold text-text-inverse/95 transition-colors duration-200 group-hover:text-bc-cyan">
                    {link.label}
                  </span>

                  <span
                    aria-hidden="true"
                    className="ml-3 shrink-0 text-text-inverse/50 transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transform-none"
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
              </li>
            ))}
          </ul>
        </nav>
      ) : null
    }
  />
)

export default ClosingCta
