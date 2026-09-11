# ETAPA SEO 01 — Inventário completo de URLs

> Auditoria somente. Nenhuma rota, sitemap, canonical, metadata, layout ou
> conteúdo foi alterado nesta etapa.
> Data: 20/08/2026 · Fonte: código atual do projeto (não documentação antiga).

## 1. Arquivos responsáveis pelas rotas

| Arquivo | Função |
| --- | --- |
| `src/App.tsx` | Declaração de todas as rotas (react-router-dom) |
| `src/config/routes.ts` | Fonte única: `INDEXABLE_ROUTES`, `NOINDEX_ROUTES`, `SEGMENT_ROUTES` |
| `src/config/meta.ts` | Metadata por rota estática, regional e de segmento |
| `src/config/meta-content.ts` | Metadata das rotas dinâmicas de conteúdo (blog/bc-cast) |
| `src/config/site.ts` | `SITE_URL`, canonical builder, hosts de produção, OG default |
| `src/config/navigation.ts` | Menus, hubs e links do footer |
| `src/data/segments/index.ts` | 11 segmentos → gera `/segmentos/:slug` |
| `src/data/regions/index.ts` | Conteúdo das 7 páginas regionais |
| `src/data/content/articles.ts` / `episodes.ts` | Artigos e episódios (rotas dinâmicas) |
| `scripts/generate-sitemap.ts` | Gera `public/sitemap.xml` a partir de `INDEXABLE_ROUTES` |
| `scripts/prerender.ts` | SSG das 37 rotas indexáveis |
| `src/components/Seo/Seo.tsx` | Emite title, description, canonical, robots, OG, JSON-LD |
| `src/components/Layout/RootLayout.tsx` | Resolve o meta pela pathname e injeta o `<Seo>` |

## 2. Inventário por grupo

### Institucional (11)

| URL | Status | Sitemap | Canonical | Metadata | Conteúdo |
| --- | --- | --- | --- | --- | --- |
| `/` | INDEX | Sim | Sim | Própria (= DEFAULT_META) | Real |
| `/contato` | INDEX | Sim | Sim | Própria | Real |
| `/sobre` | INDEX | Sim | Sim | Própria | Real (hub) |
| `/sobre/quem-somos` | INDEX | Sim | Sim | Própria | Real |
| `/sobre/nossas-usinas` | INDEX | Sim | Sim | Própria | Real |
| `/sobre/lgpd` | INDEX | Sim | Sim | Própria | Real (legal) |
| `/sobre/leilao` | REVISAR | Sim | Sim | Própria | Curto |
| `/sobre/fator-de-alavancagem` | REVISAR | Sim | Sim | Própria | Curto (regulatório) |
| `/sobre/sustentabilidade` | INDEX | Sim | Sim | Própria | Real |
| `/sobre/social` | INDEX | Sim | Sim | Própria | Real |
| `/sobre/condicoes-gerais-varejistas` | REVISAR | Sim | Sim | Própria | Legal/PDF |

### Produtos / Soluções (7)

| URL | Status | Sitemap | Canonical | Metadata | Conteúdo |
| --- | --- | --- | --- | --- | --- |
| `/produtos` | INDEX | Sim | Sim | Própria | Real (hub) |
| `/produtos/mercado-livre-de-energia` | INDEX | Sim | Sim | Própria + Service | Real |
| `/produtos/consorcio-bc-energia` | INDEX | Sim | Sim | Própria + Service | Real |
| `/produtos/gestao-de-energia` | INDEX | Sim | Sim | Própria + Service | Real |
| `/produtos/irec` | REDIRECT (candidato) | Sim | Sim | Própria + Service | Real — sobreposto |
| `/produtos/certificacao-renovavel-irec` | INDEX | Sim | Sim | Própria + Service | Real — mais completo |
| `/produtos/arrendamento-de-usinas` | INDEX | Sim | Sim | Própria + Service | Real |

### Segmentos (12)

`/segmentos` (INDEX, hub) + 11 filhos gerados de `src/data/segments`:
`agronegocio`, `bares-e-restaurantes`, `condominio`, `educacional`, `lazer`,
`religioso`, `residencial`, `saude`, `servico`, `turismo`, `varejo`.

Todos: INDEX · no sitemap · canonical Sim · metadata gerada programaticamente
(`Energia para {segmento} | Grupo BC Energia`, description derivada do primeiro
headline do JSON) · conteúdo real.
Exceção: `/segmentos/residencial` tem title/description sobrescritos manualmente.

### Regiões (7)

`/energia-solar-goiania`, `/energia-solar-anapolis`,
`/energia-solar-aparecida-de-goiania`, `/energia-solar-em-rio-verde`,
`/energia-solar-trindade`, `/energia-solar-palmas`,
`/energia-solar-no-tocantins`.

