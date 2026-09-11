import { FC } from 'react'

import { Container } from '@/components/Container'
import Image from '@/components/Image'
import Link from '@/components/Link'
import { socialLinks } from '@/components/Layout/Footer/Footer.data'
import { HEADER_CLIENT_LINK } from '@/config/navigation'
import type { NavLink } from '@/config/navigation'

import { FOOTER_GROUPS, FOOTER_GROUPS_MOBILE, FOOTER_LEGAL_LINKS } from './Footer.nav'
import type { FooterGroup } from './Footer.nav'

/**
 * Rodapé institucional — navegação secundária.
 *
 * Desktop: bloco institucional à esquerda + 5 colunas de navegação
 * (Soluções, Segmentos, Empresa, Conteúdo, Conversão).
 * Mobile: accordions acessíveis (<details>), com Conversão em primeiro lugar.
 * Divisórias reduzidas ao mínimo: apenas antes da faixa legal.
 */

/** Endereços reais já publicados no site (nenhum dado novo foi criado). */
const addresses = [
  {
    label: 'Goiânia (GO)',
    value:
      'Av. Dep. Jamel Cecílio, c/ rua 56, nº 2929, Salas 2802/2803, Ed. Brookfield Towers Torre B, Jardim Goiás, Goiânia (GO), 74810-240'
  },
  {
    label: 'São Paulo (SP)',
    value:
      'Av. Pres. Juscelino Kubitschek, 360, 7º andar cj 71, Edifício JK 360, Vila Nova Conceição, São Paulo (SP), 04543-000'
  }
]

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bc-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark'

const groupTitleClass =
  'font-onest text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-white/55'

const linkBase =
  // 44px de área de toque; a lista não tem gap, então o ritmo visual é o
  // mesmo de antes (40px + 4px de gap).
  `group inline-flex min-h-[44px] items-center gap-2 rounded-sm t-body-sm transition-colors duration-200 ${focusRing} motion-reduce:transition-none`

const linkClass = `${linkBase} text-white/78 hover:text-teal-400`
const linkEmphasisClass = `${linkBase} font-medium text-white hover:text-bc-cyan`

const WhatsAppIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
    className="shrink-0"
  >
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.53 3.75 1.45 5.31L2 22l4.98-1.6a9.8 9.8 0 0 0 5.06 1.4h.01c5.43 0 9.84-4.4 9.84-9.84S17.47 2 12.04 2Zm0 17.96h-.01a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.06.98.99-2.98-.19-.31a8.09 8.09 0 0 1-1.24-4.3c0-4.5 3.66-8.16 8.17-8.16 2.18 0 4.23.85 5.77 2.4a8.1 8.1 0 0 1 2.39 5.77c0 4.5-3.67 8.16-8.17 8.16Zm4.48-6.11c-.25-.13-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.77.97-.14.16-.28.18-.53.06-.24-.13-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.55-1.33-.76-1.82-.2-.47-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3c-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.73 2.64 4.19 3.7.59.26 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.45-.59 1.66-1.17.2-.57.2-1.06.14-1.16-.06-.1-.22-.17-.47-.29Z" />
  </svg>
)

const PinIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mt-[3px] shrink-0"
  >
    <path d="M12 21s-6.5-5.4-6.5-10a6.5 6.5 0 1 1 13 0c0 4.6-6.5 10-6.5 10Z" />
    <circle cx="12" cy="11" r="2.3" />
  </svg>
)

const FooterLink: FC<{ link: NavLink; emphasis?: boolean }> = ({ link, emphasis }) => (
  <Link
    href={link.href}
    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    className={emphasis ? linkEmphasisClass : linkClass}
  >
    <span>{link.label}</span>
    <span
      aria-hidden="true"
      className="translate-x-0 text-teal-400 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 motion-reduce:transform-none motion-reduce:transition-none"
    >
      →
    </span>
  </Link>
)

