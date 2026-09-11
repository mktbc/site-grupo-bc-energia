# Migração Next.js → React + Vite — Pontos de integração para a TI

Este projeto foi **portado de Next.js (App Router)** para **React + Vite + react-router-dom v6**
(compatível com o editor Lovable). A migração foi **somente de front-end**: design, páginas,
componentes, estilos e assets. **Nenhum backend, API route ou segredo foi portado.**

Toda a UI está intacta; as fontes de dados que dependiam de backend foram substituídas por
**mocks/placeholders** claramente marcados com `// TODO: TI reconectar`. Abaixo está a lista
completa dos pontos que a TI precisa religar.

---

## 1. Configuração central

Quase tudo está centralizado em **`src/config/integrations.ts`**. O ideal é ler estes valores de
variáveis de ambiente do Vite (ex.: `import.meta.env.VITE_FORM_WEBHOOK_URL`).

| Chave | O que era (Next) | Onde é usada hoje |
|---|---|---|
| `FORM_WEBHOOK_URL` | rota `/api/form` → `N8N_WEBHOOK_URL` | `src/components/Forms/Formulario*.tsx` |
| `SALESFORCE_API` | `SALESFORCE_API` → `getNumbers` | doc/ref (mock em `services/salesForce`) |
| `BLOG_API` | rota `/api/blog` → `BLOG_API` | doc/ref (mock em `services/blog`) |
| `SEGMENTS_API` | `API/segments` | opcional (há dados locais) |
| `WHATSAPP_LINK_COMPRAS` | `WHATSAPP_LINK_COMPRAS` | `src/components/Navbar/Items.data.ts` |
| `WHATSAPP_LINK_PARCERIAS` | `WHATSAPP_LINK_PARCERIAS` | reservado |
| `RDSTATION_TRACKING_SCRIPT_URL` | `RDSTATION_TRACKING_CODE_SCRIPT_URL` | ver item 5 |
| `GTM_ID` | hardcoded `GTM-KWRL7CWP` | ver item 5 |

---

## 2. Formulários (envio)

- **Arquivos:** `src/components/Forms/FormularioMercadoLivre.tsx`, `FormularioIREC.tsx`, `FormularioParceiro.tsx`
- **Hoje:** `const FORM_API = INTEGRATIONS.FORM_WEBHOOK_URL` (string vazia → não envia).
- **Reconectar:** apontar `FORM_WEBHOOK_URL` para o endpoint de recebimento (antes a rota Next
  `/api/form` repassava para `N8N_WEBHOOK_URL`). A UI, validações e estados de sucesso/erro já funcionam.
- **Obs.:** `src/components/FormWrap/FormWrap.tsx` usa um envio **simulado** (setTimeout → sucesso),
  igual ao original — não faz POST. Se quiserem que ele envie de verdade, ligar ao mesmo endpoint.

## 3. Números da home (Salesforce)

- **Arquivo:** `src/services/salesForce/salesForce.ts` (mock) → consumido por `src/components/Numbers/Numbers.tsx`.
- **Hoje:** retorna números **fictícios** (placeholder) para manter a seção populada.
- **Reconectar:** trocar o mock por `fetch` ao Salesforce (antes:
  `${SALESFORCE_API}/getDadosParaConsulta-EILPjWCr1IDO7sF?query=<context>`).
- ⚠️ **Os valores atuais são inventados** — substituir pelos reais.

## 4. Blog (posts)

- **Arquivo:** `src/services/blog/blog.ts` (mock) → consumido por `src/hooks/blog/getBlogPosts.tsx`
  e pelas seções `Blog` da home / landing pages.
- **Hoje:** retorna `[]` → o carrossel exibe "Nenhum artigo publicado." (mesmo comportamento do
  original, cuja rota `/api/blog` já estava desativada).
- **Reconectar:** retornar os posts reais (antes: `${BLOG_API}/posts`, WordPress/Yoast).

## 5. Scripts de rastreamento (GTM + RD Station)

- **GTM:** ficava no `<head>`/`<body>` do `app/layout.tsx` (ID `GTM-KWRL7CWP`). **Removido.**
  Reinserir no `index.html` (há um comentário TODO no lugar) ou via lib.
- **RD Station:** loader que ficava no layout e no `FormWrap`. **Removido.**
  Reinserir usando `RDSTATION_TRACKING_SCRIPT_URL`.

## 6. Segmentos — **funcionando com dados locais**

- **Rota:** `/segmentos/:segmento` (`src/pages/segmentos/segmento/page.tsx`).
- Os **11 JSONs** de conteúdo (agronegócio, residencial, etc.) foram **empacotados** em
  `src/data/segments/`. A rota renderiza 100% offline — **não precisa de ação da TI.**
- **Opcional:** se preferirem servir via API externa, ver `src/services/segments/segments.ts`.

## 7. Documentos / PDFs

- As rotas Next `src/app/documentos/*` (que serviam PDFs via Node) **não foram portadas**.
- Os PDFs continuam em `public/docs/*.pdf` e podem ser linkados diretamente (ex.: `/docs/condicoes_gerais_gd.pdf`).
- **Reconectar:** se algum link apontava para `/documentos/...`, trocar para o caminho direto do PDF.

## 8. Simulador (iframe) — **funcionando**

- `FormEmbed` e `SimuleAgora` usam o iframe público `simulador.bcenergiacomdesconto.com.br`.
- É um embed externo, não backend — **continua funcionando sem ação da TI.**

---

## Variáveis de ambiente originais (referência)

Estavam em `next.config.mjs` / `exemplo-env.js`:

```
API, SALESFORCE_API, BLOG_API, WHATSAPP_LINK_PARCERIAS, WHATSAPP_LINK_COMPRAS,
RDSTATION_TRACKING_CODE_SCRIPT_URL, VAGAS_URL, N8N_WEBHOOK_URL
```

No Vite, o padrão é prefixar com `VITE_` e acessar via `import.meta.env.VITE_*`.

---

## Como rodar

```bash
npm install
npm run dev        # servidor de desenvolvimento (porta 8080)
npm run typecheck  # checagem de tipos (verde)
npm run build      # build de produção (verde) → dist/
npm run preview    # pré-visualiza o build
```

---

## DECISÃO HUMANA NECESSÁRIA — Simulador externo (404)

**URL referenciada:** `https://simulador.bcenergiacomdesconto.com.br/` (com UTMs)
Uma variação anteriormente citada — `simulador.bcenergiacomdesconto.com.br/4hed/` — retorna **404**.

**Onde é usado**
| Página / Componente | Arquivo | Finalidade |
| --- | --- | --- |
| Widget flutuante "Simule agora" (todas as páginas) | `src/components/SimuleAgora/SimuleAgora.tsx` | iframe modal do simulador (`utm_channel=Widget Site`) |
| Bloco de formulário embedado (Contato, produtos, regionais) | `src/components/FormEmbed/FormEmbed.tsx` | iframe do simulador (`utm_channel=Formulario Site`) |
| Construção das URLs + UTMs | `src/helpers/utm.ts` | `buildSimulatorUrl()`, `SIMULATOR_FORM_URL`, `SIMULATOR_WIDGET_URL` |

**Comportamento atual:** o iframe carrega a raiz do domínio do simulador; a comunicação
`postMessage` (tema/altura) só funciona se a página remota responder. Se a URL estiver fora do ar,
o iframe fica em branco/altura mínima — não há erro de JS nem quebra de layout no site.

**Status:** integração **preservada sem alteração** (URL, parâmetros, número de WhatsApp e eventos
intactos). A correção da URL definitiva depende de confirmação do time responsável pelo simulador.
