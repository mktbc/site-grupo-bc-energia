import { ReactNode } from 'react'

import ProductSection, { type ProductSectionTone } from '@/components/Product/ProductSection'

type Item = { title: string; description?: string }

const SectionHead = ({
  eyebrow,
  title,
  className = '',
  titleWidth = 'max-w-[22ch]'
}: {
  eyebrow?: string
  title: ReactNode
  className?: string
  titleWidth?: string
}) => (
  <div className={className}>
    {eyebrow ? (
      <div className="flex items-center gap-3">
        <span aria-hidden className="h-0.5 w-7 bg-bc-accent" />
        <p className="t-eyebrow text-bc-primary">{eyebrow}</p>
      </div>
    ) : null}
    <h2 className={`mt-2.5 ${titleWidth} t-h2 text-text-primary`}>
      {title}
    </h2>
  </div>
)

/**
 * Benefícios do Mercado Livre — composição editorial em duas camadas:
 * conclusão principal em destaque + três benefícios equilibrados em linha.
 */
export const BenefitsEditorial = ({
  eyebrow,
  title,
  items,
  tone = 'surface'
}: {
  eyebrow?: string
  title: ReactNode
  items: Array<Item>
  tone?: ProductSectionTone
}) => {
  const [lead, ...rest] = items

  return (
    <ProductSection tone={tone}>
      <div className="mx-auto max-w-[1180px]">
        <SectionHead eyebrow={eyebrow} title={title} />

        {lead ? (
          <div className="mt-7 measure-intro">
            <h3 className="t-h3 text-text-primary">
              {lead.title}
            </h3>
            {lead.description ? (
              <p className="mt-2.5 t-body-sm text-text-secondary">
                {lead.description}
              </p>
            ) : null}
          </div>
        ) : null}

        {rest.length ? (
          <ul className="mt-9 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((item, index) => (
              <li key={item.title} className="pr-4">
                <h3 className="mt-2 t-h4 text-text-primary">

                  {item.title}
                </h3>
                {item.description ? (
                  <p className="mt-2 t-body-sm leading-[1.6] text-text-secondary">
                    {item.description}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </ProductSection>
  )
}

/**
 * Contexto do mercado — introdução ampla, "Participantes" integrado ao mesmo
 * cluster e os demais aspectos em grid editorial 3 + 2.
 */
export const MarketContext = ({
  eyebrow,
  title,
  description,
  participants,
  items,
  tone = 'soft'
}: {
  eyebrow?: string
  title: ReactNode
  description?: string
  participants?: Item
  items: Array<Item>
  tone?: ProductSectionTone
}) => (
  <ProductSection tone={tone}>
    <div className="mx-auto max-w-[1180px]">
      <SectionHead eyebrow={eyebrow} title={title} titleWidth="measure-intro" />

      {description ? (
        <p className="mt-5 measure-body t-body-sm text-text-secondary">
          {description}
        </p>
      ) : null}

      {participants ? (
        <div className="mt-7 measure-body border-l-2 border-bc-primary/25 pl-5">
          <p className="t-caption font-semibold tracking-[0.14em] text-bc-primary">
            {participants.title}
          </p>
          <p className="mt-2 t-body-sm text-text-secondary">
            {participants.description}
          </p>
        </div>
      ) : null}

      <ul className="mt-9 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-6">
        {items.map((item, index) => {
          const isCcee = /CCEE|Câmara de Comercialização/i.test(item.title)
          return (
            <li
              key={item.title}
              className={`lg:col-span-2 ${ items.length === 5 && index >= 3 ? 'lg:col-span-3' : '' } ${isCcee ? 'rounded-[12px] bg-bc-primary/[0.04] px-5 py-[18px]' : ''}`}
            >
              <h3 className="mt-2 t-h4 text-text-primary">

                {item.title}
              </h3>
              {item.description ? (
                <p className="mt-2 t-body-sm leading-[1.6] text-text-secondary">
                  {item.description}
                </p>
              ) : null}
            </li>
          )
        })}
      </ul>
    </div>
  </ProductSection>
)

/**
 * "Para quem é" — critérios compactos + 3 perfis numerados em colunas iguais.
 */
export const ProfilesEditorial = ({
  eyebrow,
  title,
  requirements,
  items,
  tone = 'surface'
}: {
  eyebrow?: string
  title: ReactNode
  requirements?: Array<string>
  items: Array<Item>
  tone?: ProductSectionTone
}) => (
  <ProductSection tone={tone}>
    <div className="mx-auto max-w-[1180px]">
      <SectionHead eyebrow={eyebrow} title={title} titleWidth="max-w-[500px]" />

      {requirements?.length ? (
        <div className="mt-5">
          <p className="t-caption font-semibold tracking-[0.14em] text-bc-primary">
            Critérios principais
          </p>
          <ul className="mt-3 flex measure-intro flex-col gap-2.5">
            {requirements.map((requirement) => (
              <li
                key={requirement}
                className="flex items-start gap-3 t-body-sm text-text-primary/80"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className="mt-[0.28rem] h-4 w-4 shrink-0 text-bc-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8.5 6.2 12 13 4.5" />
                </svg>
                {requirement}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <ul className="mt-9 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <li key={item.title}>
            <h3 className="mt-2.5 t-h3 text-text-primary">
              {item.title}
            </h3>
            {item.description ? (
              <p className="mt-2 t-body-sm leading-[1.6] text-text-secondary">
                {item.description}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  </ProductSection>
)

/**
 * Portfólio — faixa clara de nova camada informacional + grade técnica 2 colunas.
 */
export const PortfolioEditorial = ({
  eyebrow,
  title,
  description,
  items,
  tone = 'soft'
}: {
  eyebrow?: string
  title: ReactNode
  description?: string
  items: Array<string>
  tone?: ProductSectionTone
}) => (
  <ProductSection
    tone={tone}
    graphic={{ variant: 'loops', tone: 'teal', size: 'large', position: 'bottom-right', opacity: 0.04 }}
  >
    <div className="mx-auto max-w-[1180px]">
      <SectionHead eyebrow={eyebrow} title={title} titleWidth="measure-intro" />

      {description ? (
        <p className="mt-3.5 measure-intro t-body-sm text-text-secondary">
          {description}
        </p>
      ) : null}

      <ul className="mt-8 grid grid-cols-1 gap-x-14 gap-y-1 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 py-2.5">
            <svg
              aria-hidden
              viewBox="0 0 16 16"
              className="mt-[0.15rem] h-4 w-4 shrink-0 text-bc-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8.5 6.2 12 13 4.5" />
            </svg>
            <span className="t-body-sm text-text-primary">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </ProductSection>
)
