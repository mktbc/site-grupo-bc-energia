import { useEffect, useRef } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { PageHeader, RelatedLinks } from '@/components'
import {
  ArticleToc,
  ContentBody,
  ContentCta as ContentCtaBlock,
  EditorialLayout,
  RelatedContent
} from '@/components/Content'
import StructuredData from '@/components/Seo/StructuredData'
import { articleSchema, faqSchema } from '@/components/Seo/structuredDataBuilders'
import { CLUSTERS } from '@/data/content/clusters'
import type { ContentCta } from '@/data/content/types'
import { getArticle } from '@/data/content/articles'
import { getToc } from '@/data/content/toc'
import { getEpisodeLabel } from '@/data/content/episodes'
import { getCommercialLinks, getRelatedArticles, getRelatedEpisodes } from '@/data/content/related'
import { trackContentCtaClick, trackContentView } from '@/lib/analytics'

/**
 * Template de artigo do Blog — /conteudo/blog/:slug
 *
 * H1 = título do artigo (único, no PageHeader). Corpo em blocos tipados
 * (H2/H3) dentro da coluna de leitura padrão (EditorialLayout, ~72ch).
 *
 * Metadados (data, autor, revisor, fontes) só aparecem quando existem de
 * verdade nos dados — nada é inventado. JSON-LD Article só é emitido com
 * datePublished real; FAQPage só quando a FAQ está visível na página.
 *
 * Indexação: noindex,follow até liberação (src/config/meta-content.ts).
 */
/**
 * Hero por tema quando o artigo não tem imagem própria (fotos já existentes).
 * Evita a foto genérica de contato, repetida em 7 páginas. Não altera os
 * dados do artigo nem o JSON-LD (que só usa `article.image`).
 */
const CLUSTER_HERO: Record<string, string> = {
  'geracao-distribuida': '/img/global/energia-por-assinatura.webp',
  'mercado-livre': '/img/global/mercado-livre-de-energia.webp',
  'gestao-de-energia': '/img/pages/gestao-de-energia-hero.webp',
  'usinas-arrendamento': '/img/global/arrendamento-de-usinas.webp'
}

const Artigo = () => {
  const { slug } = useParams<{ slug: string }>()
  const article = getArticle(slug)

  const viewed = useRef<string | null>(null)

  useEffect(() => {
    if (article && viewed.current !== article.slug) {
      viewed.current = article.slug
      trackContentView({
        content_type: 'blog',
        content_slug: article.slug,
        content_cluster: article.cluster,
        page_path: `/conteudo/blog/${article.slug}`
      })
    }
  }, [article])

  if (!article) return <Navigate to="/conteudo/blog" replace />

  const cluster = CLUSTERS[article.cluster]
  const cta: ContentCta | undefined = article.cta ?? cluster?.cta
  const relatedArticles = getRelatedArticles(article)
  const relatedEpisodes = getRelatedEpisodes(article)
  const commercialLinks = getCommercialLinks(article)
  const path = `/conteudo/blog/${article.slug}`
  const FAQ_ID = 'perguntas-frequentes'
  // Sumário: H2 reais do corpo + a seção de FAQ, quando visível.
  const toc = [
    ...getToc(article.body),
    ...(article.faq?.length ? [{ id: FAQ_ID, text: 'Perguntas frequentes' }] : [])
  ]

  const publishedLabel = article.publishedAt
    ? new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(article.publishedAt))
    : null

  return (
    <>
      <PageHeader
        align="left"
        eyebrow={cluster?.name}
        title={article.title}
        description={article.excerpt}
        category="Blog"
        bgImage={article.image?.src ?? CLUSTER_HERO[article.cluster] ?? '/img/pages/contact.webp'}
      />

      <StructuredData
        schemas={[
          articleSchema({
            headline: article.title,
            description: article.description ?? article.excerpt,
            path,
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            authorName: article.author?.name,
            imageUrl: article.image?.src
          }),
          article.faq?.length
            ? faqSchema(article.faq.map((item) => ({ title: item.question, content: item.answer })))
            : null
        ]}
      />

      <EditorialLayout aside={<ArticleToc items={toc} />}>
        {(publishedLabel || article.author) && (
          <p className="mb-8 text-caption text-text-secondary">
            {publishedLabel && (
              <time dateTime={article.publishedAt}>Publicado em {publishedLabel}</time>
            )}
            {publishedLabel && article.author ? ' · ' : ''}
            {article.author && (
              <span>
                Por {article.author.name}
                {article.author.role ? `, ${article.author.role}` : ''}
              </span>
            )}
            {article.reviewer && <span> · Revisão técnica: {article.reviewer.name}</span>}
          </p>
        )}

        <ContentBody blocks={article.body} ctaName={`blog-${article.slug}`} />

        {article.faq?.length ? (
          <div className="mt-14">
            <h2 id={FAQ_ID} className="scroll-mt-28 t-h3 text-text-primary">
              Perguntas frequentes
            </h2>
            <dl className="mt-6 border-t border-border-subtle">
              {article.faq.map((item) => (
                <div key={item.question} className="border-b border-border-subtle py-6">
                  <dt className="t-h4-display text-text-primary">
                    {item.question}
                  </dt>
                  <dd className="mt-3 t-body text-text-secondary">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        {article.sources?.length ? (
          <div className="mt-12">
            <h2 className="t-h4 mb-3 text-text-primary">Fontes</h2>
            <ul className="flex list-disc flex-col gap-2 pl-6 text-text-secondary">
              {article.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm font-medium text-text-accent underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-bc-primary"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {cta && (
          <ContentCtaBlock
            heading={cta.heading ?? 'Próximo passo'}
            description={cta.description}
            label={cta.label}
            href={cta.href}
            ctaName={`blog-${article.slug}`}
            onClick={() =>
              trackContentCtaClick({
                content_type: 'blog',
                content_slug: article.slug,
                content_cluster: article.cluster,
                page_path: path,
                cta_name: `blog-${article.slug}`,
                cta_location: 'content_section',
                link_url: cta.href
              })
            }
          />
        )}
      </EditorialLayout>

      {commercialLinks.length > 0 && (
        <RelatedLinks title="Soluções relacionadas a este conteúdo" items={commercialLinks} />
      )}

      <RelatedContent
        title="Continue lendo e ouvindo"
        articles={relatedArticles.map((item) => ({
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt,
          publishedAt: item.publishedAt,
          topic: CLUSTERS[item.cluster]?.name
        }))}
        episodes={relatedEpisodes.map((episode) => ({
          slug: episode.slug,
          title: getEpisodeLabel(episode),
          excerpt: episode.excerpt,
          embedUrl: episode.embedUrl,
          guests: episode.guests?.map((guest) => guest.name).join(', ')
        }))}
      />
    </>
  )
}

export default Artigo
