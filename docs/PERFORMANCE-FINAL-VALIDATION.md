# PERFORMANCE 05 — Core Web Vitals, laboratório e validação final da FASE 2

Escopo: medição, validação e correções técnicas de baixo risco. Nenhuma mudança
de design, copy, imagens ou estrutura comercial.

---

## 1. Ambiente de medição

| Ambiente | Usado nesta etapa | Confiabilidade |
|---|---|---|
| LAB LOCAL (build de produção servido por `vite preview`, Chromium headless, CPU 4x, rede ~4G lenta) | **sim** | comparativa (não é dado de campo) |
| PREVIEW LOVABLE | apenas verificação funcional (terceiros desativados) | baixa para vitals |
| PRODUÇÃO SIMULADA | build + prerender local | boa para bytes/requests, não para TTFB |
| PRODUÇÃO REAL / CrUX | **não disponível** (domínio ainda no site legado) | pendente de go-live |

Lighthouse CLI não está disponível no ambiente; as métricas foram coletadas via
`PerformanceObserver` (LCP, CLS, FCP, long tasks, navigation e resource timing),
**3 execuções por rota, mediana**. Por isso **não há Performance Score Lighthouse** —
marcado como `N/D`. TBT é reportado como **proxy** (soma de long tasks acima de 50 ms).

---

## 2. Matriz de rotas (mediana de 3 execuções)

### Mobile (CPU 4x, ~4G lenta)

| Rota | Score | LCP | CLS | TBT (proxy) | FCP | Requests / terceiros | Bytes | Status |
|---|---|---|---|---|---|---|---|---|
| `/` | N/D | 1,36 s | 0,000 | 243 ms | 1,36 s | 45 / 2 (fontes locais) | 1010 KB | OK |
| `/produtos/mercado-livre-de-energia` | N/D | 1,52 s | 0,010 | 467 ms | 1,52 s | 54 / 2 | 1218 KB | OK |
| `/segmentos/agronegocio` | N/D | 1,04 s | 0,045 | 264 ms | 1,04 s | 41 / 1 | 1065 KB | OK |
| `/energia-solar-goiania` | N/D | 0,96 s | 0,029 | 154 ms | 0,96 s | 41 / 1 | 752 KB | OK |
| `/contato` | N/D | 0,94 s | 0,016 | 1163 ms | 0,94 s | 42 / 1 | 860 KB | ATENÇÃO (TBT) |

### Desktop (sem throttling)

| Rota | Score | LCP | CLS | TBT (proxy) | FCP | Status |
|---|---|---|---|---|---|---|
| `/` | N/D | 0,27 s | 0,000 | 33 ms | 0,27 s | OK |
| `/produtos/mercado-livre-de-energia` | N/D | N/D* | 0,007 | 50 ms | 0,22 s | OK |

\* LCP não reportado: a página pinta e estabiliza antes do primeiro frame observável
sem throttling; FCP foi usado como referência.

Mobile e desktop **não são comparáveis** entre si (throttling diferente).

---

## 3. LCP por rota

O elemento LCP nas rotas piloto é **texto do herói** (`h1`/`h2`/`p`), não imagem:
o fundo do herói é `background-image` CSS, que não é candidato a LCP. Isso é
favorável — o LCP não depende do download da imagem.

- `/bg-home.webp` (50,7 KB) continua com `<link rel="preload" as="image" fetchpriority="high">`,
  descoberto no HTML, sem lazy, no primeiro slide do Swiper.
- Nas internas o `PageHeader` usa background WebP; **não** foi migrado para `<img>`
  porque o LCP já é o texto e o ganho não é comprovado.
- Breakdown TTFB/Load Delay/Render Delay: não fornecido pela API usada → `N/D` em lab;
  em produção usar PageSpeed Insights.

---

## 4. CLS — problema encontrado e corrigido

Sob rede lenta, a Home apresentava **CLS 0,0998** (limite 0,1), causado por um único
shift em ~1,1 s: o bloco do herói reflowava quando as fontes trocavam do fallback do
sistema para Onest/Barlow Condensed (`font-display: swap`).

Correção (sem alterar tipografia final):

- `src/styles/fonts.css`: fallbacks `Onest Fallback` e `Barlow Condensed Fallback`
  com `size-adjust` medido empiricamente contra Arial (102,5% e 79,6%) e overrides
  de ascent/descent/line-gap;
- `tailwind.config.ts`: fallbacks inseridos nas stacks `sans` e `display`.

Resultado: **CLS da Home 0,0998 → 0,0004**. Todas as rotas piloto ficaram ≤ 0,045.

Outras fontes de shift auditadas: Swiper (sem shift após init), FormEmbed
(iframe com altura reservada — `/contato` medido em 0,016), imagens (todas com
`width`/`height`), widget SimuleAgora (só monta o iframe ao abrir o modal).

---

## 5. TBT / long tasks / INP

