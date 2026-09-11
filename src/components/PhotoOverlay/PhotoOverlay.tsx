/**
 * SISTEMA ÚNICO DE TRATAMENTO FOTOGRÁFICO — Grupo BC Energia
 *
 * Apenas 3 famílias de overlay, centralizadas em tokens (globals.css):
 *  1. institucional — #18857D 10%–16% (padrão do site, imagens sem texto branco)
 *  2. escuro        — #242F40 24%–32% (texto branco sobre a foto)
 *  3. misto         — #242F40 → transparente (texto de um lado só)
 *
 * Deve ficar entre a imagem e o conteúdo. Nunca aplicar em logos,
 * ícones, SVGs oficiais, diagramas ou gráficos.
 */
export type PhotoOverlayVariant =
  | 'institutional'
  | 'institutional-medium'
  | 'dark'
  | 'dark-medium'
  | 'readable-left'
  | 'readable-right'
  | 'readable-bottom';

const VARIANTS: Record<PhotoOverlayVariant, string> = {
  institutional: 'bc-ovl-institutional',
  'institutional-medium': 'bc-ovl-institutional-medium',
  dark: 'bc-ovl-dark',
  'dark-medium': 'bc-ovl-dark-medium',
  'readable-left': 'bc-ovl-readable-left',
  'readable-right': 'bc-ovl-readable-right',
  'readable-bottom': 'bc-ovl-readable-bottom'
};

type Props = {
  variant?: PhotoOverlayVariant;
  className?: string;
};

export default function PhotoOverlay({ variant = 'institutional', className = '' }: Props) {
  return <span aria-hidden="true" className={`bc-ovl ${VARIANTS[variant]} ${className}`.trim()} />;
}
