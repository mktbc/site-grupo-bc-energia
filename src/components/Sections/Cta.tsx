import { ButtonLink, Heading, Section } from '@/components'
import Image from '@/components/Image'

import { ctaStyles, ctaHeadingStyles } from './Sections.style'
import { CtaProps } from './Sections.type'

const Cta = ({
  title,
  children,
  light,
  bgImage,
  className,
  overlay,
  overlayColor = 'light',
  link,
  linkText
}: CtaProps) => (
  <Section
    bgImage={bgImage || ''}
    className={`${className} ${ctaStyles({ light, overlay, overlayColor })}`}
  >
    <div className="relative z-10 mx-auto py-12 lg:w-3/4">
      <Image
        className="mx-auto mb-6"
        src={`${light ? '/img/global/grupo-bc-logo-solo-color.svg' : '/img/global/grupo-bc-logo-solo-branca.svg'}`}
        alt="Grupo BC Energia"
        width={64}
        height={46}
      />
      <Heading className={ctaHeadingStyles({ light })}>{title}</Heading>
      <div className="flex flex-col gap-4 text-center t-body-lg">{children}</div>
      {link && linkText && (
        <ButtonLink href={link} variant="secondary">
          {linkText}
        </ButtonLink>
      )}
    </div>
  </Section>
)

export default Cta
