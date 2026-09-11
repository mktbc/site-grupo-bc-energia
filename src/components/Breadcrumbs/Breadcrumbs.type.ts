export type BreadcrumbTrailItem = {
  name: string
  path: string
}

export type BreadcrumbsProps = {
  title: string
  /** Rótulo de fallback quando a rota não tem trilha em src/config/meta.ts. */
  parent?: string
  /** `badge` (padrão) ou `plain` (editorial, sem container). */
  variant?: 'badge' | 'plain'
}

export type ItemProps = {
  index?: number
  pathSections?: Array<string>
  title?: string
}
