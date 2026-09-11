import type { ReactNode } from 'react'

import Image from '@/components/Image'

/**
 * MetricMedia — padrão global "imagem + métrica".
 *
 * A métrica nunca vira card: sem background próprio, sem borda, sem sombra e
 * sem radius. O componente controla apenas grid, tipografia e espaçamento.
 * A fotografia dá contexto, o número (Barlow Condensed) dá escala e a legenda
 * (Onest) explica o significado.
 *
 * Layouts:
 * - `media-left`  → imagem 7–8 colunas à esquerda, métrica 4–5 à direita
 * - `media-right` → espelhado
 * - `overlay`     → número sobre a área de respiro da foto (apenas desktop;
 *                   no mobile empilha imagem → número → legenda)
 */
export type MetricMediaItem = {
  value: string
  /** Unidade exibida menor que o número (%, MW, mil, R$…). */
  unit?: string
  label: string
}

export type MetricMediaProps = {
  value: string
  unit?: string
  label: string
  /** Frase curta de contexto (1–2 linhas). Opcional. */
  description?: string
  image: {
    src: string
    alt: string
    width?: number
    height?: number
    /** Formato oficial de mídia. */
    format?: 'landscape' | 'portrait' | 'fullbleed'
    sizes?: string
    priority?: boolean
  }
  layout?: 'media-left' | 'media-right' | 'overlay'
  surface?: 'light' | 'dark'
  /** Métricas secundárias, sempre em escala menor que a protagonista. */
  secondary?: Array<MetricMediaItem>
  /** Espaço para link/CTA — renderizado com distância da métrica. */
  action?: ReactNode
  className?: string
}

const formatClass = {
  landscape: 'bc-fmt-landscape',
  portrait: 'bc-fmt-portrait',
  fullbleed: 'bc-fmt-fullbleed'
} as const

const MetricMedia = ({
  value,
  unit,
  label,
  description,
  image,
  layout = 'media-left',
  surface = 'light',
  secondary,
  action,
  className
}: MetricMediaProps) => {
  const isDark = surface === 'dark'
  const valueColor = isDark ? 'text-text-inverse' : 'text-bc-dark'
  const labelColor = isDark ? 'text-text-inverse' : 'text-text-primary'
  const descColor = isDark ? 'text-text-inverse/70' : 'text-text-secondary'

  const media = (
    <div className="bc-photo bc-photo-soft relative">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width ?? 1600}
        height={image.height ?? 900}
        loading={image.priority ? 'eager' : 'lazy'}
        decoding="async"
        sizes={image.sizes ?? '(min-width: 1024px) 60vw, 100vw'}
        className={formatClass[image.format ?? 'landscape']}
      />
      {layout === 'overlay' ? (
        <div aria-hidden="true" className="bc-ovl bc-ovl-readable-bottom hidden lg:block" />
      ) : null}
    </div>
  )

  const metric = (
    <div>
      <p className={`t-metric-xl ${valueColor}`}>
        {value}
        {unit ? <span className="t-metric-unit">{unit}</span> : null}
      </p>
      <p className={`t-h4-display mt-3 ${labelColor}`}>{label}</p>
      {description ? (
        <p className={`t-body-sm mt-4 max-w-[42ch] ${descColor}`}>{description}</p>
      ) : null}

      {secondary?.length ? (
        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7">
          {secondary.map((item) => (
            <div key={item.label}>
              <dt className={`t-metric-md ${valueColor}`}>
                {item.value}
                {item.unit ? <span className="t-metric-unit">{item.unit}</span> : null}
              </dt>
              <dd className={`t-body-sm mt-2 ${descColor}`}>{item.label}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {action ? <div className="mt-12">{action}</div> : null}
    </div>
  )

  if (layout === 'overlay') {
    return (
      <div className={`relative ${className ?? ''}`}>
        {media}
        <div className="mt-7 lg:absolute lg:bottom-10 lg:left-10 lg:mt-0 lg:max-w-[24rem]">
          <p className={`t-metric-xl lg:text-text-inverse ${valueColor}`}>
            {value}
            {unit ? <span className="t-metric-unit">{unit}</span> : null}
          </p>
          <p className={`t-h4-display mt-3 lg:text-text-inverse ${labelColor}`}>{label}</p>
          {description ? (
            <p className={`t-body-sm mt-3 lg:text-text-inverse/80 ${descColor}`}>{description}</p>
          ) : null}
        </div>
        {action ? <div className="mt-10">{action}</div> : null}
      </div>
    )
  }

  const mediaOrder = layout === 'media-right' ? 'lg:order-2' : ''
  const metricOrder = layout === 'media-right' ? 'lg:order-1' : ''

  return (
    <div className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14 ${className ?? ''}`}>
      <div className={`lg:col-span-7 ${mediaOrder}`}>{media}</div>
      <div className={`lg:col-span-4 ${layout === 'media-left' ? 'lg:col-start-9' : ''} ${metricOrder}`}>
        {metric}
      </div>
    </div>
  )
}

export default MetricMedia
