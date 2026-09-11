export type NavbarSubItems = NavbarItems & {
  icon?: {
    url: string
    size: number[]
  }
}

export type NavbarItems = {
  id: string
  title: string
  description?: string
  url: string
  target?: string
  size?: 'lg' | undefined
  border?: boolean
  column?: 2 | undefined
  isMenuOpen?: boolean
  active?: boolean
  subItems?: Array<NavbarSubItems>
  onSubMenuOpen?: (open: boolean) => void
}
