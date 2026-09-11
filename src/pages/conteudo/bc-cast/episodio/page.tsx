import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { PageHeader, RelatedLinks } from '@/components'
import {
  ContentBody,
  ContentCta,
  ContentSection,
  EditorialLayout,
  RelatedContent
} from '@/components/Content'
import StructuredData from '@/components/Seo/StructuredData'
import { videoObjectSchema } from '@/components/Seo/structuredDataBuilders'
import YouTubeEmbed from '@/components/YouTubeEmbed/YouTubeEmbed'
import { CLUSTERS } from '@/data/content/clusters'
import { getArticle } from '@/data/content/articles'
import { getEpisode, getEpisodeLabel } from '@/data/content/episodes'
import { trackContentEngagement } from '@/lib/analytics'

/**
 * Template de episódio do BC Cast — /conteudo/bc-cast/:slug
 *
 * H1 = título do episódio (único, no PageHeader). O vídeo usa o facade
 * YouTubeEmbed: nenhum iframe é carregado antes da interação do usuário.
 *
 * Convidados, temas e transcrição só aparecem quando existem nos dados reais.
 * VideoObject é emitido SOMENTE com name, description, thumbnail, uploadDate e
 * embedUrl reais — hoje os episódios não têm uploadDate/descrição oficiais,
 * então o schema fica ausente por decisão (nada é inventado).
 *
 * Indexação: noindex,follow até liberação (src/config/meta-content.ts).
 */
const Episodio = () => {
  const { slug } = useParams<{ slug: string }>()
  const episode = getEpisode(slug)

  useEffect(() => {
    if (episode) {
      trackContentEngagement({ content_type: 'bc_cast_episode', content_id: episode.slug })
    }
  }, [episode])

  if (!episode) return <Navigate to="/conteudo/bc-cast" replace />

  const label = getEpisodeLabel(episode)
  const cluster = episode.cluster ? CLUSTERS[episode.cluster] : null
  const cta = episode.cta ?? cluster?.cta
  const relatedArticles = (episode.relatedArticles ?? [])
    .map((articleSlug) => getArticle(articleSlug))
    .filter((article): article is NonNullable<typeof article> => Boolean(article))

  return (
    <>
      <PageHeader
        align="left"
        eyebrow="BC Cast"
        title={label}
        description={episode.excerpt}
        category="BC Cast"
        bgImage="/img/pages/contact.webp"
      />

      <StructuredData
        schemas={[
          videoObjectSchema({
            name: label,
            description: episode.excerpt,
            thumbnailUrl: undefined,
            uploadDate: episode.uploadDate,
            embedUrl: episode.embedUrl,
            duration: episode.duration
          })
        ]}
      />

      {/* Macrobloco do episódio: player protagonista + ficha editorial */}
      <ContentSection>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <YouTubeEmbed
              url={episode.embedUrl}
              title={label}
              className="w-full overflow-hidden rounded-[10px]"
            />
          </div>

          <div className="lg:col-span-5">
            {episode.guests?.length ? (
              <div>
                <h2 className="t-eyebrow text-bc-primary">Convidados</h2>
                <ul className="mt-4 border-t border-border-subtle">
                  {episode.guests.map((guest) => (
                    <li key={guest.name} className="border-b border-border-subtle py-4">
                      <span className="block t-h4-display text-text-primary">
                        {guest.name}
                      </span>
                      {guest.role ? (
                        <span className="mt-1 block t-body-sm text-text-secondary">
                          {guest.role}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {episode.topics?.length ? (
              <div className={episode.guests?.length ? 'mt-10' : ''}>
                <h2 className="t-eyebrow text-bc-primary">Temas do episódio</h2>
                <ul className="mt-4 border-t border-border-subtle">
                  {episode.topics.map((topic) => (
                    <li
                      key={topic}
                      className="border-b border-border-subtle py-3 t-body-sm text-text-secondary"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </ContentSection>

      <EditorialLayout tone="muted" className="flex flex-col gap-10">
        {episode.transcript?.length ? (
          <div>
            <h2 className="t-h3 text-text-primary">Transcrição</h2>
            <div className="mt-3">
              <ContentBody blocks={episode.transcript} />
            </div>
          </div>
        ) : null}

        {cta && (
          <ContentCta
            heading="Próximo passo"
            label={cta.label}
            href={cta.href}
            ctaName={`bc-cast-${episode.slug}`}
          />
        )}
      </EditorialLayout>

      <RelatedContent
        title="Leia sobre o tema"
        articles={relatedArticles.map((article) => ({
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          publishedAt: article.publishedAt,
          topic: CLUSTERS[article.cluster]?.name
        }))}
      />

      <RelatedLinks
        title="Soluções relacionadas a este episódio"
        items={[
          ...(episode.solutionPath
            ? [{ label: cluster?.cta.label ?? 'Conheça a solução', href: episode.solutionPath }]
            : []),
          ...(episode.segmentPaths ?? []).map((path) => ({
            label: `Soluções de energia para ${path.split('/').pop()?.replace(/-/g, ' ')}`,
            href: path
          })),
          { label: 'Ver todos os episódios do BC Cast', href: '/conteudo/bc-cast' }
        ]}
      />
    </>
  )
}

export default Episodio
