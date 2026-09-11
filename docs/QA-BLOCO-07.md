# QA final — Bloco 07

Execução: ambiente duplicado (preview), build de produção local.

## 1. QA técnico

| Item | Resultado |
| --- | --- |
| `tsc --noEmit` | sem erros |
| `npm run build` | sucesso, sem warnings de build |
| Warning de `key` em `AboutSegment` | corrigido (fragment → `<div key>`) |
| Console do navegador (10 rotas) | 0 erros; apenas avisos de terceiros (Meta Pixel duplicado, injetado por tags do GTM) e future flags do React Router v6 |
| Overflow horizontal em 360px | 0px |

## 2. Pré-renderização (SSG)

Implementada sem trocar de stack:

- `src/entry-server.tsx` — render de servidor com `renderToPipeableStream`
  (`onAllReady`), necessário porque as rotas usam `React.lazy`.
- `scripts/prerender.ts` — roda no hook `postbuild`, compila o bundle SSR,
  renderiza as 37 rotas de `INDEXABLE_ROUTES` e grava `dist/<rota>/index.html`.
- `src/main.tsx` — hidrata (`hydrateRoot`) quando o HTML já vem pré-renderizado;
  segue com `createRoot` nas rotas servidas apenas como SPA.
- Rotas `noindex` (`/contato/enviado`, `/conteudo/*`), 404 e `/documentos/*`
  **não** são pré-renderizadas de propósito.

Verificação no HTML inicial (sem JavaScript):

| Rota | H1 | H2 | Links | JSON-LD | Canonical |
| --- | --- | --- | --- | --- | --- |
| `/` | 1 | 19 | 133 | 2 | ok |
| `/produtos` | 1 | 14 | 125 | 1 | ok |
| `/segmentos/agronegocio` | 1 | 19 | 124 | 1 | ok |
| `/energia-solar-goiania` | 1 | 20 | 122 | 2 | ok |

Title, description, canonical, `og:*` e `twitter:*` presentes no HTML inicial de
todas as rotas amostradas — sem duplicidade (as tags estáticas `data-rh="true"`
são removidas do template no momento da injeção).

## 3. QA SEO

- 37 URLs no `sitemap.xml`, todas sob `https://grupobcenergia.com.br`.
- `robots.txt` já no formato de produção; `/contato/enviado` bloqueado.
- Proteção do ambiente duplicado ativa: preview responde `noindex,nofollow`
  em todas as rotas. Em produção a meta não é emitida.
- Links internos: varredura completa das 37 páginas geradas — 1 link quebrado
  encontrado (`/sobre/esg`), corrigido para `/sobre/sustentabilidade`.
- Imagens sociais (`ogImage`) de todas as rotas: 10/10 existem em `public/`.

## 4. QA de performance

Bundle inicial mantido: `index` 70 kB gz + `react` 53 kB gz; vendors isolados
(`swiper`, `supabase`). A pré-renderização melhora FCP/LCP por entregar o HTML
já pintado; nenhuma alteração de imagens ou fontes foi feita neste bloco.

## 5. QA de tracking

Sequência observada em navegação real: `virtual_page_view` → `view_solution`,
sem duplicidade. UTMs persistidos em `sessionStorage` (`bc_utm`) e mantidos
entre rotas. Nenhum dado pessoal no Data Layer.

## 6. Pendências para decisão humana

1. **Simulador externo** `https://simulador.bcenergiacomdesconto.com.br/4hed/`
   responde **404**. Widget preservado; requer nova URL ou desativação.
2. **Publicação do container GTM** e do RD Station — fora do escopo do código.
3. **Cabeçalhos de segurança** (HSTS, `X-Content-Type-Options`,
   `Referrer-Policy`, CSP) dependem da hospedagem e devem ser aplicados no
   servidor, não no bundle.

Checklists de publicação e reversão: `docs/CUTOVER.md` e `docs/ROLLBACK.md`.
