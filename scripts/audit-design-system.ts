/**
 * Auditoria de consistência do Design System — FRONT-END 01.
 *
 * Detecta desvios da fundação visual:
 *  ERROR   → cores hex hardcoded em componentes/páginas, famílias de fonte
 *            fora do Brandbook, variante de Button desconhecida.
 *  WARNING → radius/shadow arbitrários, cores utilitárias cruas (text-white,
 *            bg-black) fora das exceções.
 *  INFO    → containers ad-hoc e paddings de seção fora da escala.
 *
 * Uso: npm run audit:design-system
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'


type Level = 'ERROR' | 'WARNING' | 'INFO'
type Finding = { level: Level; file: string; line: number; rule: string; snippet: string }

const ROOT = process.cwd()

/** Arquivos onde valores brutos são legítimos (tokens, ícones, CSS de terceiros). */
const EXCEPTIONS = [
  'src/styles/globals.css',
  'src/styles/fonts.css',
  'src/styles/lgpd.css',
  'src/styles/carousel.css',
  'src/config/icons.ts',
  'src/components/Forms/bc-form.css',
  // Parâmetros de tema enviados a embeds de terceiros (querystring do
  // simulador externo) — não são estilos do site, precisam ser hex literais.
  'src/components/SimuleAgora/SimuleAgora.tsx',
  'src/components/FormEmbed/FormEmbed.tsx',
  'src/pages/design-system/page.tsx'
]

const KNOWN_BUTTON_VARIANTS = [
  'primary',
  'secondary',
  'outline',
  'dark',
  'green',
  'ghost',
  'light',
  'link',
  'gray'
]

const walk = (dir: string): string[] =>
  readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap((entry) => {
    const path = `${dir}/${entry.name}`
    if (entry.isDirectory()) return walk(path)
    return /\.(ts|tsx|css)$/.test(entry.name) ? [path] : []
  })

const files = walk('src')
  .map((f) => f.replace(/\\/g, '/'))
  .filter((f) => !EXCEPTIONS.includes(f))


const findings: Finding[] = []
const add = (level: Level, file: string, line: number, rule: string, snippet: string) =>
  findings.push({ level, file, line, rule, snippet: snippet.trim().slice(0, 110) })

for (const file of files) {
  const content = readFileSync(join(ROOT, file), 'utf8')
  content.split('\n').forEach((raw, index) => {
    const line = index + 1
    const text = raw

    if (/#[0-9a-fA-F]{6}\b/.test(text) && !/^\s*(\*|\/\/|\{?\/\*)/.test(text)) {
      add('ERROR', file, line, 'cor-hex-hardcoded', text)
    }
    if (/font-family:\s*(?!.*(Onest|Barlow Condensed|inherit|var\()).+/.test(text)) {
      add('ERROR', file, line, 'font-family-fora-do-brandbook', text)
    }
    const variantMatch = text.match(/variant=["'](\w[\w-]*)["']/)
    if (variantMatch && /Button|buttonStyles/.test(content)) {
      const value = variantMatch[1]
      const isButtonContext = /<Button|<ButtonLink|buttonStyles\(/.test(text)
      if (isButtonContext && !KNOWN_BUTTON_VARIANTS.includes(value)) {
        add('ERROR', file, line, 'button-variante-desconhecida', text)
      }
    }
    if (/rounded-\[[^\]]+\]/.test(text)) add('WARNING', file, line, 'radius-arbitrario', text)
    if (/shadow-\[[^\]]+\]/.test(text)) add('WARNING', file, line, 'shadow-arbitraria', text)
    if (/\b(rgb|rgba|hsl)\(/.test(text) && !/var\(--/.test(text)) {
      add('WARNING', file, line, 'cor-funcional-hardcoded', text)
    }
    if (/\bbg-black\b/.test(text)) add('WARNING', file, line, 'cor-crua-bg-black', text)
    if (/max-w-\[\d+px\]/.test(text)) add('INFO', file, line, 'container-ad-hoc', text)
    if (/\bpy-(?:5|7|9|11|13|15|17|18|19|21|22|23)\b/.test(text)) {
      add('INFO', file, line, 'spacing-fora-da-escala', text)
    }
  })
}

const byLevel = (level: Level) => findings.filter((f) => f.level === level)

const print = (level: Level) => {
  const items = byLevel(level)
  console.log(`\n${level} (${items.length})`)
  for (const item of items.slice(0, 40)) {
    console.log(`  ${relative('.', item.file)}:${item.line} [${item.rule}] ${item.snippet}`)
  }
  if (items.length > 40) console.log(`  … +${items.length - 40} ocorrências`)
}

console.log('AUDITORIA — DESIGN SYSTEM GRUPO BC ENERGIA')
console.log(`Arquivos analisados: ${files.length}`)
print('ERROR')
print('WARNING')
print('INFO')

console.log(
  `\nResumo: ${byLevel('ERROR').length} ERROR · ${byLevel('WARNING').length} WARNING · ${byLevel('INFO').length} INFO`
)

// A auditoria é informativa: apenas ERROR quebra o pipeline.
process.exit(byLevel('ERROR').length > 0 ? 1 : 0)
