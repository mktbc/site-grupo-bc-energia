import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { ButtonLink } from '@/components/ButtonLink'
import Container from '@/components/Container/Container'
import Link from '@/components/Link'
import {
  HEADER_CLIENT_LINK,
  HEADER_CTA,
  MAIN_NAV,
  isNavEntryActive
} from '@/config/navigation'

import MobileMenu from './MobileMenu'
import NavDropdown from './NavDropdown'
import { useScrolled } from './useScrolled'

/**
 * Navegação principal do site (desktop + mobile), derivada de
 * `src/config/navigation.ts` — nenhuma lista de links duplicada.
 */
const Navbar = () => {
  const scrolled = useScrolled(24)
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setOpen(false), [pathname])

  return (
    <div
      className={`transition-colors duration-normal ease-bc ${ scrolled || open ? 'bg-bc-dark/95 backdrop-blur-sm' : 'bg-transparent' }`}
    >
      <Container className="flex items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Página inicial do Grupo BC Energia"
          className={`flex shrink-0 items-center transition-all duration-normal ease-bc ${ scrolled ? 'h-16' : 'h-16 lg:h-20' }`}
        >
          <img
            src="/logo-bc-energia.svg"
            alt="Grupo BC Energia"
            width={211}
            height={37}
            className="h-[26px] w-auto lg:h-[30px]"
          />
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden flex-1 items-center justify-center lg:flex xl:gap-1"
        >
          {MAIN_NAV.map((entry) => {
            const active = isNavEntryActive(entry, pathname)

            return entry.groups?.length ? (
              <NavDropdown key={entry.id} entry={entry} active={active} />
            ) : (
              <Link
                key={entry.id}
                href={entry.href}
                aria-label={entry.label}
                aria-current={active ? 'page' : undefined}
                className={`flex min-h-11 items-center whitespace-nowrap rounded-md px-1.5 t-action-label transition-colors duration-fast xl:px-2 ${ active ? 'text-bc-cyan' : 'text-white hover:text-bc-cyan' }`}
              >
                {entry.labelShort ? (
                  <>
                    <span className="xl:hidden">{entry.labelShort}</span>
                    <span className="hidden xl:inline">{entry.label}</span>
                  </>
                ) : (
                  entry.label
                )}
              </Link>
            )
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <a
            href={HEADER_CLIENT_LINK.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden whitespace-nowrap t-label text-white/80 xl:inline-flex underline-offset-4 transition-colors duration-fast hover:text-white hover:underline"
          >
            {HEADER_CLIENT_LINK.label}
          </a>
          <ButtonLink href={HEADER_CTA.href} variant="primary" size="md" className="whitespace-nowrap px-3 xl:px-4">
            {HEADER_CTA.label}
          </ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-md text-white lg:hidden"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            {open ? (
              <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </Container>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        pathname={pathname}
        returnFocusRef={toggleRef}
      />
    </div>
  )
}

export default Navbar
