import { InstitutionalProse, PageHeader } from '@/components'

/**
 * /sobre/fator-de-alavancagem — informação regulatória (noindex, follow).
 * Conteúdo preservado integralmente; apenas o layout foi padronizado.
 */
const LeverageFactor = () => (
  <div className="min-h-screen">
    <PageHeader
      align="left"
      compact
      flush
      eyebrowRule={false}
      eyebrow="Informação regulatória"
      title="Fator de Alavancagem"
      description="Indicador financeiro divulgado conforme os processos de transparência da CCEE."
      bgImage="/img/pages/contact.webp"
      category="Sobre"
    />

    <InstitutionalProse>
      <p>
        A Câmara de Comercialização de Energia Elétrica (CCEE) implantou um novo processo para
        tornar as atividades das empresas de energia mais transparentes no Brasil. Agora, os
        participantes devem calcular um indicador financeiro chamado “fator de alavancagem” para
        entender como gerenciam os riscos das negociações. Esse cálculo busca evidenciar os riscos
        financeiros envolvidos na comercialização de energia e fortalecer a confiança das empresas
        no mercado energético brasileiro. O Grupo BC Energia tem três empresas na CCEE e cada uma
        delas apresenta os seguintes fatores de alavancagem em suas operações:
      </p>

      <ul>
        <li>BC Energia: 0.0%</li>
        <li>Artis Energia: 0%</li>
        <li>Ipe Energia: 0%</li>
      </ul>

      <p className="t-body-sm">Última atualização: 04/12/2023</p>
    </InstitutionalProse>
  </div>
)

export default LeverageFactor
