import { tv } from 'tailwind-variants'

export const ctaStyles = tv({
  base: 'px-6',
  variants: {
    overlay: {
      true: 'before:absolute before:left-0 before:top-0 before:z-0 before:h-full before:w-full'
    },
    overlayColor: {
      light: 'before:bg-teal-600/80',
      dark: 'before:bg-teal-900/80'
    },
    light: {
      true: 'text-teal-900',
      false: 'text-white'
    }
  }
})

export const ctaHeadingStyles = tv({
  base: 'mb-12',
  variants: {
    light: {
      true: 'text-teal-900',
      false: 'text-white'
    }
  }
})

export const aboutStyles = tv({
  base: 'flex px-6 pt-0 text-center lg:text-left'
})

export const aboutWrapStyles = tv({
  base: 'flex gap-20',
  variants: {
    inverter: {
      true: 'flex-col lg:flex-row-reverse',
      false: 'flex-col gap-20 lg:flex-row'
    }
  }
})

export const aboutImageStyles = tv({
  base: 'lg:basis-2/4 2xl:basis-3/6 2xl:pl-0',
  variants: {
    inverter: {
      true: '',
      false: 'lg:pl-10 '
    }
  }
})
