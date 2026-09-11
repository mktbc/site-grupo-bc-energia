/**
 * Contexto da simulação persistido na sessão.
 *
 * Somente comportamento agregado: estado, percentual e FAIXAS.
 * O valor exato da conta e a economia exata NUNCA são persistidos, e nenhum
 * dado pessoal passa por aqui. Usa o mesmo mecanismo (`sessionStorage`) já
 * adotado pelas UTMs — nenhum cookie novo.
 */

export type SimulatorContext = {
  simulator_state?: string
  simulator_discount?: number
  simulator_value_range?: string
  simulator_savings_range?: string
}

const KEY = 'bc_simulator'

/** Faixas de conta — convenção única do projeto (também usada nos eventos). */
export const toValueRange = (value: number): string => {
  if (value < 1200) return '800-1199'
  if (value < 2000) return '1200-1999'
  if (value < 3500) return '2000-3499'
  return '3500-5000'
}

/** Faixas de economia estimada — evita expor o valor calculado exato. */
export const toSavingsRange = (value: number): string => {
  if (value < 200) return '0-199'
  if (value < 400) return '200-399'
  if (value < 700) return '400-699'
  if (value < 1000) return '700-999'
  return '1000+'
}

const hasStorage = (): boolean => {
  try {
    return typeof window !== 'undefined' && !!window.sessionStorage
  } catch {
    return false
  }
}

export const getSimulatorContext = (): SimulatorContext => {
  if (!hasStorage()) return {}
  try {
    const raw = window.sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as SimulatorContext) : {}
  } catch {
    return {}
  }
}

export const saveSimulatorContext = (ctx: SimulatorContext): void => {
  if (!hasStorage()) return
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify({ ...getSimulatorContext(), ...ctx }))
  } catch {
    /* storage indisponível — tracking nunca quebra a aplicação */
  }
}
