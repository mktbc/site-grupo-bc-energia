import { Helmet } from 'react-helmet-async'

import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  buildCanonical,
  isPreviewEnvironment,
  toAbsoluteUrl
} from '@/config/site'

import type { JsonLd } from './structuredDataBuilders'

/**
 * Define título, meta description, canonical, robots, Open Graph, Twitter Cards
 * e JSON-LD da página (substitui o `metadata` / `generateMetadata` do Next).
 * Usa react-helmet-async — as tags deduplicam por name/property.
 */
export type SeoProps = {
  title?: string
  description?: string
  /** Caminho da rota (ex.: "/produtos"). Quando informado, gera canonical absoluta. */
  canonicalPath?: string
  /** Página não indexável (conteúdo provisório, páginas de sucesso, 404). */
  noindex?: boolean
  /** Também bloqueia o rastreamento dos links (páginas de erro). */
  nofollow?: boolean
  /** Open Graph — caem para title/description/imagem padrão quando ausentes. */
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  twitterCard?: 'summary' | 'summary_large_image'
  /** Blocos JSON-LD já montados (ver `structuredDataBuilders.ts`). */
  jsonLd?: Array<JsonLd | null | undefined>
}

const Seo = ({
  title,
  description,
  canonicalPath,
  noindex,
  nofollow,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  jsonLd
}: SeoProps) => {
  // Proteção temporária de indexação do ambiente de desenvolvimento —
  // remover somente no cut-over para produção (ver src/config/site.ts).
  const blockedByEnvironment = isPreviewEnvironment()
  const robots =
    blockedByEnvironment || (noindex && nofollow)
      ? 'noindex,nofollow'
      : noindex
        ? 'noindex,follow'
        : 'index,follow'

  const canonical = canonicalPath ? buildCanonical(canonicalPath) : undefined
  const socialTitle = ogTitle ?? title
  const socialDescription = ogDescription ?? description
  const socialImage = ogImage ? toAbsoluteUrl(ogImage) : DEFAULT_OG_IMAGE
  const schemas = (jsonLd ?? []).filter(Boolean) as JsonLd[]

  return (
    <Helmet>
      {title ? <title>{title}</title> : null}
      {description ? <meta name="description" content={description} /> : null}
      {robots ? <meta name="robots" content={robots} /> : null}
      {canonical ? <link rel="canonical" href={canonical} /> : null}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:type" content={ogType} />
      {socialTitle ? <meta property="og:title" content={socialTitle} /> : null}
      {socialDescription ? <meta property="og:description" content={socialDescription} /> : null}
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:image" content={socialImage} />

      {/* Twitter Cards (sem @username — o projeto não declara perfil no X). */}
      <meta name="twitter:card" content={twitterCard} />
      {socialTitle ? <meta name="twitter:title" content={socialTitle} /> : null}
      {socialDescription ? <meta name="twitter:description" content={socialDescription} /> : null}
      <meta name="twitter:image" content={socialImage} />

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}

export default Seo
