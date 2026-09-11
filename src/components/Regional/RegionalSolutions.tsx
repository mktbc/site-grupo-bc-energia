import Link from '@/components/Link'
import { EditorialIndex } from '@/components/Editorial'
import { PRODUCT_HUB_ITEMS } from '@/config/navigation'

import RegionalSection, { type RegionalSectionTone } from './RegionalSection'

export type RegionalSolutionItem = {
  href: string
  /** Âncora descritiva já publicada na página regional. */
  label: string
  /** Por que a solução faz sentido para o perfil da região. */
  description: string
  target?: string
}

export type RegionalSolutionsProps = {
  eyebrow?: string
  title: string
  description?: string
  items: Array<RegionalSolutionItem>
  /** Slug da região — usado apenas no rótulo de tracking. */
  regionSlug?: string
  tone?: RegionalSectionTone
  id?: string
}

/**
 * VISUAL 13 — soluções como resposta ao contexto local.
 *
 * Uma solução protagonista + demais em lista editorial (sem grid de cards).
 * Nome e URL vêm de `PRODUCT_HUB_ITEMS`; a justificativa é a já publicada na
 * própria região. Se houver apenas uma solução, nada é inventado.
 */
const RegionalSolutions = ({
  eyebrow = 'Portfólio',
  title,
  description,
  items,
  regionSlug,
  tone = 'soft',
  id = 'solucoes'
}: RegionalSolutionsProps) => {
  const entries = items
    .map((item) => ({ item, hub: PRODUCT_HUB_ITEMS.find((hub) => hub.href === item.href) }))
    .filter(({ hub }) => Boolean(hub))

  if (!entries.length) return null
  const [lead, ...rest] = entries
  const trackingSlug = regionSlug ?? 'geral'

  return (
    <RegionalSection tone={tone} id={id}>
      <EditorialIndex eyebrow={eyebrow} title={title} description={description}>
        <div>
          <div className="rounded-card bg-surface-card p-6 shadow-xs lg:p-7">
            <p className="t-eyebrow text-bc-primary">Solução indicada</p>
            <h3 className="t-h3 mt-2 text-text-primary">{lead.hub?.title ?? lead.item.label}</h3>
            <p className="mt-2 max-w-[46rem] t-body-lg text-text-secondary">
              {lead.item.description}
            </p>
            <Link
              href={lead.item.href}
              target={lead.item.target}
              aria-label={lead.item.label}
              data-cta-name={`regional_${trackingSlug}_${lead.hub?.title ?? lead.item.href}`}
              data-cta-location="regional_solutions"
              className="bc-focus-ring mt-4 inline-flex min-h-[44px] items-center gap-2 t-action-label text-bc-primary underline-offset-4 hover:underline"
            >
              Ver a solução
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {rest.length ? (
            <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
              {rest.map(({ item, hub }) => (
                <li key={item.href}>
                  <h3 className="t-h4 text-text-primary">
                    <Link
                      href={item.href}
                      target={item.target}
                      aria-label={item.label}
                      data-cta-name={`regional_${trackingSlug}_${hub?.title ?? item.href}`}
                      data-cta-location="regional_solutions"
                      className="bc-focus-ring underline-offset-4 transition-colors hover:text-bc-primary hover:underline"
                    >
                      {hub?.title ?? item.label}
                    </Link>
                  </h3>
                  <p className="mt-1.5 max-w-[46rem] t-body-sm text-text-secondary">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </EditorialIndex>
    </RegionalSection>
  )
}

export default RegionalSolutions
