import { Container } from '@/components'
import { buttonStyles } from '@/components/Button/Button.style'
import Link from '@/components/Link'

import { WrapperProps } from './Sliders.type'

/**
 * Slide do banner inicial da Home.
 *
 * Composição: fotografia dominante, overlay BC Dark direcional, painel
 * translúcido à esquerda, CTA primário + link editorial e linha de confiança.
 * Altura mínima fluida (600–820px no desktop, sem altura fixa) para a vitrine
 * de soluções aparecer mais cedo sem cortar o painel em telas baixas; o
 * padding inferior preserva a área dos indicadores do carrossel (32px da base no desktop, 24px no mobile — ver styles/carousel.css).
 */
const OVERLAYS: Record<'soft' | 'medium' | 'strong', string> = {
soft: 'bg-[linear-gradient(180deg,hsl(var(--bc-dark)/0.42)_0%,hsl(var(--bc-dark)/0.16)_45%,hsl(var(--bc-dark)/0.48)_100%)] md:bg-[linear-gradient(90deg,hsl(var(--bc-dark)/0.58)_0%,hsl(var(--bc-dark)/0.3)_36%,hsl(var(--bc-dark)/0.06)_68%,transparent_100%)]',
  medium:
  'bg-[linear-gradient(180deg,hsl(var(--bc-dark)/0.5)_0%,hsl(var(--bc-dark)/0.24)_45%,hsl(var(--bc-dark)/0.56)_100%)] md:bg-[linear-gradient(90deg,hsl(var(--bc-dark)/0.66)_0%,hsl(var(--bc-dark)/0.36)_36%,hsl(var(--bc-dark)/0.08)_68%,transparent_100%)]',
  strong:
  'bg-[linear-gradient(180deg,hsl(var(--bc-dark)/0.58)_0%,hsl(var(--bc-dark)/0.3)_45%,hsl(var(--bc-dark)/0.62)_100%)] md:bg-[linear-gradient(90deg,hsl(var(--bc-dark)/0.74)_0%,hsl(var(--bc-dark)/0.44)_38%,hsl(var(--bc-dark)/0.12)_70%,transparent_100%)]'
}

const tabletHeroImage = (src: string) => {
  if (src.endsWith('hero-consorcio.webp')) return '/img/hero/hero-consorcio-1024.webp'
  if (src.endsWith('hero-resultados.webp')) return '/img/hero/hero-resultados-1024.webp'
  return src
}

const SlidersWrapper = ({
  bgImage,
  bgImageMobile,
  bgPosition = 'md:object-[62%_center]',
  bgPositionMobile = 'object-[68%_top]',
  eyebrow,
  primary = false,
  title,
  description,
  cta,
  secondaryCta,
  trust,
  overlay = 'medium',
  alt = ''
}: WrapperProps & { eager?: boolean }) => {
  const Title = primary ? 'h1' : 'h2'
  const tabletImage = tabletHeroImage(bgImage)
  const responsiveSources = bgImageMobile
    ? `${bgImageMobile} 768w, ${tabletImage} 1024w, ${bgImage} 1920w`
    : `${tabletImage} 1024w, ${bgImage} 1920w`

  return (
    <div className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-bc-dark md:min-h-[clamp(600px,78vh,820px)] md:items-center">
      <img
        src={bgImage}
        srcSet={responsiveSources}
        sizes="100vw"
        alt={alt}
        width={1920}
        height={1080}
        // React 18 não reconhece camelCase; atributo em lowercase evita warning.
        {...{ fetchpriority: primary ? 'high' : 'low' }}
        loading={primary ? 'eager' : 'lazy'}
        decoding="async"
        className={`absolute inset-0 -z-10 h-full w-full object-cover ${bgPositionMobile} ${bgPosition}`}
      />

      {/* Overlay calibrado por slide, apenas do lado do texto. */}
        <div aria-hidden="true" className={`absolute inset-0 -z-10 ${OVERLAYS[overlay]}`} />
        <span aria-hidden="true" className="bc-hero-flow" />

        <Container className="relative pb-24 pt-28 md:pb-20 md:pt-24">
          <div
            data-cta-location="hero"
            className="bc-hero-content media-panel z-10 max-w-[34rem] p-6 md:max-w-[40rem] md:p-8 lg:p-8"
          >
            {eyebrow ? (
              <p className="bc-eyebrow-on-image bc-hero-step t-eyebrow">
                {eyebrow}
              </p>
            ) : null}

            <Title className="bc-hero-step t-h1 mt-2.5 max-w-[15ch] leading-[0.98] text-balance text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.45)] md:max-w-[18ch] md:text-[clamp(2.75rem,3.9vw,4rem)]">
              {title}
            </Title>

            <p className="bc-hero-step mt-4 max-w-[38rem] text-base leading-[1.6] text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] md:max-w-[38rem] md:text-lg">
              {description}
            </p>

            <div className="bc-hero-step mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <Link
              href={cta.href}
              target={cta.target ?? '_self'}
              rel={cta.target === '_blank' ? 'noopener noreferrer' : undefined}
              data-cta-name={cta.label}
              className={`${buttonStyles({ variant: 'primary', size: 'lg' })} shadow-sm transition-[transform,box-shadow,background-color] duration-fast hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none`}
            >
              {cta.label}
            </Link>

            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                target={secondaryCta.target ?? '_self'}
                rel={secondaryCta.target === '_blank' ? 'noopener noreferrer' : undefined}
                data-cta-name={secondaryCta.label}
                className="group inline-flex min-h-[48px] items-center gap-2 t-action-label text-text-inverse underline-offset-[6px] transition-colors duration-fast ease-bc hover:text-bc-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bc-dark motion-reduce:transition-none"
              >
                {secondaryCta.label}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-bc group-hover:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
                >
                  →
                </span>
              </Link>
            ) : null}
          </div>

          {trust ? (
            <p className="bc-hero-step mt-6 text-[0.875rem] font-medium leading-snug text-white/85 [text-shadow:0_1px_10px_rgba(0,0,0,0.4)]">
              {trust}
            </p>
          ) : null}
        </div>
      </Container>
    </div>
  )
}


export default SlidersWrapper
