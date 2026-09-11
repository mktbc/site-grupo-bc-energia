import { Select, Input, InputProps, Checkbox } from './'

const RenderField = ({ ...data }: InputProps) => {
  switch (data.type) {
    case 'select':
      return <Select {...data} />
    case 'checkbox':
      return <Checkbox {...data} />
    default:
      return <Input {...data} />
  }
}

export default RenderField
