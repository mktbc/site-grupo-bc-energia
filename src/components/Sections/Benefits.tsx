import { CardIconContent, CardIconContentProps, Section } from '@/components'

const Benefits = ({ benefits }: { benefits: Array<CardIconContentProps> }) => (
  <Section className="px-6 pt-20">
    <div className="grid gap-6 lg:grid-cols-3">
      {benefits.map((benefit, index) => (
        <CardIconContent key={index} {...benefit} />
      ))}
    </div>
  </Section>
)

export default Benefits
