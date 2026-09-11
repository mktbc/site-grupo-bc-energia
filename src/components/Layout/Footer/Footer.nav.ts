/**
 * Navegação do rodapé — derivada da fonte única (`src/config/navigation.ts`),
 * que por sua vez deriva de `Navbar/Items.data`. Nenhuma lista paralela de
 * links é escrita aqui: apenas seleção e agrupamento.
 *
 * O rodapé funciona como navegação secundária (mais explorável que o header),
 * organizado em 5 grupos: Soluções, Segmentos, Empresa, Conteúdo e Conversão.
 */
import {
  ABOUT_HUB_ITEMS,
  CONTENT_HUB_ITEMS,
  PRODUCT_HUB_ITEMS,
  SEGMENT_HUB_ITEMS
} from '@/config/navigation'
import type { NavLink } from '@/config/navigation'

/** Rotas institucionais regulatórias — peso secundário (barra legal). */
const REGULATORY = [
  '/sobre/leilao',
  '/sobre/fator-de-alavancagem',
  '/sobre/condicoes-gerais-varejistas',
  '/sobre/lgpd'
]

/** Segmentos prioritários no rodapé (todos permanecem em /segmentos). */
const FOOTER_SEGMENTS = [
  '/segmentos/agronegocio',
  '/segmentos/condominio',
  '/segmentos/saude',
  '/segmentos/varejo',
  '/segmentos/residencial'
]

/** Páginas institucionais destacadas no rodapé. */
const COMPANY_PAGES = [
  '/sobre/quem-somos',
  '/sobre/nossas-usinas',
  '/sobre/sustentabilidade',
  '/sobre/social'
]

export type FooterGroup = {
  title: string
  links: Array<NavLink>
  /** Grupo de conversão — recebe destaque visual leve. */
  emphasis?: boolean
}

const toLink = (item: { title: string; href: string; external?: boolean }): NavLink => ({
  label: item.title,
  href: item.href,
  external: item.external
})

/** Soluções: as rotas reais de /produtos, sem links externos. */
const SOLUTIONS: Array<NavLink> = PRODUCT_HUB_ITEMS.filter((item) => !item.external).map(toLink)

/** Segmentos: seleção estratégica + "ver todos". */
const SEGMENTS: Array<NavLink> = [
  ...FOOTER_SEGMENTS.map((href) => SEGMENT_HUB_ITEMS.find((item) => item.href === href))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map(toLink),
  { label: 'Ver todos os segmentos', href: '/segmentos' }
]

/** Empresa: páginas institucionais reais. */
const COMPANY: Array<NavLink> = COMPANY_PAGES.map((href) =>
  ABOUT_HUB_ITEMS.find((item) => item.href === href)
)
  .filter((item): item is NonNullable<typeof item> => Boolean(item))
  .map(toLink)

/** Conteúdo: Blog, BC Cast e o hub editorial. */
const CONTENT: Array<NavLink> = [
  ...CONTENT_HUB_ITEMS.map(toLink),
  { label: 'Explorar conteúdos', href: '/conteudo' }
]

/** Conversão: caminhos diretos para simulação e contato. */
const CONVERSION: Array<NavLink> = [
  { label: 'Simulador de economia', href: '/simulador-de-economia' },
  { label: 'Contato', href: '/contato' }
]

export const FOOTER_GROUPS: Array<FooterGroup> = [
  { title: 'Soluções', links: SOLUTIONS },
  { title: 'Segmentos', links: SEGMENTS },
  { title: 'Empresa', links: COMPANY },
  { title: 'Conteúdo', links: CONTENT },
  { title: 'Conversão', links: CONVERSION, emphasis: true }
]

/** Ordem priorizada no mobile: conversão primeiro. */
export const FOOTER_GROUPS_MOBILE: Array<FooterGroup> = [
  ...FOOTER_GROUPS.filter((group) => group.emphasis),
  ...FOOTER_GROUPS.filter((group) => !group.emphasis)
]

/** Links regulatórios e legais exibidos na barra inferior. */
export const FOOTER_LEGAL_LINKS: Array<NavLink> = ABOUT_HUB_ITEMS.filter((item) =>
  REGULATORY.includes(item.href)
).map(toLink)