- INP real é métrica de campo → **N/D em laboratório**; usados TBT-proxy e long tasks.
- Rotas piloto: 1 a 6 long tasks, majoritariamente hydration do React + init do Swiper.
- `/contato` concentra 1163 ms de TBT-proxy sob CPU 4x, associado ao iframe do
  formulário externo (origem de terceiro, código fora do nosso controle). O iframe já
  é `loading="lazy"`; **não foi alterado** para não quebrar postMessage/resize/envio.
  Classificado como ATENÇÃO, reavaliar com dados de campo.

### Correção de baixo risco aplicada

Navbar (desktop e mobile) fazia `setState` com a posição do scroll a cada evento,
re-renderizando o menu por pixel rolado. Agora usa estado booleano com throttle por
`requestAnimationFrame` e mesmo limiar de 200 px — **comportamento visual idêntico**.

---

## 6. Regressão das etapas anteriores

| Auditoria | Resultado |
|---|---|
| `audit:images` | 162 imagens, 0 erro, 0 aviso (71 infos de órfãos legados) |
| `audit:js` | inicial 470,9 KB bruto / 146,5 KB gzip · 55 chunks · 0 warning |
| `audit:fonts` | 10 WOFF2 · 224,6 KB · swap · 2 preloads · 0 Google Fonts · 1 warning (Roboto em `bc-form.css` legado) |
| `audit:thirdparty` | 0 ERROR · 3 WARNING (links `http://` appenergia) · GTM 1 inicialização |
| `audit:budget` | 0 ERROR · 2 WARNING (originais pesados não referenciados) |
| SEO: metadata, indexação, JSON-LD, semântica, robots/sitemap, conteúdo, 404/redirects | todos OK · 33 rotas prerender + 404 |
| `tsc --noEmit` | sem erros |
| `npm run build` | sucesso |

CSS/JS com hash em 55/55 chunks (cache busting OK). Nenhum CSS externo bloqueante,
nenhuma chamada a googleapis/gstatic.

---

## 7. Links HTTP do portal appenergia

URLs encontradas (`http://www.appenergia.com.br/Grupo_BC_Energia/`):

- `src/pages/produtos/solutions.data.ts` (2 ocorrências)
- `src/pages/produtos/consorcio-bc-energia/page.tsx`
- `src/pages/home/Sliders/Sliders.data.tsx`

Validação executada:

| Teste | Resultado |
|---|---|
| `http://www.appenergia.com.br/Grupo_BC_Energia/` | **522** (origem indisponível) |
| `https://www.appenergia.com.br/Grupo_BC_Energia/` | 301 → `https://site.grupobcenergia.com.br/Grupo_BC_Energia/` → **403** |

Nenhuma das duas versões entrega o recurso. Como não é possível confirmar um HTTPS
equivalente válido, **nada foi alterado**. Classificação: **PENDÊNCIA EXTERNA** —
o time responsável pelo portal precisa informar a URL oficial definitiva.

---

## 8. Performance budget

Script: `scripts/audit-performance-budget.ts` (`npm run audit:budget`),
agregador: `npm run audit:performance` (images + js + fonts + thirdparty + budget).

| Budget | Limite | Atual | Status |
|---|---|---|---|
| JS inicial (gzip) | 160 KB | 146,5 KB | OK |
| Maior chunk (gzip) | 70 KB | 65,2 KB | OK |
| Imagem individual | 500 KB | 2 arquivos acima | WARNING |
| Imagem LCP Home | 100 KB | 50,7 KB | OK |
| Preloads de fonte | 2 | 2 | OK |
| Peso total das fontes | 260 KB | 224,6 KB | OK |
| Scripts de terceiros no HTML inicial | 0 | 0 | OK |
| Cache busting | 100% | 55/55 | OK |

Os 2 avisos de imagem (`/img/global/footer-bg.png` 509 KB e `/img/pages/2147948282.jpg`
1037 KB) são **originais legados não referenciados** — o site consome as versões `.webp`
(footer 141 KB / cover WebP). Mantidos como fonte; remoção fica para limpeza de assets.

---

## 9. Infra — pendente de produção

- Core Web Vitals de campo (CrUX, PageSpeed Insights, Search Console)
- TTFB real (o TTFB local de ~6–11 ms reflete `vite preview`, não a infra)
- CDN, `Cache-Control` de assets versionados (recomendado `immutable`, 1 ano)
- Brotli/gzip do servidor (não pré-comprimimos arquivos)
- HTTP/2 ou HTTP/3: **PENDENTE DE PRODUÇÃO**
- Container GTM real, Meta/TikTok dentro do container, RD Station, CMP/LGPD
- RUM: **não implementado nesta etapa** (evolução futura, sem nova biblioteca agora)

---

## 10. Checklist

- [x] Imagens críticas otimizadas
- [x] LCP sem lazy
- [x] Dimensões reservadas
- [x] Code splitting
- [x] JS inicial reduzido
- [x] Fontes self-hosted
- [x] font-display swap
- [x] Preloads limitados
- [x] Terceiros fora do caminho crítico
- [x] YouTube facade/lazy
- [x] Preview sem marketing
- [x] Performance budget
- [ ] Core Web Vitals de campo após go-live
