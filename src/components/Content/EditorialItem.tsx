import Image from '@/components/Image'
import Link from '@/components/Link'

/**
 * Item editorial de listagem (Blog / BC Cast / relacionados).
 *
 * Substitui os cards de conteúdo: sem superfície própria, sem borda, sem
 * sombra e sem badges. A separação é feita por espaço, filete discreto e
 * tipografia. Metadados aparecem em uma única linha editorial
 * (ex.: "ARTIGO · ENERGIA RENOVÁVEL · 12 ago. 2026") e só quando existem.
 */
export type EditorialItemProps = {
  href: string
  title: string
  excerpt?: string
  /** Metadados reais, já formatados. Valores vazios são ignorados. */
  meta?: Array<string | undefined | null>
  /** Miniatura opcional (16:9). Arquivo/lista pode não ter imagem. */
  image?: { src: string; alt: string; width?: number; height?: number }
  tracking?: string
  as?: 'h2' | 'h3' | 'h4'
  tone?: 'light' | 'dark'
}

const EditorialItem = ({
  href,
  title,
  excerpt,
  meta = [],
  image,
  tracking,
  as: Heading = 'h3',
  tone = 'light'
}: EditorialItemProps) => {
  const isDark = tone === 'dark'
  const metaLine = meta.filter(Boolean).join(' · ')

  return (
    <article className="group">
      <Link
        href={href}
        data-cta-name={tracking}
        className="flex items-start gap-5 py-6 outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
      >
        {image ? (
          <span className="hidden w-[140px] shrink-0 overflow-hidden rounded-[10px] bg-surface-muted sm:block lg:w-[180px]">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width ?? 480}
              height={image.height ?? 270}
              loading="lazy"
              decoding="async"
              sizes="180px"
              className="aspect-video w-full object-cover transition-transform duration-300 ease-bc group-hover:scale-[1.02] motion-reduce:transform-none"
            />
          </span>
        ) : null}

        <span className="min-w-0 flex-1">
          {metaLine ? (
            <span
              className={`t-eyebrow block ${isDark ? 'text-bc-cyan' : 'text-bc-primary'}`}
            >
              {metaLine}
            </span>
          ) : null}

          <Heading
            className={`mt-2 t-h4-display transition-colors duration-200 ease-bc ${
              isDark
                ? 'text-text-inverse group-hover:text-bc-cyan'
                : 'text-text-primary group-hover:text-bc-primary'
            } motion-reduce:transition-none`}
          >
            {title}
          </Heading>

          {excerpt ? (
            <span
              className={`mt-2 block max-w-[64ch] t-body-sm leading-[1.55] ${
                isDark ? 'text-text-inverse/70' : 'text-text-secondary'
              }`}
            >
              {excerpt}
            </span>
          ) : null}
        </span>

        <span
          aria-hidden="true"
          className={`shrink-0 pt-1 transition-transform duration-200 ease-out group-hover:translate-x-[3px] ${
            isDark ? 'text-bc-cyan' : 'text-bc-primary'
          } motion-reduce:transform-none motion-reduce:transition-none`}
        >
          →
        </span>
      </Link>
    </article>
  )
}

export default EditorialItem
