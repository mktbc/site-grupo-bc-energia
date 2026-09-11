/**
 * Classificação de página derivada exclusivamente da rota.
 * Evita dezenas de condições espalhadas pelos componentes.
 */
import { getRouteMeta } from '@/config/meta'
import { REGION_REGISTRY } from '@/data/regions/registry'
import { SEGMENT_NAMES } from '@/data/segments/slugs'

import type { EventContext, PageType } from './types'

const REGION_BY_PATH = REGION_REGISTRY.reduce<Record<string, (typeof REGION_REGISTRY)[number]>>(
  (acc, region) => {
    acc[region.path] = region
    return acc
  },
  {}
)

const normalize = (pathname: string): string =>
  pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

export const getPageType = (pathname: string): PageType => {
  const path = normalize(pathname)

  if (path === '/') return 'home'
  if (path === '/simulador-de-economia') return 'simulator'
  if (path === '/contato') return 'contact'
  if (path === '/contato/enviado') return 'success'
  if (path.startsWith('/produtos')) return 'solution'
  if (path.startsWith('/segmentos')) return 'segment'
  if (REGION_BY_PATH[path]) return 'regional'
  if (path.startsWith('/sobre')) return 'institutional'
  if (path.startsWith('/conteudo')) return 'content'
  return 'other'
}

/** Slug da solução (páginas /produtos/*), quando aplicável. */
export const getSolution = (pathname: string): string | undefined => {
  const path = normalize(pathname)
  if (!path.startsWith('/produtos/')) return undefined
  return path.replace('/produtos/', '') || undefined
}

/** Slug do segmento (páginas /segmentos/*), quando aplicável. */
export const getSegment = (pathname: string): string | undefined => {
  const path = normalize(pathname)
  if (!path.startsWith('/segmentos/')) return undefined
  const slug = path.replace('/segmentos/', '')
  return slug && SEGMENT_NAMES[slug] ? slug : undefined
}

/** Região DA PÁGINA (nunca a localização física do visitante). */
export const getRegion = (pathname: string) => REGION_BY_PATH[normalize(pathname)]

/**
 * Contexto comum de qualquer evento na rota atual.
 * Campos não aplicáveis são omitidos (nunca `undefined` explícito).
 */
export const getPageContext = (pathname?: string): EventContext => {
  const path = normalize(pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '/'))
  const ctx: EventContext = {
    page_path: path,
    page_type: getPageType(path)
  }

  // Título vem da config de metadata (determinístico) e não de document.title,
  // que pode estar defasado no instante da troca de rota no SPA.
  const metaTitle = getRouteMeta(path)?.title
  if (metaTitle) ctx.page_title = metaTitle
  else if (typeof document !== 'undefined' && document.title) ctx.page_title = document.title

  const solution = getSolution(path)
  if (solution) ctx.solution = solution

  const segment = getSegment(path)
  if (segment) ctx.segment = segment

  const region = getRegion(path)
  if (region) {
    ctx.region = region.slug
    if (region.uf) ctx.region_uf = region.uf
    if (region.scope === 'city' && region.place) ctx.region_city = region.place
  }

  return ctx
}
