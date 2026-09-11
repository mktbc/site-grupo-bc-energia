/**
 * Registro leve das páginas regionais (identificação, sem conteúdo).
 *
 * PERFORMANCE 02 — `src/data/regions/index.ts` carrega ~38 KB de conteúdo
 * editorial das 7 páginas regionais. O tracking (`lib/analytics/pageType.ts`)
 * roda em todas as rotas e só precisa de slug/path/UF/escopo, então importava
 * todo esse conteúdo para o bundle inicial.
 *
 * Os valores abaixo espelham exatamente os campos correspondentes em
 * `src/data/regions/index.ts` — nenhum dado novo.
 */
export type RegionRegistryEntry = {
  slug: string
  path: string
  scope: 'city' | 'state'
  uf: string
  place: string
}

export const REGION_REGISTRY: RegionRegistryEntry[] = [
  { slug: 'goiania', path: '/energia-solar-goiania', scope: 'city', uf: 'GO', place: 'Goiânia' },
  { slug: 'anapolis', path: '/energia-solar-anapolis', scope: 'city', uf: 'GO', place: 'Anápolis' },
  {
    slug: 'aparecida-de-goiania',
    path: '/energia-solar-aparecida-de-goiania',
    scope: 'city',
    uf: 'GO',
    place: 'Aparecida de Goiânia'
  },
  {
    slug: 'rio-verde',
    path: '/energia-solar-em-rio-verde',
    scope: 'city',
    uf: 'GO',
    place: 'Rio Verde'
  },
  { slug: 'trindade', path: '/energia-solar-trindade', scope: 'city', uf: 'GO', place: 'Trindade' },
  { slug: 'palmas', path: '/energia-solar-palmas', scope: 'city', uf: 'TO', place: 'Palmas' },
  {
    slug: 'tocantins',
    path: '/energia-solar-no-tocantins',
    scope: 'state',
    uf: 'TO',
    place: 'Tocantins'
  }
]
