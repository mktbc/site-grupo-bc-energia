/**
 * Artigos REAIS do Blog.
 *
 * ⚠️ Regra permanente: nenhum artigo fictício. Todo dado opcional (autor, data,
 * imagem, fontes) só é preenchido quando existe informação REAL e aprovada.
 *
 * Antes de adicionar um item, seguir docs/CONTENT-INDEXING-CRITERIA.md.
 * O hub /conteudo/blog e as rotas de artigo permanecem `noindex,follow` e fora
 * do sitemap enquanto CONTENT_INDEXING_ENABLED for `false`.
 *
 * Toda afirmação comercial deste arquivo precisa existir em uma página oficial
 * do site. Origem das condições do Consórcio BC Energia:
 * src/pages/produtos/consorcio-bc-energia (page.tsx + data.tsx).
 */
import type { Article } from './types'

/**
 * P1 do plano editorial (docs/SEO-KEYWORD-RESEARCH-2026.md).
 * Keyword principal: "energia solar por assinatura" — Semrush br, coleta
 * 2026-08-14: 2.400 buscas/mês, KD 17.
 *
 * PENDÊNCIAS ANTES DA INDEXAÇÃO (decisão humana):
 *  - `publishedAt`: preencher com a data real de publicação editorial.
 *  - `author` / `reviewer`: preencher com pessoa real do Grupo BC Energia.
 *  - `image`: pendência de imagem editorial própria (nenhum asset adequado
 *    existe hoje no projeto — não usar placeholder).
 */
