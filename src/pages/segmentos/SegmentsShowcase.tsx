import { useState } from 'react'

import Image from '@/components/Image'
import Link from '@/components/Link'
import { SEGMENT_HUB_ITEMS } from '@/config/navigation'

/** Imagens reais já existentes no projeto, por rota. */
export const SEGMENT_IMAGE: Record<string, string> = {
  '/segmentos/agronegocio': '/img/pages/segmentos/agronegocio.webp',
  '/segmentos/bares-e-restaurantes': '/img/pages/segmentos/bares-e-restaurantes.webp',
  '/segmentos/condominio': '/img/pages/segmentos/condominio-v2.webp',
  '/segmentos/educacional': '/img/pages/segmentos/educacional.webp',
  '/segmentos/turismo': '/img/pages/segmentos/turismo-intro.webp',
  '/segmentos/lazer': '/img/pages/segmentos/lazer-v2.webp',
  '/segmentos/religioso': '/img/pages/segmentos/religioso.webp',
  '/segmentos/residencial': '/img/pages/segmentos/residencial.webp',
  // saude-v2 mostrava marca d'água "MOCKUP/LOGO" no jaleco (banco de imagens).
  '/segmentos/saude': '/img/pages/segmentos/saude.webp',
  '/segmentos/servico': '/img/pages/segmentos/servico.webp',
  '/segmentos/varejo': '/img/pages/segmentos/varejo-v2.webp'
}

/**
 * Enquadramento por segmento. Proporção única (4:3 no mobile, 16:10 no
 * desktop): antes, Condomínio e Saúde abriam em 4:5 também no desktop
 * (~850px de foto) e a altura da seção mudava ao trocar de aba.
 */
const SEGMENT_IMAGE_POSITION: Record<string, string> = {
  '/segmentos/condominio': 'object-[center_60%]',
  '/segmentos/saude': 'object-[center_30%]',
  '/segmentos/lazer': 'object-[center_45%]'
}

/** Destaques aprovados, nesta ordem: Condomínio → Bares e Restaurantes → Saúde → Lazer → Varejo. */
const HIGHLIGHT_HREFS = [
  '/segmentos/condominio',
  '/segmentos/bares-e-restaurantes',
  '/segmentos/saude',
  '/segmentos/lazer',
  '/segmentos/varejo'
]

const SegmentsShowcase = () => {
  const highlights = HIGHLIGHT_HREFS.map((href) => SEGMENT_HUB_ITEMS.find((item) => item.href === href)).filter(
    (item): item is (typeof SEGMENT_HUB_ITEMS)[number] => Boolean(item)
  )
  const [activeHref, setActiveHref] = useState(highlights[0]?.href)

  const active = highlights.find((item) => item.href === activeHref) ?? highlights[0]

  if (!active) return null

  return (
    <section id="segmentos" className="bg-surface pb-10 pt-14 lg:pb-14 lg:pt-20">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10">
        <p className="t-eyebrow">Segmentos em destaque</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-2 border-b border-border-subtle pb-3">
          {highlights.map((item) => {
            const isActive = item.href === active.href

            return (
              <button
                key={item.href}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveHref(item.href)}
                onFocus={() => setActiveHref(item.href)}
                className={[
                  'relative min-h-[48px] t-h4-display tracking-[0.05em] transition-colors duration-200 ease-bc focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus motion-reduce:transition-none',
                  'after:absolute after:inset-x-0 after:-bottom-3 after:h-[2px] after:transition-colors after:duration-200',
                  isActive
                    ? 'font-bold text-bc-primary after:bg-bc-primary'
                    : 'font-medium text-text-secondary after:bg-transparent hover:text-bc-primary'
                ].join(' ')}
              >
                {item.title}
              </button>
            )
          })}
        </div>

        <div className="mt-7 grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-surface-dark lg:aspect-[16/10]">
              {highlights
                .filter((item) => SEGMENT_IMAGE[item.href])
                .map((item) => (
                  <Image
                    key={item.href}
                    src={SEGMENT_IMAGE[item.href]}
                    alt=""
                    aria-hidden="true"
                    fill
                    loading="lazy"
                    className={[
                      'absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-bc motion-reduce:transition-none',
                      SEGMENT_IMAGE_POSITION[item.href] ?? 'object-center',
                      item.href === active.href ? 'opacity-100' : 'opacity-0'
                    ].join(' ')}
                  />
                ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <h2 className="t-h2 text-text-primary">
              {active.title}
            </h2>

            <p className="mt-4 max-w-[46ch] t-body-lg text-text-secondary">
              {active.description}
            </p>

            <Link
              href={active.href}
              data-cta-location="hub_navigation"
              data-cta-name={`hub_segmentos_destaque_${active.title}`}
              className="group mt-6 inline-flex min-h-[44px] items-center gap-2 t-body-sm font-semibold uppercase tracking-[0.08em] text-bc-primary underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus motion-reduce:transition-none"
            >
              Conhecer soluções para {active.title}
              <span
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transform-none"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SegmentsShowcase
