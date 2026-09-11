import { BCIcon } from '@/components/BCIcon'
import { Section } from '@/components/Layout'
import Image from '@/components/Image'
import Link from '@/components/Link'
import { buttonStyles } from '@/components/Button/Button.style'

import { SolutionShowcaseProps } from './SolutionShowcase.type'

/**
 * Apresentação institucional de uma solução do Grupo BC Energia.
 *
 * Componente único e orientado a dados: cada produto (Mercado Livre, Consórcio,
 * Gestão, I-REC, Arrendamento, Jurídico) fornece apenas os campos que realmente
 * existem. Blocos ausentes (facts, benefits, image, cta) simplesmente não são
 * renderizados — nada é inventado.
 *
 * Hierarquia semântica: h2 (nome da solução) → h3 (vantagens). Os demais
 * elementos visuais não viram heading.
 */
const SolutionShowcase = ({
  icon,
  iconSrc,
  eyebrow,
  title,
  headline,
  description,
  facts,
  benefits,
  benefitsTitle = 'Vantagens',
  image,
  cta,
  imagePosition,
  inverted = false,
  supportText,
  highlights,
  disclaimer,
  className = '',
  id
}: SolutionShowcaseProps) => {
  const imageLeft = imagePosition ? imagePosition === 'left' : inverted
  const imageEl = image ? (
    <Image
      className="h-full w-full rounded-[8px] object-cover"
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.sizes}
      alt={image.alt}
      width={image.width ?? 1100}
      height={image.height ?? 1500}
    />
  ) : null

  return (
    <Section id={id} as="section" className={`py-16 lg:py-24 ${className}`}>
      <div
        className={[
          'flex flex-col gap-9 lg:items-center lg:gap-10 xl:gap-12',
          imageLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'
        ].join(' ')}
      >
        {/* ------------------------------ Conteúdo ----------------------------- */}
        <div className="lg:basis-[58%]">
          <div className="flex items-center gap-4">
            {icon || iconSrc ? (
              <span
                aria-hidden="true"
                className="inline-flex shrink-0 items-center"
              >
                {icon ? (
                  <BCIcon name={icon} size={48} />
                ) : (
                  <Image src={iconSrc as string} alt="" aria-hidden="true" width={48} height={48} />
                )}
              </span>
            ) : null}

            <div>
              {eyebrow ? (
                <span className="block t-eyebrow tracking-[0.14em] text-bc-primary">
                  {eyebrow}
                </span>
              ) : null}
              <h2 className="t-h2 mt-1 text-bc-dark">
                {title}
              </h2>
            </div>
          </div>

          {headline ? (
            <p className="mt-6 max-w-2xl t-h4 font-medium text-bc-dark">
              {headline}
            </p>
          ) : null}

          <p className="mt-5 max-w-2xl t-body-lg text-text-secondary">{description}</p>

          {supportText ? (
            <p className="mt-4 max-w-2xl t-body text-text-secondary">
              {supportText}
            </p>
          ) : null}

          {highlights?.length ? (
            <div className="mt-8">
              <dl className="flex flex-wrap gap-3">
                {highlights.map((highlight) => (
                  <div
                    key={highlight.label}
                    className="rounded-card bg-bc-primary/[0.08] px-5 py-3 ring-1 ring-inset ring-bc-primary/15"
                  >
                    <dt className="t-eyebrow tracking-[0.12em] text-bc-primary">
                      {highlight.label}
                    </dt>
                    <dd className="mt-0.5 t-body font-semibold text-bc-dark">
                      {highlight.value}
                    </dd>
                  </div>
                ))}
              </dl>
              {disclaimer ? (
                <p className="mt-3 max-w-2xl t-body-sm leading-relaxed text-text-secondary">
                  {disclaimer}
                </p>
              ) : null}
            </div>
          ) : null}


          {facts?.length ? (
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-card border-l-2 border-bc-primary bg-surface-muted/70 px-5 py-4"
                >
                  <dt className="t-eyebrow tracking-[0.1em] text-bc-primary">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 t-body font-medium text-bc-dark">
                    {fact.value}
                    {fact.note ? (
                      <span className="mt-1 block t-body-sm font-normal text-text-secondary">
                        {fact.note}
                      </span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {benefits?.length ? (
            <div className="mt-7">
              <h3 className="t-h4-display tracking-[0.06em] text-bc-dark">
                {benefitsTitle}
              </h3>
              <ul className="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <li key={benefit.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bc-primary/[0.08] text-bc-primary"
                    >
                      {benefit.icon ? (
                        <BCIcon name={benefit.icon} size={24} />
                      ) : (
                        <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                          <path
                            d="m4 10.5 4 4 8-9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <div>
                      <p className="t-body font-semibold text-bc-dark">
                        {benefit.title}
                      </p>
                      {benefit.description ? (
                        <p className="mt-1 t-body-sm text-text-secondary">
                          {benefit.description}
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {cta ? (
            <div className="mt-7">
              <Link
                href={cta.href}
                target={cta.target ?? '_self'}
                className={`${buttonStyles({ size: 'xl', rounded: true })} w-full sm:w-auto`}
              >
                {cta.label}
              </Link>
              {cta.note ? (
                <p className="mt-3 max-w-md t-body-sm leading-relaxed text-text-secondary">
                  {cta.note}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* ------------------------------- Visual ------------------------------ */}
        {image ? (
          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none lg:basis-[42%]">
            <span
              aria-hidden="true"
              className="absolute -inset-x-4 -bottom-4 top-10 hidden rounded-card bg-bc-primary/[0.06] lg:block"
            />
            <div className="relative overflow-hidden rounded-[8px]">
              {image.href ? (
                <Link href={image.href} target={image.target ?? '_self'} tabIndex={-1} aria-hidden="true">
                  {imageEl}
                </Link>
              ) : (
                imageEl
              )}
            </div>
          </div>
        ) : null}
      </div>
    </Section>
  )
}

export default SolutionShowcase
