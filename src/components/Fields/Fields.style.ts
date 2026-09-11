/**
 * Base única de formulários (Input, Select, Textarea, Upload).
 * Altura base 48px, raio md, foco visível consistente e estados
 * default / hover / focus / filled / disabled / error / success.
 */
const fieldBase = [
  'w-full rounded-md border border-border-default bg-surface px-5 py-3',
  'min-h-[48px] font-sans t-body font-medium text-text-primary',
  'placeholder:text-text-muted',
  'transition-colors duration-fast ease-bc',
  'hover:border-border-strong',
  'focus-visible:outline-none focus-visible:border-bc-primary focus-visible:ring-4 focus-visible:ring-focus focus-visible:ring-offset-2',
  'aria-[invalid=true]:border-error aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-error/40',
  'data-[state=success]:border-success',
  'disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-60'
].join(' ')

export const styles = {
  /** Campo de texto / select / textarea. */
  input: fieldBase,
  textarea: `${fieldBase} min-h-[120px] resize-y`,
  /** Label real — o placeholder nunca substitui o label. */
  label: 't-label mb-1 block text-text-primary',
  /** Texto auxiliar abaixo do campo. */
  description: 'mt-1 t-body-sm text-text-secondary',
  /** Mensagem de erro do campo. */
  error: 'mt-1 t-body-sm font-medium text-error'
}
