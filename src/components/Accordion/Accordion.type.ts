import { ReactNode } from 'react'

export type AccordionType = {
  title: string
  content: string | ReactNode
  open?: boolean
  variant?: 'default' | 'faq'
}
