import { Container } from '@/components'
import Image from '@/components/Image'
import Link from '@/components/Link'
import { buttonStyles } from '@/components/Button/Button.style'

/**
 * Home — "Quem é a BC".
 *
 * Bloco institucional curto (hub de navegação): apresenta o grupo em poucos
 * segundos e conduz para /sobre e /sobre/quem-somos. Composição editorial
 * texto + imagem, sem cards.
 */
const About = () => (
  <section id="home_institucional" className="bc-section-transition bc-level-mid relative bg-surface lg:py-[48px]">
    <Container className="lg:max-w-[1200px]">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-9">
        <div className="lg:col-span-5">

          <p className="t-eyebrow">Grupo BC Energia</p>
          <h2 className="t-h2-mid mt-3 max-w-[18ch] text-balance text-text-primary">
            Energia para gerar valor, eficiência e crescimento
          </h2>
          <p className="t-body-lg mt-4 max-w-[48ch] text-text-secondary">
            O Grupo BC Energia desenvolve soluções em geração, gestão e comercialização de energia
            para empresas e consumidores que buscam economia, eficiência e sustentabilidade.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Link
              href="/sobre"
              data-cta-name="home_institucional_sobre"
              className={buttonStyles({ variant: 'primary', size: 'md' })}
            >
              Conheça o Grupo BC Energia
            </Link>

            <Link
              href="/sobre/quem-somos"
              data-cta-name="home_institucional_quem_somos"
              className="group inline-flex min-h-[44px] items-center gap-2 t-action-label text-bc-primary underline-offset-[6px] transition-colors duration-200 ease-bc hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              Quem somos
              <span
                aria-hidden="true"
                className="transition-transform duration-200 ease-bc group-hover:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
              >
                →
              </span>
            </Link>
          </div>
        </div>

        <figure className="bc-photo bc-photo-soft relative m-0 overflow-hidden rounded-card lg:col-span-7 lg:col-start-6">
          <Image
            src="/img/pages/FOTO_SOBRE_NOS_01.webp"
            alt="Equipe do Grupo BC Energia em atendimento corporativo"
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[4/5] h-full w-full rounded-card object-cover object-[center_35%] shadow-lg sm:aspect-[4/3] lg:aspect-[4/3] xl:aspect-[16/10] lg:object-[center_32%]"
          />
          <figcaption className="media-panel-sm absolute bottom-4 left-4 max-w-[14rem] transition-transform duration-normal hover:-translate-y-0.5 motion-reduce:transform-none sm:bottom-5 sm:left-5">
            <p className="t-eyebrow text-bc-cyan">Nosso propósito</p>
            <p className="mt-1 font-display text-xl uppercase leading-none">Energia que gera valor</p>
          </figcaption>
        </figure>
      </div>
    </Container>
  </section>
)

export default About
