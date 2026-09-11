/**
 * Taxonomia editorial do Grupo BC Energia.
 *
 * Cada cluster nasce de uma solução ou tema REAL já existente no site.
 * `moneyPath` é a página comercial que deve ranquear para a intenção principal —
 * os conteúdos do cluster são de SUPORTE e sempre linkam para ela
 * (prevenção de canibalização, ver docs/SEO-CONTENT-PLAN.md).
 */
import type { ClusterId } from './types'

/**
 * Intenções mapeadas por cluster (§28/§29 do briefing de clusters temáticos).
 * Cada intenção tem um CTA próprio — o mesmo CTA NÃO se repete em todas as
 * páginas do cluster.
 */
export type ClusterIntent =
  | 'informacional'
  | 'comparativa'
  | 'elegibilidade'
  | 'problema'
  | 'operacional'
  | 'estrategica'
  | 'regional'
  | 'comercial'

export type ClusterCta = { label: string; href: string }

export type Cluster = {
  id: ClusterId
  name: string
  /** Descrição editorial curta do escopo do cluster. */
  description: string
  /** Página comercial principal (money page) do cluster. */
  moneyPath: string
  /**
   * Página pilar do tema. Hoje sempre uma página comercial já existente —
   * nenhuma URL nova é criada para servir de pilar.
   */
  pillarPath: string
  /** Páginas comerciais de apoio já existentes. */
  supportingPaths: string[]
  /** Segmentos em que o tema é realmente aplicável (seletivo). */
  segmentPaths?: string[]
  /** Páginas regionais que participam do cluster. */
  regionPaths?: string[]
  /** Clusters vizinhos com ligação natural (ex.: Gestão ↔ Mercado Livre). */
  relatedClusters?: ClusterId[]
  /** Intenções de busca que o cluster precisa cobrir. */
  intents?: ClusterIntent[]
  /** CTA por nível de intenção — evita repetir o mesmo CTA no cluster inteiro. */
  ctaByIntent?: Partial<Record<'baixa' | 'media' | 'alta', ClusterCta>>
  /** Cluster prioritário na estratégia de topical authority. */
  priority?: boolean
  /** CTA padrão do cluster (pode ser sobrescrito por conteúdo). */
  cta: ClusterCta
}


