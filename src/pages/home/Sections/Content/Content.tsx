import { Container } from '@/components'
import BrandGraphic from '@/components/BrandGraphic/BrandGraphic'
import ArticleCard from '@/components/Content/ArticleCard'
import Image from '@/components/Image'
import Link from '@/components/Link'
import Reveal from '@/components/Reveal/Reveal'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import { getArticles } from '@/data/content/articles'
import { getEpisodes, getEpisodeLabel } from '@/data/content/episodes'

/**
 * Home — macrobloco editorial único (BC Cast + Conteúdo).
 *
 * Antes eram duas seções (BC Cast escura + Artigos clara). Agora existe um só
 * bloco: um conteúdo protagonista (episódio mais recente, com o facade do
 * YouTube — nenhum iframe no load inicial) e os demais conteúdos reais
 * (episódios + artigos) como lista editorial. Nada é inventado: se a fonte
 * estiver vazia, a seção não é renderizada. Rotas editoriais seguem noindex,
 * com links normais.
 */

const episodeLabel = (number?: number) =>
  number ? `BC Cast #${String(number).padStart(2, '0')}` : 'BC Cast'

const getVideoId = (url: string) => url.match(/\/embed\/([^?&/]+)/)?.[1] ?? ''

const Content = () => {
  const episodes = getEpisodes()
  const articles = getArticles()
  if (!episodes.length && !articles.length) return null

  const [featured, ...restEpisodes] = episodes

  /* Artigos têm grid próprio abaixo — a lista lateral traz só episódios. */
  const secondary = [
    ...restEpisodes.map((episode) => ({
      key: `ep-${episode.slug}`,
      kind: episodeLabel(episode.number),
      title: episode.title,
      description: episode.guests?.length
        ? `Com ${episode.guests.map((guest) => guest.name).join(', ')}`
        : undefined,
      href: `/conteudo/bc-cast/${episode.slug}`,
      thumbnail: `https://i.ytimg.com/vi/${getVideoId(episode.embedUrl)}/hqdefault.jpg`,
      tracking: `home_conteudo_episodio_${episode.slug}`
    }))
  ]

  return (
    <section id="home_conteudo" className="relative overflow-hidden bc-level-mid bg-surface-muted text-text-primary lg:py-[56px]">
      {/* PRANCHETA 11 (chevrons) — progressão/navegação editorial. Lateral direita. */}
      <BrandGraphic variant="chevrons" tone="teal" density="micro" scale="small" className="right-[-3%] top-1/2 -translate-y-1/2" />
      <Container className="lg:max-w-[1240px]">
        <Reveal>
          <p className="t-eyebrow text-bc-primary">
            Conteúdo e autoridade
          </p>
          <h2 className="t-h2-mid mt-4 max-w-[22ch] text-text-primary">
            Conversas e análises sobre o mercado de energia
          </h2>
          <p className="mt-4 measure-intro font-sans t-body-sm text-text-secondary">
            Informação para ajudar empresas e consumidores a tomarem decisões mais estratégicas.
          </p>
        </Reveal>

        <div className="mt-5 grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-12 lg:gap-7">
          {/* Protagonista */}
          {featured ? (
            <Reveal className="lg:col-span-7">
              <article className="group relative overflow-hidden rounded-card border border-border-subtle bg-surface p-3 shadow-sm transition-[transform,box-shadow,border-color] duration-normal ease-bc hover:-translate-y-0.5 hover:border-bc-primary/30 hover:shadow-card md:p-4 lg:p-5 motion-reduce:transform-none motion-reduce:transition-none">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-surface-dark [&_button]:cursor-pointer [&_button]:transition-[box-shadow,border-color] [&_button]:duration-200 [&_button]:ease-bc [&_button:hover]:shadow-sm [&_img]:transition-transform [&_img]:duration-500 [&_img]:ease-bc [&_img:hover]:scale-[1.025] [&_span_span]:bg-bc-dark/80 [&_span_span]:shadow-sm [&_span_span]:transition-transform [&_span_span]:duration-200 [&_span_span]:ease-bc [&_button:hover_span_span]:scale-[1.04] [&_button:hover_span_span]:bg-bc-primary motion-reduce:[&_img]:transform-none motion-reduce:[&_img]:transition-none motion-reduce:[&_span_span]:transform-none motion-reduce:[&_span_span]:transition-none">
                <YouTubeEmbed
                  className="h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
                  height="100%"
                  url={featured.embedUrl}
                  title={getEpisodeLabel(featured)}
                />
              </div>

              <p className="mt-4 t-eyebrow text-bc-primary">
                {episodeLabel(featured.number)}
              </p>
              <h3 className="t-h3 mt-2.5 max-w-[28ch] text-text-primary">
                {featured.title}
              </h3>
              {featured.guests?.length ? (
                <p className="mt-3 max-w-[54ch] font-sans t-body-sm text-text-secondary">
                  Com {featured.guests.map((guest) => guest.name).join(', ')}
                  {featured.guests[0]?.role ? `, ${featured.guests[0].role}` : ''}
                </p>
              ) : null}

              <Link
                href={`/conteudo/bc-cast/${featured.slug}`}
                data-cta-name={`home_conteudo_destaque_${featured.slug}`}
                className="group mt-4 inline-flex min-h-[44px] items-center gap-2 t-action-label text-bc-primary transition-colors duration-200 ease-bc hover:text-bc-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-muted motion-reduce:transition-none"
              >
                Ver episódio
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
                >
                  →
                </span>
              </Link>
              </article>
            </Reveal>
          ) : null}

          {/* Lista editorial dos demais conteúdos reais */}
          <Reveal delay={0.06} className="lg:col-span-5">
            <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-1">
              {secondary.map((item) => (
                <li key={item.key} className="">
                  <Link
                    href={item.href}
                    data-cta-name={item.tracking}
                    className="group relative flex h-full gap-4 rounded-md border border-border-subtle bg-surface/65 p-3 transition-[transform,background-color,border-color,box-shadow] duration-200 ease-bc hover:-translate-y-0.5 hover:border-bc-primary/25 hover:bg-surface hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-muted motion-reduce:transform-none motion-reduce:transition-none sm:p-3.5"
                  >
                    <Image
                      src={item.thumbnail}
                      alt=""
                      aria-hidden="true"
                      width={144}
                      height={96}
                      loading="lazy"
                      decoding="async"
                      className="h-20 w-28 shrink-0 rounded-sm object-cover transition-transform duration-normal ease-bc group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none sm:h-24 sm:w-36"
                    />
                    <span className="flex min-w-0 flex-1 items-start justify-between gap-4">
                      <span className="min-w-0">
                        <span className="font-sans t-caption font-semibold tracking-[0.14em] text-bc-primary">
                          {item.kind}
                        </span>
                        <span className="mt-2 block t-h4-display text-text-primary transition-colors duration-200 group-hover:text-bc-dark motion-reduce:transition-none">
                          {item.title}
                        </span>
                        {item.description ? (
                          <span className="mt-2 block line-clamp-2 font-sans t-body-sm leading-[1.55] text-text-secondary">
                            {item.description}
                          </span>
                        ) : null}
                      </span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 pt-1 text-text-secondary transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {articles.length ? (
              <div className="mt-8">
                <div className="flex items-end justify-between gap-4">
                  <h3 className="t-h4-display text-text-primary">Últimos artigos do Blog</h3>
                  <Link
                    href="/conteudo/blog"
                    data-cta-name="home_conteudo_blog"
                    className="group inline-flex items-center gap-2 t-action-label text-bc-primary transition-colors duration-200 ease-bc hover:text-bc-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-muted motion-reduce:transition-none"
                  >
                    Ver todos
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-1">
                  {articles.slice(0, 2).map((article) => (
                    <ArticleCard
                      key={article.slug}
                      href={`/conteudo/blog/${article.slug}`}
                      title={article.title}
                      excerpt={article.excerpt}
                      topic="Blog"
                      publishedAt={article.publishedAt}
                      image={article.image}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-5">
              <Link
                href="/conteudo"
                data-cta-name="home_conteudo_explorar"
                className="group inline-flex items-center gap-2 t-action-label text-bc-primary transition-colors duration-200 ease-bc hover:text-bc-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-muted motion-reduce:transition-none"
              >
                Explorar conteúdos
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
                >
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>

      </Container>
    </section>
  )
}

export default Content
