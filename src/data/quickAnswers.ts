import type { QuickAnswer } from '@/components/QuickAnswers'

/**
 * Mapa de respostas rápidas por rota estratégica.
 *
 * REGRAS (arquitetura de conteúdo):
 * 1. Nenhuma resposta inventa número, prazo, condição comercial ou cobertura.
 *    Todo dado aqui já existe no conteúdo publicado do site (dados de produto,
 *    FAQ, cobertura oficial). Quando a resposta depende de região, distribuidora,
 *    perfil de consumo ou contrato, isso é dito explicitamente.
 * 2. Cada resposta é autossuficiente: faz sentido lida fora da página.
 * 3. Entidades sempre pelo nome completo no primeiro uso
 *    (Mercado Livre de Energia, Geração Distribuída, Certificação Renovável I-REC).
 * 4. Jargão é explicado no primeiro uso.
 * 5. Não há CTA entre a pergunta e a resposta — só depois, como aprofundamento.
 */
export type QuickAnswerSet = {
  title: string
  description?: string
  items: QuickAnswer[]
}

export const QUICK_ANSWERS: Record<string, QuickAnswerSet> = {
  '/produtos/mercado-livre-de-energia': {
    title: 'O essencial sobre o Mercado Livre de Energia',
    description:
      'As dúvidas mais comuns de quem avalia a migração, respondidas de forma direta. O detalhamento de cada tema continua nas seções seguintes.',
    items: [
      {
        question: 'O que é o Mercado Livre de Energia?',
        answer:
          'É o ambiente de contratação em que o consumidor escolhe o próprio fornecedor de energia elétrica e negocia preço, prazo e fonte diretamente, em vez de comprar exclusivamente da distribuidora local. Esse ambiente também é chamado de Ambiente de Contratação Livre (ACL).'
      },
      {
        question: 'Quem pode migrar?',
        answer:
          'Consumidores conectados em média e alta tensão (o chamado Grupo A), com demanda contratada junto à distribuidora local e disposição para uma gestão mais ativa do contrato de energia. A elegibilidade é confirmada na análise do perfil de consumo.'
      },
      {
        question: 'Qual a diferença em relação ao mercado regulado?',
        answer:
          'No mercado regulado a tarifa é definida para todos os consumidores atendidos pela distribuidora. No Mercado Livre de Energia o preço vem de um contrato negociado, o que permite escolher fonte, fornecedor e prazo — inclusive comprar energia para anos seguintes e reduzir a oscilação do custo.'
      },
      {
        question: 'Quais são as etapas da migração?',
        answer:
          'Primeiro a análise de viabilidade econômica, depois a assessoria na adesão e na contratação de energia e, por fim, a gestão do contrato com relatórios mensais e representação junto à Câmara de Comercialização de Energia Elétrica (CCEE).',
        deepen: { label: 'Ver as etapas em detalhe', href: '#como-funciona' }
      },
      {
        question: 'Quanto tempo leva e quanto é possível economizar?',
        answer:
          'Prazo e economia dependem do perfil de consumo, da distribuidora, do momento do mercado e das condições contratadas — por isso não trabalhamos com um número único. A análise de viabilidade indica o cenário aplicável à sua operação antes de qualquer decisão.'
      },
      {
        question: 'E depois da migração, como fica a gestão?',
        answer:
          'O contrato passa a exigir acompanhamento contínuo: medição, faturamento, demanda contratada e mudanças regulatórias. Esse acompanhamento é feito pela gestão de energia, com relatórios mensais e análise das alterações do setor.',
        deepen: {
          label: 'Entenda a Gestão de Energia após a migração',
          href: '/produtos/gestao-de-energia'
        }
      }
    ]
  },

  '/produtos/consorcio-bc-energia': {
    title: 'O essencial sobre energia por assinatura',
    description:
      'Respostas diretas sobre o Consórcio BC Energia, a solução de Geração Distribuída para quem quer reduzir a conta de luz sem obra.',
    items: [
      {
        question: 'O que é o Consórcio BC Energia?',
        answer:
          'É uma solução de energia por assinatura baseada em Geração Distribuída: a energia limpa gerada pelas usinas do Grupo BC Energia é injetada na rede da distribuidora e vira crédito de desconto na sua conta de luz.'
      },
      {
        question: 'Preciso instalar placas solares?',
        answer:
          'Não. O modelo dispensa investimento em placas e não exige mudança na estrutura física nem na instalação elétrica do imóvel. A geração acontece nas usinas do grupo, não no seu telhado.'
      },
      {
        question: 'Quem pode contratar?',
        answer:
          'Consumidores residenciais e comerciais de baixa tensão com conta de energia a partir de R$ 250,00, dentro das regiões atendidas pelas usinas do grupo. A confirmação depende da distribuidora e do endereço de consumo.'
      },
      {
        question: 'Quanto posso economizar?',
        answer:
          'São até 25% de economia na conta de energia, aplicados sobre a parcela de energia da fatura. O percentual efetivo varia conforme consumo, distribuidora e condições aplicáveis ao seu perfil.',
        deepen: { label: 'Simular a economia com a sua conta', href: '/simulador-de-economia' }
      },
      {
        question: 'Existe taxa de adesão ou fidelidade?',
        answer: 'Não há taxa de adesão nem fidelidade contratual.'
      },
      {
        question: 'E se faltar energia?',
        answer:
          'O fornecimento continua sendo da distribuidora local, que segue responsável pela rede e pelo atendimento em caso de falta de energia. O que muda é a origem da energia e o desconto aplicado à conta.'
      }
    ]
  },

  '/produtos/gestao-de-energia': {
    title: 'O essencial sobre gestão de energia',
    description:
      'O que é acompanhado, para quem faz sentido e como a gestão se conecta ao contrato de energia da empresa.',
    items: [
      {
        question: 'O que é gestão de energia?',
        answer:
          'É o acompanhamento contínuo da geração, do consumo e da contratação de energia de uma operação, com o objetivo de reduzir custo e aumentar previsibilidade — combinando análise técnica, dados de consumo e leitura do mercado.'
      },
      {
        question: 'Quem precisa?',
        answer:
          'Empresas com consumo relevante, especialmente as que já estão ou pretendem entrar no Mercado Livre de Energia, onde o contrato exige decisões periódicas de compra, medição e faturamento.'
      },
      {
        question: 'O que é analisado?',
        answer:
          'O consumo aplicado ao processo produtivo, as oportunidades de economia no mercado, os dados de energia em tempo real disponíveis em plataforma e o acompanhamento por engenheiros e técnicos especializados.'
      },
      {
        question: 'O que é demanda contratada?',
        answer:
          'É a potência que a empresa contrata junto à distribuidora e paga mesmo que não utilize integralmente. Ajustar esse valor ao consumo real é um dos pontos analisados na gestão.'
      },
      {
        question: 'Como isso melhora a previsibilidade?',
        answer:
          'Com acompanhamento mensal, a empresa passa a antecipar variações de custo, corrigir desvios de consumo e planejar a contratação em vez de reagir à conta depois de emitida.',
        deepen: {
          label: 'Ver como funciona a migração para o Mercado Livre de Energia',
          href: '/produtos/mercado-livre-de-energia'
        }
      }
    ]
  },

  '/produtos/certificacao-renovavel-irec': {
    title: 'O essencial sobre a Certificação Renovável I-REC',
    items: [
      {
        question: 'O que é o I-REC?',
        answer:
          'I-REC (International Renewable Energy Certificate) é um sistema global de rastreamento e certificação da origem renovável da energia elétrica consumida por empresas, indústrias e residências.'
      },
      {
        question: 'O que exatamente o certificado comprova?',
        answer:
          'Cada I-REC representa 1 MWh de energia renovável injetada na rede elétrica. O sistema rastreia os certificados e impede a revenda, garantindo que aquela energia renovável seja atribuída a um único consumidor.'
      },
      {
        question: 'Quem utiliza?',
        answer:
          'Empresas que precisam comprovar consumo de energia renovável em relatórios de sustentabilidade e em compromissos ESG, especialmente no pilar ambiental.'
      },
      {
        question: 'Como funciona a certificação com o Grupo BC Energia?',
        answer:
          'O grupo gera energia limpa em usinas fotovoltaicas e hidrelétricas próprias, e os clientes podem acessar certificados I-REC que comprovam a origem da energia elétrica consumida.',
        deepen: { label: 'Conhecer as usinas do grupo', href: '/sobre/nossas-usinas' }
      }
    ]
  },

  '/produtos/arrendamento-de-usinas': {
    title: 'O essencial sobre arrendamento de usinas',
    items: [
      {
        question: 'O que é o arrendamento de usinas?',
        answer:
          'É o modelo em que o Grupo BC Energia arrenda uma usina solar já pronta ou prestes a entrar em operação e assume a parte comercial, enquanto o proprietário mantém a receita do ativo.'
      },
      {
        question: 'Para quem faz sentido?',
        answer:
          'Para proprietários de usinas solares que querem rentabilizar o ativo sem estruturar prospecção, carteira de clientes e gestão comercial por conta própria.'
      },
      {
        question: 'O que fica sob responsabilidade do grupo?',
        answer:
          'A gestão comercial completa: prospecção e gestão dos clientes que consomem a energia gerada pela usina.'
      },
      {
        question: 'Qual é o próximo passo?',
        answer:
          'A avaliação é feita caso a caso, considerando localização, potência e estágio do projeto. O contato inicial serve para entender essas condições antes de qualquer proposta.'
      }
    ]
  }
}