const FooterLinkList: FC<{ group: FooterGroup }> = ({ group }) => (
  <ul className="flex flex-col">
    {group.links.map((link) => (
      <li key={link.href}>
        <FooterLink link={link} emphasis={group.emphasis} />
      </li>
    ))}
  </ul>
)

const Footer: FC = () => (
  <footer className="relative isolate mt-auto overflow-hidden bg-surface-dark text-text-inverse">
    {/* Elemento oficial de apoio — ELEMENTO 04 (radial), baixa opacidade */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[8.5rem] right-[8%] -z-10 hidden h-[300px] w-[300px] bg-[url('/img/brand/bc-elemento-04-light.svg')] bg-contain bg-center bg-no-repeat opacity-[0.05] md:block lg:bottom-[9.5rem] lg:right-[10%] lg:h-[420px] lg:w-[420px] lg:opacity-[0.06]"
    />

    <Container className="py-12 lg:py-16">
      <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12 lg:gap-x-10">
        {/* Marca */}
        <div className="lg:col-span-4">
          <img
            src="/logo-bc-energia.svg"
            alt="Grupo BC Energia"
            width={211}
            height={37}
            className="h-11 w-auto lg:h-12"
          />

          <p className="mt-6 max-w-[30ch] font-display text-2xl font-bold uppercase leading-[1.1] tracking-tight text-bc-yellow lg:text-[1.75rem]">
            Geramos valor com a nossa energia.
          </p>

          <Link
            href={HEADER_CLIENT_LINK.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com o Grupo BC Energia pelo WhatsApp (abre em nova aba)"
            className={`mt-6 inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-4 t-body-sm font-medium text-white/90 transition-colors duration-200 hover:border-bc-cyan/40 hover:bg-bc-cyan/10 hover:text-white ${focusRing} motion-reduce:transition-none`}
          >
            <WhatsAppIcon />
            WhatsApp oficial
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {addresses.map((address) => (
              <div key={address.label}>
                <p className="t-body-sm font-semibold tracking-tight text-white">{address.label}</p>
                <p className="mt-1.5 flex max-w-[40ch] gap-2 t-body-sm leading-[1.7] text-white/60">
                  <PinIcon />
                  <span>{address.value}</span>
                </p>
              </div>
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {socialLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.name} do Grupo BC Energia (abre em nova aba)`}
                  className={`flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.05] transition-colors duration-200 hover:bg-bc-cyan/15 ${focusRing} motion-reduce:transition-none`}
                >
                  <Image src={item.icon} alt="" width={18} height={18} className="opacity-75" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navegação — desktop */}
        <div className="hidden lg:col-span-8 lg:grid lg:grid-cols-5 lg:gap-x-6">
          {FOOTER_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className={groupTitleClass}>{group.title}</h2>
              <div className="mt-4">
                <FooterLinkList group={group} />
              </div>
            </nav>
          ))}
        </div>

        {/* Navegação — mobile/tablet (accordion acessível) */}
        <div className="lg:hidden">
          {FOOTER_GROUPS_MOBILE.map((group) => (
            <details key={group.title} className="group/acc border-b border-white/[0.08]">
              <summary
                className={`flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-4 py-3 ${groupTitleClass} ${focusRing}`}
              >
                {group.title}
                <span
                  aria-hidden="true"
                  className="text-base text-white/50 transition-transform duration-200 group-open/acc:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <div className="pb-4">
                <FooterLinkList group={group} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </Container>

    {/* Faixa legal */}
    <div className="border-t border-white/[0.08]">
      <Container className="pb-28 pt-5 md:pb-6">
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
          <p className="t-body-sm text-white/50">
            © {new Date().getFullYear()} Grupo BC Energia. Todos os direitos reservados.
          </p>

          <nav aria-label="Regulatório e legal">
            <ul className="flex flex-wrap items-center gap-x-5 md:justify-end">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`inline-flex min-h-[44px] items-center rounded-sm t-body-sm text-white/55 transition-colors duration-200 hover:text-white ${focusRing} motion-reduce:transition-none`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  </footer>
)

export default Footer
