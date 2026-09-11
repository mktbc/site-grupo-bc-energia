import { useEffect, useRef, useState } from 'react'

/**
 * Revelação de conteúdo sem biblioteca de animação.
 *
 * Usa IntersectionObserver (nativo, custo ~0 KB) + transição CSS.
 * - dispara uma única vez e desconecta o observer (nada roda durante o scroll);
 * - em `prefers-reduced-motion` a transição é neutralizada no CSS;
 * - sem suporte a IntersectionObserver, o conteúdo já nasce visível.
 *
 * Substitui o uso de Framer Motion para efeitos simples de opacity/translate
 * (economia de ~40 KB gzip no bundle inicial).
 */
export const useReveal = <T extends HTMLElement = HTMLElement>() => {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, visible, className: visible ? 'bc-reveal is-visible' : 'bc-reveal' }
}

export default useReveal
