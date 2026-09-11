import { ProductCardProps } from './ProductCard.type'

export const productCardData: Array<ProductCardProps> = [
  {
    id: 'mercado-livre-de-energia',
    img: '/img/components/products-card/mercado-livre-de-energia-thumb.webp',
    icon: '/img/icons/icon-mercado-energia.svg',
    iconSize: [106, 104],
    title: 'Mercado Livre de Energia',
    description:
      'Para empresas com contas a partir de R$ 10 mil. Solução sem investimento para consumidores conectados em alta tensão e demanda contratada a partir de 30kW negociarem livremente a própria energia.',
    url: '/produtos/mercado-livre-de-energia'
  },
  {
    id: 'consorcio-bc-energia',
    img: '/img/components/products-card/energia-por-assinatura-thumb.webp',
    icon: '/img/icons/icon-energia-assinatura.svg',
    iconSize: [106, 104],
    title: 'Consórcio BC Energia',
    description:
      'Para contas a partir de R$ 300,00. Solução sem investimento para consumidores conectados em baixa tensão terem acesso a energia solar sem a necessidade de construir usina.',
    url: '/produtos/consorcio-bc-energia'
  },
  {
    id: 'gestao-de-energia',
    img: '/img/components/products-card/gestao-de-energia-thumb.webp',
    icon: '/img/icons/icon-gestao-de-energia.svg',
    iconSize: [106, 104],
    title: 'Gestão de Energia',
    description:
      'Performance no Mercado Livre. Fundamental para reduzir os custos com energia elétrica, trazendo sustentabilidade, eficiência e aumento de competitividade para o negócio.',
    url: '/produtos/gestao-de-energia'
  },
  {
    id: 'certificacao-renovavel-irec',
    img: '/img/components/products-card/certificacao-renovavel-thumb.png',
    icon: '/img/icons/irec.svg',
    iconSize: [106, 104],
    title: 'Certificação Renovável I-REC',
    description:
      'Comprovação de consumo renovável. Certificação internacional que permite a rastreabilidade do consumo através das fontes renováveis, como solar, eólica, hídrica e biomassa.',
    url: '/produtos/certificacao-renovavel-irec'
  },
  {
    id: 'arrendamento-de-usinas',
    img: '/img/components/products-card/arrendamento-de-usinas-thumb.webp',
    icon: '/img/icons/icon-arrendamento-de-usinas.svg',
    iconSize: [106, 104],
    title: 'Arrendamento de Usinas',
    description:
      'Parceria que entrega resultado. Oportunidade para donos de usinas arrendarem seus ativos e, assim, não se preocuparem com conversão e gestão de clientes.',
    url: '/produtos/arrendamento-de-usinas'
  },
  {
    id: 'consultoria-juridica',
    img: '/img/components/products-card/consultoria-juridica-thumb.png',
    icon: '/img/icons/icon-consultoria-juridica.svg',
    iconSize: [88, 104],
    title: 'Gestão e Consultoria Jurídica',
    url: 'https://www.bced.com.br/',
    target: '_blank',
    description:
      'Expertise em Direito Energético e Empresarial. Atuação multidisciplinar para oferecer uma atuação mais estratégica alinhada com os seus objetivos empresariais de forma contenciosa e consultiva.'
  }
]
