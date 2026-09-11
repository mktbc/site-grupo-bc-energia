import type { BCIconName } from '@/config/icons'

export type RelatedLinkItem = {
  /** Âncora descritiva (valor de SEO). Usada como texto na variante lista. */
  label: string
  href: string
  description?: string
  target?: string
  /** Título curto exibido nos cards; a âncora completa vira aria-label. */
  shortLabel?: string
  /** Categoria exibida acima do título no card. */
  eyebrow?: string
  /** Ícone oficial da marca no card. */
  icon?: BCIconName
  /** Rótulo do CTA no rodapé do card. */
  ctaLabel?: string
  /** Destaque visual para destinos de conversão. */
  accent?: boolean
}

export type RelatedLinksProps = {
  title: string
  description?: string
  /** Linha curta acima do título. */
  eyebrow?: string
  items: Array<RelatedLinkItem>
  headingLevel?: 'h2' | 'h3'
  className?: string
  /** `list` (padrão) mantém a apresentação legada; `cards` reutiliza o HubCard;
   * `editorial` é navegação secundária, de baixo peso visual;
   * `index` é o índice tipográfico (título + descrição + seta), sem cards. */
  variant?: 'list' | 'cards' | 'editorial' | 'index' | 'index-cards'
  /** Colunas no desktop na variante `cards`. */
  columns?: 2 | 3
}
