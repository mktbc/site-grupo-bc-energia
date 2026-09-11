# SEO — Etapa 02: Validação de pré-renderização (SSG)

Data: 20/08/2026 · Escopo: somente pré-render/HTML inicial. Nenhuma alteração visual, de layout ou de conteúdo comercial.

## 1. Arquitetura atual de prerender

| Peça | Função |
| --- | --- |
| `src/config/routes.ts` | Fonte única de verdade: `INDEXABLE_ROUTES` (37 rotas) e `NOINDEX_ROUTES` |
| `scripts/generate-sitemap.ts` | `predev`/`prebuild` — gera `public/sitemap.xml` a partir de `INDEXABLE_ROUTES` |
| `src/entry-server.tsx` | Render SSR com `renderToPipeableStream` + `StaticRouter` + `HelmetProvider` (aguarda `onAllReady`, necessário por causa do `React.lazy`) |
| `scripts/prerender.ts` | `postbuild` — compila o bundle SSR em `dist-ssr/`, renderiza cada rota e grava o HTML em `dist/` |
| `src/components/Seo/Seo.tsx` | Title, description, robots, canonical, OG, Twitter e JSON-LD (react-helmet-async) |
| `src/config/site.ts` | Domínio oficial, canonical absoluta, imagem social, proteção de indexação |

Fluxo: `tsc && vite build` → `generate-sitemap` (pre) → `prerender` (post) → `dist/<rota>/index.html` **e** `dist/<rota>.html`.

Rotas `noindex` (`/contato/enviado`, `/conteudo*`), 404 e redirects de documentos continuam servidos pelo SPA — corretamente fora do prerender. Não há lista de URLs duplicada em outro arquivo.

## 2. Rotas

- Esperadas (INDEXABLE_ROUTES): **37**
- Geradas: **37**
- Falhas: **0**
- Tempo do build completo: **~31 s**

## 3. Rotas piloto

| Rota | Resultado |
| --- | --- |
| `/` | OK — title, description, canonical, robots, OG/Twitter, 1 H1, JSON-LD Organization + WebSite, 106 links internos |
| `/produtos/mercado-livre-de-energia` | OK — 3 blocos JSON-LD (Service, BreadcrumbList, FAQPage), 1 H1, 99 links |
| `/energia-solar-goiania` | OK — rota regional mantida no código; 2 blocos JSON-LD, 1 H1, 99 links |

## 4. Matriz de validação (37 rotas INDEX)

Validação executada sobre o HTML bruto de `dist/` (sem navegador). Todas as 37 rotas retornaram **OK** em todos os critérios:

| Critério | Resultado |
| --- | --- |
| HTML gerado | OK (37/37) |
| Title (único) | OK |
| Description (única) | OK |
| Canonical (única, HTTPS, domínio oficial, sem query) | OK |
| `og:url` = canonical | OK |
| Robots presente | OK |
| H1 único | OK |
| Conteúdo inicial (58 KB–155 KB dentro de `#root`) | OK |
| Links internos (92–106 por página) | OK |
| JSON-LD | OK (1 a 3 blocos por rota) |

Detalhe por grupo:

- `/`, `/contato`, `/produtos`, `/segmentos`, `/sobre` e subpáginas institucionais: 1–2 blocos JSON-LD.
- Produtos (6 rotas): 2–3 blocos (Service/BreadcrumbList/FAQ conforme a página).
- Regionais (7 rotas): 2 blocos.
- Segmentos (11 rotas): 1 bloco.

## 5. Problemas encontrados

1. **Metadata duplicada no HTML pré-renderizado** — o template `index.html` contém tags estáticas de SEO (description, og:*, twitter:*) sem `data-rh`, que sobreviviam ao prerender e conviviam com as tags do Helmet (2 descriptions, 2 og:title etc.).
2. **`<meta name="robots">` ausente** no HTML de todas as rotas indexáveis: o Seo só emitia robots em caso de bloqueio/noindex, e `isPreviewEnvironment()` retornava `false` no SSR.
3. **URL sem barra final caindo no fallback SPA** — servidores estáticos que resolvem `/rota` como `/rota.html` entregavam o `index.html` genérico (metadata da Home) em vez do HTML da rota. Confirmado com `vite preview`.

## 6. Correções aplicadas

- `scripts/prerender.ts`: o strip do template passou a remover também as tags estáticas de SEO (`name="description"`, `property="og:`, `name="twitter:`, `rel="canonical"`), eliminando a duplicidade.
- `scripts/prerender.ts`: além de `dist/<rota>/index.html`, grava `dist/<rota>.html`, garantindo o HTML pré-renderizado na URL canônica (sem barra final).
- `src/components/Seo/Seo.tsx`: robots agora sempre explícito (`index,follow` | `noindex,follow` | `noindex,nofollow`).
- `src/config/site.ts`: no SSR (sem `window`), o ambiente é lido de `VITE_SEO_ENV`. Enquanto o cut-over não acontece, o HTML estático sai com `noindex,nofollow` (proteção do Bloco 01 preservada).

Nenhuma alteração de layout, texto, CTA, cor, tipografia ou componente visual.

## 7. Cut-over (importante)

No go-live, buildar com:

```
VITE_SEO_ENV=production npm run build
```

Validado: com essa variável o HTML estático sai com `<meta name="robots" content="index,follow">`. Sem ela, permanece `noindex,nofollow`.

## 8. Hydration

Verificado com Chromium sobre o build servido estaticamente (`/`, `/produtos/mercado-livre-de-energia`, `/energia-solar-goiania`):

- nenhum erro de hydration (React #418 anterior desapareceu após a correção do item 3 — era o fallback SPA sendo hidratado);
- metadata não é removida nem duplicada após a hidratação (1 title, 1 description, 1 canonical, 1 robots);
- H1 permanece idêntico ao do HTML inicial;
- sem erros críticos no console (restam apenas avisos de terceiros: Meta/TikTok Pixel duplicado e Swiper loop).

## 9. Limitações conhecidas

- O HTML servido em URLs com querystring/UTM é o mesmo arquivo estático; o canonical continua limpo (`buildCanonical` remove query e hash).
- `/conteudo/*` e `/contato/enviado` não têm HTML pré-renderizado (por decisão: noindex).
- A imagem social padrão ainda é `/bg-home.jpg` (pendência de arte 1200x630).
- Duplicidade `/produtos/irec` × `/produtos/certificacao-renovavel-irec` permanece — será tratada em etapa posterior.
