import { createElement, ElementType, ReactNode } from 'react'

export type ContainerWidth = 'wide' | 'editorial' | 'narrow'

export type ContainerProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  /** Remove o max-width padrão (usos full-bleed controlados). */
  fluid?: boolean
  /** Largura proporcional ao conteúdo: 1200 / 1120 / 900. */
  width?: ContainerWidth
  id?: string
}

const WIDTHS: Record<ContainerWidth, string> = {
  wide: 'bc-container',
  editorial: 'bc-container-editorial',
  narrow: 'bc-container-narrow'
}

/**
 * Container único do site — três larguras (wide 1200 / editorial 1120 /
 * narrow 900) e padding responsivo. Substitui containers ad-hoc.
 */
const Container = ({
  children,
  as = 'div',
  className = '',
  fluid,
  width = 'wide',
  id
}: ContainerProps) =>
  createElement(
    as,
    { id, className: `${fluid ? 'w-full px-6 md:px-8' : WIDTHS[width]} ${className}`.trim() },
    children
  )

export default Container
