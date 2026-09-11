import { Children } from '@/types'
import { type VariantProps } from 'tailwind-variants'

import { sectionStyles } from './Section.style'

export type SectionProps = Children &
  VariantProps<typeof sectionStyles> & {
    id?: string
    bgImage?: string
    className?: string
    first?: boolean
    as?: string
    arrowMask?: boolean
    [x: string]: unknown
  }
