import { ButtonHTMLAttributes, ReactNode } from 'react'

import { type VariantProps } from 'tailwind-variants'

import { buttonStyles } from './Button.style'

export type ButtonProps = Omit<VariantProps<typeof buttonStyles>, 'disabled' | 'loading'> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    block?: boolean
    loading?: boolean
    children?: ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl'
  }
