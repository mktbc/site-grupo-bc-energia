import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Acessibilidade de navegação SPA.
 *
 * Ao trocar de rota, move o foco de forma não invasiva para o <main>
 * (tabIndex={-1}) e anuncia o novo título da página em uma região aria-live,
 * para que usuários de teclado e de leitor de tela percebam a mudança.
 *
 * O foco é aplicado em um timeout curto porque o React remove o elemento
 * clicado (link) no mesmo commit da navegação, o que devolveria o foco ao
 * <body>. Não roda na carga inicial.
 */
const RouteFocus = () => {
  const { pathname } = useLocation()
  const lastPath = useRef(pathname)
  const liveRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // Comparar a rota (e não um flag de "primeiro render") evita disparar o
    // foco na carga inicial, inclusive com o duplo efeito do StrictMode.
    if (lastPath.current === pathname) return
    lastPath.current = pathname

    window.setTimeout(() => {
      const main = document.getElementById('conteudo')
      if (main instanceof HTMLElement) main.focus({ preventScroll: true })
    }, 0)

    // O <title> é atualizado pelo componente Seo logo após a troca de rota.
    window.setTimeout(() => {
      if (liveRef.current) liveRef.current.textContent = document.title
    }, 400)
  }, [pathname])

  return <p ref={liveRef} aria-live="polite" aria-atomic="true" className="sr-only" />
}

export default RouteFocus
