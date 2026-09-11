/**
 * Auditoria de dados estruturados (ETAPA SEO 07).
 *
 * Roda sobre o HTML pré-renderizado em `dist/` e valida:
 *  - JSON-LD sintaticamente válido;
 *  - ausência de blocos duplicados (Organization, WebSite, Service,
 *    BreadcrumbList, FAQPage) na mesma página;
 *  - URLs internas absolutas, HTTPS, sem `www` e sem apontar para redirect;
 *  - Organization/WebSite apenas na Home;
 *  - nenhum schema em páginas noindex, em redirects ou no 404;
 *  - Service com URL canônica atual;
 *  - BreadcrumbList com name/item/position e itens em ordem.
 *
 * Uso: `bunx tsx scripts/audit-structured-data.ts` (após `npm run build`).
 */
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { INDEXABLE_ROUTES, NOINDEX_ROUTES, REDIRECTS } from '../src/config/routes'
import { SITE_URL } from '../src/config/site'

const errors: string[] = []
const notes: string[] = []
const fail = (message: string) => errors.push(message)

const htmlFor = (route: string): string | null => {
  const candidates =
    route === '/'
      ? ['dist/index.html']
      : [`dist${route}/index.html`, `dist${route}.html`]
  for (const candidate of candidates) {
    const path = resolve(candidate)
    if (existsSync(path)) return readFileSync(path, 'utf-8')
  }
  return null
}

const extract = (html: string): unknown[] => {
  const blocks = [
    ...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)
  ]
  return blocks.map((match) => {
    const raw = match[1]
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
    return JSON.parse(raw)
  })
}

const urlsIn = (value: unknown, acc: string[] = []): string[] => {
  if (typeof value === 'string') {
    if (/^https?:\/\//i.test(value)) acc.push(value)
  } else if (Array.isArray(value)) {
    value.forEach((item) => urlsIn(item, acc))
  } else if (value && typeof value === 'object') {
    Object.values(value as Record<string, unknown>).forEach((item) => urlsIn(item, acc))
  }
  return acc
}

const REDIRECT_SOURCES = Object.keys(REDIRECTS)

const auditRoute = (route: string, { allowSchema }: { allowSchema: boolean }) => {
  const html = htmlFor(route)
  if (!html) {
    if (allowSchema) fail(`[html ausente] ${route} não foi pré-renderizado`)
    return
  }

  let schemas: unknown[]
  try {
    schemas = extract(html)
  } catch (error) {
    fail(`[json inválido] ${route}: ${(error as Error).message}`)
    return
  }

  if (!allowSchema) {
    if (schemas.length > 0) {
      fail(`[schema indevido] ${route} é noindex/redirect/404 e emite ${schemas.length} bloco(s)`)
    }
    return
  }

  const types = schemas.map((schema) => String((schema as Record<string, unknown>)['@type']))
  for (const type of ['Organization', 'WebSite', 'Service', 'BreadcrumbList', 'FAQPage']) {
    const count = types.filter((item) => item === type).length
    if (count > 1) fail(`[duplicado] ${route}: ${type} aparece ${count}x`)
  }

  if (route !== '/' && (types.includes('Organization') || types.includes('WebSite'))) {
    fail(`[escopo] ${route}: Organization/WebSite devem existir apenas na Home`)
  }
  if (route === '/' && (!types.includes('Organization') || !types.includes('WebSite'))) {
    fail('[home] Organization/WebSite ausentes no HTML pré-renderizado da Home')
  }

  for (const url of urlsIn(schemas)) {
    if (!url.startsWith(SITE_URL) && !/^https:\/\//i.test(url)) {
      fail(`[url inválida] ${route}: ${url}`)
    }
    if (url.startsWith('http://')) fail(`[http] ${route}: ${url}`)
    if (/^https?:\/\/www\.grupobcenergia\./i.test(url)) fail(`[www] ${route}: ${url}`)
    if (/lovable|localhost|preview/i.test(url)) fail(`[preview] ${route}: ${url}`)
    const path = url.startsWith(SITE_URL) ? url.slice(SITE_URL.length).split('#')[0] || '/' : null
    if (path && REDIRECT_SOURCES.includes(path)) {
      fail(`[redirect referenciado] ${route}: ${url}`)
    }
    if (path && NOINDEX_ROUTES.includes(path)) {
      notes.push(`[aviso] ${route} referencia URL noindex em schema: ${url}`)
    }
  }

  for (const schema of schemas as Array<Record<string, unknown>>) {
    if (schema['@type'] === 'BreadcrumbList') {
      const items = (schema.itemListElement ?? []) as Array<Record<string, unknown>>
      items.forEach((item, index) => {
        if (item.position !== index + 1) fail(`[breadcrumb] ${route}: position fora de ordem`)
        if (!item.name || !item.item) fail(`[breadcrumb] ${route}: item sem name/item`)
      })
      if (items.length < 2) fail(`[breadcrumb] ${route}: trilha com menos de 2 níveis`)
    }

    if (schema['@type'] === 'Service') {
      const url = String(schema.url ?? '')
      if (url !== `${SITE_URL}${route}`) {
        fail(`[service url] ${route}: url do Service = ${url}`)
      }
      if (!schema.provider) fail(`[service provider] ${route}: provider ausente`)
    }

    if (schema['@type'] === 'FAQPage') {
      const entities = (schema.mainEntity ?? []) as Array<Record<string, unknown>>
      if (entities.length === 0) fail(`[faq] ${route}: FAQPage sem perguntas`)
      for (const entity of entities) {
        const answer = entity.acceptedAnswer as Record<string, unknown> | undefined
        if (!entity.name || !answer?.text) fail(`[faq] ${route}: pergunta/resposta vazia`)
      }
    }
  }
}

for (const route of INDEXABLE_ROUTES) auditRoute(route, { allowSchema: true })
for (const route of NOINDEX_ROUTES) auditRoute(route, { allowSchema: false })
for (const route of REDIRECT_SOURCES) auditRoute(route, { allowSchema: false })
auditRoute('/404', { allowSchema: false })

const notFound = resolve('dist/404.html')
if (existsSync(notFound)) {
  const html = readFileSync(notFound, 'utf-8')
  if (/application\/ld\+json/.test(html)) fail('[404] dist/404.html contém JSON-LD')
}

for (const note of notes) console.log(note)

if (errors.length > 0) {
  console.error(`\n✗ Auditoria de dados estruturados: ${errors.length} problema(s)`)
  errors.forEach((error) => console.error(`  - ${error}`))
  process.exit(1)
}

console.log(`✓ Dados estruturados válidos em ${INDEXABLE_ROUTES.length} rotas indexáveis`)
