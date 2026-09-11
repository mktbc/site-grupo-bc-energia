/**
 * Fase A — auditoria de indexação do conteúdo editorial.
 *
 * Imprime, por URL: tipo, status atual, status recomendado, motivo e
 * pendências editoriais. Fonte: src/config/contentIndexing.ts.
 *
 * Uso: bun run audit:indexing-content
 */
import { getContentIndexingReport } from '../src/config/contentIndexing'

const report = getContentIndexingReport()

const label = {
  ready: 'READY TO INDEX',
  'needs-editorial-review': 'NEEDS EDITORIAL REVIEW',
  'not-ready': 'NOT READY'
} as const

console.log('\nAUDITORIA DE INDEXAÇÃO — CONTEÚDO EDITORIAL\n')

for (const item of report) {
  console.log(`${item.path}  [${item.type}]`)
  console.log(`  status:      ${label[item.status]}`)
  console.log(`  robots:      ${item.indexable ? 'index,follow' : 'noindex,follow'}`)
  console.log(`  motivo:      ${item.reason}`)
  if (item.pending.length) console.log(`  pendências:  ${item.pending.join('; ')}`)
  console.log('')
}

const indexable = report.filter((item) => item.indexable).length
console.log(`Total: ${report.length} URLs · indexáveis: ${indexable} · protegidas: ${report.length - indexable}\n`)
