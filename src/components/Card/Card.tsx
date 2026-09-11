import { createElement, ElementType, ReactNode } from 'react'

import { tv, type VariantProps } from 'tailwind-variants'

/**
 * Card base do Design System.
 *
 * Todas as famílias de card (Feature, Solution, Segment, Stat, Content,
 * Testimonial) devem compor a partir daqui — mesmos tokens de superfície,
 * borda, raio, sombra e padding.
 */
export const cardStyles = tv({
  base: 'relative flex flex-col rounded-card border border-transparent transition-[transform,background-color,border-color,box-shadow] duration-normal ease-bc',
  variants: {
    variant: {
      // Superfície padrão: fundo branco, borda sutil e sombra discreta.
      default: 'border-border-subtle bg-surface-card text-text-primary shadow-sm',
      muted: 'border-border-subtle bg-surface-muted text-text-primary shadow-sm',
      dark: 'bg-bc-dark text-text-inverse',
      brand: 'bg-bc-primary text-text-inverse',
      // Borda apenas quando houver função (comparação, seleção, formulário).
      outline: 'border-border-default bg-transparent text-text-primary',
      // Sem caixa: o conteúdo vive direto sobre a página.
      editorial: 'bg-transparent text-text-primary'
    },
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    },
    interactive: {
      // Hover discreto e corporativo: elevação sutil + sombra levemente maior.
      true: 'hover:-translate-y-0.5 hover:bg-surface-muted focus-within:-translate-y-0.5 motion-reduce:hover:translate-y-0'
    }
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md'
  }
})

export type CardProps = VariantProps<typeof cardStyles> & {
  children: ReactNode
  as?: ElementType
  className?: string
  id?: string
}

const Card = ({ children, as = 'div', className = '', id, ...variants }: CardProps) =>
  createElement(
    as,
    { id, className: `${cardStyles(variants)} ${className}`.trim() },
    children
  )

export default Card
