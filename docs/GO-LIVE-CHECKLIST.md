# BLOCO 08 — GO / NO-GO para produção (grupobcenergia.com.br)

Documento de validação final. **Nada foi publicado, nenhum DNS/GTM/GA4/CRM foi alterado.**
Data da validação: 13/08/2026. Base validada: build limpo + 37 rotas pré-renderizadas.

---

## 1. Resumo do estado atual (verificado nesta rodada)

| Verificação | Resultado |
|---|---|
| `npm run typecheck` | OK (exit 0) |
| `npm run build` + `postbuild` (pré-render) | OK — “pré-render concluído (37 rotas)” |
| Canonical em todas as 37 rotas pré-renderizadas | OK — todas absolutas em `https://grupobcenergia.com.br` |
| `noindex` no HTML pré-renderizado | Ausente (correto: proteção é por host, em runtime) |
| Sitemap x rotas pré-renderizadas | 37 = 37, sem divergência |
| JSON-LD no HTML inicial | Presente em todas (1 a 3 blocos por rota) |
| Console (Home, /produtos/irec, /contato, mobile) | 0 erros |
| Overflow horizontal em 360 e 390 px | Nenhum |

---

## 2. Simulador externo

Achado importante: a URL usada **pelo código** não é `/4hed/`.
`src/helpers/utm.ts` monta a URL na raiz do domínio com UTMs fixas.

- `https://simulador.bcenergiacomdesconto.com.br/4hed/` → **404** (URL antiga, não referenciada no código)
- `https://simulador.bcenergiacomdesconto.com.br/?utm_font=Inbound&utm_campaign=SEO&utm_project_id=BCCAMPMKT033&utm_channel=...` → **200** (URL efetivamente usada)

| Página | Componente | CTA | URL atual | Impacto |
|---|---|---|---|---|
| Todas (widget flutuante) | `SimuleAgora` | “Simule agora!” | raiz + `utm_channel=Widget Site` | Responde 200 |
| `/contato` | `FormEmbed` | “Entre em contato” | raiz + `utm_channel=Formulario Site` | Responde 200 |
| `/produtos` e páginas de produto | `FormEmbed` | “Entre em contato” | idem | Responde 200 |
| `/segmentos/*` | `FormEmbed` | “Entre em contato” | idem | Responde 200 |
| `/energia-solar-*` (7 regionais) | `FormEmbed` | “Solicite sua análise” | idem | Responde 200 |

**Status: GO COM RESSALVA.** O endpoint responde 200 e existem caminhos alternativos de
conversão (formulários BC — Mercado Livre / I-REC / Parceiro — e WhatsApp). Ressalva:
**MARKETING/TI devem enviar um lead de teste real pelo simulador antes do go-live** para
confirmar que o fluxo completo (não só o HTTP 200) grava no CRM.

---

## 3. Google Tag Manager

| Item | Situação |
|---|---|
| Container ID | `GTM-KWRL7CWP` (head + noscript no `index.html`) |
| Snippet único | Sim — 1 ocorrência no head, 1 noscript; nenhum outro GTM no código |
| Data Layer | Funcionando — `virtual_page_view` e `view_solution` observados na navegação SPA |
| Duplicidade de page view | O GTM ainda emite `gtm.historyChange-v2`; ver checklist abaixo |
| Eventos documentados | `docs/TRACKING.md` |

### Checklist de publicação manual (MARKETING / ANALYTICS)
1. Criar gatilhos de **evento customizado** para: `virtual_page_view`, `view_solution`, `view_segment`, `view_regional`, `cta_click`, `whatsapp_click`, `form_start`, `form_step`, `bill_upload`, `form_submit`, `form_error`, `lead_generated`.
2. Criar variáveis de camada de dados: `page_path`, `page_title`, `page_type`, `solution`, `segment`, `region`, `region_uf`, `region_city`, `cta_name`, `cta_location`, `link_url`, `form_name`, `form_step`, `step_name`, `error_type`, `field_name`, `file_type`, `conversion_type`, `utm_*`, `first_utm_*`, `landing_page`.
3. **Desativar o page view automático** da tag de configuração GA4 e usar `virtual_page_view` (evita duplicidade com `historyChange`).
4. Publicar em ambiente de QA/preview do GTM antes do container de produção.
5. Validar no Preview Mode do GTM após o go-live.

---

## 4. GA4 — mapeamento recomendado (nenhuma tag criada)

