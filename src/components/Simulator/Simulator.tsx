import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Alert } from '@/components/Alert'
import { buttonStyles } from '@/components/Button/Button.style'
import Link from '@/components/Link'
import {
  saveSimulatorContext,
  toSavingsRange,
  toValueRange,
  trackSimulatorCtaClick,
  trackSimulatorResultView,
  trackSimulatorStateSelect,
  trackSimulatorValueChange,
  trackSimulatorView
} from '@/lib/analytics'

import {
  ESTADOS,
  NOTA_TRANSPARENCIA,
  TABELA_CONTAS,
  VALOR_DEFAULT,
  VALOR_MAXIMO,
  VALOR_MINIMO,
  VALOR_STEP,
  calcularEconomia,
  formatBRL,
  formatPercent
} from './simulator.data'

/**
 * Simulador de economia (SIMULADOR 01 + SIMULADOR 02).
 *
 * Estimativa, nunca proposta comercial: todo percentual é exibido como
 * "até X%" e o resultado como "economia estimada".
 *
 * Tracking (SIMULADOR 02): todos os eventos carregam contexto de campanha lido
 * da persistência de UTM já existente. Nenhum evento e nenhum storage carrega
 * PII nem o valor exato da conta, apenas faixas.
 *
 * Acessibilidade — decisão documentada em docs/SIMULATOR-ECONOMY-PAGE.md:
 * o resultado NÃO usa aria-live, porque o slider dispararia um anúncio a cada
 * incremento de R$ 100. O leitor de tela recebe o valor estimado pelo
 * `aria-valuetext` do próprio slider e pelo texto do botão de estado.
 */
