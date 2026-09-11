import { PageHeader, RelatedLinks } from '@/components'
import { ContentEmptyState, ContentFeature, ContentSection } from '@/components/Content'
import { CLUSTERS } from '@/data/content/clusters'
import { getEpisodeLabel, getEpisodes } from '@/data/content/episodes'
import { CONTENT_GRAPHIC } from '@/config/brandGraphics'

/**
 * Hub do BC Cast — /conteudo/bc-cast (VISUAL 15)
 *
 * Um único macrobloco escuro (tone="dark", diferencia o formato de mídia do
 * Blog, que é claro e de leitura): contexto do projeto + episódio protagonista
 * (facade de vídeo, nenhum iframe no load) + demais episódios reais em lista
 * editorial. Sem grade de cards — o volume real são poucos episódios.
 *
 * Fonte: src/data/content/episodes.ts. Indexação: noindex,follow.
 */
const shortLabel = (number?: number) =>
  number ? `BC Cast #${String(number).padStart(2, '0')}` : 'BC Cast'

const BcCast = () => {
  const episodes = getEpisodes()
  const [featured, ...rest] = episodes

  const guestsOf = (guests?: Array<{ name: string }>) =>
    guests?.length ? `Com ${guests.map((guest) => guest.name).join(', ')}` : undefined

  return (
    <>
      <PageHeader
        title="BC Cast"
        eyebrow="Conteúdo"
        description="Conversas do Grupo BC Energia com lideranças sobre energia, mercado e desenvolvimento econômico."
        category="Conteúdo"
        align="left"
        bgImage="/img/pages/contact.webp"
      />

      {episodes.length === 0 ? (
        <ContentSection>
          <ContentEmptyState
            title="Os episódios estarão disponíveis aqui"
            description="Enquanto isso, conheça as soluções de energia do Grupo BC Energia."
            links={[
              { label: 'Mercado Livre de Energia', href: CLUSTERS['mercado-livre'].moneyPath },
              {
                label: 'Gestão de energia para empresas',
                href: CLUSTERS['gestao-de-energia'].moneyPath
              }
            ]}
          />
        </ContentSection>
      ) : (
        <ContentFeature
          graphic={CONTENT_GRAPHIC.castFeature}
          tone="dark"
          eyebrow="Sobre o projeto"
          title="O que é o BC Cast"
          description="Série de conversas do Grupo BC Energia com lideranças do setor produtivo e do setor elétrico. Energia tratada como fator de custo e de competitividade, sem jargão e sem promessa comercial."
          feature={{
            kind: shortLabel(featured.number),
            title: featured.title,
            description: featured.excerpt,
            meta: guestsOf(featured.guests),
            href: `/conteudo/bc-cast/${featured.slug}`,
            ctaLabel: 'Ver episódio',
            tracking: `bc_cast_destaque_${featured.slug}`,
            media: {
              kind: 'video' as const,
              embedUrl: featured.embedUrl,
              title: getEpisodeLabel(featured)
            }
          }}
          items={rest.map((episode) => ({
            key: episode.slug,
            kind: shortLabel(episode.number),
            title: episode.title,
            description: episode.excerpt,
            href: `/conteudo/bc-cast/${episode.slug}`,
            tracking: `bc_cast_lista_${episode.slug}`
          }))}
          listTitle={rest.length > 0 ? 'Episódios anteriores' : undefined}
        />
      )}

      <RelatedLinks
        title="Temas tratados no BC Cast"
        description="Aprofunde nos assuntos dos episódios pelas páginas de solução."
        items={[
          {
            label: CLUSTERS['mercado-livre'].cta.label,
            href: CLUSTERS['mercado-livre'].cta.href,
            description: CLUSTERS['mercado-livre'].description
          },
          {
            label: CLUSTERS['gestao-de-energia'].cta.label,
            href: CLUSTERS['gestao-de-energia'].cta.href,
            description: CLUSTERS['gestao-de-energia'].description
          },
          {
            label: 'Soluções de energia para o agronegócio',
            href: '/segmentos/agronegocio',
            description: 'Irrigação, sazonalidade e custo de energia na operação rural.'
          }
        ]}
      />
    </>
  )
}

export default BcCast
