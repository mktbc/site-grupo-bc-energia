import { RequestStatus } from '@/components/Form/Form.type'

import { styles } from './Fields.style'
import { InputProps } from './Fields.type'

const Input = ({ status, label, description, configuration, options, ...rest }: InputProps) => (
  <div style={{ gridColumn: configuration?.columns === 1 ? '1 / -1' : '' }}>
    {/* Todo campo tem label acessível — o placeholder nunca substitui o label. */}
    <label htmlFor={rest.name} className={styles.label}>
      {label || rest.placeholder}
      {rest.required && <span aria-hidden="true"> *</span>}
    </label>
    <input
      {...rest}
      id={rest.name}
      aria-describedby={description ? `${rest.name}-description` : undefined}
      disabled={status === RequestStatus.Pending}
      className={styles.input}
      placeholder={rest.placeholder}
      required={rest.required || undefined}
    />
    {description && (
      <p id={`${rest.name}-description`} className={styles.description}>
        {description}
      </p>
    )}

  </div>
)

export default Input
