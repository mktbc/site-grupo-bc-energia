import { ReactNode } from 'react'

import { BCIcon } from '@/components/BCIcon'
import SectionHeader from '@/components/SectionHeader/SectionHeader'
import type { BCIconName } from '@/config/icons'

import ProductSection, { type ProductSectionTone } from './ProductSection'

export type ProductBenefit = {
  icon?: BCIconName
  title: string
  description?: string
}

export type ProductBenefitsProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  items: Array<ProductBenefit>
  tone?: ProductSectionTone
  id?: string
  align?: 'left' | 'center'
}

/**
 * Benefícios em composição editorial: ícone oficial, título e descrição
 * diretamente sobre o fundo da seção. Sem card, borda ou sombra — a separação
 * é feita por espaço e hierarquia tipográfica.
 */
const ProductBenefits = ({
  eyebrow,
  title,
  description,
  items,
  tone = 'muted',
  id,
  align = 'left'
}: ProductBenefitsProps) => {
  const columns = items.length % 4 === 0 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'

  return (
    <ProductSection tone={tone} id={id}>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} align={align} level="mid" />

      <ul
        className={`mt-10 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:gap-y-12 ${columns}`}
      >
        {items.map((item) => (
          <li key={item.title} className="max-w-[38ch]">
            {item.icon ? <BCIcon name={item.icon} size={40} /> : null}
            <h3 className="mt-4 t-h4 text-text-primary">{item.title}</h3>
            {item.description ? (
              <p className="mt-2 t-body-sm text-text-secondary">{item.description}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </ProductSection>
  )
}

export default ProductBenefits
