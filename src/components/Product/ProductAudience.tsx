import { ReactNode } from 'react'

import { BCIcon } from '@/components/BCIcon'
import SectionHeader from '@/components/SectionHeader/SectionHeader'
import type { BCIconName } from '@/config/icons'

import ProductSection, { type ProductSectionTone } from './ProductSection'

export type ProductAudienceItem = {
  icon?: BCIconName
  title: string
  description?: string
}

export type ProductAudienceProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  items: Array<ProductAudienceItem>
  /** Requisitos objetivos já publicados (checklist). */
  requirements?: Array<string>
  tone?: ProductSectionTone
  id?: string
}

/**
 * "Para quem é" — perfis suportados pela copy atual (nenhum segmento novo).
 */
const ProductAudience = ({
  eyebrow,
  title,
  description,
  items,
  requirements,
  tone = 'surface',
  id
}: ProductAudienceProps) => (
  <ProductSection tone={tone} id={id}>
    <SectionHeader eyebrow={eyebrow} title={title} description={description} />

    <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
      <ul
        className={`grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 ${requirements?.length ? 'lg:col-span-7' : 'lg:col-span-12 lg:grid-cols-3'}`}
      >
        {items.map((item) => (
          <li key={item.title} className="max-w-[36ch]">
            {item.icon ? <BCIcon name={item.icon} size={36} /> : null}
            <h3 className="mt-3 t-h4 text-text-primary">{item.title}</h3>
            {item.description ? (
              <p className="mt-2 t-body-sm text-text-secondary">{item.description}</p>
            ) : null}
          </li>
        ))}
      </ul>

      {requirements?.length ? (
        <div className="lg:col-span-5">
          <div className="flex flex-col gap-4 rounded-[12px] bg-surface-muted p-7">
            <h3 className="t-h4 text-text-primary">Requisitos</h3>
            <ul className="flex flex-col gap-3">
              {requirements.map((requirement) => (
                <li key={requirement} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bc-primary/10 t-label font-bold text-bc-primary"
                  >
                    ✓
                  </span>
                  <span className="t-body-sm text-text-secondary">
                    {requirement}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  </ProductSection>
)

export default ProductAudience
