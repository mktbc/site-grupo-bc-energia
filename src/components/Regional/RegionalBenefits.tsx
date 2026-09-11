import { EditorialIndex } from '@/components/Editorial'

import RegionalSection, { type RegionalSectionTone } from './RegionalSection'

export type RegionalBenefitItem = {
  title: string
  description?: string
}

export type RegionalBenefitsProps = {
  eyebrow?: string
  title: string
  description?: string
  items: Array<RegionalBenefitItem>
  tone?: RegionalSectionTone
  id?: string
}

/**
 * VISUAL 13 — diferenciais como composição tipográfica em duas colunas.
 *
 * Mesmo conteúdo publicado em `src/data/regions`, sem cards, sem ícones e sem
 * amarelo sobre fundo claro.
 */
const RegionalBenefits = ({
  eyebrow,
  title,
  description,
  items,
  tone = 'surface',
  id
}: RegionalBenefitsProps) => {
  if (!items?.length) return null

  return (
    <RegionalSection tone={tone} id={id}>
      <EditorialIndex eyebrow={eyebrow} title={title} description={description}>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {items.map((item) => (
            <li key={item.title} className="rounded-card bg-surface-muted p-5 lg:p-6">
              <h3 className="t-h4 text-text-primary">{item.title}</h3>
              {item.description ? (
                <p className="mt-1.5 t-body-sm text-text-secondary">
                  {item.description}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </EditorialIndex>
    </RegionalSection>
  )
}

export default RegionalBenefits
