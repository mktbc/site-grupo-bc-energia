# Performance — budgets e RUM (Core Web Vitals de campo)

## Budgets (validados no build)

`npm run audit:performance` roda imagens, JS, fontes, terceiros e budget.

| Métrica              | Budget                    |
| -------------------- | ------------------------- |
| LCP (p75 campo)      | ≤ 2,5 s                   |
| INP (p75 campo)      | ≤ 200 ms                  |
| CLS (p75 campo)      | ≤ 0,1                     |
| JS inicial (gzip)    | ≤ 160 KB                  |
| Maior chunk (gzip)   | ≤ 70 KB                   |
| Imagem individual    | ≤ 500 KB                  |

Estado atual: **170 KB gzip iniciais** (3 chunks: app, react, swiper), contra
210 KB antes desta fase. O restante do gap vem do Swiper, usado pelo carrossel
do Hero (elemento LCP) — remover exigiria alterar o Hero aprovado.

## O que mudou nesta fase

- **Framer Motion removido** do projeto. Efeitos de opacity/translate agora
  usam `useReveal` (IntersectionObserver nativo) + classe `.bc-reveal` no CSS,
  com `prefers-reduced-motion` respeitado. Economia: ~40 KB gzip iniciais.
- **Imagem órfã de 1 MB** (`/img/pages/2147948282.jpg`) removida; a versão WebP
  (75 KB) já era a usada em produção.
- **Aviso React `fetchPriority`** corrigido no slide do Hero.
- Preload continua restrito a: 2 fontes críticas + 1 imagem LCP. Apenas o
  primeiro slide do carrossel é `eager`/`fetchpriority=high`.

## RUM

`src/lib/analytics/webVitals.ts` — sem biblioteca externa, apenas
`PerformanceObserver`:

- coleta LCP, CLS, INP, FCP e TTFB;
- **amostragem de 20%** das sessões;
- envio único por métrica, no `pagehide`/`visibilitychange`;
- evento `web_vitals` no dataLayer (GTM/GA4), com `metric_name`,
  `metric_value`, `metric_rating`, `navigation_type` (`initial`/`soft`),
  `device_type`, `connection_type` e `page_path`;
- **sem PII**;
- navegações internas da SPA fecham o trecho anterior via
  `reportSoftNavigation()`, chamado em `useRouteTracking` — fallback para
  navegadores sem a Soft Navigations API.

No GTM, criar uma tag GA4 Event para `web_vitals` e analisar por
`page_path`/`device_type`; complementar com Search Console + CrUX após o
go-live.
