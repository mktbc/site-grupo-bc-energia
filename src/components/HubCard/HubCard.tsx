import { BCIcon } from '@/components/BCIcon'
import Image from '@/components/Image'
import Link from '@/components/Link'

import { HubCardProps } from './HubCard.type'

/**
 * Card de navegação dos hubs (/produtos, /segmentos, /sobre, /conteudo).
 *
 * O card INTEIRO é o link (`<Link>` do react-router via shim), sem link
 * aninhado e sem `div onClick`. O clique é capturado pela delegação central de
 * tracking (`useClickTracking`) através de `data-cta-name` — nenhum push
 * direto no dataLayer aqui.
 */
const HubCard = ({
  title,
  description,
  href,
  eyebrow,
  ariaLabel,
  accent,
  icon,
  iconSrc,
  external,
  trackingLabel,
  ctaLabel = 'Conhecer',
  size = 'default'
}: HubCardProps) => {
  const iconSize = size === 'large' ? 56 : 48

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      data-cta-name={trackingLabel ?? title}
      className={[
        'group relative flex h-full flex-col rounded-[10px] border border-border-subtle bg-surface-card shadow-sm',
        'transition-[transform,border-color,background-color,box-shadow] duration-200 ease-out',
        'hover:-translate-y-[2px] hover:border-bc-primary/25 hover:shadow-md',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
        'focus-visible:-translate-y-[2px]',
        'motion-reduce:transform-none motion-reduce:transition-none',
        // Card vive em superfície clara: o acento usa a cor institucional,
        // nunca amarelo (reservado a CTA e fundo escuro).
        accent ? 'border-l-2 border-l-bc-primary' : '',
        size === 'large' ? 'p-8 lg:p-10' : 'p-7'
      ].join(' ')}
    >
      {icon || iconSrc ? (
        <span aria-hidden="true" className="mb-5 inline-flex items-center">
          {icon ? (
            <BCIcon name={icon} size={iconSize} />
          ) : (
            <Image src={iconSrc as string} alt="" aria-hidden="true" width={iconSize} height={iconSize} />
          )}
        </span>
      ) : null}

      {eyebrow ? (
        <span className="mb-2 t-eyebrow tracking-[0.14em] text-bc-primary">
          {eyebrow}
        </span>
      ) : null}

      <h3
        className={[
          'font-display uppercase leading-snug tracking-[0.005em] text-bc-dark',
          size === 'large' ? 't-h3' : 't-h4-display'
        ].join(' ')}
      >
        {title}
      </h3>


      {description ? (
        <p
          className={[
            'mt-3 text-text-secondary',
            size === 'large' ? 't-body' : 't-body-sm'
          ].join(' ')}
        >
          {description}
        </p>
      ) : null}

      <span className="mt-auto flex items-center justify-between gap-3 pt-8">
        <span className="t-action-label text-bc-primary">
          {ctaLabel}
        </span>
        <span
          aria-hidden="true"
          className="shrink-0 text-bc-primary transition-transform duration-200 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
        >
          →
        </span>
      </span>
    </Link>
  )
}

export default HubCard
