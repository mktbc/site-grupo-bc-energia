/**
 * Auditoria de semântica HTML (ETAPA SEO 08).
 *
 * Roda sobre o HTML pré-renderizado em `dist/` e valida, por rota indexável:
 *  - exatamente 1 <h1>, não vazio;
 *  - exatamente 1 <main>;
 *  - presença de <header>, <nav> e <footer>;
 *  - headings vazios;
 *  - saltos de hierarquia (H1→H3, H2→H4, ...);
 *  - âncoras sem href (navegação quebrada);
 *  - links internos apontando para rotas inexistentes.
 *
 * ERROS bloqueiam (exit 1). WARNINGS são apenas relatados.
 *
 * Uso: `bunx tsx scripts/audit-html-semantics.ts` (após `npm run build`).
 */
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { INDEXABLE_ROUTES, NOINDEX_ROUTES, REDIRECTS } from '../src/config/routes'

type RouteReport = {
  route: string
  h1: number
  h2: number
  h3: number
  h4: number
  main: number
  header: number
  nav: number
  footer: number
  errors: string[]
  warnings: string[]
}

const KNOWN_ROUTES = new Set<string>([
  ...INDEXABLE_ROUTES,
  ...NOINDEX_ROUTES,
  ...Object.keys(REDIRECTS),
  ...Object.values(REDIRECTS)
])

const htmlFor = (route: string): string | null => {
  const candidates =
    route === '/' ? ['dist/index.html'] : [`dist${route}/index.html`, `dist${route}.html`]
  for (const candidate of candidates) {
    const path = resolve(candidate)
    if (existsSync(path)) return readFileSync(path, 'utf-8')
  }
  return null
}

/** Considera apenas o corpo renderizado da aplicação (ignora <head>). */
const appHtml = (html: string): string => {
  const start = html.indexOf('<body')
  return start === -1 ? html : html.slice(start)
}

const countTag = (html: string, tag: string): number =>
  (html.match(new RegExp(`<${tag}[\\s>]`, 'gi')) || []).length

const stripTags = (value: string) =>
  value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const headings = (html: string): Array<{ level: number; text: string }> =>
  [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({
    level: Number(m[1]),
    text: stripTags(m[2])
  }))

const auditRoute = (route: string): RouteReport | null => {
  const raw = htmlFor(route)
  if (!raw) return null
  const html = appHtml(raw)
  const hs = headings(html)
  const errors: string[] = []
  const warnings: string[] = []

  const byLevel = (level: number) => hs.filter((h) => h.level === level)
  const h1s = byLevel(1)

  if (h1s.length === 0) errors.push('sem <h1>')
  if (h1s.length > 1) errors.push(`${h1s.length} <h1> na mesma página`)
  h1s.forEach((h) => {
    if (!h.text) errors.push('<h1> vazio')
  })

  hs.forEach((h) => {
    if (!h.text) warnings.push(`<h${h.level}> vazio`)
  })

  // Saltos de hierarquia
  let previous = 0
  hs.forEach((h) => {
    if (previous && h.level > previous + 1) {
      warnings.push(`salto H${previous} → H${h.level} ("${h.text.slice(0, 48)}")`)
    }
    previous = h.level
  })

  const main = countTag(html, 'main')
  if (main === 0) errors.push('sem <main>')
  if (main > 1) errors.push(`${main} <main> no documento`)

  const header = countTag(html, 'header')
  const nav = countTag(html, 'nav')
  const footer = countTag(html, 'footer')
  if (header === 0) warnings.push('sem <header>')
  if (nav === 0) warnings.push('sem <nav>')
  if (footer === 0) errors.push('sem <footer>')

  // Âncoras sem href
  const anchors = [...html.matchAll(/<a\b([^>]*)>/gi)]
  const hrefless = anchors.filter((a) => !/\shref=/.test(a[1]))
  if (hrefless.length) errors.push(`${hrefless.length} <a> sem href`)

  // Links internos para rotas desconhecidas
  const internal = anchors
    .map((a) => /\shref="([^"]+)"/.exec(a[1])?.[1])
    .filter((href): href is string => Boolean(href && href.startsWith('/')))
    .map((href) => href.split('#')[0].split('?')[0])
    .filter((href) => href && href !== '/' && !/\.[a-z0-9]+$/i.test(href))
  const unknown = [...new Set(internal)].filter((href) => {
    const normalized = href.replace(/\/$/, '')
    if (KNOWN_ROUTES.has(normalized) || KNOWN_ROUTES.has(`${normalized}/`)) return false
    // rotas dinâmicas (segmentos, artigos, episódios)
    return ![...KNOWN_ROUTES].some((known) => known.includes(':') && sameShape(known, normalized))
  })
  unknown.forEach((href) => warnings.push(`link interno fora do inventário: ${href}`))

  // div/span com onclick não existe no HTML estático; checagem feita no código-fonte.

  return {
    route,
    h1: h1s.length,
    h2: byLevel(2).length,
    h3: byLevel(3).length,
    h4: byLevel(4).length + byLevel(5).length + byLevel(6).length,
    main,
    header,
    nav,
    footer,
    errors,
    warnings
  }
}

