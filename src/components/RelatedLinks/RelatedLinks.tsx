import { HubCard, HubCardGrid } from '@/components/HubCard'
import Link from '@/components/Link'

import { RelatedLinksProps } from './RelatedLinks.type'

/**
 * Bloco de linking interno com âncoras descritivas.
 * Usado por soluções, segmentos e páginas regionais para conectar os clusters
 * (solução ↔ segmento ↔ região ↔ conversão) sem "saiba mais" genérico.
 *
 * `variant="cards"` reutiliza o HubCard (mesmo sistema de card dos hubs),
 * preservando os mesmos destinos e as âncoras descritivas em `aria-label`.
 */
const RelatedLinks = ({
  title,
  description,
  eyebrow,
  items,
  headingLevel = 'h2',
  className = '',
  variant = 'list',
  columns = 3
}: RelatedLinksProps) => {
  if (!items?.length) return null
  const Heading = headingLevel

  if (variant === 'cards') {
    return (
      <section
        aria-label={title}
        className={`bg-surface-muted/50 py-16 lg:py-20 ${className}`}
        data-testid="related-links"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            {eyebrow ? (
              <span className="block t-eyebrow tracking-[0.16em] text-bc-primary">
                {eyebrow}
              </span>
            ) : null}
            <Heading className="mt-2 t-h2-support text-bc-dark">
              {title}
            </Heading>
            {description ? (
              <p className="mt-5 t-body-lg text-text-secondary">{description}</p>
            ) : null}
          </div>

          <HubCardGrid className="mt-7" columns={columns}>
            {items.map((item) => (
              <HubCard
                key={item.href}
                title={item.shortLabel ?? item.label}
                description={item.description}
                href={item.href}
                icon={item.icon}
                eyebrow={item.eyebrow}
                ariaLabel={item.shortLabel ? item.label : undefined}
                external={item.target === '_blank'}
                accent={item.accent}
                ctaLabel={item.ctaLabel ?? 'Explorar'}
                trackingLabel={`related_${item.href}`}
              />
            ))}
          </HubCardGrid>
        </div>
      </section>
    )
  }

  if (variant === 'index-cards') {
    return (
      <section
        aria-label={title}
        className={`bg-surface-muted/60 py-[72px] ${className}`.trim()}
        data-testid="related-links"
      >
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8">
          <div className="measure-intro">
            {eyebrow ? <p className="t-eyebrow">{eyebrow}</p> : null}
            <span aria-hidden="true" className="block h-[3px] w-8 rounded-full bg-bc-primary" />
            <Heading className="mt-4 t-h2-support text-bc-dark">
              {title}
            </Heading>
            {description ? (
              <p className="mt-3 text-body-sm leading-[1.6] text-text-secondary">{description}</p>
            ) : null}
          </div>

          <ul className="mt-7 grid gap-x-6 gap-y-5 md:grid-cols-2">
            {items.map((item) => (
              <li key={item.href} className="h-full">
                <Link
                  href={item.href}
                  target={item.target}
                  aria-label={item.shortLabel ? item.label : undefined}
                  data-cta-name={`related_${item.href}`}
                  className="bc-focus-ring group flex h-full min-h-[118px] flex-col justify-between rounded-[10px] border border-border-subtle bg-surface-card p-[22px] shadow-sm transition-[transform,colors,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-bc-primary/25 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="t-body-sm font-semibold uppercase tracking-[0.01em] text-bc-dark transition-colors duration-200 group-hover:text-bc-primary">
                      {item.shortLabel ?? item.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-bc-primary transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transform-none"
                    >
                      →
                    </span>
                  </span>
                  {item.description ? (
                    <span className="mt-2.5 block max-w-[46ch] t-body-sm leading-[1.6] text-text-secondary">
                      {item.description}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }

  if (variant === 'index') {
    return (
      <section
        aria-label={title}
        className={`bc-level-support bg-surface ${className}`.trim()}
        data-testid="related-links"
      >
        <div className="bc-container">
          <div className="max-w-2xl">
            {eyebrow ? <p className="t-eyebrow">{eyebrow}</p> : null}
            <Heading className="t-h3 mt-2 text-text-primary">{title}</Heading>
            {description ? (
              <p className="t-body-sm mt-3 text-text-secondary">{description}</p>
            ) : null}
          </div>

          <ul className="mt-8 grid gap-x-8 md:grid-cols-2">
            {items.map((item) => (
              <li key={item.href} className="border-t border-border-subtle">
                <Link
                  href={item.href}
                  target={item.target}
                  aria-label={item.shortLabel ? item.label : undefined}
                  data-cta-name={`related_${item.href}`}
                  className="bc-focus-ring group flex min-h-[44px] items-start justify-between gap-6 py-5 text-text-primary transition-colors duration-200 hover:text-bc-primary motion-reduce:transition-none"
                >
                  <span>
                    <span className="block t-h4-display">
                      {item.shortLabel ?? item.label}
                    </span>
                    {item.description ? (
                      <span className="mt-1.5 block max-w-[46ch] text-body-sm leading-relaxed text-text-secondary">
                        {item.description}
                      </span>
                    ) : null}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transform-none"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }

  if (variant === 'editorial') {
    return (
      <nav
        aria-label={title}
        className={`bc-section-sm bg-surface ${className}`.trim()}
        data-testid="related-links"
      >
        <div className="bc-container">
          <div className="border-t border-border-subtle pt-8">
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
              <Heading className="font-sans t-eyebrow tracking-[0.16em] text-text-secondary">
                {title}
              </Heading>
              {description ? (
                <p className="t-body-sm max-w-xl text-text-secondary md:text-right">{description}</p>
              ) : null}
            </div>

            <ul className="mt-6 grid gap-x-8 gap-y-1.5 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <li key={item.href} className="border-b border-border-subtle/70 last:border-b-0 md:last:border-b">
                  <Link
                    href={item.href}
                    target={item.target}
                    className="bc-focus-ring group flex min-h-[48px] flex-col justify-center gap-1 py-3 text-body-sm font-medium text-text-primary transition-colors duration-200 hover:text-bc-primary"
                  >
                    <span className="flex items-start gap-2">
                      <span className="underline-offset-4 group-hover:underline">{item.label}</span>
                      <span
                        aria-hidden="true"
                        className="mt-[2px] shrink-0 text-bc-primary transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transform-none"
                      >
                        →
                      </span>
                    </span>
                    {/* Contexto do destino: o link explica para onde leva. */}
                    {item.description ? (
                      <span className="font-sans text-[0.8125rem] font-normal normal-case leading-[1.5] tracking-normal text-text-secondary">
                        {item.description}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav
      aria-label={title}
      className={`container mx-auto px-6 py-12 ${className}`}
      data-testid="related-links"
    >
      <Heading className="mb-2 t-h3-editorial text-teal-900">{title}</Heading>
      {description && <p className="mb-6 max-w-3xl t-body-lg text-teal-800">{description}</p>}
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.href} className="rounded-card bg-surface-muted p-6 transition-colors duration-200 hover:bg-surface-muted/70">
            <Link
              href={item.href}
              target={item.target}
              className="t-body-lg font-semibold text-teal-700 underline-offset-4 hover:underline"
            >
              {item.label}
            </Link>
            {item.description && <p className="mt-2 text-teal-800">{item.description}</p>}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default RelatedLinks
