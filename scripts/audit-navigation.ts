/**
 * AUDITORIA DE NAVEGAÇÃO — FRONT-END 02
 *
 * Valida a navegação principal (Header) sem depender de browser:
 *  - todos os destinos internos existem no router (INDEXABLE + NOINDEX);
 *  - links externos usam target/rel corretos;
 *  - existe apenas uma fonte de navegação (config/navigation.ts);
 *  - Header/nav semânticos, logo com href "/" e nome acessível;
 *  - dropdowns com aria-expanded/aria-controls;
 *  - alvos de toque >= 44px (min-h-11 / h-11 / min-h-[NNpx]).
 */
import { readFileSync, existsSync } from 'node:fs'

import { MAIN_NAV, HEADER_CTA, HEADER_CLIENT_LINK } from '../src/config/navigation'
import { INDEXABLE_ROUTES, NOINDEX_ROUTES } from '../src/config/routes'

const errors: string[] = []
const warnings: string[] = []
const ok: string[] = []

const routes = new Set<string>([...INDEXABLE_ROUTES, ...NOINDEX_ROUTES, '/conteudo'])

const allLinks = [
  ...MAIN_NAV.map((e) => ({ label: e.label, href: e.href, external: false })),
  ...MAIN_NAV.flatMap((e) => e.groups?.flatMap((g) => g.links) ?? []),
  ...MAIN_NAV.flatMap((e) => (e.viewAll ? [{ ...e.viewAll, href: e.viewAll.href, external: false }] : [])),
  { label: HEADER_CTA.label, href: HEADER_CTA.href, external: false },
  { label: HEADER_CLIENT_LINK.label, href: HEADER_CLIENT_LINK.href, external: true }
] as Array<{ label: string; href: string; external?: boolean }>

for (const link of allLinks) {
  const isHttp = /^https?:\/\//.test(link.href)
  if (isHttp) {
    if (!link.external) errors.push(`Link externo sem flag external: ${link.href}`)
    continue
  }
  if (link.external) errors.push(`Link interno marcado como externo: ${link.href}`)
  if (link.href.endsWith('/') && link.href !== '/') errors.push(`Trailing slash (redirect): ${link.href}`)
  if (!routes.has(link.href)) errors.push(`Destino inexistente no router: ${link.href} (${link.label})`)
}
ok.push(`${allLinks.length} destinos de navegação verificados`)

// Rota legada que não pode voltar ao menu
if (allLinks.some((l) => l.href === '/produtos/irec')) errors.push('/produtos/irec não deve existir no menu')

// Fonte única de navegação
const files = [
  'src/components/Navbar/Navbar.tsx',
  'src/components/Navbar/NavDropdown.tsx',
  'src/components/Navbar/MobileMenu.tsx',
  'src/components/Layout/Header/Header.tsx'
]
for (const file of files) {
  if (!existsSync(file)) errors.push(`Arquivo ausente: ${file}`)
}
if (existsSync('src/components/Navbar/Desktop') || existsSync('src/components/Navbar/Mobile')) {
  errors.push('Navegação duplicada: diretórios Desktop/Mobile ainda existem')
} else {
  ok.push('Sem navegação duplicada (uma única árvore de componentes)')
}

const navbar = readFileSync('src/components/Navbar/Navbar.tsx', 'utf8')
const header = readFileSync('src/components/Layout/Header/Header.tsx', 'utf8')
const dropdown = readFileSync('src/components/Navbar/NavDropdown.tsx', 'utf8')
const mobile = readFileSync('src/components/Navbar/MobileMenu.tsx', 'utf8')

if (!header.includes('<header')) errors.push('Header sem elemento <header>')
else ok.push('Elemento <header> presente')

if (!navbar.includes('aria-label="Navegação principal"')) errors.push('nav principal sem aria-label')
else ok.push('nav com aria-label="Navegação principal"')

if (!navbar.includes('href="/"') || !/aria-label="[^"]*Grupo BC Energia[^"]*"/.test(navbar))
  errors.push('Logo sem link para "/" ou sem nome acessível')
else ok.push('Logo linkada para "/" com nome acessível')

for (const [name, src] of [
  ['NavDropdown', dropdown],
  ['MobileMenu', mobile],
  ['Navbar', navbar]
] as const) {
  if (!src.includes('aria-expanded') || !src.includes('aria-controls'))
    errors.push(`${name}: botão de menu sem aria-expanded/aria-controls`)
}
ok.push('aria-expanded/aria-controls presentes em desktop e mobile')

if (!dropdown.includes("'Escape'")) errors.push('Dropdown desktop sem fechar via Escape')
if (!mobile.includes("'Escape'")) errors.push('Menu mobile sem fechar via Escape')
if (!dropdown.includes('pointerdown')) errors.push('Dropdown desktop sem fechar ao clicar fora')
if (!mobile.includes("document.body.style.overflow")) errors.push('Menu mobile sem scroll lock')
ok.push('Escape, clique fora e scroll lock implementados')

// Alvos de toque
const interactiveWithoutTarget = [navbar, dropdown, mobile]
  .join('\n')
  .split('\n')
  // Somente elementos realmente interativos (link/botão) — ícones decorativos
  // dentro de um alvo maior (ex.: <svg className="h-6 w-6">) não são alvos de toque.
  .filter((line) => /(?:href=|<button|<Link)/.test(line))
  .filter((line) => /className=.*(?:min-h-\[?(?:2\d|3\d)px|h-(?:6|7|8|9|10)\b)/.test(line))
if (interactiveWithoutTarget.length) {
  warnings.push(`${interactiveWithoutTarget.length} classes de altura possivelmente < 44px (revisar)`)
} else {
  ok.push('Alvos de toque >= 44px (min-h-11 / h-11 / min-h-[52px])')
}

// target=_blank indiscriminado
const blanks = [navbar, dropdown, mobile].join('\n').match(/target="_blank"/g)?.length ?? 0
const rels = [navbar, dropdown, mobile].join('\n').match(/rel="noopener noreferrer"/g)?.length ?? 0
if (blanks > rels) errors.push('target="_blank" sem rel="noopener noreferrer"')
else ok.push(`target="_blank" sempre com rel adequado (${blanks} ocorrências)`)

console.log('\n=== AUDITORIA DE NAVEGAÇÃO (Header) ===\n')
ok.forEach((m) => console.log(`  OK    ${m}`))
warnings.forEach((m) => console.log(`  WARN  ${m}`))
errors.forEach((m) => console.log(`  ERRO  ${m}`))
console.log(`\nResumo: ${ok.length} OK | ${warnings.length} avisos | ${errors.length} erros\n`)

if (errors.length) process.exit(1)
