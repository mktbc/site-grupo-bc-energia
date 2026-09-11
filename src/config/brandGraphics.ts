import type { SectionGraphic } from '@/components/Product/ProductSection'

/**
 * VISUAL SYSTEM 03 — mapa central de distribuição dos elementos oficiais
 * de apoio da marca BC Energia, com cobertura de TODAS as rotas.
 *
 * Famílias oficiais (únicas permitidas):
 * - diagonal (ELEMENTO 01) → energia, operação, infraestrutura
 * - loops    (ELEMENTO 02) → institucional, território, relacionamento
 * - radial   (ELEMENTO 04) → impacto, resultado, prova
 * - chevrons (PRANCHETA 11) → processo, direção, navegação, jornada
 * - none                     → decisão válida e frequente
 *
 * Regras aplicadas:
 * - hero com fotografia → none
 * - footer → none
 * - nunca a mesma família em seções adjacentes
 * - ritmo: grafismo → seção limpa → grafismo diferente
 * - 1–4 aplicações por página, conforme comprimento
 * - opacidade entre 0.03 e 0.08; mobile reduzido/oculto pelo BrandGraphic
 */

export const NONE: SectionGraphic = { variant: 'none' }

/* ------------------------------------------------------------------ *
 * SEGMENTOS (11 rotas)
 * ------------------------------------------------------------------ */

/** Contexto/intro de cada segmento. */
export const SEGMENT_INTRO_GRAPHIC: Record<string, SectionGraphic> = {
  agronegocio: { variant: 'diagonal', tone: 'teal', size: 'small', position: 'bottom-left', opacity: 0.05 },
  'bares-e-restaurantes': { variant: 'loops', tone: 'teal', size: 'small', position: 'top-left', opacity: 0.05 },
  condominio: NONE,
  educacional: { variant: 'loops', tone: 'navy', size: 'small', position: 'top-left', opacity: 0.04 },
  lazer: NONE,
  religioso: { variant: 'loops', tone: 'navy', size: 'small', position: 'bottom-left', opacity: 0.04 },
  residencial: NONE,
  saude: { variant: 'radial', tone: 'teal', size: 'small', position: 'top-left', opacity: 0.04 },
  servico: { variant: 'diagonal', tone: 'navy', size: 'small', position: 'top-left', opacity: 0.04 },
  turismo: NONE,
  varejo: { variant: 'diagonal', tone: 'teal', size: 'small', position: 'top-right', opacity: 0.05 }
}

/**
 * Desafios: só recebe grafismo quando o contexto imediatamente anterior está
 * limpo (regra de não repetição em seções adjacentes).
 */
export const SEGMENT_CHALLENGES_GRAPHIC: Record<string, SectionGraphic> = {
  agronegocio: NONE,
  'bares-e-restaurantes': NONE,
  condominio: { variant: 'chevrons', tone: 'teal', size: 'small', position: 'top-right', opacity: 0.05 },
  educacional: NONE,
  lazer: { variant: 'diagonal', tone: 'teal', size: 'small', position: 'bottom-right', opacity: 0.04 },
  religioso: NONE,
  residencial: { variant: 'chevrons', tone: 'teal', size: 'small', position: 'bottom-right', opacity: 0.05 },
  saude: NONE,
  servico: NONE,
  turismo: { variant: 'chevrons', tone: 'navy', size: 'small', position: 'top-left', opacity: 0.04 },
  varejo: NONE
}

/** Prova (faixa escura de números/clientes) — radial, exceto onde já houve radial. */
const SEGMENT_PROOF_DEFAULT: SectionGraphic = {
  variant: 'radial',
  tone: 'light',
  size: 'large',
  position: 'bottom-cut',
  opacity: 0.05
}

export const SEGMENT_PROOF_GRAPHIC: Record<string, SectionGraphic> = {
  saude: NONE,
  varejo: { variant: 'radial', tone: 'light', size: 'medium', position: 'bottom-right', opacity: 0.04 },
  religioso: { variant: 'radial', tone: 'light', size: 'medium', position: 'right', opacity: 0.04 }
}

