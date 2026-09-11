import { Container } from '@/components'
import BCIcon from '@/components/BCIcon/BCIcon'
import Image from '@/components/Image'
import Reveal from '@/components/Reveal/Reveal'
import type { BCIconName } from '@/config/icons'

/**
 * Home — Como ajudamos / Posicionamento.
 *
 * Quatro pilares em cards modulares e mídia institucional. Vem logo após a
 * vitrine de soluções, por isso não repete o link para /produtos nem a
 * métrica "Até 25%" (agora integrada ao Consórcio na vitrine). Cores e tipografia oficiais (Barlow Condensed nos títulos,
 * Onest nos textos), sem gradientes ou elementos fora da marca.
 */
type Pillar = { title: string; text: string; icon: BCIconName }

const PILLARS: Array<Pillar> = [
  {
    title: 'Economia',
    icon: 'economia-na-conta',
    text: 'Redução consistente do custo de energia com estratégias no Mercado Livre e em geração distribuída.'
  },
  {
    title: 'Gestão',
    icon: 'monitoramento-consumo',
    text: 'Contratos, medição e faturamento acompanhados por um time técnico dedicado.'
  },
  {
    title: 'Previsibilidade',
    icon: 'contrato-aprovado',
    text: 'Contratos de longo prazo e acompanhamento do diagnóstico ao suporte, sem surpresas na conta.'
  },
  {
    title: 'Sustentabilidade',
    icon: 'planeta-sustentavel',
    text: 'Energia de fonte renovável, com origem comprovável e impacto positivo na agenda ESG.'
  }
]

const Positioning = () => (
  <section id="home_posicionamento" className="bc-section-transition relative isolate overflow-hidden bg-surface-muted bc-level-mid lg:py-[56px]">
    <Container className="lg:max-w-[1240px]">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-5">
        {/* Bloco editorial */}
        <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:pt-4">
          <p className="t-eyebrow">Como ajudamos</p>
          <h2 className="t-h2-lead mt-3 max-w-[20ch] text-text-primary">
            Energia que transforma consumo em resultado
          </h2>
          <p className="t-body-lg mt-4 max-w-[58ch] text-text-secondary">
            Integramos tecnologia, pessoas e conhecimento para entregar soluções personalizadas,
            sustentáveis e alinhadas às necessidades de cada cliente.
          </p>
        </div>

        {/* Composição fotográfica */}
        <Reveal
          as="figure"
          className="relative m-0 lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1"
        >
          <div className="bc-photo bc-photo-soft h-full rounded-lg shadow-sm">
            <Image
              src="/img/home/como-ajudamos-usina.webp"
              alt="Usina fotovoltaica do Grupo BC Energia em operação"
              width={900}
              height={1200}
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-full min-h-[320px] w-full object-cover lg:min-h-[500px]"
            />
          </div>
        </Reveal>

        {/* Pilares */}
        <ul className="grid list-none grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:row-start-2">
          {PILLARS.map((pillar, index) => (
            <Reveal
              as="li"
              key={pillar.title}
              delay={index * 0.05}
              className={`relative rounded-card border p-5 ${index === 0 ? 'border-bc-primary/25 bg-surface-highlight shadow-energy' : 'border-border-subtle bg-surface-card shadow-xs'}`}
            >
              <span className="block w-fit rounded-full bg-surface-elevated p-2 shadow-sm">
                <BCIcon name={pillar.icon} size={30} />
              </span>
              <h3 className="t-h4-display mt-3 text-text-primary">
                {pillar.title}
              </h3>
              <p className="t-body-sm mt-2 max-w-[34ch] text-text-secondary">{pillar.text}</p>
            </Reveal>
          ))}
        </ul>

      </div>

    </Container>
  </section>
)


export default Positioning
