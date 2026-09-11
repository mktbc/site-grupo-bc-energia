# PERFORMANCE 04 — Scripts de terceiros, GTM, pixels, YouTube e widgets

Escopo: apenas **como** os terceiros carregam. Nenhuma alteração de design, copy,
imagem, formulário ou estrutura comercial.

---

## 1. Inventário de terceiros

| Integração | Arquivo | Rota | Carregamento (antes) | Carregamento (depois) | Finalidade |
|---|---|---|---|---|---|
| Google Tag Manager `GTM-KWRL7CWP` | `index.html` (head + noscript) → `src/lib/integrations/thirdParty.ts` | todas | script inline no `<head>` + iframe noscript, em qualquer ambiente | injetado por JS, **em idle**, **só em produção**, ID vindo de `src/config/integrations.ts` | tag manager (GA4 e demais tags vivem dentro do container) |
| GA4 | — (dentro do GTM) | todas | não existe `gtag()` no código | igual | analytics |
| Meta Pixel | **não existe no código-fonte** | — | — | — | — |
| TikTok Pixel | **não existe no código-fonte** | — | — | — | — |
| RD Station (loader CloudFront) | `INTEGRATIONS.RDSTATION_TRACKING_SCRIPT_URL` | — | **URL configurada, script nunca injetado** (TODO em `FormWrap.tsx`) | inalterado — permanece inativo | tracking RD (aguarda decisão de negócio) |
| YouTube | `src/components/YouTubeEmbed/YouTubeEmbed.tsx` | `/sobre/quem-somos`, `/conteudo/bc-cast/episodio/*` | facade (thumb + play) | facade + `loading="lazy"` no iframe ativado | vídeos institucionais/podcast |
| Simulador (iframe) | `FormEmbed.tsx`, `SimuleAgora.tsx` | páginas com formulário / widget flutuante | `loading="lazy"` (widget só monta o iframe ao abrir o modal) | inalterado | captação de lead |
| Supabase (Edge Functions/config) | `src/lib/supabase.ts` | sob demanda | lazy (PERFORMANCE 02) | inalterado | backend |

Os avisos de "Meta Pixel duplicado" e "TikTok Pixel duplicado" de relatórios
anteriores **não se confirmam neste código-fonte**: não há `fbq`, `connect.facebook.net`,
`ttq` nem `analytics.tiktok.com` em nenhum arquivo. Se esses pixels existirem, estão
**dentro do container GTM** — a deduplicação, nesse caso, é tarefa do container e não do
código (registrado como pendência).

Classificação do `index.html`: **ESSENCIAL** = preload de fontes e da imagem LCP;
**MARKETING** = GTM (removido do HTML); **FUNCIONAL** = nenhum; **LEGADO/DUPLICADO** =
noscript do GTM (removido).

---

## 2. Mudanças realizadas

1. **GTM saiu do `index.html`** (snippet do `<head>` e `<noscript>`), evitando qualquer
   possibilidade de duplicidade HTML + React e removendo um script de terceiro do caminho
   crítico de render.
2. **Loader central** `src/lib/integrations/thirdParty.ts`:
   - inicialização única (guard por chave + checagem de `script[data-tp]`);
   - `requestIdleCallback` após o evento `load` (fallback `setTimeout` 1200 ms);
   - injeta `<script async>`;
   - **não roda em preview/localhost** (`isPreviewEnvironment()` de `src/config/site.ts`);
   - lê o ID de `INTEGRATIONS.GTM_ID`, que aceita override remoto via `app_config`.
3. **ID centralizado**: `GTM_ID: 'GTM-KWRL7CWP'` em `src/config/integrations.ts`. Nenhum ID
   de tag manager permanece hardcoded em componentes ou HTML.
4. **YouTube**: `loading="lazy"` também no iframe pós-interação. Facade preservada
   (thumbnail, proporção, botão de play e aparência idênticos).
5. **Auditoria**: `scripts/audit-third-party-performance.ts` (`npm run audit:thirdparty`).

Nada foi adicionado: nenhum pixel novo, nenhum preconnect novo (o GTM agora carrega
tarde demais para que preconnect traga benefício; criar um só aumentaria conexões
concorrentes com o LCP).

---

## 3. Preview vs produção

| | Preview / localhost | Produção (`grupobcenergia.com.br`) |
|---|---|---|
| GTM | não carrega | carrega em idle |
| GA4 | não carrega (vive no GTM) | via GTM |
| Meta / TikTok | inexistentes | inexistentes |
| RD Station | inativo | inativo |
| `window.dataLayer` | existe e recebe todos os eventos (debug preservado) | idem |
| Dados reais enviados | **não** | sim |

A decisão de ambiente vive em um único lugar (`isPreviewEnvironment`), sem `if`
espalhados.

---

## 4. Atribuição, UTMs e click IDs

`initUtmSession()` roda em `main.tsx` **antes** de qualquer terceiro, então o atraso do GTM
não afeta atribuição:

- UTMs completas + first touch + `landing_page` em `sessionStorage` (`bc_utm`);
- click IDs já capturados: `gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`;
- `_fbc` / `_fbp` e parâmetros de TikTok (`ttclid`): **apenas mapeados**, sem integração
  server-side nesta etapa.

Eventos SPA: `virtual_page_view` é emitido uma vez por rota real (guard por `useRef` +
`requestAnimationFrame`, à prova de StrictMode). Como o container não tem GA4 page_view
automático configurado para SPA, não há risco de `page_view` duplicado pelo código.
Eventos preservados sem renomear: `view_solution`, `cta_click`, `whatsapp_click`,
`form_start`, `form_step`, `form_submit`, `bill_upload`, `content_engagement`.

---

## 5. PII / LGPD

- Consentimento: **NÃO EXISTE** CMP no projeto. Em produção o GTM carrega antes de
  qualquer consentimento — registrado como pendência (não implementar CMP nesta etapa).
- Nenhum evento envia nome, e-mail, telefone, CPF/CNPJ, endereço ou conteúdo de conta de
  energia. `form_error` envia apenas o nome técnico do campo; `bill_upload`, apenas o tipo
  MIME; `whatsapp_click` não registra número.
- Um único listener global de clique (delegação em `useClickTracking`), sem duplicação.

---

## 6. Segurança / CSP

- Todos os scripts de terceiros usam HTTPS.
- Restam links de navegação em `http://` para `appenergia.com.br` (portal externo do
  cliente) — não são scripts; trocar para HTTPS depende de validação do portal. Reportados
  como WARNING pela auditoria.
- Não há CSP configurada no projeto; nenhuma foi criada nesta etapa.

---

## 7. Métricas

| | Antes | Depois |
|---|---|---|
| Scripts de terceiros no carregamento inicial (produção) | 1 (GTM, no `<head>`, bloqueante na descoberta) | 0 no caminho crítico — GTM em idle após `load` |
| Requests de terceiros no primeiro paint (preview) | 1 + iframe noscript | 0 |
| Embeds de YouTube imediatos | 0 (facade) | 0 (facade + lazy) |
| Iframes eager | 0 | 0 |

Impacto de main thread: **medição real pendente após publicação em produção**.

---

## 8. Pendências

1. Verificar dentro do container GTM se Meta Pixel / TikTok Pixel estão duplicados em tags.
2. Decidir sobre RD Station (hoje inativo, URL configurada).
3. Definir CMP/consentimento (LGPD) antes de ativar novos pixels.
4. Avaliar HTTPS no portal `appenergia.com.br`.
