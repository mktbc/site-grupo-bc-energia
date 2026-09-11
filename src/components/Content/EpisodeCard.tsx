import Badge from '@/components/Badge/Badge'
import Card from '@/components/Card/Card'
import Image from '@/components/Image'
import Link from '@/components/Link'

/**
 * Card de episódio do BC Cast.
 *
 * Orientado a vídeo: thumbnail 16:9 com marcador de play, badge "BC Cast" e
 * nome do convidado real. Compartilha os tokens do Card do Design System com
 * o ArticleCard, mas não é o mesmo objeto visual — artigo é texto, episódio é
 * vídeo.
 *
 * A thumbnail é a imagem estática do YouTube (lazy, com width/height) — o
 * iframe só é carregado na página do episódio, após interação (facade).
 */
export type EpisodeCardProps = {
  href: string
  title: string
  excerpt?: string
  /** URL de embed do YouTube — usada apenas para derivar a thumbnail. */
  embedUrl?: string
  /** Nome dos convidados reais, já formatado. */
  guests?: string
  featured?: boolean
  as?: 'h2' | 'h3'
}

const getVideoId = (url?: string) => url?.match(/\/embed\/([^?&/]+)/)?.[1] ?? ''

const EpisodeCard = ({
  href,
  title,
  excerpt,
  embedUrl,
  guests,
  featured = false,
  as: Heading = 'h3'
}: EpisodeCardProps) => {
  const videoId = getVideoId(embedUrl)

  return (
    <Card
      as="article"
      interactive
      padding="none"
      className={`h-full overflow-hidden ${featured ? 'lg:flex-row' : ''}`}
    >
      {videoId ? (
        <div className={`relative bg-bc-dark ${featured ? 'lg:w-3/5 lg:shrink-0' : ''}`}>
          <Image
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt={`Miniatura do vídeo: ${title}`}
            width={480}
            height={360}
            loading="lazy"
            decoding="async"
            className="aspect-video w-full object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-12 w-16 items-center justify-center rounded-lg bg-bc-dark/75">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-3 p-6">
        <Badge variant="dark" size="sm" className="self-start">
          BC Cast
        </Badge>

        <Heading className={featured ? 't-h3 text-text-primary' : 't-h5 text-text-primary'}>
          <Link
            href={href}
            className="rounded-sm underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-bc-primary"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            {title}
          </Link>
        </Heading>

        {excerpt ? <p className="t-body text-text-secondary">{excerpt}</p> : null}

        {guests ? (
          <p className="mt-auto text-caption text-text-secondary">Convidado: {guests}</p>
        ) : null}
      </div>
    </Card>
  )
}

export default EpisodeCard
