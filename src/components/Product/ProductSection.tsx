import { ReactNode } from 'react'

import BrandGraphic, { BrandGraphicProps } from '@/components/BrandGraphic/BrandGraphic'
import { Container } from '@/components/Container'

export type ProductSectionTone = 'surface' | 'soft' | 'muted' | 'dark' | 'brand'

/** Elemento oficial de apoio da seção — VISUAL SYSTEM 02. */
export type SectionGraphic = Omit<BrandGraphicProps, 'className' | 'scale' | 'density'>

export type ProductSectionProps = {
  children: ReactNode
  /** Ritmo de fundo do template de produto — sem "cor por produto". */
  tone?: ProductSectionTone
  id?: string
  className?: string
  /** Remove o padding vertical padrão (usos encadeados). */
  flush?: boolean
  /**
   * Nível de hierarquia visual (VISUAL SYSTEM 07):
   * lead → protagonista, mid → intermediária, support → apoio.
   */
  level?: 'lead' | 'mid' | 'support'
  /** Elemento de apoio da marca (opcional, `none` por padrão). */
  graphic?: SectionGraphic
  'aria-labelledby'?: string
}

const tones: Record<ProductSectionTone, string> = {
  surface: 'bg-surface text-text-primary',
  soft: 'bg-surface-soft text-text-primary',
  muted: 'bg-surface-muted text-text-primary',
  dark: 'bg-bc-dark text-text-inverse',
  brand: 'bg-surface-brand text-text-inverse'
}

const levels: Record<'lead' | 'mid' | 'support', string> = {
  lead: 'bc-level-lead',
  mid: 'bc-level-mid',
  support: 'bc-level-support'
}

/**
 * Invólucro único das seções das páginas de produto (FRONT-END 11).
 *
 * Garante o mesmo ritmo vertical, o mesmo container (1200px) e apenas três
 * superfícies possíveis — evitando o "catálogo multicolorido" de seções.
 * Também centraliza o posicionamento dos elementos oficiais de apoio.
 */
const ProductSection = ({
  children,
  tone = 'surface',
  id,
  className = '',
  flush = false,
  level = 'mid',
  graphic
}: ProductSectionProps) => {
  const hasGraphic = Boolean(graphic && graphic.variant !== 'none')

  return (
    <section
      id={id}
      className={`${tones[tone]} ${hasGraphic ? 'relative isolate overflow-hidden' : ''} ${className}`.trim()}
    >
      {hasGraphic && graphic ? <BrandGraphic {...graphic} /> : null}
      <Container className={`${flush ? '' : levels[level]} ${hasGraphic ? 'relative' : ''}`.trim()}>
        {children}
      </Container>
    </section>
  )
}

export default ProductSection
