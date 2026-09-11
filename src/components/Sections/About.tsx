import { Heading, Section } from '@/components'
import { Features } from '@/components'
import {
  aboutImageStyles,
  aboutWrapStyles,
  aboutStyles
} from '@/components/Sections/Sections.style'
import Image from '@/components/Image'
import Link from '@/components/Link'

import { AboutProps } from './Sections.type'

const About = ({
  content,
  features,
  img,
  children,
  inverter,
  className,
  imgLink = '',
  target = '_self',
  imgSrcSet,
  imgSizes,
  imgAlt = 'Grupo BC Energia'
}: AboutProps) => (
  <Section className={`${className} ${aboutStyles()}`}>
    <div className={aboutWrapStyles({ inverter })}>
      <div className="flex flex-col lg:basis-3/4 2xl:basis-2/3">
        {content.map((item, index) => (
          <div key={index}>
            <Heading center={false} full>
              {item.title}
            </Heading>
            <div className="whitespace-pre-line t-body-lg">{item.description}</div>
          </div>
        ))}

        {children}
      </div>
      <div className={aboutImageStyles({ inverter })}>
        {imgLink ? (
          <Link href={imgLink} target={target}>
            <Image
              className="ml-auto w-full rounded-lg"
              src={img}
              srcSet={imgSrcSet}
              sizes={imgSizes}
              alt={imgAlt}
              width={1100}
              height={1500}
            />
          </Link>
        ) : (
          <Image
            className="ml-auto w-full rounded-lg"
            src={img}
            srcSet={imgSrcSet}
            sizes={imgSizes}
            alt={imgAlt}
            width={1100}
            height={1500}
          />
        )}
      </div>

    </div>

    {features?.length ? (
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {features.map((feature) => (
          <Features key={feature.id} {...feature} />
        ))}
      </div>
    ) : null}
  </Section>
)

export default About
