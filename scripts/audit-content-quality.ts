/**
 * Auditoria de qualidade de conteúdo (ETAPA SEO 09).
 *
 * Roda sobre o HTML pré-renderizado em `dist/` e valida, por rota indexável:
 *  - conteúdo provisório (Lorem Ipsum, placeholder, mock, TODO, dummy);
 *  - páginas vazias / potencialmente thin (volume textual + nº de seções + links);
 *  - páginas órfãs (0 links internos recebidos) e profundidade de cliques;
 *  - sobreposição textual entre regionais e entre segmentos;
 *  - inconsistências comerciais (percentuais de economia, valores mínimos, estados).
 *
 * ERROS bloqueiam (exit 1). WARNINGS/INFO são apenas relatados —
 * similaridade nunca é tratada como erro.
 *
 * Uso: `bunx tsx scripts/audit-content-quality.ts` (após `npm run build`).
 */
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { INDEXABLE_ROUTES, NOINDEX_ROUTES } from '../src/config/routes'

type Page = {
  route: string
  text: string
  words: number
  sections: number
  internalLinks: string[]
  h2: number
}

const PLACEHOLDER_PATTERNS: Array<[string, RegExp]> = [
  ['lorem ipsum', /lorem\s+ipsum/i],
  ['placeholder textual', /\bplaceholder\b/i],
  ['mock', /\bmock(s|ed)?\b/i],
  ['TODO/FIXME', /\b(TODO|FIXME)\b/],
  ['dummy', /\bdummy\b/i],
  ['coming soon', /coming soon/i],
  ['texto de teste', /\b(texto de teste|conteúdo de teste)\b/i]
]

const errors: string[] = []
const warnings: string[] = []
const infos: string[] = []

const htmlFor = (route: string): string | null => {
  const candidates =
    route === '/' ? ['dist/index.html'] : [`dist${route}/index.html`, `dist${route}.html`]
  for (const candidate of candidates) {
    const path = resolve(candidate)
    if (existsSync(path)) return readFileSync(path, 'utf-8')
  }
  return null
}

const bodyOf = (html: string): string => {
  const start = html.indexOf('<body')
  return start === -1 ? html : html.slice(start)
}

/** Texto visível: remove script/style/svg e tags; normaliza espaços. */
const visibleText = (html: string): string =>
  bodyOf(html)
    .replace(/<(script|style|svg|noscript)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()

/** Conteúdo principal: descarta header/nav/footer para comparação de duplicidade. */
const mainText = (html: string): string => {
  const body = bodyOf(html)
  const main = body.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? body
  return visibleText(main)
}

const internalLinksOf = (html: string): string[] => {
  const body = bodyOf(html)
  const main = body.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? body
  const hrefs = [...main.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1])
  return [...new Set(hrefs.map((h) => (h !== '/' && h.endsWith('/') ? h.slice(0, -1) : h)))]
}

const tokens = (text: string): Set<string> =>
  new Set(
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((word) => word.length > 3)
  )

const jaccard = (a: Set<string>, b: Set<string>): number => {
  let shared = 0
  a.forEach((token) => {
    if (b.has(token)) shared += 1
  })
  const union = a.size + b.size - shared
  return union === 0 ? 0 : Math.round((shared / union) * 100)
}

// ---------------------------------------------------------------- coleta

const pages: Page[] = []

for (const route of INDEXABLE_ROUTES) {
  const html = htmlFor(route)
  if (!html) {
    errors.push(`[prerender] ${route} — HTML não encontrado em dist/`)
    continue
  }
  const text = visibleText(html)
  const main = mainText(html)
  pages.push({
    route,
    text: main,
    words: main.split(' ').filter(Boolean).length,
    sections: (bodyOf(html).match(/<section[\s>]/gi) || []).length,
    internalLinks: internalLinksOf(html),
    h2: (bodyOf(html).match(/<h2[\s>]/gi) || []).length
  })

  for (const [label, pattern] of PLACEHOLDER_PATTERNS) {
    if (pattern.test(text)) errors.push(`[provisório] ${route} — encontrado: ${label}`)
  }
  if (main.length < 200) errors.push(`[vazio] ${route} — conteúdo principal praticamente vazio`)
}

// ---------------------------------------------------------------- thin

const HUBS = new Set(['/produtos', '/segmentos', '/sobre', '/contato'])
const thin: string[] = []
const attention: string[] = []

for (const page of pages) {
  if (HUBS.has(page.route)) {
    // Hub: a função é navegação — exige links, não volume textual.
    if (page.internalLinks.length < 4)
      warnings.push(`[hub] ${page.route} — poucos links internos (${page.internalLinks.length})`)
    continue
  }
  const score = [
    page.words < 300,
    page.sections < 3,
    page.h2 < 2,
    page.internalLinks.length < 3
  ].filter(Boolean).length
  if (score >= 3) thin.push(`${page.route} (${page.words} palavras, ${page.sections} seções)`)
  else if (score === 2)
    attention.push(`${page.route} (${page.words} palavras, ${page.sections} seções)`)
}

thin.forEach((item) => warnings.push(`[thin] ${item}`))
attention.forEach((item) => infos.push(`[atenção] ${item}`))

// ---------------------------------------------------------------- órfãs / profundidade

const incoming = new Map<string, string[]>()
INDEXABLE_ROUTES.forEach((route) => incoming.set(route, []))

for (const page of pages) {
  for (const link of page.internalLinks) {
    if (link === page.route) continue
    if (incoming.has(link)) incoming.get(link)!.push(page.route)
  }
}

