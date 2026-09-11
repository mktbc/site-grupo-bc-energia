import { tv } from 'tailwind-variants'

export const buttonWrapperStyles = tv({
  base: 'flex',
  variants: {
    center: {
      true: 'justify-center'
    }
  },
  defaultVariants: {
    center: true
  }
})

/**
 * Button System — Design System BC (FRONT-END 01)
 *
 * Variantes semânticas:
 *  - primary   → CTA principal de conversão (amarelo Brandbook sobre navy)
 *  - secondary → ação secundária sobre fundo escuro/imagem (branco sólido)
 *  - outline   → ação secundária sobre fundo escuro (contorno)
 *  - dark      → ação sobre fundo claro com peso institucional (navy)
 *  - green     → ação de apoio na cor primária da marca
 *  - ghost/light → ação terciária (sem preenchimento)
 *  - link      → texto
 *  - gray      → neutro
 *
 * Estados: default, hover, focus-visible, active, disabled, loading.
 * Todas as variantes garantem foco visível e área de toque >= 44px (size md+).
 */
export const buttonStyles = tv({
  base: [
    'inline-flex items-center justify-center gap-2 rounded-md t-action-label',
    'transition-colors duration-normal ease-bc',
    'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus focus-visible:ring-offset-2',
    'active:translate-y-px motion-reduce:active:translate-y-0'
  ].join(' '),
  variants: {
    variant: {
      primary: 'border border-bc-yellow bg-bc-yellow text-bc-dark hover:brightness-95',
      secondary: 'border border-white bg-white text-bc-dark hover:bg-white/85',
      outline: 'border border-white bg-transparent text-text-inverse hover:bg-white/15',
      dark: 'border border-bc-dark bg-bc-dark text-text-inverse hover:bg-bc-dark/90',
      green: 'border border-bc-primary bg-bc-primary text-text-inverse hover:bg-bc-primary-hover',
      ghost: 'bg-transparent text-bc-primary hover:bg-bc-primary/10',
      light: 'bg-transparent text-text-inverse hover:bg-white/20',
      link: 'bg-transparent text-bc-primary underline-offset-4 hover:text-bc-primary-hover hover:underline',
      gray: 'bg-bc-gray text-bc-dark hover:bg-bc-gray/70'
    },
    outline: {
      true: 'border border-white'
    },
    block: {
      true: 'flex w-full text-center'
    },
    size: {
      sm: 'min-h-[36px] px-3 py-1',
      md: 'min-h-[44px] px-4 py-2',
      lg: 'min-h-[48px] px-5 py-3 text-[0.875rem]',
      xl: 'min-h-[52px] px-5 py-4 text-[0.875rem]'
    },
    rounded: {
      true: 'rounded-lg'
    },
    loading: {
      true: 'cursor-progress'
    },
    disabled: {
      true: 'pointer-events-none cursor-not-allowed opacity-60'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
})

