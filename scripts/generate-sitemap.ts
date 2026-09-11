/**
 * Gera public/sitemap.xml e public/robots.txt a partir da fonte única de
 * verdade das rotas (src/config/routes.ts). Executado nos hooks predev/prebuild.
 *
 * Sitemap (ETAPA SEO 05):
 *  - somente INDEXABLE_ROUTES (páginas INDEX, canonical self-referencing);
 *  - sem <lastmod>: o projeto não possui fonte confiável de data de modificação
 *    por página — melhor omitir do que usar a data do build (data falsa);
 *  - sem <changefreq>/<priority>: eram valores artificiais repetidos, ignorados
 *    pelo Google. Sitemap simples e correto.
 *
 * robots.txt:
 *  - PRODUÇÃO (VITE_SEO_ENV=production): Allow: / + Sitemap: <domínio oficial>.
 *    Nenhum Disallow para páginas noindex (o crawler precisa ler o meta robots)
 *    e nenhum bloqueio de CSS/JS/imagens.
 *  - PREVIEW/STAGING (qualquer outro valor): Disallow: / como camada ADICIONAL
 *    de proteção. A proteção principal continua sendo
 *    <meta name="robots" content="noindex,nofollow"> emitido em runtime por host
 *    (src/config/site.ts → isPreviewEnvironment()).
 */
import { writeFileSync } from 'fs'
import { resolve } from 'path'

import { getIndexableContentRoutes } from '../src/config/contentIndexing'
import { INDEXABLE_ROUTES } from '../src/config/routes'
import { SITE_URL } from '../src/config/site'

const isProduction = process.env.VITE_SEO_ENV === 'production'

/* ------------------------------- sitemap -------------------------------- */

// Conteúdo editorial entra no sitemap somente quando a URL é index,follow.
const allRoutes = [...INDEXABLE_ROUTES, ...getIndexableContentRoutes()]

const urls = allRoutes.map(
  (path) => ['  <url>', `    <loc>${SITE_URL}${path}</loc>`, '  </url>'].join('\n')
)

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  '</urlset>',
  ''
].join('\n')

writeFileSync(resolve('public/sitemap.xml'), xml)

/* ------------------------------- robots --------------------------------- */

const robotsProduction = `# Grupo BC Energia — robots.txt (produção)
#
# Gerado automaticamente por scripts/generate-sitemap.ts (predev/prebuild).
# Não editar manualmente.
#
# CSS, JavaScript e imagens permanecem liberados (necessários para renderização).
# Páginas noindex NÃO são bloqueadas aqui: o crawler precisa acessá-las para
# ler <meta name="robots" content="noindex,follow">.

User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

const robotsPreview = `# Grupo BC Energia — robots.txt (preview/staging)
#
# Gerado automaticamente por scripts/generate-sitemap.ts (predev/prebuild).
# Não editar manualmente. Build de produção: VITE_SEO_ENV=production.
#
# Camada ADICIONAL de proteção do ambiente duplicado. A proteção principal
# continua sendo <meta name="robots" content="noindex,nofollow"> emitido em
# runtime por host (src/config/site.ts).

User-agent: *
Disallow: /
`

writeFileSync(resolve('public/robots.txt'), isProduction ? robotsProduction : robotsPreview)

console.log(
  `sitemap.xml gerado (${INDEXABLE_ROUTES.length} URLs) · robots.txt: ${isProduction ? 'produção (Allow: /)' : 'preview (Disallow: /)'}`
)