export const CLUSTERS: Record<ClusterId, Cluster> = {
  'mercado-livre': {
    id: 'mercado-livre',
    name: 'Mercado Livre de Energia',
    description:
      'Migração, funcionamento, custos, contratos e gestão no Ambiente de Contratação Livre para consumidores empresariais.',
    moneyPath: '/produtos/mercado-livre-de-energia',
    pillarPath: '/produtos/mercado-livre-de-energia',
    supportingPaths: ['/produtos/gestao-de-energia', '/segmentos'],
    segmentPaths: [
      '/segmentos/agronegocio',
      '/segmentos/saude',
      '/segmentos/varejo',
      '/segmentos/turismo'
    ],
    regionPaths: ['/energia-solar-goiania', '/energia-solar-anapolis', '/energia-solar-em-rio-verde'],
    relatedClusters: ['gestao-de-energia'],
    intents: ['informacional', 'comparativa', 'elegibilidade', 'comercial'],
    ctaByIntent: {
      baixa: {
        label: 'Entenda como funciona o Mercado Livre de Energia',
        href: '/produtos/mercado-livre-de-energia'
      },
      media: {
        label: 'Veja se a sua empresa pode migrar',
        href: '/produtos/mercado-livre-de-energia'
      },
      alta: { label: 'Falar com um especialista em energia', href: '/contato' }
    },
    cta: { label: 'Conheça o Mercado Livre de Energia', href: '/produtos/mercado-livre-de-energia' }
  },
  'geracao-distribuida': {
    id: 'geracao-distribuida',
    name: 'Energia por assinatura e geração distribuída',
    description:
      'Geração compartilhada, consórcio, créditos de energia e adesão sem instalação de placas no imóvel. Termos tecnicamente distintos não são tratados como sinônimos.',
    moneyPath: '/produtos/consorcio-bc-energia',
    pillarPath: '/produtos/consorcio-bc-energia',
    supportingPaths: ['/segmentos/residencial', '/segmentos/condominio'],
    segmentPaths: [
      '/segmentos/residencial',
      '/segmentos/condominio',
      '/segmentos/bares-e-restaurantes',
      '/segmentos/servico',
      '/segmentos/varejo'
    ],
    regionPaths: [
      '/energia-solar-goiania',
      '/energia-solar-anapolis',
      '/energia-solar-aparecida-de-goiania',
      '/energia-solar-em-rio-verde',
      '/energia-solar-trindade',
      '/energia-solar-palmas',
      '/energia-solar-no-tocantins'
    ],
    relatedClusters: ['economia-conta-de-energia', 'mercado-livre'],
    intents: ['informacional', 'comparativa', 'elegibilidade', 'regional', 'comercial'],
    ctaByIntent: {
      baixa: {
        label: 'Entenda como funciona a energia por assinatura',
        href: '/produtos/consorcio-bc-energia'
      },
      media: {
        label: 'Veja se a sua unidade pode contratar',
        href: '/produtos/consorcio-bc-energia'
      },
      alta: { label: 'Simular minha economia na conta de energia', href: '/simulador-de-economia' }
    },
    priority: true,
    cta: { label: 'Veja como funciona o Consórcio BC Energia', href: '/produtos/consorcio-bc-energia' }
  },
  'gestao-de-energia': {
    id: 'gestao-de-energia',
    name: 'Gestão de energia',
    description:
      'Análise de faturas, consumo, demanda contratada, previsibilidade de custos e acompanhamento especializado.',
    moneyPath: '/produtos/gestao-de-energia',
    pillarPath: '/produtos/gestao-de-energia',
    supportingPaths: ['/produtos/mercado-livre-de-energia'],
    segmentPaths: [
      '/segmentos/varejo',
      '/segmentos/saude',
      '/segmentos/servico',
      '/segmentos/agronegocio',
      '/segmentos/turismo'
    ],
    regionPaths: ['/energia-solar-goiania', '/energia-solar-anapolis'],
    relatedClusters: ['mercado-livre', 'economia-conta-de-energia'],
    intents: ['informacional', 'problema', 'operacional', 'estrategica', 'comercial'],
    ctaByIntent: {
      baixa: { label: 'Entenda o que é gestão de energia', href: '/produtos/gestao-de-energia' },
      media: {
        label: 'Veja o que a gestão acompanha na sua operação',
        href: '/produtos/gestao-de-energia'
      },
      alta: { label: 'Falar com um especialista em energia', href: '/contato' }
    },
    priority: true,
    cta: { label: 'Conheça a gestão de energia para empresas', href: '/produtos/gestao-de-energia' }
  },
  'sustentabilidade-irec': {
    id: 'sustentabilidade-irec',
    name: 'Energia renovável, I-REC e sustentabilidade',
    description:
      'Origem renovável da energia, certificação I-REC e uso da energia na agenda ambiental da empresa. Sem alegações ambientais sem base.',
    moneyPath: '/produtos/certificacao-renovavel-irec',
    pillarPath: '/produtos/certificacao-renovavel-irec',
    supportingPaths: ['/sobre/sustentabilidade'],
    segmentPaths: ['/segmentos/turismo', '/segmentos/varejo', '/segmentos/agronegocio'],
    relatedClusters: ['mercado-livre'],
    intents: ['informacional', 'comercial'],
    cta: { label: 'Entenda a certificação I-REC', href: '/produtos/certificacao-renovavel-irec' }
  },
  'economia-conta-de-energia': {
    id: 'economia-conta-de-energia',
    name: 'Economia na conta de energia',
    description:
      'Leitura da fatura, componentes do custo e caminhos de redução conforme o perfil de consumo. Conduz para análise/contato.',
    moneyPath: '/contato',
    pillarPath: '/simulador-de-economia',
    supportingPaths: ['/produtos', '/produtos/gestao-de-energia'],
    relatedClusters: ['geracao-distribuida', 'gestao-de-energia'],
    intents: ['informacional', 'problema', 'comercial'],
    cta: { label: 'Solicite uma análise da sua conta de energia', href: '/contato' }
  },
  'usinas-arrendamento': {
    id: 'usinas-arrendamento',
    name: 'Usinas e arrendamento',
    description:
      'Operação das usinas do grupo e arrendamento de áreas/usinas. Cluster restrito ao que as páginas comerciais já sustentam.',
    moneyPath: '/produtos/arrendamento-de-usinas',
    pillarPath: '/produtos/arrendamento-de-usinas',
    supportingPaths: ['/sobre/nossas-usinas'],
    relatedClusters: ['sustentabilidade-irec'],
    intents: ['informacional', 'comercial'],
    cta: { label: 'Conheça o arrendamento de usinas', href: '/produtos/arrendamento-de-usinas' }
  }
}

export const CLUSTER_LIST: Cluster[] = Object.values(CLUSTERS)

export const getCluster = (id?: string): Cluster | null =>
  (id && CLUSTERS[id as ClusterId]) || null

/** Clusters prioritários (topical authority): assinatura/GD e gestão. */
export const PRIORITY_CLUSTERS: Cluster[] = CLUSTER_LIST.filter((cluster) => cluster.priority)

/**
 * Cluster ao qual uma rota comercial/regional pertence.
 * Usado para ligar página regional e segmento ao pilar correto.
 */
export const getClusterForPath = (path?: string): Cluster | null => {
  if (!path) return null
  return (
    CLUSTER_LIST.find((cluster) => cluster.pillarPath === path || cluster.moneyPath === path) ??
    CLUSTER_LIST.find((cluster) => cluster.regionPaths?.includes(path)) ??
    CLUSTER_LIST.find((cluster) => cluster.segmentPaths?.includes(path)) ??
    null
  )
}

/** CTA adequado ao nível de intenção da página (§11 do briefing). */
export const clusterCta = (
  cluster: Cluster,
  level: 'baixa' | 'media' | 'alta' = 'baixa'
): ClusterCta => cluster.ctaByIntent?.[level] ?? cluster.cta
