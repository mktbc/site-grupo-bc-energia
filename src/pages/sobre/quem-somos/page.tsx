import {
  Customers,
  InstitutionalCta,
  InstitutionalHighlights,
  InstitutionalIntro,
  InstitutionalSection,
  InstitutionalValues,
  PageHeader,
  RelatedLinks,
  SectionHeader
} from '@/components'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import { COMPANY_METRICS } from '@/data/companyMetrics'
import { POWER_PLANT_COUNT } from '@/data/powerPlants'

import { content, features, resources } from './data'

/**
 * /sobre/quem-somos — principal página institucional (VISUAL 14).
 *
 * Narrativa em macroblocos: quem somos → estrutura e números → propósito,
 * missão e visão → pessoas e cultura → prova → fechamento. Todo o texto,
 * o vídeo e as imagens já existiam: apenas hierarquia, ritmo e transições
 * foram refinados.
 */
const [intro] = content
const introParagraphs = String(intro?.description ?? '')
  .split('\n \n')
  .map((paragraph: string) => paragraph.trim())
  .filter(Boolean)

const WhoWeAre = () => (
  <div className="min-h-screen">
    <PageHeader
      align="left"
      flush
      eyebrowRule={false}
      eyebrow="Quem somos"
      title="O Grupo BC Energia"
      description="Excelência em comercialização de energia elétrica no Brasil."
      bgImage="/img/global/arrendamento-de-usinas.webp"
      category="Sobre"
    />

    <InstitutionalIntro
      graphic={{ variant: 'loops', tone: 'teal', size: 'small', position: 'right', opacity: 0.035 }}
      eyebrow="Institucional"
      title={intro?.title ?? 'Conheça mais sobre nós'}
      paragraphs={introParagraphs}
      wideImage
      image={{
        src: '/img/pages/sobre-nos-equipe.webp',
        alt: 'Equipe do Grupo BC Energia reunida em encontro interno',
        width: 1600,
        height: 1000,
        aspect: '16 / 10'
      }}
      belowImage={
      <ul className="grid grid-cols-2 gap-x-5 gap-y-4 lg:grid-cols-4 lg:gap-x-6">
        {features.map((feature) => (
          <li key={feature.id} className="flex min-h-[28px] items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-[22px] w-[22px] shrink-0 items-center justify-center"
            >
              <img
                src={typeof feature.icon === 'string' ? feature.icon : feature.icon.url}
                alt=""
                width={48}
                height={48}
                className="h-full w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="t-label leading-[1.35] text-text-primary">
              {feature.title}
            </span>
          </li>
        ))}
      </ul>
      }
    />


    {/* Estrutura e números: prova antes da narrativa de propósito. */}
    <InstitutionalSection tone="soft" id="estrutura">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <SectionHeader
            eyebrow="Estrutura"
            title="Geração própria e atuação no mercado livre"
            description={`Além da comercialização, o grupo opera ${POWER_PLANT_COUNT} complexos de geração renovável por meio da BC Renováveis.`}
          />

          <p className="mt-5 max-w-[56ch] t-body-sm text-text-secondary">
            Usinas fotovoltaicas de estrutura fixa e tracker e centrais geradoras hidrelétricas,
            detalhadas na página Nossas Usinas.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-[12px] bg-surface-muted sm:max-w-[340px]">
            <YouTubeEmbed
              className="h-full w-full"
              height="100%"
              thumbnailSrc="https://i.ytimg.com/vi/Qb5nHG5VBTc/oardefault.jpg"
              url="https://www.youtube.com/embed/Qb5nHG5VBTc"
              title="Vídeo institucional do Grupo BC Energia"
            />
          </div>
        </div>

      </div>
    </InstitutionalSection>

    <InstitutionalHighlights
      eyebrow="Resultados"
      title="A dimensão da nossa operação"
      items={COMPANY_METRICS.map((metric) => ({ ...metric }))}
      tone="dark"
    />

    <InstitutionalValues
      eyebrow={resources.subtitle}
      title={resources.title}
      description={resources.description}
      items={resources.items
        .filter((item) => item.title !== 'Valores')
        .map((item) => ({ title: item.title, description: item.description }))}
      values={(resources.items.find((item) => item.title === 'Valores')?.description ?? '')
        .split(';')
        .map((value) => value.replace('.', '').trim())
        .filter(Boolean)}
      tone="surface"
    />

    <InstitutionalIntro
      graphic={{ variant: 'diagonal', tone: 'teal', size: 'small', position: 'bottom-left', opacity: 0.05 }}
      eyebrow="Pessoas e cultura"
      title="Uma parceria construída sobre valores"
      paragraphs={[
        'Escolher o Grupo BC Energia significa optar por uma parceria baseada em valores fundamentais como respeito, comprometimento, transparência e aprendizagem. Somos mais do que uma empresa de energia elétrica: somos um grupo movido pela inovação responsável, pela segurança e pelo trabalho coletivo.',
        'A nossa energia gera valor porque acreditamos no poder do conhecimento compartilhado e na força da unidade.'
      ]}
      image={{
        src: resources.img,
        alt: 'Time do Grupo BC Energia em reunião de trabalho',
        width: 1200,
        height: 800
      }}
      imagePosition="left"
      tone="soft"
    />

    <Customers variant="grid" />

    <RelatedLinks
      variant="editorial"
      eyebrow="Continue navegando"
      title="Continue conhecendo o grupo"
      items={[
        {
          label: 'Conheça a nossa estrutura de geração',
          href: '/sobre/nossas-usinas',
          description: `Os ${POWER_PLANT_COUNT} complexos operados pela BC Renováveis.`
        },
        {
          label: 'Veja nossas práticas de sustentabilidade',
          href: '/sobre/sustentabilidade',
          description: 'Energia renovável, conservação ambiental e impacto evitado.'
        },
        {
          label: 'Conheça as nossas ações sociais',
          href: '/sobre/social',
          description: 'A parceria com a Associação Bloomy e o Projeto SER.'
        }
      ]}
    />

    <InstitutionalCta
      eyebrow="Fale com a BC"
      title="Quer conversar com o nosso time?"
      cta={{ label: 'Conhecer nossas soluções', href: '/produtos' }}
      secondaryCta={{ label: 'Falar com a BC Energia', href: '/contato' }}
    />
  </div>
)

export default WhoWeAre
