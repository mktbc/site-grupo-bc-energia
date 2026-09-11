# FRONT-END 02 — Header e Navegação

Etapa da FASE 3 (Front-end e Design System). Escopo restrito a Header, Navbar
desktop/mobile, menus, submenus, CTA, logo e estados de scroll. Home, Hero,
seções internas, Footer e formulários não foram alterados.

## 1. Estrutura anterior

| Item | Situação |
| --- | --- |
| Altura | Variável (mt-4/mt-8 + padding), ~96–110 px com margem superior |
| Logo | `Logo-BC-Energia-Vertical-Branco.svg` (vertical, 257×148) |
| Componentes | `Navbar/Desktop/*` e `Navbar/Mobile/*` — duas árvores paralelas |
| Fonte de dados | `Navbar/Items.data.ts` diretamente (hub usava `config/navigation.ts`) |
| Dropdown | Apenas `hover` + `onMouseEnter`; sem `aria-expanded`, sem Escape, sem clique fora |
| CTA | Dois botões no desktop ("Já sou cliente" + "Falar com um especialista") |
| Sticky | `fixed` com `mx-6`, cápsula flutuante, `backdrop-blur-lg` forte |
| Scroll | Listener com rAF (mantido), troca para `bg-teal-800/80` |
| Mobile | Painel `height: calc(100vh - 9rem)` com `▼` textual, sem scroll lock |
| Problemas | Duas navegações duplicadas; submenu de Segmentos com 11 itens; glassmorphism pesado; sem estado ativo claro; sem foco/teclado no dropdown; sem `aria` no submenu desktop |

## 2. Nova arquitetura

```
src/config/navigation.ts        ← fonte única (MAIN_NAV, HEADER_CTA, HEADER_CLIENT_LINK)
src/components/Layout/Header/Header.tsx   ← <header> fixo, z-50
src/components/Navbar/Navbar.tsx          ← barra (logo + nav desktop + CTA + botão mobile)
src/components/Navbar/NavDropdown.tsx     ← painel desktop acessível
src/components/Navbar/MobileMenu.tsx      ← drawer full-screen com accordions
src/components/Navbar/useScrolled.ts      ← estado de scroll (rAF, listener passivo)
```

`MAIN_NAV` é derivado de `PRODUCT_HUB_ITEMS`, `SEGMENT_HUB_ITEMS`,
`ABOUT_HUB_ITEMS` e `CONTENT_HUB_ITEMS` — que por sua vez derivam de
`Navbar/Items.data.ts`. Não existe segunda lista manual de links.

Os diretórios `Navbar/Desktop` e `Navbar/Mobile` foram removidos.

## 3. Header

- Altura: 64 px (mobile e após scroll) / 80 px no topo em ≥ lg.
- Background: `bg-bc-dark/30` + `backdrop-blur-sm` sobre o Hero; `bg-bc-dark`
  sólido + `shadow-md` após 24 px de scroll (transição `duration-normal ease-bc`).
- Container: `<Container>` (`.bc-container`, max 1200 px) — sem container ad-hoc.
- Sticky: `position: fixed` (comportamento anterior preservado, sem CLS — o Hero
  já era desenhado sob o Header).
- Z-index: Header 50, painel do dropdown 40 (dentro do Header), drawer mobile 40.

## 4. Logo

- Arquivo em uso: `public/logo-bc-energia.svg` (horizontal branca, 211×37).
- Renderizada com 26 px (mobile) / 30 px (desktop) de altura, `width/height`
  explícitos, sem recolorir via CSS.
- `public/bc-energia-logo.svg` é a versão **colorida** horizontal (2939×497) —
  não é equivalente, permanece disponível para fundos claros.
- `public/Logo-BC-Energia-Vertical-Branco.svg` deixou de ser usada no Header;
  registrada como **possível órfão** (não removida nesta etapa).

## 5. Navegação desktop

Itens: **Soluções · Segmentos · Sobre · Conteúdo · Contato**.

- Rótulo é sempre link real para o hub; o painel é controlado por um `<button>`
  adjacente com `aria-expanded` / `aria-controls`.
- Abre por hover, clique, foco e `ArrowDown`; fecha com `Escape` (foco volta ao
  botão), clique fora (`pointerdown`) e ao sair do item.
- Ponte de `padding-top` entre item e painel evita fechamento acidental.
- Estado ativo por prefixo de rota (`/produtos/*` → Soluções): cor `bc-yellow` +
  `aria-current="page"`.
