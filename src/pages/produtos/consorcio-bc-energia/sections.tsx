import { ReactNode, useEffect, useRef, useState } from 'react'

import type { AccordionType } from '@/components/Accordion/Accordion.type'
import BCIcon from '@/components/BCIcon/BCIcon'
import type { BCIconName } from '@/config/icons'
import ProductSection, { type ProductSectionTone } from '@/components/Product/ProductSection'
import SectionHeader from '@/components/SectionHeader/SectionHeader'

type Item = { title: string; description?: string }

/**
 * Seções editoriais exclusivas de /produtos/consorcio-bc-energia.
 *
 * REVISÃO GLOBAL (brandbook): menos traços e divisórias, tipografia oficial
 * via tokens globais (Barlow Condensed em títulos/numerais, Onest no corpo),
 * elementos de apoio sutis e iconografia institucional em teal.
 * Textos, links, SEO e tracking inalterados.
 */

const CheckMark = () => (
  <svg
    aria-hidden
    viewBox="0 0 16 16"
    className="mt-[0.3rem] h-4 w-4 shrink-0 text-bc-primary"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 8.5 6.2 12 13 4.5" />
  </svg>
)

/** Fontes renováveis citadas no texto — apoio visual com ícones oficiais. */
const SOURCE_ICONS: Array<BCIconName> = [
  'energia-solar',
  'energia-eolica',
  'ciclo-recursos',
  'energia-limpa',
  'ciclo-energia-renovavel'
]