const energiaSolarPorAssinatura: Article = {
  slug: 'energia-solar-por-assinatura',
  title: 'Energia solar por assinatura: entenda como funciona',
  excerpt:
    'Energia solar por assinatura é usar energia de uma usina solar sem instalar placas no seu imóvel. Entenda como funciona, quem pode contratar e como aparece na conta.',
  cluster: 'geracao-distribuida',
  funnel: 'meio',
  intent: 'informacional',
  tags: ['energia solar por assinatura', 'geração distribuída', 'consórcio de energia'],
  solutionPath: '/produtos/consorcio-bc-energia',
  segmentPaths: ['/segmentos/residencial', '/segmentos/condominio'],
  body: [
    {
      type: 'paragraph',
      text: 'Energia solar por assinatura é o modelo em que você passa a usar a energia produzida por uma usina solar sem instalar nenhuma placa no seu imóvel. Em vez de comprar e montar um sistema fotovoltaico no telhado, você adere a uma usina que já existe e que injeta energia na rede de distribuição da sua região. Na prática, sua casa ou seu ponto comercial continua ligado exatamente como está hoje, e o benefício aparece no valor da conta de luz.'
    },
    {
      type: 'paragraph',
      text: 'Este artigo explica o funcionamento do modelo em linguagem simples: o que é, como a energia chega até você, como nasce a economia, quem pode contratar e em que esse formato se diferencia da instalação de placas e do Mercado Livre de Energia. As condições comerciais citadas são as do Consórcio BC Energia, a solução do Grupo BC Energia para esse modelo.'
    },

    { type: 'heading', level: 2, text: 'O que é energia solar por assinatura?' },
    {
      type: 'paragraph',
      text: 'É uma forma de consumir energia de origem solar por adesão, e não por investimento. Uma usina fotovoltaica gera energia e injeta essa energia na rede da distribuidora local. Quem assina passa a receber os créditos correspondentes a essa energia, e esses créditos abatem parte do valor da conta de luz. Nenhum equipamento é instalado na sua unidade consumidora e nenhuma obra é feita.'
    },
    {
      type: 'paragraph',
      text: 'O nome "por assinatura" descreve a relação: você adere a um serviço em vez de comprar um ativo. É por isso que o modelo costuma ser procurado por quem quer reduzir o custo da energia mas não quer, ou não pode, imobilizar capital em um sistema próprio, inclusive quem mora ou opera em imóvel alugado.'
    },

    { type: 'heading', level: 2, text: 'Como funciona a energia solar por assinatura?' },
    {
      type: 'paragraph',
      text: 'No Consórcio BC Energia, o caminho da energia acontece em quatro etapas:'
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Geração: as usinas fotovoltaicas do Grupo BC Energia produzem energia limpa e renovável.',
        'Injeção na rede: toda a energia gerada é injetada diretamente na rede de distribuição local, contribuindo com o fornecimento de eletricidade da região.',
        'Conversão em créditos: a distribuidora converte a energia injetada em créditos de energia, que são repassados ao Grupo BC Energia.',
        'Rateio: esses créditos são compartilhados com os consumidores alocados no consórcio e aparecem como desconto na conta de luz.'
      ]
    },
    {
      type: 'paragraph',
      text: 'Do lado do assinante, o processo é administrativo, não físico: não há troca de padrão, não há mudança na instalação elétrica e não há intervenção no imóvel.',
      link: {
        label: 'Conheça como funciona o Consórcio BC Energia',
        href: '/produtos/consorcio-bc-energia'
      }
    },

    { type: 'heading', level: 2, text: 'É preciso instalar placas solares?' },
    {
      type: 'paragraph',
      text: 'Não. Essa é justamente a diferença central do modelo. No Consórcio BC Energia não há investimento em placas solares e não há mudança na estrutura física do imóvel. As placas ficam nas usinas do grupo, não no seu telhado. Por isso o modelo funciona também para quem não tem telhado disponível, não tem área útil suficiente ou não é dono do imóvel.'
    },

    { type: 'heading', level: 2, text: 'Como a energia chega até o consumidor?' },
    {
      type: 'paragraph',
      text: 'Não existe um cabo ligando a usina diretamente ao seu imóvel. A energia da usina entra na rede de distribuição, se mistura a toda a energia que circula ali e é consumida por quem estiver conectado àquela rede. O que chega até você é a mesma energia de sempre, pela mesma rede de sempre.'
    },
    {
      type: 'paragraph',
      text: 'O vínculo entre a usina e o assinante é contábil: a distribuidora registra quanto foi injetado e converte isso em créditos. Por isso a distribuidora local continua responsável pela infraestrutura física e pelo fornecimento de energia até a sua unidade consumidora. Em caso de falta de energia, o contato continua sendo com ela.'
    },

    { type: 'heading', level: 2, text: 'Como funciona a economia na conta de energia?' },
    {
      type: 'paragraph',
      text: 'A economia não vem de consumir menos, e sim de pagar menos pela energia que você já consome. Os créditos gerados pela usina abatem parte do valor da sua conta, e você paga por esses créditos um valor menor do que pagaria à distribuidora pela mesma quantidade de energia. A diferença entre esses dois valores é a sua economia.'
    },
    {
      type: 'paragraph',
      text: 'Como o benefício é proporcional ao consumo, ele acompanha o seu perfil: meses de consumo maior tendem a gerar abatimento maior. No Consórcio BC Energia, a condição divulgada é de até 25% de economia na conta de energia, sem taxa de adesão e sem fidelidade. O percentual efetivo varia conforme a região, a solução contratada e o perfil de consumo.'
    },
    {
      type: 'paragraph',
      text: 'Vale destacar o que a assinatura não faz: ela não elimina a conta de energia. Encargos, tributos e o custo mínimo de disponibilidade cobrados pela distribuidora continuam existindo. O que muda é a parcela referente à energia consumida.'
    },

    { type: 'heading', level: 2, text: 'Quem pode contratar energia solar por assinatura?' },
    {
      type: 'paragraph',
      text: 'No Consórcio BC Energia, os critérios de adesão são:'
    },
    {
      type: 'list',
      items: [
        'ser consumidor de baixa tensão, o caso da maioria das residências e dos pequenos e médios pontos comerciais;',
        'ter conta de energia a partir de R$ 250,00;',
        'estar localizado na mesma região da distribuidora em que a usina do Grupo BC Energia está conectada.'
      ]
    },
    {
      type: 'paragraph',
      text: 'O terceiro critério é o que mais gera dúvida: como a compensação acontece dentro da área de uma distribuidora, a disponibilidade depende da sua localização. Por isso a verificação é feita caso a caso.',
      link: {
        label: 'Fale com o time do Grupo BC Energia para verificar a disponibilidade',
        href: '/contato',
        cta: true
      }
    },

    { type: 'heading', level: 2, text: 'Quais são as vantagens?' },
    {
      type: 'list',
      items: [
        'Sem investimento em placas solares: não há compra de equipamento nem projeto de instalação.',
        'Sem obra e sem mudanças na estrutura física do imóvel.',
        'Sem taxa de adesão e sem fidelidade, nas condições do Consórcio BC Energia.',
        'Energia de fonte limpa e renovável, gerada pelas usinas fotovoltaicas do grupo.',
        'Funciona em imóvel alugado, já que nada é instalado na unidade consumidora.',
        'A distribuidora local continua responsável pelo fornecimento, sem mudança na rotina de atendimento.'
      ]
    },
    {
      type: 'paragraph',
      text: 'Também há limitações honestas a considerar: você não se torna dono de um ativo de geração, o benefício depende da disponibilidade de usina na sua área de distribuição e existe um valor mínimo de conta para que a adesão faça sentido.'
    },

    {
      type: 'heading',
      level: 2,
      text: 'Energia solar por assinatura e instalação de placas: qual a diferença?'
    },
    {
      type: 'paragraph',
      text: 'Os dois caminhos usam energia solar, mas resolvem o problema de formas diferentes. A comparação abaixo considera o modelo de assinatura conforme o Consórcio BC Energia:'
    },
    {
      type: 'table',
      caption:
        'Comparativo entre energia solar por assinatura (Consórcio BC Energia) e instalação de sistema próprio.',
      columns: ['Critério', 'Energia solar por assinatura', 'Instalação própria de placas'],
      rows: [
        ['Instalação no imóvel', 'Não há', 'Sim, no telhado ou em área do imóvel'],
        [
          'Investimento inicial',
          'Sem investimento em placas e sem taxa de adesão',
          'Compra do sistema e do projeto'
        ],
        ['Obra', 'Sem obra e sem mudança na estrutura física', 'Obra e adequação da instalação'],
        [
          'Manutenção dos equipamentos',
          'Fica com a usina geradora',
          'Fica com o dono do sistema'
        ],
        [
          'Forma de utilização da energia',
          'Créditos da usina abatem parte da conta',
          'Geração no próprio local de consumo'
        ],
        [
          'Imóvel alugado',
          'Compatível, pois nada é instalado',
          'Depende de autorização e do tempo de permanência'
        ]
      ]
    },
    {
      type: 'paragraph',
      text: 'Não existe modelo melhor em termos absolutos: existe o modelo mais adequado ao seu perfil de consumo, ao seu imóvel e à sua disposição de investir.'
    },

    {
      type: 'heading',
      level: 2,
      text: 'Energia solar por assinatura é a mesma coisa que Mercado Livre de Energia?'
    },
    {
      type: 'paragraph',
      text: 'Não. São dois caminhos distintos para reduzir o custo de energia. A energia solar por assinatura acontece no ambiente da geração distribuída: você continua atendido pela distribuidora e recebe créditos de uma usina. Já o Mercado Livre de Energia é um ambiente de contratação em que o consumidor negocia diretamente a compra da energia com um fornecedor, com regras de elegibilidade próprias.'
    },
    {
      type: 'paragraph',
      text: 'Na prática, a assinatura é a alternativa para quem não se enquadra nos requisitos de migração para o mercado livre. São modelos complementares dentro do portfólio, não sinônimos.',
      link: {
        label: 'Conheça o Mercado Livre de Energia',
        href: '/produtos/mercado-livre-de-energia'
      }
    },

    { type: 'heading', level: 2, text: 'Como contratar?' },
    {
      type: 'paragraph',
      text: 'O processo do Grupo BC Energia segue esta sequência:'
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Verificação de elegibilidade: confirmação de que a unidade é de baixa tensão, de que a conta atende ao valor mínimo e de que há usina conectada à sua distribuidora.',
        'Análise da conta de energia: os dados da fatura mostram o perfil de consumo e o benefício aplicável ao seu caso.',
        'Adesão: formalização, sem taxa de adesão e sem fidelidade.',
        'Alocação no consórcio e início do rateio dos créditos, que passam a aparecer na conta.'
      ]
    },
    {
      type: 'paragraph',
      text: 'Nenhuma dessas etapas exige visita técnica para instalação de equipamento, porque nada é instalado no imóvel.'
    }
  ],
  faq: [
    {
      question: 'O que é energia solar por assinatura?',
      answer:
        'É o modelo em que você usa a energia produzida por uma usina solar sem instalar placas no seu imóvel. A usina injeta energia na rede da distribuidora, essa energia é convertida em créditos e os créditos abatem parte da sua conta de luz.'
    },
    {
      question: 'Preciso instalar placas solares no meu imóvel?',
      answer:
        'Não. No Consórcio BC Energia não há investimento em placas solares nem mudança na estrutura física do imóvel. As placas ficam nas usinas do Grupo BC Energia.'
    },
    {
      question: 'Como funciona a economia na conta?',
      answer:
        'A energia gerada pelas usinas é injetada na rede, convertida em créditos pela distribuidora e rateada entre os consorciados como desconto na conta. No Consórcio BC Energia, a condição divulgada é de até 25% de economia na conta de energia. O percentual efetivo varia conforme a região, a solução contratada e o perfil de consumo.'
    },
    {
      question: 'Quem pode contratar?',
      answer:
        'Consumidores de baixa tensão com conta de energia a partir de R$ 250,00 que estejam na mesma região da distribuidora em que a usina do Grupo BC Energia está conectada.'
    },
    {
      question: 'Continuo sendo atendido pela minha distribuidora?',
      answer:
        'Sim. A distribuidora local continua responsável pela infraestrutura física e pelo fornecimento de energia até a sua unidade consumidora. Em caso de falta de energia, o contato é diretamente com ela.'
    },
    {
      question: 'Energia solar por assinatura é a mesma coisa que Mercado Livre de Energia?',
      answer:
        'Não. A assinatura ocorre no ambiente da geração distribuída, com créditos de uma usina abatendo parte da conta. O Mercado Livre de Energia é um ambiente de contratação com requisitos próprios, em que o consumidor negocia diretamente a compra da energia.'
    },
    {
      question: 'Existe taxa de adesão ou fidelidade?',
      answer:
        'Nas condições divulgadas do Consórcio BC Energia, não há taxa de adesão e não há fidelidade.'
    }
  ],
  cta: {
    heading: 'Descubra se essa solução faz sentido para você',
    label: 'Solicite uma análise da sua conta de energia',
    href: '/contato',
    description:
      'Envie os dados da sua conta e o time do Grupo BC Energia verifica se há usina disponível na sua região e qual solução faz sentido para o seu perfil de consumo.'
  }
}

export const ARTICLES: Article[] = [energiaSolarPorAssinatura]

export const getArticle = (slug?: string): Article | null =>
  ARTICLES.find((article) => article.slug === slug) ?? null

/** Artigos ordenados: publicados primeiro (mais recentes no topo). */
export const getArticles = (): Article[] =>
  [...ARTICLES].sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''))

export const getArticlesByCluster = (cluster: string): Article[] =>
  getArticles().filter((article) => article.cluster === cluster)

/** Artigos que apoiam uma página comercial (solução, segmento ou região). */
export const getArticlesForPath = (path: string): Article[] =>
  getArticles().filter(
    (article) =>
      article.solutionPath === path ||
      article.segmentPaths?.includes(path) ||
      article.regionPaths?.includes(path)
  )
