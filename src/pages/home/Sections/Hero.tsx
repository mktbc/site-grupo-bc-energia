import { Carousel } from '@/components'

import { Sliders } from '../Sliders'

/**
 * Home — Hero institucional em carrossel (configuração restaurada).
 *
 * Mantém a composição visual aprovada do hero (ver Sliders.wrapper) e devolve o
 * comportamento original do banner: autoplay suave, setas e indicadores
 * discretos (estilizados em `styles/carousel.css` via `#home_slider`).
 * O Swiper roda em modo `rewind` (sem `loop`), evitando slides duplicados no
 * DOM e, portanto, H1 duplicado no prerender.
 */
const Hero = () => (
  <section id="home_slider" className="relative">
    <Carousel arrows dots slides={Sliders} loop={false} rewind autoplayDelay={6000} speed={700} />
  </section>
)

export default Hero
