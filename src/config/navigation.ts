/**
 * Fonte única de navegação dos hubs (/produtos, /segmentos, /sobre, /conteudo).
 *
 * Os itens são derivados de `src/components/Navbar/Items.data` — a mesma fonte
 * consumida pelos dropdowns do Header — para que menu e página-hub nunca
 * divirjam. Aqui só são acrescentados dois metadados de apresentação que o
 * menu não usa: uma descrição curta e o ícone oficial (BCIcon).
 *
 * Regras:
 *  - nenhum card é criado para rota inexistente (validação contra
 *    INDEXABLE_ROUTES + NOINDEX_ROUTES);
 *  - links externos do menu (ex.: consultoria jurídica) são mantidos como
 *    externos, com target/rel adequados;
 *  - nada é inventado: títulos e URLs vêm do menu real.
 */
import { itemsData } from '@/components/Navbar/Items.data'
import type { BCIconName } from '@/config/icons'
import { INDEXABLE_ROUTES, NOINDEX_ROUTES } from '@/config/routes'

export type HubCardItem = {
  title: string
  description: string
  href: string
  external?: boolean
  /** Ícone oficial da marca. */
  icon?: BCIconName
  /** Ícone legado em /public (usado pelos segmentos, que não têm BCIcon equivalente). */
  iconSrc?: string
}

/** Rotas internas que realmente existem no React Router. */
const EXISTING_ROUTES = new Set<string>([...INDEXABLE_ROUTES, ...NOINDEX_ROUTES, '/conteudo'])

const isExternal = (url: string): boolean => /^https?:\/\//.test(url)

/** Descrições curtas por destino (o menu não possui descrição para todos). */
const DESCRIPTIONS: Record<string, string> = {
  // Produtos
  '/produtos/mercado-livre-de-energia':
    'Negocie energia diretamente com o gerador e reduza o custo da sua operação.',
  '/produtos/consorcio-bc-energia':
    'Energia de usina solar por assinatura, sem obra e sem placas no imóvel.',
  '/produtos/gestao-de-energia':
    'Acompanhamento de faturas, medição e contratos para otimizar o consumo.',
  '/produtos/certificacao-renovavel-irec': 'Comprove que a energia consumida pela sua empresa é de fonte renovável.',
  '/produtos/arrendamento-de-usinas':
    'Tem usina ou área disponível? Veja as condições de arrendamento.',
  'https://www.bced.com.br/':
    'Apoio jurídico especializado em energia, no site do BC Energia Direito.',

  // Segmentos sem descrição no menu (ou com texto provisório)
  '/segmentos/educacional': 'Escolas e instituições de ensino com custo de energia previsível.',
  '/segmentos/turismo': 'Hotéis, pousadas e operações de turismo com energia mais barata.',
  '/segmentos/varejo': 'Lojas e redes varejistas reduzindo despesa fixa com energia.',

  // Sobre
  '/sobre/quem-somos': 'História, propósito e atuação do Grupo BC Energia.',
  '/sobre/nossas-usinas': 'As usinas de geração que abastecem nossos clientes.',
  '/sobre/lgpd': 'Como tratamos dados pessoais conforme a LGPD.',
  '/sobre/leilao': 'Como funcionam os leilões de energia e a nossa atuação.',
  '/sobre/fator-de-alavancagem': 'Informação regulatória da comercialização varejista.',
  '/sobre/sustentabilidade': 'Práticas ambientais, sociais e de governança (ESG).',
  '/sobre/social': 'Ações sociais apoiadas pelo grupo nas comunidades onde atuamos.',
  '/sobre/condicoes-gerais-varejistas': 'Condições gerais da comercialização varejista de energia.',

  // Conteúdo
  '/conteudo/blog': 'Artigos sobre mercado livre, geração distribuída e gestão de energia.',
  '/conteudo/bc-cast': 'Conversas e entrevistas em vídeo sobre energia e negócios.'
}

