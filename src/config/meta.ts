/**
 * Metadados de SEO por rota (substitui os `export const metadata` / `generateMetadata`
 * do App Router do Next). Consumido pelo <Seo> no RootLayout via pathname.
 *
 * Regras:
 *  - toda rota indexável tem title e description EXCLUSIVOS;
 *  - nada é inventado: os textos refletem o conteúdo real de cada página;
 *  - og:* e twitter:* caem para title/description/imagem padrão quando ausentes.
 */
import { SEGMENT_NAMES } from '../data/segments/slugs'

import { NOINDEX_ROUTES } from './routes'

export type PageSchemaType = 'Service'

export type PageMeta = {
  title: string
  description?: string
  /** Sobrescreve a canonical (por padrão é o próprio pathname). */
  canonicalPath?: string
  noindex?: boolean
  ogTitle?: string
  ogDescription?: string
  /** Caminho ou URL da imagem social específica desta página. */
  ogImage?: string
  ogType?: 'website' | 'article'
  twitterCard?: 'summary' | 'summary_large_image'
  /** Emite schema Service (páginas de solução que são serviços reais). */
  schemaType?: PageSchemaType
  /** Nome usado no schema Service e no último nível do BreadcrumbList. */
  schemaName?: string
  /** Trilha de breadcrumb (sem a Home, que é adicionada automaticamente). */
  breadcrumb?: Array<{ name: string; path: string }>
  /** Emite robots noindex,nofollow (páginas de erro). */
  nofollow?: boolean
  /** Impede a emissão de <link rel="canonical"> (Not Found). */
  noCanonical?: boolean
}

/**
 * Fallback global de segurança: usado APENAS por rotas sem metadata própria
 * (não deve ser o metadata efetivo de nenhuma rota indexável).
 */
export const DEFAULT_META: PageMeta = {
  title: 'Comercializadora de Energia Solar | Grupo BC Energia',
  description:
    'Grupo BC Energia: sua comercializadora de energia solar. Economize com o Mercado Livre de Energia e soluções de gestão. Fale com um especialista!'
}

/** Metadata explícita da Home (independente do fallback global). */
export const HOME_META: PageMeta = {
  title: 'Comercializadora de Energia Solar | Grupo BC Energia',
  description:
    'Grupo BC Energia: comercializadora de energia com Mercado Livre de Energia, consórcio, gestão de energia e certificação I-REC. Fale com um especialista.'
}

const PRODUTOS = { name: 'Produtos', path: '/produtos' }
const SOBRE = { name: 'Sobre', path: '/sobre' }
const SEGMENTOS = { name: 'Segmentos', path: '/segmentos' }

