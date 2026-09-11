import type { SolutionShowcaseProps } from '@/components/SolutionShowcase'
import { COVERAGE_TEXT } from '@/data/coverage'

/**
 * Dados das soluções apresentadas em /produtos.
 *
 * Todo o conteúdo (textos, público, abrangência, vantagens, CTA e destino)
 * vem do conteúdo já existente do site — nada foi criado ou ampliado.
 */

export const mercadoLivreSolution: SolutionShowcaseProps = {
  icon: 'mercado-crescimento',
  eyebrow: 'Solução para empresas',
  title: 'Mercado Livre de Energia',
  headline: 'Mais liberdade e previsibilidade na compra de energia da sua empresa.',
  description:
    'Ao optar pelo Mercado Livre de Energia, sua empresa tem a liberdade de escolher o fornecedor que melhor atende às suas necessidades, permitindo negociações personalizadas de quantidade, período de fornecimento e preço. Essa flexibilidade garante que o contrato se adapte perfeitamente ao seu perfil de consumo.',
  facts: [
    { label: 'Quem pode?', value: 'Consumidores conectados em alta tensão (Grupo A)' },
    { label: 'Onde atendemos?', value: 'Todo o Brasil' }
  ],
  benefits: [
    {
      icon: 'economia-na-conta',
      title: 'Redução dos custos com energia',
      description:
        'As empresas poderão negociar diretamente com os fornecedores, resultando na diminuição dos custos de energia.'
    },
    {
      icon: 'gestao-energia-renovavel',
      title: 'Maior flexibilidade na gestão da energia',
      description:
        'Flexibilidade para escolha de fontes, fornecedores e até modulação do contrato de energia.'
    },
    {
      icon: 'mercado-crescimento',
      title: 'Aumento da competitividade',
      description:
        'A redução dos custos operacionais com energia gera a oportunidade para as empresas se fortalecerem no mercado.'
    },
    {
      icon: 'contrato-aprovado',
      title: 'Previsibilidade orçamentária',
      description:
        'No mercado livre é comprar energia para anos posteriores e, assim, não sofrer com as oscilações do valor da energia.'
    }
  ],
  image: {
    src: '/img/pages/mercado-livre-de-energia-intro.webp',
    srcSet:
      '/img/pages/mercado-livre-de-energia-intro-600.webp 600w, /img/pages/mercado-livre-de-energia-intro.webp 1200w',
    sizes: '(max-width: 1024px) 100vw, 40vw',
    alt: 'Mercado Livre de Energia do Grupo BC Energia',
    href: '#contato'
  },
  cta: {
    label: 'Quero economizar',
    href: 'http://www.appenergia.com.br/Grupo_BC_Energia/',
    target: '_blank'
  }
}

export const consorcioSolution: SolutionShowcaseProps = {
  icon: 'energia-solar',
  eyebrow: 'Geração distribuída',
  title: 'Consórcio BC Energia',
  headline: 'Economize na conta de energia sem instalar placas no seu imóvel.',
  description:
    'O Consórcio BC Energia é a solução de geração distribuída para consumidores conectados em baixa tensão (Grupo B). Você recebe energia das nossas usinas solares e hidrelétricas e passa a ter desconto todos os meses na fatura, sem obra e sem investir em um sistema próprio.',
  supportText:
    'O desconto é obtido pela compensação de créditos: a energia das nossas usinas é injetada na rede de distribuição local, a concessionária nos reembolsa com créditos e nós repassamos esses créditos para a sua conta.',
  highlights: [
    { label: 'Economia', value: 'Até 25%*' },
    { label: 'Modelo', value: 'Sem instalação de placas no imóvel' }
  ],
  disclaimer:
    '*O percentual de economia pode variar conforme a região, a solução contratada e o perfil de consumo.',
  facts: [
    {
      label: 'Quem pode contratar?',
      value: 'Consumidores conectados em baixa tensão (Grupo B), com conta a partir de R$ 250,00'
    },
    {
      label: 'Onde atendemos?',
      value: COVERAGE_TEXT,
      note: 'Não consta a sua região? Estamos em expansão e em breve poderemos chegar até você.'
    }
  ],
  benefits: [
    {
      icon: 'economia-dinheiro',
      title: 'Sem investimento em sistema próprio',
      description:
        'Não é necessário investir em painéis solares: o consorciado recebe a energia gerada pelas nossas usinas.'
    },
    {
      icon: 'contrato-aprovado',
      title: 'Processo simples',
      description:
        'A adesão ao consórcio é feita sem pagamento inicial ou taxa administrativa.'
    },
    {
      icon: 'solar-residencial',
      title: 'Mais comodidade',
      description:
        'Sem preocupação com obras, alterações no imóvel ou manutenção de placas solares.'
    },
    {
      icon: 'planeta-sustentavel',
      title: 'Energia de fonte renovável',
      description:
        'A energia distribuída no consórcio vem das usinas solares e hidrelétricas do Grupo BC Energia.'
    }
  ],
  image: {
    src: '/img/pages/consorcio-solucao.webp',
    srcSet: '/img/pages/consorcio-solucao-600.webp 600w, /img/pages/consorcio-solucao.webp 972w',
    sizes: '(max-width: 1024px) 100vw, 40vw',
    alt: 'Profissional do Grupo BC Energia em usina solar fotovoltaica',
    width: 486,
    height: 815
  },
  cta: {
    label: 'Quero economizar',
    href: 'http://www.appenergia.com.br/Grupo_BC_Energia/',
    target: '_blank',
    note: 'Consulte a disponibilidade e as condições para o seu perfil.'
  }
}
