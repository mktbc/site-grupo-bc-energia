import { ReactNode } from 'react'

import { EditorialIndex } from '@/components/Editorial'

import InstitutionalSection, { type InstitutionalSectionTone } from './InstitutionalSection'

export type InstitutionalValueItem = {
  title: string
  description: string
}

export type InstitutionalValuesProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  /** Propósito, missão e visão — texto oficial, sem reescrita. */
  items: Array<InstitutionalValueItem>
  /** Valores oficiais, exibidos como lista curta. */
  values?: Array<string>
  valuesTitle?: string
  tone?: InstitutionalSectionTone
  id?: string
}

/** Divide o texto oficial em dois parágrafos de leitura, sem reescrever nada. */
const splitIntro = (text: string) => {
  const marker = 'Nossa visão'
  const index = text.indexOf(marker)
  if (index <= 0) return [text]
  return [text.slice(0, index).trim(), text.slice(index).trim()]
}

/**
 * Composição editorial de Propósito / Missão / Visão: lista definida em coluna
 * de leitura, com filete institucional — evita o "template de 3 cards".
 */
const InstitutionalValues = ({
  eyebrow,
  title,
  description,
  items,
  values,
  valuesTitle = 'Nossos valores',
  tone = 'surface',
  id
}: InstitutionalValuesProps) => (
  <InstitutionalSection tone={tone} id={id}>
    <EditorialIndex
      eyebrow={eyebrow}
      title={title}
      className="[&>header]:max-w-none lg:[&>header]:max-w-[75%]"
    >
      {description ? (
        <div className="mb-9 grid grid-cols-1 items-start gap-x-12 gap-y-4 lg:grid-cols-2 lg:gap-x-16">
          {(typeof description === 'string' ? splitIntro(description) : [description]).map(
            (paragraph, index) => (
              <p
                key={index}
                className="t-body-lg text-text-secondary"
              >
                {paragraph}
              </p>
            )
          )}
        </div>
      ) : null}

      {values?.length ? (

        <div className="border-t border-border-subtle pt-6">
          <h3 className="t-eyebrow text-bc-primary">{valuesTitle}</h3>
          <ul className="mt-3.5 grid grid-cols-1 gap-x-8 gap-y-2.5 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {values.map((value) => (
              <li key={value} className="flex items-baseline gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-bc-primary" />
                <span className="t-body-sm font-semibold text-text-primary">
                  {value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <dl className="mt-9 grid grid-cols-1 items-start gap-x-10 gap-y-8 md:grid-cols-3">
        {items.map((item, index) => (
          <div key={item.title} className="border-t border-border-subtle pt-5">
            <dt className="t-h3 text-bc-dark">{item.title}</dt>
            <dd className="mt-2.5 t-body-sm text-text-secondary">
              {item.description}
            </dd>
          </div>
        ))}
      </dl>
    </EditorialIndex>
  </InstitutionalSection>
)

export default InstitutionalValues
