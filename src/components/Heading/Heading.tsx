import { ReactNode } from 'react'

import { headingStyles } from './Heading.style'
import { HeadingType } from './Heading.type'

/**
 * Bloco de título de seção.
 *
 * ETAPA SEO 08: o `subtitle` é um kicker/eyebrow visual (não é um heading
 * semântico) — renderizado como <p> com as mesmas classes, sem alteração
 * visual. O título principal permanece como <h2>. Quando não há conteúdo,
 * o <h2> não é emitido (evita heading vazio no HTML), preservando o wrapper
 * e portanto o espaçamento original.
 */
const Heading = ({
  children,
  subtitle,
  className,
  center = true,
  full,
  margin = true
}: HeadingType) => {
  const hasTitle = Boolean(children) && children !== ''

  return (
    <div className={`${className} ${headingStyles({ center, full, margin })}`}>
      {subtitle && <p className="mb-3 t-h4 font-light">{subtitle}</p>}
      {hasTitle && <h2 className="t-h3-editorial">{children as ReactNode}</h2>}
    </div>
  )
}

export default Heading