export const BenefitsEditorial = ({
  eyebrow,
  title,
  items,
  highlightValue,
  highlightLabel,
  tone = 'surface',
  id
}: {
  eyebrow?: string
  title: ReactNode
  items: Array<Item>
  /** Número de impacto do benefício principal (ex.: "até 25%"). */
  highlightValue?: string
  /** Mensagem curta ao lado do número. */
  highlightLabel?: string
  tone?: ProductSectionTone
  id?: string
}) => {
  const [lead, ...rest] = items

  return (
    <ProductSection
      tone={tone}
      id={id}
      graphic={{
        variant: 'diagonal',
        tone: 'teal',
        size: 'medium',
        position: 'bottom-right',
        opacity: 0.05
      }}
    >
      <div className="max-w-[34rem]">
        <SectionHeader eyebrow={eyebrow} title={title} />
      </div>

      {lead ? (
        <div className="mt-8 rounded-[12px] bg-surface-soft px-6 py-7 sm:px-9 sm:py-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-baseline sm:gap-10">
            {highlightValue ? (
              <p className="shrink-0 t-metric-lg uppercase text-bc-primary">
                {highlightValue}
              </p>
            ) : null}

            <div className="max-w-[32rem]">
              <h3 className="t-h4-display text-text-primary">
                {highlightLabel ?? lead.title}
              </h3>
              {lead.description ? (
                <p className="mt-2.5 t-body text-text-secondary">{lead.description}</p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {rest.length ? (
        <ul className="mt-14 grid grid-cols-1 gap-x-14 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item, index) => (
            <li key={item.title}>
              <h3 className="t-h4 text-text-primary">{item.title}</h3>
              {item.description ? (
                <p className="mt-2.5 max-w-[26rem] t-body-sm text-text-secondary">
                  {item.description}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </ProductSection>

  )
}

export const ContextEditorial = ({
  eyebrow,
  title,
  description,
  items,
  tone = 'soft',
  id
}: {
  eyebrow?: string
  title: ReactNode
  description?: string
  items: Array<Item>
  tone?: ProductSectionTone
  id?: string
}) => {
  const [lead, ...rest] = items

  return (
    <ProductSection
      tone={tone}
      id={id}
      graphic={{
        variant: 'loops',
        tone: 'teal',
        size: 'large',
        position: 'top-right',
        opacity: 0.05
      }}
    >
      <div className="max-w-[50rem]">
        <SectionHeader eyebrow={eyebrow} title={title} variant="editorial" />

        {description ? (
          <p className="mt-4 max-w-[52rem] t-body text-text-secondary">{description}</p>
        ) : null}
      </div>

      {lead ? (
        <div className="mt-7 max-w-[48rem]">
          <p className="t-caption font-semibold tracking-[0.12em] text-bc-primary">
            {lead.title}
          </p>
          {lead.description ? (
            <p className="mt-2.5 t-body-sm text-text-secondary">{lead.description}</p>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center gap-6 sm:gap-7">
            {SOURCE_ICONS.map((icon) => (
              <BCIcon key={icon} name={icon} size={30} className="opacity-90" />
            ))}
          </div>
        </div>
      ) : null}

      {rest.length ? (
        <ul className="mt-10 grid grid-cols-1 gap-x-12 gap-y-9 sm:grid-cols-2">
          {rest.map((item, index) => (
            <li key={item.title}>
              <h3 className="t-h4 mt-3 text-text-primary">{item.title}</h3>
              {item.description ? (
                <p className="mt-2.5 max-w-[28rem] t-body-sm text-text-secondary">
                  {item.description}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </ProductSection>
  )
}

export const ProfilesEditorial = ({
  eyebrow,
  title,
  requirements,
  items,
  tone = 'surface',
  id
}: {
  eyebrow?: string
  title: ReactNode
  requirements: Array<string>
  items: Array<Item>
  tone?: ProductSectionTone
  id?: string
}) => (
  <ProductSection
    tone={tone}
    id={id}
    graphic={{
      variant: 'radial',
      tone: 'teal',
      size: 'medium',
      position: 'top-right',
      opacity: 0.05
    }}
  >
    <div className="max-w-[36rem]">
      <SectionHeader eyebrow={eyebrow} title={title} />
    </div>

    <div className="mt-8 grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[12px] bg-surface-soft px-6 py-7 sm:px-8 sm:py-8">
        <p className="t-caption font-semibold tracking-[0.14em] text-bc-primary">
          Critérios principais
        </p>
        <ul className="mt-4 flex flex-col gap-4">
          {requirements.map((requirement) => (
            <li
              key={requirement}
              className="flex items-start gap-3 t-body text-text-primary/85"
            >
              <CheckMark />
              {requirement}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="t-eyebrow text-bc-primary">Perfis atendidos</p>
        <ul className="mt-5 grid grid-cols-1 items-start gap-x-12 gap-y-8 sm:grid-cols-2">
          {items.map((item, index) => (
            <li key={item.title}>
              <h3 className="t-h4-display mt-3 text-text-primary">{item.title}</h3>
              {item.description ? (
                <p className="mt-2 t-body-sm text-text-secondary">{item.description}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </ProductSection>
)

const FaqItem = ({ title, content, open }: AccordionType) => {
  const [isOpen, setIsOpen] = useState(Boolean(open))
  const contentRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState<string | number>('0px')

  useEffect(() => {
    setMaxHeight(isOpen && contentRef.current ? contentRef.current.scrollHeight : '0px')
  }, [isOpen])

  return (
    <div
      className={`border-b border-border-subtle/70 last:border-b-0 transition-colors duration-normal ease-bc ${
        isOpen ? 'bg-surface-soft/60' : ''
      }`}
    >
      <h3 className="t-h4 text-text-primary">
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          className="bc-focus-ring flex w-full cursor-pointer items-center justify-between gap-5 px-4 py-4 text-left transition-colors duration-fast ease-bc hover:text-bc-primary sm:px-6 sm:py-6"
        >
          <span className={isOpen ? 'text-bc-primary' : ''}>{title}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-4 w-4 shrink-0 text-bc-primary transition-transform duration-normal ease-bc ${
              isOpen ? 'rotate-180' : ''
            }`}
          >
            <path d="m3 6 5 5 5-5" />
          </svg>
        </button>
      </h3>
      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-slow ease-bc motion-reduce:transition-none"
        style={{ maxHeight }}
      >
        <p className="px-4 pb-5 t-body-sm text-text-secondary sm:px-6 sm:pb-6">{content}</p>
      </div>
    </div>
  )
}

export const FaqEditorial = ({
  eyebrow = 'Perguntas frequentes',
  title = 'Dúvidas mais comuns',
  items,
  tone = 'muted',
  id = 'faq'
}: {
  eyebrow?: string
  title?: ReactNode
  items: Array<AccordionType>
  tone?: ProductSectionTone
  id?: string
}) =>
  items.length === 0 ? null : (
  <ProductSection tone={tone} id={id}>
    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-[0.8fr_1.4fr] lg:items-start">
      <div className="max-w-[24rem] lg:sticky lg:top-28">
        <SectionHeader eyebrow={eyebrow} title={title} />
      </div>

      <div className="w-full lg:max-w-[850px]">
        {items.map((item, index) => (
          <FaqItem key={item.title} open={index === 0} title={item.title} content={item.content} />
        ))}
      </div>
    </div>
  </ProductSection>
)
