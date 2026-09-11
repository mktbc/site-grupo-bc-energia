import FinalCtaSection from '@/components/Cta/FinalCtaSection'

import type { SectionGraphic } from '@/components/Product/ProductSection'

export type InstitutionalCtaProps = {
  eyebrow?: string
  title: string
  description?: string
  cta: { label: string; href: string; target?: string }
  secondaryCta?: { label: string; href: string; target?: string }
  /** VISUAL SYSTEM 07 — grafismo oficial (nunca radial/sol). */
  graphic?: SectionGraphic
  id?: string
}

/**
 * VISUAL SYSTEM 07 — fechamento institucional.
 * Usa o padrão global `FinalCtaSection` (diagonais como assinatura da família
 * institucional, evitando repetir chevrons das páginas comerciais).
 */
const InstitutionalCta = ({
  eyebrow,
  title,
  description,
  cta,
  secondaryCta,
  graphic = { variant: 'diagonal' },
  id
}: InstitutionalCtaProps) => (
  <FinalCtaSection
    id={id}
    location="institutional_final"
    eyebrow={eyebrow}
    title={title}
    description={description}
    actionText="Fale com o time do Grupo BC Energia."
    primaryCta={cta}
    secondaryCta={secondaryCta}
    graphic={graphic}
  />
)

export default InstitutionalCta
