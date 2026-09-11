/**
 * Seleção CONTEXTUAL de conteúdo editorial para páginas comerciais.
 *
 * Regra permanente: nada de conteúdo fictício. A função só devolve artigos e
 * episódios que existem de verdade em `articles.ts` / `episodes.ts`.
 * Quando não houver relação real, devolve lista vazia — e o componente que
 * consome simplesmente não renderiza a seção (§25 do briefing).
 *
 * Prioridade da relação:
 *  1. relação declarada com a rota (solutionPath / segmentPaths / regionPaths)
 *  2. mesmo cluster editorial da página
 */
import { getArticles, getArticlesForPath } from './articles'
import { getEpisodes, getEpisodesForPath, getEpisodeLabel } from './episodes'
import type { ClusterId } from './types'

export type ContextualItem = {
  key: string
  type: 'blog' | 'bc_cast'
  slug: string
  href: string
  /** Rótulo do tipo de conteúdo (ex.: "Blog", "BC Cast #01"). */
  kind: string
  title: string
  description?: string
  image?: { src: string; alt: string; width?: number; height?: number }
  publishedAt?: string
  /** Vídeo do episódio, quando existir. */
  embedUrl?: string
}

export type ContextualQuery = {
  /** Rota atual (ex.: '/produtos/mercado-livre-de-energia'). */
  path?: string
  /** Cluster editorial da página, quando aplicável. */
  cluster?: ClusterId
  /** Máximo de itens (2 a 3 — relevância acima de quantidade, §14). */
  limit?: number
}

const articleItem = (slug: string, item: ReturnType<typeof getArticles>[number]): ContextualItem => ({
  key: `blog-${slug}`,
  type: 'blog',
  slug,
  href: `/conteudo/blog/${slug}`,
  kind: 'Blog',
  title: item.title,
  description: item.excerpt,
  image: item.image,
  publishedAt: item.publishedAt
})

const episodeItem = (item: ReturnType<typeof getEpisodes>[number]): ContextualItem => ({
  key: `bc-cast-${item.slug}`,
  type: 'bc_cast',
  slug: item.slug,
  href: `/conteudo/bc-cast/${item.slug}`,
  kind: getEpisodeLabel(item).split(' | ')[0] ?? 'BC Cast',
  title: item.title,
  description: item.guests?.length
    ? `Com ${item.guests.map((guest) => guest.name).join(', ')}`
    : undefined,
  embedUrl: item.embedUrl
})

/**
 * Conteúdos realmente relacionados a uma página comercial.
 * Nunca completa a lista com itens genéricos.
 */
export const getContextualContent = ({
  path,
  cluster,
  limit = 3
}: ContextualQuery): ContextualItem[] => {
  const byPathArticles = path ? getArticlesForPath(path) : []
  const byPathEpisodes = path ? getEpisodesForPath(path) : []

  const byClusterArticles = cluster
    ? getArticles().filter((article) => article.cluster === cluster)
    : []
  const byClusterEpisodes = cluster
    ? getEpisodes().filter((episode) => episode.cluster === cluster)
    : []

  const items = [
    ...byPathArticles.map((article) => articleItem(article.slug, article)),
    ...byPathEpisodes.map(episodeItem),
    ...byClusterArticles.map((article) => articleItem(article.slug, article)),
    ...byClusterEpisodes.map(episodeItem)
  ]

  const seen = new Set<string>()
  return items
    .filter((item) => (seen.has(item.key) ? false : (seen.add(item.key), true)))
    .slice(0, Math.max(0, limit))
}
