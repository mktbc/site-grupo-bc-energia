export type NumberContext =
  | 'home'
  | 'arrendamento'
  | 'irec'
  | 'consorcio'
  | 'gestao_energia'
  | 'mercado_livre'

export type NumbersProps = {
  children: unknown
  btnText: string
  btnLink: string
  context: NumberContext
  subTitle?: string
  bgImage?: string
  target?: string
}
