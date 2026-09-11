/**
 * Auditoria de indexação (ETAPA SEO 04).
 *
 * Valida, sobre o build já gerado em `dist/` e sobre a configuração de rotas:
 *  - toda URL indexável possui canonical absoluta, HTTPS, self-referencing,
 *    sem query/hash/UTM;
 *  - nenhuma URL noindex ou redirecionada aparece no sitemap;
 *  - nenhum canonical aponta para uma URL redirecionada ou noindex;
 *  - redirects sem chain, sem loop e com destino existente e indexável.
 *
 * Uso: `bunx tsx scripts/audit-indexation.ts` (após `npm run build`).
 */
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { INDEXABLE_ROUTES, NOINDEX_ROUTES, REDIRECTS } from '../src/config/routes'
import { SITE_URL } from '../src/config/site'

const errors: string[] = []
const warn = (message: string) => errors.push(message)

/* ------------------------------------------------------------------ */
/* 1. Redirects: chains, loops, destino inexistente/noindex            */
/* ------------------------------------------------------------------ */
for (const [from, to] of Object.entries(REDIRECTS)) {
  if (from === to) warn(`[redirect loop] ${from} → ${to}`)
  if (REDIRECTS[to]) warn(`[redirect chain] ${from} → ${to} → ${REDIRECTS[to]}`)
  if (INDEXABLE_ROUTES.includes(from)) warn(`[redirect indexável] ${from} está em INDEXABLE_ROUTES`)
  if (NOINDEX_ROUTES.includes(to)) warn(`[redirect → noindex] ${from} → ${to}`)
  if (!INDEXABLE_ROUTES.includes(to)) warn(`[redirect destino inválido] ${from} → ${to}`)
}

/* ------------------------------------------------------------------ */
/* 2. Sobreposição entre listas                                        */
/* ------------------------------------------------------------------ */
for (const route of NOINDEX_ROUTES) {
  if (INDEXABLE_ROUTES.includes(route)) warn(`[conflito] ${route} está em INDEXABLE e NOINDEX`)
}

/* ------------------------------------------------------------------ */
/* 3. Sitemap                                                          */
/* ------------------------------------------------------------------ */
const sitemapPath = resolve('public/sitemap.xml')
if (!existsSync(sitemapPath)) {
  warn('[sitemap] public/sitemap.xml não encontrado')
} else {
  const xml = readFileSync(sitemapPath, 'utf-8')
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  const paths = locs.map((loc) => loc.replace(SITE_URL, '') || '/')

  for (const path of paths) {
    if (NOINDEX_ROUTES.includes(path)) warn(`[sitemap] URL noindex presente: ${path}`)
    if (REDIRECTS[path]) warn(`[sitemap] URL redirecionada presente: ${path}`)
    if (!INDEXABLE_ROUTES.includes(path)) warn(`[sitemap] URL fora de INDEXABLE_ROUTES: ${path}`)
    if (!locs.every((loc) => loc.startsWith('https://'))) warn('[sitemap] loc sem HTTPS')
  }
  for (const route of INDEXABLE_ROUTES) {
    if (!paths.includes(route)) warn(`[sitemap] rota indexável ausente: ${route}`)
  }
  const dup = paths.filter((p, i) => paths.indexOf(p) !== i)
  if (dup.length) warn(`[sitemap] URLs duplicadas: ${dup.join(', ')}`)
}

/* ------------------------------------------------------------------ */
/* 4. HTML pré-renderizado: canonical + robots                         */
/* ------------------------------------------------------------------ */
const DIST = resolve('dist')
let checkedHtml = 0

if (existsSync(DIST)) {
  for (const route of INDEXABLE_ROUTES) {
    const file = route === '/' ? resolve(DIST, 'index.html') : resolve(DIST, `${route.slice(1)}.html`)
    if (!existsSync(file)) {
      warn(`[prerender] HTML ausente para ${route}`)
      continue
    }
    checkedHtml += 1
    const html = readFileSync(file, 'utf-8')
    const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1]

    if (!canonical) {
      warn(`[canonical] ausente em ${route}`)
      continue
    }
    const expected = `${SITE_URL}${route}`
    if (canonical !== expected) warn(`[canonical] ${route} → ${canonical} (esperado ${expected})`)
    if (!canonical.startsWith('https://')) warn(`[canonical] sem HTTPS em ${route}`)
    if (/[?#]/.test(canonical)) warn(`[canonical] com query/hash em ${route}`)
    const target = canonical.replace(SITE_URL, '') || '/'
    if (REDIRECTS[target]) warn(`[canonical] aponta para URL redirecionada em ${route}`)
    if (NOINDEX_ROUTES.includes(target)) warn(`[canonical] aponta para URL noindex em ${route}`)
  }

  for (const route of [...NOINDEX_ROUTES, ...Object.keys(REDIRECTS)]) {
    const file = resolve(DIST, `${route.slice(1)}.html`)
    if (existsSync(file)) warn(`[prerender] HTML indexável gerado para URL não-indexável: ${route}`)
  }
} else {
  console.log('dist/ ausente — auditoria de HTML pulada (rode npm run build antes).')
}

/* ------------------------------------------------------------------ */
console.log(
  `INDEX: ${INDEXABLE_ROUTES.length} | NOINDEX: ${NOINDEX_ROUTES.length} | REDIRECT: ${Object.keys(REDIRECTS).length} | HTML auditado: ${checkedHtml}`
)

if (errors.length) {
  console.error(`\nauditoria de indexação: ${errors.length} problema(s)`)
  errors.forEach((e) => console.error(` - ${e}`))
  process.exit(1)
}
console.log('auditoria de indexação: OK')
