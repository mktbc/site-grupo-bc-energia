/**
 * Auditoria de robots.txt + sitemap.xml (ETAPA SEO 05).
 *
 * Valida:
 *  - sitemap: XML válido, quantidade, duplicidades, HTTPS, domínio oficial,
 *    ausência de query/hash/UTM, URLs noindex, URLs de redirect, URLs fora de
 *    INDEXABLE_ROUTES;
 *  - sitemap × canonical (usa o HTML pré-renderizado em dist/, quando existir);
 *  - sitemap × robots.txt (nenhuma URL do sitemap pode estar bloqueada);
 *  - robots.txt: presença de User-agent, diretiva Sitemap com domínio oficial,
 *    ausência de Disallow sobre páginas noindex e sobre assets.
 *
 * Uso: `bunx tsx scripts/audit-robots-sitemap.ts` (após `npm run build`).
 */
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { INDEXABLE_ROUTES, NOINDEX_ROUTES, REDIRECTS } from '../src/config/routes'
import { SITE_URL } from '../src/config/site'

const errors: string[] = []
const notes: string[] = []
const fail = (m: string) => errors.push(m)

const isProduction = process.env.VITE_SEO_ENV === 'production'

/* ------------------------------- sitemap -------------------------------- */

const sitemapPath = resolve('public/sitemap.xml')
if (!existsSync(sitemapPath)) {
  fail('[sitemap] public/sitemap.xml não existe (rode `npm run build`)')
}

const sitemap = existsSync(sitemapPath) ? readFileSync(sitemapPath, 'utf-8') : ''

if (!sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>'))
  fail('[sitemap] declaração XML/encoding ausente ou incorreta')
if (!sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'))
  fail('[sitemap] namespace urlset ausente')
if (!sitemap.trimEnd().endsWith('</urlset>')) fail('[sitemap] tag </urlset> não fechada')
if (/[<>&](?![a-z]+;)/.test(sitemap.replace(/<\/?[^>]+>/g, '')))
  fail('[sitemap] caracteres não escapados fora de tags')

const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

if (locs.length !== INDEXABLE_ROUTES.length)
  fail(`[sitemap] ${locs.length} URLs, esperado ${INDEXABLE_ROUTES.length}`)

const seen = new Set<string>()
for (const loc of locs) {
  if (seen.has(loc)) fail(`[sitemap duplicada] ${loc}`)
  seen.add(loc)

  if (!loc.startsWith('https://')) fail(`[sitemap http] ${loc}`)
  if (!loc.startsWith(`${SITE_URL}/`) && loc !== `${SITE_URL}/`)
    fail(`[sitemap domínio] ${loc} não usa ${SITE_URL}`)
  if (loc.includes('?') || loc.includes('#')) fail(`[sitemap query/hash] ${loc}`)
  if (/utm_/i.test(loc)) fail(`[sitemap utm] ${loc}`)

  const path = loc.replace(SITE_URL, '') || '/'
  if (!INDEXABLE_ROUTES.includes(path)) fail(`[sitemap fora de INDEXABLE_ROUTES] ${path}`)
  if (NOINDEX_ROUTES.includes(path)) fail(`[sitemap noindex] ${path}`)
  if (REDIRECTS[path]) fail(`[sitemap redirect] ${path}`)
}

for (const path of INDEXABLE_ROUTES) {
  const expected = `${SITE_URL}${path}`
  if (!locs.includes(expected)) fail(`[sitemap ausente] ${path}`)
}

if (/<lastmod>/.test(sitemap)) fail('[sitemap] <lastmod> presente sem fonte confiável de data')

/* --------------------------- sitemap × canonical ------------------------- */

let canonicalChecked = 0
for (const path of INDEXABLE_ROUTES) {
  const file = resolve('dist', path === '/' ? 'index.html' : `${path.slice(1)}/index.html`)
  if (!existsSync(file)) continue
  canonicalChecked++
  const html = readFileSync(file, 'utf-8')
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1]
  const expected = `${SITE_URL}${path}`
  if (canonical !== expected) fail(`[canonical ≠ sitemap] ${path}: ${canonical ?? 'ausente'}`)

  const robotsMeta = html.match(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/)?.[1]
  if (isProduction && robotsMeta && /noindex/.test(robotsMeta))
    fail(`[meta robots] ${path} está no sitemap mas emite "${robotsMeta}" em produção`)
  if (!isProduction && robotsMeta !== 'noindex,nofollow')
    fail(`[preview desprotegido] ${path} emite "${robotsMeta ?? 'ausente'}"`)
}
if (canonicalChecked === 0)
  notes.push('dist/ não encontrado — validação de canonical/meta robots ignorada')

/* -------------------------------- robots -------------------------------- */

const robotsPath = resolve('public/robots.txt')
if (!existsSync(robotsPath)) fail('[robots] public/robots.txt não existe')

const robots = existsSync(robotsPath) ? readFileSync(robotsPath, 'utf-8') : ''
if (!/^User-agent:\s*\*/m.test(robots)) fail('[robots] bloco "User-agent: *" ausente')

const disallows = [...robots.matchAll(/^Disallow:\s*(\S*)\s*$/gm)].map((m) => m[1])

if (isProduction) {
  if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`))
    fail('[robots] diretiva Sitemap ausente ou com domínio divergente')
  for (const d of disallows) {
    if (d === '/') fail('[robots] produção não pode ter "Disallow: /"')
    if (NOINDEX_ROUTES.includes(d))
      fail(`[robots] "${d}" é noindex e não deve ser bloqueado (crawler precisa ler o meta)`)
    if (/^\/(assets|img|fonts)\b/.test(d)) fail(`[robots] bloqueio de assets: ${d}`)
    for (const loc of locs) {
      const path = loc.replace(SITE_URL, '') || '/'
      if (d && path.startsWith(d)) fail(`[robots × sitemap] ${path} bloqueado por "Disallow: ${d}"`)
    }
  }
} else {
  if (!disallows.includes('/'))
    fail('[robots] preview deve conter "Disallow: /" como proteção adicional')
}

/* -------------------------------- saída --------------------------------- */

console.log(`Ambiente: ${isProduction ? 'production' : 'preview'}`)
console.log(`URLs no sitemap: ${locs.length} (INDEXABLE_ROUTES: ${INDEXABLE_ROUTES.length})`)
console.log(`Canonicals verificadas em dist/: ${canonicalChecked}`)
notes.forEach((n) => console.log(`nota: ${n}`))

if (errors.length) {
  console.error(`\n${errors.length} erro(s):`)
  errors.forEach((e) => console.error(` - ${e}`))
  process.exit(1)
}
console.log('\nOK — robots.txt e sitemap.xml consistentes.')
