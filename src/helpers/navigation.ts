import { useLocation } from 'react-router-dom'

/**
 * Substituto (shim) de `usePathname` do `next/navigation`, usando react-router.
 * Retorna o pathname atual (ex.: "/produtos/certificacao-renovavel-irec").
 */
export const usePathname = (): string => useLocation().pathname
