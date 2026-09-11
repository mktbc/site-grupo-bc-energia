import { FormEvent } from 'react'

import { Button } from '@/components'
import { RenderField } from '@/components/Fields/'

import { fields } from './Form.fields'

type Props = {
  onSubmit: (event: FormEvent) => void
  loading?: boolean
}

const Form = ({ onSubmit, loading }: Props) => (
  <form className="space-y-6" method="GET" onSubmit={(event: FormEvent) => onSubmit(event)}>
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {fields.map((field) => (
          <RenderField key={field.name} {...field} />
        ))}
      </div>
    </>
    <div>
      <Button disabled={loading} block type="submit" size="lg">
        {loading ? 'Enviando...' : 'Enviar'}
      </Button>
    </div>
  </form>
)

export default Form
