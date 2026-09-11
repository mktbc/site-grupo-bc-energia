import { ReactNode } from 'react'

export type SectionHeaderVariant = 'standard' | 'compact' | 'editorial'

export type SectionHeaderProps = {
  /** Kicker visual — sempre <p>, nunca heading (regra de semântica SEO). */
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  /** Nível do heading da seção. Padrão h2 — o H1 pertence à página. */
  as?: 'h1' | 'h2' | 'h3'
  align?: 'left' | 'center'
  /**
   * standard  → macroseção padrão (eyebrow + H2 + descrição)
   * compact   → blocos densos, respiro menor
   * editorial → colunas de leitura mais largas, descrição maior
   */
  variant?: SectionHeaderVariant
  /**
   * Nível de hierarquia visual da seção (VISUAL SYSTEM 07).
   * lead → protagonista | mid → intermediária | support → apoio
   */
  level?: 'lead' | 'mid' | 'support'
  className?: string
  children?: ReactNode
}

/** Ritmo vertical padronizado (VISUAL SYSTEM 01). */
const SPACING: Record<SectionHeaderVariant, { eyebrow: string; description: string; width: string }> = {
  standard: { eyebrow: 'mb-2', description: 'mt-3.5 measure-intro', width: 'max-w-[46rem]' },
  compact: { eyebrow: 'mb-2', description: 'mt-3 measure-intro', width: 'max-w-[40rem]' },
  editorial: { eyebrow: 'mb-2.5', description: 'mt-4 measure-body', width: 'max-w-[52rem]' }
}

/**
 * Composição padrão de cabeçalho de seção: eyebrow + título + descrição.
 * Evita que cada seção invente uma composição própria.
 */
const SectionHeader = ({
  eyebrow,
  title,
  description,
  as: Tag = 'h2',
  align = 'left',
  variant = 'standard',
  level,
  className = '',
  children
}: SectionHeaderProps) => {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'items-start'
  const spacing = SPACING[variant]
  const measure = spacing.description.split(' ').slice(1).join(' ')
  const levelHeading = level ? { lead: 't-h2-lead', mid: 't-h2-mid', support: 't-h2-support' }[level] : null
  const headingClass =
    Tag === 'h1' ? 't-h1' : Tag === 'h2' ? levelHeading ?? 't-h2' : level === 'support' ? 't-h3' : 't-h3'

  /**
   * Respiro proporcional à importância da seção (VISUAL SYSTEM — espaço negativo):
   * quanto mais protagonista o título, mais isolamento ao redor dele.
   */
  const eyebrowSpacing = level === 'lead' ? 'mb-3 md:mb-4' : level === 'mid' ? 'mb-2.5' : spacing.eyebrow
  const descriptionSpacing =
    level === 'lead' ? 'mt-4 md:mt-6' : level === 'mid' ? 'mt-4 md:mt-5' : spacing.description.split(' ')[0]

  return (
    <header className={`flex ${spacing.width} flex-col ${alignment} ${className}`.trim()}>
      {eyebrow ? <p className={`t-eyebrow ${eyebrowSpacing}`}>{eyebrow}</p> : null}
      <Tag className={headingClass}>{title}</Tag>
      {description ? (
        <p className={`t-body-lg ${descriptionSpacing} ${measure} text-text-secondary`}>
          {description}
        </p>
      ) : null}
      {children}
    </header>
  )
}

export default SectionHeader

