import { useState } from 'react'

import { Container } from '@/components'
import { logos } from '@/components/Customers/Customers.data'
import Image from '@/components/Image'
import { COMPANY_METRICS } from '@/data/companyMetrics'
import { testimonials } from '@/pages/home/Home.data'

/**
 * Home — Casos de sucesso & prova social (REFORMULAÇÃO FINAL DA HOME).
 *
 * Depoimentos reais navegados pelo usuário (sem autoplay) (`Home.data.ts`), faixa de
 * métricas institucionais (`companyMetrics`), logos de clientes
 * (`Customers.data.ts`) e selos de certificação reais (CCEE + I-REC).
 * Nenhum dado novo foi inventado.
 */

const brandBand = [...logos.filter((l) => l.featured), ...logos.filter((l) => !l.featured)].slice(
  0,
  12
)

const Testimonials = () => {
  const [active, setActive] = useState(0)

  const goTo = (index: number) => setActive(index)
  const prev = () => setActive((current) => (current - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive((current) => (current + 1) % testimonials.length)

  const current = testimonials[active]

  return (
    <section id="home_depoimentos" className="bc-level-support bg-surface">
      <Container>
        {/* Cabeçalho editorial */}
        <div className="max-w-3xl">
          <p className="t-eyebrow">Casos de sucesso</p>
          <h2 className="t-h2-support mt-4 text-text-primary">Quem confia na BC Energia</h2>
          <p className="mt-4 t-body-lg text-text-secondary">
            Empresas que transformaram a conta de energia em resultado com as soluções do
            Grupo BC Energia.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          {/* Carrossel corporativo de depoimentos */}
          <div
            className="lg:col-span-7">
            <div className="relative overflow-hidden">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-8 font-display text-[7rem] font-bold leading-none text-bc-primary/10 select-none"
              >
                “
              </span>

              {/* Trilho do carrossel */}
              <div
                className="flex transition-transform duration-500 ease-bc motion-reduce:transition-none"
                style={{ transform: `translateX(-${active * 100}%)` }}
                aria-live="polite"
              >
                {testimonials.map((item, index) => (
                  <figure
                    key={item.customer}
                    className="w-full shrink-0"
                    aria-hidden={index !== active}
                  >
                    <blockquote>
                      <p className="t-body-lg leading-relaxed text-text-primary">
                        “{item.testimony}”
                      </p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-4">
                      {item.avatar ? (
                        <Image
                          src={item.avatar}
                          alt={`Logo ${item.office}`}
                          width={56}
                          height={56}
                          loading="lazy"
                          decoding="async"
                          className="h-12 w-12 shrink-0 object-contain"
                        />
                      ) : null}
                      <span className="flex flex-col">
                        <cite className="t-label not-italic text-text-primary">
                          {item.customer}
                        </cite>
                        <span className="t-body-sm text-text-secondary">{item.office}</span>
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>

              {/* Controles: setas + dots */}
              <div className="mt-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2" role="tablist" aria-label="Depoimentos">
                  {testimonials.map((item, index) => (
                    <button
                      key={item.customer}
                      type="button"
                      role="tab"
                      aria-selected={index === active}
                      aria-label={`Depoimento de ${item.customer}`}
                      onClick={() => goTo(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ease-bc focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bc-primary motion-reduce:transition-none ${
                        index === active
                          ? 'w-8 bg-bc-primary'
                          : 'w-2.5 bg-text-primary/20 hover:bg-text-primary/40'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Depoimento anterior"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-primary transition-colors duration-200 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bc-primary motion-reduce:transition-none"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M13.5 8h-11m0 0 4-4m-4 4 4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Próximo depoimento"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-primary transition-colors duration-200 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bc-primary motion-reduce:transition-none"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M2.5 8h11m0 0-4-4m4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Métricas institucionais (valores reais — companyMetrics) */}
          <div className="lg:col-span-5">
            <ul className="grid h-full grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:content-center">
              {COMPANY_METRICS.map((metric) => (
                <li
                  key={metric.id}
                  className="border-t border-border-subtle/70 pt-5"
                >
                  <p className="t-metric-md text-text-accent">{metric.value}</p>
                  <p className="mt-1 t-label text-text-primary">{metric.label}</p>
                  {metric.description ? (
                    <p className="mt-2 t-body-sm text-text-secondary">{metric.description}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Faixa de logos + selos de certificação */}
        <div className="mt-16 lg:mt-24">
          <p className="t-eyebrow text-center text-text-secondary">
            Clientes e parceiros ao longo da nossa trajetória
          </p>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 lg:gap-x-14">
            {brandBand.map((logo) => (
              <li key={logo.id} className="flex h-8 items-center lg:h-10">
                <Image
                  src={`/img/components/customers/${logo.url}`}
                  alt={logo.name ?? logo.title}
                  width={160}
                  height={80}
                  loading="lazy"
                  decoding="async"
                  className="max-h-8 w-auto max-w-[110px] object-contain opacity-70 lg:max-h-10 lg:max-w-[130px]"
                />
              </li>
            ))}
          </ul>

          {/* Selos reais: CCEE + I-REC */}
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <li className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-bc-primary">
                <path
                  d="M8 1.5 2.5 3.5v4c0 3.4 2.3 5.7 5.5 7 3.2-1.3 5.5-3.6 5.5-7v-4L8 1.5Z"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinejoin="round"
                />
                <path
                  d="m5.75 8 1.5 1.5 3-3"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="t-caption font-semibold uppercase tracking-[0.12em] text-text-primary">
                Agente da CCEE
              </span>
            </li>
            <li className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-bc-primary">
                <path
                  d="M8 1.5 2.5 3.5v4c0 3.4 2.3 5.7 5.5 7 3.2-1.3 5.5-3.6 5.5-7v-4L8 1.5Z"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinejoin="round"
                />
                <path
                  d="m5.75 8 1.5 1.5 3-3"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="t-caption font-semibold uppercase tracking-[0.12em] text-text-primary">
                Certificação I-REC
              </span>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  )
}

export default Testimonials
