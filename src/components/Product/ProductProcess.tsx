import { ReactNode } from 'react'

import SectionHeader from '@/components/SectionHeader/SectionHeader'

import ProductSection, { type ProductSectionTone } from './ProductSection'
import type { ProductStep } from './ProductSteps'
import type { SectionGraphic } from './ProductSection'

export type ProductProcessProps = {
  /** Elemento oficial de apoio da seção — VISUAL SYSTEM 02. */
  graphic?: SectionGraphic
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  steps: Array<ProductStep>
  image?: {
    src: string
    alt: string
    srcSet?: string
    sizes?: string
  }
  note?: string
  tone?: ProductSectionTone
  id?: string
}

/**
 * VISUAL 11 — "como funciona" como sequência tipográfica.
 *
 * Mantém a lógica de processo (mesmos passos, mesma ordem), mas troca as
 * caixas por uma lista numerada. O numeral é um marcador discreto (18px),
 * para não competir com métricas (relatório S1).
 */
const ProductProcess = ({
  graphic = { variant: 'chevrons', tone: 'teal', size: 'small', position: 'top-right', opacity: 0.05 },
  eyebrow,
  title,
  description,
  steps,
  image,
  note,
  tone = 'muted',
  id
}: ProductProcessProps) => (
  <ProductSection graphic={graphic} tone={tone} id={id}>
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-10">
      <div className="lg:col-span-5">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} level="mid" />

        {image ? (
          <img
            src={image.src}
            srcSet={image.srcSet}
            sizes={image.sizes ?? '(max-width: 1024px) 100vw, 40vw'}
            alt={image.alt}
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
            className="bc-fmt-portrait mt-6 hidden max-h-[460px] object-center lg:block"
          />
        ) : null}
      </div>

      <ol className="flex flex-col gap-8 lg:col-span-7 lg:pt-1">
        {steps.map((step, index) => (
          <li key={step.title} className="grid grid-cols-[1.75rem_1fr] gap-x-4">
            <span
              aria-hidden="true"
              className="font-display text-[1.125rem] font-bold leading-[1.35] tabular-nums text-bc-primary"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="t-h4 text-text-primary">{step.title}</h3>
              <p className="mt-2 max-w-[62ch] t-body-sm text-text-secondary">
                {step.description}
              </p>
            </div>
          </li>
        ))}

        {note ? (
          <li className="rounded-[12px] bg-bc-primary/[0.04] px-6 py-5 t-body-sm text-text-secondary">
            {note}
          </li>
        ) : null}
      </ol>
    </div>
  </ProductSection>
)

export default ProductProcess