function sameShape(pattern: string, path: string) {
  const a = pattern.split('/')
  const b = path.split('/')
  if (a.length !== b.length) return false
  return a.every((segment, index) => segment.startsWith(':') || segment === b[index])
}

const reports: RouteReport[] = []
const missing: string[] = []

for (const route of INDEXABLE_ROUTES) {
  const report = auditRoute(route)
  if (!report) {
    missing.push(route)
    continue
  }
  reports.push(report)
}

// 404: deve ter h1 e nenhum JSON-LD (validado na etapa 07)
const notFound = auditRoute('/404')

console.log('\nMatriz de headings (rotas indexáveis)\n')
console.log('| Rota | H1 | H2 | H3 | H4+ | main | header | nav | footer |')
console.log('| --- | --- | --- | --- | --- | --- | --- | --- | --- |')
reports.forEach((r) => {
  console.log(
    `| ${r.route} | ${r.h1} | ${r.h2} | ${r.h3} | ${r.h4} | ${r.main} | ${r.header} | ${r.nav} | ${r.footer} |`
  )
})

const errorRoutes = reports.filter((r) => r.errors.length)
const warningRoutes = reports.filter((r) => r.warnings.length)

if (warningRoutes.length) {
  console.log('\nWARNINGS')
  warningRoutes.forEach((r) => r.warnings.forEach((w) => console.log(`  [WARN] ${r.route}: ${w}`)))
}

if (missing.length) {
  console.log('\nERROS')
  missing.forEach((route) => console.log(`  [ERROR] ${route}: HTML pré-renderizado ausente`))
}

if (errorRoutes.length) {
  if (!missing.length) console.log('\nERROS')
  errorRoutes.forEach((r) => r.errors.forEach((e) => console.log(`  [ERROR] ${r.route}: ${e}`)))
}

const withOneH1 = reports.filter((r) => r.h1 === 1).length
console.log('\nResumo')
console.log(`  Rotas auditadas:      ${reports.length}`)
console.log(`  Com exatamente 1 H1:  ${withOneH1}`)
console.log(`  Sem H1:               ${reports.filter((r) => r.h1 === 0).length}`)
console.log(`  Com múltiplos H1:     ${reports.filter((r) => r.h1 > 1).length}`)
if (notFound) console.log(`  404 → H1: ${notFound.h1} | main: ${notFound.main}`)

if (missing.length || errorRoutes.length) {
  console.error('\nAuditoria de semântica: FALHOU')
  process.exit(1)
}

console.log(`\nSemântica HTML válida em ${reports.length} rotas indexáveis`)
