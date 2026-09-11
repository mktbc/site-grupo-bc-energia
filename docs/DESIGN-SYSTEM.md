# Design System — Grupo BC Energia

FASE 3 · FRONT-END 01 — Fundação. Documento de referência única para cores,
tipografia, espaçamento, componentes e regras de uso.
Preview interno: rota `/design-system` (noindex, fora do sitemap).
Auditoria automática: `npm run audit:design-system`.

## 1. Princípios

O front-end deve transmitir **confiança, tecnologia, energia, sustentabilidade,
solidez, proximidade, sofisticação e clareza** — aparência de grupo de energia
consolidado, não de landing page genérica.

Evitar: gradientes decorativos, neon, glassmorphism, sombras pesadas,
animações sem propósito, tipografia sem hierarquia.

## 2. Cores

Fonte: `src/styles/globals.css` (`:root`, HSL sem `hsl()`) + `tailwind.config.ts`.

### Marca

| Token | Valor | Uso |
| --- | --- | --- |
| `bc-primary` | `#18857D` | Cor principal da marca, ações de apoio, ícones |
| `bc-primary-hover` / `bc-primary-dark` | `#146E68` | Hover/pressed da primária |
| `bc-dark` | `#242F40` | Superfícies escuras, texto principal, CTA dark |
| `bc-yellow` / `bc-accent` | `#F1C035` | CTA principal e anel de foco |
| `bc-cyan` | `#24D2C8` | Destaque **somente sobre fundo escuro** |
| `bc-green-light` | `#1B9D93` | Apoio / gradações da primária |
| `bc-gray` | `#E5E5E5` | Neutro claro, divisores, botão neutro |

### Semânticos

| Token | Uso |
| --- | --- |
| `page`, `surface` | Fundo de página e de card (branco) |
| `surface-muted` | Blocos alternados, campo desabilitado |
| `surface-dark`, `surface-brand` | Seções navy / seções na cor da marca |
| `text-primary` | Texto principal (`#242F40`) |
| `text-secondary` | Texto de apoio, descrições |
| `text-muted` | Placeholder, legendas |
| `text-inverse` | Texto sobre fundo escuro/primário |
| `text-accent` | Link/eyebrow sobre fundo claro |
| `border-subtle` / `border-default` / `border-strong` | Cards / inputs / hover de input |
| `success` `warning` `info` `error` | Feedback de sistema |
| `focus` | Anel de foco (`#F1C035`) |

As rampas `teal-*` e `amber-*` continuam existindo apenas realinhadas ao
Brandbook (compatibilidade com o código legado). **Novo código usa tokens
semânticos**, não as rampas.

### Contraste (WCAG AA)

| Par | Situação |
| --- | --- |
| `text-primary` sobre branco | AAA |
| branco sobre `bc-primary` | AA (texto normal) |
| branco sobre `bc-dark` | AAA |
| `bc-dark` sobre `bc-yellow` | AA — o CTA primário usa texto navy, nunca branco |
| `bc-yellow` / `bc-cyan` sobre `bc-dark` | AA — uso apenas em fundo escuro |

Regra: `bc-yellow` e `bc-cyan` **nunca** são cor de texto sobre fundo branco.

## 3. Tipografia

Famílias mantidas (self-hosted, WOFF2, `font-display: swap`):

- **Barlow Condensed 700** — H1, H2, H3, display, números institucionais.
- **Onest 400/500/600/700** — body, menu, botões, formulários, labels, cards.

Escala (utilitários em `globals.css`):

| Token | Família | Tamanho | Peso / line-height |
| --- | --- | --- | --- |
| `t-display` | Barlow Condensed | `clamp(2.5rem, 5vw, 4rem)` | 700 / 1.05 |
| `t-h1` | Barlow Condensed | `clamp(2.5rem, 4.5vw, 4rem)` | 700 / 1.05, uppercase |
| `t-h2` | Barlow Condensed | `clamp(1.75rem, 3.2vw, 2.75rem)` | 700 / 1.1, uppercase |
| `t-h3` | Barlow Condensed | `clamp(1.375rem, 2.2vw, 1.75rem)` | 700 / 1.35 |
| `t-h4` | Onest | `clamp(1.0625rem, 1.4vw, 1.25rem)` | 600 / 1.35 |
| `t-body-lg` | Onest | 1.125rem | 400 / 1.625 |
| `t-body` | Onest | 1rem | 400 / 1.625 |
| `t-body-sm` | Onest | 0.875rem | 400 / 1.5 |
| `t-label` | Onest | 0.875rem | 600 / 1.35 |
| `t-caption` | Onest | 0.75rem | 400, uppercase |
| `t-eyebrow` | Onest | 0.875rem | 600, uppercase, tracking 0.18em, `bc-primary` |

**Eyebrow é sempre `<p>`** (ou `<span>`), nunca heading — regra de semântica
consolidada nas fases de SEO.

## 4. Espaçamento, container e grid

- Escala: 4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64 / 72 / 88 / 96 / 120 px
  (Tailwind padrão + `18`, `22`, `30`).
- Seções: `bc-section-sm` (40/48), `bc-section-md` (56/64),
  `bc-section-lg` (64/80/96), `bc-section-xl` (80/112/128).
- Container: `.bc-container` / `<Container>` — `max-width: 1200px`,
  padding 24px mobile e 32px a partir de `md`.
- Grid: 12 colunas no desktop quando necessário, 2 no tablet, 1 no mobile.
  Não converter layouts existentes sem necessidade.

## 5. Raio e sombras

