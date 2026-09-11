import Link from '@/components/Link'
import { SEGMENT_HUB_ITEMS } from '@/config/navigation'
import BrandGraphic from '@/components/BrandGraphic/BrandGraphic'

/**
 * Momento 3 — Índice completo dos 11 segmentos.
 *
 * Layout editorial: cabeçalho à esquerda (4/12) e lista à direita (8/12).
 * Lista em 3 colunas no desktop, 2 no tablet, 1 no mobile.
 * Cada item é uma linha inteira clicável, com nome + seta discreta.
 * Sem ícone, descrição, card, sombra ou borda pesada.
 */
const SegmentsIndex = () => (
  <section
    id="todos-os-segmentos"
    className="relative isolate scroll-mt-24 overflow-hidden bg-surface-soft py-12 md:py-14 lg:py-16"
  >
    {/* PRANCHETA 11 (chevrons) — navegação/direção. Microapoio lateral. */}
    <BrandGraphic variant="chevrons" tone="teal" size="small" position="bottom-left" opacity={0.05} />
    <div className="relative mx-auto w-full max-w-[1280px] px-6 lg:px-10">
      <div>
        {/* VISUAL SYSTEM 06 — cabeçalho no topo, índice logo abaixo. */}
        <header className="max-w-[46rem]">
          <span className="t-caption mb-3 block font-semibold text-bc-primary">
            Índice de segmentos
          </span>
          <h2 className="t-h2 text-text-primary">
            Todos os segmentos
          </h2>
          <p className="mt-3.5 max-w-[46rem] t-body-lg text-text-secondary">
            Explore todos os perfis atendidos pela BC Energia.
          </p>
        </header>

        {/* Índice — largura útil, imediatamente abaixo do cabeçalho */}
        <nav aria-label="Todos os segmentos atendidos" className="mt-7 lg:mt-8">
          <ul
            data-cta-location="hub_navigation"
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {SEGMENT_HUB_ITEMS.map((item) => (
              <li key={item.href} className="h-full">
                <Link
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  data-cta-name={`hub_segmentos_${item.title}`}
                  className="bc-card bc-card-interactive group flex min-h-[80px] items-center justify-between gap-4 p-5 transition-[transform,colors,box-shadow] duration-200 ease-bc focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 motion-reduce:transition-none"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    {item.iconSrc ? (
                      <img
                        src={item.iconSrc}
                        alt=""
                        aria-hidden="true"
                        width={26}
                        height={26}
                        className="h-[26px] w-[26px] shrink-0 opacity-80 transition-opacity duration-200 group-hover:opacity-100"
                      />
                    ) : null}
                    <span className="t-body-lg font-semibold uppercase tracking-[0.04em] text-text-primary transition-colors duration-200 ease-bc group-hover:text-bc-primary motion-reduce:transition-none">
                      {item.title}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-4 t-body-lg text-bc-primary transition-transform duration-200 ease-bc group-hover:translate-x-1 motion-reduce:transition-none"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  </section>
)

export default SegmentsIndex
