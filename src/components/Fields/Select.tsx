import { RequestStatus } from '@/components/Form/Form.type'

import { styles } from './Fields.style'
import { InputProps } from './Fields.type'

const Select = ({ status, label, description, configuration, options, ...rest }: InputProps) => (
  <div style={{ gridColumn: configuration?.columns === 1 ? '1 / -1' : '' }}>
    <label htmlFor={rest.name} className={styles.label}>
      {label || rest.placeholder}
      {rest.required && <span aria-hidden="true"> *</span>}
    </label>
    <select
      id={rest.name}
      name={rest.name}
      required={rest.required || undefined}
      defaultValue=""
      disabled={status === RequestStatus.Pending}
      className={`${styles.input} bg-surface py-[0.63rem]`}
    >

      <option value="" disabled>
        {rest.placeholder}
      </option>
      {options?.map((state) => (
        <option key={state.value} value={state.value}>
          {state.label}
        </option>
      ))}
    </select>
  </div>
)

export default Select
