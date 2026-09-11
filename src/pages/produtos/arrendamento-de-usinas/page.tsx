import { QuickAnswers } from '@/components/QuickAnswers'
import { QUICK_ANSWERS } from '@/data/quickAnswers'
import {
  PageHeader,
  ProductFormSection,
  ProductLead,
  ProductPoints,
  ProductProcess,
  ProductProof,
  RelatedLinks
} from '@/components'

import { FormularioParceiro } from '@/components/Forms'

import {
  PRODUCT_AUDIENCE_LINKS,
  PRODUCT_CONTENT_LINKS,
  PRODUCT_RELATED
} from '@/pages/produtos/relatedLinks.data'

import { productGraphics } from '@/config/brandGraphics'

import { benefits, howItWorks } from './data'
import { ContextualContent } from '@/components/Content'
import { NextAction } from '@/components/NextAction'

const GRAPHICS = productGraphics('arrendamento-de-usinas')

const PlantLeasing = () => (
  <div>
    <PageHeader
      align="left"
      flush
      eyebrowRule={false}
      eyebrow="Para proprietários de usinas"
      title="Arrendamento de usinas"
      description="Arrendamos a sua usina solar pronta ou prestes a entrar em operação. O Grupo BC Energia assume toda a gestão comercial enquanto você foca na manutenção e na geração."
      bgImage="/img/global/arrendamento-de-usinas.webp"
      category="Produtos"
      cta={{ label: 'Quero arrendar minha usina', href: '#contato' }}
      secondaryCta={{ label: 'Ver como funciona', href: '#como-funciona' }}
    />

    <ProductLead
      graphic={GRAPHICS.lead}
      eyebrow="O que é"
      title="Renda garantida sem complicações"
      paragraphs={[
        'Você é proprietário de uma usina solar e busca uma maneira de maximizar seus lucros sem complicações? Nosso serviço de arrendamento de usinas solares oferece uma oportunidade única de aumentar sua rentabilidade enquanto cuidamos de toda a parte comercial.',
        'Nós cuidamos de toda a parte comercial, desde a prospecção de clientes até a gestão dos contratos, enquanto você foca apenas na manutenção da usina.',
        'Com a concessão de usinas solares, você transforma sua usina em uma fonte de renda passiva. Quanto mais sua usina gerar energia, mais você ganha. O Grupo BC Energia se encarrega de captar e gerenciar clientes, garantindo um fluxo constante de consumo, sem que você precise se envolver na parte operacional ou administrativa.'
      ]}
      image={{
        src: '/img/pages/arendamento-de-usinas-intro.webp',
        sizes: '(max-width: 1024px) 100vw, 58vw',
        alt: 'Usina solar arrendada pelo Grupo BC Energia'
      }}
      facts={[
        { label: 'Parcerias', value: 'Mais de 70 parceiros em projetos de usinas arrendadas' },
        { label: 'Gestão comercial', value: 'Prospecção e contratos por conta da BC Energia' }
      ]}
    />

    <QuickAnswers
      id="respostas-rapidas"
      title={QUICK_ANSWERS['/produtos/arrendamento-de-usinas'].title}
      description={QUICK_ANSWERS['/produtos/arrendamento-de-usinas'].description}
      items={QUICK_ANSWERS['/produtos/arrendamento-de-usinas'].items}
      tracking="produto_arrendamento"
    />

    <ProductProof
      graphic={GRAPHICS.proof}
      context="arrendamento"
      title="Alguns números do Grupo BC Energia"
      description="A base de clientes e a operação que sustentam a receita da sua usina."
      link={{ label: 'Quero arrendar minha usina', href: '#contato' }}
    />

    <ProductProcess
      graphic={GRAPHICS.process}
      id="como-funciona"
      eyebrow="Como funciona"
      title="Como funciona o arrendamento"
      steps={howItWorks.map((item) => ({
        title: item.title.replace(/:$/, ''),
        description: item.description
      }))}
      image={{
        src: '/img/pages/arendamento-de-usinas-intro.webp',
        alt: 'Operação de usina solar arrendada'
      }}
      note="Aumente sua rentabilidade com segurança e sem complicações."
    />

    <ProductPoints
      eyebrow="Benefícios"
      title="Vantagens do arrendamento de usinas solares"
      items={benefits.map((item) => ({
        title: item.title.replace(/:$/, ''),
        description: item.description
      }))}
    />


    <RelatedLinks
      title="Próximos passos"
      items={PRODUCT_RELATED['arrendamento-de-usinas']}
    />
    <NextAction
      standalone
      prompt="Quer ver a estrutura de geração por trás do arrendamento?"
      label="Conheça os complexos de geração do Grupo BC Energia"
      href="/sobre/nossas-usinas"
      intent="baixa"
      tracking="produto_arrendamento_proxima_usinas"
    />
    <ContextualContent
      title="Aprofunde o tema de geração e usinas"
      path="/produtos/arrendamento-de-usinas"
      cluster="usinas-arrendamento"
      trackingId="produto_arrendamento"
    />


    <ProductFormSection
      title="Entre em contato"
      description="Preencha o formulário abaixo e um de nossos consultores entrará em contato para fornecer mais informações e ajudar você a iniciar essa parceria vantajosa."
    >
      <FormularioParceiro solucao="arrendamento" />
    </ProductFormSection>
  </div>
)

export default PlantLeasing
