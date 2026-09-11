import { tv } from 'tailwind-variants'

export const arrowMaskStyles = tv({
  base: 'relative z-10 bg-no-repeat',
  variants: {
    inverted: {
      true: 'absolute left-0 right-0 mx-auto h-[6.25rem] w-[21.875rem]',
      false: '-mt-20 h-28 w-full bg-cover bg-center'
    },
    up: {
      false: 'top-0',
      true: 'bottom-0 rotate-180'
    }
  }
})
