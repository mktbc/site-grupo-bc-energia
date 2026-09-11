import { useState } from 'react'

export type YouTubeEmbedProps = {
  /** URL de embed do YouTube (https://www.youtube.com/embed/ID?...) */
  url: string
  /** Título acessível do vídeo */
  title: string
  className?: string
  /** Altura do player (mesma API dos iframes antigos) */
  height?: number | string
  /** Thumbnail alternativa (ex.: vertical, para YouTube Shorts) */
  thumbnailSrc?: string
}

const getVideoId = (url: string) => {
  const match = url.match(/\/embed\/([^?&/]+)/)
  return match?.[1] ?? ''
}

const withAutoplay = (url: string) => (url.includes('?') ? `${url}&autoplay=1` : `${url}?autoplay=1`)

/**
 * Facade de YouTube: renderiza apenas a thumbnail + botão de play e só carrega
 * o iframe (≈1 MB de JS de terceiros) após a interação do usuário.
 * Mantém a mesma URL de vídeo e a mesma área visual do iframe original,
 * evitando CLS e reduzindo o custo de scripts de terceiros no carregamento.
 */
const YouTubeEmbed = ({
  url,
  title,
  className = '',
  height = 400,
  thumbnailSrc
}: YouTubeEmbedProps) => {
  const [active, setActive] = useState(false)
  const id = getVideoId(url)

  if (active) {
    return (
      <iframe
        className={className}
        width="100%"
        height={height}
        src={withAutoplay(url)}
        title={title}
        loading="lazy"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Reproduzir vídeo: ${title}`}
      className={`group relative block w-full overflow-hidden bg-surface-dark ${className}`}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      <img
        src={thumbnailSrc ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        width={480}
        height={360}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-24 items-center justify-center rounded-xl bg-surface-dark/70 transition-colors group-hover:bg-red-600">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  )
}

export default YouTubeEmbed
