# ETAPA SEO 08 — H1, H2, H3 e semântica HTML

Auditoria e correção da hierarquia de headings e das tags estruturais, validadas
sobre o HTML **pré-renderizado** (`dist/`), sem hidratação.

Script: `bunx tsx scripts/audit-html-semantics.ts` (após `npm run build`).

## 1. Situação anterior

| Item | Antes |
| --- | --- |
| H1 por rota | 33/33 já com exatamente 1 (correção feita no BLOCO 01, Swiper com H1 `sr-only` único) |
| Heading component | `subtitle` renderizado como `<h3>` **antes** do `<h2>` do título → hierarquia invertida |
| Heading vazio | `<h2></h2>` em 11 rotas de segmento (componente `Cta` sem `title`) |
| Saltos de hierarquia | 40 ocorrências (H2→H4, H2→H5, H2→H6, H1→H4) vindas de componentes visuais |
| FAQ | pergunta em `<h2>` dentro de `<div onClick>` (sem botão, sem `aria-expanded`) |
| `<main>` | 1 por documento (OK) |

## 2. Regras adotadas

1. **1 H1 por rota**, emitido pelo `PageHeader` (ou pelo H1 `sr-only` da Home).
2. **Kicker/eyebrow não é heading** — `subtitle` do `Heading` virou `<p>` com as
   mesmas classes.
3. **H2 = seção real**; **H3 = item dentro da seção** (cards, features, passos,
   perguntas de FAQ).
4. **Nada de H4/H5/H6 como recurso visual** — números de etapa e valores de
   estatística viraram `div`/`p`.
5. **Troca de tag preserva `className`, props e responsividade** — nenhuma
   alteração visual.
6. Nenhum texto, CTA, cor, imagem ou espaçamento foi modificado.

## 3. Componentes corrigidos

| Arquivo | Antes | Depois |
| --- | --- | --- |
| `src/components/Heading/Heading.tsx` | `subtitle` = `<h3>`; `<h2>` sempre emitido (vazio quando sem título) | `subtitle` = `<p>`; `<h2>` só quando há conteúdo (wrapper/espaçamento mantidos) |
| `src/components/Features/Features.tsx` | `<h4>` | `<h3>` |
| `src/components/FeatureV2/FeatureV2.tsx` | `<h4>` | `<h3>` |
| `src/components/CardIconContent/CardIconContent.tsx` | `<h4>` | `<h3>` |
| `src/components/ChecklistItem/ChecklistItem.tsx` | `<h4>` | `<h3>` |
| `src/components/ProductCard/ProductCard.tsx` | `<h4>` | `<h3>` |
| `src/components/TestimonyCard/TestimonyCard.tsx` | `<h5>` (nome do cliente) | `<p>` |
| `src/components/Numbers/Numbers.tsx` | `<h4>` subtítulo, `<h5>` valor numérico | `<h3>` subtítulo, `<p>` valor |
| `src/components/Accordion/Accordion.tsx` | `<h2>` + `<div onClick>` | `<h3><button type="button" aria-expanded>` |
| `src/pages/produtos/consorcio-bc-energia/page.tsx` | `<h6>` numeral decorativo, `<h4>` título do passo | `<div>` numeral, `<h3>` título |

## 4. Matriz por rota (HTML pré-renderizado)

