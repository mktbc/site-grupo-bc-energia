/**
 * ETAPA SEO 06 — auditoria de 404, soft 404 e redirects.
 *
 * Valida (sem alterar nada):
 *  - /404 e rotas inexistentes fora de INDEXABLE_ROUTES e do sitemap;
 *  - redirects fora do sitemap, com destino existente, sem chains nem loops;
 *  - links internos das páginas pré-renderizadas: OK / REDIRECT / QUEBRADO / NOINDEX.
 *
 * Uso: `bunx tsx scripts/audit-404-redirects.ts` (após `npm run build`).
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

import {
  DOCUMENT_REDIRECTS,
  INDEXABLE_ROUTES,
  NOINDEX_ROUTES,
  REDIRECTS,
  isKnownRoute
} from '../src/config/routes'

const DIST = resolve('dist')
const errors: string[] = []
const warnings: string[] = []

const ALL_REDIRECTS: Record<string, string> = { ...REDIRECTS, ...DOCUMENT_REDIRECTS }

// 1. 404 fora das rotas indexáveis e do sitemap
const sitemapPath = resolve('public/sitemap.xml')
const sitemap = existsSync(sitemapPath) ? readFileSync(sitemapPath, 'utf-8') : ''
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  m[1].replace(/^https?:\/\/[^/]+/, '')
)

for (const bad of ['/404', '/not-found']) {
  if (INDEXABLE_ROUTES.includes(bad)) errors.push(`${bad} está em INDEXABLE_ROUTES`)
  if (sitemapPaths.includes(bad)) errors.push(`${bad} está no sitemap`)
}

// 2. Redirects: fora do sitemap, destino válido, sem chain/loop
for (const [from, to] of Object.entries(ALL_REDIRECTS)) {
  if (sitemapPaths.includes(from)) errors.push(`redirect ${from} está no sitemap`)
  if (INDEXABLE_ROUTES.includes(from)) errors.push(`redirect ${from} está em INDEXABLE_ROUTES`)
  if (from === to) errors.push(`redirect loop: ${from}`)
  if (ALL_REDIRECTS[to]) errors.push(`redirect chain: ${from} → ${to} → ${ALL_REDIRECTS[to]}`)
  const isFile = to.startsWith('/docs/')
  if (isFile) {
    if (!existsSync(resolve('public', to.replace(/^\//, ''))))
      warnings.push(`destino de redirect ausente em public${to}`)
  } else if (!INDEXABLE_ROUTES.includes(to)) {
    errors.push(`destino de redirect não indexável/inexistente: ${to}`)
  }
}

// 3. Links internos das páginas pré-renderizadas
const htmlFiles: string[] = []
const walk = (dir: string) => {
  if (!existsSync(dir)) return
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full)
    else if (entry.endsWith('.html')) htmlFiles.push(full)
  }
}
walk(DIST)

let linksChecked = 0
const broken = new Set<string>()
const toRedirect = new Set<string>()
const toNoindex = new Set<string>()

const isAsset = (href: string) => /\.[a-z0-9]{2,5}(\?|#|$)/i.test(href)

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf-8')
  for (const match of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = match[1].replace(/\/$/, '') || '/'
    if (isAsset(href)) continue
    linksChecked += 1
    if (ALL_REDIRECTS[href]) toRedirect.add(href)
    else if (!isKnownRoute(href)) broken.add(`${href} (em ${file.replace(DIST, 'dist')})`)
    else if (NOINDEX_ROUTES.includes(href)) toNoindex.add(href)
  }
}

broken.forEach((link) => errors.push(`link interno quebrado: ${link}`))

console.log('— Auditoria 404 / redirects —')
console.log(`HTML pré-renderizados: ${htmlFiles.length}`)
console.log(`Links internos verificados: ${linksChecked}`)
console.log(`Links quebrados: ${broken.size}`)
console.log(`Links para redirects: ${toRedirect.size}${toRedirect.size ? ` → ${[...toRedirect].join(', ')}` : ''}`)
console.log(`Links para noindex: ${toNoindex.size}${toNoindex.size ? ` → ${[...toNoindex].join(', ')}` : ''}`)
console.log(`Redirects mapeados: ${Object.keys(ALL_REDIRECTS).length}`)
warnings.forEach((w) => console.log(`AVISO: ${w}`))

if (errors.length) {
  console.error('\nFALHAS:')
  errors.forEach((e) => console.error(` - ${e}`))
  process.exit(1)
}
console.log('\nOK — sem chains, loops, links quebrados ou 404/redirects no sitemap.')
