import { useEffect, useState } from 'react'

/**
 * Estado de scroll do Header com throttle por requestAnimationFrame
 * (mantido da etapa PERFORMANCE 05 — um listener passivo, sem re-render por pixel).
 */
export const useScrolled = (threshold = 24): boolean => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold)
        ticking = false
      })
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}
