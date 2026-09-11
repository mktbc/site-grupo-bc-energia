import { FeaturesProps } from '@/components/Features/Features.type'
import { AboutContent, CtaProps } from '@/components/Sections/Sections.type'

export const content: AboutContent = [
  {
    title: 'Arrendamos a sua usina solar pronta ou prestes a entrar em operação',
    description:
      'Você é proprietário de uma usina solar e busca uma maneira de maximizar seus lucros sem complicações? O Grupo BC Energia tem a solução ideal para você! Nosso serviço de arrendamento de usinas solares oferece uma oportunidade única de aumentar sua rentabilidade enquanto cuidamos de toda a parte comercial.'
  }
]

export const features: Array<FeaturesProps> = [
  {
    id: '1',
    icon: '01',
    title: 'Gere receita com a sua usina'
  },
  {
    id: '2',
    icon: '02',
    title: 'Equipe especializada para atendimento'
  },
  {
    id: '3',
    icon: '03',
    title: 'Somos referência no segmento'
  }
]

const Title = () => (
  <>
    Contamos com{' '}
    <span className="text-bc-yellow">mais de 70 parceiros em projetos de usinas arrendadas</span> em
    diversos estados
  </>
)

export const cta: CtaProps = {
  bgImage: '/img/global/arrendamento-de-usinas.webp',
  title: <Title />,
  link: '#contato',
  linkText: 'Quero economizar'
}

export const howItWorks: Array<{ title: string; description: string }> = [
  {
    title: 'Gestão Comercial Completa:',
    description:
      'O Grupo BC Energia assume toda a responsabilidade pela prospecção e gestão de clientes. Nossa equipe especializada cuida de todas as etapas, desde a captação de novos leads até a administração dos contratos, garantindo um fluxo constante de clientes e receita para sua usina.'
  },
  {
    title: 'Foco na Manutenção:',
    description:
      'Como proprietário, sua única preocupação será a manutenção e o bom funcionamento da sua usina solar. Com a geração máxima de energia, você garante o melhor retorno sobre o investimento.'
  },
  {
    title: 'Pagamento Atraente:',
    description:
      'Efetuamos o pagamento com base no consumo dos clientes, assegurando que você receba um percentual justo e competitivo por toda a energia consumida.'
  }
]

export const benefits: Array<{ title: string; description: string }> = [
  {
    title: 'Gestão comercial completa:',
    description: 'A BC Energia cuida de toda a prospecção e gestão de clientes.'
  },
  {
    title: 'Foco na manutenção:',
    description:
      'Você só precisa garantir o bom funcionamento da usina, e quanto mais energia ela gerar, maior será seu rendimento.'
  },
  {
    title: 'Pagamento atrativo:',
    description:
      'Receba com base na geração de energia da sua usina, com um percentual justo por toda a energia utilizada.'
  },
  {
    title: 'Renda passiva:',
    description:
      'Ganhe dinheiro sem precisar se preocupar com a parte comercial, enquanto nós administramos tudo.'
  }
]
