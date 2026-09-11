export type CustomersLogo = {
  id: string
  title: string
  /** Nome real da empresa, usado no texto alternativo. */
  name?: string
  /**
   * Marca priorizada nas apresentações reduzidas (ex.: Home).
   * Não altera a lista completa — apenas a ordem/seleção exibida.
   */
  featured?: boolean
  url: string
}

export type CustomersProps = {
  /** Linha curta acima do título. */
  eyebrow?: string
  title?: string
  /** Frase curta de apoio (opcional). */
  description?: string
  /**
   * Mantido por compatibilidade de chamadas existentes.
   * A apresentação é sempre em grade estática (sem carrossel/JS).
   */
  variant?: 'grid'
  /** Limita a quantidade de logos exibidos (fonte de dados permanece intacta). */
  limit?: number
  className?: string
}
