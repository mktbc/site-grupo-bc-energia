import { PageHeader, ProductSection, ProductSteps, SectionHeader } from '@/components'
import { FormEmbed } from '@/components/FormEmbed'
import Simulator from '@/components/Simulator/Simulator'
import { COMPANY_METRICS } from '@/data/companyMetrics'
import { useLeadFormView } from '@/lib/analytics'
import { useSearchParams } from 'react-router-dom'

/**
 * /simulador-de-economia — SIMULADOR 01.
 *
 * Página de estimativa e captação de lead. O resultado do simulador é sempre
 * apresentado como estimativa ("até X%"), nunca como economia garantida.
 *
 * Rota noindex,follow nesta etapa: fora de INDEXABLE_ROUTES e fora do sitemap
 * (ver src/config/routes.ts). A indexação será decidida após QA e validação
 * comercial.
 */

const STEPS = [
  {
    title: 'Faça a simulação',
    description:
      'Selecione o estado da sua unidade consumidora e informe o valor médio da conta para ver uma estimativa de economia mensal.'
  },
  {
    title: 'Envie sua conta',
    description:
      'Preencha o formulário com seus dados de contato para que a nossa equipe possa avaliar a sua fatura.'
  },
  {
    title: 'Receba uma análise personalizada',
    description:
      'Um consultor do Grupo BC Energia verifica as condições realmente disponíveis para a sua unidade consumidora.'
  }
]

/** Somente duas métricas institucionais, lidas da fonte única. */
const TRUST_METRICS = COMPANY_METRICS.filter((metric) =>
  ['clientes', 'economia'].includes(metric.id)
)

const SimuladorDeEconomia = () => {
  // lead_form_view: dispara uma vez quando o bloco do formulário entra em tela.
  const formRef = useLeadFormView('simulador')
  // Valor pré-preenchido pela prévia do simulador na Home (?conta=).
  const [searchParams] = useSearchParams()
  const contaParam = Number(searchParams.get('conta'))

  return (
  <div className="min-h-screen">
    <PageHeader
      align="left"
      variant="banner"
      compact
      bgImage="/img/pages/simulador-hero.webp"
      bgPosition="bg-[position:72%_center] lg:bg-[position:center_right]"
      eyebrow="Simulador de economia"
      title="Descubra quanto sua conta de energia pode economizar"
      description="Selecione seu estado e informe o valor médio da conta para visualizar uma estimativa de economia."
      category="Simulador de economia"
    />


    <ProductSection
      id="simulador"
      graphic={{ variant: 'radial', tone: 'teal', size: 'small', position: 'bottom-right', opacity: 0.04 }}
    >
      <Simulator initialValue={contaParam > 0 ? contaParam : undefined} />
    </ProductSection>

    <ProductSteps
      tone="muted"
      id="como-funciona"
      eyebrow="Como a simulação funciona"
      title="Da estimativa à análise real"
      description="A simulação usa percentuais de referência por estado. A condição efetiva depende da análise da sua fatura."
      steps={STEPS}
    />

    {/* Lado a lado no desktop: o cabeçalho centralizado empilhado sobre o
        formulário somava ~220px a uma seção cuja altura real vem do embed
        (~956px). Abaixo de lg, empilha como antes. */}
    <ProductSection id="lead-form">
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <SectionHeader
            eyebrow="Análise personalizada"
            title="Agora envie sua conta para uma análise real"
            description="A simulação é apenas uma estimativa. Nossa equipe analisa sua fatura para verificar as condições disponíveis para sua unidade consumidora."
          />
        </div>
        <div ref={formRef} className="w-full lg:col-span-7">
          <FormEmbed variant="bare" id="formulario-simulador" />
        </div>
      </div>
    </ProductSection>

    <ProductSection tone="muted" id="confianca">
      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-9">
        {TRUST_METRICS.map((metric) => (
          <li key={metric.id} className="pt-1">
            <p className="t-metric-lg text-bc-primary">
              {metric.value}
            </p>
            <p className="mt-3 max-w-[34ch] t-body-sm text-text-secondary">
              {metric.label}
            </p>
          </li>
        ))}
      </ul>
    </ProductSection>
    </div>
  )
}

export default SimuladorDeEconomia
