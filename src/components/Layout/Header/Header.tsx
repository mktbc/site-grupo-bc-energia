import React from 'react'

import { Navbar } from '@/components'

/**
 * Header global — fixo no topo, sobrepondo o Hero (comportamento preservado),
 * com camada z-50 consistente (dropdown/drawer abaixo, Modal acima).
 */
const Header: React.FC = () => (
  <header className="fixed inset-x-0 top-0 z-50">
    <Navbar />
  </header>
)

export default Header
