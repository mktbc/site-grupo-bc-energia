/**
 * PERFORMANCE 05 — Performance budget.
 *
 * Valida, contra o build em dist/, os limites definidos a partir dos números
 * reais medidos ao fim da FASE 2. Serve para detectar regressão futura.
 *
 * Uso: npm run audit:budget  (ou npm run audit:performance para o agregado)
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, relative, extname } from 'node:path'
import { gzipSync } from 'node:zlib'

type Level = 'ERROR' | 'WARNING' | 'INFO'
const findings: Array<{ level: Level; msg: string }> = []
const add = (level: Level, msg: string) => findings.push({ level, msg })

const ROOT = process.cwd()
const DIST = join(ROOT, 'dist')
const PUBLIC = join(ROOT, 'public')

export const BUDGETS = {
  initialJsGzipKB: 160, // atual: ~146 KB
  largestChunkGzipKB: 70, // atual: index ~66 KB
  maxImageKB: 500,
  lcpHeroImageKB: 100, // /bg-home.webp
  criticalFontPreloads: 2,
  criticalThirdPartyScripts: 0,
  fontsTotalKB: 260 // atual: ~225 KB
}

const kb = (bytes: number) => Math.round((bytes / 1024) * 10) / 10

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })

if (!existsSync(DIST)) {
  console.log('[ERROR] dist/ não encontrado — rode `npm run build` antes da auditoria de budget.')
  process.exit(1)
}

// 1. JS inicial (entry + chunks referenciados por <script>/modulepreload no index.html)
const html = readFileSync(join(DIST, 'index.html'), 'utf8')
const initial = [...html.matchAll(/(?:src|href)="\/(assets\/[^"]+\.js)"/g)].map((m) => m[1])
const gzipOf = (rel: string) => gzipSync(readFileSync(join(DIST, rel))).length

let initialGzip = 0
let initialRaw = 0
initial.forEach((rel) => {
  initialRaw += statSync(join(DIST, rel)).size
  initialGzip += gzipOf(rel)
})
add('INFO', `JS inicial: ${kb(initialRaw)} KB bruto · ${kb(initialGzip)} KB gzip (${initial.length} chunks)`)
if (kb(initialGzip) > BUDGETS.initialJsGzipKB) {
  add('ERROR', `JS inicial gzip ${kb(initialGzip)} KB acima do budget de ${BUDGETS.initialJsGzipKB} KB.`)
}

// 2. Maior chunk
const jsFiles = walk(join(DIST, 'assets')).filter((f) => f.endsWith('.js'))
const largest = jsFiles
  .map((f) => ({ f, gz: gzipSync(readFileSync(f)).length }))
  .sort((a, b) => b.gz - a.gz)[0]
if (largest) {
  add('INFO', `Maior chunk: ${relative(DIST, largest.f)} — ${kb(largest.gz)} KB gzip`)
  if (kb(largest.gz) > BUDGETS.largestChunkGzipKB) {
    add(
      'WARNING',
      `Maior chunk ${kb(largest.gz)} KB gzip acima do budget de ${BUDGETS.largestChunkGzipKB} KB.`
    )
  }
}

// 3. Imagens
const IMG = /\.(jpg|jpeg|png|webp|avif|gif)$/i
const images = walk(PUBLIC).filter((f) => IMG.test(extname(f)))
let heavy = 0
images.forEach((f) => {
  const size = statSync(f).size
  if (kb(size) > BUDGETS.maxImageKB) {
    heavy += 1
    add('WARNING', `Imagem acima de ${BUDGETS.maxImageKB} KB: /${relative(PUBLIC, f)} (${kb(size)} KB)`)
  }
})
add('INFO', `Imagens em public/: ${images.length} · acima do budget: ${heavy}`)

// 4. Imagem LCP da Home
const hero = join(PUBLIC, 'bg-home.webp')
if (!existsSync(hero)) add('ERROR', 'Imagem LCP /bg-home.webp não encontrada.')
else {
  const size = kb(statSync(hero).size)
  add('INFO', `Imagem LCP Home: /bg-home.webp — ${size} KB`)
  if (size > BUDGETS.lcpHeroImageKB) {
    add('WARNING', `Imagem LCP ${size} KB acima do budget de ${BUDGETS.lcpHeroImageKB} KB.`)
  }
}

// 5. Fontes: preloads críticos e peso total
const preloads = [...html.matchAll(/<link[^>]+rel="preload"[^>]+as="font"[^>]*>/g)]
add('INFO', `Preloads de fonte: ${preloads.length}`)
if (preloads.length > BUDGETS.criticalFontPreloads) {
  add('ERROR', `${preloads.length} preloads de fonte — budget é ${BUDGETS.criticalFontPreloads}.`)
}
const fontsDir = join(PUBLIC, 'fonts')
if (existsSync(fontsDir)) {
  const fonts = walk(fontsDir)
  const total = fonts.reduce((n, f) => n + statSync(f).size, 0)
  add('INFO', `Fontes self-hosted: ${fonts.length} arquivos · ${kb(total)} KB`)
  if (fonts.some((f) => !f.endsWith('.woff2'))) add('WARNING', 'Fonte fora do formato WOFF2 em public/fonts.')
  if (kb(total) > BUDGETS.fontsTotalKB) {
    add('WARNING', `Peso das fontes ${kb(total)} KB acima do budget de ${BUDGETS.fontsTotalKB} KB.`)
  }
}
if (/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(html)) {
  add('ERROR', 'Google Fonts referenciado no HTML — fontes devem ser self-hosted.')
}

// 6. Terceiros no caminho crítico
const critical = [...html.matchAll(/<script[^>]+src="(https?:\/\/[^"]+)"/g)].map((m) => m[1])
add('INFO', `Scripts de terceiros no HTML inicial: ${critical.length}`)
if (critical.length > BUDGETS.criticalThirdPartyScripts) {
  critical.forEach((src) => add('ERROR', `Script de terceiro no caminho crítico: ${src}`))
}

// 7. Cache busting
const hashed = jsFiles.filter((f) => /-[A-Za-z0-9_-]{8,}\.js$/.test(f)).length
add('INFO', `Cache busting: ${hashed}/${jsFiles.length} chunks JS com hash no nome`)
if (hashed < jsFiles.length) add('WARNING', 'Existem chunks JS sem hash (sem cache busting).')

const order: Level[] = ['ERROR', 'WARNING', 'INFO']
order.forEach((level) =>
  findings.filter((x) => x.level === level).forEach((x) => console.log(`[${level}] ${x.msg}`))
)
const errors = findings.filter((x) => x.level === 'ERROR').length
const warnings = findings.filter((x) => x.level === 'WARNING').length
console.log(`\nResumo budget: ${errors} ERROR, ${warnings} WARNING, ${findings.length - errors - warnings} INFO`)
process.exit(errors > 0 ? 1 : 0)