| Evento (Data Layer) | Evento GA4? | Conversão? | Observação |
|---|---|---|---|
| `virtual_page_view` | Sim, como `page_view` | Não | Desativar page view automático |
| `view_solution` | Sim | Não | Parâmetro `solution` |
| `view_segment` | Sim | Não | Parâmetro `segment` |
| `view_regional` | Sim | Não | Parâmetros `region`, `region_uf` |
| `cta_click` | Sim | Não | Micro-conversão de análise |
| `whatsapp_click` | Sim | Opcional (secundária) | Só se o time tratar WhatsApp como lead |
| `form_start` | Sim | Não | Base de funil |
| `form_step` | Sim | Não | Multi-etapa futuro |
| `bill_upload` | Sim | Não | Helper pronto; hoje sem campo de arquivo |
| `form_error` | Sim | Não | Diagnóstico de UX |
| `form_submit` | Sim | Não | Evento técnico de envio |
| `lead_generated` | Sim | **Sim — conversão principal** | Carrega UTMs de sessão e first touch |

Não criar Measurement ID por aqui — ação de MARKETING/ANALYTICS.

---

## 5. Google Ads

- Conversão primária recomendada: **`lead_generated`** (importada do GA4 ou via tag do GTM).
- Secundárias possíveis, quando houver fonte confiável: `whatsapp_click`, `form_submit`.
- Conversões de negócio (lead qualificado, contrato) só quando o CRM devolver o dado — hoje não há essa fonte no site.
- Conversion ID / Label: **não criados** (MARKETING).

## 6. Meta Ads

- `lead_generated` → evento **Lead** do Meta Pixel, disparado por gatilho no GTM.
- **Não duplicar PageView**: o Pixel base já emite PageView; não adicionar PageView em `virtual_page_view` (ou desativar o automático, nunca os dois).
- CAPI: **não implementado** e fora deste escopo.
- Hoje **não existe Pixel Meta no código** — a instalação seria feita via GTM por MARKETING.

---

## 7. Headers de segurança (validação de INFRAESTRUTURA — TI)

Recomendação para o servidor/CDN que servir o `dist/`:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
X-Frame-Options: SAMEORIGIN            # ou frame-ancestors 'self' via CSP
```

CSP: publicar **primeiro em `Content-Security-Policy-Report-Only`** por pelo menos 7 dias.
Domínios necessários hoje (levantados no código):

| Diretiva | Domínios |
|---|---|
| `script-src` | `'self' 'unsafe-inline' https://www.googletagmanager.com https://*.google-analytics.com https://d335luupugsy2.cloudfront.net` |
| `connect-src` | `'self' https://*.supabase.co https://www.google-analytics.com https://*.analytics.google.com https://*.rdstation.com.br` |
| `frame-src` | `'self' https://simulador.bcenergiacomdesconto.com.br https://www.youtube-nocookie.com https://www.youtube.com https://www.googletagmanager.com` |
| `img-src` | `'self' data: https://www.googletagmanager.com https://*.google-analytics.com https://i.ytimg.com` |
| `style-src` | `'self' 'unsafe-inline' https://fonts.googleapis.com` |
| `font-src` | `'self' https://fonts.gstatic.com data:` |
| `form-action` | `'self'` |
| `frame-ancestors` | `'self'` |

Atenção: GTM pode injetar tags de terceiros (Meta, Ads) que exigem novos domínios —
revisar a CSP **depois** que o container de produção estiver publicado.

---

## 8. Domínio

`src/config/site.ts` é a fonte única: `SITE_URL = https://grupobcenergia.com.br`.

| Item | Aponta para | OK |
|---|---|---|
| `SITE_URL` | grupobcenergia.com.br | Sim |
| Canonical (37 rotas pré-renderizadas) | grupobcenergia.com.br | Sim |
| `og:url` / `twitter:*` | grupobcenergia.com.br | Sim |
| `sitemap.xml` (37 `<loc>`) | grupobcenergia.com.br | Sim |
| `robots.txt` (diretiva Sitemap) | grupobcenergia.com.br | Sim |
| JSON-LD (`@id`, `url`, logo) | grupobcenergia.com.br | Sim |

Nenhuma referência a URL de preview/Lovable nos artefatos de SEO.

## 9. Proteção de preview

`src/config/site.ts` → `isPreviewEnvironment()` compara `window.location.hostname` com
`PRODUCTION_HOSTS = ['grupobcenergia.com.br', 'www.grupobcenergia.com.br']`.
Se o host não estiver na lista, o `Seo` injeta `<meta name="robots" content="noindex,nofollow">`.

