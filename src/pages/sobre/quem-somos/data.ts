import { FeaturesProps } from '@/components/Features/Features.type'
import { AboutContent, ResourcesProps } from '@/components/Sections/Sections.type'
import { getBCIcon } from '@/config/icons'

export const content: AboutContent = [
  {
    title: 'Conheça mais sobre nós',
    description:
      'O Grupo BC Energia é um conjunto de empresas especializadas no setor elétrico, oferecendo soluções inovadoras e sustentáveis para a redução na conta de energia. Atuamos em geração distribuída para consumidores de baixa tensão, proporcionando economia significativa sem a necessidade de investimento. Além disso, somos referência em comercialização de energia e serviços de gestão de energia para consumidores de média e alta tensão no mercado livre de energia. \n \n Com mais de 10 anos de experiência no segmento, o Grupo BC Energia se consolidou como a maior comercializadora de energia independente do Centro-Oeste e uma das principais do Brasil. Nosso foco é entregar soluções que promovam a sustentabilidade e a economia, beneficiando nossos clientes e o meio ambiente'
  }
]

export const features: Array<FeaturesProps> = [
  {
    id: '1',
    icon: {
      url: getBCIcon('gestao-energia-renovavel'),
      size: [36, 36]
    },
    title: 'Expertise'
  },
  {
    id: '2',
    icon: {
      url: getBCIcon('planeta-sustentavel'),
      size: [36, 36]
    },
    title: 'Sustentabilidade'
  },
  {
    id: '3',
    icon: {
      url: getBCIcon('inovacao-sustentavel'),
      size: [36, 36]
    },
    title: 'Pioneirismo'
  },
  {
    id: '4',
    icon: {
      url: getBCIcon('usina-solar'),
      size: [36, 36]
    },
    title: 'Infraestrutura'
  }
]

export const resources: ResourcesProps = {
  title: 'Nossos Pilares: Fundamentos de uma Comercializadora de Energia Elétrica Visionária',
  subtitle: 'O que nos move',
  description:
    'Em cada passo que damos, como uma influente comercializadora de energia elétrica no Brasil, nos guiamos por um propósito claro: gerar valor através de nossa energia. Nosso caminho é pavimentado pela missão de desenvolver negócios em energia que integrem pessoas, ideias e recursos, visando excelência para clientes, fornecedores, colaboradores e acionistas. Nossa visão é consolidar sua liderança em geração de energias renováveis e trading, reunindo clientes de todos os portes e investindo nas melhores pessoas e tecnologias. Nossos valores são os alicerces que sustentam cada projeto e cada parceria: respeito, comprometimento, confiança, aprendizagem e responsabilidade social.',
  items: [
    {
      title: 'Propósito',
      description: 'Gerar valor com a nossa energia.'
    },
    {
      title: 'Missão',
      description:
        'Desenvolver negócios em energia, integrando pessoas, ideias e recursos, na busca do melhor resultado para clientes, fornecedores, colaboradores e acionistas.'
    },
    {
      title: 'Visão',
      description:
        'Consolidar o Grupo BC Energia como uma das principais supridoras de energia elétrica no Centro-Norte do País.'
    },
    {
      title: 'Valores',
      description: 'Respeito; Comprometimento; Confiança; Aprendizagem; Responsabilidade Social.'
    }
  ],
  img: '/img/pages/FOTO_SOBRE_NOS_02.webp'
}
