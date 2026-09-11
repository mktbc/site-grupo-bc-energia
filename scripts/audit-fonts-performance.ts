/**
 * Auditoria de fontes (PERFORMANCE 03).
 *
 * Valida:
 *  - @font-face sem font-display;
 *  - formatos não WOFF2;
 *  - preload de fonte inexistente / não declarada em @font-face;
 *  - preload duplicado ou excessivo;
 *  - chamadas externas a Google Fonts (duplicação de download);
 *  - famílias antigas ativas (Montserrat, Open Sans, Roboto);
 *  - pesos declarados e não utilizados no código.
 *
 * Uso: npm run audit:fonts
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join } from 'node:path'

const ROOT = process.cwd()
const FONTS_DIR = join(ROOT, 'public/fonts')
const CSS = join(ROOT, 'src/styles/fonts.css')
const HTML = join(ROOT, 'index.html')

const errors: string[] = []
const warnings: string[] = []
const infos: string[] = []

const css = existsSync(CSS) ? readFileSync(CSS, 'utf8') : ''
const html = readFileSync(HTML, 'utf8')
if (!css) errors.push('src/styles/fonts.css não encontrado')

/* ---- @font-face ---- */
const faces = [...css.matchAll(/@font-face\s*\{([\s\S]*?)\}/g)].map((m) => m[1])
type Face = { family: string; weight: string; file: string; display: string }
const parsed: Face[] = faces.map((b) => ({
  family: b.match(/font-family:\s*'([^']+)'/)?.[1] ?? '?',
  weight: b.match(/font-weight:\s*(\d+)/)?.[1] ?? '?',
  file: b.match(/url\('([^']+)'\)/)?.[1] ?? '?',
  display: b.match(/font-display:\s*(\w+)/)?.[1] ?? ''
}))

// Fallbacks com métricas ajustadas (size-adjust + local()) não carregam arquivo
// e não precisam de font-display — não são faces de rede.
const networkFaces = parsed.filter((f) => f.file !== '?' && !/Fallback$/.test(f.family))

for (const f of networkFaces) {
  if (f.display !== 'swap') errors.push(`@font-face sem font-display: swap → ${f.file}`)
  if (!f.file.endsWith('.woff2')) errors.push(`formato não WOFF2 → ${f.file}`)
  if (!existsSync(join(ROOT, 'public', f.file))) errors.push(`arquivo inexistente → ${f.file}`)
}

/* ---- arquivos órfãos ---- */
const declared = new Set(parsed.map((f) => f.file.replace('/fonts/', '')))
const onDisk = existsSync(FONTS_DIR) ? readdirSync(FONTS_DIR) : []
for (const file of onDisk) {
  if (!declared.has(file)) warnings.push(`POSSIVELMENTE ÓRFÃO: public/fonts/${file}`)
}
const totalBytes = onDisk.reduce((s, f) => s + statSync(join(FONTS_DIR, f)).size, 0)

/* ---- preloads ---- */
const preloads = [...html.matchAll(/rel="preload"[^>]*as="font"[^>]*href="([^"]+)"[^>]*>/g)].map(
  (m) => ({ href: m[1], tag: m[0] })
)
const seen = new Set<string>()
for (const p of preloads) {
  if (seen.has(p.href)) errors.push(`preload duplicado → ${p.href}`)
  seen.add(p.href)
  if (!declared.has(p.href.replace('/fonts/', '')))
    errors.push(`preload sem @font-face correspondente → ${p.href}`)
  if (!/crossorigin/.test(p.tag)) errors.push(`preload de fonte sem crossorigin → ${p.href}`)
}
if (preloads.length > 2) warnings.push(`preload excessivo: ${preloads.length} fontes`)

/* ---- chamadas externas ---- */
if (/fonts\.(googleapis|gstatic)\.com/.test(html) || /fonts\.googleapis\.com/.test(css))
  warnings.push('chamada externa a Google Fonts encontrada (possível download duplicado)')

/* ---- famílias antigas ---- */
const grep = (pattern: string) => {
  try {
    return execSync(`rg -n --no-heading "${pattern}" src index.html tailwind.config.ts`, {
      encoding: 'utf8'
    }).trim()
  } catch {
    return ''
  }
}
for (const legacy of ['Montserrat', 'Open Sans', 'Roboto']) {
  const hit = grep(legacy)
  if (hit) warnings.push(`família antiga referenciada (${legacy}):\n${hit}`)
}

/* ---- pesos usados vs carregados ---- */
const weightClass: Record<string, string> = {
  'font-light': '300',
  'font-normal': '400',
  'font-medium': '500',
  'font-semibold': '600',
  'font-bold': '700'
}
const used = new Set<string>()
for (const [cls, w] of Object.entries(weightClass)) if (grep(`\\b${cls}\\b`)) used.add(w)
for (const w of ['400', '500', '600', '700'])
  if (grep(`font-weight:\\s*${w}`)) used.add(w)
used.add('400') // peso base do body
used.add('700') // títulos (Barlow Condensed)

const loaded = new Set(parsed.map((f) => f.weight))
for (const w of loaded) if (!used.has(w)) warnings.push(`peso carregado e não utilizado: ${w}`)
for (const w of used) if (!loaded.has(w)) infos.push(`peso usado sem arquivo próprio (fallback para o mais próximo): ${w}`)

/* ---- relatório ---- */
console.log('=== FONTES DECLARADAS ===')
for (const f of parsed) console.log(` - ${f.family} ${f.weight} · ${f.file} · ${f.display}`)
console.log(`\nArquivos em public/fonts: ${onDisk.length} · ${(totalBytes / 1024).toFixed(1)} KB`)
console.log(`Preloads: ${preloads.map((p) => p.href).join(', ') || '(nenhum)'}`)

console.log('\n=== RESULTADO ===')
errors.forEach((e) => console.log(`ERROR ${e}`))
warnings.forEach((w) => console.log(`WARNING ${w}`))
infos.forEach((i) => console.log(`INFO ${i}`))
console.log(`\n${errors.length} ERROR · ${warnings.length} WARNING · ${infos.length} INFO`)
if (errors.length) process.exit(1)
