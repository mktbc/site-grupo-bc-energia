# RUM — Real User Monitoring (Grupo BC Energia)

Camada de observabilidade de performance de usuários reais. Não altera design,
copy, SEO, rotas nem o tracking comercial existente.

Implementação: `src/lib/analytics/webVitals.ts` (sem biblioteca externa — apenas
`PerformanceObserver` e Performance API). Destino: o **mesmo Data Layer**
(GTM → GA4) já usado no site. Sem sistema paralelo, sem SDK no caminho crítico.

## Eventos

### `web_vital`

| Parâmetro         | Exemplo                          |
| ----------------- | -------------------------------- |
| `metric_name`     | `LCP` \| `CLS` \| `INP` \| `FCP` \| `TTFB` |
| `metric_value`    | `1834` (ms) ou `0.03` (CLS)      |
| `metric_rating`   | `good` \| `needs-improvement` \| `poor` |
| `route`           | `/segmentos/agronegocio`         |
| `route_pattern`   | `/segmentos/:slug`               |
| `page_type`       | `segment`                        |
| `navigation_type` | `initial` \| `soft`              |
| `previous_route`  | rota de origem (navegação SPA)   |
| `device_type`     | `mobile` \| `tablet` \| `desktop` |
| `viewport_width`  | `390`                            |
| `connection_type` | `4g` (quando disponível)         |

### `route_performance` (tempo por navegação interna)

`route_from`, `route_from_pattern`, `route`, `route_pattern`, `page_type`,
`route_transition_ms`, `metric_rating`, `navigation_type: soft`, `device_type`,
`viewport_width`, `connection_type`.

A transição é medida do **clique no link interno** até a rota renderizada
(`performance.mark('route_change_start')` → `route_ready`, com
`performance.measure('route_transition')`). Classificação: `good` ≤ 500 ms,
`needs-improvement` até 1000 ms, `poor` acima disso. É um proxy de "rota
pronta" — **não** é LCP.

### `chunk_load_error`

Emitido quando o código de uma rota falha ao carregar. Sempre enviado.

## Limites (Core Web Vitals)

| Métrica | good    | needs-improvement | poor    |
| ------- | ------- | ----------------- | ------- |
| LCP     | ≤ 2500ms| 2500–4000ms       | > 4000ms|
| INP     | ≤ 200ms | 200–500ms         | > 500ms |
| CLS     | ≤ 0.1   | 0.1–0.25          | > 0.25  |
| FCP     | ≤ 1800ms| 1800–3000ms       | > 3000ms|
| TTFB    | ≤ 800ms | 800–1800ms        | > 1800ms|

## Amostragem

20% das sessões (`SAMPLE_RATE`), ajustável. **Métricas `poor` e transições
lentas (> 1000 ms) são sempre enviadas**, mesmo fora da amostra. Um único envio
por métrica e por trecho de navegação, no `pagehide`/`visibilitychange` ou na
troca de rota — nunca por frame.

## Rotas e cardinalidade

Só o `pathname` é enviado — nunca query string, UTM, token ou ID pessoal.
Rotas dinâmicas viram padrão: `/produtos/:slug`, `/segmentos/:slug`,
`/conteudo/blog/:slug`, `/conteudo/bc-cast/:slug`, `/contato/:step`.
A dimensão `page_type` agrupa: `home`, `solution`, `segment`, `regional`,
`institutional`, `content`, `simulator`, `contact`, `success`, `other`.

## Privacidade / LGPD

Nenhum PII: sem nome, e-mail, telefone, CPF/CNPJ, dados de formulário ou
conteúdo digitado. Coleta dentro da mesma governança de analytics/consentimento
já adotada (GTM). Dispositivo em categoria ampla — sem fingerprinting.

## GTM / GA4

Criar tags GA4 Event para `web_vital` e `route_performance`, mapeando os
parâmetros acima como parâmetros de evento (e dimensões personalizadas para
`route_pattern`, `page_type`, `navigation_type`, `metric_rating`,
`device_type`). Analisar sempre em **P75**, separando mobile e desktop.

Alertas sugeridos: LCP > 2,5 s em mais de 25% das sessões · INP > 200 ms ·
CLS > 0,1 · `route_transition_ms` > 1000 ms. Prioridade para mobile.

## QA

Em desenvolvimento a amostragem é 100% e cada evento sai em
`console.debug('[rum]', …)`. Em produção, ative para a sua sessão com
`localStorage.setItem('bc_rum_debug','1')` e recarregue.

Roteiro validado: Home → Produtos → Produto específico → Segmentos → Segmento
específico → Regional → Blog → BC Cast → Simulador → Contato. Confirmar no
Preview do GTM que cada rota gera `route_performance` e que a carga inicial
gera `web_vital` para LCP/CLS/INP.

## Baseline

Registrar a mediana e o P75 por `page_type` e dispositivo antes de qualquer
mudança grande de front-end, e comparar depois — é assim que uma regressão
("/segmentos piorou") fica visível.
