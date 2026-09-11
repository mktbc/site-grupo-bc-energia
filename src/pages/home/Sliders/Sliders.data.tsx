import { COMPANY_METRICS } from '@/data/companyMetrics'

import { WrapperProps } from './Sliders.type'

/**
 * Slides do banner inicial da Home.
 * Textos, CTAs, links, imagens e ordenação são os originais do projeto.
 * A linha de prova social é a mesma em todos os slides e vem das métricas
 * institucionais centralizadas (nenhum número novo foi criado).
 */

const metric = (id: string) => COMPANY_METRICS.find((item) => item.id === id)

const TRUST_LINE = [
  `${metric('clientes')?.value ?? '+ de 5 mil'} clientes atendidos`,
  `${metric('economia')?.value ?? '+ de R$ 400M'} de economia gerada`
].join(' · ')

const TitleSlider1 = () => (
  <>
    Reduza o custo de energia da sua empresa com o{' '}
    <span className="text-bc-yellow">Mercado Livre</span>
  </>
)

const TitleSlider2 = () => (
  <>
    Faça sua adesão sem custos e tenha{' '}
    <span className="text-bc-yellow">até 25% de economia</span>
  </>
)

const TitleSlider3 = () => (
  <>
    Mais de <span className="text-bc-yellow">R$ 400 milhões de economia</span> aos nossos clientes
  </>
)

export const slidersData: Array<WrapperProps> = [
  {
    id: 'slider_home_1',
    bgImage: '/img/hero/hero-mercado-livre.webp',
    bgImageMobile: '/img/hero/hero-mercado-livre-mobile.webp',
    bgPosition: 'md:object-[62%_center]',
    bgPositionMobile: 'object-[68%_top]',
    eyebrow: 'Grupo BC Energia',
    primary: true,
    title: <TitleSlider1 />,
    description:
      'Comercialização, gestão e geração distribuída de energia para empresas com contas acima de R$ 10 mil.',
    cta: { label: 'Enviar minha conta para análise', href: '/contato' },
    secondaryCta: { label: 'Conhecer soluções', href: '/produtos' },
    trust: TRUST_LINE,
    overlay: 'medium',
    alt: 'Equipe do Grupo BC Energia em operação corporativa de soluções em energia'
  },
  {
    id: 'slider_home_2',
    bgImage: '/img/hero/hero-consorcio.webp',
    bgPosition: 'md:object-[54%_top]',
    bgPositionMobile: 'object-[52%_top]',
    eyebrow: 'Consórcio BC Energia',
    title: <TitleSlider2 />,
    description:
      'Consumidores com contas a partir de R$ 250 economizam por meio do consórcio, sem investir em placas solares.',
    cta: {
      label: 'Fazer adesão gratuita',
      href: 'http://www.appenergia.com.br/Grupo_BC_Energia',
      target: '_blank'
    },
    secondaryCta: { label: 'Como funciona', href: '/produtos/consorcio-bc-energia' },
    trust: TRUST_LINE,
    overlay: 'soft',
    alt: 'Consumidores economizando na conta de luz com o Consórcio BC Energia'
  },
  {
    id: 'slider_home_3',
    bgImage: '/img/hero/hero-resultados.webp',
    bgPosition: 'md:object-[78%_center]',
    eyebrow: 'Resultados',
    title: <TitleSlider3 />,
    description:
      'Soluções sustentáveis e inteligentes que reduzem os custos com energia e aumentam a competitividade de mercado.',
    cta: { label: 'Conhecer o Grupo BC Energia', href: '/sobre/quem-somos' },
    secondaryCta: { label: 'Falar com especialista', href: '/contato' },
    trust: TRUST_LINE,
    overlay: 'strong',
    alt: 'Resultados do Grupo BC Energia em economia gerada para clientes'
  }
]

