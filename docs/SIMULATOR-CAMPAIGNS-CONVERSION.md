# SIMULADOR 02 — Integração com campanhas e conversão

Rota: `/simulador-de-economia` · `noindex,follow` · fora do sitemap · lazy route.
Escopo: leitura de campanha, funil de eventos e contexto da simulação.
**Nenhuma integração de CRM, payload ou backend foi alterada.**

## 1. Auditoria do tracking existente

| Camada | Arquivo | Situação |
| --- | --- | --- |
| Push central no Data Layer | `src/lib/analytics/dataLayer.ts` | Já existia. Único ponto de `window.dataLayer.push`, limpa chaves vazias, debug apenas em DEV. |
| Captura e persistência de UTM | `src/lib/analytics/utm.ts` | Já existia. `sessionStorage` (`bc_utm`, `bc_utm_first`, `bc_landing_page`), first touch preservado. |
| Eventos tipados | `src/lib/analytics/events.ts` | Já existia (`virtual_page_view`, `cta_click`, `whatsapp_click`, `form_start`, `form_submit`, `lead_generated`, etc.). |
| Hooks | `src/lib/analytics/useTracking.ts` | Já existia (rota, cliques delegados, formulário). |
| GTM | carregado pelo loader de terceiros existente | **Não alterado.** |

Nada foi recriado em paralelo: o módulo novo de campanha apenas lê o que já é persistido.

## 2. UTMs suportadas

Lista canônica em `UTM_KEYS` (`src/lib/analytics/utm.ts`):

`utm_source`, `utm_medium`, `utm_campaign`, `utm_campaign_id`, **`utm_campaign_code` (novo)**,
`utm_content`, `utm_term`, `utm_id`, `utm_project_id`, `utm_adset`, `utm_adset_id`,
`utm_adgroup`, `utm_ad_id`, `utm_product`, `utm_segment`, `utm_public`, `utm_region`,
`utm_state`, `utm_city`, `utm_contract`, `utm_lp`, `utm_fonte`, `utm_font`, `utm_channel`,
`gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`.

Campos pedidos que **não** viraram nomes novos (o projeto já tem equivalente):

| Pedido | Equivalente já usado |
| --- | --- |
| `utm_adcampaign` | `utm_campaign` |
| `utm_adcampaign_id` | `utm_campaign_id` |
| `utm_content_id` | `utm_ad_id` |
| `utm_project_id` | já existe, preservado exatamente como recebido |

Único acréscimo: `utm_campaign_code` (código interno de campanha, sem equivalente anterior).

## 3. Normalização — `src/lib/analytics/campaign.ts`

`getCampaignContext()` devolve, somente com campos suportados:

```ts
{ source, medium, campaign, campaignCode, adset, content, term, channel, product, landingPage }
```

Prioridade: querystring atual > sessão persistida. `campaignCode` resolve
`utm_campaign_code` → `utm_campaign_id` → `utm_id`.
`getCampaignEventParams()` achata o contexto nas mesmas chaves `utm_*` do site e
anexa o first touch (`first_utm_*`) tal como já é gravado.

## 4. First touch

Inalterado: escrito uma única vez por `initUtmSession()` em `bc_utm_first`
(`first_utm_source|medium|campaign|campaign_id|content`). Navegação interna e chegadas
sem UTM não sobrescrevem. Last touch permanece o comportamento atual (`bc_utm` recebe
merge da chegada mais recente). Nenhum novo modelo de atribuição foi introduzido.

## 5. Funil e eventos

```
simulator_view
  → simulator_state_select
  → simulator_value_change
  → simulator_result_view
  → simulator_cta_click
  → lead_form_view
  → form_submit / lead_generated  (evento global já existente)
```

| Evento | Trigger | Parâmetros próprios | Campanha anexada | PII |
| --- | --- | --- | --- | --- |
| `simulator_view` | montagem do simulador, 1× (guard de StrictMode) | `source: simulador` | sim | não |
| `simulator_state_select` | clique em estado | `state`, `discount_percent` | sim | não |
| `simulator_value_change` | slider, debounce 600 ms | `value_range` | sim | não |
| `simulator_result_view` | após interação real, debounce 800 ms, só quando muda `estado+faixa` | `state`, `discount_percent`, `value_range`, `estimated_savings_range` | sim | não |
| `simulator_cta_click` | clique no CTA | `source: simulador`, `destination: lead-form`, `cta_location: simulator`, `state`, `discount_percent`, `value_range` | sim | não |
| `lead_form_view` | bloco do formulário 30% visível, 1× por página | `source: simulador` + contexto da simulação | sim | não |
| `form_submit` / `lead_generated` | evento global existente (`trackLead`) | inalterado | inalterado | não |

Todos os eventos usam snake_case, sem duplicar nomes já existentes.

### Faixas

Conta (convenção já existente, mantida): `800-1199`, `1200-1999`, `2000-3499`, `3500-5000`.
Economia estimada: `0-199`, `200-399`, `400-699`, `700-999`, `1000+`.
O valor exato da conta e o valor exato da economia nunca saem do componente.

### Exemplos reais capturados em QA

```json
{ "event": "simulator_state_select", "page_path": "/simulador-de-economia",
  "state": "Tocantins", "discount_percent": 23,
  "utm_source": "meta", "utm_medium": "paid-social", "utm_campaign": "teste_simulador",
  "utm_content": "video01", "utm_lp": "simulador",
  "first_utm_source": "meta", "first_utm_campaign": "teste_simulador" }
```

