import FinalCtaSection from '@/components/Cta/FinalCtaSection'

import type { SectionGraphic } from '@/components/Product/ProductSection'

export type SegmentCtaProps = {
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
 * VISUAL SYSTEM 07 — fechamento das páginas de segmento.
 * Usa o padrão global `FinalCtaSection`; textos, rotas e tracking preservados.
 */
const SegmentCta = ({
  eyebrow = 'Análise de consumo',
  title,
  description = 'Nossa equipe analisa o perfil da sua unidade e identifica oportunidades de otimização do consumo de energia.',
  cta,
  secondaryCta,
  graphic = { variant: 'chevrons' },
  id
}: SegmentCtaProps) => (
  <FinalCtaSection
    id={id}
    location="segment_final"
    eyebrow={eyebrow}
    title={title}
    description={description}
    actionText="Envie sua conta para uma análise inicial."
    primaryCta={cta}
    secondaryCta={secondaryCta}
    // Toda CTA de segmento carrega exatamente 1 elemento oficial.
    graphic={graphic.variant === 'none' ? { variant: 'chevrons' } : graphic}
  />
)

export default SegmentCta
