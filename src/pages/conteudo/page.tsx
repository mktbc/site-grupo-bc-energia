import { PageHeader, RelatedLinks } from '@/components'
import { ContentFeature } from '@/components/Content'
import Link from '@/components/Link'
import { getArticles } from '@/data/content/articles'
import { CLUSTERS, CLUSTER_LIST, clusterCta } from '@/data/content/clusters'
import { getEpisodeLabel, getEpisodes } from '@/data/content/episodes'
import { CONTENT_GRAPHIC } from '@/config/brandGraphics'

/**
 * Hub de Conteúdo — /conteudo (VISUAL 15)
 *
 * O volume editorial real é pequeno (poucos episódios e artigos). Em vez de um
 * portal de cards meio vazio, a página tem um conteúdo protagonista bem
 * resolvido e os demais conteúdos reais em lista editorial, mais os acessos a
 * Blog e BC Cast como links — não como cards.
 *
 * Nada é inventado: se não houver conteúdo, o bloco não é renderizado.
 * Indexação inalterada: noindex,follow (src/config/meta-content.ts).
 */
const shortLabel = (number?: number) =>
  number ? `BC Cast #${String(number).padStart(2, '0')}` : 'BC Cast'

/** Descrições já publicadas nos heros de /conteudo/blog e /conteudo/bc-cast. */
const AREA_DESCRIPTION = {
  blog: 'Conteúdos sobre mercado livre de energia, geração distribuída, gestão de energia e redução de custo na conta de luz.',
  cast: 'Conversas do Grupo BC Energia com lideranças sobre energia, mercado e desenvolvimento econômico.'
}

const Page = () => {
  const articles = getArticles()
  const episodes = getEpisodes()

  const [featuredEpisode, ...restEpisodes] = episodes
  const [featuredArticle, ...restArticles] = articles

  // Protagonista: o episódio mais recente (vídeo dá mais presença ao bloco).
  // Sem episódios, o artigo mais recente assume o papel.
  const feature = featuredEpisode
    ? {
        kind: shortLabel(featuredEpisode.number),
        title: featuredEpisode.title,
        description: featuredEpisode.excerpt,
        meta: featuredEpisode.guests?.length
          ? `Com ${featuredEpisode.guests.map((guest) => guest.name).join(', ')}`
          : undefined,
        href: `/conteudo/bc-cast/${featuredEpisode.slug}`,
        ctaLabel: 'Ver episódio',
        tracking: `conteudo_destaque_${featuredEpisode.slug}`,
        media: {
          kind: 'video' as const,
          embedUrl: featuredEpisode.embedUrl,
          title: getEpisodeLabel(featuredEpisode)
        }
      }
    : featuredArticle
      ? {
          kind: CLUSTERS[featuredArticle.cluster]?.name ?? 'Artigo',
          title: featuredArticle.title,
          description: featuredArticle.excerpt,
          href: `/conteudo/blog/${featuredArticle.slug}`,
          ctaLabel: 'Ler artigo',
          tracking: `conteudo_destaque_${featuredArticle.slug}`,
          media: featuredArticle.image
            ? {
                kind: 'image' as const,
                src: featuredArticle.image.src,
                alt: featuredArticle.image.alt,
                width: featuredArticle.image.width,
                height: featuredArticle.image.height
              }
            : undefined
        }
      : undefined

  const items = [
    ...restEpisodes.map((episode) => ({
      key: `ep-${episode.slug}`,
      kind: shortLabel(episode.number),
      title: episode.title,
      description: episode.excerpt,
      href: `/conteudo/bc-cast/${episode.slug}`,
      tracking: `conteudo_lista_${episode.slug}`
    })),
    ...(featuredEpisode ? articles : restArticles).map((article) => ({
      key: `art-${article.slug}`,
      kind: CLUSTERS[article.cluster]?.name ?? 'Artigo',
      title: article.title,
      description: article.excerpt,
      href: `/conteudo/blog/${article.slug}`,
      tracking: `conteudo_lista_${article.slug}`
    }))
  ]

  /**
   * Entradas temáticas (§25 do briefing de clusters). Cada tema aponta para a
   * página pilar real e usa o CTA de baixa intenção do cluster. A contagem de
   * conteúdos é calculada a partir do que existe de fato — nunca estimada.
   */
  const themeEntries = CLUSTER_LIST.map((cluster) => {
    const count =
      articles.filter((article) => article.cluster === cluster.id).length +
      episodes.filter((episode) => episode.cluster === cluster.id).length
    const cta = clusterCta(cluster, 'baixa')
    return {
      priority: Boolean(cluster.priority),
      count,
      label: cta.label,
      href: cta.href,
      description:
        count > 0
          ? `${cluster.description} ${count} ${count === 1 ? 'conteúdo publicado' : 'conteúdos publicados'}.`
          : cluster.description
    }
  })

  const themes = themeEntries
    .slice()
    .sort(
      (a, b) =>
        (b.count > 0 ? 2 : 0) + (b.priority ? 1 : 0) - ((a.count > 0 ? 2 : 0) + (a.priority ? 1 : 0))
    )
    .map(({ label, href, description }) => ({ label, href, description }))




  const areaLink =
    'group flex min-h-[44px] items-center justify-between gap-6 border-b border-border-subtle py-4 text-text-primary transition-colors duration-200 ease-bc hover:text-bc-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 motion-reduce:transition-none'

  return (
    <div>
      <PageHeader
        align="left"
        title="Conteúdo"
        description="Materiais do Grupo BC Energia para entender o setor elétrico e tomar melhores decisões de energia."
        bgImage="/img/pages/contact.webp"
        category="Conteúdo"
      />

      {feature ? (
        <ContentFeature
          graphic={CONTENT_GRAPHIC.hubFeature}
          eyebrow="Em destaque"
          title="O mais recente"
          feature={feature}
          items={items}
          listTitle={items.length > 0 ? 'Também disponível' : undefined}
        >
          <div className={items.length > 0 ? 'mt-10' : ''}>
            <p className="t-eyebrow text-bc-primary">Áreas</p>
            <ul className="mt-3 flex flex-col">
              <li>
                <Link href="/conteudo/blog" data-cta-name="conteudo_area_blog" className={areaLink}>
                  <span className="flex flex-col">
                    <span className="t-h4-display">Blog</span>
                    <span className="mt-1 t-body-sm text-text-secondary">{AREA_DESCRIPTION.blog}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transform-none"
                  >
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/conteudo/bc-cast"
                  data-cta-name="conteudo_area_bc_cast"
                  className={areaLink}
                >
                  <span className="flex flex-col">
                    <span className="t-h4-display">BC Cast</span>
                    <span className="mt-1 t-body-sm text-text-secondary">{AREA_DESCRIPTION.cast}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transform-none"
                  >
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </ContentFeature>
      ) : null}

      <RelatedLinks
        variant="index"
        eyebrow="Temas"
        title="Temas que organizam o conteúdo"
        description="Cada tema editorial aprofunda uma solução real do Grupo BC Energia. Os temas prioritários aparecem primeiro; a contagem reflete apenas conteúdos já publicados."
        items={themes}
      />

    </div>
  )
}

export default Page
