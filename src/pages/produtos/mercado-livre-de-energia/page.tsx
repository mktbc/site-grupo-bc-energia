import { QuickAnswers } from '@/components/QuickAnswers'
import { QUICK_ANSWERS, quickAnswerSchemaItems, withoutCoveredFaq } from '@/data/quickAnswers'
import {
  PageHeader,
  ProductFaq,
  ProductFormSection,
  ProductProcess,
  RelatedLinks
} from '@/components'
import LeadInstitucional from './LeadInstitucional'
import ProofInstitucional from './ProofInstitucional'
import { BenefitsEditorial, MarketContext, PortfolioEditorial, ProfilesEditorial } from './sections'

import { FormularioMercadoLivre } from '@/components/Forms'

import { ContextualContent } from '@/components/Content'
import { NextAction } from '@/components/NextAction'
import StructuredData from '@/components/Seo/StructuredData'
import { faqSchema } from '@/components/Seo/structuredDataBuilders'

import { PRODUCT_AUDIENCE_LINKS, PRODUCT_RELATED } from '@/pages/produtos/relatedLinks.data'

import { productGraphics } from '@/config/brandGraphics'

import { checklistItems, faq, howItWorks } from './data'

const GRAPHICS = productGraphics('mercado-livre-de-energia')

/**
 * VISUAL 11 — template de produto (narrativa orientada à decisão).
 *
 * Ordem: Hero → Proposta → Prova → Como funciona → Benefícios/Detalhe →
 * Para quem → Portfólio → FAQ → Relacionados → Conversão.
 * Nenhum dado comercial foi criado ou alterado.
 */


const benefits = [
  {
    icon: 'economia-na-conta' as const,
    title: 'Redução dos custos com energia',
    description:
      'As empresas poderão negociar diretamente com os fornecedores, resultando na diminuição dos custos de energia.'
  },
  {
    icon: 'gestao-energia-renovavel' as const,
    title: 'Maior flexibilidade na gestão da energia',
    description:
      'Flexibilidade para escolha de fontes, fornecedores e até modulação do contrato de energia.'
  },
  {
    icon: 'mercado-crescimento' as const,
    title: 'Aumento da competitividade',
    description:
      'A redução dos custos operacionais com energia gera a oportunidade para as empresas se fortalecerem no mercado.'
  },
  {
    icon: 'contrato-aprovado' as const,
    title: 'Previsibilidade orçamentária',
    description:
      'No mercado livre é possível comprar energia para anos posteriores e, assim, não sofrer com as oscilações do valor da energia.'
  }
]

const steps = [
  {
    title: 'Análise de viabilidade econômica',
    description:
      'Nossos especialistas realizam uma análise competente da viabilidade econômica de migração, evitando qualquer tipo de riscos ou investimentos desnecessários.'
  },
  {
    title: 'Assessoria completa na adesão',
    description:
      'Assessoria completa para adesão ao Mercado Livre e contratação de energia, antes, durante e depois do processo de migração.'
  },
  {
    title: 'Gestão e acompanhamento',
    description:
      'Relatórios de acompanhamento mensal e análises das alterações regulatórias, incluindo representação e registro junto à CCEE.'
  }
]

const audience = [
  {
    icon: 'eficiencia-energetica' as const,
    title: 'Indústrias',
    description: 'Operações com alto consumo e demanda contratada em alta tensão.'
  },
  {
    icon: 'mercado-crescimento' as const,
    title: 'Comércios',
    description: 'Redes e operações comerciais que buscam previsibilidade no custo da energia.'
  },
  {
    icon: 'contrato-aprovado' as const,
    title: 'Instituições',
    description: 'Organizações que precisam de contratos de energia ajustados ao seu consumo.'
  }
]

const requirements = [
  'Consumidores conectados em média e alta tensão (Grupo A)',
  'Demanda contratada junto à distribuidora local',
  'Disposição para uma gestão mais ativa do contrato de energia'
]

