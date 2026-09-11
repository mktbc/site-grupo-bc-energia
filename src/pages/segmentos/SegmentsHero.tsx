import { Breadcrumbs } from '@/components'
import Link from '@/components/Link'
import { Helmet } from 'react-helmet-async'

const SEGMENTOS_HERO_BG = '/img/pages/segmentos/hero-segmentos.webp'

/**
 * Hero full-width de /segmentos.
 * Imagem de fundo em largura total (lâmpada ao pôr do sol), texto à
 * esquerda com overlay direcional suave — mais denso atrás do conteúdo,
 * mais leve no restante, para preservar o impacto do laranja e da luz.
 */
const SegmentsHero = () => (
  <section
    aria-label="Segmentos atendidos"
    className="relative overflow-hidden bg-bc-dark bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${SEGMENTOS_HERO_BG})` }}
  >
    <Helmet>
      <link
        rel="preload"
        as="image"
        type="image/webp"
        href={SEGMENTOS_HERO_BG}
      />
    </Helmet>

    {/* Overlay direcional: leitura confortável à esquerda, lâmpada visível à direita */}
    <div
      aria-hidden="true"
      className="bc-ovl bc-ovl-readable-left"
    />
    <div
      aria-hidden="true"
      className="bc-ovl bc-ovl-dark"
    />

    <div className="bc-container relative">
      <div className="measure-intro pb-12 pt-24 sm:pt-28 lg:pb-14 lg:pt-28">
        <div className="hero-panel hero-panel--wide">
          <Breadcrumbs title="Segmentos atendidos" parent="Segmentos" variant="plain" />

          <h1 className="hero-title mt-5 lg:max-w-[20ch]">
            Soluções de energia para diferentes perfis de negócio
          </h1>

          <p className="hero-description max-w-[48ch] !text-white/85">
            Encontre o segmento que mais se aproxima da sua operação.
          </p>

          <div data-cta-location="page_header" className="hero-actions">
            <Link
              href="#todos-os-segmentos"
              data-cta-name="Ver todos os segmentos"
              className="group inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap t-action-label text-text-inverse underline-offset-4 transition-colors duration-200 hover:text-bc-cyan hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus motion-reduce:transition-none"
            >
              Ver todos os segmentos
              <span
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transform-none"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default SegmentsHero
