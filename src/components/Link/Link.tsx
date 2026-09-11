import { forwardRef } from 'react'
import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'

/**
 * Substituto (shim) de `next/link` para React + Vite (react-router-dom v6).
 *
 * Mantém a mesma API do Next (`href`) usada em todo o projeto. Links internos
 * (que começam com "/") usam o `<Link to>` do react-router para navegação SPA;
 * links externos, âncoras (#), mailto/tel ou com `target` viram `<a>` normal.
 */
export type LinkProps = {
  href: string
  children?: ReactNode
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

const isInternal = (href: string): boolean =>
  typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...rest }, ref) => {
    // `target="_self"` é equivalente a não ter target: mantém navegação SPA
    // (evita recarregar a página inteira e perder o foco de teclado).
    const opensNewContext = Boolean(rest.target) && rest.target !== '_self'

    if (isInternal(href) && !opensNewContext) {
      return (
        <RouterLink to={href} ref={ref} {...rest} target={undefined}>
          {children}
        </RouterLink>
      )
    }

    return (
      <a href={href} ref={ref} {...rest}>
        {children}
      </a>
    )
  }
)

Link.displayName = 'Link'

export default Link
