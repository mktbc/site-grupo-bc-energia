/**
 * Cobertura geográfica do Grupo BC Energia — fonte única.
 *
 * Regra de negócio oficial: a empresa atua em 5 estados e no Distrito Federal
 * — GO, TO, MT, MG, PR e DF. Não há atuação no Pará (PA) nem em SP.
 *
 * ⚠️ Não confundir cobertura com páginas regionais de SEO: existem 7 páginas
 * regionais, todas de cidades/estado dentro de GO e TO. 7 rotas ≠ 6 UFs.
 */
export type CoverageState = {
  uf: string
  name: string
  /** Rota regional real, quando existir (nunca inventar). */
  href?: string
}

export const COVERAGE_STATES: CoverageState[] = [
  { uf: 'GO', name: 'Goiás', href: '/energia-solar-goiania' },
  { uf: 'TO', name: 'Tocantins', href: '/energia-solar-no-tocantins' },
  { uf: 'MT', name: 'Mato Grosso' },
  { uf: 'MG', name: 'Minas Gerais' },
  { uf: 'PR', name: 'Paraná' },
  { uf: 'DF', name: 'Distrito Federal' }
]

/** Texto corrido usado nas páginas de produto ("Distrito Federal, Goiás, …"). */
export const COVERAGE_TEXT = (() => {
  const names = [...COVERAGE_STATES].map((s) => s.name).sort((a, b) => a.localeCompare(b, 'pt-BR'))
  return `${names.slice(0, -1).join(', ')} e ${names[names.length - 1]}`
})()
