interface RegionalSupportElementProps {
  /** Caminho do asset oficial (Brandbook — 03. Elementos de apoio). */
  src: string
  /** Posicionamento, tamanho, opacidade e responsividade. */
  className?: string
}

/**
 * Camada decorativa da seção "Presença regional".
 *
 * Aplica exclusivamente elementos de apoio oficiais do Brandbook do Grupo BC
 * Energia como detalhe gráfico sutil: sempre absoluto, `pointer-events-none`,
 * `aria-hidden` e com opacidade controlada pela classe recebida. Nunca entra
 * na hierarquia de leitura da seção (título → mapa → estados → CTA).
 */
const RegionalSupportElement = ({ src, className = '' }: RegionalSupportElementProps) => (
  <img
    aria-hidden="true"
    src={src}
    alt=""
    loading="lazy"
    decoding="async"
    className={`pointer-events-none absolute select-none ${className}`.trim()}
  />
)

export default RegionalSupportElement