```json
{ "event": "simulator_result_view", "state": "Goiás", "discount_percent": 25,
  "value_range": "2000-3499", "estimated_savings_range": "700-999",
  "utm_source": "google", "utm_medium": "cpc", "utm_campaign_code": "BCCAMPMKTXXX",
  "utm_channel": "search", "utm_term": "energia", "utm_lp": "simulador" }
```

```json
{ "event": "lead_form_view", "source": "simulador",
  "simulator_state": "Tocantins", "simulator_discount": 23,
  "simulator_value_range": "2000-3499", "simulator_savings_range": "400-699",
  "utm_source": "tiktok", "utm_campaign_code": "BCCAMPMKTXXX", "utm_channel": "tiktok" }
```

## 6. Contexto da simulação persistido

`src/lib/analytics/simulatorContext.ts` · `sessionStorage` · chave `bc_simulator`
(mesmo mecanismo das UTMs, **nenhum cookie novo**).

```json
{ "simulator_state": "TO", "simulator_discount": 23,
  "simulator_value_range": "2000-3499", "simulator_savings_range": "400-699" }
```

Valor exato armazenado: **não**. PII: **não**. Expira com a sessão do navegador,
seguindo a política de persistência já vigente.

## 7. Formulário (auditoria técnica)

`FormEmbed` é um **iframe cross-origin** (`https://simulador.bcenergiacomdesconto.com.br`).

- **Aceita parâmetros de URL?** Sim, no sentido de repasse: o componente já mescla a
  querystring da página pai no `src` do iframe. Ou seja, **as UTMs presentes na URL da
  landing page já chegam ao formulário hoje**, sem nenhuma alteração nossa.
- **Campos ocultos?** Não há acesso ao DOM do iframe (cross-origin) e o único contrato
  de `postMessage` existente é `simulator:ready` / `host:theme` / `host:request-resize`.
- **Submit detectável no front-end?** **Não.** O embed não emite mensagem de submit.
  Por isso nenhum evento novo de submit foi criado e nada foi duplicado: `form_submit`
  e `lead_generated` continuam sendo disparados apenas pelos formulários nativos
  (`trackLead`).
- **Contexto do simulador enviado ao formulário?** **Não.** Sem schema validado do
  destino, não se injeta `simulator_*` na URL do embed (limitação registrada abaixo).
- Payload do CRM / n8n / Salesforce: **inalterado**.

## 8. Templates de UTM

Landing page padronizada: **`utm_lp=simulador`** (valor único; não usar `simulator`,
`simulador-economia` ou `economia`). Produto de Geração Distribuída: `utm_product=GD`.
O estado **não** vai na UTM: o simulador já registra o estado escolhido pelo usuário.

### Meta Ads

```
https://<dominio>/simulador-de-economia?utm_source=meta&utm_medium=paid-social&utm_campaign={{campaign.name}}&utm_adset={{adset.name}}&utm_content={{ad.name}}&utm_term={{placement}}&utm_campaign_code=BCCAMPMKTXXX&utm_product=GD&utm_lp=simulador
```

### Google Ads

```
{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign_code={_bcid}&utm_channel={network}&utm_term={keyword}&utm_content={creative}&utm_product=GD&utm_lp=simulador
```

`{_bcid}` é custom parameter da conta e deve ser preservado.

### TikTok Ads

```
https://<dominio>/simulador-de-economia?utm_source=tiktok&utm_medium=paid-social&utm_campaign_code=BCCAMPMKTXXX&utm_channel=__PLACEMENT__&utm_campaign=__CAMPAIGN_NAME__&utm_adset=__AID_NAME__&utm_content=__CID_NAME__&utm_product=GD&utm_lp=simulador
```

Macros usadas são as nativas de cada plataforma; nenhuma macro foi inventada.

## 9. GA4 / GTM

Todos os eventos vão para `window.dataLayer` pelo helper central. Nenhum `gtag` direto
foi instalado e o carregamento do GTM não foi alterado. O mapeamento para GA4 é feito
no container (trigger de Custom Event por nome + variáveis de Data Layer para
`state`, `discount_percent`, `value_range`, `estimated_savings_range`, `source`,
`destination` e `utm_*`).

## 10. Privacidade

- Nenhum evento carrega nome, e-mail, telefone, empresa, CPF ou CNPJ.
- Valor da conta tratado como comportamento financeiro agregado, sempre em faixa.
- Nenhum cookie novo; apenas `sessionStorage` já existente.
- CMP permanece fora de escopo.

## 11. QA executado

Playwright em três cenários de campanha (`meta`, `google`, `tiktok`), com clique em
estado, ajuste de slider e clique no CTA. Verificado: leitura correta das UTMs,
`first_utm_*` gravado, um único `simulator_view` por carga, `simulator_result_view`
sem loop, `lead_form_view` único, contexto correto em `bc_simulator`, zero PII.

## 12. Limitações registradas

1. Submit do formulário não é observável no front-end (iframe cross-origin) — a
   conversão continua sendo medida pelo evento global dos formulários nativos.
2. O contexto do simulador não é anexado ao embed enquanto não houver schema validado
   do destino (SIMULADOR 03).
3. Last touch segue o comportamento atual de merge; não há modelo de atribuição novo.
