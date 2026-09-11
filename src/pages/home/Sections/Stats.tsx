import { useEffect, useRef, useState } from 'react'

import { Container } from '@/components'

import Link from '@/components/Link'
import { COMPANY_METRICS, type CompanyMetric } from '@/data/companyMetrics'

const PRIMARY_ID = 'economia'
const primary = COMPANY_METRICS.find((metric) => metric.id === PRIMARY_ID) ?? COMPANY_METRICS[0]
const secondary = COMPANY_METRICS.filter((metric) => metric.id !== primary.id)

const metricValue = (metric: CompanyMetric, value: number) => {
  if (metric.id === 'economia') return `+ de R$ ${Math.round(value)}M`
  return `+ de ${Math.round(value)} mil`
}

const metricTarget = (metric: CompanyMetric) => (metric.id === 'economia' ? 400 : metric.id === 'clientes' ? 5 : 15)

const AnimatedMetric = ({ metric, className }: { metric: CompanyMetric; className: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node || startedRef.current) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const target = metricTarget(metric)
    let frame = 0
    let startTime = 0
    let finished = false

    const finish = () => {
      if (finished) return
      finished = true
      if (frame) window.cancelAnimationFrame(frame)
      setValue(target)
    }

    const animate = (time: number) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / 1100, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) {
        try {
          frame = window.requestAnimationFrame(animate)
        } catch {
          finish()
        }
      } else {
        finish()
      }
    }

    const reveal = () => {
      if (startedRef.current) return
      startedRef.current = true
      if (reducedMotion) {
        finish()
        return
      }
      try {
        frame = window.requestAnimationFrame(animate)
      } catch {
        finish()
      }
    }

    if (!('IntersectionObserver' in window)) {
      reveal()
      return () => finish()
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        reveal()
        observer.disconnect()
      }
    }, { threshold: 0, rootMargin: '160px 0px 160px' })

    observer.observe(node)

    const { top, bottom } = node.getBoundingClientRect()
    if (top < window.innerHeight && bottom > 0) reveal()

    return () => {
      observer.disconnect()
      if (!finished && startedRef.current) finish()
    }
  }, [metric])

  return <dd ref={ref} className={className}>{metricValue(metric, value)}</dd>
}

/**
 * Home — Resultados e métricas.
 *
 * Hierarquia NÚMERO → RÓTULO → EXPLICAÇÃO, sem chips, barras ou grafismos.
 * O amarelo fica restrito ao indicador principal (economia gerada); os demais
 * usam branco. Valores lidos de `COMPANY_METRICS` (nenhum número novo).
 * Semântica: `<dl>` com `<dt>` antes do `<dd>` no DOM; a ordem visual
 * (número primeiro) é feita com `order-first`.
 */
const Stats = () => (
  <section
    id="home_numeros"
    className="bc-level-mid relative isolate overflow-hidden bg-surface-dark text-text-inverse"
  >
    <Container width="editorial" className="relative">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
        <div>
          <p className="t-eyebrow text-bc-cyan">Escala e experiência</p>
          <h2 className="t-h2-mid mt-2 text-text-inverse">Resultados que movem o mercado</h2>
        </div>

        <Link
          href="/sobre/quem-somos"
          data-cta-name="home_numeros_quem_somos"
          className="group inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start t-action-label text-text-inverse underline-offset-[6px] transition-colors duration-200 ease-bc hover:text-bc-cyan hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark motion-reduce:transition-none md:self-end"
        >
          Conheça nossa história
          <span aria-hidden="true" className="transition-transform duration-200 ease-bc group-hover:translate-x-[3px] motion-reduce:transform-none">→</span>
        </Link>
      </div>

      <dl className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-12">
        <div className="bc-card-dark flex flex-col border-bc-cyan/25 p-6 md:col-span-2 lg:col-span-6 lg:p-7">
          <dt className="t-label mt-2 text-text-inverse">{primary.label}</dt>
          <AnimatedMetric metric={primary} className="order-first t-metric-xl text-bc-yellow" />
          {primary.description ? (
            <dd className="t-body-sm mt-2 max-w-[44ch] text-text-inverse/80">{primary.description}</dd>
          ) : null}
        </div>

        {secondary.map((metric) => (
          <div key={metric.id} className="bc-card-dark flex flex-col p-6 lg:col-span-3 lg:p-5 xl:p-6">
            <dt className="t-label mt-2 text-text-inverse">{metric.label}</dt>
            <AnimatedMetric metric={metric} className="order-first t-metric-lg text-white" />
            {metric.description ? (
              <dd className="t-body-sm mt-2 text-text-inverse/80">{metric.description}</dd>
            ) : null}
          </div>
        ))}
      </dl>
    </Container>
  </section>
)

export default Stats
