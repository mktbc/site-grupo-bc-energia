/**
 * Fonte única dos indicadores institucionais do Grupo BC Energia.
 *
 * Todos os valores aqui já existiam no projeto (fallback de
 * `src/services/salesForce/salesForce.ts`, slide 3 e trust line do Hero,
 * e as páginas institucionais de Sustentabilidade/Social). Nenhum número
 * novo foi criado nesta etapa.
 *
 * Regra: qualquer componente que exiba métricas institucionais deve ler
 * daqui, evitando divergências entre Hero, Home e páginas internas.
 */
export type CompanyMetric = {
  id: string
  /** Valor exibido, exatamente como já publicado. */
  value: string
  /** Rótulo curto (Onest). */
  label: string
  /** Contexto opcional de 1 linha. */
  description?: string
}

export const COMPANY_METRICS: Array<CompanyMetric> = [
  {
    id: 'clientes',
    value: '+ de 5 mil',
    label: 'Clientes atendidos',
    description: 'Empresas e consumidores recebendo nossas soluções em economia de energia.'
  },
  {
    id: 'economia',
    value: '+ de R$ 400M',
    label: 'De economia gerada',
    description: 'Valor economizado pelos clientes do Grupo BC Energia em suas contas de energia.'
  },
  {
    id: 'co2',
    value: '+ de 15 mil',
    label: 'Toneladas de CO₂ evitadas',
    description: 'Impacto ambiental evitado com o uso de fontes renováveis.'
  }
]

/** Formato aceito pelo componente legado `Numbers` (title/subtitle). */
export const COMPANY_METRICS_LEGACY = COMPANY_METRICS.map((metric) => ({
  title: metric.value,
  subtitle: metric.description ?? metric.label
}))
