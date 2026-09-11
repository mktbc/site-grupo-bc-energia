import type { BCIconName } from '@/config/icons'

export type HubCardProps = {
  title: string
  description?: string
  href: string
  /** Categoria curta exibida acima do título. */
  eyebrow?: string
  /** Rótulo acessível quando o título visual for mais curto que a âncora. */
  ariaLabel?: string
  /** Destaque visual (accent amarelo) para destinos de conversão. */
  accent?: boolean

  /** Ícone oficial da marca (preferencial). */
  icon?: BCIconName
  /** Ícone legado em /public, quando não há BCIcon equivalente. */
  iconSrc?: string
  /** Link externo: abre em nova aba com rel seguro. */
  external?: boolean
  /** Nome do CTA para o tracking central (data-cta-name). */
  trackingLabel?: string
  /** Rótulo visual do CTA no rodapé do card (não é um link separado). */
  ctaLabel?: string
  /** Densidade visual do card. `large` é usado em hubs com poucos itens. */
  size?: 'default' | 'large'
}

export type HubCardGridProps = {
  children: React.ReactNode
  className?: string
  /** Número de colunas no desktop. */
  columns?: 2 | 3
}
