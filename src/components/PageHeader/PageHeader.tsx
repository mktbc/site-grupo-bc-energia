import React from 'react'

import { Breadcrumbs, Section } from '@/components'
import { buttonStyles } from '@/components/Button/Button.style'
import Image from '@/components/Image'
import Link from '@/components/Link'
import { heroMobileVariant } from '@/config/heroVariants'


import { PageHeaderProps } from './PageHeader.type'

const PageHeader = ({
  icon,
  title,
  titleLine2,
  eyebrow,
  description,
  category,
  bgImage,
  align = 'center',
  compact = false,
  variant = 'default',
  cta,
  secondaryCta,
  // `flush` permanece na API (páginas ainda passam a prop), mas a transição
  // inferior do hero agora é sempre reta: o notch em V foi removido do sistema.
  eyebrowRule = false,
  media,
  bgPosition,
  lightOverlay = false
}: PageHeaderProps) => {
  if (align === 'left') {
    const isBanner = variant === 'banner'
    const isSplit = !isBanner && Boolean(media)


    const content = (
      <div className={`hero-panel ${isSplit ? 'hero-panel--split' : ''}`}>
        <Breadcrumbs title={title} parent={category} variant="plain" />

        {eyebrow && (
          <p className="hero-eyebrow mt-5 flex items-center gap-3">
            {eyebrowRule && <span aria-hidden="true" className="h-px w-8 bg-bc-yellow" />}
            {eyebrow}
          </p>
        )}

        <h1 className={`hero-title mt-2.5 ${isSplit ? 'measure-title' : ''}`}>
          {title}
          {titleLine2 && (
            <>
              <br />
              <span className="hero-title-accent">{titleLine2}</span>
            </>
          )}
        </h1>


        {description && <p className="hero-description !text-white/90">{description}</p>}

        {(cta || secondaryCta) && (
          <div data-cta-location="page_header" className="hero-actions">
            {cta && (
              <Link
                href={cta.href}
                target={cta.target}
                aria-label={cta.ariaLabel}
                data-cta-name={cta.label}
                className={`${buttonStyles({ variant: 'primary', size: 'lg', rounded: true })} min-h-[48px] max-w-full justify-center text-center whitespace-normal shadow-sm transition-[transform,box-shadow,background-color] duration-fast hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none sm:min-h-[52px] sm:whitespace-nowrap`}
              >
                {cta.label}
              </Link>
            )}

            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                target={secondaryCta.target}
                aria-label={secondaryCta.ariaLabel}
                data-cta-name={secondaryCta.label}
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md t-action-label text-white underline-offset-[6px] transition-colors duration-fast hover:text-bc-cyan hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bc-dark sm:justify-start motion-reduce:transition-none"
              >
                {secondaryCta.label}
                <span aria-hidden="true" className="transition-transform duration-fast group-hover:translate-x-[3px] motion-reduce:transform-none">
                  →
                </span>
              </Link>
            )}
          </div>
        )}
      </div>
    )

    return (
      <>
        <header
          style={
            bgImage
              ? ({
                  '--hero-bg': `url(${bgImage})`,
                  ...(heroMobileVariant(bgImage)
                    ? { '--hero-bg-mobile': `url(${heroMobileVariant(bgImage)})` }
                    : {})
                } as React.CSSProperties)
              : {}
          }
          className={`relative bg-cover bg-no-repeat ${bgImage ? 'hero-bg' : ''} ${
            isBanner
              ? `flex min-h-[480px] flex-col justify-center ${
                  bgPosition ?? 'bg-[position:center_center] lg:bg-[position:center_right]'
                } lg:min-h-[560px]`
              : 'bg-center'
          }`}
        >

          {/* Overlay escuro base (texto branco sobre fotografia) */}
          <div
            aria-hidden="true"
            className={`bc-ovl ${lightOverlay ? 'bc-ovl-dark' : 'bc-ovl-dark-medium'}`}
          />
          {/* Gradiente de leitura: mais denso do lado do texto (esquerda) */}
          <div aria-hidden="true" className="bc-ovl bc-ovl-readable-left" />




          <div
            className={`bc-container relative ${
              compact
                ? 'pb-14 pt-24 sm:pt-28 lg:pb-20 lg:pt-32'
                : isBanner
                  ? 'pb-16 pt-28 sm:pt-32 lg:pb-20 lg:pt-36'
                    : 'min-h-[520px] pb-16 pt-28 sm:pt-32 lg:min-h-[600px] lg:pb-20 lg:pt-36'
            }`}
          >
            {isSplit ? (
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <div className="relative z-10 lg:col-span-5">{content}</div>
                <div className="relative lg:col-span-7 lg:-my-10">
                  <img
                    src={media!.src}
                    srcSet={media!.srcSet}
                    sizes={media!.sizes ?? '(max-width: 1024px) 100vw, 58vw'}
                    alt={media!.alt}
                    width={media!.width ?? 1200}
                    height={media!.height ?? 800}
                    loading="eager"
                    decoding="async"
                    className="h-[360px] w-full rounded-xl object-cover shadow-md sm:h-[460px] lg:h-[560px]"
                  />
                </div>
              </div>
            ) : (
              <div className={isBanner ? 'max-w-[580px]' : undefined}>{content}</div>
            )}
          </div>

        </header>
        
      </>
    )
  }


  return (
    <>
      <Section
        first
        bgImage={bgImage}
        className="relative from-teal-600 to-teal-600/70 before:absolute before:top-0 before:z-0 before:h-full before:w-full before:bg-gradient-to-t"
      >
        <div
          className={`hero-panel relative mx-auto flex w-full flex-col items-center justify-center gap-4 text-center ${ compact ? 'pb-10 pt-8' : 'pb-20 pt-14 sm:pt-0' }`}
        >
          {icon && <Image src={`/img/icons/${icon}`} alt="Icone" width={100} height={100} />}
          {eyebrow && <p className="hero-eyebrow text-center">{eyebrow}</p>}
          <h1 className="hero-title max-w-[20ch] text-center">{title}</h1>
          {description && <p className="hero-description max-w-[42ch] text-center !text-white/90">{description}</p>}
          <Breadcrumbs title={title} parent={category} />
        </div>
      </Section>
      
    </>
  )
}

export default PageHeader
