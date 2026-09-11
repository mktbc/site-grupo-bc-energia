/**
 * Episódios REAIS do BC Cast.
 *
 * Fonte: `src/mooks/content.ts` (episódios já publicados no canal do grupo no
 * YouTube e exibidos hoje na Home). Nada aqui foi inventado:
 *  - `title` e `embedUrl` vêm do dado existente no projeto;
 *  - NÃO há `uploadDate`, `duration`, `topics` nem transcrição reais disponíveis,
 *    por isso esses campos ficam ausentes e o VideoObject NÃO é emitido
 *    (ver src/components/Seo/structuredDataBuilders.ts → videoObjectSchema).
 *
 * Para liberar indexação: preencher os campos reais e seguir
 * docs/CONTENT-INDEXING-CRITERIA.md.
 */
import type { Episode } from './types'

export const EPISODES: Episode[] = [
  {
    slug: 'tiago-mendonca',
    number: 1,
    title: 'Tiago Mendonça — Ex-Secretário de Agricultura, Pecuária e Abastecimento de Goiás',
    embedUrl: 'https://www.youtube.com/embed/vVnokGbhNPk?si=biv7wFIJmjQnLAll',
    guests: [{ name: 'Tiago Mendonça', role: 'Ex-Secretário de Agricultura, Pecuária e Abastecimento de Goiás' }],
    cluster: 'mercado-livre',
    solutionPath: '/produtos/mercado-livre-de-energia',
    segmentPaths: ['/segmentos/agronegocio']
  },
  {
    slug: 'rubens-fileti',
    number: 2,
    title: 'Rubens Fileti — Presidente da ACIEG',
    embedUrl: 'https://www.youtube.com/embed/RrcOwWEAoDY?si=TC1w4EdKkZ0cuJpD',
    guests: [{ name: 'Rubens Fileti', role: 'Presidente da ACIEG' }],
    cluster: 'mercado-livre',
    solutionPath: '/produtos/mercado-livre-de-energia'
  }
]

export const getEpisode = (slug?: string): Episode | null =>
  EPISODES.find((episode) => episode.slug === slug) ?? null

/** Episódios ordenados do mais recente para o mais antigo (por numeração real). */
export const getEpisodes = (): Episode[] =>
  [...EPISODES].sort((a, b) => (b.number ?? 0) - (a.number ?? 0))

export const getEpisodesForPath = (path: string): Episode[] =>
  getEpisodes().filter(
    (episode) => episode.solutionPath === path || episode.segmentPaths?.includes(path)
  )

/** Título completo exibido/usado em metadata (ex.: "BC Cast #01 | ..."). */
export const getEpisodeLabel = (episode: Episode): string =>
  episode.number
    ? `BC Cast #${String(episode.number).padStart(2, '0')} | ${episode.title}`
    : `BC Cast | ${episode.title}`
