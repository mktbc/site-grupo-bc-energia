import Card from '@/components/Card/Card'
import Image from '@/components/Image'
import Link from '@/components/Link'

/**
 * Card de artigo do Blog.
 *
 * Só renderiza o que existe de verdade: imagem, tema e data são opcionais e
 * simplesmente não aparecem quando o dado não existe (nada de placeholder).
 * Visualmente é uma superfície clara e textual — diferente do EpisodeCard,
 * que é orientado a vídeo.
 */
export type ArticleCardProps = {
  href: string
  title: string
  excerpt?: string
  /** Tema/cluster editorial real. */
  topic?: string
  /** Data ISO real de publicação. */
  publishedAt?: string
  image?: { src: string; alt: string; width?: number; height?: number }
  /** Variante de destaque: título maior e layout em duas colunas quando há imagem. */
  featured?: boolean
  /** Nível do heading do card (o H1 pertence à página). */
  as?: 'h2' | 'h3'
}

const formatDate = (iso: string) => {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(date)
}

const ArticleCard = ({
  href,
  title,
  excerpt,
  topic,
  publishedAt,
  image,
  featured = false,
  as: Heading = 'h3'
}: ArticleCardProps) => {
  const formatted = publishedAt ? formatDate(publishedAt) : null

  return (
    <Card
      as="article"
      interactive
      padding={featured ? 'lg' : 'md'}
      className={`h-full gap-3 ${featured ? 'lg:flex-row lg:items-center lg:gap-8' : ''}`}
    >
      {image ? (
        <div
          className={`overflow-hidden rounded-[10px] bg-surface-muted ${ featured ? 'lg:w-1/2 lg:shrink-0' : '' }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width ?? 800}
            height={image.height ?? 450}
            loading="lazy"
            decoding="async"
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-3">
        {topic ? <p className="t-eyebrow text-text-accent">{topic}</p> : null}

        <Heading className={featured ? 't-h3 text-text-primary' : 't-h5 text-text-primary'}>
          <Link
            href={href}
            className="rounded-sm underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-bc-primary"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            {title}
          </Link>
        </Heading>

        {excerpt ? (
          <p className={`text-text-secondary ${featured ? 't-body-lg' : 't-body'}`}>{excerpt}</p>
        ) : null}

        {formatted ? (
          <p className="mt-auto text-caption text-text-secondary">
            <time dateTime={publishedAt}>{formatted}</time>
          </p>
        ) : null}
      </div>
    </Card>
  )
}

export default ArticleCard
