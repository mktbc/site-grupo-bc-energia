import { useParams } from 'react-router-dom'

import NotFound from '@/pages/not-found'
import {
  FormEmbed,
  PageHeader,
  ProductSteps,
  RelatedLinks,
  SegmentBenefits,
  SegmentChallenges,
  SegmentCta,
  SegmentIntro,
  SegmentProof,
  SegmentSolutions
} from '@/components'
import { getSegmentData } from '@/data/segments'
import { getSegmentContent } from '@/data/segments/segments.content'
import { segmentNextSteps } from '@/config/internalLinks'
import { segmentChallengesGraphic, segmentCtaGraphic, segmentIntroGraphic, segmentProofGraphic } from '@/config/brandGraphics'
import { ContextualContent } from '@/components/Content'
import { NextAction } from '@/components/NextAction'
import type { ClusterId } from '@/data/content/types'

const ANALYSIS_STEPS = [
  {
    title: 'Envio da conta de energia',
    description:
      'A conta mostra tensão de ligação, demanda contratada e histórico de consumo, os dados que definem o enquadramento.'
  },
  {
    title: 'Estudo do perfil',
    description:
      'A equipe do Grupo BC Energia identifica qual solução se aplica: Mercado Livre de Energia ou geração distribuída.'
  },
  {
    title: 'Proposta e contratação',
    description:
      'As condições comerciais e as regras de contrato são apresentadas antes de qualquer assinatura.'
  }
]

/** Claim institucional já publicado no conteúdo dos segmentos. */
/**
 * Cluster editorial de cada segmento — só onde a relação temática é real.
 * Segmentos sem cluster mapeado só exibem conteúdo se houver relação direta
 * declarada no próprio conteúdo (segmentPaths).
 */
const SEGMENT_CLUSTER: Record<string, ClusterId | undefined> = {
  agronegocio: 'mercado-livre',
  industria: 'mercado-livre',
  varejo: 'mercado-livre',
  saude: 'gestao-de-energia',
  servico: 'gestao-de-energia',
  turismo: 'gestao-de-energia',
  residencial: 'geracao-distribuida',
  condominio: 'geracao-distribuida'
}

/**
 * Mídia do hero para os segmentos em split. Antes, os quatro usavam o mesmo
 * `coverUrl` (arrendamento-de-usinas.webp), e as páginas pareciam clones.
 * Todas as fotos já existiam no projeto.
 */
const SEGMENT_HERO_MEDIA: Record<string, string> = {
  'bares-e-restaurantes': '/img/pages/segmentos/bares-e-restaurantes.webp',
  educacional: '/img/pages/segmentos/educacional.webp',
  lazer: '/img/pages/segmentos/lazer-v2.webp',
  religioso: '/img/pages/segmentos/religioso.webp'
}

const INSTITUTIONAL_CLAIM =
  'Somos a maior comercializadora de energia do Centro-Oeste e uma das principais independentes do país.'

/**
 * VISUAL 12 — template compartilhado das 11 páginas de segmento.
 *
 * Ordem: Hero → contexto específico → desafios → solução → prova → processo →
 * benefícios → conversão → relacionados. Rotas, slugs, SEO, schema, tracking,
 * dados e conteúdo permanecem intactos: mudou apenas a apresentação.
 */
