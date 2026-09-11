import { useEffect, useId, useRef, useState } from 'react'

import Link from '@/components/Link'
import type { NavEntry, NavLink as NavLinkType } from '@/config/navigation'

type NavDropdownProps = {
  entry: NavEntry
  active: boolean
}

const linkTargetProps = (link: { external?: boolean }) =>
  link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

const PanelLink = ({ link, secondary }: { link: NavLinkType; secondary?: boolean }) => (
  <Link
    href={link.href}
    {...linkTargetProps(link)}
    className={`flex min-h-11 items-start gap-3 rounded-md px-3 py-2 transition-colors duration-fast hover:bg-surface-muted focus-visible:bg-surface-muted ${ secondary ? 'text-text-secondary' : 'text-text-primary' }`}
  >
    {link.iconSrc && !secondary ? (
      <img src={link.iconSrc} alt="" aria-hidden="true" width={22} height={22} className="mt-0.5 h-[22px] w-[22px] shrink-0" loading="lazy" decoding="async" />
    ) : null}
    <span className="min-w-0">
      <span className={`block ${secondary ? 't-body-sm' : 't-label'}`}>
        {link.label}
      </span>
      {!secondary && link.description ? (
        <span className="mt-0.5 block t-body-sm text-text-secondary">
          {link.description}
        </span>
      ) : null}
    </span>
  </Link>
)

/**
 * Item de menu com painel (desktop).
 *
 * Abre por hover, clique, foco e teclado (Enter/Espaço/Seta para baixo);
 * fecha com Escape, clique fora e ao sair do item. O rótulo continua sendo
 * um link real para o hub da seção — o botão adjacente controla o painel.
 */
const NavDropdown = ({ entry, active }: NavDropdownProps) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelId = `nav-panel-${useId().replace(/:/g, '')}-${entry.id}`

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false)
      }}
    >
      <div className="flex items-center">
        <Link
          href={entry.href}
          className={`flex min-h-11 items-center rounded-md px-1.5 t-action-label transition-colors duration-fast xl:px-2 ${ active ? 'text-bc-cyan' : 'text-white hover:text-bc-cyan' }`}
          aria-current={active ? 'page' : undefined}
        >
          {entry.label}
        </Link>
        <button
          ref={toggleRef}
          type="button"
          aria-label={`${open ? 'Fechar' : 'Abrir'} submenu de ${entry.label}`}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              setOpen(true)
            }
          }}
          className="flex h-11 w-5 items-center xl:w-6 justify-center rounded-md text-white/80 transition-colors duration-fast hover:text-bc-cyan"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 12 8"
            className={`h-2 w-3 transition-transform duration-fast motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
            fill="none"
          >
            <path d="M1 1.5 6 6.5l5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Ponte invisível: evita fechar o painel ao mover o mouse do item para o painel. */}
      <div
        id={panelId}
        hidden={!open}
        className="absolute left-0 top-full z-40 pt-3"
      >
        <div
          className={`rounded-lg border border-border-subtle bg-surface p-3 shadow-lg ${ entry.columns === 2 ? 'w-[36rem]' : 'w-72' }`}
        >
          <div
            className={
              entry.columns === 2 && (entry.groups?.length ?? 0) > 1 ? 'grid grid-cols-2 gap-x-2' : ''
            }
          >
            {entry.groups?.map((group, index) => (
              <div key={group.label ?? index} className="min-w-0">
                {group.label ? (
                  <p className="px-3 pb-1 pt-2 t-caption font-semibold tracking-[0.14em] text-text-muted">
                    {group.label}
                  </p>
                ) : null}
                <ul
                  className={
                    entry.columns === 2 && (entry.groups?.length ?? 0) === 1
                      ? 'grid grid-cols-2 gap-x-2'
                      : ''
                  }
                >
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <PanelLink link={link} secondary={group.secondary} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {entry.viewAll ? (
            <Link
              href={entry.viewAll.href}
              className="mt-2 flex min-h-11 items-center justify-between rounded-md border-t border-border-subtle px-3 pt-3 t-label text-bc-primary transition-colors duration-fast hover:text-bc-primary-hover"
            >
              {entry.viewAll.label}
              <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default NavDropdown
