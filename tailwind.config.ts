import type { Config } from 'tailwindcss'

/**
 * Design System — Grupo BC Energia (Bloco 05)
 *
 * As cores do Brandbook são expostas de duas formas:
 * 1. Tokens semânticos (`bc-*`, `surface`, `border`, `success`...) para novos componentes.
 * 2. Sobrescrita das rampas `teal` e `amber` já usadas em todo o site, para que
 *    o projeto inteiro passe a usar as cores oficiais sem reescrever componentes.
 *
 * Brandbook: #18857D (primária) · #242F40 (escura) · #F1C035 · #24D2C8 · #1B9D93 · #E5E5E5
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Tokens de marca
        bc: {
          primary: 'hsl(var(--bc-primary) / <alpha-value>)',
          'primary-dark': 'hsl(var(--bc-primary-dark) / <alpha-value>)',
          'primary-hover': 'hsl(var(--bc-primary-hover) / <alpha-value>)',
          dark: 'hsl(var(--bc-dark) / <alpha-value>)',
          yellow: 'hsl(var(--bc-yellow) / <alpha-value>)',
          accent: 'hsl(var(--bc-accent) / <alpha-value>)',
          cyan: 'hsl(var(--bc-cyan) / <alpha-value>)',
          'green-light': 'hsl(var(--bc-green-light) / <alpha-value>)',
          gray: 'hsl(var(--bc-gray) / <alpha-value>)',
          white: 'hsl(var(--bc-white) / <alpha-value>)',
          background: 'hsl(var(--bc-background) / <alpha-value>)',
          surface: 'hsl(var(--bc-surface) / <alpha-value>)',
          border: 'hsl(var(--bc-border) / <alpha-value>)',
          text: 'hsl(var(--bc-text) / <alpha-value>)',
          'text-muted': 'hsl(var(--bc-text-muted) / <alpha-value>)',
          success: 'hsl(var(--bc-success) / <alpha-value>)',
          error: 'hsl(var(--bc-error) / <alpha-value>)',
          focus: 'hsl(var(--bc-focus) / <alpha-value>)'
        },

        // Tokens semânticos
        page: 'hsl(var(--page) / <alpha-value>)',
        surface: 'hsl(var(--surface) / <alpha-value>)',
        'surface-base': 'hsl(var(--surface-base) / <alpha-value>)',
        'surface-card': 'hsl(var(--surface-card) / <alpha-value>)',
        'surface-subtle': 'hsl(var(--surface-subtle) / <alpha-value>)',
        'surface-elevated': 'hsl(var(--surface-elevated) / <alpha-value>)',
        'surface-highlight': 'hsl(var(--surface-highlight) / <alpha-value>)',
        'surface-muted': 'hsl(var(--surface-muted) / <alpha-value>)',
        'surface-soft': 'hsl(var(--surface-soft) / <alpha-value>)',
        'surface-dark': 'hsl(var(--surface-dark) / <alpha-value>)',
        'surface-dark-card': 'hsl(var(--surface-dark-card) / <alpha-value>)',

        'surface-brand': 'hsl(var(--surface-brand) / <alpha-value>)',
        'text-primary': 'hsl(var(--text-primary) / <alpha-value>)',
        'text-secondary': 'hsl(var(--text-secondary) / <alpha-value>)',
        'text-muted': 'hsl(var(--text-muted) / <alpha-value>)',
        'text-inverse': 'hsl(var(--text-inverse) / <alpha-value>)',
        'text-accent': 'hsl(var(--text-accent) / <alpha-value>)',
        'border-subtle': 'hsl(var(--border-subtle) / <alpha-value>)',
        'border-interactive': 'hsl(var(--border-interactive) / <alpha-value>)',
        'border-highlight': 'hsl(var(--border-highlight) / <alpha-value>)',
        'border-default': 'hsl(var(--border-default) / <alpha-value>)',
        'border-strong': 'hsl(var(--border-strong) / <alpha-value>)',
        success: 'hsl(var(--success) / <alpha-value>)',
        warning: 'hsl(var(--warning) / <alpha-value>)',
        info: 'hsl(var(--info) / <alpha-value>)',
        error: 'hsl(var(--error) / <alpha-value>)',
        focus: 'hsl(var(--focus) / <alpha-value>)',
        // Rampas legadas realinhadas ao Brandbook
        teal: {
          50: '#eefaf8',
          100: '#d3f2ee',
          200: '#a8e5de',
          300: '#6fd3ca',
          400: '#24d2c8',
          500: '#1b9d93',
          600: '#18857d',
          700: '#146e68',
          800: '#123b34',
          900: '#242f40',
          950: '#141c27'
        },
        amber: {
          300: '#f6d271',
          400: '#f1c035',
          500: '#e5b22c',
          600: '#c99921'
        }
      },
      fontFamily: {
        sans: ['Onest', 'Onest Fallback', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Barlow Condensed"', '"Barlow Condensed Fallback"', 'Onest', 'Onest Fallback', 'system-ui', 'sans-serif']
      },
      fontSize: {
        display: ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        caption: ['0.75rem', { lineHeight: '1.4' }]
      },

      maxWidth: {
        container: 'var(--container-max)'
      },
      spacing: {
        // Escala previsível de espaçamento (complementa a escala padrão do Tailwind)
        18: '4.5rem', // 72
        22: '5.5rem', // 88
        30: '7.5rem' // 120
      },
      borderRadius: {
        card: 'var(--radius-lg)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)'
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        energy: 'var(--shadow-energy)',
        card: 'var(--shadow-md)',
        'card-hover': 'var(--shadow-lg)'
      },
      transitionDuration: {
        fast: 'var(--motion-fast)',
        normal: 'var(--motion-normal)',
        slow: 'var(--motion-slow)'
      },
      transitionTimingFunction: {
        bc: 'var(--motion-ease)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: []
}
export default config
