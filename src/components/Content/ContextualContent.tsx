import Link from '@/components/Link'
import SectionHeader from '@/components/SectionHeader/SectionHeader'
import { getContextualContent, type ContextualQuery } from '@/data/content/contextual'

import ContentSection, { type ContentSectionTone } from './ContentSection'

export type ContextualContentProps = ContextualQuery & {
  /** Título contextual — nunca "Veja também"/"Leia mais" (§15). */
  title: string
  eyebrow?: string
  description?: string
  tone?: ContentSectionTone
  /** Prefixo dos eventos/data-cta-name (ex.: 'produto_mercado_livre'). */
  trackingId: string
}

/**
 * Bloco editorial CONTEXTUAL para páginas comerciais.
 *
 * Mostra 1 conteúdo principal + até 2 de apoio, sempre conteúdo REAL
 * (Blog ou BC Cast) relacionado à rota ou ao cluster da página. Se não houver
 * relação real, nada é renderizado — nunca preenchemos a grade com placeholder.
 *
 * Apresentação editorial (§16): sem cartões pesados, sem bordas arredondadas,
 * apenas hierarquia tipográfica, filete e âncoras descritivas.
 */
const ContextualContent = ({
  title,
  eyebrow = 'Aprofunde este tema',
  description,
  tone = 'muted',
  trackingId,
  path,
  cluster,
  limit = 3
}: ContextualContentProps) => {
  const items = getContextualContent({ path, cluster, limit })
  if (!items.length) return null

  const [featured, ...supporting] = items

  return (
    <ContentSection tone={tone}>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} level="support" />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <article className={supporting.length ? 'lg:col-span-7' : 'lg:col-span-9'}>
          {featured.image ? (
            <img
              src={featured.image.src}
              alt={featured.image.alt}
              width={featured.image.width}
              height={featured.image.height}
              loading="lazy"
              decoding="async"
              className="mb-6 aspect-[16/9] w-full object-cover"
            />
          ) : null}

          <p className="t-eyebrow text-bc-primary">{featured.kind}</p>
          <h3 className="t-h3 mt-3 measure-title">
            <Link
              href={featured.href}
              data-cta-name={`${trackingId}_conteudo_${featured.slug}`}
              className="transition-colors duration-200 ease-bc hover:text-bc-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus motion-reduce:transition-none"
            >
              {featured.title}
            </Link>
          </h3>
          {featured.description ? (
            <p className="mt-3 measure-body font-sans t-body-sm line-clamp-2">
              {featured.description}
            </p>
          ) : null}

          <Link
            href={featured.href}
            data-cta-name={`${trackingId}_conteudo_cta_${featured.slug}`}
            className="group mt-5 inline-flex items-center gap-2 t-action-label text-bc-primary transition-colors duration-200 ease-bc hover:text-bc-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus motion-reduce:transition-none"
          >
            {featured.type === 'blog' ? 'Ler o artigo completo' : 'Assistir ao episódio'}
            <span
              aria-hidden="true"
              className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
            >
              →
            </span>
          </Link>
        </article>

        {supporting.length ? (
          <ul className="lg:col-span-5 lg:border-l lg:border-border-subtle lg:pl-8">
            {supporting.map((item) => (
              <li key={item.key} className="border-b border-border-subtle last:border-b-0">
                <Link
                  href={item.href}
                  data-cta-name={`${trackingId}_conteudo_${item.slug}`}
                  className="group block py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                >
                  <span className="flex items-start justify-between gap-6">
                    <span className="min-w-0">
                      <span className="font-sans t-caption font-semibold tracking-[0.14em] text-bc-primary">
                        {item.kind}
                      </span>
                      <span className="mt-2 block t-h4-display transition-colors duration-200 group-hover:text-bc-primary motion-reduce:transition-none">
                        {item.title}
                      </span>
                      {item.description ? (
                        <span className="mt-2 block line-clamp-2 font-sans t-body-sm">
                          {item.description}
                        </span>
                      ) : null}
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 pt-1 transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </ContentSection>
  )
}

export default ContextualContent
