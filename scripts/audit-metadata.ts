/**
 * Auditoria de metadata por rota (ETAPA SEO 03).
 *
 * Somente leitura: percorre INDEXABLE_ROUTES, resolve o PageMeta de cada rota
 * e reporta title/description ausentes, duplicados ou herdados do fallback.
 *
 *   bunx tsx scripts/audit-metadata.ts
 */
import { INDEXABLE_ROUTES } from '../src/config/routes'
import { DEFAULT_META, getRouteMeta } from '../src/config/meta'
import { buildCanonical, DEFAULT_OG_IMAGE } from '../src/config/site'

type Row = {
  path: string
  title: string
  description: string
  canonical: string
  ogImage: string
  fallback: boolean
}

const rows: Row[] = INDEXABLE_ROUTES.map((path) => {
  const meta = getRouteMeta(path)
  return {
    path,
    title: meta.title ?? '',
    description: meta.description ?? '',
    canonical: buildCanonical(meta.canonicalPath ?? path),
    ogImage: meta.ogImage ?? DEFAULT_OG_IMAGE,
    fallback: path !== '/' && meta === DEFAULT_META
  }
})

const groupBy = (key: 'title' | 'description') => {
  const map = new Map<string, string[]>()
  rows.forEach((row) => {
    const value = row[key].trim()
    map.set(value, [...(map.get(value) ?? []), row.path])
  })
  return [...map.entries()].filter(([, paths]) => paths.length > 1)
}

const missingTitle = rows.filter((r) => !r.title)
const missingDescription = rows.filter((r) => !r.description)
const usingFallback = rows.filter((r) => r.fallback)
const dupTitles = groupBy('title')
const dupDescriptions = groupBy('description')
const longTitles = rows.filter((r) => r.title.length > 65)
const longDescriptions = rows.filter((r) => r.description.length > 165)
const shortDescriptions = rows.filter((r) => r.description && r.description.length < 90)

console.log(`Rotas indexáveis: ${rows.length}`)
console.log(`Titles ausentes: ${missingTitle.length}`)
console.log(`Descriptions ausentes: ${missingDescription.length}`)
console.log(`Fallback genérico (DEFAULT_META): ${usingFallback.map((r) => r.path).join(', ') || 'nenhum'}`)
console.log(`Titles duplicados: ${dupTitles.length}`)
dupTitles.forEach(([value, paths]) => console.log(`  · "${value}" → ${paths.join(', ')}`))
console.log(`Descriptions duplicadas: ${dupDescriptions.length}`)
dupDescriptions.forEach(([value, paths]) => console.log(`  · "${value.slice(0, 60)}…" → ${paths.join(', ')}`))
console.log(`Titles > 65 chars: ${longTitles.map((r) => `${r.path} (${r.title.length})`).join(', ') || 'nenhum'}`)
console.log(
  `Descriptions > 165 chars: ${longDescriptions.map((r) => `${r.path} (${r.description.length})`).join(', ') || 'nenhuma'}`
)
console.log(
  `Descriptions < 90 chars: ${shortDescriptions.map((r) => `${r.path} (${r.description.length})`).join(', ') || 'nenhuma'}`
)

const failed =
  missingTitle.length + missingDescription.length + usingFallback.length + dupTitles.length + dupDescriptions.length
console.log(failed === 0 ? '\nOK — nenhuma inconsistência crítica.' : `\n${failed} inconsistência(s) crítica(s).`)

console.log('\n| URL | Title | Description (len) | Canonical | og:image |')
console.log('| --- | --- | --- | --- | --- |')
rows.forEach((r) =>
  console.log(`| ${r.path} | ${r.title} | ${r.description.length} | ${r.canonical} | ${r.ogImage} |`)
)
