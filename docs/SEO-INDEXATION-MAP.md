# Mapa de Indexação, Canonical e Redirects — ETAPA SEO 04

Data: 20/08/2026 · Escopo: técnico (roteamento/SEO). Nenhuma alteração visual.

## 1. Estado anterior (registro lógico)

| Arquivo | Comportamento antes |
| --- | --- |
| `src/config/routes.ts` | 37 rotas em `INDEXABLE_ROUTES`; 4 rotas em `NOINDEX_ROUTES`; sem mapa de redirects |
| `src/config/meta.ts` | metadata própria para `/produtos/irec` e `/produtos/certificacao-renovavel-irec` (duplicidade) |
| `src/config/site.ts` | canonical absoluta por rota + `isPreviewEnvironment()` (inalterado) |
| `src/App.tsx` | rota real `/produtos/irec` renderizando página independente |
| `src/config/navigation.ts` | descrições/ícones apontando para `/produtos/irec` |
| `scripts/generate-sitemap.ts` | 37 URLs (inalterado no funcionamento; segue `INDEXABLE_ROUTES`) |
| `scripts/prerender.ts` | 37 HTMLs (inalterado no funcionamento; segue `INDEXABLE_ROUTES`) |

## 2. Mapa final de indexação

| URL | Status anterior | Status novo | Canonical | Sitemap | Redirect | Motivo |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | INDEX | INDEX | self | Sim | — | Home |
| `/contato` | INDEX | INDEX | self | Sim | — | Conversão |
| `/produtos` | INDEX | INDEX | self | Sim | — | Hub |
| `/produtos/mercado-livre-de-energia` | INDEX | INDEX | self | Sim | — | Money page |
| `/produtos/consorcio-bc-energia` | INDEX | INDEX | self | Sim | — | Money page |
| `/produtos/gestao-de-energia` | INDEX | INDEX | self | Sim | — | Money page |
| `/produtos/irec` | INDEX | REDIRECT | — | Não | → `/produtos/certificacao-renovavel-irec` | Duplicidade de produto |
| `/produtos/certificacao-renovavel-irec` | INDEX | INDEX | self | Sim | — | URL preferencial I-REC |
| `/produtos/arrendamento-de-usinas` | INDEX | INDEX | self | Sim | — | Money page |
| `/segmentos` + 11 segmentos | INDEX | INDEX | self | Sim | — | Hub e páginas de público |
| `/sobre`, `/sobre/quem-somos`, `/sobre/nossas-usinas`, `/sobre/lgpd`, `/sobre/sustentabilidade`, `/sobre/social` | INDEX | INDEX | self | Sim | — | Institucional com valor |
| `/sobre/leilao` | INDEX | NOINDEX | — | Não | — | Regulatória, sem intenção de busca relevante |
| `/sobre/fator-de-alavancagem` | INDEX | NOINDEX | — | Não | — | Regulatória |
| `/sobre/condicoes-gerais-varejistas` | INDEX | NOINDEX | — | Não | — | Regulatória |
| `/energia-solar-goiania`, `-anapolis`, `-aparecida-de-goiania`, `-em-rio-verde`, `-trindade` | INDEX | INDEX | self | Sim | — | Intenção municipal |
| `/energia-solar-palmas` | INDEX | INDEX | self | Sim | — | Intenção municipal (capital) |
| `/energia-solar-no-tocantins` | INDEX | INDEX | self | Sim | — | Hub estadual |
| `/contato/enviado` | NOINDEX | NOINDEX | — | Não | — | Página de sucesso |
| `/conteudo`, `/conteudo/blog`, `/conteudo/bc-cast` (+ itens) | NOINDEX | NOINDEX | — | Não | — | Conteúdo provisório (Bloco 10) |
| `/documentos/*` (6) | REDIRECT | REDIRECT | — | Não | → `/docs/<arquivo>.pdf` | URLs legadas de PDF |

Totais: **INDEX 33 · NOINDEX 7 · REDIRECT 7 · REVISAR 2** (Palmas × Tocantins, conteúdo).

## 3. Mapa de redirects

