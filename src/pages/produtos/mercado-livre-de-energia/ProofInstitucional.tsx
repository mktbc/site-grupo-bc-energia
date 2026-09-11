import { useEffect, useState } from 'react'

import Link from '@/components/Link'
import { ProductSection } from '@/components/Product'
import type { SectionGraphic } from '@/components/Product/ProductSection'
import { getNumbers } from '@/services'

type NumberItem = { title?: string; subtitle?: string }

export type ProofInstitucionalProps = {
  graphic?: SectionGraphic
  context: string
  title: string
  description?: string
  link?: { label: string; href: string; target?: string }
  id?: string
}

/**
 * Redesign pontual da faixa institucional de prova (somente esta página).
 * Conteúdo, dados, rotas e tracking preservados — apenas arquitetura visual.
 */
const ProofInstitucional = ({
  context,
  title,
  description,
  link,
  id,
  graphic = { variant: 'radial', tone: 'light', size: 'large', position: 'bottom-cut', opacity: 0.05 }
}: ProofInstitucionalProps) => {
  const [data, setData] = useState<NumberItem[]>([])

  useEffect(() => {
    let active = true
    getNumbers(context).then((res) => {
      if (active) setData(res)
    })
    return () => {
      active = false
    }
  }, [context])

  return (
    <ProductSection graphic={graphic} tone="dark" id={id}>
      <div className="mx-auto max-w-[1180px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <span aria-hidden="true" className="block h-[2px] w-8 bg-bc-cyan" />
            <h2 className="mt-5 max-w-[16ch] t-h2 text-white">
              {title}
            </h2>
            {description ? (
              <p className="mt-[18px] max-w-[28rem] t-body-lg text-white/75">
                {description}
              </p>
            ) : null}
            {link ? (
              <Link
                href={link.href}
                target={link.target}
                data-cta-name={link.label}
                data-cta-location="product_proof"
                className="group mt-8 inline-flex min-h-[44px] items-center gap-2 t-action-label text-bc-cyan underline-offset-[6px] transition-all duration-[180ms] ease-out hover:text-text-inverse hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bc-dark"
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-[180ms] ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ) : null}
          </div>

          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {data.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="flex h-full flex-col rounded-[12px] bg-white/[0.04] px-5 pb-5 pt-[18px] sm:min-h-[150px]"
              >
                <dt className="t-metric-md text-bc-cyan">
                  {item.title}
                </dt>
                <dd className="mt-3 t-body-sm text-white/75">
                  {item.subtitle}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </ProductSection>
  )
}

export default ProofInstitucional