/** CTA final do segmento — chevrons discretos apenas em parte das rotas. */
export const SEGMENT_CTA_GRAPHIC: Record<string, SectionGraphic> = {
  'bares-e-restaurantes': { variant: 'chevrons', tone: 'light', size: 'small', position: 'top-right', opacity: 0.05 },
  educacional: { variant: 'chevrons', tone: 'light', size: 'small', position: 'bottom-right', opacity: 0.05 },
  saude: { variant: 'chevrons', tone: 'light', size: 'small', position: 'bottom-left', opacity: 0.05 },
  varejo: { variant: 'chevrons', tone: 'light', size: 'small', position: 'top-left', opacity: 0.05 }
}

export const segmentIntroGraphic = (slug?: string): SectionGraphic =>
  (slug && SEGMENT_INTRO_GRAPHIC[slug]) || NONE

export const segmentChallengesGraphic = (slug?: string): SectionGraphic =>
  (slug && SEGMENT_CHALLENGES_GRAPHIC[slug]) || NONE

export const segmentProofGraphic = (slug?: string): SectionGraphic =>
  (slug && SEGMENT_PROOF_GRAPHIC[slug]) || SEGMENT_PROOF_DEFAULT

export const segmentCtaGraphic = (slug?: string): SectionGraphic =>
  (slug && SEGMENT_CTA_GRAPHIC[slug]) || NONE

/* ------------------------------------------------------------------ *
 * REGIONAIS (7 rotas)
 * ------------------------------------------------------------------ */

export const REGIONAL_INTRO_GRAPHIC: Record<string, SectionGraphic> = {
  goiania: { variant: 'loops', tone: 'teal', size: 'medium', position: 'right', opacity: 0.05 },
  'aparecida-de-goiania': { variant: 'diagonal', tone: 'teal', size: 'small', position: 'bottom-right', opacity: 0.05 },
  anapolis: { variant: 'loops', tone: 'navy', size: 'medium', position: 'top-right', opacity: 0.04 },
  trindade: { variant: 'chevrons', tone: 'teal', size: 'small', position: 'bottom-left', opacity: 0.05 },
  'rio-verde': { variant: 'diagonal', tone: 'navy', size: 'medium', position: 'left', opacity: 0.04 },
  palmas: { variant: 'loops', tone: 'teal', size: 'medium', position: 'bottom-right', opacity: 0.05 },
  tocantins: { variant: 'loops', tone: 'teal', size: 'small', position: 'right', opacity: 0.05 }
}

/** Prova regional (faixa escura) — nem toda regional recebe grafismo. */
export const REGIONAL_PROOF_GRAPHIC: Record<string, SectionGraphic> = {
  goiania: { variant: 'radial', tone: 'light', size: 'large', position: 'bottom-cut', opacity: 0.05 },
  'aparecida-de-goiania': { variant: 'radial', tone: 'light', size: 'medium', position: 'bottom-right', opacity: 0.04 },
  anapolis: NONE,
  trindade: { variant: 'radial', tone: 'light', size: 'large', position: 'bottom-cut', opacity: 0.05 },
  'rio-verde': { variant: 'radial', tone: 'light', size: 'medium', position: 'right', opacity: 0.04 },
  palmas: NONE,
  tocantins: { variant: 'radial', tone: 'light', size: 'large', position: 'bottom-cut', opacity: 0.04 }
}

/** CTA regional — chevrons apenas onde a prova ficou limpa. */
export const REGIONAL_CTA_GRAPHIC: Record<string, SectionGraphic> = {
  anapolis: { variant: 'chevrons', tone: 'light', size: 'small', position: 'top-right', opacity: 0.05 },
  palmas: { variant: 'chevrons', tone: 'light', size: 'small', position: 'bottom-left', opacity: 0.05 }
}

export const regionalIntroGraphic = (slug?: string): SectionGraphic =>
  (slug && REGIONAL_INTRO_GRAPHIC[slug]) || REGIONAL_INTRO_GRAPHIC.goiania

export const regionalProofGraphic = (slug?: string): SectionGraphic =>
  (slug && REGIONAL_PROOF_GRAPHIC[slug]) || NONE

export const regionalCtaGraphic = (slug?: string): SectionGraphic =>
  (slug && REGIONAL_CTA_GRAPHIC[slug]) || NONE

/* ------------------------------------------------------------------ *
 * PRODUTOS (5 rotas indexáveis)
 * ------------------------------------------------------------------ */

