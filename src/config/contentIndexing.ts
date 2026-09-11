/**
 * ESTRATÉGIA DE INDEXAÇÃO DO CONTEÚDO EDITORIAL (Blog + BC Cast).
 *
 * Substitui a antiga trava binária ("tudo noindex") por uma avaliação
 * POR URL, baseada nos critérios de docs/CONTENT-INDEXING-CRITERIA.md:
 *
 *   ready                  → index,follow
 *   needs-editorial-review → noindex,follow (conteúdo existe, falta qualidade)
 *   not-ready              → noindex,follow (incompleto/raso)
 *
 * Regras não negociáveis:
 *  - Nada é indexado automaticamente por existir. Além de passar nos critérios
 *    técnicos, o slug precisa estar em `EDITORIAL_APPROVED` (decisão humana).
 *  - Nenhum dado é inventado para "passar" nos critérios.
 *  - Hubs só são indexáveis quando têm massa crítica de itens indexáveis.
 */
import { getArticles, getArticle } from '@/data/content/articles'
import { getEpisodes, getEpisode } from '@/data/content/episodes'
import type { Article, ContentBlock, Episode } from '@/data/content/types'

export type ContentIndexStatus = 'ready' | 'needs-editorial-review' | 'not-ready'

export type ContentIndexDecision = {
  path: string
  type: 'artigo' | 'episodio' | 'hub'
  status: ContentIndexStatus
  /** `true` quando a URL pode receber index,follow e entrar no sitemap. */
  indexable: boolean
  /** Motivo resumido da decisão. */
  reason: string
  /** Pendências editoriais que impedem a indexação. */
  pending: string[]
}

/**
 * TRAVA MESTRA. Com `false`, todo o conteúdo editorial permanece
 * noindex,follow independentemente da avaliação individual.
 */
export const CONTENT_INDEXING_ENABLED = true

/**
 * LIBERAÇÃO EDITORIAL EXPLÍCITA (Fase C — liberação seletiva).
 * Só entram aqui slugs revisados e aprovados por uma pessoa.
 * Estar nesta lista NÃO basta: os critérios técnicos abaixo também precisam
 * ser cumpridos.
 */
const EDITORIAL_APPROVED = {
  articles: new Set<string>([]),
  episodes: new Set<string>([])
}

/* ------------------------------ critérios ------------------------------- */

const MIN_ARTICLE_WORDS = 600
const MIN_EXCERPT_CHARS = 80
const MIN_READY_ARTICLES_FOR_HUB = 3
const MIN_READY_EPISODES_FOR_HUB = 2

const blockWords = (block: ContentBlock): number => {
  switch (block.type) {
    case 'paragraph':
      return block.text.split(/\s+/).length
    case 'heading':
      return block.text.split(/\s+/).length
    case 'list':
      return block.items.join(' ').split(/\s+/).length
    case 'quote':
      return block.text.split(/\s+/).length
    case 'table':
      return block.rows.flat().join(' ').split(/\s+/).length
    default:
      return 0
  }
}

const wordCount = (body: ContentBlock[] = []): number =>
  body.reduce((total, block) => total + blockWords(block), 0)

const hasHeadings = (body: ContentBlock[] = []): boolean =>
  body.some((block) => block.type === 'heading' && block.level === 2)

const hasInternalLinks = (article: Article): boolean =>
  Boolean(
    article.solutionPath ||
      article.segmentPaths?.length ||
      article.regionPaths?.length ||
      article.body.some((block) => block.type === 'paragraph' && block.link)
  )

/** Pendências editoriais de um artigo (vazio = cumpre todos os critérios). */
export const articlePending = (article: Article): string[] => {
  const pending: string[] = []

  if (wordCount(article.body) < MIN_ARTICLE_WORDS) pending.push('conteúdo curto demais')
  if (!hasHeadings(article.body)) pending.push('sem estrutura de H2')
  if (!article.excerpt || article.excerpt.length < MIN_EXCERPT_CHARS)
    pending.push('resumo/description insuficiente')
  if (!article.publishedAt) pending.push('data de publicação real ausente')
  if (!article.author) pending.push('autoria real ausente')
  if (!article.image) pending.push('imagem editorial ausente')
  if (!hasInternalLinks(article)) pending.push('sem links internos contextuais')
  if (!article.intent) pending.push('intenção de busca não definida')
  if (article.requiresExternalResearch && !article.sources?.length)
    pending.push('tema regulatório sem fontes externas citadas')

  return pending
}

/** Pendências editoriais de um episódio. */
export const episodePending = (episode: Episode): string[] => {
  const pending: string[] = []

  if (!episode.excerpt || episode.excerpt.length < MIN_EXCERPT_CHARS)
    pending.push('resumo editorial ausente ou curto')
  if (!episode.uploadDate) pending.push('data real de publicação ausente')
  if (!episode.topics?.length && !episode.transcript?.length)
    pending.push('sem tópicos ou transcrição real (conteúdo além do vídeo)')
  if (!episode.solutionPath && !episode.segmentPaths?.length && !episode.relatedArticles?.length)
    pending.push('sem links internos contextuais')

  return pending
}

