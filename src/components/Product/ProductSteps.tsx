import { ReactNode } from 'react'

import SectionHeader from '@/components/SectionHeader/SectionHeader'

import ProductSection, { type ProductSectionTone } from './ProductSection'
import type { SectionGraphic } from './ProductSection'

export type ProductStep = {
  title: string
  description: string
}

export type ProductStepsProps = {
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
  /** Nota final opcional (contexto já publicado). */
  note?: string
  tone?: ProductSectionTone
  id?: string
}

/**
 * "Como funciona" — passos numerados, sem timeline decorativa.
 * Família única de step card para todas as soluções.
 */
const ProductSteps = ({
  graphic = { variant: 'none' },
  eyebrow,
  title,
  description,
  steps,
  image,
  note,
  tone = 'surface',
  id
}: ProductStepsProps) => (
  <ProductSection graphic={graphic} tone={tone} id={id}>
    <SectionHeader eyebrow={eyebrow} title={title} description={description} />

    <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
      {image ? (
        <div className="lg:col-span-5">
          <img
            src={image.src}
            srcSet={image.srcSet}
            sizes={image.sizes ?? '(max-width: 1024px) 100vw, 40vw'}
            alt={image.alt}
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-[8px] object-cover"
          />
        </div>
      ) : null}

      <ol className={image ? 'flex flex-col gap-7 lg:col-span-7' : 'grid grid-cols-1 gap-6 lg:col-span-12 lg:grid-cols-2'}>
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span
              aria-hidden="true"
              className="w-7 shrink-0 font-display text-[1.125rem] font-bold leading-[1.35] tabular-nums text-bc-primary"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="t-h4 text-text-primary">{step.title}</h3>
              <p className="mt-1.5 t-body-sm text-text-secondary">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>

    {note ? (
      <p className="mt-9 measure-body border-l-2 border-bc-primary/35 pl-5 t-body-sm text-text-secondary">
        {note}
      </p>
    ) : null}
  </ProductSection>
)

export default ProductSteps
