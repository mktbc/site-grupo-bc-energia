import { BRAZIL_MAP_VIEWBOX, BRAZIL_STATE_PATHS } from '@/data/brazilMap'

/** Centroides aproximados (mesma projeção do SVG) das UFs atendidas. */
const STATE_DOTS: Record<string, { x: number; y: number }> = {
  GO: { x: 622.1, y: 563.5 },
  TO: { x: 655, y: 408.3 },
  MT: { x: 461.5, y: 481.4 },
  MG: { x: 748.9, y: 627.5 },
  PR: { x: 570.9, y: 791.2 },
  DF: { x: 668.7, y: 556.3 }
}

export type BrazilMapProps = {
  /** UFs destacadas (cobertura real). */
  highlighted: string[]
  /** UF em foco (sincronizada com a lista ao lado). */
  activeUf?: string | null
  onStateEnter?: (uf: string) => void
  onStateLeave?: () => void
  className?: string
  title?: string
}

/**
 * Mapa do Brasil em SVG inline, leve e geograficamente correto (contornos
 * simplificados dos estados). Sem biblioteca de mapas. Destaca as UFs
 * atendidas e sincroniza o estado em foco com a lista textual ao lado, que
 * permanece a fonte acessível da informação.
 */
const BrazilMap = ({
  highlighted,
  activeUf = null,
  onStateEnter,
  onStateLeave,
  className = '',
  title = 'Mapa do Brasil'
}: BrazilMapProps) => (
  <svg
    viewBox={BRAZIL_MAP_VIEWBOX}
    role="img"
    aria-label={title}
    className={`h-auto w-full ${className}`.trim()}
  >
    <title>{title}</title>
    <g>
      {BRAZIL_STATE_PATHS.map(({ uf, d }) => {
        const active = highlighted.includes(uf)
        const focused = active && activeUf === uf
        return (
          <path
            key={uf}
            d={d}
            onMouseEnter={active ? () => onStateEnter?.(uf) : undefined}
            onMouseLeave={active ? () => onStateLeave?.() : undefined}
            className={`transition-[fill,opacity] duration-200 ease-bc motion-reduce:transition-none ${
              active
                ? 'stroke-bc-dark/60 fill-bc-yellow'
                : 'fill-bc-dark/70 stroke-white/15'
            }`}
            strokeWidth={active ? 2.4 : 1.4}
            strokeLinejoin="round"
            style={
              active
                ? { filter: focused ? 'drop-shadow(0 0 8px rgba(241, 192, 53, 0.2))' : undefined }
                : undefined
            }
          />
        )
      })}
    </g>
    <g aria-hidden="true">
      {highlighted.map((uf) => {
        const dot = STATE_DOTS[uf]
        if (!dot) return null
        return (
          <circle
            key={`dot-${uf}`}
            cx={dot.x}
            cy={dot.y}
            r={activeUf === uf ? 8 : 6}
            className={`transition-all duration-200 ease-bc motion-reduce:transition-none ${
              activeUf === uf ? 'fill-bc-yellow' : 'fill-bc-dark'
            }`}
          />
        )
      })}
    </g>
  </svg>
)

export default BrazilMap