Todos: INDEX · no sitemap · canonical Sim · metadata própria em `REGIONAL_META`
· conteúdo real e diferenciado (`src/data/regions/index.ts`).
Observação: as URLs não seguem padrão único — 5 usam `energia-solar-<cidade>`,
1 usa `energia-solar-em-rio-verde` e 1 usa `energia-solar-no-tocantins`.

### Conteúdo (5 — 3 estáticas + 2 dinâmicas)

| URL | Status | Sitemap | Observação |
| --- | --- | --- | --- |
| `/conteudo` | NOINDEX | Não | Hub agregador; noindex,follow por `NOINDEX_ROUTES` |
| `/conteudo/blog` | NOINDEX | Não | Liberação controlada por `CONTENT_INDEXING_ENABLED = false` |
| `/conteudo/bc-cast` | NOINDEX | Não | idem |
| `/conteudo/blog/:slug` | NOINDEX | Não | 1 artigo real: `energia-solar-por-assinatura` |
| `/conteudo/bc-cast/:slug` | NOINDEX | Não | 2 episódios: `tiago-mendonca`, `rubens-fileti` |

### Sistema / Conversão / Legado (8)

| URL | Status | Observação |
| --- | --- | --- |
| `/contato/enviado` | NOINDEX | Página de sucesso; também `Disallow` no robots.txt |
| `/*` (404) | NOINDEX | `src/pages/not-found.tsx` emite `noindex` explícito |
| `/documentos/campanha_com_fidelidade_2anos` | REDIRECT | Redirect client-side p/ `/docs/*.pdf` |
| `/documentos/campanha_sem_fidelidade` | REDIRECT | idem |
| `/documentos/condicoes_gerais_gd` | REDIRECT | idem |
| `/documentos/condicoes_gerais_gd_v2` | REDIRECT | idem |
| `/documentos/condicoes_gerais_gd_alta_tensao` | REDIRECT | idem |
| `/documentos/condicoes_gerais_gd_externo` | REDIRECT | idem |

Observação: os redirects de `/documentos/*` são feitos via
`window.location.replace` (não HTTP 301). Sem valor SEO, mas preservam as URLs
do site antigo. Não estão no sitemap nem são pré-renderizados — correto.

PDFs em `public/docs/` sem rota `/documentos/` equivalente:
`modelo-contrato-varejista.pdf`, `nota-explicativa-prc.pdf`.

## 3. Totais

| Classificação | Qtd |
| --- | --- |
| Total de rotas | 50 (48 estáticas/dinâmicas + `*` 404 + agrupamento `/documentos`) |
| INDEX | 34 |
| NOINDEX | 6 (`/contato/enviado`, `/conteudo`, `/conteudo/blog`, `/conteudo/bc-cast`, `:slug` blog, `:slug` bc-cast) + 404 |
| REDIRECT | 7 (6 `/documentos/*` já existentes + `/produtos/irec` candidato) |
| REVISAR | 3 (`/sobre/leilao`, `/sobre/fator-de-alavancagem`, `/sobre/condicoes-gerais-varejistas`) |
| REMOVER | 0 |

## 4. Duplicidades identificadas

| URL A | URL B | Motivo | Recomendação preliminar |
| --- | --- | --- | --- |
| `/produtos/irec` | `/produtos/certificacao-renovavel-irec` | Mesmo produto (I-REC), mesma intenção de busca, textos sobrepostos; ambas com schema Service | Consolidar em `/produtos/certificacao-renovavel-irec` (conteúdo mais completo) e redirecionar `/produtos/irec` — decisão pendente de aprovação |
| `/energia-solar-palmas` | `/energia-solar-no-tocantins` | Município dentro do estado; risco de sobreposição de intenção | Manter as duas; garantir diferenciação (municipal x estadual) já iniciada no breadcrumb |
| `/energia-solar-goiania` / `-anapolis` / `-aparecida-de-goiania` / `-trindade` | entre si | Template regional comum | Conteúdo já foi diferenciado no Bloco 04; monitorar canibalização em GSC |
| `/conteudo` | `/conteudo/blog` + `/conteudo/bc-cast` | Hub agregador com pouco conteúdo próprio | Sem ação — todos noindex hoje |
| `/segmentos/residencial` | `/energia-solar-*` (páginas regionais) | Ambas atacam "energia solar por assinatura residencial" | Revisar foco: segmento = perfil; regional = localidade |

## 5. Auditoria do sitemap.xml

Comparação `public/sitemap.xml` (37 URLs) x `INDEXABLE_ROUTES` (37 rotas):

- **A — no projeto e ausentes do sitemap:** apenas as rotas intencionalmente
  noindex (`/contato/enviado`, `/conteudo*`, `/documentos/*`, 404). Nenhuma
  rota indexável faltando.
