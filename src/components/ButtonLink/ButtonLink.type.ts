import { AnchorHTMLAttributes, ReactElement } from 'react'

import { type VariantProps } from 'tailwind-variants'

import { buttonStyles } from '../Button/Button.style'

export type ButtonLinkProps = VariantProps<typeof buttonStyles> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
    block?: boolean
    children: string | ReactElement
    href: string
    center?: boolean
    icon?: string
  }
