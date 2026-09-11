/**
 * Variantes mobile (≤1024px) disponíveis em `public/` para imagens usadas como
 * background de hero. Evita baixar a versão desktop grande no celular.
 *
 * Apenas performance: nenhuma imagem, enquadramento ou composição muda.
 */
const HERO_MOBILE_VARIANTS = new Set<string>([
  '/img/global/arrendamento-de-usinas.webp',
  '/img/global/certificacao-renovavel.webp',
  '/img/global/energia-por-assinatura.webp',
  '/img/global/mercado-livre-de-energia.webp',
  '/img/hero/hero-consorcio.webp',
  '/img/hero/hero-resultados.webp',
  '/img/pages/contact.webp',
  '/img/pages/gestao-de-energia-hero.webp',
  '/img/pages/simulador-hero.webp',
  '/img/pages/social-hero.webp',
  '/img/pages/mercado-livre-subestacao.webp',
  '/img/pages/segmentos/residencial-hero.webp'
])

/** Retorna a variante 1024w quando ela existe no projeto. */
export const heroMobileVariant = (src?: string): string | undefined => {
  if (!src || !HERO_MOBILE_VARIANTS.has(src)) return undefined
  return src.replace(/\.webp$/, '-1024.webp')
}
