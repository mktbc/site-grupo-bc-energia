import { ReactNode } from 'react'

import { tv, type VariantProps } from 'tailwind-variants'

/** Badge institucional — produto, categoria, região, status. Uso comedido. */
export const badgeStyles = tv({
  base: 'inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-wide',
  variants: {
    variant: {
      neutral: 'bg-surface-muted text-text-secondary',
      brand: 'bg-bc-primary/10 text-text-accent',
      /** Destaque em superfície clara — nunca amarelo (reservado a CTA/fundo escuro). */
      accent: 'bg-bc-primary/12 text-text-accent',
      /** Destaque em fundo escuro — único contexto em que o amarelo é permitido. */
      'accent-dark': 'bg-bc-cyan/15 text-bc-cyan',
      dark: 'bg-bc-dark text-text-inverse',
      outline: 'border border-border-default text-text-secondary',
      success: 'bg-success/10 text-success',
      warning: 'bg-warning/10 text-warning',
      error: 'bg-error/10 text-error'
    },
    size: {
      sm: 'px-2 py-0.5 text-[0.6875rem]',
      md: 'px-3 py-1 text-caption'
    }
  },
  defaultVariants: { variant: 'brand', size: 'md' }
})

export type BadgeProps = VariantProps<typeof badgeStyles> & {
  children: ReactNode
  className?: string
}

const Badge = ({ children, className = '', ...variants }: BadgeProps) => (
  <span className={`${badgeStyles(variants)} ${className}`.trim()}>{children}</span>
)

export default Badge
