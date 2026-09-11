import { Fields } from '@/components/Fields/Fields.type'

const defaultKeys = {
  required: true,
  configuration: {
    columns: 2
  }
}

export const fields: Array<Fields> = [
  {
    name: 'name',
    placeholder: 'Nome',
    required: true,
    configuration: {
      columns: 2
    }
  },
  {
    name: 'email',
    placeholder: 'E-mail',
    type: 'email',
    ...defaultKeys
  },
  {
    name: 'phone',
    placeholder: 'Telefone',
    ...defaultKeys
  },
  {
    name: 'enterprise',
    placeholder: 'Empresa',
    ...defaultKeys
  },
  {
    name: 'segment',
    placeholder: 'Segmento',
    ...defaultKeys
  },
  {
    name: 'state',
    placeholder: 'Estado',
    ...defaultKeys
  },
  {
    name: 'city',
    placeholder: 'Cidade',
    ...defaultKeys
  },
  {
    name: 'valueOfTheLastEnergyBill',
    placeholder: 'Valor da última fatura de energia',
    ...defaultKeys,
    options: [
      { value: 'Abaixo de R$300,00', label: 'Abaixo de R$300,00' },
      { value: 'Entre R$300,00 a R$1.000,00', label: 'Entre R$300,00 a R$1.000,00' },
      { value: 'Entre R$1.000,00 a a R$5.000,00', label: 'Entre R$1.000,00 a a R$5.000,00' },
      { value: 'Entre R$5.000,00 a R$10.000,00', label: 'Entre R$5.000,00 a R$10.000,00' },
      { value: 'Entre R$10.000,00 a R$30.000,00', label: 'Entre R$10.000,00 a R$30.000,00' },
      { value: 'Acima de R$30.000,00', label: 'Acima de R$30.000,00' }
    ]
  }
]
