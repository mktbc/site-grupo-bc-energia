/**
 * Metadata das rotas DINÂMICAS de conteúdo (/conteudo/blog/:slug e
 * /conteudo/bc-cast/:slug).
 *
 * Fica separado de `meta.ts` para evitar dependência circular:
 *   meta.ts (rotas estáticas)  →  data/content/related.ts
 *   meta-content.ts            →  meta.ts + data/content
 *
 * REGRA DE INDEXAÇÃO (Bloco 10): todo conteúdo do Blog e do BC Cast é
 * `noindex,follow` até que os critérios de docs/CONTENT-INDEXING-CRITERIA.md
 * sejam atendidos e a liberação seja feita explicitamente aqui.
 */
import { getArticle } from '@/data/content/articles'
import { getEpisode, getEpisodeLabel } from '@/data/content/episodes'

import {
  getArticleDecision,
  getEpisodeDecision,
  getHubDecision,
  isContentHub
} from './contentIndexing'
import { CONTEUDO, NOT_FOUND_META, getRouteMeta, type PageMeta } from './meta'
import { REDIRECTS, isKnownRoute } from './routes'

/**
 * A indexação de conteúdo deixou de ser binária: cada URL de Blog/BC Cast é
 * avaliada individualmente em `src/config/contentIndexing.ts` (critérios de
 * qualidade + liberação editorial explícita). Reexportado apenas como trava
 * mestra para quem já dependia da constante.
 */
export { CONTENT_INDEXING_ENABLED } from './contentIndexing'

const BLOG = { name: 'Blog', path: '/conteudo/blog' }
const BC_CAST = { name: 'BC Cast', path: '/conteudo/bc-cast' }

const articleMeta = (slug: string): PageMeta | null => {
  const article = getArticle(slug)
  if (!article) return null

  return {
    title: `${article.title} | Grupo BC Energia`,
    description: article.description ?? article.excerpt,
    noindex: !getArticleDecision(article.slug)?.indexable,
    ogType: 'article',
    ogImage: article.image?.src,
    breadcrumb: [BLOG, { name: article.title, path: `/conteudo/blog/${article.slug}` }]
  }
}

const episodeMeta = (slug: string): PageMeta | null => {
  const episode = getEpisode(slug)
  if (!episode) return null

  const label = getEpisodeLabel(episode)
  return {
    title: `${label} | Grupo BC Energia`,
    description:
      episode.excerpt ??
      `Episódio do BC Cast, o podcast do Grupo BC Energia: ${episode.title}.`,
    noindex: !getEpisodeDecision(episode.slug)?.indexable,
    ogType: 'article',
    breadcrumb: [BC_CAST, { name: label, path: `/conteudo/bc-cast/${episode.slug}` }]
  }
}

/**
 * Resolve a metadata de qualquer rota, incluindo as dinâmicas de conteúdo.
 * Deve ser usada no lugar de `getRouteMeta` por RootLayout e Breadcrumbs.
 */
const normalizePath = (pathname: string): string => {
  const clean = (pathname || '/').split('?')[0].split('#')[0]
  return clean !== '/' && clean.endsWith('/') ? clean.slice(0, -1) : clean
}

/**
 * ETAPA SEO 07 — rotas de redirect (ex.: /produtos/irec) não são entidades
 * próprias: sem canonical, sem indexação e, por consequência, sem JSON-LD.
 */
export const REDIRECT_META: PageMeta = {
  title: 'Redirecionando | Grupo BC Energia',
  noindex: true,
  nofollow: true,
  noCanonical: true
}

export const resolveRouteMeta = (pathname: string): PageMeta => {
  if (REDIRECTS[normalizePath(pathname)]) return REDIRECT_META

  const blog = pathname.match(/^\/conteudo\/blog\/([^/]+)\/?$/)
  if (blog) return articleMeta(decodeURIComponent(blog[1])) ?? NOT_FOUND_META

  const cast = pathname.match(/^\/conteudo\/bc-cast\/([^/]+)\/?$/)
  if (cast) return episodeMeta(decodeURIComponent(cast[1])) ?? NOT_FOUND_META

  // Rota inexistente: metadata própria de Not Found (nunca a da Home).
  if (!isKnownRoute(pathname)) return NOT_FOUND_META

  const meta = getRouteMeta(pathname)

  // Hubs de conteúdo: indexáveis apenas com massa crítica de itens liberados.
  const hubPath = normalizePath(pathname)
  if (isContentHub(hubPath)) {
    return { ...meta, noindex: !getHubDecision(hubPath).indexable }
  }

  return meta
}

export { CONTEUDO }
