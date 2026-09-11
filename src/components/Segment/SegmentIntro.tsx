import SectionHeader from '@/components/SectionHeader/SectionHeader'

import SegmentSection, { type SegmentSectionTone } from './SegmentSection'
import type { SectionGraphic } from '@/components/Product/ProductSection'

export type SegmentIntroProps = {
  /** Elemento oficial de apoio da seção — VISUAL SYSTEM 02. */
  graphic?: SectionGraphic
  eyebrow?: string
  title: string
  paragraphs: Array<string>
  image?: {
    src: string
    alt: string
    srcSet?: string
    sizes?: string
    /** Classe utilitária para ajustar recorte/proporção da imagem por segmento. */
    className?: string
  }
  /**
   * Frase de contexto exibida como bloco tipográfico quando não há imagem
   * específica do segmento (texto já publicado — nada é inventado aqui).
   */
  pullQuote?: string
  /**
   * @deprecated VISUAL SYSTEM 06 — o destaque editorial fica sempre no mesmo
   * cluster textual. Mantido apenas para compatibilidade de chamadas.
   */
  pullQuotePosition?: 'aside' | 'inline'
  /** Dados objetivos do segmento, em hairlines tipográficas (sem card). */
  facts?: Array<{ label: string; value: string }>
  tone?: SegmentSectionTone
  id?: string
}

/**
 * Destaque editorial interno — hairline vertical + texto semibold.
 * Usado quando pullQuotePosition='inline'.
 */
const InlinePullQuote = ({ text }: { text: string }) => (
  <blockquote className="mt-5 flex gap-4 lg:mt-6 lg:gap-5">
    <span
      aria-hidden="true"
      className="w-px shrink-0 self-stretch bg-bc-primary"
    />
    <p className="t-body-lg max-w-[44ch] font-semibold text-text-primary">
      {text}
    </p>
  </blockquote>
)

/**
 * VISUAL 12 — contexto específico do segmento.
 *
 * Composição editorial: texto protagonista 7/12 + elemento visual 5/12
 * (imagem real do segmento ou bloco tipográfico). Sem card lateral genérico.
 */
const SegmentIntro = ({
  graphic = { variant: 'none' },
  eyebrow,
  title,
  paragraphs,
  image,
  pullQuote,
  facts,
  tone = 'surface',
  id
}: SegmentIntroProps) => {
  const hasMedia = Boolean(image)

  return (
    <SegmentSection graphic={graphic} tone={tone} id={id}>
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
        <div className={hasMedia ? 'lg:col-span-7' : 'lg:col-span-9'}>
          <SectionHeader eyebrow={eyebrow} title={title} variant="compact" level="lead" />

          <div className="mt-3.5 flex flex-col gap-3.5">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="t-body max-w-[46rem] text-text-secondary"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {pullQuote ? <InlinePullQuote text={pullQuote} /> : null}

          {facts?.length ? (
            <dl className="mt-7 grid grid-cols-1 gap-x-10 border-t border-border-subtle sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label} className="border-b border-border-subtle py-3">
                  <dt className="t-eyebrow text-bc-primary">{fact.label}</dt>
                  <dd className="t-body-sm mt-1 text-text-primary">{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        {image ? (
          <figure className="lg:col-span-5 lg:self-start">
            <div className="relative w-full overflow-hidden rounded-[10px]">
              <img
                src={image.src}
                srcSet={image.srcSet}
                sizes={image.sizes ?? '(max-width: 1024px) 100vw, 40vw'}
                alt={image.alt}
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className={
                  image.className ??
                  'bc-fmt-portrait object-center lg:max-h-[520px]'
                }
              />
            </div>
          </figure>
        ) : null}
      </div>
    </SegmentSection>
  )
}

export default SegmentIntro
