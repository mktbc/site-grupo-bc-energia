import { ReactNode } from 'react'

import SectionHeader from '@/components/SectionHeader/SectionHeader'

import InstitutionalSection, { type InstitutionalSectionTone } from './InstitutionalSection'
import type { SectionGraphic } from '@/components/Product/ProductSection'

export type InstitutionalIntroProps = {
  /** Elemento oficial de apoio da seção — VISUAL SYSTEM 02. */
  graphic?: SectionGraphic
  eyebrow?: string
  title: ReactNode
  /** Parágrafos institucionais, na ordem em que devem ser lidos. */
  paragraphs: Array<string>
  image?: {
    src: string
    alt: string
    width?: number
    height?: number
    sizes?: string
    /** Proporção do container da foto (ex.: '16/10', '3/2'). */
    aspect?: string
  }
  /** Dá mais largura à imagem (texto 5/12, imagem 7/12). */
  wideImage?: boolean
  /** Lado do visual. Sem imagem, o texto ocupa a coluna de leitura. */
  imagePosition?: 'right' | 'left'

  tone?: InstitutionalSectionTone
  id?: string
  children?: ReactNode
  /** Conteúdo complementar exibido abaixo da imagem (coluna direita). */
  belowImage?: ReactNode
}

/**
 * Abertura institucional: um título de seção e um bloco de leitura confortável,
 * opcionalmente acompanhado de um visual. Texto sempre alinhado à esquerda.
 */
const InstitutionalIntro = ({
  graphic = { variant: 'loops', tone: 'teal', size: 'medium', position: 'right', opacity: 0.05 },
  eyebrow,
  title,
  paragraphs,
  image,
  wideImage = false,
  imagePosition = 'right',

  tone = 'surface',
  id,
  children,
  belowImage
}: InstitutionalIntroProps) => {
  const text = (
    <>
      <SectionHeader eyebrow={eyebrow} title={title} />

      <div className={['flex flex-col', wideImage ? 'mt-4 gap-3.5' : 'mt-5 gap-4'].join(' ')}>
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className={[
              'whitespace-pre-line t-body text-text-secondary',
              wideImage ? 'max-w-[52ch] leading-[1.7]' : 't-body-lg'
            ].join(' ')}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {children}
    </>
  )

  if (!image) {
    return (
      <InstitutionalSection graphic={graphic} tone={tone} id={id}>
        <div className="measure-body">{text}</div>
      </InstitutionalSection>
    )
  }

  const textSpan = wideImage ? 'lg:col-span-5' : 'lg:col-span-7'
  const imageSpan = wideImage ? 'lg:col-span-7' : 'lg:col-span-5'

  return (
    <InstitutionalSection graphic={graphic} tone={tone} id={id}>
      <div
        className={[
          'grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12',
          'items-start'
        ].join(' ')}
      >
        <div className={imagePosition === 'left' ? `lg:order-2 ${textSpan}` : textSpan}>{text}</div>

        <div className={imagePosition === 'left' ? `lg:order-1 ${imageSpan}` : imageSpan}>
          <img
            src={image.src}
            alt={image.alt}
            width={image.width ?? 1200}
            height={image.height ?? 800}
            sizes={image.sizes ?? '(max-width: 1024px) 100vw, 58vw'}
            loading="lazy"
            decoding="async"
            style={image.aspect ? { aspectRatio: image.aspect } : undefined}
            className={[
              'w-full rounded-[8px] object-cover object-center',
              wideImage ? 'lg:sticky lg:top-24' : '',
              image.aspect ? 'h-full' : 'h-auto'
            ].join(' ')}
          />

          {belowImage ? <div className="mt-6">{belowImage}</div> : null}
        </div>
      </div>

    </InstitutionalSection>
  )
}

export default InstitutionalIntro