const Simulator = ({
  ctaHref = '#lead-form',
  initialValue
}: {
  ctaHref?: string
  /** Valor inicial da conta (ex.: vindo da prévia do simulador na Home). */
  initialValue?: number
}) => {
  const [estadoIndex, setEstadoIndex] = useState(0)
  const [valor, setValor] = useState(() => {
    if (!initialValue || !Number.isFinite(initialValue)) return VALOR_DEFAULT
    const stepped = Math.round(initialValue / VALOR_STEP) * VALOR_STEP
    return Math.min(VALOR_MAXIMO, Math.max(VALOR_MINIMO, stepped))
  })
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resultRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const interacted = useRef(false)
  const lastResult = useRef<string | null>(null)

  const estado = ESTADOS[estadoIndex]
  const economia = useMemo(() => calcularEconomia(valor, estado.desconto), [valor, estado])

  // Guard contra double-effect (StrictMode) e re-render: uma view por montagem.
  const viewed = useRef(false)
  useEffect(() => {
    if (viewed.current) return
    viewed.current = true
    trackSimulatorView()
  }, [])

  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      if (resultRef.current) clearTimeout(resultRef.current)
    },
    []
  )

  /**
   * Resultado visto: só após interação real, com debounce, e apenas quando a
   * combinação (estado + faixa) muda — nunca a cada render nem a cada passo.
   */
  const commitResult = useCallback((uf: string, desconto: number, conta: number) => {
    if (!interacted.current) return
    if (resultRef.current) clearTimeout(resultRef.current)
    resultRef.current = setTimeout(() => {
      const value_range = toValueRange(conta)
      const estimated_savings_range = toSavingsRange(calcularEconomia(conta, desconto))
      const discount_percent = Math.round(desconto * 100)
      const signature = `${uf}|${value_range}`

      saveSimulatorContext({
        simulator_state: uf,
        simulator_discount: discount_percent,
        simulator_value_range: value_range,
        simulator_savings_range: estimated_savings_range
      })

      if (lastResult.current === signature) return
      lastResult.current = signature
      trackSimulatorResultView({ state: uf, discount_percent, value_range, estimated_savings_range })
    }, 800)
  }, [])

  /** Sem PII: apenas a faixa da conta, nunca o valor exato digitado. */
  const commitValue = useCallback((next: number) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => trackSimulatorValueChange(next), 600)
  }, [])

  const handleValor = (next: number) => {
    interacted.current = true
    setValor(next)
    commitValue(next)
    commitResult(estado.uf, estado.desconto, next)
  }

  const handleEstado = (index: number) => {
    interacted.current = true
    setEstadoIndex(index)
    trackSimulatorStateSelect({
      state: ESTADOS[index].uf,
      discount_percent: Math.round(ESTADOS[index].desconto * 100)
    })
    commitResult(ESTADOS[index].uf, ESTADOS[index].desconto, valor)
  }

  /** Scroll suave até o formulário, respeitando prefers-reduced-motion. */
  const handleCta = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const value_range = toValueRange(valor)
    const discount_percent = Math.round(estado.desconto * 100)

    saveSimulatorContext({
      simulator_state: estado.uf,
      simulator_discount: discount_percent,
      simulator_value_range: value_range,
      simulator_savings_range: toSavingsRange(economia)
    })

    trackSimulatorCtaClick({
      cta_name: 'Enviar minha conta para análise',
      link_url: ctaHref,
      state: estado.uf,
      discount_percent,
      value_range
    })

    if (!ctaHref.startsWith('#')) return
    const target = document.getElementById(ctaHref.slice(1))
    if (!target) return

    event.preventDefault()
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    // Mantém o comportamento de foco/hash nativo para teclado e leitores de tela.
    window.history.replaceState(null, '', ctaHref)
  }


  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-9">
      {/* Controles — superfície clara, sem amarelo sobre fundo claro */}
      <div className="lg:col-span-5">
        <fieldset className="border-0 p-0">
          <legend className="t-eyebrow text-bc-primary">Selecione seu estado</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {ESTADOS.map((item, index) => {
              const selected = index === estadoIndex
              return (
                <button
                  key={item.uf}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => handleEstado(index)}
                  className={`min-h-[44px] rounded-md border px-4 py-2 t-label transition-colors duration-normal ease-bc focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${ selected ? 'border-bc-primary bg-bc-primary text-text-inverse' : 'border-border-subtle bg-surface text-text-primary hover:border-bc-primary hover:text-bc-primary' }`}
                >
                  {item.uf}
                  <span className="ml-2 t-body-sm font-medium opacity-80">
                    {formatPercent(item.desconto)}
                  </span>
                </button>
              )
            })}
          </div>
        </fieldset>

        {/* Valor da conta */}
        <div className="mt-7 border-t border-border-subtle pt-8">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <label htmlFor="simulador-valor-conta" className="t-eyebrow text-bc-primary">
              Valor médio da sua conta
            </label>
            <p className="t-metric-md text-text-primary">
              {formatBRL(valor)}
            </p>
          </div>

          <input
            id="simulador-valor-conta"
            type="range"
            min={VALOR_MINIMO}
            max={VALOR_MAXIMO}
            step={VALOR_STEP}
            value={valor}
            onChange={(event) => handleValor(Number(event.target.value))}
            aria-label="Valor médio mensal da conta de energia"
            aria-valuetext={`${formatBRL(valor)} por mês. Economia estimada de até ${formatBRL(economia)} por mês em ${estado.uf}.`}
            className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-md bg-surface-muted accent-bc-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          />

          <div className="mt-2 flex justify-between t-body-sm text-text-secondary">
            <span>{formatBRL(VALOR_MINIMO)}</span>
            <span>{formatBRL(VALOR_MAXIMO)}</span>
          </div>
        </div>

        <Alert variant="info" className="mt-8" title="Estimativa, não proposta comercial">
          {NOTA_TRANSPARENCIA}
        </Alert>
      </div>

      {/* Resultado — protagonista tipográfico */}
      <div className="lg:col-span-7">
        <div className="overflow-hidden rounded-xl bg-surface-brand text-text-inverse shadow-md">
          <div className="p-6 sm:p-10">
            <p className="t-eyebrow text-text-inverse">Sua economia estimada</p>

            <p className="mt-6 t-metric-xl text-bc-yellow">
              {formatBRL(economia)}
            </p>
            <p className="mt-3 t-h4-display text-text-inverse">
              por mês
            </p>

            <p className="mt-5 max-w-[46ch] t-body-sm text-text-inverse/80">
              Em {estado.uf}, a estimativa é de {formatPercent(estado.desconto)} de economia sobre
              uma conta de {formatBRL(valor)} por mês.
            </p>

            <Link
              href={ctaHref}
              data-cta-name="enviar_conta_analise"
              onClick={handleCta}
              className={`${buttonStyles({ size: 'lg', rounded: true })} mt-8 justify-center`}
            >
              Enviar minha conta para análise
            </Link>
          </div>

          {/* Tabela de referência */}
          <div className="border-t border-white/15 bg-bc-dark/25 px-6 py-6 sm:px-10">
            <p className="t-label uppercase leading-normal tracking-[0.18em] text-text-inverse">
              Referência em {estado.uf}, {formatPercent(estado.desconto)}
            </p>
            <table className="mt-4 w-full table-fixed text-left t-body-sm">
              <caption className="sr-only">
                Economia mensal estimada por valor de conta em {estado.uf}
              </caption>
              <thead>
                <tr className="t-caption tracking-wide text-text-inverse/70">
                  <th scope="col" className="py-2 pr-2 font-semibold">
                    Conta atual
                  </th>
                  <th scope="col" className="py-2 pl-2 text-right font-semibold">
                    Economia
                    <br className="sm:hidden" /> estimada
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {TABELA_CONTAS.map((conta) => (
                  <tr key={conta}>
                    <td className="py-2.5 pr-2 text-text-inverse/90">{formatBRL(conta)}</td>
                    <td className="py-2.5 pl-2 text-right font-semibold text-text-inverse">
                      até {formatBRL(calcularEconomia(conta, estado.desconto))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Simulator
