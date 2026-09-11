import { Container } from '@/components'
import Image from '@/components/Image'
import Link from '@/components/Link'
import Reveal from '@/components/Reveal/Reveal'
import { POWER_PLANTS } from '@/data/powerPlants'

/**
 * Home — Estrutura própria (sustentabilidade + usinas).
 *
 * Composição em bento grid assimétrico: mensagem institucional e imagem
 * principal à esquerda, com as métricas derivadas de `src/data/powerPlants.ts`
 * integradas à direita.
 */
const complexCount = POWER_PLANTS.length
const stateCount = new Set(
  POWER_PLANTS.map((plant) => plant.location.match(/\(([A-Z]{2})\)/)?.[1]).filter(Boolean)
).size


const Sustainability = () => (
  <section id="home_sustentabilidade" className="bc-level-lead bg-surface lg:py-[56px]">
    <Container>
      <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="t-eyebrow">Estrutura própria</p>
            <h2 className="t-h2-lead mt-3 max-w-[22ch] text-balance text-text-primary">
              Energia renovável com estrutura para gerar resultados
            </h2>
            <p className="t-body-lg mt-4 max-w-[52ch] text-text-secondary">
              A energia que comercializamos vem de usinas próprias de fonte renovável. Estrutura,
              operação e certificação I-REC garantem economia com origem limpa e comprovável.
            </p>
          </Reveal>

          <Reveal delay={0.06} className="mt-6 lg:mt-7">
            <div className="bc-photo bc-photo-soft group relative overflow-hidden rounded-card border border-border-subtle bg-surface-muted shadow-sm transition-[transform,box-shadow,border-color] duration-normal ease-bc hover:-translate-y-0.5 hover:border-bc-primary/30 hover:shadow-card motion-reduce:transform-none motion-reduce:transition-none">
              <Image
                src="/img/pages/nossas-usinas2.webp"
                alt="Vista aérea de usina solar fotovoltaica operada pela BC Renováveis"
                width={1600}
                height={900}
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="aspect-[4/3] w-full object-cover object-[center_55%] transition-transform duration-500 ease-bc group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none sm:aspect-[16/10] lg:aspect-[16/10]"
              />
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-bc-dark/35 via-bc-dark/10 to-transparent" />
              <span aria-hidden="true" className="pointer-events-none absolute bottom-5 left-5 h-px w-20 bg-bc-cyan/70 transition-[width,background-color] duration-200 group-hover:w-28 group-hover:bg-bc-primary sm:left-7 lg:bottom-7 lg:left-8" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="relative lg:col-span-5 lg:mt-[6.5rem]">
          <div className="relative flex flex-col gap-6 rounded-card border border-border-subtle bg-surface-card p-6 shadow-sm sm:p-7 lg:gap-6 lg:p-7">
            <div className="border-b border-border-subtle pb-6">
              <p className="t-metric-xl text-bc-dark">{complexCount}</p>
              <p className="t-h4-display mt-2 text-text-primary">Complexos de geração</p>
              <p className="t-body-sm mt-3 max-w-[34ch] text-text-secondary">
                Usinas solares e hidrelétricas próprias no Centro-Oeste e Sudeste.
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-5 sm:gap-7">
              <div className="border-l border-bc-primary/25 pl-4 transition-[transform,border-color] duration-200 ease-bc hover:-translate-y-0.5 hover:border-bc-primary/60 motion-reduce:transform-none motion-reduce:transition-none">
                <dt className="t-metric-md text-bc-dark">{stateCount}</dt>
                <dd className="t-body-sm mt-2 text-text-secondary">Estados com operação</dd>
              </div>
              <div className="border-l border-bc-primary/25 pl-4 transition-[transform,border-color] duration-200 ease-bc hover:-translate-y-0.5 hover:border-bc-primary/60 motion-reduce:transform-none motion-reduce:transition-none">
                <dt className="t-metric-md text-bc-primary">I-REC</dt>
                <dd className="t-body-sm mt-2 text-text-secondary">Origem renovável certificada</dd>
              </div>
            </dl>

            <Link
            href="/sobre/nossas-usinas"
            data-cta-name="home_sustentabilidade_usinas"
            className="group mt-auto inline-flex min-h-[44px] items-center gap-2 border-t border-border-subtle pt-5 t-action-label text-bc-primary underline-offset-[6px] transition-colors duration-200 ease-bc hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            Conhecer nossas usinas
            <span
              aria-hidden="true"
              className="transition-transform duration-200 ease-bc group-hover:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
            >
              →
            </span>
          </Link>
          </div>
        </Reveal>
      </div>
    </Container>
  </section>
)

export default Sustainability
