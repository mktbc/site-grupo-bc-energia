import { ReactNode } from 'react'

import { BCIcon } from '@/components/BCIcon'
import type { BCIconName } from '@/config/icons'
import { buttonStyles } from '@/components/Button/Button.style'
import Link from '@/components/Link'
import SectionHeader from '@/components/SectionHeader/SectionHeader'

import ProductSection, { type ProductSectionTone } from './ProductSection'

export type ProductIntroProps = {
  eyebrow?: string
  title: ReactNode
  /** Parágrafos curtos — evita parede de texto. */
  paragraphs: Array<string>
  image: {
    src: string
    alt: string
    srcSet?: string
    sizes?: string
    width?: number
    height?: number
  }
  /** Coluna do visual. Texto ocupa 5/12 e imagem 7/12 (ou o inverso). */
  imagePosition?: 'right' | 'left'
  highlights?: Array<{ icon?: BCIconName; label: string; value: string }>
  cta?: { label: string; href: string; target?: string; ariaLabel?: string }
  tone?: ProductSectionTone
  id?: string
}

/**
 * Introdução padrão das páginas de produto: o que é, que problema resolve e
 * por que importa — em duas colunas (texto 5/12, visual 7/12) e uma coluna
 * no mobile.
 */
const ProductIntro = ({
  eyebrow,
  title,
  paragraphs,
  image,
  imagePosition = 'right',
  highlights,
  cta,
  tone = 'surface',
  id
}: ProductIntroProps) => (
  <ProductSection tone={tone} id={id}>
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
      <div
        className={`lg:col-span-5 ${imagePosition === 'left' ? 'lg:order-2' : ''}`.trim()}
      >
        <SectionHeader eyebrow={eyebrow} title={title} />

        <div className="mt-5 flex flex-col gap-4">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="t-body-lg text-text-secondary">
              {paragraph}
            </p>
          ))}
        </div>

        {highlights?.length ? (
          <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3"
              >
                {item.icon ? (
                  <BCIcon name={item.icon} size={28} className="mt-0.5 shrink-0" />
                ) : null}
                <div>
                  <dt className="t-eyebrow text-bc-primary">{item.label}</dt>
                  <dd className="mt-1 t-body-sm text-text-primary">
                    {item.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        ) : null}

        {cta ? (
          <Link
            href={cta.href}
            target={cta.target}
            aria-label={cta.ariaLabel}
            data-cta-name={cta.label}
            data-cta-location="product_intro"
            className={`${buttonStyles({ size: 'lg', rounded: true })} mt-8 min-h-[48px] justify-center`}
          >
            {cta.label}
          </Link>
        ) : null}
      </div>

      <div className={`lg:col-span-7 ${imagePosition === 'left' ? 'lg:order-1' : ''}`.trim()}>
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={image.sizes ?? '(max-width: 1024px) 100vw, 58vw'}
          alt={image.alt}
          width={image.width ?? 1200}
          height={image.height ?? 800}
          loading="lazy"
          decoding="async"
          className="h-auto w-full rounded-[8px] object-cover"
        />
      </div>
    </div>
  </ProductSection>
)

export default ProductIntro