- Preview/localhost/staging → **noindex,nofollow** (runtime).
- Produção → indexação liberada **automaticamente**, sem alterar código.
- No HTML pré-renderizado não há `noindex` (confirmado nas 37 rotas) — a decisão acontece no cliente conforme o host.
- **Não foi removida nada** nesta rodada.

---

## 10. Formulários — checklist manual final (MARKETING + TI)

| Fluxo | Origem | Ação | Destino | Sucesso esperado | Evento esperado |
|---|---|---|---|---|---|
| Contato / análise de conta | `/contato`, produtos, segmentos, regionais (`FormEmbed`) | Preencher no iframe do simulador | Simulador externo → CRM | Tela de confirmação do simulador | Eventos do próprio simulador (fora do Data Layer do site) |
| Mercado Livre | Seção BC Form | Enviar formulário | Edge Function `form-webhook` → CRM | Redirecionamento para `/contato/enviado` | `form_start` → `form_submit` + `lead_generated` |
| I-REC | Página I-REC | Enviar formulário | `form-webhook` → CRM | `/contato/enviado` | `form_start` → `form_submit` + `lead_generated` |
| Parceiro | Página parceiro | Enviar formulário | `form-webhook` → CRM | `/contato/enviado` | `form_start` → `form_submit` + `lead_generated` |
| Erro de validação | Qualquer formulário BC | Enviar incompleto | — | Foco no primeiro campo com erro | `form_error` (`field_name`, sem PII) |
| Upload de conta | — | — | — | **Não existe campo de arquivo hoje**; helper `bill_upload` pronto | `bill_upload` (quando existir) |
| WhatsApp | Header, footer, CTAs | Clicar no link | `wa.link` / `wa.me` | Abre conversa | `whatsapp_click` |
| Página de sucesso | `/contato/enviado` | — | — | Mensagem de confirmação | `virtual_page_view` (rota noindex) |

---

## 11. UTMs (validado com parâmetros fictícios)

Teste executado com `?utm_source=test&utm_medium=test&utm_campaign=qa&utm_project_id=TESTE`:

- Captura na URL: OK
- `sessionStorage.bc_utm`: `{"utm_source":"test","utm_medium":"test","utm_campaign":"qa","utm_project_id":"TESTE"}`
- First touch (`bc_utm_first`) e `bc_landing_page`: gravados no boot e não sobrescritos
- Navegação interna (Home → `/produtos/irec`): valores preservados
- Data Layer: `virtual_page_view` e `view_solution` emitidos após a troca de rota
- Formulários: prioridade URL atual > sessão > `UTM_DEFAULTS` (`utm_project_id` preservado literalmente)

Nenhuma campanha real foi usada.

---

## 12. Pré-render — 37 rotas

Todas: indexáveis = sim, pré-renderizadas = sim, canonical = sim (absoluta, self-referente),
no sitemap = sim, sem `noindex` no HTML e permitidas no robots.

`/`, `/contato`, `/produtos`, `/produtos/mercado-livre-de-energia`, `/produtos/consorcio-bc-energia`,
`/produtos/gestao-de-energia`, `/produtos/irec`, `/produtos/certificacao-renovavel-irec`,
`/produtos/arrendamento-de-usinas`, `/segmentos`, `/segmentos/agronegocio`,
`/segmentos/bares-e-restaurantes`, `/segmentos/condominio`, `/segmentos/educacional`,
`/segmentos/lazer`, `/segmentos/religioso`, `/segmentos/residencial`, `/segmentos/saude`,
`/segmentos/servico`, `/segmentos/turismo`, `/segmentos/varejo`, `/sobre`, `/sobre/quem-somos`,
`/sobre/nossas-usinas`, `/sobre/lgpd`, `/sobre/leilao`, `/sobre/fator-de-alavancagem`,
`/sobre/sustentabilidade`, `/sobre/social`, `/sobre/condicoes-gerais-varejistas`,
`/energia-solar-goiania`, `/energia-solar-anapolis`, `/energia-solar-aparecida-de-goiania`,
`/energia-solar-em-rio-verde`, `/energia-solar-trindade`, `/energia-solar-palmas`,
`/energia-solar-no-tocantins`.

## 13. Rotas noindex finais

