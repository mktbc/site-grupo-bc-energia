/**
 * Tipos da camada editorial (Blog + BC Cast).
 *
 * REGRA DO BLOCO 10: nenhum conteúdo fictício. Todo campo opcional só é
 * preenchido quando existe dado REAL (autor, data, imagem, transcrição).
 * Campos ausentes simplesmente não são renderizados e não entram no JSON-LD.
 */

/** Clusters editoriais — derivados das soluções REAIS do projeto. */
export type ClusterId =
  | 'mercado-livre'
  | 'geracao-distribuida'
  | 'gestao-de-energia'
  | 'sustentabilidade-irec'
  | 'economia-conta-de-energia'
  | 'usinas-arrendamento'

/** Estágio de funil da peça de conteúdo. */
export type FunnelStage = 'topo' | 'meio' | 'fundo' | 'conversao'

/** Intenção de busca. */
export type SearchIntent = 'informacional' | 'comparativa' | 'comercial' | 'transacional'

/** Link contextual dentro do corpo do conteúdo (âncora sempre descritiva). */
export type ContentLink = {
  label: string
  href: string
  /** CTA editorial contextual: dispara content_cta_click quando true. */
  cta?: boolean
}

/** Bloco de conteúdo do corpo do artigo (sem HTML solto, sem dangerouslySetInnerHTML). */
export type ContentBlock =
  | { type: 'heading'; level: 2 | 3; text: string; id?: string }
  | { type: 'paragraph'; text: string; link?: ContentLink }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'quote'; text: string; source?: string }
  | { type: 'table'; caption?: string; columns: string[]; rows: string[][] }


export type ContentFaq = { question: string; answer: string }

/** Autoria/revisão — E-E-A-T. Só usar dados reais e aprovados. */
export type ContentPerson = { name: string; role?: string; url?: string }

/** CTA editorial contextual (nunca o mesmo CTA em todos os conteúdos). */
export type ContentCta = {
  label: string
  href: string
  description?: string
  /** Título da seção de CTA. Padrão: "Próximo passo". */
  heading?: string
}

export type ContentImage = {
  src: string
  alt: string
  width?: number
  height?: number
}

export type RelatedRef = {
  label: string
  href: string
  description?: string
}

/** Artigo do Blog — /conteudo/blog/[slug]. */
export type Article = {
  slug: string
  title: string
  /** Resumo/dek exibido no hub e usado como meta description quando não houver outra. */
  excerpt: string
  description?: string
  cluster: ClusterId
  funnel: FunnelStage
  intent: SearchIntent
  tags?: string[]
  /** ISO 8601. Só preencher com data real de publicação. */
  publishedAt?: string
  updatedAt?: string
  author?: ContentPerson
  reviewer?: ContentPerson
  image?: ContentImage
  body: ContentBlock[]
  faq?: ContentFaq[]
  /** Página comercial principal (money page) que este artigo apoia. */
  solutionPath?: string
  segmentPaths?: string[]
  regionPaths?: string[]
  relatedArticles?: string[]
  relatedEpisodes?: string[]
  cta?: ContentCta
  /** Fontes externas citadas (obrigatório para temas regulatórios). */
  sources?: Array<{ label: string; url: string }>
  /** Conteúdo regulatório/YMYL: exige pesquisa externa atualizada antes de publicar. */
  requiresExternalResearch?: boolean
}

/** Episódio do BC Cast — /conteudo/bc-cast/[slug]. */
export type Episode = {
  slug: string
  /** Numeração do episódio quando existir de verdade (ex.: 1, 2). */
  number?: number
  title: string
  excerpt?: string
  /** URL de embed do YouTube (mesma usada pelo YouTubeEmbed). */
  embedUrl: string
  /** ISO 8601 — SOMENTE data real de publicação do vídeo. Sem isso, não emitimos VideoObject. */
  uploadDate?: string
  duration?: string
  guests?: ContentPerson[]
  hosts?: ContentPerson[]
  topics?: string[]
  /** Transcrição real. Nunca gerar automaticamente. */
  transcript?: ContentBlock[]
  cluster?: ClusterId
  tags?: string[]
  solutionPath?: string
  segmentPaths?: string[]
  relatedArticles?: string[]
  cta?: ContentCta
}
