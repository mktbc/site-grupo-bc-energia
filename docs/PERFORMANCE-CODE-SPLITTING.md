# PERFORMANCE 02 — Code splitting e redução do JavaScript inicial

Etapa executada sobre a base já otimizada em PERFORMANCE 01 (imagens/LCP/CLS).
Nenhuma alteração de design, layout, copy, imagens ou estrutura comercial.

---

## 1. Arquitetura anterior

- `src/App.tsx` já usava `React.lazy()` para 33 rotas; apenas a **Home** era
  import estático (decisão de LCP tomada no BLOCO 03).
- `vite.config.ts` já separava `react`, `swiper` e `supabase` via
  `rollupOptions.output.manualChunks`.
- **Problema real:** o chunk `supabase` (215 KB brutos / 55 KB gzip) era
  `modulepreload` no `index.html`, porque `src/main.tsx` chamava
  `loadAppConfig()` → `src/config/integrations.ts` → `import { supabase }`
  estático. Ou seja: **todas** as rotas baixavam o SDK do Supabase, mesmo as
  que nunca chamam backend.
- **Segundo problema:** módulos de dados grandes entravam no chunk inicial por
  causa de imports de "índice":
  - `src/config/routes.ts` e `src/config/meta.ts` importavam `SEGMENTS`
    (os 11 JSONs de segmento, ~42 KB) só para obter a lista de slugs/nomes;
  - `src/lib/analytics/pageType.ts` importava `REGIONS` (~38 KB de conteúdo
    editorial das 7 páginas regionais) só para mapear slug/path/UF.

## 2. Mudanças aplicadas (somente arquitetura de bundle)

| Arquivo | Mudança |
| --- | --- |
| `src/lib/supabase.ts` | Cliente agora é obtido por `getSupabase()` com `import('@supabase/supabase-js')` dinâmico e memoizado. |
| `src/config/integrations.ts` | `loadAppConfig()` usa `await getSupabase()`. |
| `src/services/blog/blog.ts`, `src/services/segments/segments.ts`, `src/services/salesForce/salesForce.ts` | `await (await getSupabase()).…` |
| `src/components/Forms/FormularioMercadoLivre.tsx`, `FormularioIREC.tsx`, `FormularioParceiro.tsx` | idem (SDK baixado só no submit). |
| `src/data/segments/slugs.ts` **(novo)** | Índice leve `slug → nome` (espelha o campo `title` de cada JSON). |
| `src/config/routes.ts`, `src/config/meta.ts`, `src/lib/analytics/pageType.ts` | Passam a usar `SEGMENT_SLUGS` / `SEGMENT_NAMES`. |
| `src/data/regions/registry.ts` **(novo)** | Registro leve (slug/path/scope/uf/place) das 7 regionais. |
| `src/lib/analytics/pageType.ts` | Usa `REGION_REGISTRY` no lugar de `REGIONS`. |
| `scripts/audit-js-bundles.ts` **(novo)** | Auditoria automática de chunks (`npm run audit:js`). |

Nenhum componente visual, texto, CTA ou rota foi alterado. A metadata gerada
para `/segmentos/*` continua idêntica (títulos e descrições já vinham de
`SEGMENT_META`, verificado por `scripts/audit-metadata.ts`).

## 3. Chunks — antes e depois

Carregamento inicial = `<script type="module">` + `modulepreload` do `index.html`.

### ANTES

| Arquivo | Bruto | Gzip | Conteúdo |
| --- | --- | --- | --- |
| `index-*.js` | 284,5 KB | 78,6 KB | shell, Home, componentes, meta, dados de segmentos e regiões |
| `supabase-*.js` | 214,0 KB | 55,2 KB | `@supabase/supabase-js` |
| `react-*.js` | 163,4 KB | 53,2 KB | react, react-dom, react-router |
| `swiper-*.js` | 97,4 KB | 30,1 KB | Swiper (hero da Home) |

- JS inicial: **759,4 KB brutos / 217,1 KB gzip** (4 arquivos)
- Maior chunk: `index` 284,5 KB
- Total JS: ~925 KB em 55 chunks

### DEPOIS

| Arquivo | Bruto | Gzip | Conteúdo |
| --- | --- | --- | --- |
| `index-*.js` | 215,4 KB | 64,8 KB | shell, Home, componentes, meta |
| `react-*.js` | 159,6 KB | 51,9 KB | react, react-dom, react-router |
| `swiper-*.js` | 95,1 KB | 29,4 KB | Swiper (hero da Home) |
| `supabase-*.js` | 210,1 KB | 54,3 KB | **sob demanda** (form/serviços/app_config) |
| `page-BSdwhDi9.js` | 47,9 KB | 8,7 KB | **sob demanda** — conteúdo das 7 regionais |

