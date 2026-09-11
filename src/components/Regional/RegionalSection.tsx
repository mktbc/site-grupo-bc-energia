import { ReactNode } from 'react'

import BrandGraphic from '@/components/BrandGraphic/BrandGraphic'
import type { SectionGraphic } from '@/components/Product/ProductSection'
import { Container } from '@/components/Container'

export type RegionalSectionTone = 'surface' | 'soft' | 'muted' | 'dark' | 'brand'

export type RegionalSectionProps = {
  children: ReactNode
  tone?: RegionalSectionTone
  id?: string
  className?: string
  /** Elemento de apoio da marca (opcional, `none` por padrão). */
  graphic?: SectionGraphic
}

const tones: Record<RegionalSectionTone, string> = {
  surface: 'bg-surface text-text-primary',
  soft: 'bg-surface-soft text-text-primary',
  muted: 'bg-surface-muted text-text-primary',
  dark: 'bg-bc-dark text-text-inverse',
  brand: 'bg-surface-brand text-text-inverse'
}

/**
 * Invólucro único das seções das páginas regionais (VISUAL 13).
 *
 * Mesmo container e mesmo ritmo vertical das páginas de produto e segmento.
 * As superfícies existem para formar macroblocos — não para alternar cor a
 * cada seção. Hospeda também o elemento oficial de apoio da seção.
 */
const RegionalSection = ({
  children,
  tone = 'surface',
  id,
  className = '',
  graphic
}: RegionalSectionProps) => {
  const hasGraphic = Boolean(graphic && graphic.variant !== 'none')

  return (
    <section
      id={id}
      className={`${tones[tone]} ${hasGraphic ? 'relative isolate overflow-hidden' : ''} ${className}`.trim()}
    >
      {hasGraphic && graphic ? <BrandGraphic {...graphic} /> : null}
      <Container className={`py-12 lg:py-20 ${hasGraphic ? 'relative' : ''}`.trim()}>{children}</Container>
    </section>
  )
}

export default RegionalSection
