/**
 * Parâmetros do Simulador de Economia (SIMULADOR 01).
 *
 * Os percentuais e a faixa de conta são exatamente os fornecidos pela área
 * comercial nesta etapa. Nenhum valor pode ser alterado sem nova validação.
 * Todos os percentuais são apresentados como estimativa ("até X%").
 */

export const VALOR_MINIMO = 800
export const VALOR_MAXIMO = 5000
export const VALOR_DEFAULT = 1200
export const VALOR_STEP = 100

export type SimulatorState = {
  uf: string
  desconto: number
}

/** Estados atendidos comercialmente (GO, TO, PR, MG, MT). */
export const ESTADOS: Array<SimulatorState> = [
  { uf: 'Goiás', desconto: 0.25 },
  { uf: 'Tocantins', desconto: 0.23 },
  { uf: 'Paraná', desconto: 0.22 },
  { uf: 'Minas Gerais', desconto: 0.18 },
  { uf: 'Mato Grosso', desconto: 0.18 }
]

/** Contas de referência exibidas na tabela comparativa. */
export const TABELA_CONTAS = [800, 1200, 2000, 5000]

/** Nota comercial de transparência (não alterar o significado). */
export const NOTA_TRANSPARENCIA =
  'Condições válidas para contas a partir de R$ 800. A economia pode variar conforme análise da fatura, estado, distribuidora, bandeira tarifária, disponibilidade de créditos e condições comerciais.'

/** Formatação BRL sem casas decimais (padrão do simulador). */
export const formatBRL = (value: number): string =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

/** Economia mensal estimada = valor da conta x desconto do estado. */
export const calcularEconomia = (valor: number, desconto: number): number =>
  Math.round(valor * desconto)

/** Percentual exibido sempre como estimativa. */
export const formatPercent = (desconto: number): string => `até ${Math.round(desconto * 100)}%`
