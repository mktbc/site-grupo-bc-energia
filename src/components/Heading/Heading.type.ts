import { type VariantProps } from 'tailwind-variants'

import { headingStyles } from './Heading.style'

export type HeadingType = VariantProps<typeof headingStyles> & {
  children: unknown
  subtitle?: string
  className?: string
}