| Token | Valor | Uso |
| --- | --- | --- |
| `rounded-sm` | 4px | Badges pequenos, tags |
| `rounded-md` | 8px | Botões, inputs, alerts |
| `rounded-lg` / `rounded-card` | 12px | Cards, blocos |
| `rounded-xl` | 20px | Modais, painéis grandes |
| `rounded-full` | — | Pills, avatares |

| Token | Uso |
| --- | --- |
| `shadow-sm` | Card em repouso |
| `shadow-md` | Card em hover, elementos flutuantes |
| `shadow-lg` | Modal, dropdown |

`shadow-card` / `shadow-card-hover` são aliases de `shadow-md` / `shadow-lg`
mantidos para o código existente.

## 6. Motion

`duration-fast` 150ms · `duration-normal` 250ms · `duration-slow` 400ms ·
`ease-bc` `cubic-bezier(0.2, 0, 0.2, 1)`.
`prefers-reduced-motion: reduce` já neutraliza transições globalmente em
`globals.css`; componentes com transform usam `motion-reduce:` explicitamente.

## 7. Button (`src/components/Button`)

Variantes: `primary` (CTA de conversão, amarelo + texto navy), `secondary`
(branco sólido sobre escuro), `outline` (contorno sobre escuro), `dark`
(navy sobre claro), `green` (primária da marca), `ghost` e `light`
(terciárias), `link`, `gray`.

Tamanhos: `sm` 36px · `md` 44px · `lg` 48px · `xl` 52px — `md` é o mínimo em
mobile (área de toque ≥ 44px).

Estados: default, hover, `focus-visible` (anel amarelo 4px + offset), active
(1px de deslocamento), `disabled` (opacidade 60%, sem ponteiro), `loading`
(spinner + `aria-busy`).

Hierarquia: uma única ação `primary` por bloco; ações como “Conhecer soluções”
usam `secondary`/`outline`/`ghost`.

## 8. Formulários (`src/components/Fields`)

Base comum em `Fields.style.ts` (`fieldStyles`): altura mínima 48px,
`rounded-md`, borda `border-default`, padding 12/20, foco amarelo.

Estados: default · hover (`border-strong`) · focus · filled · disabled
(`surface-muted`) · error (`aria-invalid=true`) · success (`data-state=success`).

Componentes: `Input`, `Select`, `Textarea`, `Checkbox`, `Terms`.
**Label real sempre presente** — placeholder nunca substitui label.

## 9. Cards (`src/components/Card`)

Base única `Card` com variantes `default`, `muted`, `dark`, `brand`, `outline`
e padding `none|sm|md|lg`. Hover discreto via `interactive`:
`-translate-y-0.5` + `shadow-md` + borda `bc-primary/40`.

As famílias de card do site (Feature, Solution, Segment, Stat, Content,
Testimonial) devem compor a partir desta base e dos mesmos tokens
(`.bc-card` permanece disponível para o código existente).

## 10. Demais componentes base

- **Badge** — `neutral | brand | accent | dark | outline | success | warning | error`, tamanhos `sm`/`md`.
- **Alert** — `info | success | warning | error`, com `role="status"`/`role="alert"`.
- **Accordion** — `<h3><button aria-expanded>`, divisor `border-subtle`, ícone “+” que rotaciona, transição `duration-slow`.
- **Breadcrumbs** — `<nav aria-label="Breadcrumb">`, discreto, mesma fonte de dados do JSON-LD.
- **Modal** — overlay `bc-dark/60`, container `rounded-xl` + `shadow-lg`, ESC fecha, scroll do body bloqueado, full-width em mobile.
- **Container / Section / SectionHeader** — padrões de largura, ritmo vertical e composição eyebrow + H2 + descrição.
- **ClosingCta** — bloco reutilizável de conversão (eyebrow, headline, descrição, CTA primário e secundário, links de apoio).

## 11. Ícones e logos

- Ícones: sistema próprio `BCIcon` + SVGs oficiais em `src/assets/icons/bc/`
  e `public/img/icons/`. Não introduzir biblioteca genérica de ícones.
- Logos disponíveis: `public/Logo-BC-Energia-Vertical-Branco.svg`,
  `public/bc-energia-logo.svg`, `public/logo-bc-energia.svg`,
  `public/img/global/grupo-bc-logo-solo-branca.svg` e `…-solo-color.svg`.
- Regras: preservar aspect-ratio e área de respiro; proibido stretch,
  gradiente, drop-shadow ou recolorir fora das versões oficiais.

## 12. Breakpoints e mobile-first

Tailwind padrão: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1536.
Todo componente base é validado primeiro em 360/390px e depois em 768/1024/desktop.

## 13. Acessibilidade

- `focus-visible` consistente (`bc-focus-ring` / outline global amarelo).
- Área de toque ≥ 44px em botões e campos.
- Labels reais, `aria-expanded` em accordions, `aria-modal` no modal.
- `prefers-reduced-motion` respeitado.

## 14. Regras de uso

1. Nunca usar hex, `rgb()` ou `hsl()` direto em componentes — usar tokens.
2. Nunca usar `text-white` / `bg-black` em código novo — usar `text-inverse` / `bc-dark`.
3. Uma família de sombra e uma escala de raio; nada de `rounded-[17px]`.
4. Um CTA primário por bloco.
5. Novos componentes compõem a partir de `Card`, `Button`, `fieldStyles`, `Container` e `SectionHeader`.
6. `npm run audit:design-system` deve terminar com **0 ERROR**.
