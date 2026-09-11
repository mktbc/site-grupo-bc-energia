import { EditorialIndex } from '@/components/Editorial'

import SegmentSection, { type SegmentSectionTone } from './SegmentSection'

export type SegmentBenefitItem = {
  title: string
  description?: string
  /** Ícone legado em /public — não é mais exibido (VISUAL 12). */
  icon?: string
}

export type SegmentBenefitsProps = {
  eyebrow?: string
  title: string
  description?: string
  items: Array<SegmentBenefitItem>
  tone?: SegmentSectionTone
  id?: string
}

/**
 * VISUAL 12 — benefícios em superfícies sólidas e discretas.
 *
 * Mesmo conteúdo publicado em `src/data/segments/*.json`. Cards de superfície
 * (sem borda, sombra, ícone ou amarelo) para diferenciar do bloco Desafios,
 * que é só tipográfico. Os ícones do JSON são genéricos e iguais em todos os
 * segmentos, por isso não são exibidos.
 */
const SegmentBenefits = ({
  eyebrow,
  title,
  description,
  items,
  tone = 'surface',
  id
}: SegmentBenefitsProps) => {
  if (!items?.length) return null

  return (
    <SegmentSection tone={tone} id={id}>
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
    </SegmentSection>
  )
}

export default SegmentBenefits
