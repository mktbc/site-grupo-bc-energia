import FinalCtaSection from '@/components/Cta/FinalCtaSection'

import type { SectionGraphic } from '@/components/Product/ProductSection'

export type RegionalCtaProps = {
  eyebrow?: string
  title: string
  description?: string
  cta: { label: string; href: string }
  /** Ação secundária como link editorial (nunca um segundo botão sólido). */
  secondaryCta?: { label: string; href: string }
  /** VISUAL SYSTEM 03 — grafismo oficial opcional (decisão por rota). */
  graphic?: SectionGraphic
  id?: string
}

/**
 * VISUAL SYSTEM 07 — fechamento das páginas regionais.
 * Mesmo padrão global das demais CTAs, com grafismo definido por rota.
 */
const RegionalCta = ({
  eyebrow,
  title,
  description,
  cta,
  secondaryCta,
  graphic = { variant: 'loops' },
  id
}: RegionalCtaProps) => (
  <FinalCtaSection
    // Toda CTA regional carrega exatamente 1 elemento oficial (loops).
    graphic={graphic.variant === 'none' ? { variant: 'loops' } : graphic}
    id={id}
    location="regional_final"
    eyebrow={eyebrow}
    title={title}
    description={description}
    actionText="Atendimento local, com time próprio na região."
    primaryCta={cta}
    secondaryCta={secondaryCta}
    
  />
)

export default RegionalCta