- **B — no sitemap e inexistentes no projeto:** nenhuma.
- **C — no sitemap que deveriam ser noindex:** nenhuma clara. Sob revisão:
  `/sobre/fator-de-alavancagem` e `/sobre/condicoes-gerais-varejistas`
  (páginas regulatórias sem intenção de busca relevante).
- **D — potencialmente duplicadas no sitemap:** `/produtos/irec` e
  `/produtos/certificacao-renovavel-irec` (ver seção 4).
- **E — URLs HTTP antigas:** nenhuma; 100% HTTPS.
- **F — domínio incorreto:** nenhuma; todas em `https://grupobcenergia.com.br`.
- **G — parâmetros/variações:** nenhuma; sem query string, sem trailing slash
  (exceto a home), sem duplicidade www/não-www.
- Sem `<lastmod>` — decisão deliberada (não há fonte confiável de data por
  página). `changefreq` monthly e `priority` derivada da profundidade.

## 6. Estado atual da canonical

- Definida em `src/components/Seo/Seo.tsx` via `react-helmet-async`,
  usando `buildCanonical()` de `src/config/site.ts`.
- Aplicada em `RootLayout.tsx` a **todas** as rotas, usando
  `meta.canonicalPath ?? pathname` — ou seja, cobertura de 100%.
- **Absoluta e HTTPS**, com o domínio oficial `https://grupobcenergia.com.br`.
- `buildCanonical` remove query string (`?`), hash (`#`) e trailing slash →
  **UTMs não contaminam a canonical**.
- Sem canonical duplicada: a tag estática do `index.html` foi removida no
  Bloco 02 e o prerender remove tags `data-rh="true"` do template.
- Nenhuma rota usa `canonicalPath` para apontar a outra página (não há
  canonical cruzada hoje — inclusive entre as duas páginas de I-REC).

## 7. Regras de robots já existentes

- **Ambiente:** `isPreviewEnvironment()` força `noindex,nofollow` em qualquer
  host fora de `grupobcenergia.com.br` / `www.` (proteção do duplicado).
- **Por rota:** `NOINDEX_ROUTES` (`/contato/enviado`, `/conteudo`,
  `/conteudo/blog`, `/conteudo/bc-cast`) → `noindex,follow`.
- **Conteúdo dinâmico:** `CONTENT_INDEXING_ENABLED = false` em
  `meta-content.ts` → artigos e episódios `noindex,follow`.
- **404:** `noindex` explícito em `src/pages/not-found.tsx`.
- **robots.txt:** `Allow: /` + `Disallow: /contato/enviado` +
  `Sitemap: https://grupobcenergia.com.br/sitemap.xml`.

## 8. Páginas com conteúdo provisório / mockado

| URL | Origem | Situação |
| --- | --- | --- |
| `/conteudo/blog` | `src/data/content/articles.ts` | 1 artigo real; hub ainda raso → noindex |
| `/conteudo/blog/energia-solar-por-assinatura` | idem | Conteúdo real (~1.180 palavras), mas noindex |
| `/conteudo/bc-cast` + 2 episódios | `src/data/content/episodes.ts` | Reais (YouTube), mas noindex |
| Home — seção BC Cast | `src/mooks/content.ts` (`bcCast`) | **Fonte mock ainda em uso** em `src/pages/home/Sections/Content/BcCast.tsx` |

Nenhuma ocorrência de "Lorem ipsum", "coming soon" ou "em breve" nas páginas
indexáveis. Os matches de `TODO` no código são comentários técnicos
(GTM/RD Station em `RootLayout.tsx` e `integrations.ts`), não texto visível.

## 9. URLs com risco SEO

1. `/produtos/irec` — duplicidade direta com `/produtos/certificacao-renovavel-irec`.
2. `/sobre/fator-de-alavancagem` — conteúdo regulatório curto e indexado.
3. `/sobre/condicoes-gerais-varejistas` — conteúdo essencialmente legal/PDF, indexado.
4. `/sobre/leilao` — conteúdo raso frente à concorrência do termo.
5. `/energia-solar-palmas` vs `/energia-solar-no-tocantins` — canibalização potencial.
6. `/segmentos/residencial` vs páginas regionais — mesma intenção "assinatura residencial".
7. `/documentos/*` — redirect client-side (JS), sem 301 real: crawlers podem
   registrar a URL intermediária.
8. Home (`/`) — usa `DEFAULT_META`, ou seja, o title/description da home é o
   mesmo objeto usado como fallback global de rotas sem meta.
9. `og:image` padrão ainda é `/bg-home.jpg` (não é arte dedicada 1200x630).
10. Toda a produção depende de `isPreviewEnvironment()`: enquanto o site rodar
    fora do domínio oficial, **100% das páginas ficam noindex**.
