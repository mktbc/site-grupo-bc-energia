# FRONT-END 13 — Páginas Institucionais / Sobre

Redesign das rotas `/sobre/*` com uma **linguagem institucional comum**, sem criar um
layout exclusivo por página. Mesma lógica já aplicada em Produtos (FRONT-END 11) e
Segmentos (FRONT-END 12).

## 1. Rotas auditadas e reconstruídas

| Rota | Papel | Estado |
| --- | --- | --- |
| `/sobre` | Hub de navegação institucional | Redesenhada |
| `/sobre/quem-somos` | História, propósito, missão, visão, valores | Redesenhada |
| `/sobre/nossas-usinas` | Estrutura de geração (14 complexos) | Redesenhada |
| `/sobre/sustentabilidade` | Pilares ambientais, I-REC, fontes renováveis | Redesenhada |
| `/sobre/social` | Compromisso social | Redesenhada |
| `/sobre/lgpd` | Política de privacidade (texto legal) | Reformatada |
| `/sobre/fator-de-alavancagem` | Informação regulatória CCEE | Reformatada |
| `/sobre/condicoes-gerais-varejistas` | Informação regulatória ANEEL REN 1110/2024 | Reformatada |
| `/sobre/leilao` | Leilões (estado vazio) | Reformatada |

Nenhuma rota foi criada, removida ou renomeada. Nenhum dado comercial foi inventado.

## 2. Arquitetura compartilhada — `src/components/Institutional/`

| Componente | Uso |
| --- | --- |
| `InstitutionalSection` | Wrapper de seção (espaçamento, superfície, `id` de âncora) |
| `InstitutionalIntro` | Bloco editorial texto + imagem (abertura de cada página) |
| `InstitutionalHighlights` | Grid de indicadores institucionais |
| `InstitutionalValues` | Propósito / Missão / Visão / Valores |
| `InstitutionalGallery` | Galeria técnica com ficha de especificações |
| `InstitutionalProse` | Coluna de leitura para conteúdo legal e longo |
| `InstitutionalCta` | Fechamento discreto, sem tom agressivo de venda |

Todos compõem a partir dos primitivos do Design System (`Container`, `Card`,
`SectionHeader`, `Button`) e usam apenas tokens semânticos — zero cor crua.

## 3. Fonte única de dados

- `src/data/powerPlants.ts` — **novo**. Ficha técnica dos 14 complexos (potência,
  estrutura, geração anual média, localização), extraída do conteúdo já existente.
  `POWER_PLANT_COUNT` passa a alimentar também a seção de usinas da Home,
  eliminando a contagem hardcoded.
- `src/data/companyMetrics.ts` — indicadores institucionais (clientes, economia, CO₂).
- `src/config/navigation.ts` — fonte única dos cards do hub `/sobre`.

Arquivos locais duplicados removidos: `sobre/nossas-usinas/data.ts`,
`sobre/nossas-usinas/Local.tsx`, `sobre/social/data.ts`,
`sobre/condicoes-gerais-varejistas/data.ts`.

## 4. PageHeader institucional

Mesmo padrão das páginas de produto: `align="left"`, `eyebrow`, H1 em duas linhas,
descrição curta e breadcrumb. Páginas legais/regulatórias usam `compact` para reduzir
altura e priorizar o conteúdo.

## 5. Semântica e SEO

- 1 H1 por rota, hierarquia H1 → H2 → H3 sem saltos (auditado nas 33 rotas).
- Eyebrows são sempre `<p>`, nunca heading.
- Breadcrumbs e metadata continuam vindo de `src/config/meta.ts`.
- Dados estruturados válidos em 33 rotas.

## 6. Verificação executada

| Checagem | Resultado |
| --- | --- |
| Typecheck | 0 erros |
| Build + pré-render | OK, 33 rotas + `404.html` |
| Semântica HTML | 33/33 rotas com exatamente 1 H1 |
| Indexação | INDEX 33 · NOINDEX 7 · REDIRECT 1 |
| robots.txt / sitemap.xml | consistentes (33 URLs) |
| Dados estruturados | válidos em 33 rotas |
| Design System | 0 ERROR (3 WARNING e 7 INFO pré-existentes) |
| JS inicial | **151,1 KB gzip** (budget ≤ 160 KB) |
| Console do browser | 0 erros |

Responsividade validada por screenshot em 360, 390, 768, 1024, 1280 e 1440 px.

## 7. Pendências herdadas (não alteradas neste bloco)

- `/img/pages/2147948282.jpg` — 1.036 KB, acima do budget de imagem. Requer
  substituição do asset original.
- `src/components/Forms/bc-form.css` ainda referencia a família `Roboto` no stack de
  fallback (CSS de formulário legado de terceiro).
