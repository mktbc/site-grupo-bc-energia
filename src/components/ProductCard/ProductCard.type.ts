import { ReactElement } from 'react'

export type ProductCardProps = {
  id: string
  img: string
  icon?: string
  iconSize?: [number, number]
  title: string
  description: string | ReactElement
  btnText?: string
  url?: string
  target?: string
}
