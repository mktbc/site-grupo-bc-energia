import { EditorialIndex } from '@/components/Editorial'
import type { SegmentChallenge } from '@/data/segments/segments.content'

import SegmentSection, { type SegmentSectionTone } from './SegmentSection'
import type { SectionGraphic } from '@/components/Product/ProductSection'

export type SegmentChallengesProps = {
  /** Elemento oficial de apoio da seção — VISUAL SYSTEM 02. */
  graphic?: SectionGraphic
  eyebrow?: string
  title: string
  description?: string
  items: Array<SegmentChallenge>
  tone?: SegmentSectionTone
  id?: string
}

/**
 * Desafios do segmento — faixa editorial de 3 colunas com o mesmo peso visual.
 *
 * Lista tipográfica: título + texto, organizada só por grade e espaçamento
 * (sem filete por item). Contrasta com Benefícios, que usa superfície.
 */
const SegmentChallenges = ({
  graphic = { variant: 'chevrons', tone: 'teal', size: 'small', position: 'top-right', opacity: 0.05 },
  eyebrow,
  title,
  description,
  items,
  tone = 'soft',
  id
}: SegmentChallengesProps) => {
  if (!items?.length) return null

  return (
    <SegmentSection graphic={graphic} tone={tone} id={id}>
      <EditorialIndex eyebrow={eyebrow} title={title} description={description}>
        <ul className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-12">
          {items.map((item) => (
            <li key={item.title}>
              <h3 className="t-h4 text-text-primary">{item.title}</h3>
              <p className="mt-2 t-body-sm text-text-secondary">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </EditorialIndex>
    </SegmentSection>
  )
}


export default SegmentChallenges
