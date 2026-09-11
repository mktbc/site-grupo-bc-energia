import { ReactNode } from 'react'

import SectionHeader from '@/components/SectionHeader/SectionHeader'

import ProductSection, { type ProductSectionTone } from './ProductSection'
import type { SectionGraphic } from './ProductSection'

export type ProductLeadFact = { label: string; value: string }

export type ProductLeadProps = {
  /** Elemento oficial de apoio da seção — VISUAL SYSTEM 02. */
  graphic?: SectionGraphic
  eyebrow?: string
  title: ReactNode
  paragraphs: Array<string>
  image: {
    src: string
    alt: string
    srcSet?: string
    sizes?: string
    width?: number
    height?: number
    /** Classes adicionais para o <img> (ex.: aspect-ratio fixo). */
    imageClassName?: string
  }
  imagePosition?: 'right' | 'left'
  /** Dados objetivos do produto — composição tipográfica, sem card. */
  facts?: Array<ProductLeadFact>
  tone?: ProductSectionTone
  id?: string
}

/**
 * VISUAL 11 — abertura editorial da página de produto.
 *
 * Substitui o par "texto + card lateral" por uma composição de proposta:
 * texto protagonista (5/12), visual real (7/12) e dados objetivos em
 * hairlines tipográficas. Sem card, sem sombra, sem ícone decorativo.
 */
const ProductLead = ({
  graphic = { variant: 'loops', tone: 'teal', size: 'small', position: 'bottom-left', opacity: 0.05 },
  eyebrow,
  title,
  paragraphs,
  image,
  imagePosition = 'right',
  facts,
  tone = 'surface',
  id
}: ProductLeadProps) => (
  <ProductSection graphic={graphic} tone={tone} id={id}>
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
      <div className={`lg:col-span-7 ${imagePosition === 'left' ? 'lg:order-2' : ''}`.trim()}>
        <SectionHeader eyebrow={eyebrow} title={title} level="lead" />

        <div className="mt-4 flex flex-col gap-3.5">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="t-body-lg text-text-secondary"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {facts?.length ? (
          <dl className="mt-7 border-t border-border-subtle">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="grid grid-cols-1 gap-1 border-b border-border-subtle py-4 sm:grid-cols-[10rem_1fr] sm:gap-6"
              >
                <dt className="t-eyebrow text-bc-primary">{fact.label}</dt>
                <dd className="t-body-sm text-text-primary">{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      <div
        className={`lg:col-span-5 lg:self-start ${imagePosition === 'left' ? 'lg:order-1' : 'bc-offset-sm'}`.trim()}
      >
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={image.sizes ?? '(max-width: 1024px) 100vw, 40vw'}
          alt={image.alt}
          width={image.width ?? 1200}
          height={image.height ?? 800}
          loading="lazy"
          decoding="async"
          className={`w-full rounded-[8px] object-cover ${image.imageClassName ?? 'h-auto'}`}
        />
      </div>
    </div>
  </ProductSection>
)

export default ProductLead
