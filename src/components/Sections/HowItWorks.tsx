import { ChecklistItem, Heading, Section } from '@/components'
import Image from '@/components/Image'

import { HowItWorksProps } from './Sections.type'

const HowItWorks = ({ title, description, itens, checkItem, imgUrl }: HowItWorksProps) => (
  <Section className="bg-gray-100 px-6">
    <Heading center>{title}</Heading>
    <p className="mb-10 text-center t-body-lg">{description}</p>

    <div className="grid gap-9 lg:grid-cols-2">
      <div>
        <ul className="mb-6 flex flex-col gap-6">
          {itens.map((item, index) => (
            <li key={index}>
              <strong>{item.title}</strong>: {item.description}
            </li>
          ))}
        </ul>
        {checkItem && <ChecklistItem box title={checkItem} />}
      </div>
      <div>
        <Image className="mx-auto" src={imgUrl} alt="Como Funciona" width={717} height={801} />
      </div>
    </div>
  </Section>
)

export default HowItWorks
