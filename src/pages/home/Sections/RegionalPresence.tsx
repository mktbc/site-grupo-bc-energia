import { Fragment, useState } from 'react'

import { BrazilMap, Container } from '@/components'
import Link from '@/components/Link'
import { COVERAGE_STATES } from '@/data/coverage'

import BrandGraphic from '@/components/BrandGraphic/BrandGraphic'

const HIGHLIGHTED = COVERAGE_STATES.map((state) => state.uf)

/**
 * Home — "Presença regional".
 *
 * Continuidade narrativa do bloco "para quem / onde": texto curto (4/12) e o
 * mapa do Brasil como protagonista visual (8/12). A lista extensa de UFs foi
 * substituída por uma linha tipográfica compacta, sincronizada com o mapa.
 * Cobertura vem de `src/data/coverage.ts` (GO, TO, MT, MG, PR e DF); apenas GO
 * e TO têm rota real. DF é exibido como item visual, sem link inventado.
 */
const RegionalPresence = ({ className = '' }: { className?: string }) => {
  const [activeUf, setActiveUf] = useState<string | null>(null)

  return (
    <section
      id="home_presenca_regional"
      className={`relative overflow-hidden bg-[linear-gradient(135deg,#1f3b49_0%,#18857d_48%,#1b9d93_100%)] text-text-inverse ${className}`.trim()}
    >
      {/* Profundidade tonal sutil, sem elementos decorativos concorrentes. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_60%_45%,rgba(255,255,255,0.08)_0%,transparent_55%,rgba(36,47,64,0.34)_100%)]"
      />
      {/* ELEMENTO 02 (loops) — território/conexão. Lateral, nunca centralizado. */}
      <BrandGraphic variant="loops" tone="light" size="medium" position="left" opacity={0.05} className="hidden lg:block" />

      <Container className="bc-level-support relative lg:max-w-[1200px]">
        <div className="grid grid-cols-1 items-center gap-8 md:gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Texto — 4/12 */}
          <div className="lg:col-span-5 xl:col-span-4">
            <p className="mb-4 t-eyebrow !text-white">
              Presença regional
            </p>
            <h2 className="t-h2-mid measure-title text-bc-yellow">
              Nossa energia está cada vez mais perto de você
            </h2>
            <p className="mt-5 max-w-[380px] font-sans t-body-sm text-text-inverse/90">
              Atendemos em Goiás, Tocantins, Mato Grosso, Minas Gerais, Paraná e no Distrito Federal.
              As condições variam conforme a distribuidora e o perfil de consumo de cada operação.
            </p>

            <div className="mt-7">
              <Link
                href="/contato"
                data-cta-name="home_regional_especialista"
                className="group inline-flex items-center gap-2 t-action-label text-bc-yellow transition-colors duration-200 ease-bc hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-brand motion-reduce:transition-none"
              >
                Ver atendimento na sua região
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Mapa protagonista — 8/12 */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="media-panel mx-auto w-full max-w-[440px] p-4 transition-[border-color,transform] duration-normal ease-bc hover:-translate-y-0.5 hover:border-bc-cyan/40 sm:p-6 lg:max-w-[560px] lg:p-7 motion-reduce:transform-none motion-reduce:transition-none">
              <div className="relative z-[1]">
                <BrazilMap
                  highlighted={HIGHLIGHTED}
                  activeUf={activeUf}
                  onStateEnter={setActiveUf}
                  onStateLeave={() => setActiveUf(null)}
                  title="Mapa do Brasil com destaque para Goiás, Tocantins, Mato Grosso, Minas Gerais, Paraná e Distrito Federal"
                />
              </div>
            </div>

            {/* Linha tipográfica compacta — contexto textual do mapa */}
            <p
              aria-label="Estados atendidos: Goiás, Tocantins, Mato Grosso, Minas Gerais, Paraná e Distrito Federal"
              className="mx-auto mt-4 flex max-w-[34rem] flex-wrap items-center justify-center gap-x-2 gap-y-0 font-sans t-caption font-semibold tracking-[0.1em] text-text-inverse/90 sm:gap-x-3"
            >
              {COVERAGE_STATES.map((state, index) => (
                <Fragment key={state.uf}>
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-text-inverse/30">
                      ·
                    </span>
                  ) : null}
                  {state.href ? (
                    <Link
                      href={state.href}
                      data-cta-name={`home_regional_${state.uf}`}
                      onMouseEnter={() => setActiveUf(state.uf)}
                      onMouseLeave={() => setActiveUf(null)}
                      onFocus={() => setActiveUf(state.uf)}
                      onBlur={() => setActiveUf(null)}
                      className={`inline-flex min-h-[44px] items-center px-1 underline-offset-4 transition-colors duration-200 ease-bc hover:text-bc-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-brand motion-reduce:transition-none ${ activeUf === state.uf ? 'text-bc-cyan' : 'text-text-inverse' }`}
                    >
                      <span className="sr-only">{state.name} — </span>
                      <span aria-hidden="true">{state.uf}</span>
                    </Link>
                  ) : (
                    <span
                      onMouseEnter={() => setActiveUf(state.uf)}
                      onMouseLeave={() => setActiveUf(null)}
                      className={`inline-flex min-h-[44px] items-center px-1 transition-colors duration-200 ease-bc motion-reduce:transition-none ${ activeUf === state.uf ? 'text-bc-cyan' : '' }`}
                    >
                      <span className="sr-only">{state.name}</span>
                      <span aria-hidden="true">{state.uf}</span>
                    </span>
                  )}
                </Fragment>
              ))}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default RegionalPresence
