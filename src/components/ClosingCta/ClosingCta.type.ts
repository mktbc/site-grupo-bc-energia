import type { BCIconName } from '@/config/icons'
import type { SectionGraphic } from '@/components/Product/ProductSection'

export type ClosingCtaLink = {
  label: string
  href: string
  /** Rótulo acessível quando o texto visual for mais curto que a âncora original. */
  ariaLabel?: string
  target?: string
  /** Link para fora do domínio (abre em nova aba). */
  external?: boolean
  /** Ícone oficial da marca exibido nos quick links. */
  icon?: BCIconName
}

export type ClosingCtaProps = {
  /** Linha curta acima do título (opcional). */
  eyebrow?: string
  title: string
  /** Segunda linha do título (quebra controlada, mesmo peso visual). */
  titleLine2?: string
  /** Parágrafo único de apoio. */
  description?: string
  primaryCta: ClosingCtaLink
  secondaryCta?: ClosingCtaLink
  /** Navegação secundária ("Conheça também"), preserva links internos. */
  linksTitle?: string
  links?: Array<ClosingCtaLink>
  /** Texto do micro-CTA de cada quick link. */
  linksCtaLabel?: string
  /** Elemento oficial de apoio da seção — VISUAL SYSTEM 02 (padrão: nenhum). */
  graphic?: SectionGraphic
  className?: string
  id?: string
}
