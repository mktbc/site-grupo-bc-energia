import { ReactNode } from 'react'

import BCIcon from '@/components/BCIcon/BCIcon'
import type { BCIconName } from '@/config/icons'
import ProductSection from '@/components/Product/ProductSection'
import type { SectionGraphic } from '@/components/Product/ProductSection'

type Fact = { icon: BCIconName; label: string; value: ReactNode }

export type LeadInstitucionalProps = {
  graphic?: SectionGraphic
  eyebrow: string
  title: ReactNode
  paragraphs: Array<ReactNode>
  image: { src: string; alt: string; sizes?: string }
  facts: Array<Fact>
  id?: string
}

/**
 * Abertura institucional da página de Mercado Livre de Energia.
 *
 * Composição local (não compartilhada): texto (0.95fr) + fotografia (1.05fr)
 * como um único bloco visual, dados objetivos em hairline e detalhe amarelo
 * apenas como microacento.
 */
const LeadInstitucional = ({
  graphic,
  eyebrow,
  title,
  paragraphs,
  image,
  facts,
  id
}: LeadInstitucionalProps) => (
  <ProductSection graphic={graphic} tone="surface" id={id} flush>
    <div className="py-14 lg:py-[5.5rem]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-0.5 w-7 bg-bc-accent" />
            <p className="t-eyebrow text-bc-primary">{eyebrow}</p>
          </div>

          <h2 className="mt-3 max-w-[520px] t-h2 text-text-primary">
            {title}
          </h2>

          <div className="mt-5 flex max-w-[540px] flex-col gap-4">
            {paragraphs.map((paragraph, index) => (
              <p
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="t-body text-text-secondary"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="mt-8 grid max-w-[540px] grid-cols-1 gap-6 rounded-[12px] bg-bc-primary/[0.04] px-6 py-6 sm:grid-cols-2 sm:gap-8">
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1.5">
                <BCIcon name={fact.icon} size={20} />
                <dt className="t-eyebrow text-bc-primary">{fact.label}</dt>
                <dd className="t-body-sm text-text-primary">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative isolate overflow-hidden rounded-[8px]">
          <img
            src={image.src}
            alt={image.alt}
            sizes={image.sizes ?? '(max-width: 1024px) 100vw, 55vw'}
            width={1200}
            height={860}
            loading="lazy"
            decoding="async"
            className="h-[240px] w-full object-cover object-[38%_center] sm:h-[300px] lg:h-[420px] lg:min-h-[360px]"
          />
          <span
            aria-hidden
            className="bc-ovl bc-ovl-institutional"
          />
          <img
            aria-hidden
            src="/img/brand/bc-elemento-02-light.svg"
            alt=""
            className="pointer-events-none absolute -bottom-5 -right-5 hidden w-40 opacity-[0.06] sm:block"
          />
        </div>
      </div>
    </div>
  </ProductSection>
)

export default LeadInstitucional
