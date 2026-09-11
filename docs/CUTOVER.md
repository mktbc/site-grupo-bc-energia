# Checklist de cut-over — grupobcenergia.com.br

Documento operacional para a publicação em produção do projeto duplicado.
Nada aqui foi executado automaticamente: são passos humanos, na ordem.

## 0. Pré-requisitos

- [ ] Build local limpo: `npm run typecheck` e `npm run build` (o build já roda
      `predev/prebuild` → sitemap e `postbuild` → pré-renderização).
- [ ] Backup/tag do site atual em produção (ver `docs/ROLLBACK.md`).
- [ ] Janela de publicação combinada com marketing (tracking muda no mesmo momento).

## 1. Hospedagem

- [ ] Servir `dist/` como site estático.
- [ ] **Directory index ativo**: as rotas pré-renderizadas ficam em
      `dist/<rota>/index.html`. O servidor deve entregar esse arquivo para
      `/rota` e `/rota/`.
- [ ] **Fallback SPA**: qualquer caminho sem arquivo correspondente deve cair em
      `dist/index.html` com status **404** para rotas inexistentes (evita soft-404)
      e **200** para as rotas dinâmicas não pré-renderizadas.
- [ ] Redirect 301 de `www` → apex (ou o inverso, conforme decisão da TI), e de
      `http` → `https`.
- [ ] Compressão (gzip/brotli) e `Cache-Control` longo para `/assets/*`
      (hash no nome) e curto para HTML.

## 2. SEO

- [ ] Conferir `https://grupobcenergia.com.br/robots.txt` (já reflete produção).
- [ ] Conferir `https://grupobcenergia.com.br/sitemap.xml` (37 URLs, geradas de
      `src/config/routes.ts`).
- [ ] Confirmar que **não** há `<meta name="robots" content="noindex">` no HTML
      inicial das rotas públicas. A proteção de indexação é por host
      (`src/config/site.ts` → `isPreviewEnvironment`): em produção ela não dispara.
- [ ] Validar canonical de amostra (`/`, `/produtos/irec`, `/segmentos/agronegocio`,
      `/energia-solar-goiania`).
- [ ] Search Console: adicionar propriedade, enviar sitemap, solicitar indexação da Home.
- [ ] Validar rich results (Organization, WebSite, BreadcrumbList, Service, FAQPage).

## 3. URLs legadas

- [ ] `/documentos/<slug>` continuam funcionando (redirect para `/docs/<arquivo>.pdf`).
      Os 6 PDFs estão em `public/docs/`.
- [ ] Mapear no servidor eventuais URLs antigas do site Next que não existem mais
      → 301 para o equivalente atual (lista com a TI antes do go-live).

## 4. Tracking

- [ ] GTM `GTM-KWRL7CWP`: publicar o container com as tags/triggers descritas em
      `docs/TRACKING.md` (eventos `virtual_page_view`, `cta_click`, `whatsapp_click`,
      `form_start`, `form_error`, `lead_generated`).
- [ ] GA4: conferir recebimento dos eventos em tempo real após o go-live.
- [ ] RD Station: confirmar carregamento do loader configurado em `app_config`.
- [ ] Validar que nenhum evento envia PII (regra já aplicada no código).

## 5. Integrações

- [ ] Supabase: Edge Functions `form-webhook`, `salesforce-numbers`, `blog-posts`,
      `segments` ativas e com secrets configurados no ambiente de produção.
- [ ] Enviar um lead real de teste por cada formulário (Mercado Livre, I-REC,
      Parceiro) e confirmar chegada no CRM.
- [ ] **Simulador externo**: `https://simulador.bcenergiacomdesconto.com.br/4hed/`
      responde **404**. Decisão humana pendente: corrigir a URL, apontar para outro
      simulador ou desativar o widget `SimuleAgora` antes do go-live.

## 6. Pós-publicação (D+0 / D+1)

- [ ] Rodar Lighthouse em Home, uma solução, um segmento e uma regional.
- [ ] Conferir console sem erros em 5 rotas.
- [ ] Conferir Search Console (cobertura) em D+3 e D+7.