const FreeEnergyMarket = () => (
  <div>
    <PageHeader
      align="left"
      flush
      eyebrowRule={false}
      eyebrow="Solução para empresas"
      title="Mercado livre de energia"
      description="O Mercado Livre de Energia dá ao consumidor poder de escolha sobre o fornecedor de energia elétrica, gerando um ambiente competitivo e, consequentemente, com preços mais baixos."
      bgImage="/img/global/mercado-livre-de-energia.webp"
      category="Produtos"
      cta={{ label: 'Enviar minha conta para análise', href: '#contato' }}
      secondaryCta={{ label: 'Ver como funciona', href: '#como-funciona' }}
    />

    <LeadInstitucional
      graphic={GRAPHICS.lead}
      eyebrow="O que é"
      title="Liberdade para negociar a energia da sua empresa"
      paragraphs={[
        <>
          A BC Energia é uma das maiores comercializadoras independentes do Brasil, movimentando{' '}
          <strong className="font-semibold text-bc-primary">mais de 150 mil GWh</strong>. Oferecemos as
          melhores condições em compra e venda de energia, com credibilidade, segurança e a experiência de
          quem atua no mercado livre de energia{' '}
          <strong className="font-semibold text-text-primary">desde 2014</strong>.
        </>,
        'Nossa equipe multidisciplinar de especialistas, munida de ferramentas de ponta, presta uma assessoria completa antes, durante e depois do processo de migração, incluindo a gestão estratégica da contratação de energia.'
      ]}
      image={{
        src: '/img/pages/mercado-livre-torre-transmissao.webp',
        sizes: '(max-width: 1024px) 100vw, 55vw',
        alt: 'Torre de transmissão de energia elétrica ao pôr do sol'
      }}
      facts={[
        {
          icon: 'eficiencia-energetica',
          label: 'Quem pode?',
          value: 'Consumidores conectados em alta tensão (Grupo A)'
        },
        { icon: 'energia-global', label: 'Onde atendemos?', value: 'Todo o Brasil' }
      ]}
    />


    <QuickAnswers
      id="respostas-rapidas"
      title={QUICK_ANSWERS['/produtos/mercado-livre-de-energia'].title}
      description={QUICK_ANSWERS['/produtos/mercado-livre-de-energia'].description}
      items={QUICK_ANSWERS['/produtos/mercado-livre-de-energia'].items}
      tracking="produto_mercado_livre"
    />

    <ProofInstitucional
      graphic={GRAPHICS.proof}
      context="mercado_livre"
      title="Economia com eficiência e responsabilidade ambiental"
      description="Números do Grupo BC Energia no mercado de comercialização de energia."
      link={{ label: 'Quero economizar', href: '#contato' }}
    />

    <ProductProcess
      graphic={GRAPHICS.process}
      id="como-funciona"
      eyebrow="Como funciona"
      title="Da análise de viabilidade à gestão do contrato"
      description="Assessoria completa em todas as etapas da migração para o Ambiente de Contratação Livre."
      steps={steps}
      image={{
        src: howItWorks.imgUrl,
        alt: 'Como funciona o Mercado Livre de Energia'
      }}
      note={howItWorks.checkItem}
    />

    <BenefitsEditorial
      eyebrow="Benefícios"
      title="O que muda para a sua empresa"
      items={benefits}
    />

    <MarketContext
      eyebrow="Contexto do mercado"
      title="Principais aspectos do Ambiente de Contratação Livre"
      description={howItWorks.description}
      participants={howItWorks.itens.find((item) => item.title === 'Participantes')}
      items={howItWorks.itens
        .filter((item) => item.title !== 'Participantes')
        .map((item) => ({ title: item.title, description: item.description }))}
    />

    <ProfilesEditorial
      eyebrow="Para quem é"
      title="Perfis atendidos pelo Mercado Livre"
      items={audience}
      requirements={requirements}
    />

    <NextAction
      standalone
      prompt="Já sabe que a sua empresa se encaixa nesses perfis?"
      label="Conheça a Gestão de Energia que acompanha o contrato"
      href="/produtos/gestao-de-energia"
      intent="media"
      tracking="produto_mercado_livre_proxima_gestao"
    />

    <PortfolioEditorial
      eyebrow="Portfólio"
      title="Modalidades de contrato que negociamos"
      description="Uma das maiores empresas do setor energético do país, o Grupo BC Energia oferece soluções personalizadas e eficientes para reduzir os gastos com energia em sua empresa ou residência."
      items={checklistItems}
    />

    {/* FAQPage: reflete exatamente as perguntas/respostas visíveis na página
        (bloco de respostas rápidas + FAQ), sem duplicar a mesma dúvida. */}
    <StructuredData
      schemas={[
        faqSchema([
          ...quickAnswerSchemaItems('/produtos/mercado-livre-de-energia'),
          ...withoutCoveredFaq('/produtos/mercado-livre-de-energia', faq)
            .filter((item) => typeof item.content === 'string')
            .map((item) => ({ title: item.title, content: item.content as string }))
        ])
      ]}
    />

    <ProductFaq items={withoutCoveredFaq('/produtos/mercado-livre-de-energia', faq)} tone="surface" />

    {/* Conversão antes da navegação de apoio (a página era a mais longa do
        site e o formulário vinha depois de quatro blocos de links). */}
    <ProductFormSection
      title="Envie sua conta para análise"
      description="Nossos especialistas avaliam a viabilidade da migração e retornam com um diagnóstico do seu consumo."
    >
      <FormularioMercadoLivre solucao="mercado_livre" />
    </ProductFormSection>


    <RelatedLinks
      variant="editorial"
      eyebrow="Perfis atendidos"
      title="Para quem esta solução faz sentido"
      description="Perfis de consumo em que Mercado Livre de Energia costuma ter maior impacto no custo de energia."
      items={PRODUCT_AUDIENCE_LINKS['mercado-livre-de-energia']}
    />

    {/* "Entenda melhor este tema" (PRODUCT_CONTENT_LINKS) foi removido: o
        episódio que ele indicava já aparece no ContextualContent abaixo e o
        hub do Blog passou para "Próximos passos" (PRODUCT_RELATED). */}
    <RelatedLinks
      variant="index-cards"
      title="Próximos passos"
      description="Conteúdos e soluções complementares para aprofundar a navegação e conectar o tema às páginas estratégicas do site."
      items={PRODUCT_RELATED['mercado-livre-de-energia']}
    />
    <ContextualContent
      title="Entenda melhor esta solução"
      path="/produtos/mercado-livre-de-energia"
      cluster="mercado-livre"
      trackingId="produto_mercado_livre"
    />

  </div>
)

export default FreeEnergyMarket
