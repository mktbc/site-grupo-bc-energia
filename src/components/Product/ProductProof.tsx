import { useEffect, useState } from 'react'

import Link from '@/components/Link'
import { getNumbers } from '@/services'

import ProductSection from './ProductSection'
import type { SectionGraphic } from './ProductSection'

type NumberItem = { title?: string; subtitle?: string }

export type ProductProofProps = {
  /** Elemento oficial de apoio da seção — VISUAL SYSTEM 02. */
  graphic?: SectionGraphic
  /** Mesmo `context` consumido pela seção Numbers — dados reais preservados. */
  context: string
  title: string
  description?: string
  /** Link editorial (não é botão sólido — o sólido fica no hero e no fechamento). */
  link?: { label: string; href: string; target?: string }
  id?: string
}

/**
 * VISUAL 11 — prova antecipada da página de produto.
 *
 * Faixa escura compacta, logo depois da proposta, com as MESMAS métricas do
 * serviço `getNumbers` (nenhum dado novo). Amarelo apenas sobre fundo escuro.
 */
const ProductProof = ({
  context,
  title,
  description,
  link,
  id,
  graphic = { variant: 'radial', tone: 'light', size: 'large', position: 'bottom-cut', opacity: 0.05 }
}: ProductProofProps) => {
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
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-5">
          <h2 className="t-h2 text-white">{title}</h2>
          {description ? (
            <p className="mt-4 max-w-[38rem] t-body text-white/80">
              {description}
            </p>
          ) : null}
          {link ? (
            <Link
              href={link.href}
              target={link.target}
              data-cta-name={link.label}
              data-cta-location="product_proof"
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 t-action-label text-bc-cyan underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bc-dark"
            >
              {link.label}
              <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </div>

        <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3 lg:col-span-7">
          {data.map((item, index) => (
            <div key={`${item.title}-${index}`} className="border-t border-white/15 pt-4">
              <dt className="t-metric-md text-bc-cyan">
                {item.title}
              </dt>
              <dd className="mt-2 t-body-sm leading-snug text-white/80">{item.subtitle}</dd>
            </div>
          ))}
        </dl>
      </div>
    </ProductSection>
  )
}

export default ProductProof