export const ROUTE_META: Record<string, PageMeta> = {
  '/': HOME_META,


  '/contato': {
    title: 'Contato | Grupo BC Energia',
    description:
      'Fale com o Grupo BC Energia. Preencha o formulário e um especialista entra em contato para entender seu consumo e indicar a melhor solução de energia.',
    breadcrumb: [{ name: 'Contato', path: '/contato' }]
  },

  '/produtos': {
    title: 'Soluções em Energia | Grupo BC Energia',
    description:
      'Conheça as soluções do Grupo BC Energia: Mercado Livre de Energia, consórcio, gestão de energia, certificação I-REC e arrendamento de usinas solares.',
    breadcrumb: [PRODUTOS]
  },
  '/produtos/mercado-livre-de-energia': {
    title: 'Mercado Livre de Energia | Grupo BC Energia',
    description:
      'Entenda o que é o Mercado Livre de Energia, quem pode migrar e como funciona a negociação direta de energia. Migre com o suporte do Grupo BC Energia.',
    ogImage: '/img/global/mercado-livre-de-energia.jpg',
    schemaType: 'Service',
    schemaName: 'Mercado Livre de Energia',
    breadcrumb: [PRODUTOS, { name: 'Mercado Livre de Energia', path: '/produtos/mercado-livre-de-energia' }]
  },
  '/produtos/consorcio-bc-energia': {
    title: 'Consórcio BC Energia | Grupo BC Energia',
    description:
      'No Consórcio BC Energia você utiliza a energia gerada por uma usina do grupo e reduz a conta de luz sem investimento inicial. Veja como participar.',
    ogImage: '/img/pages/slider-bc-consorcio.jpg',
    schemaType: 'Service',
    schemaName: 'Consórcio BC Energia',
    breadcrumb: [PRODUTOS, { name: 'Consórcio BC Energia', path: '/produtos/consorcio-bc-energia' }]
  },
  '/produtos/gestao-de-energia': {
    title: 'Gestão de Energia para Empresas | Grupo BC Energia',
    description:
      'Consultoria em gestão de energia para empresas: análise de faturas, medição e acompanhamento de consumo para otimizar custos com o Grupo BC Energia.',
    ogImage: '/img/global/gestao-de-energia.jpg',
    schemaType: 'Service',
    schemaName: 'Gestão de Energia',
    breadcrumb: [PRODUTOS, { name: 'Gestão de Energia', path: '/produtos/gestao-de-energia' }]
  },
  // `/produtos/irec` foi consolidada em `/produtos/certificacao-renovavel-irec`
  // (ETAPA SEO 04) e agora redireciona — não possui metadata própria.

  '/produtos/certificacao-renovavel-irec': {
    title: 'Certificação Renovável I-REC | Grupo BC Energia',
    description:
      'Certificação renovável I-REC: rastreie a origem da energia consumida pela sua empresa e reforce o compromisso ambiental com o Grupo BC Energia.',
    ogImage: '/img/global/certificacao-renovavel.jpg',
    schemaType: 'Service',
    schemaName: 'Certificação Renovável I-REC',
    breadcrumb: [
      PRODUTOS,
      { name: 'Certificação Renovável I-REC', path: '/produtos/certificacao-renovavel-irec' }
    ]
  },
  '/produtos/arrendamento-de-usinas': {
    title: 'Arrendamento de Usinas Solares | Grupo BC Energia',
    description:
      'Tem uma usina solar ou um terreno disponível? Conheça as condições de arrendamento de usinas do Grupo BC Energia e gere renda com energia solar.',
    ogImage: '/img/global/arrendamento-de-usinas.webp',
    schemaType: 'Service',
    schemaName: 'Arrendamento de Usinas Solares',
    breadcrumb: [PRODUTOS, { name: 'Arrendamento de Usinas', path: '/produtos/arrendamento-de-usinas' }]
  },

  '/segmentos': {
    title: 'Segmentos Atendidos | Grupo BC Energia',
    description:
      'Veja como o Grupo BC Energia atende cada segmento, do agronegócio a condomínios, saúde, varejo e educação, com soluções de economia de energia.',
    breadcrumb: [SEGMENTOS]
  },

  '/sobre': {
    title: 'Sobre o Grupo BC Energia',
    description:
      'Conheça o Grupo BC Energia: quem somos, nossas usinas, iniciativas de sustentabilidade e as informações institucionais da comercializadora.',
    breadcrumb: [SOBRE]
  },
  '/sobre/quem-somos': {
    title: 'Quem Somos | Grupo BC Energia',
    description:
      'Conheça a história, o propósito e o vídeo institucional do Grupo BC Energia, comercializadora que leva economia e energia limpa a empresas e famílias.',
    ogImage: '/img/pages/sobre-grupo-bc-energia.jpg',
    breadcrumb: [SOBRE, { name: 'Quem Somos', path: '/sobre/quem-somos' }]
  },
  '/sobre/nossas-usinas': {
    title: 'Nossas Usinas | Grupo BC Energia',
    description:
      'Conheça as usinas de geração do Grupo BC Energia e a estrutura que abastece nossos clientes com energia renovável.',
    ogImage: '/img/pages/nossas-usinas.jpg',
    breadcrumb: [SOBRE, { name: 'Nossas Usinas', path: '/sobre/nossas-usinas' }]
  },
  '/sobre/lgpd': {
    title: 'LGPD e Privacidade de Dados | Grupo BC Energia',
    description:
      'Saiba como o Grupo BC Energia trata dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD).',
    breadcrumb: [SOBRE, { name: 'LGPD', path: '/sobre/lgpd' }]
  },
  '/sobre/leilao': {
    title: 'Leilão de Energia | Grupo BC Energia',
    description:
      'Entenda como funcionam os leilões de energia e a atuação do Grupo BC Energia na comercialização de energia elétrica no Brasil.',
    breadcrumb: [SOBRE, { name: 'Leilão', path: '/sobre/leilao' }]
  },
  '/sobre/fator-de-alavancagem': {
    title: 'Fator de Alavancagem | Grupo BC Energia',
    description:
      'Informações sobre o fator de alavancagem aplicado à comercialização varejista de energia pelo Grupo BC Energia.',
    breadcrumb: [SOBRE, { name: 'Fator de Alavancagem', path: '/sobre/fator-de-alavancagem' }]
  },
  '/sobre/sustentabilidade': {
    title: 'Sustentabilidade e ESG | Grupo BC Energia',
    description:
      'Conheça as práticas ambientais, sociais e de governança do Grupo BC Energia e as iniciativas que apoiamos junto às comunidades.',
    ogImage: '/img/pages/sustentabilidade.jpg',
    breadcrumb: [SOBRE, { name: 'Sustentabilidade', path: '/sobre/sustentabilidade' }]
  },
  '/sobre/social': {
    title: 'Ações Sociais | Grupo BC Energia',
    description:
      'Veja as ações sociais apoiadas pelo Grupo BC Energia e como a energia limpa se conecta ao impacto positivo nas comunidades onde atuamos.',
    ogImage: '/img/pages/grupo-bg-esg-social.webp',
    breadcrumb: [SOBRE, { name: 'Social', path: '/sobre/social' }]
  },
  '/sobre/condicoes-gerais-varejistas': {
    title: 'Condições Gerais da Comercialização Varejista | Grupo BC Energia',
    description:
      'Consulte as condições gerais da comercialização varejista de energia praticadas pelo Grupo BC Energia.',
    breadcrumb: [
      SOBRE,
      { name: 'Condições Gerais Varejistas', path: '/sobre/condicoes-gerais-varejistas' }
    ]
  }
}

