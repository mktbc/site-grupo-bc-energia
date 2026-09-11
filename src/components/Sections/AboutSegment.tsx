import { Heading, Section } from '@/components'

import { AboutSegmentProps } from './Sections.type'

const AboutSegment = ({ content, img }: AboutSegmentProps) => (
  <Section className="bg-white px-6 pb-20 pt-0 text-center lg:text-left">
    <div className="grid gap-8 lg:grid-cols-2">
      <div
        style={{ backgroundImage: `url(${img})` }}
        className="block h-60 w-full rounded-lg bg-cover bg-center bg-no-repeat lg:h-auto"
      />
      <div className="">
        {content.map((item, index) => (
          <div key={index}>
            {item.title && (
              <Heading center={false} full>
                {item.title}
              </Heading>
            )}

            <p className="mb-6 whitespace-pre-line text-justify t-body-lg">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </Section>
)

export default AboutSegment
