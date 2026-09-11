import { PageHeader, RelatedLinks } from '@/components'
import { ProductFaq, ProductSteps } from '@/components/Product'
import {
  RegionalAudience,
  RegionalBenefits,
  RegionalCta,
  RegionalIntro,
  RegionalProof,
  RegionalSolutions
} from '@/components/Regional'
import StructuredData from '@/components/Seo/StructuredData'
import { faqSchema } from '@/components/Seo/structuredDataBuilders'
import { Region } from '@/data/regions'
import { linkTo } from '@/config/internalLinks'
import { regionalCtaGraphic, regionalIntroGraphic, regionalProofGraphic } from '@/config/brandGraphics'
import { ContextualContent } from '@/components/Content'
import { CLUSTERS } from '@/data/content/clusters'

/** Cluster pilar das páginas regionais: energia por assinatura / GD. */
const GD_CLUSTER = CLUSTERS['geracao-distribuida']

/**
 * Template compartilhado das páginas regionais (VISUAL 13).
 *
 * O componente é comum às 7 regiões, mas TODO o texto vem de
 * `src/data/regions`. Nenhuma copy é gerada por substituição de nome de
 * cidade e nenhuma informação local (endereço, unidade, distribuidora,
 * número de clientes, economia local) é criada aqui.
 *
 * Não há schema LocalBusiness: não existe confirmação de unidade física por
 * região. Apenas o FAQPage já validado é publicado. A página fala de
 * ATENDIMENTO regional — nunca de escritório, filial ou unidade.
 */
/**
 * Hero em alta resolução para regiões cujo `coverImage` é um retrato de
 * ~500px esticado como fundo de largura total (~4× de ampliação). Fotos já
 * existentes e aderentes ao conteúdo de cada página; dados intactos
 * (`coverImage` só alimenta este hero).
 */
const REGION_HERO_OVERRIDE: Record<string, string> = {
  // 486×699 → 1920×823; o texto da página trata Rio Verde como polo agroindustrial.
  'rio-verde': '/img/pages/segmentos/agronegocio-hero.webp',
  // 584×681 → 1380×920; H1 "Energia solar por assinatura em Palmas (TO)".
  palmas: '/img/global/energia-por-assinatura.webp'
}

const RegionalPage = ({ region }: { region: Region }) => {
  const isState = region.scope === 'state'

  /** Fatos territoriais — apenas dados já presentes na rota. */
  const territoryFacts = [
    {
      label: 'Abrangência',
      value: isState
        ? `Atendimento em ${region.place} (${region.uf})`
        : `Atendimento em ${region.place}, ${region.uf}`
    },
    {
      label: 'Formato',
      value: 'Atendimento comercial remoto, a partir da análise da conta de energia.'
    },
    {
      label: 'Soluções',
      value:
        'Mercado Livre de Energia e geração distribuída, conforme o perfil de ligação da unidade consumidora.'
    }
  ]

  return (
    <div>
      <PageHeader
        align="left"
        compact
        flush
        eyebrowRule={false}
        eyebrow={isState ? `Atendimento no estado · ${region.uf}` : `Atendimento na região · ${region.uf}`}
        title={region.h1}
        description={region.heroDescription}
        bgImage={REGION_HERO_OVERRIDE[region.slug] ?? region.coverImage}
        category="Regiões"
        cta={{ label: 'Enviar minha conta para análise', href: '/contato' }}
        secondaryCta={{ label: 'Ver soluções disponíveis', href: '#solucoes' }}
      />

      <RegionalIntro
        eyebrow="Contexto regional"
        title={isState ? `Atuação em ${region.place}` : `Atendimento em ${region.place}`}
        paragraphs={region.intro}
        territory={{
          place: region.place,
          uf: region.uf,
          facts: territoryFacts,
          link: region.statePath
            ? { label: 'Ver a página estadual do Tocantins', href: region.statePath }
            : undefined
        }}
        tone="surface"
        graphic={regionalIntroGraphic(region.slug)}
      />

      <RegionalSolutions
        eyebrow="Soluções"
        title={region.solutions.heading}
        description={region.solutions.lead}
        items={region.solutions.items.map((item) => ({
          href: item.href,
          label: item.label,
          description: item.description,
          target: item.target
        }))}
        regionSlug={region.slug}
        tone="soft"
      />

      <ProductSteps
        eyebrow="Passo a passo"
        title={region.howItWorks.heading}
        description={region.howItWorks.lead}
        steps={region.howItWorks.steps}
        tone="surface"
      />

      <RegionalBenefits
        eyebrow="Diferenciais"
        title={region.why.heading}
        description={region.why.lead || undefined}
        items={region.why.items}
        tone="surface"
      />

      <RegionalAudience
        eyebrow="Perfis atendidos"
        title={region.audience.heading}
        description={region.audience.lead || undefined}
        items={region.audience.items}
        tone="soft"
      />

      <RegionalProof
        graphic={regionalProofGraphic(region.slug)}
        context="regionais"
        title="Empresas que fazem parte da trajetória do Grupo BC Energia"
        description="Marcas atendidas pelo grupo nos ambientes de contratação livre e de geração distribuída."
        link={{ label: 'Conhecer o Grupo BC Energia', href: '/sobre/quem-somos' }}
      />

      {/* FAQPage: reflete exatamente as perguntas/respostas visíveis abaixo. */}
      <StructuredData
        schemas={[
          faqSchema(
            region.faq.items.map((item) => ({ title: item.question, content: item.answer }))
          )
        ]}
      />

      <ProductFaq
        title={region.faq.heading}
        items={region.faq.items.map((item) => ({ title: item.question, content: item.answer }))}
        tone="surface"
      />

      <RelatedLinks
        variant="editorial"
        eyebrow="Continue navegando"
        title="Conteúdos e soluções relacionados"
        description="Links úteis para aprofundar a solução certa para o seu perfil de consumo."
        items={[
          // Cluster GD: toda página regional aponta para a página pilar do tema.
          ...(region.related.some((item) => item.href === GD_CLUSTER.pillarPath)
            ? []
            : [
                linkTo(GD_CLUSTER.pillarPath, {
                  description: `Energia solar por assinatura para quem consome em ${region.place}, sem obra e sem instalar placas.`
                })
              ]),
          ...region.related.map((item) => ({
            label: item.label,
            href: item.href,
            description: item.description,
            target: item.target
          })),
          // Conversão de baixa fricção: simulação antes do contato direto.
          linkTo('/simulador-de-economia', {
            description: `Estimativa de economia a partir da conta de energia em ${region.place}.`
          })
        ]}
      />

      <ContextualContent
        eyebrow="Antes de decidir"
        title="Entenda como funciona a energia por assinatura"
        cluster="geracao-distribuida"
        trackingId={`regional_${region.slug}`}
        limit={2}
      />


      <RegionalCta
        graphic={regionalCtaGraphic(region.slug)}
        eyebrow="Próximo passo"
        title={region.cta.heading}
        description={region.cta.description}
        cta={{ label: region.cta.buttonLabel, href: region.cta.buttonHref }}
        secondaryCta={{ label: 'Conhecer o Grupo BC Energia', href: '/sobre/quem-somos' }}
      />
    </div>
  )
}

export default RegionalPage