/**
 * Páginas regionais: title/description exclusivos, alinhados ao conteúdo
 * reescrito em src/data/regions. Palmas é município e tem como pai a página
 * estadual do Tocantins (hub real, sem link quebrado).
 */
const REGIONAL_META: Record<string, PageMeta> = {
  '/energia-solar-goiania': {
    title: 'Energia Solar e Mercado Livre em Goiânia | Grupo BC Energia',
    description:
      'Atendimento em Goiânia, sede do Grupo BC Energia: energia solar por assinatura para baixa tensão e migração para o Mercado Livre para empresas.',
    breadcrumb: [{ name: 'Energia Solar em Goiânia', path: '/energia-solar-goiania' }]
  },
  '/energia-solar-anapolis': {
    title: 'Energia Solar por Assinatura em Anápolis | Grupo BC Energia',
    description:
      'Indústria, comércio e residências de Anápolis podem reduzir o custo da energia com assinatura solar ou migração para o Mercado Livre. Envie sua conta.',
    breadcrumb: [{ name: 'Energia Solar em Anápolis', path: '/energia-solar-anapolis' }]
  },
  '/energia-solar-aparecida-de-goiania': {
    title: 'Energia Solar sem Obra em Aparecida de Goiânia | Grupo BC Energia',
    description:
      'Energia solar por assinatura em Aparecida de Goiânia: sem placas no imóvel e com adesão à distância. Empresas maiores podem avaliar o Mercado Livre.',
    breadcrumb: [
      { name: 'Energia Solar em Aparecida de Goiânia', path: '/energia-solar-aparecida-de-goiania' }
    ]
  },
  '/energia-solar-em-rio-verde': {
    title: 'Energia para o Agronegócio em Rio Verde | Grupo BC Energia',
    description:
      'Soluções de energia em Rio Verde para agroindústrias, produtores e consumidores urbanos: Mercado Livre, gestão de energia e assinatura solar.',
    breadcrumb: [{ name: 'Energia Solar em Rio Verde', path: '/energia-solar-em-rio-verde' }]
  },
  '/energia-solar-trindade': {
    title: 'Energia Solar por Assinatura em Trindade | Grupo BC Energia',
    description:
      'Em Trindade, residências e comércios podem usar energia solar sem comprar placas nem fazer obra. Veja como funciona a adesão à distância.',
    breadcrumb: [{ name: 'Energia Solar em Trindade', path: '/energia-solar-trindade' }]
  },
  '/energia-solar-palmas': {
    title: 'Energia Solar por Assinatura em Palmas (TO) | Grupo BC Energia',
    description:
      'Página municipal de Palmas: energia solar por assinatura para baixa tensão e Mercado Livre de Energia para empresas da capital tocantinense.',
    breadcrumb: [
      { name: 'Energia Solar no Tocantins', path: '/energia-solar-no-tocantins' },
      { name: 'Palmas', path: '/energia-solar-palmas' }
    ]
  },
  '/energia-solar-no-tocantins': {
    title: 'Energia Solar e Mercado Livre no Tocantins | Grupo BC Energia',
    description:
      'Página estadual do Tocantins: panorama das soluções de energia do Grupo BC Energia e acesso ao atendimento no município de Palmas.',
    breadcrumb: [{ name: 'Energia Solar no Tocantins', path: '/energia-solar-no-tocantins' }]
  }
}

