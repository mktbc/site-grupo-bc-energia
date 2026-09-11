/**
 * Fonte única de verdade das rotas públicas indexáveis.
 *
 * Consumida por:
 *  - scripts/generate-sitemap.ts (geração do public/sitemap.xml)
 *  - src/config/meta.ts (rotas marcadas como noindex)
 *
 * Regras: somente páginas públicas, com conteúdo real e URL canônica.
 * Fora daqui: /contato/enviado, /conteudo/* (conteúdo provisório),
 * /documentos/* (redirecionamentos de PDF), 404 e rotas inexistentes.
 */
import { SEGMENT_SLUGS } from '../data/segments/slugs'

/** Rotas com noindex,follow (existem e funcionam, mas não devem ser indexadas). */
export const NOINDEX_ROUTES: string[] = [
  '/contato/enviado',
  '/conteudo',
  '/conteudo/blog',
  '/conteudo/bc-cast',

  // ETAPA SEO 04 — páginas institucionais/regulatórias: continuam acessíveis
  // e linkadas, mas sem valor de aquisição orgânica (noindex,follow).
  '/sobre/leilao',
  '/sobre/fator-de-alavancagem',
  '/sobre/condicoes-gerais-varejistas',

  // SIMULADOR 01 — a indexação será avaliada após QA e validação comercial.
  '/simulador-de-economia'
]

/**
 * Redirecionamentos permanentes (301 no hosting; SPA garante o fallback).
 * Origem → destino final — nunca encadear (A → B → C).
 */
export const REDIRECTS: Record<string, string> = {
  '/produtos/irec': '/produtos/certificacao-renovavel-irec'
}

const STATIC_ROUTES: string[] = [
  '/',
  '/contato',

  '/produtos',
  '/produtos/mercado-livre-de-energia',
  '/produtos/consorcio-bc-energia',
  '/produtos/gestao-de-energia',
  '/produtos/certificacao-renovavel-irec',
  '/produtos/arrendamento-de-usinas',

  '/segmentos',

  '/sobre',
  '/sobre/quem-somos',
  '/sobre/nossas-usinas',
  '/sobre/lgpd',
  '/sobre/sustentabilidade',
  '/sobre/social',

  '/energia-solar-goiania',
  '/energia-solar-anapolis',
  '/energia-solar-aparecida-de-goiania',
  '/energia-solar-em-rio-verde',
  '/energia-solar-trindade',
  '/energia-solar-palmas',
  '/energia-solar-no-tocantins'
]

/** Rotas de segmento existentes (derivadas dos dados reais em src/data/segments). */
export const SEGMENT_ROUTES: string[] = SEGMENT_SLUGS.map((slug) => `/segmentos/${slug}`)

export const INDEXABLE_ROUTES: string[] = [...STATIC_ROUTES, ...SEGMENT_ROUTES]

/**
 * ETAPA SEO 06 — rotas conhecidas (whitelist).
 *
 * Qualquer pathname fora desta lista é tratado como Not Found: metadata
 * própria, robots noindex,nofollow e SEM canonical (nunca a canonical da Home).
 */
const DOCUMENT_ROUTES: string[] = [
  '/documentos/campanha_com_fidelidade_2anos',
  '/documentos/campanha_sem_fidelidade',
  '/documentos/condicoes_gerais_gd',
  '/documentos/condicoes_gerais_gd_v2',
  '/documentos/condicoes_gerais_gd_alta_tensao',
  '/documentos/condicoes_gerais_gd_externo'
]

/** Redirecionamentos de documentos (origem → PDF estático). */
export const DOCUMENT_REDIRECTS: Record<string, string> = Object.fromEntries(
  DOCUMENT_ROUTES.map((route) => [route, `/docs/${route.split('/').pop()}.pdf`])
)

/** Rotas estáticas conhecidas (index + noindex + redirects + documentos). */
export const KNOWN_ROUTES: string[] = [
  ...INDEXABLE_ROUTES,
  ...NOINDEX_ROUTES,
  ...Object.keys(REDIRECTS),
  ...DOCUMENT_ROUTES
]

const normalize = (pathname: string): string => {
  const clean = (pathname || '/').split('?')[0].split('#')[0]
  return clean !== '/' && clean.endsWith('/') ? clean.slice(0, -1) : clean
}

/**
 * `true` quando a URL corresponde a uma rota real da aplicação.
 * Rotas dinâmicas de conteúdo (/conteudo/blog/:slug e /conteudo/bc-cast/:slug)
 * são validadas contra os dados reais em `meta-content.ts` — aqui apenas
 * reconhecemos o padrão para que a checagem de slug ocorra lá.
 */
export const isKnownRoute = (pathname: string): boolean => {
  const path = normalize(pathname)
  if (KNOWN_ROUTES.includes(path)) return true
  return /^\/conteudo\/(blog|bc-cast)\/[^/]+$/.test(path)
}
