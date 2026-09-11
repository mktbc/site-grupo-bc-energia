import { AccordionType } from '@/components/Accordion/Accordion.type'
import { FeaturesProps } from '@/components/Features/Features.type'
import { AboutContent, CtaProps, HowItWorksProps } from '@/components/Sections/Sections.type'

export const content: AboutContent = [
  {
    title: 'BC Energia, A maior comercializadora de energia do Centro-Oeste',
    description:
      'A BC Energia é uma das maiores comercializadoras independentes do Brasil, movimentando mais de 150 mil GWh. Oferecemos as melhores condições em compra e venda de energia, com credibilidade, segurança e a experiência de quem atua no mercado livre de energia desde 2014. As soluções da BC Energia auxiliam na migração da sua conta para o mercado de energia livre e na gestão eficiente da mesma. Nossa equipe multidisciplinar de especialistas, munida de ferramentas de ponta, presta uma assessoria completa antes, durante e depois do processo de migração. \n \n \n'
  },
  {
    title: 'Inteligência no Mercado de Energia Livre',
    description:
      'A BC Comercializadora tem como principal atividade a compra e venda de energia elétrica, atendendo clientes com transparência, confiança e competência ao mostrar quão benéfico e econômico pode ser o mercado de energia livre.  \n \n Nossos especialistas realizam uma análise competente da viabilidade econômica de migração, evitando qualquer tipo de riscos ou investimentos desnecessários. Depois da adesão ao Mercado Livre de Energia, auxiliamos na gestão estratégica da contratação de energia, o que inclui a representação e registro junto à CCEE. Relatórios de acompanhamento mensal e análises das alterações regulatórias garantem o sucesso em curto e longo prazo.'
  }
]

export const features: Array<FeaturesProps> = [
  {
    id: '1',
    icon: '01',
    title: 'Análise de viabilidade econômica de migração'
  },
  {
    id: '2',
    icon: '02',
    title: 'Assessoria completa para adesão ao Mercado Livre e contratação de energia'
  },
  {
    id: '3',
    icon: '03',
    title: 'Relatórios de acompanhamento mensal e acompanhamento das alterações regulatórias'
  }
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

export const checklistItems: Array<string> = [
  'Contratos de Curto, Médio e Longo Prazo',
  'Contratos de SWAP',
  'Contratos a Termo',
  'Opções de Collar',
  'Opções de Derivativos (Call e Put)',
  'Contratos atrelados ao preço do mercado Spot',
  'Operações Estruturadas',
  'Swap Temporal, Pré-pagamento, Swap de Fonte'
]

export const howItWorks: HowItWorksProps = {
  title: 'Mercado Livre de Energia: Como funciona?',
  description:
    'Também conhecido como Ambiente de Contratação Livre (ACL), é um segmento do mercado de energia elétrica onde os consumidores podem negociar livremente as condições de compra de energia (preço, prazo, volume, fornecedor, entre outros) diretamente com os produtores ou comercializadores. Difere-se do Ambiente de Contratação Regulada (ACR), no qual os consumidores são atendidos pelas distribuidoras locais com tarifas e condições reguladas pelo governo. Aqui estão os principais aspectos do mercado de energia livre:',
  itens: [
    {
      title: 'Participantes',
      description:
        'No Mercado Livre de Energia, podem participar consumidores conectados em média e alta tensão, geradores, comercializadores, importadores e exportadores de energia. Consumidores livres podem escolher seu fornecedor se atenderem a um certo nível de demanda.'
    },
    {
      title: 'Negociação de Preços',
      description:
        'Diferentemente do mercado regulado, onde as tarifas são estabelecidas pelo governo, no mercado de energia livre, os preços são negociados livremente entre as partes, proporcionando potencialmente mais competitividade e transparência.'
    },
    {
      title: 'Contratos',
      description:
        'As negociações resultam em contratos bilaterais que podem variar em duração, quantidade de energia e outros termos. Esses contratos podem ser ajustados para atender às necessidades específicas dos consumidores.'
    },
    {
      title: 'Tipos de Energia',
      description:
        'Os consumidores podem optar por comprar energia convencional ou incentivada (gerada por fontes renováveis com incentivos fiscais, como por exemplo energia solar). Consumidores especiais são incentivados a comprar energia incentivada.'
    },
    {
      title: 'Acesso à Rede',
      description:
        'Mesmo participando, os consumidores precisam pagar pelo uso da rede de distribuição ou transmissão, o que é regulado e tarifado pelo governo.'
    },
    {
      title: 'Câmara de Comercialização de Energia Elétrica (CCEE)',
      description:
        'É o órgão responsável por viabilizar e gerir as operações de compra e venda de energia no Mercado Livre, garantindo a segurança e a transparência das transações.'
    }
  ],
  checkItem:
    'O Mercado de Energia Livre é uma opção para consumidores que buscam flexibilidade e potencialmente preços mais competitivos, mas também requer uma gestão mais ativa e uma compreensão dos riscos do mercado.',
  imgUrl: '/img/pages/mercado-livre-de-energia-como-funciona.webp'
}

export const faq: Array<AccordionType> = [
  {
    title: 'O que é o Mercado Livre de Energia?',
    content:
      'O Mercado Livre de Energia é um ambiente de negociação onde consumidores e fornecedores de energia elétrica podem negociar preços e condições de fornecimento de energia de forma direta e personalizada. No Mercado Livre, as empresas e consumidores têm a liberdade de escolher seu fornecedor de energia, podendo negociar tarifas e contratos que melhor atendam suas necessidades.'
  },
  {
    title: 'Quem pode migrar para o Mercado Livre de Energia?',
    content:
      'Podem migrar para o Mercado Livre de Energia médios e grandes consumidores de energia, conectados em alta tensão (Grupo A) e com demanda contratada, como indústrias, comércios e instituições.'
  },
  {
    title: 'Quais são os benefícios de migrar para o Mercado Livre de Energia?',
    content:
      'Os principais benefícios incluem a possibilidade de negociar preços mais competitivos, maior previsibilidade dos custos com contratos de longo prazo, acesso a tarifas diferenciadas, e a oportunidade de escolher fornecedores que ofereçam condições e serviços personalizados para atender melhor às suas necessidades.'
  },
  {
    title: 'Como a energia é distribuída e chega à minha empresa?',
    content:
      'Após a migração para o Mercado Livre de Energia, a responsabilidade pelo transporte da energia elétrica continua sendo da distribuidora local.'
  },
  {
    title: 'Quais são as fontes de energia disponíveis no Mercado Livre?',
    content:
      'No Mercado Livre de Energia, você pode escolher entre diversas fontes de energia, incluindo opções renováveis como solar, eólica, biomassa e pequenas centrais hidrelétricas.'
  },
  {
    title: 'Qual é a legislação vigente para o Mercado Livre de Energia?',
    content:
      'A legislação para o Mercado Livre de Energia é regida pela Agência Nacional de Energia Elétrica (ANEEL) e pela Lei no 9.074/1995, entre outras normas e regulamentos. A legislação pode variar ao longo do tempo, e é importante acompanhar as atualizações e mudanças para garantir a conformidade.'
  }
]
