import { tv } from 'tailwind-variants'

export const headingStyles = tv({
  base: 'w-full uppercase text-teal-900',
  variants: {
    center: {
      true: 'text-center'
    },
    full: {
      true: 'w-full',
      false: 'm-auto lg:w-3/4'
    },
    margin: {
      true: 'mb-6'
    }
  }
})
