import { useEffect, useState } from 'react'

import { logos } from '@/components/Customers/Customers.data'
import Image from '@/components/Image'
import Link from '@/components/Link'
import { getNumbers } from '@/services'

import SegmentSection from './SegmentSection'
import type { SectionGraphic } from '@/components/Product/ProductSection'

type NumberItem = { title?: string; subtitle?: string }

export type SegmentProofProps = {
  /** Elemento oficial de apoio da seção — VISUAL SYSTEM 02. */
  graphic?: SectionGraphic
  /** Mesmo `context` consumido pela seção Numbers — dados reais preservados. */
  context?: string
  title: string
  description?: string
  /** Link editorial (o CTA sólido fica no hero e no fechamento). */
  link?: { label: string; href: string; target?: string }
  /** Quantidade de logos exibidos na faixa compacta. */
  logoLimit?: number
  id?: string
}

const selectLogos = (limit: number) => {
  const featured = logos.filter((logo) => logo.featured)
  const rest = logos.filter((logo) => !logo.featured)
  return [...featured, ...rest].slice(0, limit)
}

/**
 * VISUAL 12 — prova antecipada das páginas de segmento.
 *
 * Faixa escura compacta com as MESMAS métricas de `getNumbers` (nenhum dado
 * novo) e, logo abaixo, a faixa de logos reais dos clientes — sem cards.
 * Amarelo apenas sobre fundo escuro.
 */
const SegmentProof = ({
  graphic = { variant: 'radial', tone: 'light', size: 'large', position: 'bottom-cut', opacity: 0.05 },
  context = 'segmentos',
  title,
  description,
  link,
  logoLimit = 8,
  id
}: SegmentProofProps) => {
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
    <>
      <SegmentSection graphic={graphic} tone="dark" id={id}>
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
                data-cta-location="segment_proof"
                className="mt-6 inline-flex min-h-[44px] items-center gap-2 t-action-label text-bc-cyan underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bc-dark"
              >
                {link.label}
                <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </div>

          {data.length ? (
            <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3 lg:col-span-7">
              {data.map((item, index) => (
                <div key={`${item.title}-${index}`}>
                  <dt className="t-metric-md text-bc-cyan">
                    {item.title}
                  </dt>
                  <dd className="mt-2 t-body-sm leading-snug text-white/80">{item.subtitle}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </SegmentSection>

      {/* Faixa compacta de clientes reais — sem cards, sem carrossel. */}
      <section className="bg-surface py-8 lg:py-10">
        <div className="bc-container">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
            <p className="t-eyebrow shrink-0 text-bc-primary">Empresas que confiam na BC</p>
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-4 sm:gap-x-8">
              {selectLogos(logoLimit).map((logo) => (
                <li key={logo.id} className="flex h-9 items-center lg:h-10">
                  <Image
                    src={`/img/components/customers/${logo.url}`}
                    alt={logo.name ?? logo.title}
                    width={200}
                    height={200}
                    loading="lazy"
                    decoding="async"
                    className="max-h-9 w-auto max-w-[110px] object-contain lg:max-h-10"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}


export default SegmentProof
