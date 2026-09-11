# PERFORMANCE 01 — Imagens, LCP e CLS

Fase 2 · Etapa 01 — otimização técnica de entrega de assets.
Nenhuma alteração de design, layout, copy ou identidade visual.

## 1. Inventário

| Métrica | Valor |
| --- | --- |
| Imagens raster em `public/` (jpg/jpeg/png/webp) | 162 arquivos |
| SVGs (logos/ícones) | 88 arquivos — mantidos como SVG |
| Peso do conjunto convertido (antes) | 8.210 KB |
| Peso do conjunto convertido (depois, WebP) | 4.218 KB |
| Redução no conjunto convertido | **−48,6%** |
| `bg-home.jpg` (og:image) | 962 KB → 120 KB (−87%) |
| Logo do widget Simule Agora | 393 KB → 11 KB (−97%) |

Os arquivos originais (JPG/PNG) foram **mantidos em disco** para permitir rollback e
para uso social (og:image). Nenhum arquivo foi excluído nesta etapa.

## 2. Top arquivos pesados (antes → depois na entrega)

| Arquivo | Antes | Depois (WebP entregue) |
| --- | --- | --- |
| `/img/pages/2147948282.jpg` | 1.037 KB | 73 KB (WebP já em uso; original órfão) |
| `/bg-home.jpg` (social) | 962 KB | 120 KB (mesma imagem, recomprimida) |
| `/img/global/footer-bg.png` | 509 KB | 227 KB (WebP já em uso) |
| `grupo-bc-logo-vertical-color.webp` (1788px p/ caixa de 96px) | 393 KB | 11 KB (versão 256px) |
| `mercado-livre-de-energia-intro2.jpg` | 387 KB | 44 KB |
| `consorcio-de-energia-intro.jpg` | 302 KB | 27 KB |
| `arendamento-de-usinas-intro.jpg` | 277 KB | 52 KB |
| `banner_black_friday_2024.jpg` | 271 KB | 161 KB |
| `sobre-cta.jpg` | 238 KB | 141 KB |
| `contact.jpeg` | 202 KB | mantido JPG (WebP ficou maior) |
| `energia-por-assinatura.jpg` | 187 KB | 98 KB |
| `nossas-usinas.jpg` | 183 KB | 147 KB |
| `irec2.jpg` / `irec1.jpg` | 154 / 144 KB | 73 / 65 KB |
| `mercado-livre-de-energia-como-funciona.png` | 139 KB | 44 KB |
| `consorcio-de-energia-o-que-e.png` | 124 KB | 43 KB |
| `segmentos/hotelaria.jpg` | 118 KB | 90 KB |
| `certificacao-renovavel.jpg` | 116 KB | 115 KB |
| `slider-bc-consorcio.jpg` | 111 KB | 57 KB |
| `products-card/mercado-livre-de-energia.png` | 109 KB | 8 KB |
| `segmentos/residencial.jpg` | 97 KB | 89 KB |

Arquivos onde o WebP ficou **maior** que o original foram descartados e a referência
permaneceu em JPG: `/img/global/arrendamento-de-usinas.jpg`, `/img/pages/contact.jpeg`,
`/img/global/gestao-de-energia.jpg`, `usinas/ClareiradeAracu.jpg`, `usinas/Corumba.jpg`.

## 3. LCP candidates

| Rota | Elemento LCP provável | Arquivo | Implementação | Peso |
| --- | --- | --- | --- | --- |
| `/` | Hero slide 1 (Swiper) | `/bg-home.webp` | `background-image` + `<link rel=preload as=image fetchpriority=high>` | 51 KB |
| `/produtos/*` | `PageHeader` (cover) | `/img/global/*.jpg|.webp` | `background-image` (CSS) | 115–132 KB |
| `/segmentos/*` | `PageHeader` (cover do segmento) | `/img/pages/segmentos/*.webp` | `background-image` (CSS) | 37–131 KB |
| `/energia-solar-*` | `PageHeader` (cover regional compartilhada) | `/img/global/arrendamento-de-usinas.jpg` | `background-image` (CSS) | 272 KB (compartilhada entre as 7 regionais) |
| `/sobre/*` | `PageHeader` | conforme rota | `background-image` (CSS) | ≤ 147 KB |
| `/contato` | `PageHeader` | `/img/pages/contact.jpeg` | `background-image` (CSS) | 202 KB |

## 4. Home hero

- **Implementação anterior:** `background-image` no slide do Swiper com `/bg-home.webp`,
  já com `preload` + `fetchpriority="high"` no `index.html` (herdado do Bloco 03).
- **Implementação atual:** mantida. A migração para `<picture>/<img>` **não** foi feita
  porque o slide depende de `background-position` (`bg-[center_right_30%]`),
  `bg-cover` e altura `105vh` com overlay em gradiente; converter para `<img>` exigiria
  reproduzir o crop com `object-position` e traria risco real de mudança de enquadramento,
  sem ganho de carregamento (o `preload` já elimina o atraso de descoberta do CSS).
- **Imagem:** `/bg-home.webp` — 51 KB (original JPG 962 KB).
- **fetchpriority:** `high` (único na página, no `<link rel="preload">`).
- **loading:** N/A (background pré-carregado). Slides 2 e 3 sem preload/prioridade.
- **srcset/sizes:** não aplicável a background; existe variante `/bg-home-1024.webp`
  reservada para uso futuro caso o hero migre para `<picture>`.

## 5. Produtos — antes/depois

