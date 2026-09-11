import { arrowMaskStyles } from '@/components/ArrowMask/ArrowMask.style'
import { ArrowMaskPros } from '@/components/ArrowMask/ArrowMask.type'

const ArrowMask = ({ inverted, up, small, className }: ArrowMaskPros) => {
  const img = inverted
    ? '/img/global/section-arrow-down-inverted-white.svg'
    : '/img/global/section-arrow-down-white.svg'

  const imgSmall = '/img/global/mask-small-down-white.svg'
  return (
    <div
      style={{ backgroundImage: `url(${small ? imgSmall : img})` }}
      className={`${arrowMaskStyles({ inverted, up })} ${className ?? ''}`}
    />
  )
}

export default ArrowMask
