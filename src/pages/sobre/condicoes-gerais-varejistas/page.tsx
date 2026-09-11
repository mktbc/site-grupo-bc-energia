import { InstitutionalProse, PageHeader } from '@/components'

/**
 * /sobre/condicoes-gerais-varejistas — informação regulatória (noindex, follow).
 * Texto legal preservado integralmente; apenas hierarquia e leitura foram ajustadas.
 */
const RetailConditions = () => (
  <div className="min-h-screen">
    <PageHeader
      align="left"
      compact
      flush
      eyebrowRule={false}
      eyebrow="Informação regulatória"
      title="Condições Gerais da"
      titleLine2="Comercialização Varejista"
      description="Informações publicadas em conformidade com a REN ANEEL 1110/2024."
      bgImage="/img/global/energia-por-assinatura.webp"
      category="Sobre"
    />

    <InstitutionalProse>
      <h2>Energia livre com transparência</h2>

      <p>
        O <strong>Grupo BC Energia</strong> valoriza a transparência em todos os seus processos
        comerciais. Como agente varejista, disponibiliza informações detalhadas em conformidade com
        a REN ANEEL 1110/2024, que estabelece as regras de comercialização de energia elétrica
        aplicáveis ao Sistema de Contabilização e Liquidação (SCL) e aos Procedimentos de
        Comercialização de Energia Elétrica.
      </p>

      <p>
        Disponibilizamos um{' '}
        <a href="/docs/modelo-contrato-varejista.pdf" target="_blank" rel="noopener noreferrer">
          Modelo de Referência: Contrato Varejista
        </a>
        , que contempla, entre outras variáveis, os períodos de suprimento, os submercados de
        atuação, o tipo de energia comercializada e as condições gerais do{' '}
        <strong>Grupo BC Energia</strong>, além dos{' '}
        <a href="/docs/nota-explicativa-prc.pdf" target="_blank" rel="noopener noreferrer">
          Preços de Referência Comparáveis (PRC)
        </a>
        .
      </p>
    </InstitutionalProse>
  </div>
)

export default RetailConditions