Object.assign(ROUTE_META, REGIONAL_META)


/** Segmentos: metadata derivada dos dados reais em src/data/segments. */
Object.entries(SEGMENT_NAMES).forEach(([slug, name]) => {
  const path = `/segmentos/${slug}`

  ROUTE_META[path] = {
    title: `Energia para ${name} | Grupo BC Energia`,
    description: `Soluções de energia do Grupo BC Energia para o segmento ${name.toLowerCase()}: reduza custos de energia elétrica sem investimento inicial.`,
    breadcrumb: [SEGMENTOS, { name, path }]
  }
})

/**
 * Segmentos: title/description específicos por segmento (ETAPA SEO 03).
 * Os textos refletem o público e os ambientes descritos no conteúdo real de
 * cada página (src/data/segments/*.json) — nada de oferta ou número novo.
 * O padrão programático acima permanece como rede de segurança para segmentos
 * futuros que ainda não tenham texto próprio aqui.
 */
const SEGMENT_META: Record<string, Pick<PageMeta, 'title' | 'description'>> = {
  agronegocio: {
    title: 'Energia para o Agronegócio | Grupo BC Energia',
    description:
      'Fazendas, agroindústrias e unidades de processamento usam energia de forma intensa em irrigação, maquinário e armazenagem. Veja como reduzir esse custo.'
  },
  'bares-e-restaurantes': {
    title: 'Energia para Bares e Restaurantes | Grupo BC Energia',
    description:
      'Cozinha, refrigeração e climatização pesam na conta de bares e restaurantes. Conheça as soluções do Grupo BC Energia para reduzir o custo sem obra.'
  },
  condominio: {
    title: 'Energia para Condomínios | Grupo BC Energia',
    description:
      'Áreas comuns, elevadores, segurança e climatização elevam a conta do condomínio. Veja como o Grupo BC Energia reduz esse custo sem investimento inicial.'
  },
  educacional: {
    title: 'Energia para Escolas e Instituições de Ensino | Grupo BC Energia',
    description:
      'Salas de aula, laboratórios e climatização consomem energia o dia todo. Entenda as soluções do Grupo BC Energia para instituições de ensino economizarem.'
  },
  lazer: {
    title: 'Energia para Clubes, Academias e Lazer | Grupo BC Energia',
    description:
      'Clubes, academias, cinemas e parques dependem de iluminação, som e climatização constantes. Veja como reduzir esse custo com o Grupo BC Energia.'
  },
  religioso: {
    title: 'Energia para Igrejas e Instituições Religiosas | Grupo BC Energia',
    description:
      'Grandes espaços iluminados, climatizados e com sistemas audiovisuais pesam no orçamento. Conheça as soluções de energia para instituições religiosas.'
  },
  residencial: {
    title: 'Energia Solar por Assinatura Residencial | Grupo BC Energia',
    description:
      'Energia solar por assinatura para residências: use energia limpa e reduza a conta de luz de casa sem obra e sem investimento em equipamentos.'
  },
  saude: {
    title: 'Energia para Hospitais e Clínicas | Grupo BC Energia',
    description:
      'Hospitais, clínicas e centros médicos operam equipamentos e climatização sem pausa. Veja como o Grupo BC Energia ajuda a reduzir o custo com energia.'
  },
  servico: {
    title: 'Energia para Empresas de Serviços | Grupo BC Energia',
    description:
      'Escritórios, consultórios e centrais de atendimento dependem de climatização e equipamentos eletrônicos. Conheça as soluções de energia para serviços.'
  },
  turismo: {
    title: 'Energia para Hotéis, Pousadas e Turismo | Grupo BC Energia',
    description:
      'Hotéis, pousadas e resorts mantêm climatização e aquecimento de água ligados o tempo todo. Veja como reduzir o custo de energia sem perder conforto.'
  },
  varejo: {
    title: 'Energia para Lojas e Supermercados | Grupo BC Energia',
    description:
      'Iluminação, climatização e refrigeração consomem energia em lojas e supermercados. Conheça as soluções do Grupo BC Energia para o varejo economizar.'
  }
}

