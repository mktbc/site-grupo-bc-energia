import type { ElementType, ReactNode } from 'react'

import useReveal from '@/hooks/useReveal'

/**
 * Revelação de conteúdo em CSS (opacity + translate) disparada por
 * IntersectionObserver nativo. Alternativa leve ao Framer Motion para efeitos
 * simples — sem custo de biblioteca no bundle inicial.
 *
 * Respeita `prefers-reduced-motion` (regra em globals.css) e nunca esconde
 * conteúdo crítico: apenas blocos abaixo da dobra devem usar o componente.
 */
type RevealProps = {
  as?: ElementType
  className?: string
  /** Atraso em segundos (escalonamento leve entre itens). */
  delay?: number
  children: ReactNode
}

const Reveal = ({ as: Tag = 'div', className = '', delay = 0, children }: RevealProps) => {
  const { ref, className: revealClass } = useReveal<HTMLElement>()

  return (
    <Tag
      ref={ref}
      className={`${revealClass} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  )
}

export default Reveal
