/**
 * KEYWORD MAP + BACKLOG EDITORIAL — planejamento de SEO de conteúdo.
 *
 * Este arquivo é de PLANEJAMENTO. Não é consumido pelo front-end e não gera
 * rota, página ou metadata. Serve como fonte única do plano editorial
 * documentado em docs/SEO-CONTENT-PLAN.md.
 *
 * REGRAS:
 *  - NENHUM volume de busca, CPC, dificuldade ou posição é declarado aqui.
 *    Não há fonte externa conectada ao projeto; número estimado não é fato.
 *    Quando houver dado real (Search Console / Semrush), preencher `metrics`
 *    com a fonte e a data da coleta.
 *  - Temas regulatórios (ANEEL, tarifas, tributos, regras de migração) ficam
 *    com status `requires-research`.
 *  - Cada oportunidade aponta a página comercial (money page) que ela apoia —
 *    o artigo NUNCA disputa a mesma intenção da página comercial.
 */
import type { ClusterId, FunnelStage, SearchIntent } from './content/types'

export type OpportunityStatus =
  /** Já atendido por uma página existente no site (não criar artigo). */
  | 'existing'
  /** Pauta aprovada para produção editorial. */
  | 'planned'
  /** Depende de pesquisa externa atualizada (regulatório/YMYL/dados). */
  | 'requires-research'
  /** Bloqueado: depende de decisão humana ou de dado comercial que não temos. */
  | 'blocked'

export type Priority = 'alta' | 'media' | 'baixa'

/** Métricas SOMENTE com fonte externa real. Ausente = desconhecido. */
export type KeywordMetrics = {
  source: string
  collectedAt: string
  volume?: number
  difficulty?: number
  cpc?: number
  position?: number
}

export type ContentOpportunity = {
  id: string
  /** Título provisório da pauta (não é o title final). */
  workingTitle: string
  keyword: string
  secondaryKeywords?: string[]
  intent: SearchIntent
  funnel: FunnelStage
  cluster: ClusterId
  /** Página comercial que a pauta apoia (money page do cluster ou específica). */
  commercialPath: string
  segmentPath?: string
  regionPath?: string
  /** Objetivo editorial: qual dúvida real o conteúdo resolve. */
  objective: string
  priority: Priority
  status: OpportunityStatus
  /** Conteúdo YMYL/regulatório: exige pesquisa externa atualizada. */
  requiresExternalResearch?: boolean
  /** Observação de canibalização / delimitação de escopo. */
  scopeNote?: string
  metrics?: KeywordMetrics
}

