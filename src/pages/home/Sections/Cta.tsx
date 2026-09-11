import { ButtonLink, Heading, Section } from '@/components'
import Image from '@/components/Image'
const Cta = () => (
  <Section bgImage="/img/components/cta/fundo-cta-1.svg" id="home_cta" className="h-auto bg-white">
    <div className="mx-auto flex flex-col gap-6 px-6 text-center lg:w-2/4 lg:gap-9 lg:px-0">
      <Image
        className="mx-auto w-20 lg:w-auto"
        src={`/img/global/grupo-bc-logo-solo-color.svg`}
        alt="Grupo BC Energia"
        width={119}
        height={86}
      />
      <Heading>
        Somos movidos à <br /> <span className="text-teal-600">energia.</span>
      </Heading>
      <p className="t-body-lg">
        Com mais de 117 usinas, próprias e arrendadas, em plena operação, e o prestígio de ser a
        maior comercializadora independente do Centro-Oeste, o Grupo BC Energia entrega soluções
        para redução na conta de energia a todos os perfis de clientes, no Mercado Livre de Energia
        e na Geração Distribuída.
      </p>
      <ButtonLink href={`/contato`} variant="green">
        Falar com um especialista
      </ButtonLink>
    </div>
  </Section>
)

export default Cta
