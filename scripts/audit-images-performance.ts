/**
 * Auditoria de performance de imagens.
 *
 * Valida:
 *  - arquivos acima de 500 KB (WARNING) e 1 MB (ERROR)
 *  - <img>/<Image> sem width/height (WARNING) — risco de CLS
 *  - referências a arquivos inexistentes em public/ (ERROR)
 *  - raster com versão .webp disponível ainda referenciada (WARNING)
 *  - imagens possivelmente órfãs (INFO)
 *
 * Uso: npx tsx scripts/audit-images-performance.ts
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, extname, relative } from 'node:path'

const ROOT = process.cwd()
const PUBLIC_DIR = join(ROOT, 'public')
const SRC_DIR = join(ROOT, 'src')

const RASTER = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']
const CODE = ['.tsx', '.ts', '.json', '.css', '.html']

type Level = 'ERROR' | 'WARNING' | 'INFO'
const findings: Array<{ level: Level; rule: string; message: string }> = []
const add = (level: Level, rule: string, message: string) => findings.push({ level, rule, message })

const walk = (dir: string, exts: Array<string>): Array<string> => {
  if (!existsSync(dir)) return []
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) return walk(full, exts)
    return exts.includes(extname(full).toLowerCase()) ? [full] : []
  })
}

const images = walk(PUBLIC_DIR, RASTER)
const codeFiles = [...walk(SRC_DIR, CODE), join(ROOT, 'index.html')].filter((f) => existsSync(f))
const codeBlobs = codeFiles.map((f) => ({ file: f, content: readFileSync(f, 'utf8') }))
const allCode = codeBlobs.map((c) => c.content).join('\n')

// 2. Referências quebradas
const refRegex = /["'`(](\/(?:img|bg-home|logo)[\w./-]*\.(?:jpg|jpeg|png|webp|avif|gif|svg))/g
const referenced = new Set<string>()
for (const { file, content } of codeBlobs) {
  for (const match of content.matchAll(refRegex)) {
    const ref = match[1]
    referenced.add(ref)
    if (!existsSync(join(PUBLIC_DIR, ref)))
      add('ERROR', 'referencia', `${relative(ROOT, file)} → ${ref} (arquivo inexistente)`)
  }
}

// 3. Raster referenciado tendo .webp disponível
// Exceção: imagens sociais (og:image / twitter:image) permanecem em JPG/PNG
// por compatibilidade de crawlers sociais — registradas apenas como INFO.
const isSocialOnly = (ref: string) =>
  codeBlobs.every(({ content }) =>
    content
      .split('\n')
      .filter((line) => line.includes(ref) && !/^\s*(\/\/|\*|\/\*)/.test(line))
      .every((line) => /ogImage|og:image|twitter:image|DEFAULT_OG_IMAGE_PATH/.test(line))
  )

for (const ref of referenced) {
  if (!/\.(jpg|jpeg|png)$/i.test(ref)) continue
  const webp = ref.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  if (!existsSync(join(PUBLIC_DIR, webp))) continue
  if (isSocialOnly(ref)) {
    add('INFO', 'formato', `${ref} mantido em raster por uso social (og:image/twitter:image)`)
    continue
  }
  add('WARNING', 'formato', `${ref} tem versão WebP disponível (${webp}) e ainda é referenciado`)
}

// 1. Peso dos arquivos (arquivos sem referência viram INFO — limpeza posterior)
for (const img of images) {
  const size = statSync(img).size
  const rel = '/' + relative(PUBLIC_DIR, img).replace(/\\/g, '/')
  if (size <= 500_000) continue
  const used = allCode.includes(rel.split('/').pop() as string)
  if (!used) {
    add('INFO', 'peso', `${rel} — ${(size / 1024).toFixed(0)} KB, sem referência no código`)
    continue
  }
  if (size > 1_000_000) add('ERROR', 'peso', `${rel} — ${(size / 1024).toFixed(0)} KB (> 1 MB)`)
  else add('WARNING', 'peso', `${rel} — ${(size / 1024).toFixed(0)} KB (> 500 KB)`)
}

// 4. <img> sem width/height
for (const { file, content } of codeBlobs) {
  if (file.endsWith(join('components', 'Image', 'Image.tsx'))) continue
  const tags = content.match(/<(img|Image)\b[\s\S]*?(\/>|>)/g) ?? []
  for (const tag of tags) {
    if (/\bwidth\b/.test(tag) && /\bheight\b/.test(tag)) continue
    if (/\bfill\b/.test(tag) || /aspect-/.test(tag)) continue
    add(
      'WARNING',
      'cls',
      `${relative(ROOT, file)} — <img> sem width/height: ${tag.slice(0, 70).replace(/\s+/g, ' ')}…`
    )
  }
}

// 5. LCP: mais de um fetchpriority="high" por arquivo
for (const { file, content } of codeBlobs) {
  const count = (content.match(/fetchpriority=["']high/gi) ?? []).length
  if (count > 1)
    add('WARNING', 'lcp', `${relative(ROOT, file)} — ${count} imagens com fetchpriority="high"`)
}

// 6. Possíveis órfãos
for (const img of images) {
  const rel = '/' + relative(PUBLIC_DIR, img).replace(/\\/g, '/')
  const base = rel.split('/').pop() as string
  if (!allCode.includes(base))
    add(
      'INFO',
      'orfao',
      `POSSIVELMENTE ÓRFÃO: ${rel} (${(statSync(img).size / 1024).toFixed(0)} KB)`
    )
}

const byLevel = (level: Level) => findings.filter((f) => f.level === level)
for (const level of ['ERROR', 'WARNING', 'INFO'] as Array<Level>) {
  const items = byLevel(level)
  console.log(`\n=== ${level} (${items.length}) ===`)
  items.forEach((i) => console.log(`  [${i.rule}] ${i.message}`))
}

console.log(
  `\nTotal: ${images.length} imagens em public/ · ${byLevel('ERROR').length} erros · ${byLevel('WARNING').length} avisos · ${byLevel('INFO').length} infos`
)

if (byLevel('ERROR').length > 0) process.exitCode = 1
