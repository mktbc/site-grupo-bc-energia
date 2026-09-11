import { ReactNode } from 'react'

import SectionHeader from '@/components/SectionHeader/SectionHeader'

import ProductSection, { type ProductSectionTone } from './ProductSection'

export type ProductHighlightProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  /** Itens em checklist — mesmo ícone de check em todas as soluções. */
  items: Array<string>
  columns?: 1 | 2
  tone?: ProductSectionTone
  id?: string
}

/**
 * Bloco de checklist (portfólio de contratos, escopo de serviço, etc.).
 * Substitui os antigos `ChecklistItem` com ícones divergentes por produto.
 */
const ProductHighlight = ({
  eyebrow,
  title,
  description,
  items,
  columns = 2,
  tone = 'dark',
  id
}: ProductHighlightProps) => {
  const isDark = tone === 'dark'

  return (
    <ProductSection tone={tone} id={id}>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        className={isDark ? '[&_p.t-body-lg]:text-white/80' : ''}
      />

      <ul
        className={`mt-8 grid grid-cols-1 gap-x-8 gap-y-4 ${columns === 2 ? 'sm:grid-cols-2' : ''}`}
      >
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden="true"
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full t-label font-bold ${ isDark ? 'bg-white/10 text-text-inverse' : 'bg-bc-primary/10 text-bc-primary' }`}
            >
              ✓
            </span>
            <span
              className={`t-body-sm ${isDark ? 'text-white/85' : 'text-text-secondary'}`}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </ProductSection>
  )
}

export default ProductHighlight
