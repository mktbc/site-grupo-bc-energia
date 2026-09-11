/**
 * Builders tipados de JSON-LD (schema.org).
 *
 * Regra do projeto: nenhum JSON-LD hardcoded espalhado pelas páginas — tudo é
 * montado por estes helpers, a partir de dados que EXISTEM no projeto.
 * Nunca inventar telefone, endereço, CNPJ, preço, avaliações ou cobertura
 * geográfica não suportada pelo conteúdo.
 */
import {
  SITE_NAME,
  SITE_URL,
  SITE_LOGO,
  SOCIAL_PROFILES,
  buildCanonical,
  toAbsoluteUrl
} from '@/config/site'

export type JsonLd = Record<string, unknown>

const SCHEMA = 'https://schema.org'

/**
 * IDs canônicos das entidades globais (ETAPA SEO 07).
 * Uma única Organization e um único WebSite no site inteiro — qualquer outro
 * schema referencia estes @id em vez de recriar dados divergentes.
 */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

/** Referência curta à Organization (usada em provider/publisher). */
export const organizationRef = (): JsonLd => ({
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`
})

/** Organization — usado apenas na Home. */
export const organizationSchema = (description?: string): JsonLd => ({
  '@context': SCHEMA,
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: SITE_LOGO,
  ...(description ? { description } : {}),
  sameAs: SOCIAL_PROFILES
})

/** WebSite — usado apenas na Home. Sem SearchAction (o site não tem busca). */
export const websiteSchema = (): JsonLd => ({
  '@context': SCHEMA,
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: 'pt-BR',
  publisher: { '@id': ORGANIZATION_ID }
})

export type BreadcrumbItem = { name: string; path: string }

/** BreadcrumbList a partir da arquitetura real do site (URLs canônicas absolutas). */
export const breadcrumbSchema = (items: BreadcrumbItem[]): JsonLd => ({
  '@context': SCHEMA,
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: buildCanonical(item.path)
  }))
})

/**
 * Service — apenas para páginas que representam um serviço real do grupo.
 * Sem `offers`, `price` ou `aggregateRating` (não há dados reais).
 */
export const serviceSchema = ({
  name,
  description,
  path
}: {
  name: string
  description?: string
  path: string
}): JsonLd => ({
  '@context': SCHEMA,
  '@type': 'Service',
  '@id': `${buildCanonical(path)}#service`,
  name,
  ...(description ? { description } : {}),
  url: buildCanonical(path),
  provider: organizationRef()
})

export type FaqItem = { title: string; content: string }

/**
 * FAQPage — só deve ser emitido quando a FAQ está VISÍVEL na página e o texto
 * do JSON-LD é exatamente o exibido ao usuário. Nunca emitir FAQ oculto.
 */
export const faqSchema = (items: FaqItem[]): JsonLd => ({
  '@context': SCHEMA,
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.title,
    acceptedAnswer: { '@type': 'Answer', text: item.content }
  }))
})

/**
 * Article / BlogPosting — só emitir para ARTIGO REAL publicado.
 *
 * Nenhum campo é inventado: autor, datas, imagem e publisher só entram quando
 * existem nos dados. Sem `headline` + `datePublished` reais, retorna `null`
 * (o <Seo> ignora blocos nulos) — melhor nenhum schema do que schema falso.
 */
export const articleSchema = ({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  authorName,
  imageUrl,
  type = 'BlogPosting'
}: {
  headline: string
  description?: string
  path: string
  datePublished?: string
  dateModified?: string
  authorName?: string
  imageUrl?: string
  type?: 'Article' | 'BlogPosting'
}): JsonLd | null => {
  if (!headline || !datePublished) return null

  return {
    '@context': SCHEMA,
    '@type': type,
    headline,
    ...(description ? { description } : {}),
    mainEntityOfPage: { '@type': 'WebPage', '@id': buildCanonical(path) },
    url: buildCanonical(path),
    datePublished,
    ...(dateModified ? { dateModified } : {}),
    ...(authorName ? { author: { '@type': 'Person', name: authorName } } : {}),
    ...(imageUrl ? { image: toAbsoluteUrl(imageUrl) } : {}),
    inLanguage: 'pt-BR',
    publisher: {
      ...organizationRef(),
      logo: { '@type': 'ImageObject', url: SITE_LOGO }
    }
  }
}

/**
 * VideoObject — exige name, description, thumbnailUrl, uploadDate e embedUrl
 * REAIS. Falta qualquer um deles → retorna `null` (nunca inventar uploadDate).
 */
export const videoObjectSchema = ({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  embedUrl,
  duration
}: {
  name: string
  description?: string
  thumbnailUrl?: string
  uploadDate?: string
  embedUrl: string
  duration?: string
}): JsonLd | null => {
  if (!name || !description || !thumbnailUrl || !uploadDate || !embedUrl) return null

  return {
    '@context': SCHEMA,
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    embedUrl,
    ...(duration ? { duration } : {}),
    publisher: {
      ...organizationRef(),
      logo: { '@type': 'ImageObject', url: SITE_LOGO }
    }
  }
}
