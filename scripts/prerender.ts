/**
 * Pré-renderização estática (SSG) das rotas públicas indexáveis.
 *
 * Executado após o `vite build` (script `postbuild`):
 *  1. compila o bundle de servidor (src/entry-server.tsx) em `dist-ssr/`;
 *  2. renderiza cada rota de INDEXABLE_ROUTES para HTML;
 *  3. escreve `dist/<rota>/index.html` com o HTML e o <head> reais.
 *
 * O `dist/index.html` original é usado como template. As tags estáticas
 * marcadas com data-rh="true" são removidas do template antes da injeção,
 * pois o head pré-renderizado (react-helmet-async) já as substitui — assim
 * não há duplicidade nem divergência com o canonical da rota.
 *
 * Rotas noindex (/contato/enviado, /conteudo/*), 404 e redirecionamentos de
 * documentos NÃO são pré-renderizados: continuam servidos pelo SPA.
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import { INDEXABLE_ROUTES } from '../src/config/routes'

const DIST = resolve('dist')
const SSR_DIST = resolve('dist-ssr')

const buildServerBundle = () => {
  execFileSync(
    'npx',
    ['vite', 'build', '--ssr', 'src/entry-server.tsx', '--outDir', 'dist-ssr', '--logLevel', 'warn'],
    { stdio: 'inherit' }
  )
}

/**
 * Tags de SEO estáticas do template (index.html) que o head pré-renderizado
 * substitui por versões específicas de cada rota. Se permanecerem, o HTML
 * final fica com metadata duplicada (duas descriptions, dois og:title, etc.).
 */
const STATIC_SEO_PATTERNS = [
  'data-rh="true"',
  'name="description"',
  'property="og:',
  'name="twitter:',
  'rel="canonical"'
]

const stripStaticHelmetTags = (html: string): string =>
  html
    .split('\n')
    .filter((line) => !STATIC_SEO_PATTERNS.some((pattern) => line.includes(pattern)))
    .join('\n')

const run = async () => {
  buildServerBundle()

  const entry = pathToFileURL(resolve(SSR_DIST, 'entry-server.js')).href
  const { render } = (await import(entry)) as {
    render: (url: string) => Promise<{ html: string; head: string }>
  }

  const template = stripStaticHelmetTags(readFileSync(resolve(DIST, 'index.html'), 'utf-8'))

  for (const route of INDEXABLE_ROUTES) {
    const { html, head } = await render(route)

    const page = template
      .replace('</head>', `  ${head}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)

    const dir = route === '/' ? DIST : resolve(DIST, route.replace(/^\//, ''))
    mkdirSync(dir, { recursive: true })
    writeFileSync(resolve(dir, 'index.html'), page)

    // Cópia "<rota>.html" ao lado do diretório: alguns servidores estáticos
    // resolvem /rota como /rota.html e só entregam o index do diretório
    // quando há barra final. Com as duas formas, a URL sem barra final
    // (a canônica) sempre recebe o HTML pré-renderizado, e não o fallback SPA.
    if (route !== '/') {
      const segments = route.replace(/^\//, '').split('/')
      const parent = resolve(DIST, ...segments.slice(0, -1))
      mkdirSync(parent, { recursive: true })
      writeFileSync(resolve(parent, `${segments[segments.length - 1]}.html`), page)
    }
  }

  // ETAPA SEO 06 — `dist/404.html`: HTML real de "Página não encontrada"
  // (noindex,nofollow, sem canonical). Hostings estáticos que suportam página
  // de erro devem servi-lo com HTTP 404 para rotas desconhecidas, em vez do
  // fallback SPA com o HTML da Home. Não entra no sitemap nem em rotas indexáveis.
  const notFound = await render('/__not-found__')
  writeFileSync(
    resolve(DIST, '404.html'),
    template
      .replace('</head>', `  ${notFound.head}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${notFound.html}</div>`)
  )

  rmSync(SSR_DIST, { recursive: true, force: true })
  console.log(`pré-render concluído (${INDEXABLE_ROUTES.length} rotas + 404.html)`)
}


run().catch((error) => {
  console.error('[prerender] falhou:', error)
  process.exit(1)
})
