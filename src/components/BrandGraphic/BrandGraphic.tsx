/**
 * BrandGraphic — elementos oficiais de apoio da marca BC Energia.
 *
 * Famílias oficiais (pacote "Elementos de apoio"):
 * - diagonal  → ELEMENTO 01 (faixas diagonais paralelas)  · soluções, energia, operação
 * - loops     → ELEMENTO 02 (elipses/ondas lineares)      · institucional, regional, conexão
 * - radial    → ELEMENTO 04 (composição radial / pulso)   · métricas, impacto, prova
 * - chevrons  → PRANCHETA 11 (chevrons/setas)             · CTA, processo, jornada
 * - none      → sem grafismo (decisão válida e frequente)
 *
 * Regras de uso (VISUAL SYSTEM 02):
 * - No máximo 1 grafismo protagonista por seção.
 * - Nunca a mesma família em seções adjacentes.
 * - No máximo 2 usos da mesma família por página.
 * - Footer sempre `none`.
 * - Mobile reduz drasticamente: LARGE/MEDIUM só a partir de sm/lg.
 * - Sempre decorativo: aria-hidden, sem foco, sem leitura por leitor de tela.
 */

export type BrandGraphicVariant = 'diagonal' | 'loops' | 'radial' | 'chevrons' | 'none'
export type BrandGraphicTone = 'cyan' | 'teal' | 'navy' | 'light' | 'yellow'
export type BrandGraphicSize = 'small' | 'medium' | 'large'
export type BrandGraphicPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'right'
  | 'left'
  | 'bottom-cut'

const FAMILY_FILE: Record<Exclude<BrandGraphicVariant, 'none'>, string> = {
  diagonal: 'bc-elemento-01',
  loops: 'bc-elemento-02',
  radial: 'bc-elemento-04',
  chevrons: 'bc-elemento-chevrons'
}

export const brandGraphicSrc = (
  variant: Exclude<BrandGraphicVariant, 'none'>,
  tone: BrandGraphicTone = 'cyan'
): string => {
  const family = FAMILY_FILE[variant]
  // O arquivo base de cada família já é a variante cyan oficial.
  return tone === 'cyan' ? `/img/brand/${family}.svg` : `/img/brand/${family}-${tone}.svg`
}

/** Densidade (opacidade) padronizada — VISUAL SYSTEM 01, item J. */
export type BrandGraphicDensity = 'hero' | 'section' | 'micro'
/** Escala legada — VISUAL SYSTEM 01, item L. */
export type BrandGraphicScale = BrandGraphicSize

const DENSITY_CLASS: Record<BrandGraphicDensity, string> = {
  hero: 'opacity-[0.06]',
  section: 'opacity-[0.05]',
  micro: 'opacity-[0.04]'
}

const SCALE_CLASS: Record<BrandGraphicScale, string> = {
  large: 'w-[420px] lg:w-[640px]',
  medium: 'w-[260px] lg:w-[380px]',
  small: 'w-[120px] lg:w-[200px]'
}

/**
 * Escala responsiva — item 14 + item 31.
 * LARGE só no desktop; MEDIUM some no mobile pequeno; SMALL sobrevive reduzido.
 */
const SIZE_CLASS: Record<BrandGraphicSize, string> = {
  large: 'hidden lg:block lg:h-[480px] lg:w-[480px] xl:h-[640px] xl:w-[640px]',
  medium: 'hidden h-[240px] w-[240px] sm:block lg:h-[380px] lg:w-[380px]',
  small: 'h-[110px] w-[110px] lg:h-[200px] lg:w-[200px]'
}

const POSITION_CLASS: Record<BrandGraphicPosition, string> = {
  'top-right': '-right-12 -top-12 lg:-right-16 lg:-top-16',
  'top-left': '-left-12 -top-12 lg:-left-16 lg:-top-16',
  'bottom-right': '-bottom-12 -right-12 lg:-bottom-16 lg:-right-16',
  'bottom-left': '-bottom-12 -left-12 lg:-bottom-16 lg:-left-16',
  right: 'top-1/2 -translate-y-1/2 -right-[10%]',
  left: 'top-1/2 -translate-y-1/2 -left-[10%]',
  'bottom-cut': '-bottom-[28%] right-[8%]'
}

export type BrandGraphicProps = {
  variant: BrandGraphicVariant
  tone?: BrandGraphicTone
  size?: BrandGraphicSize
  position?: BrandGraphicPosition
  /** Opacidade explícita (0.03–0.08). Sobrepõe `density`. */
  opacity?: number
  density?: BrandGraphicDensity
  /** @deprecated use `size` */
  scale?: BrandGraphicScale
  /** Inverte o asset para uso sobre fundos escuros. */
  invert?: boolean
  /** Classes de posicionamento/opacidade extra do container absoluto. */
  className?: string
}

/**
 * Marca d'água decorativa absoluta. A seção que a hospeda precisa ser
 * `relative isolate overflow-hidden` para garantir o recorte estratégico.
 */
const BrandGraphic = ({
  variant,
  tone = 'cyan',
  size,
  position,
  opacity,
  density = 'section',
  scale,
  invert = false,
  className = ''
}: BrandGraphicProps) => {
  if (variant === 'none') return null

  const hasOpacityClass = /opacity-/.test(className)

  return (
    <span
      aria-hidden="true"
      className={[
        'pointer-events-none absolute select-none',
        size ? SIZE_CLASS[size] : '',
        position ? POSITION_CLASS[position] : '',
        /* Se a seção já define opacidade própria, ela prevalece. */
        hasOpacityClass || opacity !== undefined ? '' : DENSITY_CLASS[density],
        scale && !size ? `${SCALE_CLASS[scale]} aspect-square` : '',
        invert ? '[filter:brightness(0)_invert(1)]' : '',
        className
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        backgroundImage: `url(${brandGraphicSrc(variant, tone)})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        ...(opacity !== undefined ? { opacity } : {})
      }}
    />
  )
}

export default BrandGraphic
