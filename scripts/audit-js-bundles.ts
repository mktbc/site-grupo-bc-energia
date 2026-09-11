/**
 * Auditoria do JavaScript gerado (PERFORMANCE 02).
 *
 * Lê `dist/` e reporta:
 *  - chunks e tamanhos (bruto + gzip);
 *  - composição do carregamento inicial (entry + modulepreload do index.html);
 *  - chunks acima dos limites de alerta;
 *  - rotas carregadas sob demanda (React.lazy em src/App.tsx);
 *  - presença de hash nos nomes (cache busting) e de source maps públicos.
 *
 * Uso: npm run audit:js  (após `npm run build`)
 */
import { gzipSync } from 'node:zlib'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const DIST = join(process.cwd(), 'dist')
const ASSETS = join(DIST, 'assets')

/** Limites de alerta (gzip). */
const WARNING_GZIP_KB = 250
const INFO_GZIP_KB = 150

const kb = (bytes: number) => Math.round((bytes / 1024) * 10) / 10

if (!existsSync(ASSETS)) {
  console.error('dist/assets não encontrado — rode `npm run build` antes.')
  process.exit(1)
}

type Chunk = { file: string; raw: number; gzip: number }

const chunks: Chunk[] = readdirSync(ASSETS)
  .filter((f) => f.endsWith('.js'))
  .map((file) => {
    const buf = readFileSync(join(ASSETS, file))
    return { file, raw: buf.length, gzip: gzipSync(buf).length }
  })
  .sort((a, b) => b.raw - a.raw)

const html = readFileSync(join(DIST, 'index.html'), 'utf8')
const entry = html.match(/<script[^>]*src="\/assets\/([^"]+)"/)?.[1]
const preloads = [...html.matchAll(/modulepreload"[^>]*href="\/assets\/([^"]+)"/g)].map((m) => m[1])
const initialFiles = [entry, ...preloads].filter(Boolean) as string[]
const initial = chunks.filter((c) => initialFiles.includes(c.file))

const totalRaw = chunks.reduce((s, c) => s + c.raw, 0)
const totalGzip = chunks.reduce((s, c) => s + c.gzip, 0)
const initialRaw = initial.reduce((s, c) => s + c.raw, 0)
const initialGzip = initial.reduce((s, c) => s + c.gzip, 0)

const app = readFileSync(join(process.cwd(), 'src/App.tsx'), 'utf8')
const lazyRoutes = [...app.matchAll(/const\s+(\w+)\s*=\s*lazy\(/g)].map((m) => m[1])
const staticPages = [...app.matchAll(/^import\s+(\w+)\s+from\s+'@\/pages\/[^']+'/gm)].map(
  (m) => m[1]
)

console.log('=== CHUNKS (top 15) ===')
console.log('arquivo'.padEnd(46), 'bruto KB'.padStart(9), 'gzip KB'.padStart(9))
for (const c of chunks.slice(0, 15)) {
  console.log(c.file.padEnd(46), String(kb(c.raw)).padStart(9), String(kb(c.gzip)).padStart(9))
}

console.log('\n=== CARREGAMENTO INICIAL ===')
for (const c of initial) {
  console.log(` - ${c.file} — ${kb(c.raw)} KB (${kb(c.gzip)} KB gzip)`)
}
console.log(`Total inicial: ${kb(initialRaw)} KB (${kb(initialGzip)} KB gzip)`)
console.log(`Total JS: ${kb(totalRaw)} KB (${kb(totalGzip)} KB gzip) em ${chunks.length} chunks`)

console.log('\n=== ROTAS ===')
console.log(`Lazy (React.lazy): ${lazyRoutes.length} — ${lazyRoutes.join(', ')}`)
console.log(`Páginas estáticas no shell: ${staticPages.join(', ') || '(nenhuma)'}`)

let warnings = 0
let infos = 0
console.log('\n=== ALERTAS ===')
for (const c of chunks) {
  if (kb(c.gzip) > WARNING_GZIP_KB) {
    warnings++
    console.log(`WARNING chunk > ${WARNING_GZIP_KB} KB gzip: ${c.file} (${kb(c.gzip)} KB)`)
  } else if (kb(c.gzip) > INFO_GZIP_KB) {
    infos++
    console.log(`INFO chunk > ${INFO_GZIP_KB} KB gzip: ${c.file} (${kb(c.gzip)} KB)`)
  }
}

const tiny = chunks.filter((c) => c.raw < 1024)
if (tiny.length > 5) {
  infos++
  console.log(`INFO fragmentação: ${tiny.length} chunks < 1 KB`)
}

const unhashed = chunks.filter((c) => !/-[A-Za-z0-9_-]{8,}\.js$/.test(c.file))
if (unhashed.length) {
  warnings++
  console.log(`WARNING sem hash no nome (cache busting): ${unhashed.map((c) => c.file).join(', ')}`)
}

const maps = readdirSync(ASSETS).filter((f) => f.endsWith('.map'))
if (maps.length) {
  infos++
  console.log(`INFO source maps publicados em dist/assets: ${maps.length}`)
}

console.log(`\nResultado: ${warnings} WARNING · ${infos} INFO`)
