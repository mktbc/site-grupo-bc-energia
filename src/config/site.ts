/**
 * Configuração central do site (domínio oficial + proteção de ambiente).
 *
 * ÚNICO lugar onde o domínio de produção é declarado. Não repetir o domínio
 * em componentes — sempre importar daqui.
 */

/** Domínio oficial de produção (usado em canonical e sitemap). */
export const SITE_URL = 'https://grupobcenergia.com.br'

/**
 * Hosts considerados "produção". Qualquer outro host (preview da Lovable,
 * localhost, staging) é tratado como ambiente de desenvolvimento.
 */
export const PRODUCTION_HOSTS = ['grupobcenergia.com.br', 'www.grupobcenergia.com.br']

/**
 * Proteção temporária de indexação do ambiente de desenvolvimento —
 * remover somente no cut-over para produção.
 *
 * Enquanto o projeto duplicado estiver em domínio de preview/dev, todas as
 * páginas recebem <meta name="robots" content="noindex,nofollow">, evitando
 * concorrência com o site oficial. Nada é bloqueado em CSS/JS/imagens e o
 * site funciona normalmente. Ao publicar no domínio oficial, esta checagem
 * passa a retornar `false` automaticamente (host = grupobcenergia.com.br).
 */
export const isPreviewEnvironment = (): boolean => {
  // Pré-render / SSR: não existe `window`. O alvo do build é declarado em
  // VITE_SEO_ENV. Cut-over para produção: buildar com VITE_SEO_ENV=production
  // para que o HTML estático saia com robots "index,follow".
  if (typeof window === 'undefined') {
    return import.meta.env?.VITE_SEO_ENV !== 'production'
  }
  return !PRODUCTION_HOSTS.includes(window.location.hostname)
}

/** Monta a URL canônica absoluta (HTTPS, sem query string / UTM / hash). */
export const buildCanonical = (pathname: string): string => {
  const clean = (pathname || '/').split('?')[0].split('#')[0]
  const normalized = clean !== '/' && clean.endsWith('/') ? clean.slice(0, -1) : clean
  return `${SITE_URL}${normalized === '/' ? '/' : normalized}`
}

/** Nome institucional usado em og:site_name e nos schemas. */
export const SITE_NAME = 'Grupo BC Energia'

/** Logo institucional (URL absoluta) usada no schema Organization. */
export const SITE_LOGO = `${SITE_URL}/img/global/grupo-bc-logo-vertical-color.webp`

/**
 * Imagem social padrão (og:image / twitter:image).
 *
 * ⚠️ PENDÊNCIA DE DESIGN: hoje aponta para a imagem institucional já existente
 * no projeto (`/bg-home.jpg`, 1736x898 ≈ 1.91:1). O ideal é o time de design
 * fornecer uma arte dedicada 1200x630 em `public/social/og-default.jpg` —
 * basta então trocar o caminho abaixo. Nenhuma outra mudança é necessária.
 */
export const DEFAULT_OG_IMAGE_PATH = '/bg-home.jpg'

/** Converte um caminho do projeto em URL absoluta (necessário para og:image). */
export const toAbsoluteUrl = (pathOrUrl: string): string =>
  /^https?:\/\//i.test(pathOrUrl) ? pathOrUrl : `${SITE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`

/** URL absoluta da imagem social padrão. */
export const DEFAULT_OG_IMAGE = toAbsoluteUrl(DEFAULT_OG_IMAGE_PATH)

/** Perfis oficiais existentes no projeto (usados em Organization.sameAs). */
export const SOCIAL_PROFILES: string[] = [
  'https://www.instagram.com/grupobcenergia/',
  'https://www.facebook.com/GrupoBCEnergia',
  'https://www.linkedin.com/company/grupobcenergia/',
  'https://www.youtube.com/@grupobcenergia'
]
