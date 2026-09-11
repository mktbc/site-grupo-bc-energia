import Link from '@/components/Link'
import { resolveRouteMeta } from '@/config/meta-content'
import { usePathname } from '@/helpers/navigation'

import { BreadcrumbsProps, BreadcrumbTrailItem } from './Breadcrumbs.type'

/**
 * Breadcrumb visual semântico.
 *
 * A trilha vem de `breadcrumb` em src/config/meta.ts — a mesma fonte usada
 * pelo JSON-LD BreadcrumbList, o que garante paridade entre o visual e o
 * dado estruturado. Só são renderizados níveis que existem de verdade
 * (nenhum link para hub inexistente).
 *
 * Links com 44px de área de toque e margem vertical negativa equivalente:
 * o alvo cresce sem aumentar a altura visual da trilha no painel do hero.
 */
const Breadcrumbs = ({ title, parent, variant = 'badge' }: BreadcrumbsProps) => {
  const path = usePathname()
  const meta = resolveRouteMeta(path)

  const trail: Array<BreadcrumbTrailItem> =
    meta.breadcrumb && meta.breadcrumb.length
      ? meta.breadcrumb.map(({ name, path: itemPath }) => ({ name, path: itemPath }))
      : [{ name: parent ?? title, path }]

  return (
    <nav
      aria-label="Breadcrumb"
      className={
        variant === 'plain'
          ? 't-body-sm text-white/75'
          : 'mt-4 rounded-md bg-bc-dark/20 px-4 py-2 t-body-sm text-white/90'
      }
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className="-my-3 inline-flex min-h-[44px] items-center rounded-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus">
            Home
          </Link>
        </li>
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1
          return (
            <li key={item.path} className="flex items-center gap-x-2">
              <span aria-hidden="true">/</span>
              {isLast ? (
                <span aria-current="page" className="font-semibold">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="-my-3 inline-flex min-h-[44px] items-center rounded-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus">
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
