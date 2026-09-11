import { ButtonLink, Cta as CtaPrimitive, Heading } from '@/components'
import { CtaProps } from '@/components/Sections/Sections.type'

type Props = Omit<CtaProps, 'children'> & {
  link: string
  linkText: string
}

const Cta = ({ title, bgImage, link, linkText }: Props) => (
  <CtaPrimitive overlay bgImage={bgImage}>
    <>
      <Heading className="text-white">
        <span dangerouslySetInnerHTML={{ __html: title || '' }} />
      </Heading>
      <ButtonLink href={link} variant="secondary">
        {linkText}
      </ButtonLink>
    </>
  </CtaPrimitive>
)

export default Cta
