import type { CSSProperties, ImgHTMLAttributes } from 'react'

/**
 * Substituto (shim) de `next/image` para React + Vite.
 *
 * Mantém a mesma API usada no projeto (src, alt, width, height, fill, priority…)
 * e renderiza um `<img>` nativo. As props que antes eram apenas absorvidas
 * agora têm efeito real quando fazem sentido em React/Vite:
 *
 * - `priority` → `loading="eager"` + `fetchpriority="high"`
 * - `sizes` / `srcSet` → responsive images nativas
 * - `quality` / `placeholder` → sem efeito em runtime (a otimização é feita em
 *   build/asset); permanecem apenas por compatibilidade de API e NÃO são
 *   repassadas ao DOM.
 */
export type ImageProps = {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  fill?: boolean
  priority?: boolean
  /** Sem efeito em runtime — otimização é feita nos assets. Mantido por compatibilidade. */
  quality?: number
  sizes?: string
  srcSet?: string
  /** Sem efeito em runtime. Mantido por compatibilidade. */
  placeholder?: string
  className?: string
  style?: CSSProperties
} & Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'width' | 'height' | 'placeholder' | 'sizes' | 'srcSet'
>

const Image = ({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  quality,
  sizes,
  srcSet,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  placeholder,
  className,
  style,
  loading,
  decoding,
  ...rest
}: ImageProps) => {
  const fillStyle: CSSProperties = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }
    : {}

  return (
    <img
      src={src}
      alt={alt}
      srcSet={srcSet}
      sizes={srcSet ? (sizes ?? '100vw') : undefined}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={loading ?? (priority ? 'eager' : 'lazy')}
      decoding={decoding ?? (priority ? 'sync' : 'async')}
      // React 18 não reconhece `fetchPriority` camelCase; atributo em lowercase.
      {...(priority ? { fetchpriority: 'high' } : {})}
      className={className}
      style={{ ...fillStyle, ...style }}
      {...rest}
    />
  )
}

export default Image
