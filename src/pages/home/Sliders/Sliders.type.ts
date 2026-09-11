import { ReactElement } from 'react'

export type HeroCta = {
  label: string
  href: string
  target?: '_self' | '_blank'
}

export type WrapperProps = {
  id: string
  bgImage: string
  /** Imagem alternativa para mobile (enquadramento portrait do protagonista) */
  bgImageMobile?: string
  /** Classe Tailwind de object-position (focal point do slide, desktop) */
  bgPosition?: string
  /** Classe Tailwind de object-position no mobile */
  bgPositionMobile?: string
  eyebrow?: string
  /** Renderiza o título como H1 (apenas o primeiro slide) */
  primary?: boolean
  title: string | ReactElement
  description: string
  cta: HeroCta
  secondaryCta?: HeroCta
  /** Linha curta de confiança (apenas dados já existentes no projeto) */
  trust?: string
  /** Intensidade do overlay de leitura, ajustada por foto. */
  overlay?: 'soft' | 'medium' | 'strong'
  /** Texto alternativo da imagem de fundo do slide. */
  alt?: string
}

