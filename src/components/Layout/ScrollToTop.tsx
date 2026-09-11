import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * Rolagem global ao trocar de rota.
 *
 * - Navegação PUSH/REPLACE sem hash → topo da página (`behavior: 'auto'`).
 * - URL com hash → respeita a âncora (rola até o elemento correspondente).
 * - POP (voltar/avançar) → não interfere: o navegador restaura a posição.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType === 'POP') return

    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' })
        return
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash, navigationType])

  return null
}

export default ScrollToTop
