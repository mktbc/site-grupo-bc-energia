import { tv } from 'tailwind-variants'

export const sectionStyles = tv({
  base: 'relative flex flex-col content-center justify-center bg-cover bg-center',
  variants: {
    hScree: {
      true: 'h-auto min-h-screen pt-0 sm:pt-0 md:pt-36 lg:pt-12',
      false: 'py-24'
    },
    first: {
      true: 'pb-20 pt-20 sm:pt-44 md:pt-36 lg:pt-44'
    },
    arrowMask: {
      true: 'py-48'
    }
  }
})