Object.entries(SEGMENT_META).forEach(([slug, meta]) => {
  const path = `/segmentos/${slug}`
  if (!ROUTE_META[path]) return
  ROUTE_META[path] = { ...ROUTE_META[path], ...meta }
})


// Hubs de conteúdo (Bloco 10). Continuam noindex,follow enquanto não houver
// conteúdo real aprovado — ver docs/CONTENT-INDEXING-CRITERIA.md.
export const CONTEUDO = { name: 'Conteúdo', path: '/conteudo/blog' }

ROUTE_META['/conteudo'] = {
  title: 'Conteúdo | Grupo BC Energia',
  description:
    'Hub de conteúdo do Grupo BC Energia: artigos do Blog e episódios do BC Cast sobre energia, mercado livre, eficiência e sustentabilidade.',
  breadcrumb: [{ name: 'Conteúdo', path: '/conteudo' }]
}

ROUTE_META['/conteudo/blog'] = {
  title: 'Blog | Grupo BC Energia',
  description:
    'Conteúdos do Grupo BC Energia sobre mercado livre de energia, geração distribuída, gestão de energia e redução de custo na conta de luz.',
  breadcrumb: [{ name: 'Blog', path: '/conteudo/blog' }]
}

ROUTE_META['/conteudo/bc-cast'] = {
  title: 'BC Cast | Grupo BC Energia',
  description:
    'BC Cast: conversas do Grupo BC Energia com lideranças sobre energia, mercado livre, agronegócio e desenvolvimento econômico.',
  breadcrumb: [{ name: 'BC Cast', path: '/conteudo/bc-cast' }]
}

ROUTE_META['/simulador-de-economia'] = {
  title: 'Simulador de Economia de Energia | Grupo BC Energia',
  description:
    'Simule uma estimativa de economia na conta de energia conforme o valor mensal e o estado de atendimento do Grupo BC Energia.',
  breadcrumb: [{ name: 'Simulador de economia', path: '/simulador-de-economia' }]
}

// Rotas não indexáveis (conteúdo provisório / página de sucesso).
// Fonte única: src/config/routes.ts. Recebem <meta name="robots" content="noindex,follow">
// e ficam fora do sitemap.
NOINDEX_ROUTES.forEach((path) => {
  ROUTE_META[path] = { ...(ROUTE_META[path] ?? DEFAULT_META), noindex: true }
})

/**
 * ETAPA SEO 06 — metadata da página Not Found.
 * Nunca herda title/description/canonical da Home; robots noindex,nofollow
 * em qualquer ambiente; sem breadcrumb e sem schema de página válida.
 */
export const NOT_FOUND_META: PageMeta = {
  title: 'Página não encontrada | Grupo BC Energia',
  description: 'A página que você tentou acessar não foi encontrada ou não existe mais.',
  noindex: true,
  nofollow: true,
  noCanonical: true
}

export const getRouteMeta = (pathname: string): PageMeta => ROUTE_META[pathname] ?? DEFAULT_META

