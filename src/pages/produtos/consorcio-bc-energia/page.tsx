import { QuickAnswers } from '@/components/QuickAnswers'
import { QUICK_ANSWERS, quickAnswerSchemaItems, withoutCoveredFaq } from '@/data/quickAnswers'
import {
  FormEmbed,
  PageHeader,
  ProductLead,
  ProductProcess,
  ProductProof,
  RelatedLinks
} from '@/components'

import { BenefitsEditorial, ContextEditorial, FaqEditorial, ProfilesEditorial } from './sections'

import StructuredData from '@/components/Seo/StructuredData'
import { faqSchema } from '@/components/Seo/structuredDataBuilders'

import {
  PRODUCT_AUDIENCE_LINKS,
  PRODUCT_RELATED
} from '@/pages/produtos/relatedLinks.data'

import { productGraphics } from '@/config/brandGraphics'

import { faq, howItWorks } from './data'
import { ContextualContent } from '@/components/Content'
import { NextAction } from '@/components/NextAction'

const GRAPHICS = productGraphics('consorcio-bc-energia')


const APP_URL = 'https://www.appenergia.com.br/Grupo_BC_Energia/'

const benefits = [
  {
    icon: 'economia-na-conta' as const,
    title: 'Até 25% de economia na conta de energia',
    description: 'Desconto aplicado diretamente na sua fatura de energia.'
  },
  {
    icon: 'solar-residencial' as const,
    title: 'Sem investimento em placas solares',
    description: 'Você usa energia limpa sem comprar nem instalar equipamentos.'
  },
  {
    icon: 'geracao-distribuida' as const,
    title: 'Sem mudanças na estrutura física',
    description: 'Nenhuma obra ou alteração na instalação elétrica do imóvel.'
  },
  {
    icon: 'contrato-aprovado' as const,
    title: 'Sem taxa de adesão e sem fidelidade',
    description: 'Adesão simples, sem custo inicial e sem contrato de permanência.'
  }
]

const steps = [
  {
    title: 'Geração de energia',
    description:
      'O Grupo BC Energia gera energia limpa e renovável por meio de centenas de usinas fotovoltaicas espalhadas pelo país.'
  },
  {
    title: 'Injeção na rede de distribuição',
    description:
      'Toda a energia gerada é injetada diretamente na rede de distribuição local, contribuindo para o fornecimento de eletricidade de sua região.'
  },
  {
    title: 'Créditos de energia',
    description:
      'Uma distribuidora de energia converte a quantidade de energia injetada em créditos, que são repassados ao Grupo BC Energia.'
  },
  {
    title: 'Economia na conta de luz',
    description:
      'Esses créditos são compartilhados com os consumidores alocados no consórcio, resultando em até 25% de economia na conta de energia, sem necessidade de investimento ou instalação de placas solares.'
  }
]

const audience = [
  {
    icon: 'solar-residencial' as const,
    title: 'Consumidores residenciais',
    description: 'Famílias que querem reduzir a conta de luz sem investir em placas solares.'
  },
  {
    icon: 'mercado-crescimento' as const,
    title: 'Comércios de baixa tensão',
    description: 'Operações comerciais conectadas em baixa tensão na região atendida.'
  }
]

const requirements = [
  'Consumidor de baixa tensão',
  'Conta de energia a partir de R$250,00',
  'Imóvel na mesma região da distribuidora onde a usina está conectada'
]

