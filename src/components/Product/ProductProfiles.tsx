import { ReactNode } from 'react'

import { EditorialIndex } from '@/components/Editorial'

import ProductSection, { type ProductSectionTone } from './ProductSection'
import type { ProductAudienceItem } from './ProductAudience'

export type ProductProfilesProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  items: Array<ProductAudienceItem>
  requirements?: Array<string>
  tone?: ProductSectionTone
  id?: string
}

/**
 * VISUAL 11 — "para quem é" em colunas tipográficas.
 *
 * Mesmos perfis e requisitos já publicados, sem grid de cards e sem ícones.
 */
const ProductProfiles = ({
  eyebrow,
  title,
  description,
  items,
  requirements,
  tone = 'surface',
  id
}: ProductProfilesProps) => (
  <ProductSection tone={tone} id={id}>
    <EditorialIndex
      eyebrow={eyebrow}
      title={title}
      description={description}
    >
      <div className="-mt-2">

        {requirements?.length ? (
          <ul className="mt-4 flex flex-col gap-2">
            {requirements.map((requirement) => (
              <li
                key={requirement}
                className="flex gap-3 t-body-sm text-text-secondary"
              >
                <span aria-hidden="true" className="mt-[0.55rem] h-px w-4 shrink-0 bg-bc-primary" />
                {requirement}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.title} className="border-t border-border-subtle py-4 first:border-border-strong sm:[&:nth-child(2)]:border-border-strong">
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
  </ProductSection>
)

export default ProductProfiles
