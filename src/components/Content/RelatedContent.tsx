import SectionHeader from '@/components/SectionHeader/SectionHeader'

import ContentSection, { type ContentSectionTone } from './ContentSection'
import EditorialItem from './EditorialItem'

export type RelatedArticleRef = {
  slug: string
  title: string
  excerpt?: string
  publishedAt?: string
  topic?: string
}

export type RelatedEpisodeRef = {
  slug: string
  title: string
  excerpt?: string
  embedUrl?: string
  guests?: string
}

export type RelatedContentProps = {
  title?: string
  description?: string
  articles?: RelatedArticleRef[]
  episodes?: RelatedEpisodeRef[]
  tone?: ContentSectionTone
}

const formatDate = (iso?: string) => {
  if (!iso) return undefined
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return undefined
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
    .format(date)
    .replace('.', '.')
}

/**
 * Conteúdos relacionados (máx. 3 itens reais).
 *
 * Lista editorial — sem cards, sem badges e sem grade repetitiva. Se não
 * houver conteúdo real relacionado, a seção inteira não é renderizada.
 */
const RelatedContent = ({
  title = 'Continue explorando',
  description,
  articles = [],
  episodes = [],
  tone = 'muted'
}: RelatedContentProps) => {
  const total = articles.length + episodes.length
  if (total === 0) return null

  return (
    <ContentSection tone={tone}>
      <SectionHeader title={title} description={description} />

      <ul className="mt-6 divide-y divide-border-subtle border-t border-border-subtle">
        {articles.map((article) => (
          <li key={`a-${article.slug}`}>
            <EditorialItem
              href={`/conteudo/blog/${article.slug}`}
              title={article.title}
              excerpt={article.excerpt}
              meta={['Artigo', article.topic, formatDate(article.publishedAt)]}
              tracking={`related_blog_${article.slug}`}
            />
          </li>
        ))}
        {episodes.map((episode) => (
          <li key={`e-${episode.slug}`}>
            <EditorialItem
              href={`/conteudo/bc-cast/${episode.slug}`}
              title={episode.title}
              excerpt={episode.excerpt}
              meta={['BC Cast', episode.guests ? `Com ${episode.guests}` : undefined]}
              tracking={`related_bc_cast_${episode.slug}`}
            />
          </li>
        ))}
      </ul>
    </ContentSection>
  )
}

export default RelatedContent