| Rota | Peso de imagens (antes) | Depois | Redução |
| --- | --- | --- | --- |
| `/produtos/mercado-livre-de-energia` | 608 KB | 488 KB | −20% |
| `/produtos/consorcio-bc-energia` | 642 KB | 360 KB | −44% |
| `/produtos/gestao-de-energia` | 508 KB | 439 KB | −14% |
| `/produtos/certificacao-renovavel-irec` | 297 KB | 188 KB | −37% |
| `/produtos/arrendamento-de-usinas` | 668 KB | 374 KB | −44% |
| `/` (Home) | 1.207 KB | 710 KB | −41% |
| `/energia-solar-goiania` | 256 KB | 187 KB | −27% |
| `/segmentos/agronegocio` | 605 KB | 507 KB | −16% |

Medição real no dev server (Playwright, viewport 1280×1800, `networkidle`).

## 6. Responsive images

- `srcset`/`sizes` já existentes (Bloco 03) mantidos em `About` nas páginas de produto
  (`consorcio-intro`, `mercado-livre-de-energia-intro`, `gestao-de-energia-intro`).
- Não foram criados novos breakpoints: as imagens restantes ou são backgrounds CSS
  (onde `srcset` não se aplica) ou já estão dimensionadas próximas do tamanho renderizado.
- Caso de imagem muito maior que o espaço renderizado corrigido: logo do widget
  (1788px → caixa de 96px) passou a usar variante de 256px.

## 7. CLS

- Todas as ocorrências de `<img>`/`<Image>` do projeto possuem `width` e `height`
  (validado pelo script de auditoria — 0 ocorrências sem dimensões).
- Backgrounds CSS reservam espaço por altura/padding fixos, sem risco de shift.
- Nenhuma proporção (`object-fit`, `object-position`, `bg-cover`, crop) foi alterada.

## 8. Lazy loading

- LCP (hero/PageHeader) não usa `loading="lazy"` — são backgrounds com preload no hero.
- `src/components/Image` aplica `loading="lazy"` + `decoding="async"` por padrão e
  `eager`/`fetchpriority=high` apenas quando `priority` é passado.
- `BCIcon` usa `lazy` por padrão e `eager` sob `priority`.
- Carrossel: apenas o primeiro slide da Home tem preload; slides 2 e 3 sem prioridade.

## 9. Background images

- Encontradas: `PageHeader`, `Section`, `Cta`, sliders da Home, cards de produto.
- Críticas (acima da dobra): hero da Home + `PageHeader` de todas as rotas internas.
- Convertidas para `<img>`: nenhuma (ver justificativa no item 4 — risco de alterar
  enquadramento sem ganho comprovado; o custo de descoberta já é mitigado por preload
  no único caso realmente crítico, a Home).
- Mantidas: todas, agora servindo WebP onde houve ganho.

## 10. Inline base64 / imagens externas

- Único `data:image` do projeto: seta do `<select>` em `src/components/Forms/bc-form.css`
  (SVG inline, < 1 KB) — mantido.
- Imagens externas: capas de blog/BC Cast vindas da API (Supabase/CDN) — HTTPS,
  abaixo da dobra, carregadas com `loading="lazy"`. Não alteradas.

## 11. Órfãos e duplicados (NÃO removidos)

Possíveis órfãos relevantes (>100 KB): `/img/pages/2147948282.jpg` (1.037 KB),
`/img/global/footer-bg.png` (509 KB), `/img/pages/mercado-livre-de-energia-intro2.jpg`,
`/img/pages/consorcio-de-energia-intro.jpg`, `/img/pages/arendamento-de-usinas-intro.jpg`
(nome com erro de grafia — duplicata provável de `arrendamento-de-usinas-intro`),
`/img/ads/banner_black_friday_2024.jpg`, `/img/pages/sobre-cta.jpg`, `cast-1..5.jpg`,
`products-card/*.png`, `segmentos/*.jpg` (originais das versões WebP em uso),
`usinas/*-500x300.jpg`, `/img/pages/segmentos/segmento-demo.jpg`.

Duplicados prováveis: `cast-1.jpg` × `energia-por-assinatura.jpg` (bytes idênticos);
`Clareira-de-Aracu.webp` × `ClareiradeAracu.jpg`; `corumba-500x300.jpg` × `Corumba.jpg`.

A lista completa é gerada por `npm run audit:images` (nível INFO). Remoção fica para a
etapa de limpeza, após confirmação.

## 12. Auditoria automatizada

`scripts/audit-images-performance.ts` (`npm run audit:images`) valida:
peso (>500 KB WARNING, >1 MB ERROR quando referenciado), referências quebradas,
raster referenciado com WebP disponível, `<img>` sem width/height, mais de um
`fetchpriority="high"` por arquivo e assets sem referência.

Resultado atual: **0 ERROR · 0 WARNING · 71 INFO** (órfãos e exceções sociais).

## 13. Regressão SEO

| Verificação | Resultado |
| --- | --- |
| Prerender | 33 rotas + 404.html |
| Sitemap | 33 URLs |
| Metadata / canonical | OK (`audit-metadata`) |
| Indexação / robots | OK (`audit-indexation`, `audit-robots-sitemap`) |
| JSON-LD | OK em 33 rotas |
| H1 / semântica | OK, 0 rotas com múltiplos H1 |
| og:image | mantido em JPG/PNG por compatibilidade social |

## 14. Métricas

- Peso de imagens por rota: medido localmente (tabela do item 5).
- LCP / CLS: **medição real pendente após publicação em produção** — o ambiente
  local do preview não fornece Lighthouse confiável (sem CDN, sem compressão de
  produção, sem rede real). A validação feita aqui é estrutural:
  dimensões reservadas, sem lazy no LCP, prioridade única por página.