const SubscriptionEnergy = () => (
  <div>
    <PageHeader
      align="left"
      flush
      eyebrowRule={false}
      eyebrow="Solução para residências e comércios"
      title="Consórcio BC Energia"
      description="Se você não se enquadra nos requisitos necessários para migração para o Mercado Livre de Energia, a geração distribuída de energia surge como alternativa para reduzir os gastos com luz. Nessa modalidade, os consumidores têm a possibilidade de gerar a própria energia elétrica, gerenciar sua distribuição e aproveitar créditos com validade de até 60 meses para abater o valor da conta de consumo."
      bgImage="/img/global/energia-por-assinatura.webp"
      category="Produtos"
      cta={{ label: 'Quero economizar', href: APP_URL, target: '_blank' }}
      secondaryCta={{ label: 'Ver como funciona', href: '#como-funciona' }}
    />

    <ProductLead
      graphic={GRAPHICS.lead}
      eyebrow="O que é"
      title="Economia na conta de luz sem investir em placa solar"
      paragraphs={[
        'O Consórcio BC Energia é a solução ideal para consumidores de baixa tensão que buscam reduzir a conta de luz sem a necessidade de investir em placas solares. Com o Consórcio BC Energia, você tem até 25% de economia na conta de energia, utilizando energia limpa gerada pelas mais de 100 usinas do Grupo BC Energia, sem alterar a estrutura física do seu imóvel.',
        'Aqui, você não paga taxas de adesão, não tem fidelidade e não precisa se preocupar com mudanças na instalação elétrica. Todo o processo é simples e eficiente: a energia gerada pelas usinas é injetada na rede de distribuição e os créditos são convertidos em descontos na sua conta de luz.',
        'Se você é consumidor residencial ou comercial com conta de energia a partir de R$250,00, pode aderir ao consórcio sem complicações. Reduza seus custos com energia agora e aproveite os benefícios da energia sustentável!'
      ]}
      image={{
        src: '/img/pages/consorcio-lead.webp',
        srcSet:
          '/img/pages/consorcio-lead-600.webp 600w, /img/pages/consorcio-lead.webp 1280w',
        sizes: '(max-width: 1024px) 100vw, 58vw',
        width: 1280,
        height: 1920,
        alt: 'Casal consultando informações pelo notebook em casa',
        imageClassName: 'bc-fmt-portrait object-center'
      }}
      facts={[
        { label: 'Quem pode?', value: 'Consumidores de baixa tensão com conta a partir de R$250,00' },
        { label: 'Adesão', value: 'Sem taxa de adesão e sem fidelidade' }
      ]}
    />

    <QuickAnswers
      id="respostas-rapidas"
      title={QUICK_ANSWERS['/produtos/consorcio-bc-energia'].title}
      description={QUICK_ANSWERS['/produtos/consorcio-bc-energia'].description}
      items={QUICK_ANSWERS['/produtos/consorcio-bc-energia'].items}
      tracking="produto_consorcio"
    />

    <ProductProof
      graphic={GRAPHICS.proof}
      context="consorcio"
      title="Economia e sustentabilidade em números"
      description="Resultados do Grupo BC Energia em geração distribuída."
      link={{ label: 'Quero economizar', href: APP_URL, target: '_blank' }}
    />

    <ProductProcess
      graphic={GRAPHICS.process}
      id="como-funciona"
      eyebrow="Como funciona"
      title="Como funciona o Consórcio BC Energia"
      steps={steps}
      image={{
        src: '/img/pages/arrendamento-de-usinas-intro.webp',
        alt: 'Usina solar do Grupo BC Energia'
      }}
      note="Garanta sua economia de forma simples e sustentável com o Consórcio BC Energia."
    />

    <BenefitsEditorial
      eyebrow="Benefícios"
      title="Vantagens do Consórcio BC Energia"
      highlightValue="Até 25%"
      highlightLabel="Economia na conta de luz"
      items={benefits}
    />


    <ContextEditorial
      eyebrow="Contexto do mercado"
      title={howItWorks.title}
      description={howItWorks.description}
      items={howItWorks.itens.map((item) => ({
        title: item.title,
        description: item.description
      }))}
    />

    <ProfilesEditorial
      eyebrow="Para quem é"
      title="Quem pode aderir ao consórcio"
      items={audience}
      requirements={requirements}
    />

    <NextAction
      standalone
      prompt="Já entendeu como funciona a adesão?"
      label="Simule a economia na sua conta de energia"
      href="/simulador-de-economia"
      intent="alta"
      tracking="produto_consorcio_proxima_simulador"
    />



    {/* FAQPage: reflete exatamente as perguntas/respostas visíveis na página
        (bloco de respostas rápidas + FAQ), sem duplicar a mesma dúvida. */}
    <StructuredData
      schemas={[
        faqSchema([
          ...quickAnswerSchemaItems('/produtos/consorcio-bc-energia'),
          ...withoutCoveredFaq('/produtos/consorcio-bc-energia', faq)
            .filter((item) => typeof item.content === 'string')
            .map((item) => ({ title: item.title, content: item.content as string }))
        ])
      ]}
    />

    <FaqEditorial items={withoutCoveredFaq('/produtos/consorcio-bc-energia', faq)} tone="muted" />

    <RelatedLinks
      variant="editorial"
      eyebrow="Perfis atendidos"
      title="Para quem esta solução faz sentido"
      description="Perfis de consumo em que Consórcio BC Energia costuma ter maior impacto no custo de energia."
      items={PRODUCT_AUDIENCE_LINKS['consorcio-bc-energia']}
    />

    {/* "Entenda melhor este tema" removido: o artigo indicado já aparece no
        ContextualContent abaixo (cluster geracao-distribuida) e o hub do Blog
        passou para "Próximos passos" (PRODUCT_RELATED). */}

    <RelatedLinks
      title="Próximos passos"
      items={PRODUCT_RELATED['consorcio-bc-energia']}
    />
    <ContextualContent
      title="Entenda melhor esta solução"
      path="/produtos/consorcio-bc-energia"
      cluster="geracao-distribuida"
      trackingId="produto_consorcio"
    />


    <FormEmbed title="Entre em contato" />
  </div>
)

export default SubscriptionEnergy
