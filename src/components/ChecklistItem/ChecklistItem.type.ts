import { type VariantProps } from 'tailwind-variants'

import { checklistItemStyles } from './ChecklistItem.style'

export type ChecklistItemProps = VariantProps<typeof checklistItemStyles> & {
  title: string
  description?: string
  color?: 'teal' | 'amber'
  uppercase?: boolean
}