export type ProductGraphics = {
  /** Seção "O que é" / contexto. */
  lead: SectionGraphic
  /** Faixa escura de prova/números. */
  proof: SectionGraphic
  /** Passo a passo / como funciona. */
  process: SectionGraphic
  /** Segundo bloco de contexto, quando existir. */
  leadSecondary?: SectionGraphic
}

export const PRODUCT_GRAPHICS: Record<string, ProductGraphics> = {
  'mercado-livre-de-energia': {
    lead: { variant: 'diagonal', tone: 'teal', size: 'small', position: 'bottom-left', opacity: 0.05 },
    proof: NONE,
    process: { variant: 'chevrons', tone: 'teal', size: 'small', position: 'top-right', opacity: 0.05 }
  },
  'consorcio-bc-energia': {
    lead: { variant: 'loops', tone: 'teal', size: 'small', position: 'top-left', opacity: 0.05 },
    proof: NONE,
    process: { variant: 'chevrons', tone: 'navy', size: 'small', position: 'bottom-right', opacity: 0.04 }
  },
  'arrendamento-de-usinas': {
    lead: { variant: 'diagonal', tone: 'navy', size: 'small', position: 'top-right', opacity: 0.04 },
    proof: NONE,
    process: { variant: 'chevrons', tone: 'teal', size: 'small', position: 'bottom-left', opacity: 0.05 }
  },
  'gestao-de-energia': {
    lead: NONE,
    proof: { variant: 'radial', tone: 'light', size: 'large', position: 'bottom-cut', opacity: 0.05 },
    process: NONE
  },
  'certificacao-renovavel-irec': {
    lead: NONE,
    proof: { variant: 'radial', tone: 'light', size: 'medium', position: 'bottom-right', opacity: 0.05 },
    process: NONE,
    leadSecondary: { variant: 'diagonal', tone: 'teal', size: 'small', position: 'bottom-right', opacity: 0.05 }
  }
}

export const productGraphics = (slug: string): ProductGraphics =>
  PRODUCT_GRAPHICS[slug] || { lead: NONE, proof: NONE, process: NONE }

/* ------------------------------------------------------------------ *
 * INSTITUCIONAIS / EDITORIAL / CONVERSÃO
 *
 * Decisões explícitas por rota, usadas diretamente nas páginas.
 * Rotas legais e curtas (/sobre/lgpd, /sobre/leilao,
 * /sobre/fator-de-alavancagem, /sobre/condicoes-gerais-varejistas) e
 * /contato/enviado são intencionalmente NONE: são páginas de leitura
 * densa ou de confirmação, onde o grafismo não teria função.
 * ------------------------------------------------------------------ */

export const INSTITUTIONAL_GRAPHIC = {
  sobreIntro: { variant: 'loops', tone: 'teal', size: 'medium', position: 'right', opacity: 0.05 } as SectionGraphic,
  sobreHighlights: NONE,
  sustentabilidadeIntro: { variant: 'loops', tone: 'teal', size: 'small', position: 'top-left', opacity: 0.05 } as SectionGraphic,
  sustentabilidadeHighlights: { variant: 'radial', tone: 'teal', size: 'large', position: 'right', opacity: 0.09 } as SectionGraphic,
  sustentabilidadeGovernanca: { variant: 'radial', tone: 'teal', size: 'small', position: 'bottom-right', opacity: 0.04 } as SectionGraphic,
  socialIntro: { variant: 'loops', tone: 'navy', size: 'small', position: 'bottom-left', opacity: 0.04 } as SectionGraphic,
  socialHighlights: NONE,
  socialDetalhes: { variant: 'chevrons', tone: 'teal', size: 'small', position: 'top-right', opacity: 0.04 } as SectionGraphic
}

export const CONTENT_GRAPHIC = {
  hubFeature: { variant: 'loops', tone: 'teal', size: 'small', position: 'top-right', opacity: 0.05 } as SectionGraphic,
  blogFeature: { variant: 'loops', tone: 'navy', size: 'small', position: 'bottom-left', opacity: 0.04 } as SectionGraphic,
  castFeature: { variant: 'chevrons', tone: 'light', size: 'small', position: 'top-right', opacity: 0.05 } as SectionGraphic,
  article: NONE,
  episode: NONE
}
