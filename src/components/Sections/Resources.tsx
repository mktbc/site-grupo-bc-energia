import { ChecklistItem, Section, Heading } from '@/components'

import { ResourcesProps } from './Sections.type'

const Resources = ({ title, subtitle, description, items, img }: ResourcesProps) => (
  <Section className="px-8 pt-12 lg:mt-7 lg:pt-10">
    <div className="mb-10">
      <Heading subtitle={subtitle}>{title}</Heading>
      <p className="text-center t-body-lg">{description}</p>
    </div>
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="mb-0 flex flex-col gap-6 lg:mb-0">
        {items.map((resource: { title: string; description: string }, index: number) => (
          <ChecklistItem
            key={index}
            color="teal"
            title={resource.title}
            description={resource.description}
            align="start"
          />
        ))}
      </div>
      <div
        style={{ backgroundImage: `url(${img})` }}
        className="block h-80 w-full rounded-lg bg-cover bg-center bg-no-repeat lg:h-auto"
      />
    </div>
  </Section>
)

export default Resources
