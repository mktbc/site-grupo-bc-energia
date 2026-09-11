# Auditoria global de JavaScript — Grupo BC Energia

Objetivo: reduzir JS que não gera valor real (INP, CPU, mobile), preservando
design, comportamento aprovado, SEO e tracking.

## 1. Dependências de runtime

| Pacote | Uso real | Ação |
| --- | --- | --- |
| react / react-dom | base | manter |
| react-router-dom | rotas + code splitting | manter |
| react-helmet-async | metadata por rota (SEO) | manter |
| swiper | apenas Hero da Home (carrossel aprovado) | manter, uso restrito |
| @supabase/supabase-js | formulários/serviços (chunk separado, fora do bundle inicial) | manter |
| clsx / tailwind-variants | utilitários leves | manter |
| framer-motion | **não existe mais no projeto** — reveals migrados para `useReveal`/CSS | removido anteriormente |

Não há duplicação de bibliotecas (uma de carrossel, nenhuma de animação,
ícones são SVGs oficiais próprios — sem pacote de ícones).

## 2. Animação / reveal

Todos os reveals usam `IntersectionObserver` nativo (`useReveal`/`Reveal`) com
transições CSS e `prefers-reduced-motion`. Hover, escala, cor e gradiente são
100% CSS. Nenhuma animação de contagem (count-up) e nenhum marquee em JS.

## 3. Carrosséis (Swiper)

| Componente | Situação anterior | Ação |
| --- | --- | --- |
| `home/Sections/Hero` | carrossel principal aprovado (3 slides, autoplay, setas, dots) | **mantido intacto** |
| `Customers` (logos) | variante `carousel` com Swiper (não utilizada em nenhuma rota) | Swiper removido; grade estática |
| `TestimonyCarousel` | componente com Swiper sem uso em nenhuma página | **excluído** (código morto) |
| `home/Sections/Testimonials` | trilho próprio em CSS `transform` | mantido (sem lib) |

Swiper agora existe em exatamente um lugar do site.

## 4. Listeners e responsividade

- `useScrolled` (header): `scroll` com `{ passive: true }` + throttle por `requestAnimationFrame`.
- `FormEmbed`: `resize` convertido para listener `passive`.
- `home/Sections/Segments`: removido `matchMedia('(min-width: 1024px)')` e o
  estado `isDesktop`. A pré-visualização depende de `hover`/`focus`, que já é
  naturalmente restrito a ponteiro/teclado — sem JS de breakpoint.
- Nenhum `mousemove`/`touchmove` no projeto; nenhum `window.innerWidth` para
  decidir layout (só no módulo de RUM, para contexto de medição).

## 5. Carregamento

- Code splitting por rota via `React.lazy` em todas as páginas (Home estática
  por ser o LCP).
- Chunks manuais: `react`, `swiper`, `supabase`.
- Supabase, formulários e simulador ficam fora do bundle inicial.
- YouTube já usa fachada com thumbnail + clique para carregar o iframe.

## 6. Resultado de bundle (gzip)

| | Antes | Depois |
| --- | --- | --- |
| chunk principal | 91,68 kB | 90,52 kB |
| react | 53,41 kB | 53,41 kB |
| swiper | 30,09 kB | 30,09 kB |
| **JS inicial** | ~175,2 kB | ~174,0 kB |

Além disso, o CSS e o JS do Swiper deixaram de ser exigidos por
`Customers`/`TestimonyCarousel`, e um componente inteiro saiu do grafo.

## 7. Oportunidade remanescente (não executada)

O maior item restante no bundle inicial é o Swiper (~30 kB gzip), carregado em
todas as rotas porque a Home é importada estaticamente. Reduzir isso exigiria
hidratar o carrossel de forma diferida, o que altera o comportamento do banner
aprovado — fora do escopo desta fase, conforme a regra 7 do briefing.
