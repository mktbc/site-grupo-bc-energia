import { ReactElement, ReactNode } from 'react'

import { FeaturesProps } from '@/components/Features/Features.type'
import { type VariantProps } from 'tailwind-variants'

import { ctaStyles } from './Sections.style'

export type AboutContent = Array<{
  title: string | ReactElement
  description: string | ReactElement
}>

export type AboutProps = {
  content: AboutContent
  features?: Array<FeaturesProps>
  img: string
  children?: ReactNode
  inverter?: boolean
  className?: string
  imgLink?: string
  target?: string
  imgSrcSet?: string
  imgSizes?: string
  imgAlt?: string
}

export type AboutSegmentProps = Omit<AboutProps, 'features'>

export type CtaProps = VariantProps<typeof ctaStyles> & {
  title?: string | ReactElement
  bgImage?: string
  className?: string
  link?: string
  linkText?: string
  children?: ReactElement
}

export type HowItWorksProps = {
  title: string
  description: string
  itens: Array<{
    title: string
    description: string
  }>
  checkItem?: string
  imgUrl: string
}

export type ResourcesProps = {
  title?: string
  subtitle?: string
  description?: string
  items: Array<{
    title: string
    description: string
  }>
  img: string
}
