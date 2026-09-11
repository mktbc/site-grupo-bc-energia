import Link from '@/components/Link'

/**
 * Estado vazio honesto e COMPACTO dos hubs de conteúdo (VISUAL 15).
 *
 * Enquanto não houver conteúdo real publicado, o hub NÃO exibe cards fictícios
 * nem "lorem ipsum": diz o que é a seção e oferece caminhos reais já existentes
 * no site. Ocupa poucas linhas — nunca uma seção inteira.
 */
type Props = {
  title: string
  description: string
  links: Array<{ label: string; href: string }>
}

const ContentEmptyState = ({ title, description, links }: Props) => (
  <div className="measure-body">
    <h2 className="t-h4 text-text-primary">{title}</h2>
    <p className="mt-3 t-body-sm text-text-secondary">{description}</p>

    {links.length > 0 && (
      <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-[44px] items-center gap-2 t-body-sm font-semibold text-bc-primary underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
            >
              {link.label}
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
)

export default ContentEmptyState