/**
 * Perguntas da FAQ já respondidas no bloco de respostas rápidas da mesma página.
 *
 * Evita repetir a mesma dúvida duas vezes na mesma URL: o topo responde de
 * forma direta e a FAQ segue apenas com o que ainda acrescenta informação.
 */
const COVERED_FAQ: Record<string, string[]> = {
  '/produtos/mercado-livre-de-energia': [
    'O que é o Mercado Livre de Energia?',
    'Quem pode migrar para o Mercado Livre de Energia?'
  ],
  '/produtos/consorcio-bc-energia': [
    'O que é o Consórcio BC Energia?',
    'Quem pode aderir ao Consórcio BC Energia?',
    'Como funciona o Consórcio BC Energia?',
    'Com quem devo falar caso falte energia?'
  ]
}

/** Remove da FAQ o que o bloco de respostas rápidas já respondeu. */
export const withoutCoveredFaq = <T extends { title: string }>(route: string, items: T[]): T[] => {
  const covered = COVERED_FAQ[route]
  if (!covered) return items
  return items.filter((item) => !covered.includes(item.title))
}

/** Perguntas/respostas visíveis do bloco rápido, para uso em FAQPage schema. */
export const quickAnswerSchemaItems = (route: string) =>
  (QUICK_ANSWERS[route]?.items ?? [])
    .filter((item) => typeof item.answer === 'string')
    .map((item) => ({ title: item.question, content: item.answer as string }))
