export type PageHeaderCta = {
  label: string
  href: string
  target?: string
  ariaLabel?: string
}

export type PageHeaderProps = {
  icon?: string
  title: string
  /** Segunda linha do H1 (apenas na variante `align="left"`). */
  titleLine2?: string
  /** Texto curto acima do H1 (kicker). Não é heading. */
  eyebrow?: string
  description?: string
  category?: string
  bgImage?: string
  /** Composição do conteúdo. `left` = abertura institucional compacta. */
  align?: 'center' | 'left'
  /** Reduz a altura vertical do hero. */
  compact?: boolean
  /**
   * Variante visual do hero (`align="left"`).
   * - `default`: overlay mais denso, conteúdo em largura natural.
   * - `banner`: imagem como fundo integral, overlay direcional mais leve e
   *   conteúdo contido em coluna de leitura confortável.
   */
  variant?: 'default' | 'banner'
  /** Classes utilitárias de background-position para a variante banner. */
  bgPosition?: string
  /** Usa overlay localizado e leve (preserva a luminosidade da foto). */
  lightOverlay?: boolean
  /** Ação principal do hero (apenas na variante `align="left"`). */
  cta?: PageHeaderCta
  /** Ação secundária, em link de texto. */
  secondaryCta?: PageHeaderCta
  /** Remove a máscara/seta de transição abaixo do hero. */
  flush?: boolean
  /** Exibe o traço decorativo antes do eyebrow (variante `left`). */
  eyebrowRule?: boolean
  /**
   * Visual protagonista da variante split (`align="left"`): o texto passa a
   * ocupar 5/12 e a imagem 7/12 no desktop. No mobile a imagem vem abaixo.
   * Ignorado quando `variant="banner"`.
   */
  media?: {
    src: string
    alt: string
    srcSet?: string
    sizes?: string
    width?: number
    height?: number
  }
}



