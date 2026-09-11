import type { BCIconName } from '@/config/icons'

export type SolutionBenefit = {
  title: string
  description?: string
  /** Ícone oficial da marca. Sem correspondência adequada, o componente usa um check. */
  icon?: BCIconName
}

export type SolutionFact = {
  label: string
  value: string
  note?: string
}

export type SolutionImage = {
  src: string
  alt: string
  srcSet?: string
  sizes?: string
  width?: number
  height?: number
  href?: string
  target?: string
}

export type SolutionCta = {
  label: string
  href: string
  target?: string
  /** Microcopy curta abaixo do CTA (apenas quando verdadeira). */
  note?: string
}

/** Informação rápida em destaque (ex.: ECONOMIA / Até 25%*). */
export type SolutionHighlight = {
  label: string
  value: string
}

export type SolutionShowcaseProps = {
  /** Ícone oficial exibido no cabeçalho da solução. */
  icon?: BCIconName
  /** Ícone legado em /public, usado quando não há BCIcon equivalente. */
  iconSrc?: string
  eyebrow?: string
  title: string
  /** Benefício principal, em destaque abaixo do nome do produto. */
  headline?: string
  description: string
  /** Explicação complementar, exibida em corpo menor abaixo da descrição. */
  supportText?: string
  /** Destaques curtos exibidos como blocos rápidos. */
  highlights?: Array<SolutionHighlight>
  /** Ressalva exibida logo abaixo dos destaques (nunca escondida em tooltip). */
  disclaimer?: string
  facts?: Array<SolutionFact>
  benefits?: Array<SolutionBenefit>
  benefitsTitle?: string
  image?: SolutionImage
  cta?: SolutionCta
  /** Posição da imagem no desktop. */
  imagePosition?: 'left' | 'right'
  /** @deprecated use `imagePosition="left"`. */
  inverted?: boolean
  className?: string
  id?: string
}