const decide = (
  path: string,
  type: 'artigo' | 'episodio',
  approved: boolean,
  pending: string[],
  severelyIncomplete: boolean
): ContentIndexDecision => {
  if (!CONTENT_INDEXING_ENABLED)
    return {
      path,
      type,
      status: 'needs-editorial-review',
      indexable: false,
      reason: 'trava mestra de indexação de conteúdo desativada',
      pending
    }

  if (pending.length === 0 && approved)
    return {
      path,
      type,
      status: 'ready',
      indexable: true,
      reason: 'cumpre os critérios mínimos e possui liberação editorial',
      pending: []
    }

  if (pending.length === 0)
    return {
      path,
      type,
      status: 'needs-editorial-review',
      indexable: false,
      reason: 'cumpre os critérios técnicos, aguardando liberação editorial humana',
      pending: ['aprovação editorial pendente']
    }

  return {
    path,
    type,
    status: severelyIncomplete ? 'not-ready' : 'needs-editorial-review',
    indexable: false,
    reason: severelyIncomplete
      ? 'conteúdo incompleto para competir organicamente'
      : 'conteúdo existe, mas faltam requisitos de qualidade',
    pending
  }
}

/* ------------------------------- decisões -------------------------------- */

export const getArticleDecision = (slug: string): ContentIndexDecision | null => {
  const article = getArticle(slug)
  if (!article) return null

  const pending = articlePending(article)
  return decide(
    `/conteudo/blog/${article.slug}`,
    'artigo',
    EDITORIAL_APPROVED.articles.has(article.slug),
    pending,
    wordCount(article.body) < MIN_ARTICLE_WORDS || !hasHeadings(article.body)
  )
}

export const getEpisodeDecision = (slug: string): ContentIndexDecision | null => {
  const episode = getEpisode(slug)
  if (!episode) return null

  const pending = episodePending(episode)
  return decide(
    `/conteudo/bc-cast/${episode.slug}`,
    'episodio',
    EDITORIAL_APPROVED.episodes.has(episode.slug),
    pending,
    !episode.excerpt || (!episode.topics?.length && !episode.transcript?.length)
  )
}

export const isArticleIndexable = (slug: string): boolean =>
  getArticleDecision(slug)?.indexable ?? false

export const isEpisodeIndexable = (slug: string): boolean =>
  getEpisodeDecision(slug)?.indexable ?? false

const readyArticles = (): Article[] =>
  getArticles().filter((article) => isArticleIndexable(article.slug))

const readyEpisodes = (): Episode[] =>
  getEpisodes().filter((episode) => isEpisodeIndexable(episode.slug))

/**
 * Hubs: só indexáveis quando existe massa crítica de itens indexáveis.
 * Listagem sem destino indexável = página de índice sem valor de busca.
 */
export const getHubDecision = (path: string): ContentIndexDecision => {
  const base = { path, type: 'hub' as const }

  if (!CONTENT_INDEXING_ENABLED)
    return {
      ...base,
      status: 'needs-editorial-review',
      indexable: false,
      reason: 'trava mestra de indexação de conteúdo desativada',
      pending: []
    }

  if (path === '/conteudo/blog') {
    const count = readyArticles().length
    const ok = count >= MIN_READY_ARTICLES_FOR_HUB
    return {
      ...base,
      status: ok ? 'ready' : 'needs-editorial-review',
      indexable: ok,
      reason: ok
        ? `${count} artigos indexáveis publicados`
        : `apenas ${count} de ${MIN_READY_ARTICLES_FOR_HUB} artigos indexáveis`,
      pending: ok ? [] : [`publicar ${MIN_READY_ARTICLES_FOR_HUB - count} artigo(s) indexável(is)`]
    }
  }

  if (path === '/conteudo/bc-cast') {
    const count = readyEpisodes().length
    const ok = count >= MIN_READY_EPISODES_FOR_HUB
    return {
      ...base,
      status: ok ? 'ready' : 'needs-editorial-review',
      indexable: ok,
      reason: ok
        ? `${count} episódios indexáveis com contexto editorial`
        : `apenas ${count} de ${MIN_READY_EPISODES_FOR_HUB} episódios indexáveis`,
      pending: ok ? [] : ['completar contexto editorial dos episódios']
    }
  }

  // /conteudo — hub geral: indexável quando ao menos um hub filho for indexável.
  const ok = getHubDecision('/conteudo/blog').indexable || getHubDecision('/conteudo/bc-cast').indexable
  return {
    ...base,
    status: ok ? 'ready' : 'needs-editorial-review',
    indexable: ok,
    reason: ok
      ? 'hub com arquitetura temática e destinos indexáveis'
      : 'hub sem destinos indexáveis (Blog e BC Cast ainda em revisão)',
    pending: ok ? [] : ['liberar Blog ou BC Cast']
  }
}

const CONTENT_HUBS = ['/conteudo', '/conteudo/blog', '/conteudo/bc-cast']

export const isContentHub = (path: string): boolean => CONTENT_HUBS.includes(path)

/** Rotas de conteúdo que devem entrar no sitemap.xml. */
export const getIndexableContentRoutes = (): string[] => [
  ...CONTENT_HUBS.filter((path) => getHubDecision(path).indexable),
  ...readyArticles().map((article) => `/conteudo/blog/${article.slug}`),
  ...readyEpisodes().map((episode) => `/conteudo/bc-cast/${episode.slug}`)
]

/** Relatório completo (Fase A — auditoria). */
export const getContentIndexingReport = (): ContentIndexDecision[] => [
  ...CONTENT_HUBS.map(getHubDecision),
  ...getArticles()
    .map((article) => getArticleDecision(article.slug))
    .filter((item): item is ContentIndexDecision => Boolean(item)),
  ...getEpisodes()
    .map((episode) => getEpisodeDecision(episode.slug))
    .filter((item): item is ContentIndexDecision => Boolean(item))
]
