/**
 * Tipos do conteúdo regional.
 *
 * Cada página regional (cidade ou estado) é alimentada por um objeto deste
 * formato. O componente é compartilhado (src/pages/regional/RegionalPage),
 * mas o TEXTO é exclusivo de cada região — nenhum trecho é gerado por
 * substituição de nome de cidade.
 */
export type RegionScope = 'city' | 'state'

export type RegionSolutionLink = {
  /** Rótulo descritivo usado como âncora do link interno. */
  label: string
  href: string
  /** Por que essa solução faz sentido nesta região/perfil. */
  description: string
  target?: string
}

export type RegionStep = {
  title: string
  description: string
}

export type RegionFaq = {
  question: string
  answer: string
}

export type Region = {
  slug: string
  path: string
  scope: RegionScope
  /** Nome da cidade (scope city) ou do estado (scope state). */
  place: string
  /** UF de referência. */
  uf: string
  /** Página estadual à qual a cidade pertence, quando existir no site. */
  statePath?: string
  /** H1 exclusivo. */
  h1: string
  coverImage: string
  /** Frase curta do hero (resumo do atendimento na região). */
  heroDescription?: string
  /** Parágrafos introdutórios exclusivos. */
  intro: Array<string>
  solutions: {
    heading: string
    lead: string
    items: Array<RegionSolutionLink>
  }
  howItWorks: {
    heading: string
    lead: string
    steps: Array<RegionStep>
  }
  audience: {
    heading: string
    lead: string
    items: Array<string>
  }
  why: {
    heading: string
    lead: string
    items: Array<{ title: string; description: string }>
  }
  faq: {
    heading: string
    items: Array<RegionFaq>
  }
  cta: {
    heading: string
    description: string
    buttonLabel: string
    buttonHref: string
  }
  /** Links internos complementares (institucional, segmentos, outras regiões). */
  related: Array<RegionSolutionLink>
}
