import { Container } from '@/components'
import BrandGraphic from '@/components/BrandGraphic/BrandGraphic'
import Link from '@/components/Link'
import Reveal from '@/components/Reveal/Reveal'
import { buttonStyles } from '@/components/Button/Button.style'

/**
 * Home — Ponte para o simulador.
 *
 * Chamada curta entre conteúdo e conversão. O simulador completo permanece em
 * /simulador-de-economia; aqui existe apenas o convite.
 */
const SimulatorBridge = () => (
  <section
    id="home_simulador"
    className="bc-level-support relative isolate overflow-hidden bg-surface-soft lg:py-[48px]"
  >
    <BrandGraphic
      variant="chevrons"
      tone="teal"
      size="medium"
      position="bottom-right"
      opacity={0.05}
      className="-z-10"
    />

    <Container className="relative">
      <Reveal>
        <div className="relative grid grid-cols-1 items-center gap-6 overflow-hidden rounded-card border border-border-highlight bg-surface-elevated px-6 py-6 shadow-sm lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-7">
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-bc-primary to-bc-cyan" />
          <span aria-hidden="true" className="pointer-events-none absolute right-8 top-0 hidden h-px w-24 bg-bc-primary/35 lg:block" />

          <div className="relative lg:col-span-8">
            <p className="t-eyebrow text-bc-primary">Simulador de economia</p>
            <h2 className="t-h2-support mt-2.5 max-w-[24ch] text-balance text-text-primary">
              Descubra quanto sua energia pode gerar de economia
            </h2>
            <p className="t-body-lg mt-4 max-w-[52ch] text-text-secondary">
              Em poucos passos, você tem uma estimativa do potencial de economia da sua conta e o
              caminho mais adequado ao seu perfil de consumo.
            </p>
          </div>

          <div className="relative lg:col-span-4 lg:justify-self-end">
            <Link
              href="/simulador-de-economia"
              data-cta-name="home_simulador"
              className={`${buttonStyles({ variant: 'primary', size: 'lg' })} shadow-sm transition-[transform,box-shadow] duration-fast ease-bc hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none`}
            >
              Simular minha economia
            </Link>
          </div>
        </div>
      </Reveal>
    </Container>
  </section>
)

export default SimulatorBridge
