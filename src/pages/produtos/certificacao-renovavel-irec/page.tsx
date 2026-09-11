import { QuickAnswers } from '@/components/QuickAnswers'
import { QUICK_ANSWERS } from '@/data/quickAnswers'
import {
  FormEmbed,
  PageHeader,
  ProductLead,
  ProductPoints,
  ProductProof,
  RelatedLinks
} from '@/components'


import { productGraphics } from '@/config/brandGraphics'

import { ContextualContent } from '@/components/Content'
import { NextAction } from '@/components/NextAction'

import {
  PRODUCT_AUDIENCE_LINKS,
  PRODUCT_CONTENT_LINKS,
  PRODUCT_RELATED
} from '@/pages/produtos/relatedLinks.data'

const GRAPHICS = productGraphics('certificacao-renovavel-irec')

const benefits = [
  {
    icon: 'planeta-sustentavel' as const,
    title: 'Melhore a imagem da sua marca com I-REC',
    description:
      'Comprove publicamente a origem renovável da energia consumida pela sua operação.'
  },
  {
    icon: 'gestao-sustentavel' as const,
    title: 'Demonstre comprometimento com ESG',
    description:
      'A certificação se alinha ao pilar ambiental dos princípios ESG e à redução de emissões.'
  },
  {
    icon: 'economia-na-conta' as const,
    title: 'Reduza custos com energia elétrica',
    description:
      'Combine a certificação às demais soluções do Grupo BC Energia para otimizar seus gastos.'
  }
]

const IRECRenewableCertification = () => (
  <div>
    <PageHeader
      align="left"
      flush
      eyebrowRule={false}
      eyebrow="Certificação de energia renovável"
      title="Certificação renovável I-REC"
      description="O I-REC é o sistema global que rastreia e comprova a origem renovável da energia elétrica consumida pela sua empresa. Cada certificado representa 1 MWh de energia renovável injetada na rede."
      bgImage="/img/global/certificacao-renovavel.webp"
      category="Produtos"
      cta={{ label: 'Falar com um especialista', href: '#contato' }}
    />

    <ProductLead
      graphic={GRAPHICS.lead}
      eyebrow="O que é"
      title="Entenda o que é I-REC"
      paragraphs={[
        'A Certificação I-REC, sigla para International Renewable Energy Certificate, é um sistema global de rastreamento e certificação da origem renovável da energia elétrica consumida por empresas, indústrias e residências.',
        'Empresas e consumidores que desejam comprovar o consumo de energia renovável podem adquirir I-RECs de usinas certificadas. Cada I-REC representa 1 MWh de energia renovável injetada na rede elétrica. O sistema garante que os I-RECs sejam rastreados e não sejam revendidos, assegurando que a energia renovável seja realmente consumida.',
        'A Certificação I-REC comprova a origem renovável da energia utilizada por uma empresa, atestando seu consumo de energia limpa e contribuindo para a redução da emissão de gases de efeito estufa. Essa prática se alinha diretamente ao pilar ambiental dos princípios ESG, demonstrando o compromisso da empresa com a proteção do meio ambiente e a mitigação das mudanças climáticas.'
      ]}
      image={{
        src: '/img/pages/certificacao-renovavel-intro.webp',
        sizes: '(max-width: 1024px) 100vw, 58vw',
        alt: 'Certificação renovável I-REC do Grupo BC Energia'
      }}
      facts={[
        { label: 'Equivalência', value: '1 I-REC = 1 MWh renovável' },
        { label: 'Alcance', value: 'Disponível inclusive para o mercado cativo' }
      ]}
    />

    <QuickAnswers
      id="respostas-rapidas"
      title={QUICK_ANSWERS['/produtos/certificacao-renovavel-irec'].title}
      description={QUICK_ANSWERS['/produtos/certificacao-renovavel-irec'].description}
      items={QUICK_ANSWERS['/produtos/certificacao-renovavel-irec'].items}
      tracking="produto_irec"
    />

    <ProductProof
      graphic={GRAPHICS.proof}
      context="irec"
      title="Volume negociado e faturamento anual"
      description="A escala de geração própria que origina os certificados do Grupo BC Energia."
      link={{ label: 'Falar com um especialista', href: '#contato' }}
    />

    <ProductPoints
      eyebrow="Benefícios"
      title="Por que certificar a energia da sua empresa"
      items={benefits}
    />

    <ProductLead
      graphic={GRAPHICS.leadSecondary ?? { variant: 'none' }}
      tone="muted"
      imagePosition="left"
      eyebrow="Nossa atuação"
      title="Somos especialistas em I-REC"
      paragraphs={[
        'O Grupo BC Energia gera energia limpa e renovável através de suas usinas fotovoltaicas e hidroelétricas. Nossos clientes podem ter acesso a certificados I-REC que comprovam a origem da energia elétrica consumida.',
        'Entre em contato e descubra como adicionar esta importante vantagem competitiva para o seu negócio.'
      ]}
      image={{
        src: '/img/pages/irec2.webp',
        sizes: '(max-width: 1024px) 100vw, 58vw',
        alt: 'Usinas do Grupo BC Energia que originam os certificados I-REC'
      }}
    />


    <RelatedLinks
      variant="editorial"
      eyebrow="Perfis atendidos"
      title="Para quem esta solução faz sentido"
      description="Perfis de consumo em que Certificação I-REC costuma ter maior impacto no custo de energia."
      items={PRODUCT_AUDIENCE_LINKS['certificacao-renovavel-irec']}
    />

    <NextAction
      standalone
      prompt="Quer ver de onde vem a energia certificada?"
      label="Conheça a atuação do grupo em sustentabilidade"
      href="/sobre/sustentabilidade"
      intent="baixa"
      tracking="produto_irec_proxima_sustentabilidade"
    />

    <RelatedLinks
      title="Próximos passos"
      items={PRODUCT_RELATED['certificacao-renovavel-irec']}
    />
    <ContextualContent
      title="Aprofunde o tema da energia renovável"
      path="/produtos/certificacao-renovavel-irec"
      cluster="sustentabilidade-irec"
      trackingId="produto_irec"
    />


    <FormEmbed title="Entre em contato" />
  </div>
)

export default IRECRenewableCertification
