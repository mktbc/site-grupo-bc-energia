/**
 * Sistema simples de conteúdos relacionados.
 *
 * Regras (Bloco 10, §21): nenhuma biblioteca nova, nenhum algoritmo complexo.
 * A relação é declarativa: relação explícita > mesmo cluster > mesma tag.
 * Retorna sempre lista vazia quando não há conteúdo real — os componentes que
 * consomem não renderizam seção vazia.
 */
import { getRouteMeta } from '@/config/meta'

import { getArticle, getArticles } from './articles'
import { CLUSTERS } from './clusters'
import { getEpisode, getEpisodes } from './episodes'
import type { Article, Episode, RelatedRef } from './types'

const dedupe = <T extends { slug: string }>(items: T[]): T[] => {
  const seen = new Set<string>()
  return items.filter((item) => (seen.has(item.slug) ? false : (seen.add(item.slug), true)))
}

const score = (a: Article, b: Article): number => {
  let value = 0
  if (a.cluster === b.cluster) value += 3
  const tags = new Set(a.tags ?? [])
  ;(b.tags ?? []).forEach((tag) => tags.has(tag) && (value += 1))
  if (a.solutionPath && a.solutionPath === b.solutionPath) value += 2
  return value
}

/** Artigos relacionados a um artigo (explícitos primeiro, depois cluster/tags). */
export const getRelatedArticles = (article: Article, limit = 3): Article[] => {
  const explicit = (article.relatedArticles ?? [])
    .map((slug) => getArticle(slug))
    .filter(Boolean) as Article[]

  const candidates = getArticles()
    .filter((item) => item.slug !== article.slug)
    .map((item) => ({ item, value: score(article, item) }))
    .filter(({ value }) => value > 0)
    .sort((a, b) => b.value - a.value)
    .map(({ item }) => item)

  return dedupe([...explicit, ...candidates]).slice(0, limit)
}

/** Episódios relacionados a um artigo. */
export const getRelatedEpisodes = (article: Article, limit = 2): Episode[] => {
  const explicit = (article.relatedEpisodes ?? [])
    .map((slug) => getEpisode(slug))
    .filter(Boolean) as Episode[]

  const byCluster = getEpisodes().filter((episode) => episode.cluster === article.cluster)

  return dedupe([...explicit, ...byCluster]).slice(0, limit)
}

/** Links comerciais do conteúdo: solução, segmentos e regiões declarados. */
/**
 * Links comerciais do conteúdo (âncoras descritivas, §20).
 * O rótulo vem do breadcrumb real da rota em src/config/meta.ts —
 * nunca de texto genérico como "saiba mais".
 */
export const getCommercialLinks = (
  content: Pick<Article, 'cluster' | 'solutionPath' | 'segmentPaths' | 'regionPaths'>
): RelatedRef[] => {
  const cluster = CLUSTERS[content.cluster]
  const paths = [
    content.solutionPath ?? cluster?.moneyPath,
    ...(content.segmentPaths ?? []),
    ...(content.regionPaths ?? [])
  ].filter(Boolean) as string[]

  const seen = new Set<string>()
  return paths
    .filter((path) => (seen.has(path) ? false : (seen.add(path), true)))
    .map((path) => {
      const meta = getRouteMeta(path)
      const label = meta.breadcrumb?.[meta.breadcrumb.length - 1]?.name ?? meta.title
      return { label, href: path, description: meta.description }
    })
}

