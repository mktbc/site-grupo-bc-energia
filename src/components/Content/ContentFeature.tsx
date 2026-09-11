import { ReactNode } from 'react'

import Link from '@/components/Link'
import SectionHeader from '@/components/SectionHeader/SectionHeader'
import YouTubeEmbed from '@/components/YouTubeEmbed'

import ContentSection, { type ContentSectionTone } from './ContentSection'
import type { SectionGraphic } from '@/components/Product/ProductSection'

export type ContentFeatureMedia =
  | { kind: 'video'; embedUrl: string; title: string }
  | { kind: 'image'; src: string; alt: string; width?: number; height?: number }

export type ContentFeatureItem = {
  key: string
  /** Tipo do conteúdo: "Artigo", "BC Cast #02"... */
  kind?: string
  title: string
  description?: string
  href: string
  tracking?: string
}

export type ContentFeatureProps = {
  eyebrow?: string
  title?: ReactNode
  description?: ReactNode
  feature?: {
    kind?: string
    title: string
    description?: string
    meta?: string
    href: string
    ctaLabel?: string
    tracking?: string
    media?: ContentFeatureMedia
  }
  /** Lista editorial dos demais conteúdos reais (sem cards). */
  items?: Array<ContentFeatureItem>
  listTitle?: string
  listCta?: { label: string; href: string; tracking?: string }
  /** Nível do título do protagonista — H1 continua no PageHeader. */
  headingLevel?: 'h2' | 'h3'
  /** Elemento oficial de apoio da seção — VISUAL SYSTEM 02. */
  graphic?: SectionGraphic
  tone?: ContentSectionTone
  id?: string
  children?: ReactNode
}

/**
 * Macrobloco editorial: 1 conteúdo protagonista + lista dos demais (VISUAL 15).
 *
 * Substitui os grids de 2–3 colunas de cards das áreas de conteúdo. O volume
 * editorial real é pequeno (poucos artigos e episódios), então a arquitetura
 * favorece profundidade — um item bem resolvido — em vez de um portal vazio.
 * Nenhum item é inventado: o componente renderiza apenas o que recebe.
 *
 * Vídeo usa sempre o facade YouTubeEmbed — nenhum iframe no load.
 */