| Rota | Política | Onde |
|---|---|---|
| `/contato/enviado` | `noindex,follow` + `Disallow` no robots.txt | `NOINDEX_ROUTES` |
| `/conteudo/blog` | `noindex,follow` (conteúdo provisório) | `NOINDEX_ROUTES` |
| `/conteudo/bc-cast` | `noindex,follow` (conteúdo provisório) | `NOINDEX_ROUTES` |
| `/documentos/*` | Redirect para PDF, fora do sitemap | `PdfRedirect` |
| 404 | `noindex`, não pré-renderizada | `not-found` |
| Qualquer host ≠ produção | `noindex,nofollow` em tudo | `isPreviewEnvironment()` |

## 14. Redirects

| URL antiga | Destino | Status esperado | Validado? |
|---|---|---|---|
| `/documentos/<slug>` (6 documentos) | `/docs/<arquivo>.pdf` | 301/302 (hoje client-side) | Sim — arquivos presentes em `public/docs/` |
| `http://` | `https://` | 301 | Não — TI (infra) |
| `www` | apex (ou inverso) | 301 | Não — TI (infra) |
| URLs legadas do site Next | equivalente atual | 301 | **Não** — lista ainda não fornecida pela TI |

Nenhuma URL legada foi inventada.

## 15. OG image

Configurada em `src/config/site.ts` → `DEFAULT_OG_IMAGE_PATH = '/bg-home.jpg'`
(1736×898 ≈ 1.91:1, proporção correta para `summary_large_image`).
Arte oficial 1200×630 ainda não existe. **GO COM RESSALVA — DESIGN**: não bloqueia o lançamento;
para trocar basta colocar o arquivo em `public/social/og-default.jpg` e ajustar a constante.

## 16. Performance — baseline final (build de produção, ambiente local)

| Métrica | Valor |
|---|---|
| LCP (Home) | ~1,5 s |
| CLS (Home) | 0 |
| LCP (`/produtos/irec`) | ~1,8 s |
| CLS (`/produtos/irec`) | ~0,054 (abaixo do limite de 0,1) |
| Bundle inicial JS (gzip) | ~154 kB (`index` 70 + `react` 53 + `swiper` 30) |
| HTML pré-renderizado da Home | ~93 kB |
| Total de assets JS/CSS em `dist/assets` | ~1,0 MB (não comprimido, com code splitting) |

INP e dados de CrUX **não** foram medidos — exigem tráfego real em produção.

## 17. Mobile — smoke test (360 e 390 px)

Home e `/contato` em 360 e 390 px: sem overflow horizontal, sem erros de console.
Header, hero, CTAs, cards, menu, footer e botão flutuante renderizando corretamente.
Verificação manual pendente pós-deploy: abertura real do WhatsApp e do simulador em device físico.

---

## 18. Checklist GO / NO-GO

| Item | Status | Responsável | Bloqueia deploy? | Ação |
|---|---|---|---|---|
| Build | GO | DESENVOLVIMENTO | — | — |
| Typecheck | GO | DESENVOLVIMENTO | — | — |
| SEO (metadata, OG, JSON-LD) | GO | DESENVOLVIMENTO | — | — |
| Pré-render (37 rotas) | GO | DESENVOLVIMENTO | — | — |
| Sitemap | GO | DESENVOLVIMENTO | — | Enviar no Search Console após o go-live |
| Robots | GO | DESENVOLVIMENTO | — | Conferir no domínio final |
| Canonical | GO | DESENVOLVIMENTO | — | — |
| Proteção de preview | GO | DESENVOLVIMENTO | — | Nada a remover |
| Tracking / Data Layer | GO | DESENVOLVIMENTO | — | — |
| GTM (publicação do container) | GO COM RESSALVA | MARKETING / ANALYTICS | Não | Publicar container com os gatilhos da seção 3 |
| GA4 | GO COM RESSALVA | ANALYTICS | Não | Criar tags e marcar `lead_generated` como conversão |
| Google Ads / Meta | GO COM RESSALVA | MARKETING | Não | Configurar após GA4 |
| Formulários BC (envio real) | GO COM RESSALVA | TI / MARKETING | Não | Lead de teste por formulário em produção |
| Simulador externo | GO COM RESSALVA | MARKETING / TI | Não | Endpoint responde 200; validar lead de ponta a ponta |
| OG image oficial | GO COM RESSALVA | DESIGN | Não | Entregar arte 1200×630 |
| Headers de segurança | GO COM RESSALVA | TI | Não | Aplicar seção 7; CSP em report-only primeiro |
| SSL | PENDENTE | TI | **Sim** | Certificado válido no apex e www |
| DNS | PENDENTE | TI | **Sim** | Apontar domínio e definir apex/www |
| Redirects legados | PENDENTE | TI | Não | Fornecer lista de URLs antigas |
| Rollback | GO | DESENVOLVIMENTO / TI | — | `docs/ROLLBACK.md` |

