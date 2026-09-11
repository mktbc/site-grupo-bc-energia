import React from 'react'

import { slidersData } from './Sliders.data'
import SlidersWrapper from './Sliders.wrapper'

export const Sliders: Array<React.ReactElement> = slidersData.map((slider) => (
  <SlidersWrapper key={slider.id} {...slider} />
))
