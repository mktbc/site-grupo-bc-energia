# Backend (Supabase externo)

Este projeto usa o **seu** projeto Supabase (`ufbkblkahyzfsjsoqmzg.supabase.co`),
**não** o Lovable Cloud. As chamadas de API/formulário passam por **Edge Functions**
e a config pública do site vem da tabela `app_config`.

## Edge Functions

Estão em `supabase/functions/`:

| Function            | Método | Secret usado         | O que faz                                              |
|---------------------|--------|----------------------|--------------------------------------------------------|
| `form-webhook`      | POST   | `FORM_WEBHOOK_URL`   | Recebe payload do formulário e repassa ao N8N          |
| `salesforce-numbers`| GET    | `SALESFORCE_API`     | Números da home (`?context=...`)                       |
| `blog-posts`        | GET    | `BLOG_API`           | Lista de posts do WordPress (`/posts` + query string)  |
| `segments`          | GET    | `API`                | Dados de um segmento (`?segment=<slug>`)               |

Todas: sem auth (`verify_jwt = false`), CORS aberto, sem token no upstream.

### Deploy (uma vez, na sua máquina)

```bash
npm i -g supabase
supabase login
supabase link --project-ref ufbkblkahyzfsjsoqmzg

# secrets (só se ainda não estiverem no Dashboard)
supabase secrets set FORM_WEBHOOK_URL="https://..." \
                    SALESFORCE_API="https://..." \
                    BLOG_API="https://..." \
                    API="https://..."

# deploy
supabase functions deploy form-webhook
supabase functions deploy salesforce-numbers
supabase functions deploy blog-posts
supabase functions deploy segments
```

## Config pública (tabela `app_config`)

Valores lidos direto no navegador (WhatsApp, tracking, vagas). Devem estar na
tabela `public.app_config (key text primary key, value text)` com RLS
permitindo `select` para `anon`.

Chaves esperadas (o site aceita `RDSTATION_TRACKING_CODE_SCRIPT_URL` como alias):

- `WHATSAPP_LINK`
- `WHATSAPP_LINK_PARCERIAS`
- `WHATSAPP_LINK_COMPRAS`
- `RDSTATION_TRACKING_SCRIPT_URL` (ou `RDSTATION_TRACKING_CODE_SCRIPT_URL`)
- `VAGAS_URL`
- `GTM_ID` (opcional)

O carregamento acontece em `src/main.tsx` via `loadAppConfig()` e popula o
objeto `INTEGRATIONS` em `src/config/integrations.ts`.

## Frontend

- `src/lib/supabase.ts` — client Supabase (URL + anon key públicas).
- `src/services/{blog,salesForce,segments}` — chamam `supabase.functions.invoke`.
- `src/components/Forms/*` — enviam via `form-webhook`.