Nenhum item **NO-GO** identificado.

## 19. Responsáveis por área

DESENVOLVIMENTO (código, build, SEO técnico) · TI (DNS, SSL, headers, redirects, servidor) ·
MARKETING (GTM, campanhas, conteúdo) · ANALYTICS (GA4, conversões) · DESIGN (OG image, artes).

---

## 20. Checklist do dia do deploy

1. Backup/tag da versão atual em produção.
2. Confirmar rollback testado (`docs/ROLLBACK.md`).
3. Confirmar DNS (apex + www) propagado.
4. Confirmar SSL válido nos dois hosts.
5. Publicar o build (`dist/`) com directory index + fallback SPA.
6. Validar o domínio (`https://grupobcenergia.com.br` responde 200).
7. Validar `/robots.txt`.
8. Validar canonical em 5 rotas de amostra.
9. Validar `/sitemap.xml` (37 URLs).
10. Validar Home (visual, hero, CTAs).
11. Validar páginas estratégicas (1 produto, 1 segmento, 1 regional, `/contato`).
12. Validar formulários com lead de teste.
13. Validar links de WhatsApp.
14. Validar Data Layer (`virtual_page_view`, `cta_click`, `lead_generated`).
15. Validar GTM em Preview Mode.
16. Validar console sem erros em 5 rotas.
17. Validar mobile (360/390) em device real.
18. Monitorar erros na primeira hora.

## 21. Checklist pós-deploy

**15 minutos** — disponibilidade das 37 rotas; console sem erros; 1 formulário de teste; WhatsApp; Data Layer na Home.
**1 hora** — leads chegando ao CRM; GA4 em tempo real; erros 404/500; redirects de documentos; verificar ausência de `noindex` em produção.
**24 horas** — Search Console (propriedade + sitemap enviado); indexação da Home; primeiros dados de tracking; performance (Lighthouse em 4 rotas); volume de leads vs. baseline.
**7 dias** — cobertura no Search Console; Core Web Vitals (CrUX, quando houver dados); qualidade dos leads e atribuição por UTM; 404 no relatório; ajuste da CSP de report-only para enforce.

## 22. Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Simulador falhar no fluxo real de lead | Média | Alto | Teste ponta a ponta antes do go-live; formulários BC e WhatsApp como alternativa |
| GTM publicado com page view duplicado | Média | Médio | Desativar page view automático do GA4 (seção 3) |
| URLs legadas sem redirect → 404 | Média | Médio | TI fornecer lista antes do go-live |
| CSP quebrar terceiros | Média | Alto | Report-only por 7 dias |
| Fallback SPA devolvendo 200 em rota inexistente (soft-404) | Baixa | Médio | Configurar 404 real (ver `docs/CUTOVER.md`) |

## 23. Rollback

Procedimento completo em `docs/ROLLBACK.md`. Resumo: restaurar o build anterior (tag/backup),
invalidar cache da CDN, confirmar Home e um formulário, e comunicar MARKETING (tracking volta ao estado anterior).

## 24. Monitoramento

Console do navegador e logs do servidor (D+0), Search Console (D+1, D+3, D+7),
GA4 em tempo real (D+0) e relatórios de conversão (D+7), chegada de leads no CRM (contínuo).

---

## PROJETO PRONTO PARA PRODUÇÃO?

**SIM, COM RESSALVAS.** Não há bloqueio de código.

Ressalvas:
1. **TI** — DNS e SSL do domínio oficial (únicos itens que realmente bloqueiam a publicação).
2. **TI** — aplicar headers de segurança; CSP em report-only primeiro.
3. **TI** — fornecer a lista de URLs legadas para os 301.
4. **MARKETING/TI** — validar lead de ponta a ponta no simulador externo (endpoint responde 200; `/4hed/` é URL antiga e não é usada pelo código).
5. **MARKETING/ANALYTICS** — publicar o container GTM e criar as tags GA4/conversões.
6. **DESIGN** — arte social oficial 1200×630 (hoje usa `/bg-home.jpg`, válida).
7. **TI/DEV** — após o go-live, conferir que a proteção de preview deixou de aplicar `noindex` no domínio oficial.
