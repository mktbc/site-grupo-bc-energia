import { FeaturesProps } from '@/components/Features/Features.type'
import { AboutContent, CtaProps } from '@/components/Sections/Sections.type'

export const content: AboutContent = [
  {
    title: 'Profissionais qualificados que ajudam sua empresa a reduzir custos com energia',
    description:
      'Combinamos know-how e tecnologia para oferecer uma consultoria capaz de encontrar as melhores soluções relacionadas à gestão da sua geração e consumo de energia. Somos a Empresa de Gestão de Energia ideal para as suas necessidades de economia. \n \n Além de auxiliar na migração e gestão de contas no Mercado Livre de Energia, a BC Serviços conta com uma equipe multidisciplinar de experts com grande experiência no mercado. Assim, prestamos uma consultoria personalizada cuja consequência é uma redução ampla do valor da conta de luz. \n \n \n'
  }
]

export const features: Array<FeaturesProps> = []

export const checklistItems: Array<string> = [
  'Gerenciamento energético aplicado ao seu processo produtivo, visando o melhor aproveitamento com o menor custo operacional;',
  'Inteligência energética e de mercado, vislumbrando as melhores oportunidades para sua empresa economizar energia;',
  'Dados de energia em tempo real para consultas através de plataformas eletrônicas;',
  'Equipe especializada de engenheiros e técnicos para o acompanhamento da sua gestão energética.'
]

const Title = () => (
  <>
    Somos a maior <span className="text-bc-yellow">comercializadora de energia</span> do
    Centro-Oeste e uma das principais independentes do país.
  </>
)

export const cta: CtaProps = {
  bgImage: '/img/global/arrendamento-de-usinas.webp',
  title: <Title />,
  link: '#contato',
  linkText: 'Quero economizar'
}