- Foco visível global (`outline: 3px hsl(var(--focus))`) — sem `ring-amber-400`.

### Soluções (2 colunas, com descrição curta)
Mercado livre de energia · Consórcio BC Energia · Gestão de Energia ·
Certificação Renovável – IREC · Arrendamento de usinas · Consultoria Jurídica
(externo) + **Ver todas as soluções** → `/produtos`.
A URL correta `/produtos/certificacao-renovavel-irec` foi mantida; `/produtos/irec`
não existe no menu (validado no audit).

### Segmentos (2 colunas, 6 destaques)
Agronegócio · Condomínio · Saúde · Serviço · Varejo · Residencial
+ **Ver todos os segmentos** → `/segmentos` (os 11 continuam acessíveis no hub).

### Sobre (2 colunas, hierarquia)
- *Institucional*: Quem Somos · Nossas Usinas · Sustentabilidade · Social
- *Regulatório e legal* (peso secundário): LGPD · Leilão · Fator de Alavancagem ·
  Condições Gerais Varejistas

### Conteúdo (1 coluna, peso secundário)
Blog · BC Cast (rotas internas `/conteudo/blog` e `/conteudo/bc-cast`).

## 6. CTA

- Principal: **Enviar minha conta** (mobile: *Enviar minha conta para análise*),
  destino `/contato`, variante `primary`. Nenhuma promessa comercial nova.
- Secundário: "Já sou cliente" (WhatsApp oficial) deixou de ser botão — é link de
  texto, visível a partir de `xl` no desktop e no fim do menu mobile.

## 7. Mobile

- Drawer full-screen abaixo do Header (`top-16`), fundo `bc-dark`, `lg:hidden`.
- Botão hambúrguer/X com `aria-label`, `aria-expanded`, `aria-controls="menu-mobile"`.
- Accordions por seção (`aria-expanded`/`aria-controls`), seção da rota atual já
  aberta; rótulo continua link para o hub.
- Scroll lock em `document.body` com restauração no unmount; `Escape` fecha e
  devolve o foco ao botão; fecha ao navegar.
- CTA full-width + link "Já sou cliente" no fim do painel.
- Alvos de toque: 44–52 px em todos os itens.

## 8. Responsividade

| Largura | Comportamento |
| --- | --- |
| 360 / 390 | Logo + botão menu (64 px); drawer com accordions |
| 768 | Idem mobile |
| 1024 | Nav desktop compacta (13 px, `px-1.5`), CTA reduzido, "Já sou cliente" oculto |
| 1280+ | Nav completa (14 px), CTA e link de cliente visíveis |

Nenhum rótulo quebra em duas linhas (`whitespace-nowrap`).

## 9. Acessibilidade

- `<header>` → `<nav aria-label="Navegação principal">` (desktop) e
  `<nav aria-label="Navegação principal (mobile)">` dentro do drawer.
- `aria-expanded` / `aria-controls` em todos os toggles.
- `Escape`, clique fora, retorno de foco, `aria-current="page"`.
- Skip link `#conteudo` já existente em `RootLayout` — preservado (não duplicado).
- Ícones SVG inline decorativos com `aria-hidden`.

## 10. Performance

- Nenhuma biblioteca nova; apenas React + CSS/Tailwind existentes.
- JS inicial gzip: **146,5 KB → 148,7 KB** (budget 160 KB — OK).
- 33 rotas pré-renderizadas + 404, sitemap com 33 URLs, metadata/canonical/
  robots/JSON-LD/H1 inalterados.

## 11. Auditoria

`npm run audit:navigation` (`scripts/audit-navigation.ts`) valida destinos
existentes no router, trailing slash/redirect, links externos com
`rel="noopener noreferrer"`, ausência de navegação duplicada, `<header>`/`nav`
semânticos, logo com href `/`, `aria-expanded`/`aria-controls`, Escape,
clique fora, scroll lock e alvos de toque.

## 12. Pendências registradas (não tratadas nesta etapa)

- `public/Logo-BC-Energia-Vertical-Branco.svg`: possível órfão após consolidação.
- `public/bc-energia-logo.svg`: versão colorida sem uso atual no site.
- Footer mantém inconsistências visuais — será tratado em etapa própria.
- 2 imagens acima de 500 KB (`footer-bg.png`, `2147948282.jpg`) — fora do escopo.
