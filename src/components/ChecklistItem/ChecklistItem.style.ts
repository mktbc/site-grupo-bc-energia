import { tv } from 'tailwind-variants'

export const checklistItemStyles = tv({
  base: 'mb-6 flex gap-4',
  variants: {
    align: {
      start: 'items-start',
      center: 'items-center'
    },
    box: {
      true: 'rounded-lg bg-teal-200/50 px-6 py-4'
    }
  }
})

export const checklistItemIconStyles = tv({
  base: 'px-3 py-1 text-center t-h3 font-bold',
  variants: {
    box: {
      true: 'mt-1 text-white',
      false: 'bg-yellow-500 '
    },
    color: {
      teal: 'bg-teal-500 text-white',
      amber: 'bg-amber-400'
    }
  }
})

export const checklistItemTitleStyles = tv({
  base: 'text-teal-900',
  variants: {
    box: {
      true: 't-h4 font-semibold',
      false: 't-h4-display'
    },
    uppercase: {
      true: 'uppercase'
    }
  }
})
