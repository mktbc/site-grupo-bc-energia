# SEO 06 — 404, soft 404 e redirects de infraestrutura

Documento técnico da ETAPA SEO 06. Nenhuma alteração visual foi feita em páginas
válidas; apenas a página Not Found e a lógica de metadata/erro foram tocadas.

## 1. Página Not Found

| Item | Valor |
| --- | --- |
| Componente | `src/pages/not-found.tsx` (rota `*` em `src/App.tsx` + fallback das rotas dinâmicas) |
| H1 | `Página não encontrada` (único; o "404" é `<p aria-hidden>` decorativo) |
| Title | `Página não encontrada \| Grupo BC Energia` |
| Description | `A página que você tentou acessar não foi encontrada ou não existe mais.` |
| Robots | `noindex,nofollow` (independente do ambiente) |
| Canonical | **nenhuma** (`noCanonical` em `NOT_FOUND_META`) |
| JSON-LD | nenhum (sem Organization/WebSite/Service/FAQ/BreadcrumbList) |
| Sitemap | fora |
| Links úteis | Home, `/produtos`, `/contato` |

Fonte da metadata: `NOT_FOUND_META` em `src/config/meta.ts`.
`resolveRouteMeta()` (`src/config/meta-content.ts`) usa `isKnownRoute()`
(`src/config/routes.ts`) e devolve `NOT_FOUND_META` para qualquer pathname fora
da whitelist — antes, rotas desconhecidas herdavam `DEFAULT_META` (texto da Home)
e canonical self-referencing da URL inexistente.

## 2. URLs testadas (preview, dev server)

