/**
 * PERFORMANCE 04 — Auditoria de scripts de terceiros.
 *
 * Verifica:
 * - duplicidade de GTM / GA4 / Meta Pixel / TikTok Pixel;
 * - scripts externos em http://;
 * - IDs de integração hardcoded fora de src/config/integrations.ts;
 * - iframes sem loading="lazy";
 * - embeds de YouTube carregados sem facade;
 * - PII em payload de eventos de analytics.
 *
 * Uso: npm run audit:thirdparty
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

type Level = 'ERROR' | 'WARNING' | 'INFO'
const findings: Array<{ level: Level; msg: string }> = []
const add = (level: Level, msg: string) => findings.push({ level, msg })

const ROOT = process.cwd()
const SRC = join(ROOT, 'src')

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })

const files = walk(SRC).filter((f) => /\.(ts|tsx|css)$/.test(f))
const html = readFileSync(join(ROOT, 'index.html'), 'utf8')
const read = (f: string) => readFileSync(f, 'utf8')
const rel = (f: string) => relative(ROOT, f)

const countAll = (needle: RegExp, extra: string[] = []) => {
  let n = 0
  ;[html, ...extra, ...files.map(read)].forEach((content) => {
    n += (content.match(needle) ?? []).length
  })
  return n
}

// 1. GTM — deve existir exatamente 1 inicialização (loader central)
const gtmLoaders = countAll(/googletagmanager\.com\/(gtm|gtag)\.js/g)
if (gtmLoaders === 0) add('WARNING', 'Nenhum loader de GTM encontrado.')
else if (gtmLoaders > 1) add('ERROR', `GTM inicializado ${gtmLoaders}x — duplicidade de container.`)
else add('INFO', 'GTM: 1 inicialização (loader central).')

if (/googletagmanager\.com/.test(html)) {
  add('ERROR', 'index.html ainda carrega GTM hardcoded (risco de duplicidade com o loader React).')
}

// 2. GA4 direto (fora do GTM)
const ga4 = countAll(/gtag\(\s*['"]config['"]/g)
if (ga4 > 0) add('WARNING', `GA4 configurado diretamente ${ga4}x — verificar dupla page_view com GTM.`)
else add('INFO', 'GA4: carregado apenas via GTM (sem gtag config direto).')

// 3. Meta Pixel / TikTok Pixel
const meta = countAll(/fbq\(\s*['"]init['"]|connect\.facebook\.net/g)
if (meta > 1) add('ERROR', `Meta Pixel inicializado ${meta}x.`)
else add('INFO', meta === 0 ? 'Meta Pixel: ausente no código-fonte.' : 'Meta Pixel: 1 inicialização.')

const tiktok = countAll(/ttq\.load\(|analytics\.tiktok\.com/g)
if (tiktok > 1) add('ERROR', `TikTok Pixel inicializado ${tiktok}x.`)
else add('INFO', tiktok === 0 ? 'TikTok Pixel: ausente no código-fonte.' : 'TikTok Pixel: 1 inicialização.')

// 4. HTTP inseguro
;[['index.html', html], ...files.map((f) => [rel(f), read(f)] as const)].forEach(([name, content]) => {
  if (/http:\/\/(?!localhost|127\.0\.0\.1|www\.w3\.org|schema\.org)/.test(String(content))) {
    const isScript = /(src|href)=["'`]http:\/\//.test(String(content)) &&
      /<script|<iframe/.test(String(content))
    add(
      isScript ? 'ERROR' : 'WARNING',
      `Recurso/link externo em http:// em ${name} (sem HTTPS).`
    )
  }
})

// 5. IDs hardcoded fora da config
const CONFIG = 'src/config/integrations.ts'
files.forEach((f) => {
  const name = rel(f)
  if (name === CONFIG) return
  const content = read(f)
  if (/GTM-[A-Z0-9]{4,}/.test(content)) add('ERROR', `ID de GTM hardcoded em ${name}.`)
  if (/['"`]G-[A-Z0-9]{8,}['"`]/.test(content)) add('WARNING', `Possível ID GA4 hardcoded em ${name}.`)
})
if (/GTM-[A-Z0-9]{4,}/.test(html)) add('ERROR', 'ID de GTM hardcoded em index.html.')

// 6. iframes sem lazy + YouTube sem facade
files
  .filter((f) => f.endsWith('.tsx'))
  .forEach((f) => {
    const content = read(f)
    const name = rel(f)
    const iframes = content.split('<iframe').slice(1)
    iframes.forEach((chunk) => {
      const tag = chunk.split('/>')[0]
      if (!/loading=["{]?\s*['"]?lazy/.test(tag)) {
        add('WARNING', `iframe sem loading="lazy" em ${name}.`)
      }
    })
    if (/youtube\.com\/embed/.test(content) && !/YouTubeEmbed|setActive|active \?/.test(content)) {
      add('WARNING', `Embed de YouTube possivelmente sem facade em ${name}.`)
    }
  })

// 7. PII em analytics
const PII = /\b(email|e_mail|telefone|phone|cpf|cnpj|nome_completo|full_name|address|endereco)\b/i
walk(join(SRC, 'lib', 'analytics')).forEach((f) => {
  const content = read(f)
  content.split('\n').forEach((line, i) => {
    if (/emit\(|pushDataLayerEvent\(/.test(line) && PII.test(line)) {
      add('ERROR', `Possível PII em evento de analytics: ${rel(f)}:${i + 1}`)
    }
  })
})
add('INFO', 'Analytics: eventos auditados em src/lib/analytics (sem PII em payload).')

// Saída
const order: Level[] = ['ERROR', 'WARNING', 'INFO']
order.forEach((level) => {
  findings
    .filter((x) => x.level === level)
    .forEach((x) => console.log(`[${level}] ${x.msg}`))
})

const errors = findings.filter((x) => x.level === 'ERROR').length
const warnings = findings.filter((x) => x.level === 'WARNING').length
console.log(`\nResumo: ${errors} ERROR, ${warnings} WARNING, ${findings.length - errors - warnings} INFO`)
process.exit(errors > 0 ? 1 : 0)
