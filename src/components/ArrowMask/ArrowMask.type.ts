import { VariantProps } from 'tailwind-variants'

import { arrowMaskStyles } from './ArrowMask.style'

export type ArrowMaskPros = VariantProps<typeof arrowMaskStyles> & {
  small?: boolean
  className?: string
}