| URL | Visual | Title | Robots | Canonical | H1 | JSON-LD | HTTP |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/url-que-nao-existe` | Not Found | própria | `noindex,nofollow` | ausente | Página não encontrada | nenhum | 200 |
| `/produtos/produto-inexistente` | Not Found | própria | `noindex,nofollow` | ausente | Página não encontrada | nenhum | 200 |
| `/segmentos/segmento-inexistente` | Not Found | própria | `noindex,nofollow` | ausente | Página não encontrada | nenhum | 200 |
| `/sobre/pagina-inexistente` | Not Found | própria | `noindex,nofollow` | ausente | Página não encontrada | nenhum | 200 |

Controle: `/produtos` continua com metadata própria, canonical self e BreadcrumbList.

## 3. Rotas dinâmicas

- `/segmentos/:segmento` — `getSegmentData()` valida contra `src/data/segments`; slug
  inválido renderiza `NotFound` (sem fallback genérico, sem metadata de outro segmento).
- `/produtos/*` — não há rota dinâmica; produtos são rotas explícitas. Qualquer
  slug inexistente cai na rota `*`.
- Regionais — não são dinâmicas: 7 rotas explícitas em `src/config/routes.ts`
  alimentadas por `src/data/regions`. Não existe geração automática por slug de cidade.
- `/conteudo/blog/:slug` e `/conteudo/bc-cast/:slug` — slug inválido devolve
  `NOT_FOUND_META` (noindex,nofollow, sem canonical).

## 4. Status HTTP (limitação de infraestrutura)

| Ambiente | Rota inexistente |
| --- | --- |
| Preview Lovable / dev (Vite) | **HTTP 200** com fallback SPA |
| Produção simulada (`VITE_SEO_ENV=production` + build) | **HTTP 200** (mesmo fallback) |
| Servidor estático (`vite preview`) | **HTTP 200** |

**LIMITAÇÃO DE INFRAESTRUTURA**: o hosting SPA serve `index.html` com status 200
para qualquer path desconhecido. Nenhum hack foi aplicado (sem meta refresh, sem
manipulação de `document.title`/`history` para simular status).

Mitigação já entregue: o build gera `dist/404.html` com o HTML real de
"Página não encontrada" (noindex,nofollow, sem canonical). O requisito de cut-over
é configurar o servidor para responder **HTTP 404 + `404.html`** em rotas desconhecidas.

## 5. Soft 404 — risco e mitigações

Risco residual: enquanto o servidor devolver 200 e o fallback for `index.html`
(HTML pré-renderizado da Home), um crawler que não execute JS pode ver conteúdo da
Home em uma URL inexistente.

Mitigações aplicadas:
- metadata própria, `noindex,nofollow` e ausência de canonical após a hidratação;
- H1 explícito "Página não encontrada", sem conteúdo comercial extenso;
- sem schema de página válida;
- fora do sitemap e sem links internos apontando para rotas inexistentes (auditado);
- `dist/404.html` pronto para ser servido pelo hosting.

Pendência: HTTP 404 real + página de erro do servidor (cut-over).

## 6. Redirects atuais (7)

| Origem | Destino | Motivo | Implementação atual | Esperado em produção |
| --- | --- | --- | --- | --- |
| `/produtos/irec` | `/produtos/certificacao-renovavel-irec` | consolidação de duplicata (SEO 04) | SPA `<Navigate replace>` | 301 |
| `/documentos/campanha_com_fidelidade_2anos` | `/docs/campanha_com_fidelidade_2anos.pdf` | URL do site antigo | `PdfRedirect` (client-side) | 301 |
| `/documentos/campanha_sem_fidelidade` | `/docs/campanha_sem_fidelidade.pdf` | URL do site antigo | `PdfRedirect` | 301 |
| `/documentos/condicoes_gerais_gd` | `/docs/condicoes_gerais_gd.pdf` | URL do site antigo | `PdfRedirect` | 301 |
| `/documentos/condicoes_gerais_gd_v2` | `/docs/condicoes_gerais_gd_v2.pdf` | URL do site antigo | `PdfRedirect` | 301 |
| `/documentos/condicoes_gerais_gd_alta_tensao` | `/docs/condicoes_gerais_gd_alta_tensao.pdf` | URL do site antigo | `PdfRedirect` | 301 |
| `/documentos/condicoes_gerais_gd_externo` | `/docs/condicoes_gerais_gd_externo.pdf` | URL do site antigo | `PdfRedirect` | 301 |

Chains: 0 · Loops: 0 · Destinos inválidos: 0 · 301 reais hoje: 0.

## 7. Meta refresh e redirects em JS

- `http-equiv="refresh"`: **nenhuma ocorrência** no projeto.
- `window.location.replace`: usado apenas em `src/pages/documentos/PdfRedirect.tsx`
  (redirect SEO permanente → entra na pendência de infraestrutura).
- `useNavigate` / `navigate(` / `<Navigate>`: navegação legítima da aplicação
  (formulários, UX), exceto `/produtos/irec`, que é redirect SEO permanente.

## 8. Domínio (pendências de infraestrutura)

- `http://grupobcenergia.com.br/*` → 301 → `https://grupobcenergia.com.br/*`
- `http://www.grupobcenergia.com.br/*` → 301 → `https://grupobcenergia.com.br/*` (salto único)
- `https://www.grupobcenergia.com.br/*` → 301 → `https://grupobcenergia.com.br/*`
- path e query string preservados; UTMs chegam ao destino (a canonical já remove query).

Implementação atual no React: **nenhuma** (correto — é responsabilidade do servidor).

## 9. QA pós-go-live

1. `curl -I https://grupobcenergia.com.br/url-que-nao-existe` → 404.
2. Conferir `noindex,nofollow` e ausência de canonical na 404.
3. `curl -I https://grupobcenergia.com.br/produtos/irec` → 301 para a rota canônica.
4. `curl -I` em cada `/documentos/*` → 301 para o PDF.
5. `curl -I http://www.grupobcenergia.com.br/produtos?utm_source=x` → 301 único preservando path/query.
6. Search Console: monitorar "Soft 404" e "Não encontrado (404)" por 30 dias.

## 10. Script de auditoria

`bunx tsx scripts/audit-404-redirects.ts` (após `npm run build`) valida 404 fora do
sitemap/rotas indexáveis, redirects fora do sitemap, destinos existentes, chains,
loops e links internos (OK / REDIRECT / QUEBRADO / NOINDEX).