/** Ícone oficial por destino (apenas onde existe correspondência coerente). */
const ICONS: Record<string, BCIconName> = {
  '/produtos/mercado-livre-de-energia': 'mercado-crescimento',
  '/produtos/consorcio-bc-energia': 'solar-residencial',
  '/produtos/gestao-de-energia': 'monitoramento-consumo',
  '/produtos/certificacao-renovavel-irec': 'energia-limpa',
  '/produtos/arrendamento-de-usinas': 'usina-solar',
  'https://www.bced.com.br/': 'contrato-aprovado',

  '/sobre/quem-somos': 'energia-global',
  '/sobre/nossas-usinas': 'usina-solar',
  '/sobre/lgpd': 'contrato-aprovado',
  '/sobre/leilao': 'mercado-crescimento',
  '/sobre/fator-de-alavancagem': 'meta-economia',
  '/sobre/sustentabilidade': 'planeta-sustentavel',
  '/sobre/social': 'gestao-sustentavel',
  '/sobre/condicoes-gerais-varejistas': 'fatura-energia',

  '/conteudo/blog': 'inovacao-sustentavel',
  '/conteudo/bc-cast': 'energia-global'
}

/** Constrói os cards de um item do menu principal, validando as rotas. */
const buildHub = (menuId: string): Array<HubCardItem> => {
  const menu = itemsData.find((item) => item.id === menuId)

  return (menu?.subItems ?? [])
    .filter((sub) => isExternal(sub.url) || EXISTING_ROUTES.has(sub.url))
    .map((sub) => ({
      title: sub.title.trim(),
      description: DESCRIPTIONS[sub.url] ?? sub.description ?? '',
      href: sub.url,
      external: isExternal(sub.url) || undefined,
      icon: ICONS[sub.url],
      iconSrc: ICONS[sub.url] ? undefined : sub.icon?.url ? `/img/icons/${sub.icon.url}` : undefined
    }))
}

export const PRODUCT_HUB_ITEMS: Array<HubCardItem> = buildHub('1')
export const SEGMENT_HUB_ITEMS: Array<HubCardItem> = buildHub('2')
export const ABOUT_HUB_ITEMS: Array<HubCardItem> = buildHub('3')

/**
 * Segmentos em destaque na Home (amostra, não catálogo).
 *
 * Os 11 segmentos continuam integralmente disponíveis em /segmentos — a Home
 * exibe 6 destaques e um CTA "Ver todos os segmentos". A seleção é declarada
 * aqui (configuração) e nunca no componente.
 */
export const HOME_SEGMENT_HIGHLIGHTS = [
  '/segmentos/agronegocio',
  '/segmentos/condominio',
  '/segmentos/saude',
  '/segmentos/varejo',
  '/segmentos/servico',
  '/segmentos/residencial'
]

/** Cards de segmento da Home — mesma fonte do hub, na ordem dos destaques. */
export const HOME_SEGMENT_ITEMS: Array<HubCardItem> = HOME_SEGMENT_HIGHLIGHTS.map((href) =>
  SEGMENT_HUB_ITEMS.find((item) => item.href === href)
).filter((item): item is HubCardItem => Boolean(item))



/**
 * Hub de Conteúdo: as áreas reais do site são /conteudo/blog e /conteudo/bc-cast.
 * O dropdown do menu aponta para os canais externos (blog e YouTube) e continua
 * intacto; o hub apresenta as áreas internas.
 */
export const CONTENT_HUB_ITEMS: Array<HubCardItem> = ['/conteudo/blog', '/conteudo/bc-cast']
  .filter((path) => EXISTING_ROUTES.has(path))
  .map((path) => ({
    title: path.endsWith('blog') ? 'Blog' : 'BC Cast',
    description: DESCRIPTIONS[path],
    href: path,
    icon: ICONS[path]
  }))

/* ------------------------------------------------------------------------- *
 * NAVEGAÇÃO PRINCIPAL (Header) — FRONT-END 02
 *
 * Fonte única de verdade consumida por desktop e mobile. Derivada dos hubs
 * acima (que por sua vez derivam de Items.data), sem nenhuma lista paralela
 * de links escrita à mão.
 * ------------------------------------------------------------------------- */

export type NavLink = {
  label: string
  href: string
  external?: boolean
  description?: string
  icon?: BCIconName
  iconSrc?: string
}

export type NavGroup = {
  /** Rótulo opcional do grupo (ex.: "Regulatório"). */
  label?: string
  /** Grupos secundários recebem peso visual menor (páginas noindex/regulatórias). */
  secondary?: boolean
  links: Array<NavLink>
}