export const CONTENT_OPPORTUNITIES: ContentOpportunity[] = [
  // ─────────────── Cluster: Mercado Livre de Energia ───────────────
  {
    id: 'mle-o-que-e',
    workingTitle: 'O que é o Mercado Livre de Energia e como ele funciona',
    keyword: 'o que é mercado livre de energia',
    secondaryKeywords: ['ambiente de contratação livre', 'como funciona o mercado livre de energia'],
    intent: 'informacional',
    funnel: 'topo',
    cluster: 'mercado-livre',
    commercialPath: '/produtos/mercado-livre-de-energia',
    objective:
      'Explicar o conceito para quem nunca ouviu falar e encaminhar para a página comercial da solução.',
    priority: 'alta',
    status: 'planned',
    scopeNote:
      'Artigo conceitual. A intenção comercial ("migrar para o mercado livre") continua na página de produto.',
    metrics: {
      source: 'Semrush (base br) — "como funciona o mercado livre de energia"',
      collectedAt: '2026-08-14',
      volume: 390,
      difficulty: 30,
      cpc: 1.03
    }
  },
  {
    id: 'mle-quem-pode-migrar',
    workingTitle: 'Quem pode migrar para o Mercado Livre de Energia',
    keyword: 'quem pode migrar para o mercado livre de energia',
    secondaryKeywords: ['requisitos mercado livre de energia', 'demanda mínima mercado livre'],
    intent: 'informacional',
    funnel: 'meio',
    cluster: 'mercado-livre',
    commercialPath: '/produtos/mercado-livre-de-energia',
    objective: 'Responder a dúvida de elegibilidade que hoje chega ao time comercial.',
    priority: 'alta',
    status: 'requires-research',
    requiresExternalResearch: true,
    scopeNote: 'Critérios de elegibilidade são regulatórios — validar regra vigente antes de publicar.',
    metrics: {
      source: 'Semrush (base br)',
      collectedAt: '2026-08-14',
      volume: 50,
      cpc: 0.8
    }
  },
  {
    id: 'mle-cativo-vs-livre',
    workingTitle: 'Mercado cativo x Mercado livre: diferenças para a empresa',
    keyword: 'mercado cativo e mercado livre de energia diferença',
    intent: 'comparativa',
    funnel: 'meio',
    cluster: 'mercado-livre',
    commercialPath: '/produtos/mercado-livre-de-energia',
    objective: 'Comparar os dois ambientes sem repetir a página comercial.',
    priority: 'alta',
    status: 'requires-research',
    requiresExternalResearch: true
  },
  {
    id: 'mle-custos',
    workingTitle: 'Quais custos existem no Mercado Livre de Energia',
    keyword: 'custos do mercado livre de energia',
    secondaryKeywords: ['encargos mercado livre de energia'],
    intent: 'informacional',
    funnel: 'fundo',
    cluster: 'mercado-livre',
    commercialPath: '/produtos/mercado-livre-de-energia',
    objective: 'Dar transparência sobre a composição de custos antes da decisão.',
    priority: 'media',
    status: 'requires-research',
    requiresExternalResearch: true
  },
  {
    id: 'mle-riscos-gestao',
    workingTitle: 'Riscos do Mercado Livre e o papel da gestão de energia',
    keyword: 'riscos do mercado livre de energia',
    intent: 'informacional',
    funnel: 'fundo',
    cluster: 'mercado-livre',
    commercialPath: '/produtos/gestao-de-energia',
    objective: 'Conectar a dúvida de risco à solução de gestão (venda cruzada natural).',
    priority: 'media',
    status: 'planned'
  },

  // ─────────────── Cluster: Geração distribuída ───────────────
  {
    id: 'gd-o-que-e',
    workingTitle: 'O que é geração distribuída de energia',
    keyword: 'o que é geração distribuída',
    secondaryKeywords: ['como funciona geração distribuída'],
    intent: 'informacional',
    funnel: 'topo',
    cluster: 'geracao-distribuida',
    commercialPath: '/produtos/consorcio-bc-energia',
    objective: 'Base conceitual do cluster, com link para o consórcio como aplicação prática.',
    priority: 'alta',
    status: 'planned',
    scopeNote:
      'Geração distribuída, geração compartilhada e energia por assinatura NÃO são sinônimos — o artigo precisa distinguir os três.',
    metrics: {
      source: 'Semrush (base br) — "o que é geração distribuída"',
      collectedAt: '2026-08-14',
      volume: 110,
      difficulty: 36,
      cpc: 0.09
    }
  },
  {
    id: 'gd-sem-placas',
    workingTitle: 'Energia solar por assinatura: como funciona e para quem faz sentido',
    keyword: 'energia solar por assinatura',
    secondaryKeywords: [
      'energia por assinatura',
      'como funciona energia solar por assinatura',
      'energia solar sem instalar placas',
      'energia solar sem obra'
    ],
    intent: 'informacional',
    funnel: 'meio',
    cluster: 'geracao-distribuida',
    commercialPath: '/produtos/consorcio-bc-energia',
    objective: 'Responder a objeção mais comum de quem chega às páginas regionais.',
    priority: 'alta',
    status: 'planned',
    scopeNote:
      'PRIORIDADE 1 do backlog (melhor volume x dificuldade). Não competir com as LPs regionais ("energia solar em Goiânia") — o artigo é nacional e conceitual.',
    metrics: {
      source: 'Semrush (base br) — SERP: Matrix, Enova, Origo, Portal Solar, EDP',
      collectedAt: '2026-08-14',
      volume: 2400,
      difficulty: 17,
      cpc: 0.63
    }
  },
  {
    id: 'gd-creditos',
    workingTitle: 'Créditos de energia: o que são e como aparecem na conta',
    keyword: 'créditos de energia como funciona',
    intent: 'informacional',
    funnel: 'meio',
    cluster: 'geracao-distribuida',
    commercialPath: '/produtos/consorcio-bc-energia',
    objective: 'Explicar a mecânica de compensação que o cliente vê na fatura.',
    priority: 'media',
    status: 'requires-research',
    requiresExternalResearch: true
  },
  {
    id: 'gd-modelos',
    workingTitle: 'Assinatura, consórcio e usina própria: qual modelo faz sentido',
    keyword: 'diferença entre assinatura de energia e usina própria',
    intent: 'comparativa',
    funnel: 'fundo',
    cluster: 'geracao-distribuida',
    commercialPath: '/produtos/consorcio-bc-energia',
    objective: 'Ajudar na escolha do modelo sem prometer percentual de economia.',
    priority: 'media',
    status: 'planned'
  },
  {
    id: 'gd-quem-pode',
    workingTitle: 'Quem pode contratar energia por assinatura',
    keyword: 'quem pode contratar energia por assinatura',
    secondaryKeywords: ['energia por assinatura para empresas', 'preciso ter imóvel próprio'],
    intent: 'informacional',
    funnel: 'meio',
    cluster: 'geracao-distribuida',
    commercialPath: '/produtos/consorcio-bc-energia',
    objective: 'Cobrir a intenção de elegibilidade — hoje sem página dedicada no cluster.',
    priority: 'alta',
    status: 'requires-research',
    requiresExternalResearch: true,
    scopeNote:
      'Elegibilidade depende de regra vigente de geração distribuída e da área atendida. Não afirmar cobertura ou condição sem confirmação da operação.'
  },
  {
    id: 'gd-vale-a-pena',
    workingTitle: 'Energia por assinatura vale a pena? O que avaliar antes de contratar',
    keyword: 'energia por assinatura vale a pena',
    intent: 'comparativa',
    funnel: 'fundo',
    cluster: 'geracao-distribuida',
    commercialPath: '/produtos/consorcio-bc-energia',
    objective: 'Intenção de decisão do cluster prioritário, hoje descoberta.',
    priority: 'alta',
    status: 'planned',
    scopeNote:
      'Percentual de economia só pode ser citado como condição divulgada ("até 25%"), nunca como garantia.'
  },
  {
    id: 'gd-vs-mercado-livre',
    workingTitle: 'Energia por assinatura ou Mercado Livre de Energia: qual caminho seguir',
    keyword: 'diferença energia por assinatura e mercado livre de energia',
    intent: 'comparativa',
    funnel: 'fundo',
    cluster: 'geracao-distribuida',
    commercialPath: '/produtos/consorcio-bc-energia',
    objective:
      'Conectar os dois clusters comerciais e evitar que o usuário escolha o caminho errado.',
    priority: 'media',
    status: 'requires-research',
    requiresExternalResearch: true,
    scopeNote: 'Critérios de elegibilidade do ACL exigem checagem da regra vigente.'
  },

  // ─────────────── Cluster: Gestão de energia ───────────────

  {
    id: 'gestao-fatura',
    workingTitle: 'Como ler a conta de energia da sua empresa',
    keyword: 'como ler a conta de energia empresarial',
    secondaryKeywords: ['itens da fatura de energia', 'análise de fatura de energia'],
    intent: 'informacional',
    funnel: 'topo',
    cluster: 'gestao-de-energia',
    commercialPath: '/produtos/gestao-de-energia',
    objective: 'Conteúdo utilitário de entrada, com CTA para análise da conta.',
    priority: 'alta',
    status: 'requires-research',
    requiresExternalResearch: true,
    scopeNote: 'Componentes tarifários mudam — validar nomenclatura vigente.'
  },
  {
    id: 'gestao-demanda',
    workingTitle: 'Demanda contratada: o que é e por que ela pesa na fatura',
    keyword: 'demanda contratada o que é',
    intent: 'informacional',
    funnel: 'meio',
    cluster: 'gestao-de-energia',
    commercialPath: '/produtos/gestao-de-energia',
    objective: 'Explicar um dos maiores geradores de custo evitável em empresas.',
    priority: 'media',
    status: 'requires-research',
    requiresExternalResearch: true,
    scopeNote:
      'Melhor porta de entrada do cluster: "gestão de energia" tem intenção contaminada (modo de economia de monitor/PC).',
    metrics: {
      source: 'Semrush (base br)',
      collectedAt: '2026-08-14',
      volume: 170,
      difficulty: 18,
      cpc: 0
    }
  },
  {
    id: 'gestao-previsibilidade',
    workingTitle: 'Como dar previsibilidade ao custo de energia da operação',
    keyword: 'previsibilidade custo de energia empresa',
    intent: 'comercial',
    funnel: 'fundo',
    cluster: 'gestao-de-energia',
    commercialPath: '/produtos/gestao-de-energia',
    objective: 'Conteúdo de decisão, próximo da conversão.',
    priority: 'media',
    status: 'planned'
  },
  {
    id: 'gestao-o-que-e',
    workingTitle: 'O que é gestão de energia e o que ela acompanha na prática',
    keyword: 'o que é gestão de energia',
    secondaryKeywords: ['gestão de energia para empresas'],
    intent: 'informacional',
    funnel: 'topo',
    cluster: 'gestao-de-energia',
    commercialPath: '/produtos/gestao-de-energia',
    objective: 'Entrada conceitual do cluster prioritário, hoje sem conteúdo de topo próprio.',
    priority: 'alta',
    status: 'planned',
    scopeNote:
      'Intenção contaminada por "modo de economia de energia" de dispositivos — o texto precisa deixar o recorte empresarial claro já no primeiro parágrafo.'
  },
  {
    id: 'gestao-multiplas-unidades',
    workingTitle: 'Como controlar a energia de várias unidades da mesma empresa',
    keyword: 'gestão de energia multiunidades',
    intent: 'comercial',
    funnel: 'meio',
    cluster: 'gestao-de-energia',
    commercialPath: '/produtos/gestao-de-energia',
    objective: 'Atender redes e operações distribuídas (varejo, saúde, serviços).',
    priority: 'media',
    status: 'planned'
  },
  {
    id: 'gestao-medicao',
    workingTitle: 'Medição e monitoramento de consumo: o que acompanhar mês a mês',
    keyword: 'monitoramento de consumo de energia empresa',
    intent: 'informacional',
    funnel: 'meio',
    cluster: 'gestao-de-energia',
    commercialPath: '/produtos/gestao-de-energia',
    objective: 'Cobrir a intenção operacional do cluster, hoje descoberta.',
    priority: 'media',
    status: 'requires-research',
    requiresExternalResearch: true,
    scopeNote: 'Não descrever recursos de plataforma que o grupo não confirmou oferecer.'
  },



  // ─────────────── Cluster: Sustentabilidade / I-REC ───────────────
  {
    id: 'irec-o-que-e',
    workingTitle: 'O que é o certificado I-REC e para que ele serve',
    keyword: 'o que é certificado i-rec',
    secondaryKeywords: ['certificação de energia renovável'],
    intent: 'informacional',
    funnel: 'topo',
    cluster: 'sustentabilidade-irec',
    commercialPath: '/produtos/certificacao-renovavel-irec',
    objective: 'Explicar o instrumento de comprovação de origem renovável.',
    priority: 'alta',
    status: 'requires-research',
    requiresExternalResearch: true,
    scopeNote: 'Regras do padrão I-REC são externas — citar fonte oficial.',
    metrics: {
      source: 'Semrush (base br) — "certificado i-rec"',
      collectedAt: '2026-08-14',
      volume: 90,
      difficulty: 11,
      cpc: 0.41
    }
  },
  {
    id: 'irec-relato',
    workingTitle: 'Como a energia entra no relato de sustentabilidade da empresa',
    keyword: 'energia renovável relatório de sustentabilidade',
    intent: 'informacional',
    funnel: 'meio',
    cluster: 'sustentabilidade-irec',
    commercialPath: '/produtos/certificacao-renovavel-irec',
    objective: 'Público de ESG/compras; evitar qualquer alegação ambiental sem base.',
    priority: 'baixa',
    status: 'requires-research',
    requiresExternalResearch: true
  },

  // ─────────────── Cluster: Economia na conta ───────────────
  {
    id: 'economia-caminhos',
    workingTitle: 'Caminhos reais para reduzir o custo de energia da empresa',
    keyword: 'como reduzir o custo de energia da empresa',
    intent: 'comercial',
    funnel: 'fundo',
    cluster: 'economia-conta-de-energia',
    commercialPath: '/produtos',
    objective: 'Hub editorial que distribui para as soluções conforme o perfil.',
    priority: 'baixa',
    status: 'planned',
    scopeNote:
      'Rebaixado após pesquisa: "como reduzir conta de energia da empresa" não tem volume rastreado no Semrush br. Sem prometer percentual de economia — não há dado comercial aprovado para isso.',
    metrics: {
      source: 'Semrush (base br) — sem volume rastreado para a keyword',
      collectedAt: '2026-08-14'
    }
  },
  {
    id: 'economia-conta-alta',
    workingTitle: 'Por que a conta de energia veio mais alta neste mês',
    keyword: 'conta de energia alta motivos',
    intent: 'informacional',
    funnel: 'topo',
    cluster: 'economia-conta-de-energia',
    commercialPath: '/contato',
    objective: 'Captura de topo com CTA de análise da conta.',
    priority: 'media',
    status: 'requires-research',
    requiresExternalResearch: true,
    scopeNote: 'Bandeiras tarifárias e reajustes exigem dado vigente.'
  },

  // ─────────────── Clusters por segmento ───────────────
  {
    id: 'seg-condominio',
    workingTitle: 'Energia em condomínios: onde está o custo das áreas comuns',
    keyword: 'conta de energia condomínio área comum',
    intent: 'informacional',
    funnel: 'meio',
    cluster: 'economia-conta-de-energia',
    commercialPath: '/segmentos/condominio',
    segmentPath: '/segmentos/condominio',
    objective: 'Responder a dúvida do síndico; a página de segmento segue como oferta comercial.',
    priority: 'media',
    status: 'planned',
    scopeNote: 'Artigo = dúvida/problema. Página de segmento = solução comercial. Não duplicar.'
  },
  {
    id: 'seg-agro',
    workingTitle: 'Energia no agronegócio: irrigação, sazonalidade e custo',
    keyword: 'custo de energia no agronegócio',
    intent: 'informacional',
    funnel: 'meio',
    cluster: 'gestao-de-energia',
    commercialPath: '/segmentos/agronegocio',
    segmentPath: '/segmentos/agronegocio',
    objective: 'Tema com lastro real: já há episódio do BC Cast com pauta do agro.',
    priority: 'alta',
    status: 'planned'
  },
  {
    id: 'seg-varejo',
    workingTitle: 'Energia no varejo: refrigeração, climatização e horário de pico',
    keyword: 'reduzir energia no varejo',
    intent: 'informacional',
    funnel: 'meio',
    cluster: 'gestao-de-energia',
    commercialPath: '/segmentos/varejo',
    segmentPath: '/segmentos/varejo',
    objective: 'Dúvida operacional que antecede a conversa comercial.',
    priority: 'baixa',
    status: 'planned'
  },

  // ─────────────── Regional (complementar, nunca concorrente) ───────────────
  {
    id: 'regional-goias-duvidas',
    workingTitle: 'Dúvidas de quem contrata energia por assinatura em Goiás',
    keyword: 'energia por assinatura goiás dúvidas',
    intent: 'informacional',
    funnel: 'meio',
    cluster: 'geracao-distribuida',
    commercialPath: '/energia-solar-goiania',
    regionPath: '/energia-solar-goiania',
    objective:
      'Complementar as LPs regionais com dúvidas operacionais (prazo, portabilidade, mudança de imóvel).',
    priority: 'baixa',
    status: 'blocked',
    scopeNote:
      'BLOQUEADO até decisão humana: as LPs regionais já atendem a intenção "energia solar em <cidade>". Só produzir se houver dúvida complementar comprovada no Search Console.'
  },

  // ─────────────── Já atendido por página existente ───────────────
  {
    id: 'existing-arrendamento',
    workingTitle: 'Arrendamento de usinas — já coberto pela página comercial',
    keyword: 'arrendamento de usina solar',
    intent: 'comercial',
    funnel: 'fundo',
    cluster: 'usinas-arrendamento',
    commercialPath: '/produtos/arrendamento-de-usinas',
    objective: 'Registrar que a intenção já tem money page — não criar artigo concorrente.',
    priority: 'baixa',
    status: 'existing'
  },
  {
    id: 'existing-leilao',
    workingTitle: 'Leilão de energia — já coberto por /sobre/leilao',
    keyword: 'leilão de energia',
    intent: 'informacional',
    funnel: 'topo',
    cluster: 'mercado-livre',
    commercialPath: '/sobre/leilao',
    objective: 'Evitar duplicação com a página institucional existente.',
    priority: 'baixa',
    status: 'existing'
  }
]

export const getOpportunitiesByCluster = (cluster: ClusterId): ContentOpportunity[] =>
  CONTENT_OPPORTUNITIES.filter((item) => item.cluster === cluster)

export const getOpportunitiesByPriority = (priority: Priority): ContentOpportunity[] =>
  CONTENT_OPPORTUNITIES.filter((item) => item.priority === priority)
