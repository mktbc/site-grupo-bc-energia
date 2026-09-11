import {
  Hero,
  About,
  Positioning,
  Solutions,
  Stats,
  Segments,
  RegionalPresence,
  Sustainability,
  Content,
  HomeFaq,
  FinalCta,
  PreFooter
} from './Sections'

/**
 * Home — vitrine.
 *
 * Narrativa: hero → vitrine de soluções → como ajudamos → prova de escala →
 * para quem (segmentos) → onde (presença regional) → estrutura própria →
 * conteúdo → dúvidas → institucional → próximo passo.
 * A vitrine aparece logo após o hero para que produtos tenham protagonismo
 * no início da jornada. Cada seção conduz a uma página interna específica.
 */
const Page = () => (
  <div>
    <Hero />

    <Solutions />

    <Positioning />

    <Stats />

    <Segments />

    <RegionalPresence />

    <Sustainability />

    <Content />

    <HomeFaq />

    <About />

    {/* CTA único de fechamento: o convite ao simulador foi consolidado no
        FinalCta, que mantém "Simular minha economia" e o contato direto. */}
    <FinalCta />

    <PreFooter />
  </div>
)

export default Page
