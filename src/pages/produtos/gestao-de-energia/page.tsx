import { QuickAnswers } from '@/components/QuickAnswers'
import { QUICK_ANSWERS } from '@/data/quickAnswers'
import {
  PageHeader,
  ProductFormSection,
  ProductHighlight,
  ProductLead,
  ProductPoints,
  ProductProof,
  RelatedLinks
} from '@/components'

import { FormularioMercadoLivre } from '@/components/Forms'

import {
  PRODUCT_AUDIENCE_LINKS,
  PRODUCT_CONTENT_LINKS,
  PRODUCT_RELATED
} from '@/pages/produtos/relatedLinks.data'

import { productGraphics } from '@/config/brandGraphics'

import { checklistItems } from './data'
import { ContextualContent } from '@/components/Content'
import { NextAction } from '@/components/NextAction'

const GRAPHICS = productGraphics('gestao-de-energia')

const benefits = [
  {
    icon: 'monitoramento-consumo' as const,
    title: 'Dados de energia em tempo real',
    description: 'Consulta do consumo por plataformas eletrônicas, com informação sempre atualizada.'
  },
  {
    icon: 'eficiencia-energetica' as const,
    title: 'Eficiência no processo produtivo',
    description:
      'Gerenciamento energético aplicado à sua operação, buscando o melhor aproveitamento com o menor custo.'
  },
  {
    icon: 'mercado-crescimento' as const,
    title: 'Inteligência de mercado',
    description:
      'Acompanhamento das oportunidades de contratação e das alterações regulatórias do setor.'
  },
  {
    icon: 'gestao-energia-renovavel' as const,
    title: 'Equipe especializada',
    description: 'Engenheiros e técnicos dedicados ao acompanhamento da sua gestão energética.'
  }
]

const PowerManagement = () => (
  <div>
    <PageHeader
      align="left"
      flush
      eyebrowRule={false}
      variant="banner"
      bgPosition="bg-[position:70%_42%] md:bg-[position:74%_center] lg:bg-[position:78%_center]"
      eyebrow="Consultoria para empresas"
      title="Gestão de Energia"
      description="Profissionais qualificados e tecnologia de gestão para reduzir os custos de energia da sua empresa, com acompanhamento contínuo do consumo e dos contratos."
      bgImage="/img/pages/gestao-de-energia-hero.webp"
      category="Produtos"
      cta={{ label: 'Enviar minha conta para análise', href: '#contato' }}
    />

    <ProductLead
      graphic={GRAPHICS.lead}
      eyebrow="O que é"
      title="Profissionais qualificados que ajudam sua empresa a reduzir custos com energia"
      paragraphs={[
        'Combinamos know-how e tecnologia para oferecer uma consultoria capaz de encontrar as melhores soluções relacionadas à gestão da sua geração e consumo de energia. Somos a Empresa de Gestão de Energia ideal para as suas necessidades de economia.',
        'Além de auxiliar na migração e gestão de contas no Mercado Livre de Energia, a BC Serviços conta com uma equipe multidisciplinar de experts com grande experiência no mercado. Assim, prestamos uma consultoria personalizada cuja consequência é uma redução ampla do valor da conta de luz.'
      ]}
      image={{
        src: '/img/pages/gestao-de-energia-lead.webp',
        srcSet:
          '/img/pages/gestao-de-energia-lead-600.webp 600w, /img/pages/gestao-de-energia-lead.webp 1280w',
        sizes: '(max-width: 1024px) 100vw, 58vw',
        alt: 'Profissional analisando dados e indicadores de gestão em ambiente corporativo',
        imageClassName: 'bc-fmt-portrait object-center'
      }}
      facts={[
        { label: 'Potencial de redução', value: 'Até 25% nas despesas com conta e consumo' },
        { label: 'Ferramenta', value: 'Sistema de Gerenciamento de Energia' }
      ]}
    />

    <QuickAnswers
      id="respostas-rapidas"
      title={QUICK_ANSWERS['/produtos/gestao-de-energia'].title}
      description={QUICK_ANSWERS['/produtos/gestao-de-energia'].description}
      items={QUICK_ANSWERS['/produtos/gestao-de-energia'].items}
      tracking="produto_gestao"
    />

    <ProductProof
      graphic={GRAPHICS.proof}
      context="gestao_energia"
      title="Volume negociado e faturamento anual"
      description="Escala do Grupo BC Energia na gestão e comercialização de energia."
      link={{ label: 'Falar com um especialista', href: '#contato' }}
    />

    <ProductPoints
      eyebrow="Benefícios"
      title="Vantagens da BC Serviços"
      description="Além de especialistas no mercado de energia, contamos com um software qualificado para gestão de energia que tem tudo para reduzir os seus custos."
      items={benefits}
    />

    <ProductHighlight
      tone="muted"
      eyebrow="Escopo do serviço"
      title="O que está incluído na gestão"
      items={checklistItems}
    />

    <NextAction
      standalone
      prompt="Quer saber se essa solução faz sentido para a sua operação?"
      label="Veja soluções por segmento de consumo"
      href="/segmentos"
      intent="media"
      tracking="produto_gestao_proxima_segmentos"
    />


    <RelatedLinks
      variant="editorial"
      eyebrow="Perfis atendidos"
      title="Para quem esta solução faz sentido"
      description="Perfis de consumo em que Gestão de Energia costuma ter maior impacto no custo de energia."
      items={PRODUCT_AUDIENCE_LINKS['gestao-de-energia']}
    />

    <RelatedLinks
      variant="editorial"
      eyebrow="Antes de decidir"
      title="Entenda melhor este tema"
      items={PRODUCT_CONTENT_LINKS['gestao-de-energia']}
    />

    <RelatedLinks
      title="Próximos passos"
      items={PRODUCT_RELATED['gestao-de-energia']}
    />
    <ContextualContent
      title="Antes de decidir, aprofunde este tema"
      path="/produtos/gestao-de-energia"
      cluster="gestao-de-energia"
      trackingId="produto_gestao"
    />


    <ProductFormSection
      title="Fale com um especialista"
      description="Nossa consultoria em gestão de energia analisa o seu perfil de consumo e indica os caminhos de economia."
    >
      <FormularioMercadoLivre solucao="gestao_energia" />
    </ProductFormSection>
  </div>
)

export default PowerManagement
