import { FormEmbed, PageHeader, ProductSection, SectionHeader } from '@/components'
import Link from '@/components/Link'
import { HEADER_CLIENT_LINK } from '@/config/navigation'

/**
 * /contato — FRONT-END 14.
 *
 * Página objetiva de conversão: cabeçalho, introdução curta, formulário
 * (embed do simulador, preservado sem alteração de lógica), expectativa de
 * atendimento e canais reais já publicados no site.
 *
 * Nenhum dado de contato novo foi criado: WhatsApp vem de
 * `HEADER_CLIENT_LINK` (mesma fonte do header/footer) e os endereços são os
 * mesmos já publicados no rodapé.
 *
 * Hero: gestao-de-energia-hero.webp (1920×705, especialistas analisando um
 * documento — a promessa da página). contact.webp tem 897×750 e é uma vista
 * aérea de usina, sem relação com atendimento.
 */

/** Endereços institucionais — idênticos aos do rodapé (fonte já publicada). */
const OFFICES = [
  {
    label: 'Goiânia (GO)',
    lines: [
      'Av. Dep. Jamel Cecílio, c/ rua 56, nº 2929',
      'Salas 2802/2803, Ed. Brookfield Towers Torre B',
      'Jardim Goiás, Goiânia (GO), 74810-240'
    ]
  },
  {
    label: 'São Paulo (SP)',
    lines: [
      'Av. Pres. Juscelino Kubitschek, 360, 7º andar cj 71',
      'Edifício JK 360, Vila Nova Conceição',
      'São Paulo (SP), 04543-000'
    ]
  }
]

const NEXT_STEPS = [
  {
    title: 'Você envia seus dados',
    description:
      'Informe o perfil de consumo e a melhor forma de contato. Leva poucos minutos e não gera compromisso.'
  },
  {
    title: 'Nossa equipe analisa',
    description:
      'Avaliamos consumo, distribuidora e situação atual para entender quais soluções fazem sentido.'
  },
  {
    title: 'Um especialista entra em contato',
    description:
      'Você recebe o retorno de um consultor do Grupo BC Energia pelo canal que informou.'
  }
]

const TRUST_POINTS = [
  'Atendimento para empresas, condomínios, produtores rurais e residências.',
  'Análise realizada por especialistas em mercado de energia.',
  'Retorno pelo canal de contato informado.'
]


const CheckMark = () => (
  <span
    aria-hidden="true"
    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bc-primary/10 text-bc-primary"
  >
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10.5 8 14.5 16 6" />
    </svg>
  </span>
)

const Contato = () => (
  <div className="min-h-screen">
    <PageHeader
      align="left"
      compact
      flush
      eyebrowRule={false}
      eyebrow="Fale com a BC Energia"
      title="Contato"
      description="Envie seus dados e nossa equipe analisa o melhor caminho de energia para a sua operação."
      bgImage="/img/pages/gestao-de-energia-hero.webp"
      category="Contato"
    />

    <ProductSection id="formulario" tone="muted">
      <div className="grid grid-cols-1 gap-9 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="Análise personalizada"
            title="Solicite uma análise do seu consumo"
            description="Preencha os dados da sua unidade consumidora. Quanto mais preciso for o perfil informado, mais objetiva será a análise da nossa equipe."
          />

          <ul className="mt-8 flex flex-col gap-5">
            {TRUST_POINTS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckMark />
                <span className="t-body-sm text-text-secondary">{item}</span>
              </li>
            ))}
          </ul>

          <div className="bc-card mt-7 flex items-start gap-4 p-5">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bc-primary/10 text-bc-primary"
            >
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </span>
            <div>
              <p className="t-body-sm font-semibold text-text-primary">
                Suas informações estão seguras
              </p>
              <p className="mt-1 t-body-sm leading-[1.7] text-text-secondary">
                Utilizamos seus dados apenas para contato e análise.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <FormEmbed variant="bare" id="contato" />
        </div>
      </div>
    </ProductSection>
    <ProductSection
      tone="surface"
      id="proximos-passos"
      graphic={{ variant: 'chevrons', tone: 'teal', size: 'small', position: 'top-right', opacity: 0.04 }}
    >
      <SectionHeader
        eyebrow="Próximo passo"
        title="O que acontece depois do envio"
        description="O atendimento é conduzido por pessoas, com análise real da sua necessidade e retorno pelo canal informado."
      />

      <ol className="relative mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        {NEXT_STEPS.map((step, index) => (
          <li key={step.title} className="bc-card relative flex flex-col">
            <span
              aria-hidden="true"
              className="font-display text-[1.125rem] font-bold leading-[1.35] tabular-nums text-bc-primary"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="t-h4 mt-2 text-text-primary">{step.title}</h3>


            <p className="mt-2 t-body-sm text-text-secondary">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </ProductSection>

    <ProductSection tone="muted" id="canais">
      <SectionHeader
        eyebrow="Canais de atendimento"
        title="Se preferir, fale direto com a nossa equipe"
        description="Além do formulário, você também pode falar com o time comercial pelo WhatsApp oficial ou nos nossos escritórios."
      />
      <p className="mt-4 t-body-sm text-text-muted">
        Você escolhe a forma de contato mais conveniente.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div className="bc-card flex flex-col bg-surface-highlight md:col-span-2 lg:col-span-1">
          <p className="t-eyebrow">WhatsApp</p>
          <h3 className="t-h4 mt-2 text-text-primary">Atendimento oficial</h3>
          <p className="mt-2 t-body-sm text-text-secondary">
            Canal direto com a equipe comercial do Grupo BC Energia.
          </p>
          <Link
            href={HEADER_CLIENT_LINK.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com o Grupo BC Energia pelo WhatsApp (abre em nova aba)"
            data-cta-name="whatsapp_contato"
            className="mt-auto inline-flex min-h-[44px] w-fit items-center gap-2 self-start rounded-md border-b-2 border-bc-primary/30 pt-4 t-action-label text-bc-primary transition-colors duration-200 hover:border-bc-primary hover:text-bc-primary-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus focus-visible:ring-offset-2"
          >
            {HEADER_CLIENT_LINK.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {OFFICES.map((office) => (
          <address
            key={office.label}
            className="bc-card flex flex-col not-italic"
          >
            <p className="t-eyebrow">Escritório</p>
            <h3 className="t-h4 mt-2 text-text-primary">{office.label}</h3>
            <ul className="mt-3 flex flex-col gap-1">
              {office.lines.map((line) => (
                <li key={line} className="t-body-sm text-text-secondary">
                  {line}
                </li>
              ))}
            </ul>
          </address>
        ))}
      </div>
    </ProductSection>

  </div>
)

export default Contato
