import type { TocItem } from '@/data/content/toc'

export type ArticleTocProps = {
  items: Array<TocItem>
  title?: string
  /** Abaixo deste número de seções o sumário não ajuda e não é exibido. */
  minItems?: number
}

const TocList = ({ items }: { items: Array<TocItem> }) => (
  <ol className="flex flex-col">
    {items.map((item, index) => (
      <li key={item.id}>
        <a
          href={`#${item.id}`}
          className="flex min-h-[44px] items-baseline gap-3 rounded-sm py-2 t-body-sm leading-snug text-text-secondary transition-colors duration-200 hover:text-bc-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus motion-reduce:transition-none lg:min-h-0 lg:py-1.5"
        >
          <span
            aria-hidden="true"
            className="w-5 shrink-0 font-display text-[0.9375rem] font-bold tabular-nums text-bc-primary"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span>{item.text}</span>
        </a>
      </li>
    ))}
  </ol>
)

/**
 * Sumário de artigo longo, gerado a partir dos H2 reais do corpo.
 *
 * Mobile/tablet: bloco recolhível nativo (<details>), sem JavaScript.
 * Desktop: coluna lateral fixa (sticky) abaixo do header. Links são âncoras
 * de hash; a URL da página não muda. Não cria headings novos.
 */
const ArticleToc = ({ items, title = 'Neste artigo', minItems = 3 }: ArticleTocProps) => {
  if (items.length < minItems) return null

  return (
    <>
      <details className="group/toc mb-8 rounded-card bg-surface-muted lg:hidden">
        <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-3 rounded-card px-5 py-3 t-label font-semibold text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus [&::-webkit-details-marker]:hidden">
          <span>
            {title}
            <span className="font-normal text-text-secondary"> · {items.length} tópicos</span>
          </span>
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-bc-primary transition-transform duration-200 group-open/toc:rotate-180 motion-reduce:transition-none"
          >
            <path d="M3 5.5 7 9.5l4-4" />
          </svg>
        </summary>
        <nav aria-label={title} className="px-5 pb-4">
          <TocList items={items} />
        </nav>
      </details>

      <nav aria-label={title} className="hidden lg:sticky lg:top-28 lg:block">
        <p className="t-eyebrow">{title}</p>
        <div className="mt-3">
          <TocList items={items} />
        </div>
      </nav>
    </>
  )
}

export default ArticleToc
