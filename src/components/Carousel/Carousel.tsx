import { useEffect, useState } from 'react'
import { A11y, Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type SwiperClass from 'swiper'

import { CarouselProps } from './Carousel.type'

import '@/styles/carousel.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const Carousel = ({
  slides,
  slidesPerView = 1,
  arrows = false,
  dots = false,
  space = 0,
  autoplay = true,
  autoplayDelay = 2500,
  loop = true,
  ...rest
}: CarouselProps) => {
  // Respeita prefers-reduced-motion: sem troca automática de slides.
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const autoplayEnabled = autoplay && !reducedMotion
  const modules = [A11y]

  if (autoplayEnabled) modules.push(Autoplay)

  if (dots) modules.push(Pagination)

  if (arrows) modules.push(Navigation)

  /**
   * Acessibilidade: slides fora de tela não devem ser alcançáveis por Tab.
   * `inert` desativa interação/foco sem alterar nada visualmente.
   */
  const syncInert = (swiper: SwiperClass) => {
    swiper.slides?.forEach((slide, index) => {
      const inactive = index !== swiper.activeIndex
      if (inactive) slide.setAttribute('inert', '')
      else slide.removeAttribute('inert')
    })
  }

  return (
    <Swiper
      {...rest}
      onAfterInit={syncInert}
      onSlideChangeTransitionEnd={syncInert}
      a11y={{
        enabled: true,
        prevSlideMessage: 'Slide anterior',
        nextSlideMessage: 'Próximo slide',
        firstSlideMessage: 'Este é o primeiro slide',
        lastSlideMessage: 'Este é o último slide',
        paginationBulletMessage: 'Ir para o slide {{index}}',
        slideLabelMessage: 'Slide {{index}} de {{slidesLength}}',
        containerMessage: 'Carrossel de destaques'
      }}
      autoplay={
        autoplayEnabled
          ? {
              delay: autoplayDelay,
              disableOnInteraction: true,
              pauseOnMouseEnter: true
            }
          : false
      }
      loop={loop}
      slidesPerView={slidesPerView}
      spaceBetween={space}
      pagination={dots ? { clickable: true } : false}
      navigation={arrows}
      modules={modules}
      className="mySwiper"
    >
      {slides.map((el, index) => (
        <SwiperSlide key={index}>{el}</SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Carousel