for (const [route, sources] of incoming) {
  if (route === '/') continue
  if (sources.length === 0) errors.push(`[órfã] ${route} — 0 links internos recebidos`)
}

const depth = new Map<string, number>([['/', 0]])
let frontier = ['/']
let level = 0
while (frontier.length && level < 8) {
  level += 1
  const next: string[] = []
  for (const route of frontier) {
    const page = pages.find((item) => item.route === route)
    if (!page) continue
    for (const link of page.internalLinks) {
      if (!incoming.has(link) || depth.has(link)) continue
      depth.set(link, level)
      next.push(link)
    }
  }
  frontier = next
}

const unreachable = INDEXABLE_ROUTES.filter((route) => !depth.has(route))
unreachable.forEach((route) =>
  warnings.push(`[profundidade] ${route} — não alcançável a partir da Home (via <main>)`)
)

// ---------------------------------------------------------------- duplicidade

const similarityMatrix = (routes: string[], label: string) => {
  const subset = pages.filter((page) => routes.includes(page.route))
  const rows: Array<[string, string, number]> = []
  for (let i = 0; i < subset.length; i += 1) {
    for (let j = i + 1; j < subset.length; j += 1) {
      rows.push([
        subset[i].route,
        subset[j].route,
        jaccard(tokens(subset[i].text), tokens(subset[j].text))
      ])
    }
  }
  rows.sort((a, b) => b[2] - a[2])
  rows.slice(0, 5).forEach(([a, b, value]) => {
    const grade = value > 50 ? 'ALTA' : value >= 30 ? 'MODERADA' : 'BAIXA'
    const line = `[${label}] ${a} × ${b} → ${value}% (${grade})`
    if (value > 50) warnings.push(line)
    else infos.push(line)
  })
  return rows
}

const regionalRoutes = INDEXABLE_ROUTES.filter((route) => route.startsWith('/energia-solar'))
const segmentRoutes = INDEXABLE_ROUTES.filter((route) => route.startsWith('/segmentos/'))
const regionalMatrix = similarityMatrix(regionalRoutes, 'regional')
const segmentMatrix = similarityMatrix(segmentRoutes, 'segmento')

// ---------------------------------------------------------------- consistência comercial

const commercial = {
  percentuais: new Set<string>(),
  minimos: new Set<string>(),
  estados: new Set<string>()
}

for (const page of pages) {
  ;[...page.text.matchAll(/at[ée]\s+(\d{1,2})\s?%/gi)].forEach((m) =>
    commercial.percentuais.add(`${m[1]}%`)
  )
  ;[...page.text.matchAll(/R\$\s?([\d.,]+\s?(mil)?)/gi)].forEach((m) =>
    commercial.minimos.add(`R$ ${m[1].trim()}`)
  )
  ;['Goiás', 'Tocantins', 'Paraná', 'Minas Gerais', 'Mato Grosso'].forEach((state) => {
    if (page.text.includes(state)) commercial.estados.add(state)
  })
}

if (commercial.percentuais.size > 1)
  warnings.push(
    `[comercial] percentuais de economia divergentes: ${[...commercial.percentuais].join(', ')}`
  )

// ---------------------------------------------------------------- noindex editorial

for (const route of ['/conteudo', '/conteudo/blog', '/conteudo/bc-cast']) {
  if (INDEXABLE_ROUTES.includes(route))
    errors.push(`[editorial] ${route} está em INDEXABLE_ROUTES — deve continuar noindex`)
  if (!NOINDEX_ROUTES.includes(route))
    errors.push(`[editorial] ${route} não está em NOINDEX_ROUTES`)
  const sitemap = resolve('public/sitemap.xml')
  if (existsSync(sitemap) && readFileSync(sitemap, 'utf-8').includes(`${route}<`))
    errors.push(`[editorial] ${route} presente no sitemap.xml`)
}

// ---------------------------------------------------------------- relatório

console.log('\n=== AUDITORIA DE QUALIDADE DE CONTEÚDO (SEO 09) ===\n')
console.log(`Rotas indexáveis auditadas: ${pages.length}/${INDEXABLE_ROUTES.length}`)
console.log(`Palavras (mediana): ${median(pages.map((p) => p.words))}`)
console.log(`Thin: ${thin.length} · Atenção: ${attention.length}`)
console.log(
  `Profundidade máxima a partir da Home: ${Math.max(...[...depth.values()])} clique(s)\n`
)

console.log('— Percentuais encontrados:', [...commercial.percentuais].join(', ') || 'nenhum')
console.log('— Valores mínimos:', [...commercial.minimos].join(', ') || 'nenhum')
console.log('— Estados citados:', [...commercial.estados].join(', ') || 'nenhum')

console.log('\nTop similaridade regional:')
regionalMatrix.slice(0, 3).forEach(([a, b, v]) => console.log(`  ${a} × ${b} → ${v}%`))
console.log('Top similaridade segmentos:')
segmentMatrix.slice(0, 3).forEach(([a, b, v]) => console.log(`  ${a} × ${b} → ${v}%`))

console.log(`\nERRORS (${errors.length}):`)
errors.forEach((item) => console.log('  ✗', item))
console.log(`\nWARNINGS (${warnings.length}):`)
warnings.forEach((item) => console.log('  ⚠', item))
console.log(`\nINFO (${infos.length}):`)
infos.forEach((item) => console.log('  ·', item))

function median(values: number[]): number {
  if (!values.length) return 0
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[Math.floor(sorted.length / 2)]
}

if (errors.length) {
  console.log('\n❌ Auditoria de conteúdo falhou.\n')
  process.exit(1)
}
console.log('\n✅ Auditoria de conteúdo sem erros bloqueantes.\n')
