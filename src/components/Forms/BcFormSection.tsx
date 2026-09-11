import { Section } from '@/components'

interface BcFormSectionProps {
  title?: string
  description?: string
  children: React.ReactNode
}

const BcFormSection = ({ title, description, children }: BcFormSectionProps) => (
  <Section id="contato" className="bg-teal-600 pb-0 pt-0">
    {title && <h2 className="px-6 py-6 text-center t-h2 text-white">{title}</h2>}
    {description && (
      <p className="mx-auto mb-6 w-2/3 text-center t-h4 text-white">{description}</p>
    )}
    <div
      style={{
        width: '100%',
        maxWidth: '650px',
        margin: '0 auto',
        overflow: 'hidden',
        borderRadius: '10px'
      }}
    >
      {children}
    </div>
  </Section>
)

export default BcFormSection