| Origem | Destino | Tipo | Implementação | Status |
| --- | --- | --- | --- | --- |
| `/produtos/irec` | `/produtos/certificacao-renovavel-irec` | 301 | SPA (`<Navigate replace>`) hoje; 301 real a configurar no hosting no cut-over | Ativo (client-side) |
| `/documentos/campanha_com_fidelidade_2anos` | `/docs/campanha_com_fidelidade_2anos.pdf` | 301 | `PdfRedirect` (client-side) | Ativo |
| `/documentos/campanha_sem_fidelidade` | `/docs/campanha_sem_fidelidade.pdf` | 301 | `PdfRedirect` | Ativo |
| `/documentos/condicoes_gerais_gd` | `/docs/condicoes_gerais_gd.pdf` | 301 | `PdfRedirect` | Ativo |
| `/documentos/condicoes_gerais_gd_v2` | `/docs/condicoes_gerais_gd_v2.pdf` | 301 | `PdfRedirect` | Ativo |
| `/documentos/condicoes_gerais_gd_alta_tensao` | `/docs/condicoes_gerais_gd_alta_tensao.pdf` | 301 | `PdfRedirect` | Ativo |
| `/documentos/condicoes_gerais_gd_externo` | `/docs/condicoes_gerais_gd_externo.pdf` | 301 | `PdfRedirect` | Ativo |

Nenhuma chain (`A → B → C`), nenhum loop, todos os destinos existem.

### LIMITAÇÃO DE INFRAESTRUTURA

O hosting utilizado (Lovable) não processa `_redirects`, `netlify.toml`, `vercel.json`
nem configuração de edge/rewrites — apenas o fallback SPA. Portanto **não é possível
emitir HTTP 301 real neste ambiente**. Os redirects permanecem client-side.

No cut-over, configurar no servidor/CDN de produção:

```
301 /produtos/irec                                  → /produtos/certificacao-renovavel-irec
301 /documentos/<slug>                              → /docs/<slug>.pdf   (6 regras)
```

Como `/produtos/irec` foi removida de `INDEXABLE_ROUTES`, ela **não gera HTML
pré-renderizado indexável** — o Google recebe apenas o shell SPA que redireciona,
sem title/description/canonical concorrentes.

## 4. Palmas × Tocantins

Comparação de `title`, `description`, H1, H2, parágrafos de introdução, blocos
de soluções, público, links internos e CTAs (`src/data/regions/index.ts`):

- Semelhança textual estimada: **MODERADA (~35–40%)**, concentrada nas descrições
  de produto reaproveitadas (constantes `MLE`, `CONSORCIO`, `GESTAO`), que são
  comerciais e devem mesmo ser consistentes.
- Diferenciação real existente: H1, introdução, escopo (`scope: 'city'` × `'state'`),
  breadcrumb (Palmas é filha do Tocantins), público-alvo, portfólio (o hub estadual
  inclui I-REC), links internos e metadata.
- Decisão: **manter as duas INDEX**, cada uma com canonical própria. Intenção
  municipal ≠ intenção estadual. Nenhum canonical cruzado.
- Classificação de conteúdo: **REVISAR CONTEÚDO** na etapa de arquitetura regional
  (aprofundar o hub estadual e a especificidade municipal). Nenhuma copy alterada aqui.

## 5. Validação automática

`scripts/audit-indexation.ts` (novo, mantido no projeto para QA) verifica:
URL indexável sem canonical · canonical não self-referencing · canonical com
query/hash · canonical apontando para redirect ou noindex · URL noindex ou
redirecionada no sitemap · rota indexável ausente do sitemap · URLs duplicadas ·
redirect chain/loop/destino inválido · HTML indexável gerado para URL não-indexável.

Resultado: `INDEX: 33 | NOINDEX: 7 | REDIRECT: 1 (mapa de rotas) | HTML auditado: 33 — OK`.

## 6. Robots

| Ambiente | Páginas INDEX | Páginas NOINDEX |
| --- | --- | --- |
| Preview (`VITE_SEO_ENV` ≠ production) | `noindex,nofollow` (proteção mantida) | `noindex,nofollow` |
| Produção (`VITE_SEO_ENV=production`) | `index,follow` | `noindex,follow` |
