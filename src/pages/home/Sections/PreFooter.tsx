import Link from '@/components/Link'
import { Container } from '@/components/Container'

/**
 * Home — Pré-footer (VISUAL 07).
 *
 * Faixa compacta de navegação auxiliar entre o CTA final e o Footer.
 * Continua o fundo escuro do Footer (`surface-dark`) para que o fechamento
 * da página (conversão → navegação → rodapé) leia como uma sequência única.
 * Lista editorial de baixo peso visual, sem cards, ícones ou botões.
 * Somente rotas reais já existentes.
 */
const AUX_LINKS = [
  { label: 'Produtos', href: '/produtos' },
  { label: 'Segmentos', href: '/segmentos' },
  { label: 'Regiões atendidas', href: '/energia-solar-goiania' },
  { label: 'Sobre a BC', href: '/sobre' }
] as const

const PreFooter = () => (
  <nav
    aria-label="Navegação auxiliar"
    data-testid="pre-footer"
    className="bg-surface-dark text-text-inverse"
  >
    <Container className="border-t border-white/10 py-8 lg:py-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-baseline md:justify-between">
        <p className="t-eyebrow tracking-[0.16em] text-white/60">
          Navegue também
        </p>

        <ul className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2">
          {AUX_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                data-cta-name={`pre_footer_${item.href}`}
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-sm text-body-sm font-medium text-white/85 underline-offset-4 transition-colors duration-200 hover:text-bc-cyan hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark motion-reduce:transition-none"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  </nav>
)

export default PreFooter