- JS inicial: **470,1 KB brutos / 146,1 KB gzip** (3 arquivos)
- Maior chunk inicial: `index` 215,4 KB
- Total JS: ~912 KB em 55 chunks

### Redução

- JS inicial bruto: 759,4 → 470,1 KB → **−289,3 KB (−38,1%)**
- JS inicial gzip: 217,1 → 146,1 KB → **−71,0 KB (−32,7%)**
- Número de chunks inalterado (sem fragmentação nova).

## 4. Decisões mantidas

- **Home estática no chunk inicial.** É a rota de maior tráfego e o LCP
  depende do hero renderizado imediatamente; torná-la lazy adicionaria um
  round-trip antes da primeira pintura. Decisão registrada, sem alteração.
- **Swiper no chunk inicial.** O carrossel do hero é *above the fold*; adiá-lo
  causaria flicker/CLS no bloco de maior destaque da Home (regra 35). Fica para
  uma etapa futura, se houver alternativa sem impacto visual. Os módulos já são
  importados de forma granular (`swiper/modules`: Autoplay, Pagination,
  Navigation) — nada de pacote inteiro.
- **`manualChunks` mantido** apenas para `react`, `swiper` e `supabase`
  (dependências estáveis, bom cache entre deploys). Sem chunks artificiais.
- **Tracking** não foi alterado. `src/lib/analytics/*` é código próprio e leve;
  só o acoplamento a dados pesados (regiões/segmentos) foi removido.
- **YouTube**: o `YouTubeEmbed` é uma fachada própria, sem biblioteca externa
  no JS inicial. Otimização de terceiros fica para a etapa seguinte.

## 5. Observações e limitações

- **Ícones**: não há biblioteca de ícones — `BCIcon` e SVGs oficiais são
  arquivos estáticos. Nada a otimizar.
- **Barrel files**: `src/components/index.ts` reexporta ~30 componentes, mas o
  Rollup faz tree-shaking (os formulários, por exemplo, ficam em chunks
  próprios). Sem evidência de custo → não refatorado.
- **`modulepreload`**: o `index.html` pré-carrega apenas os 3 chunks iniciais.
  As páginas lazy **não** são pré-carregadas. Como o prerender reaproveita o
  mesmo template, as rotas estáticas não pré-carregam o chunk específico da
  rota — melhoria possível no futuro (injetar `modulepreload` por rota no
  `scripts/prerender.ts`).
- **Erro de chunk**: não existe tratamento para `ChunkLoadError` /
  `Failed to fetch dynamically imported module`. Registrado como recomendação
  futura (recarregar a página uma vez ao detectar o erro).
- **Cache busting**: todos os chunks têm hash no nome (`index-BeHOfaFo.js`).
- **Source maps**: não são gerados em produção.
- **Fragmentação**: 21 chunks < 1 KB (wrappers de rota das regionais e páginas
  simples). São arquivos de rota, carregados um por navegação — sem impacto no
  carregamento inicial.
- **Dependências POSSIVELMENTE NÃO UTILIZADAS** (não removidas):
  - `clsx` — nenhuma importação encontrada em `src/`.
- **Resíduos da migração Next** (mantidos, ainda referenciados):
  `src/components/Image` (30 arquivos), `src/components/Link` (28 arquivos),
  `public/next.svg` e `public/vercel.svg` (sem referência no código —
  candidatos a remoção em etapa futura).

## 6. Validação

- `npm run build` → 33 rotas prerender + `404.html`, 0 falhas.
- `tsc --noEmit` (via `tsgo`) → 0 erros.
- `npm run audit:js` → 0 WARNING · 1 INFO (fragmentação < 1 KB).
- Auditorias SEO: metadata OK, indexação OK (33 index / 7 noindex / 1 redirect),
  dados estruturados OK (33), semântica HTML OK (33, 1 H1 por rota),
  robots/sitemap OK (33 URLs), 404/redirects OK, conteúdo OK.
- Rotas piloto testadas em `vite preview` (hard refresh): `/`,
  `/produtos/mercado-livre-de-energia`, `/segmentos/agronegocio`,
  `/energia-solar-goiania`, `/sobre`, `/produtos/gestao-de-energia` — todas com
  HTML prerenderizado, 1 H1 e title correto.
- Navegação SPA (`/` → `/produtos` → `/segmentos`): sem tela branca, sem erro
  de chunk, sem hydration mismatch. Único 404 de rede é o iframe externo do
  simulador (`simulador.bcenergiacomdesconto.com.br`), pré-existente.

## 7. Recomendações futuras

1. `modulepreload` por rota no prerender (ganho de latência na primeira
   navegação após hard refresh).
2. Tratamento de `ChunkLoadError` com reload único.
3. Reavaliar Swiper no hero (alternativa CSS scroll-snap) — só com validação
   visual lado a lado.
4. Remover `clsx`, `public/next.svg` e `public/vercel.svg` após confirmação.