const Page = () => {
  const { segmento = '' } = useParams<{ segmento: string }>()

  // Dados locais empacotados na migração (antes: getSegment → API externa).
  const data = getSegmentData(segmento)
  const content = getSegmentContent(segmento)
  if (!data || !data.title) return <NotFound />

  const segmentName: string = data.title
  const introduction = data.introduction ?? {}
  const heroMediaSrc = SEGMENT_HERO_MEDIA[segmento] ?? data.coverUrl
  // Se o hero já mostra a foto da introdução, a intro fica tipográfica
  // (evita a mesma imagem duas vezes na primeira dobra).
  const introImageSrc =
    introduction.img && introduction.img !== heroMediaSrc ? introduction.img : undefined
  const benefits = (introduction.benefits ?? []) as Array<{
    title: string
    description?: string
    icon?: string
  }>

  // Agronegócio, Turismo e Residencial usam hero em banner: imagem como fundo
  // integral, sem card de imagem à direita (demais segmentos seguem o split).
  const isAgroBanner = segmento === 'agronegocio'
  const isTurismoBanner = segmento === 'turismo'
  const isResidencialBanner = segmento === 'residencial'
  const isServicoBanner = segmento === 'servico'
  const isCondominioBanner = segmento === 'condominio'
  const isSaudeBanner = segmento === 'saude'
  const isVarejoBanner = segmento === 'varejo'
  const isBanner =
    isAgroBanner ||
    isTurismoBanner ||
    isResidencialBanner ||
    isServicoBanner ||
    isCondominioBanner ||
    isSaudeBanner ||
    isVarejoBanner

  return (
    <div>
      <PageHeader
        align="left"
        flush
        eyebrowRule={false}
        variant={isBanner ? 'banner' : 'default'}
        lightOverlay={isResidencialBanner}
        bgPosition={
          isResidencialBanner
            ? 'bg-[position:48%_30%] md:bg-[position:60%_20%] lg:bg-[position:70%_8%]'
            : isServicoBanner
              ? 'bg-[position:72%_center] md:bg-[position:68%_center] lg:bg-[position:right_center]'
              : isCondominioBanner
                ? 'bg-[position:60%_center] md:bg-[position:65%_center] lg:bg-[position:right_center]'
                : isSaudeBanner
                  ? 'bg-[position:64%_center] md:bg-[position:70%_center] lg:bg-[position:center_right]'
                  : isVarejoBanner
                    ? 'bg-[position:68%_center] md:bg-[position:72%_center] lg:bg-[position:center_right]'
                    : undefined
        }

        bgImage={
          isAgroBanner
            ? '/img/pages/segmentos/agronegocio-hero.webp'
            : isTurismoBanner
              ? '/img/pages/segmentos/turismo-hero.webp'
              : isResidencialBanner
                ? '/img/pages/segmentos/residencial-hero.webp'
                : isServicoBanner
                  ? '/img/pages/segmentos/servico-hero.webp'
                  : isCondominioBanner
                    ? '/img/pages/segmentos/condominio-hero.webp'
                    : isSaudeBanner
                      ? '/img/pages/segmentos/saude-hero.webp'
                      : isVarejoBanner
                        ? '/img/pages/segmentos/varejo-hero.webp'
                        : undefined
        }


        eyebrow={content?.eyebrow}
        title={content?.h1 ?? `Soluções de energia para ${segmentName}`}
        description={content?.heroDescription || data.description}
        category="Segmentos"
        media={
          !isBanner && heroMediaSrc
            ? {
                src: heroMediaSrc,
                alt: `Operação do segmento ${segmentName.toLowerCase()} atendida pelo Grupo BC Energia`
              }
            : undefined
        }
        cta={{ label: 'Enviar minha conta para análise', href: '/contato' }}
        secondaryCta={{ label: 'Ver todos os segmentos', href: '/segmentos' }}
      />

      {content && (
        <SegmentIntro
          eyebrow={`Segmento ${segmentName}`}
          title={content.introTitle}
          paragraphs={content.introParagraphs}
          pullQuote={content.challengesLead}
          graphic={segmentIntroGraphic(segmento)}
          image={
            introImageSrc
              ? {
                  src: introImageSrc,
                  alt:
                    segmento === 'agronegocio'
                      ? 'Produtor rural utilizando tablet no campo com rebanho ao fundo'
                      : `Operação do segmento ${segmentName.toLowerCase()} atendida pelo Grupo BC Energia`
                }
              : undefined
          }
        />
      )}

      {content && (
        <SegmentChallenges
          eyebrow="Desafios"
          title={`Desafios de energia em ${segmentName.toLowerCase()}`}
          items={content.challenges}
          tone="soft"
          graphic={segmentChallengesGraphic(segmento)}
        />
      )}

      {content && (
        <SegmentSolutions
          eyebrow="Como ajudamos"
          title={content.helpTitle}
          paragraphs={content.helpParagraphs}
          hrefs={content.solutionHrefs}
          segmentSlug={segmento}
          tone="surface"
        />
      )}

      <NextAction
        standalone
        prompt="Já sabe qual solução se encaixa na sua operação?"
        label="Simule a economia na conta de energia"
        href="/simulador-de-economia"
        intent="alta"
        tracking={`segmento_${segmento}_proxima_simulador`}
      />

      <SegmentProof
        graphic={segmentProofGraphic(segmento)}
        title="A BC entende este tipo de operação"
        description={INSTITUTIONAL_CLAIM}
        link={{ label: 'Falar com um especialista', href: '/contato' }}
      />

      {content && (
        <ProductSteps
          eyebrow="Análise"
          title="Como funciona a análise"
          description={content.analysisLead}
          steps={ANALYSIS_STEPS}
          tone="muted"
        />
      )}

      <SegmentBenefits
        eyebrow="Benefícios"
        title={`Vantagens para o segmento ${segmentName.toLowerCase()}`}
        items={benefits}
        tone="surface"
      />

      {content && (
        <SegmentCta
          graphic={segmentCtaGraphic(segmento)}
          eyebrow="Próximo passo"
          title={content.nextStep}
          cta={{ label: 'Enviar minha conta para análise', href: '/contato' }}
          secondaryCta={{ label: 'Falar com um especialista', href: '#contato' }}
        />
      )}

      <RelatedLinks
        variant="editorial"
        eyebrow="Continue explorando"
        title={`Próximos passos para ${segmentName.toLowerCase()}`}
        description="Conteúdos, atendimento regional e simulação de economia relacionados a este perfil de consumo."
        items={segmentNextSteps(segmento)}
      />
      <ContextualContent
        eyebrow="Conteúdo para este perfil"
        title={`Conteúdos para ${segmentName.toLowerCase()}`}
        path={`/segmentos/${segmento}`}
        cluster={SEGMENT_CLUSTER[segmento]}
        trackingId={`segmento_${segmento}`}
        limit={2}
      />


      <FormEmbed title="Entre em contato" />
    </div>
  )
}

export default Page