const ContentFeature = ({
  graphic = { variant: 'loops', tone: 'teal', size: 'small', position: 'top-right', opacity: 0.05 },
  eyebrow,
  title,
  description,
  feature,
  items = [],
  listTitle,
  listCta,
  headingLevel = 'h3',
  tone = 'surface',
  id,
  children
}: ContentFeatureProps) => {
  const isDark = tone === 'dark' || tone === 'brand'
  const FeatureHeading = headingLevel

  const ring = isDark
    ? 'focus-visible:ring-offset-bc-dark'
    : 'focus-visible:ring-offset-surface'
  const rule = isDark ? 'border-white/12' : 'border-border-subtle'
  const kindTone = isDark ? 'text-bc-cyan' : 'text-bc-primary'
  const titleTone = isDark ? 'text-text-inverse' : 'text-text-primary'
  const bodyTone = isDark ? 'text-text-inverse/70' : 'text-text-secondary'
  const hoverTone = isDark ? 'group-hover:text-bc-cyan' : 'group-hover:text-bc-primary'
  const arrowLink = `group inline-flex min-h-[44px] items-center gap-2 t-action-label transition-colors duration-200 ease-bc focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 ${ring} motion-reduce:transition-none`

  const hasSidebar = items.length > 0 || Boolean(listCta) || Boolean(children)

  return (
    <ContentSection graphic={graphic} tone={tone} id={id}>
      {(eyebrow || title || description) && (
        <div className={isDark ? '[&_h2]:text-text-inverse [&_p]:text-text-inverse/75' : ''}>
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        </div>
      )}

      <div
        className={`grid grid-cols-1 gap-8 lg:gap-10 ${ eyebrow || title ? 'mt-7' : '' } ${hasSidebar ? 'lg:grid-cols-12' : ''}`}
      >
        {feature ? (
          <article className={hasSidebar ? 'lg:col-span-7' : 'measure-body'}>
            {feature.media?.kind === 'video' ? (
              <div className="aspect-video w-full overflow-hidden rounded-[8px]">
                <YouTubeEmbed
                  className="h-full w-full"
                  height="100%"
                  url={feature.media.embedUrl}
                  title={feature.media.title}
                />
              </div>
            ) : null}

            {feature.media?.kind === 'image' ? (
              <img
                src={feature.media.src}
                alt={feature.media.alt}
                width={feature.media.width ?? 1200}
                height={feature.media.height ?? 675}
                sizes="(max-width: 1024px) 100vw, 58vw"
                loading="lazy"
                decoding="async"
                className="aspect-video w-full rounded-[8px] object-cover"
              />
            ) : null}

            {feature.kind ? (
              <p className={`t-eyebrow ${feature.media ? 'mt-6' : ''} ${kindTone}`}>
                {feature.kind}
              </p>
            ) : null}

            <FeatureHeading
              className={`${headingLevel === 'h2' ? 't-h2-mid' : 't-h3-editorial'} mt-3 max-w-[26ch] ${titleTone}`}
            >
              {feature.title}
            </FeatureHeading>

            {feature.meta ? (
              <p className={`mt-3 t-body-sm ${bodyTone}`}>{feature.meta}</p>
            ) : null}

            {feature.description ? (
              <p className={`mt-4 max-w-[62ch] t-body ${bodyTone}`}>
                {feature.description}
              </p>
            ) : null}

            <Link
              href={feature.href}
              data-cta-name={feature.tracking}
              className={`${arrowLink} mt-6 ${ isDark ? 'text-text-inverse hover:text-bc-cyan' : 'text-bc-primary hover:text-bc-dark' }`}
            >
              {feature.ctaLabel ?? 'Ver conteúdo'}
              <span
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
              >
                →
              </span>
            </Link>
          </article>
        ) : null}

        {hasSidebar ? (
          <div className="lg:col-span-5">
            {listTitle ? (
              <h3 className={`t-eyebrow border-b ${rule} pb-4 ${kindTone}`}>{listTitle}</h3>
            ) : null}

            {items.length > 0 ? (
              <ul className="flex flex-col">
                {items.map((item) => (
                  <li key={item.key} className={`border-b ${rule} ${listTitle ? '' : 'first:border-t'}`}>
                    <Link
                      href={item.href}
                      data-cta-name={item.tracking}
                      className={`group block py-5 transition-colors duration-200 ease-bc focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 ${ring} motion-reduce:transition-none`}
                    >
                      <span className="flex items-start justify-between gap-6">
                        <span className="min-w-0">
                          {item.kind ? (
                            <span className={`t-eyebrow block ${kindTone}`}>{item.kind}</span>
                          ) : null}
                          <span
                            className={`mt-2 block t-h4-display transition-colors duration-200 ${titleTone} ${hoverTone} motion-reduce:transition-none`}
                          >
                            {item.title}
                          </span>
                          {item.description ? (
                            <span
                              className={`mt-2 block line-clamp-2 t-body-sm leading-[1.55] ${bodyTone}`}
                            >
                              {item.description}
                            </span>
                          ) : null}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`shrink-0 pt-1 transition-transform duration-200 ease-out group-hover:translate-x-[3px] ${bodyTone} motion-reduce:transform-none motion-reduce:transition-none`}
                        >
                          →
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}

            {children}

            {listCta ? (
              <Link
                href={listCta.href}
                data-cta-name={listCta.tracking}
                className={`${arrowLink} mt-6 ${ isDark ? 'text-bc-cyan hover:text-text-inverse' : 'text-bc-primary hover:text-bc-dark' }`}
              >
                {listCta.label}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
                >
                  →
                </span>
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </ContentSection>
  )
}

export default ContentFeature