| Rota | H1 | H2 | H3 | H4+ | main | header | nav | footer | Erro | Warning |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| / | 1 | 19 | 10 | 0 | 1 | 1 | 4 | 1 | 0 | 0 |
| /contato | 1 | 10 | 0 | 0 | 1 | 1 | 4 | 1 | 0 | 0 |
| /produtos | 1 | 15 | 12 | 0 | 1 | 2 | 5 | 1 | 0 | 0 |
| /produtos/mercado-livre-de-energia | 1 | 17 | 18 | 0 | 1 | 1 | 5 | 1 | 0 | 0 |
| /produtos/consorcio-bc-energia | 1 | 15 | 14 | 0 | 1 | 1 | 5 | 1 | 0 | 0 |
| /produtos/gestao-de-energia | 1 | 15 | 4 | 0 | 1 | 1 | 5 | 1 | 0 | 0 |
| /produtos/certificacao-renovavel-irec | 1 | 14 | 3 | 0 | 1 | 1 | 5 | 1 | 0 | 0 |
| /produtos/arrendamento-de-usinas | 1 | 15 | 4 | 0 | 1 | 1 | 5 | 1 | 0 | 0 |
| /segmentos | 1 | 10 | 11 | 0 | 1 | 1 | 5 | 1 | 0 | 0 |
| /sobre | 1 | 9 | 8 | 0 | 1 | 1 | 4 | 1 | 0 | 0 |
| /sobre/quem-somos | 1 | 13 | 8 | 0 | 1 | 1 | 4 | 1 | 0 | 0 |
| /sobre/nossas-usinas | 1 | 9 | 14 | 0 | 1 | 1 | 4 | 1 | 0 | 1 |
| /sobre/lgpd | 1 | 15 | 0 | 0 | 1 | 1 | 4 | 1 | 0 | 0 |
| /sobre/sustentabilidade | 1 | 16 | 6 | 0 | 1 | 1 | 4 | 1 | 0 | 0 |
| /sobre/social | 1 | 9 | 4 | 0 | 1 | 1 | 4 | 1 | 0 | 0 |
| /energia-solar-goiania | 1 | 17 | 13 | 0 | 1 | 1 | 5 | 1 | 0 | 0 |
| /energia-solar-anapolis | 1 | 17 | 12 | 0 | 1 | 1 | 5 | 1 | 0 | 0 |
| /energia-solar-aparecida-de-goiania | 1 | 17 | 12 | 0 | 1 | 1 | 5 | 1 | 0 | 0 |
| /energia-solar-em-rio-verde | 1 | 17 | 13 | 0 | 1 | 1 | 5 | 1 | 0 | 0 |
| /energia-solar-trindade | 1 | 17 | 12 | 0 | 1 | 1 | 5 | 1 | 0 | 0 |
| /energia-solar-palmas | 1 | 17 | 12 | 0 | 1 | 1 | 5 | 1 | 0 | 0 |
| /energia-solar-no-tocantins | 1 | 17 | 13 | 0 | 1 | 1 | 5 | 1 | 0 | 0 |
| /segmentos/agronegocio | 1 | 18 | 6 | 0 | 1 | 1 | 6 | 1 | 0 | 0 |
| /segmentos/bares-e-restaurantes | 1 | 19 | 6 | 0 | 1 | 1 | 6 | 1 | 0 | 0 |
| /segmentos/condominio | 1 | 19 | 6 | 0 | 1 | 1 | 6 | 1 | 0 | 0 |
| /segmentos/educacional | 1 | 19 | 6 | 0 | 1 | 1 | 6 | 1 | 0 | 0 |
| /segmentos/lazer | 1 | 19 | 6 | 0 | 1 | 1 | 6 | 1 | 0 | 0 |
| /segmentos/religioso | 1 | 19 | 6 | 0 | 1 | 1 | 6 | 1 | 0 | 0 |
| /segmentos/residencial | 1 | 19 | 6 | 0 | 1 | 1 | 6 | 1 | 0 | 0 |
| /segmentos/saude | 1 | 19 | 6 | 0 | 1 | 1 | 6 | 1 | 0 | 0 |
| /segmentos/servico | 1 | 19 | 6 | 0 | 1 | 1 | 6 | 1 | 0 | 0 |
| /segmentos/turismo | 1 | 19 | 6 | 0 | 1 | 1 | 6 | 1 | 0 | 0 |
| /segmentos/varejo | 1 | 19 | 6 | 0 | 1 | 1 | 6 | 1 | 0 | 0 |

`404.html`: 1 H1 (“Página não encontrada”), 1 `<main>`, “404” permanece
decorativo, sem canonical e sem JSON-LD.

## 5. Estrutura HTML

- `<main id="conteudo">`: **1 por documento** em todas as rotas (`RootLayout`).
- `<header>`: 1 global (`Layout/Header`). Em `/produtos` há um segundo `<header>`
  — o banner de abertura do `PageHeader` (`align="left"`), uso válido de
  `header` como cabeçalho de seção dentro do `main`.
- `<nav>`: navegação principal desktop/mobile, breadcrumbs
  (`<nav aria-label="Breadcrumb">`) e footer. Nenhum heading dentro de breadcrumb.
- `<footer>`: 1 por documento.
- Cards de hub e cards de conteúdo continuam renderizando `<a href>` via `Link`
  (nenhum `div onClick` de navegação no projeto).
- Único controle sem `<button>` (Accordion) foi convertido para botão real.

## 6. Warnings remanescentes (sem alteração)

| Rota | Warning | Motivo de não corrigir |
| --- | --- | --- |
| /sobre/nossas-usinas | salto H1 → H3 (cards de usinas) | A página é uma listagem direta de usinas; criar um H2 exigiria inserir texto novo, fora do escopo desta etapa (correção editorial futura). |
| /produtos | 2 `<header>` | Segundo `header` é o banner do `PageHeader`, semanticamente válido. |
| Home | 19 H2 | Vários vêm de slides do Swiper (com clones de loop) e do footer; não há H1 duplicado e os títulos são conteúdo real. |

## 7. Swiper / carrosséis

- Home: H1 único `sr-only` na `<section id="home_slider">`; os títulos dos slides
  são `<h2>` — os clones de loop do Swiper duplicam apenas H2, nunca H1.
- Carrossel de depoimentos: nome do cliente deixou de ser heading (`<p>`).
- Nenhum bloco duplicado desktop/mobile emite heading repetido: a navegação
  duplicada (`hidden lg:flex` / `flex lg:hidden`) não contém headings.

## 8. Recomendações editoriais futuras (não executadas)

- `/sobre/nossas-usinas`: introduzir um H2 de seção antes da grade de usinas.
- `/contato`: a página não possui H3; avaliar subtítulos reais se o conteúdo crescer.
- Revisar copy de H2 muito genéricos (“Entendemos a sua necessidade”) na fase
  editorial, sem inflar quantidade de headings.

## 9. Validação

```text
npm run build            OK (33 rotas pré-renderizadas + 404.html)
tsc --noEmit             OK
audit-html-semantics     OK — 33/33 com exatamente 1 H1
audit-metadata           OK
audit-indexation         OK — INDEX 33 | NOINDEX 7 | REDIRECT 7
audit-robots-sitemap     OK — 33 URLs, 33 canonicals
audit-structured-data    OK — 33 rotas
Hydration                sem erros de hidratação no console
```
