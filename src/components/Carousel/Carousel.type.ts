import { ReactElement } from 'react'

import { SwiperProps } from 'swiper/react'

export type CarouselProps = SwiperProps & {
  slides: Array<ReactElement>
  slidesPerView?: number
  arrows?: boolean
  dots?: boolean
  space?: number
  autoplay?: boolean
  autoplayDelay?: number
  loop?: boolean

}
