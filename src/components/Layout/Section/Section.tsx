import { createElement, type CSSProperties } from 'react'

import { ArrowMask } from '@/components'
import { sectionStyles } from '@/components/Layout/Section/Section.style'
import { heroMobileVariant } from '@/config/heroVariants'


import { SectionProps } from './Section.type'

const Section = ({
  children,
  id,
  className,
  bgImage,
  hScree,
  first = false,
  as = 'section',
  arrowMask
}: SectionProps) =>
  createElement(
    as,
    {
      id,
      style: bgImage
        ? ({
            '--hero-bg': `url(${bgImage})`,
            ...(heroMobileVariant(bgImage)
              ? { '--hero-bg-mobile': `url(${heroMobileVariant(bgImage)})` }
              : {})
          } as CSSProperties)
        : {},
      className: `${bgImage ? 'hero-bg' : ''} ${className} ${sectionStyles({ hScree, first, arrowMask })}`
    },

    <>
      {arrowMask && <ArrowMask inverted />}
      <div className="container mx-auto px-6 lg:px-8">{children}</div>
      {arrowMask && <ArrowMask inverted up />}
    </>
  )

export default Section