export type NavEntry = {
  id: string
  label: string
  /** Rótulo curto para breakpoints onde o espaço horizontal é limitado (desktop apenas). */
  labelShort?: string
  /** Hub da seção — o rótulo continua sendo um link real. */
  href: string
  /** Prefixo usado para marcar a rota ativa. */
  match?: Array<string>
  /** Colunas do painel desktop. */
  columns?: 1 | 2
  groups?: Array<NavGroup>
  /** Link "ver todos" exibido ao final do painel. */
  viewAll?: { label: string; href: string }
}

const toNavLink = (item: HubCardItem): NavLink => ({
  label: item.title,
  href: item.href,
  external: item.external,
  description: item.description || undefined,
  icon: item.icon,
  iconSrc: item.iconSrc
})

/** Segmentos em destaque no menu (todos permanecem acessíveis em /segmentos). */
const FEATURED_SEGMENTS = [
  '/segmentos/agronegocio',
  '/segmentos/condominio',
  '/segmentos/saude',
  '/segmentos/servico',
  '/segmentos/varejo',
  '/segmentos/residencial'
]

/** Páginas institucionais regulatórias — acessíveis, porém em peso secundário. */
const REGULATORY_ABOUT = [
  '/sobre/leilao',
  '/sobre/fator-de-alavancagem',
  '/sobre/condicoes-gerais-varejistas',
  '/sobre/lgpd'
]

export const MAIN_NAV: Array<NavEntry> = [
  {
    id: 'solucoes',
    label: 'Soluções',
    href: '/produtos',
    match: ['/produtos'],
    columns: 2,
    groups: [{ links: PRODUCT_HUB_ITEMS.map(toNavLink) }],
    viewAll: { label: 'Ver todas as soluções', href: '/produtos' }
  },
  {
    id: 'segmentos',
    label: 'Segmentos',
    href: '/segmentos',
    match: ['/segmentos'],
    columns: 2,
    groups: [
      {
        links: SEGMENT_HUB_ITEMS.filter((item) => FEATURED_SEGMENTS.includes(item.href)).map(
          toNavLink
        )
      }
    ],
    viewAll: { label: 'Ver todos os segmentos', href: '/segmentos' }
  },
  {
    id: 'sobre',
    label: 'Sobre',
    href: '/sobre',
    match: ['/sobre'],
    columns: 2,
    groups: [
      {
        label: 'Institucional',
        links: ABOUT_HUB_ITEMS.filter((item) => !REGULATORY_ABOUT.includes(item.href)).map(
          toNavLink
        )
      },
      {
        label: 'Regulatório e legal',
        secondary: true,
        links: ABOUT_HUB_ITEMS.filter((item) => REGULATORY_ABOUT.includes(item.href)).map(toNavLink)
      }
    ],
    viewAll: { label: 'Conhecer o Grupo BC Energia', href: '/sobre' }
  },
  {
    id: 'conteudo',
    label: 'Conteúdo',
    href: '/conteudo',
    match: ['/conteudo'],
    columns: 1,
    groups: [{ secondary: true, links: CONTENT_HUB_ITEMS.map(toNavLink) }]
  },
  {
    id: 'simulador',
    label: 'Simulador de Economia',
    labelShort: 'Simulador',
    href: '/simulador-de-economia',
    match: ['/simulador-de-economia']
  },
  {
    id: 'contato',
    label: 'Contato',
    href: '/contato',
    match: ['/contato']
  }
]

/** CTA principal do Header (rota já existente — nenhuma promessa comercial nova). */
export const HEADER_CTA = {
  label: 'Enviar minha conta',
  labelLong: 'Enviar minha conta para análise',
  href: '/contato'
}

/** Acesso a clientes já atendidos (WhatsApp oficial) — link secundário, sem botão. */
export const HEADER_CLIENT_LINK = {
  label: 'Já sou cliente',
  href: 'https://wa.me/556239992050?text=Ol%C3%A1%2C%20vim%20pelo%20site.%20Gostaria%20de%20ser%20atendido.%0A%0AAten%C3%A7%C3%A3o%3A%20Para%20melhor%20direcionamento%20da%20sua%20conversa%2C%20n%C3%A3o%20apague%20essa%20mensagem.'
}

export const isNavEntryActive = (entry: NavEntry, pathname: string): boolean =>
  (entry.match ?? [entry.href]).some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )
