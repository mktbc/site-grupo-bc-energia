# BLOCO 09 — GO LIVE + Validação Pós-Publicação

> Documento vivo. Atualizar a cada etapa do cut-over.
> Última verificação automatizada: **13/08/2026 (UTC)**.

---

## 1. Status atual — RESUMO EXECUTIVO

**Classificação: GO LIVE BLOQUEADO (aguardando cut-over de infraestrutura pela TI).**

| Item | Status | Evidência |
| --- | --- | --- |
| DNS `grupobcenergia.com.br` | Resolve para `185.158.133.1` | `getent hosts` |
| SSL | Certificado válido, sem erro (`ssl_verify_result=0`) | `curl -w %{ssl_verify_result}` |
| Aplicação servida no domínio | **SITE ANTIGO** — não é este projeto | ver §2 |
| Cut-over executado | **NÃO** | — |

Ou seja: DNS e SSL estão tecnicamente saudáveis, **mas o domínio oficial ainda entrega a
aplicação anterior**. Enquanto o domínio não apontar para esta aplicação, nenhuma validação
pós-publicação pode ser executada em produção.

**Nenhuma alteração de cut-over foi feita neste bloco.** Permanecem intactos:
`SITE_URL`, canonical, `robots.txt`, proteção de preview (`noindex,nofollow` por host) e sitemap.

---

## 2. Evidências — o domínio ainda serve a aplicação antiga

Resposta de `https://grupobcenergia.com.br/` em 13/08/2026:

| Verificação | Esperado (novo site) | Observado em produção |
| --- | --- | --- |
| `<link rel="canonical">` | presente em todas as rotas | **ausente** |
| JSON-LD (`application/ld+json`) | Organization + WebSite na Home | **0 blocos** |
| `/robots.txt` | 200, com `Sitemap:` | **404 "Not found"** |
| `/sitemap.xml` | 37 URLs, gerado pelo projeto | 200, **32 URLs**, gerado por `xml-sitemaps.com` |
| HTML inicial | pré-renderizado (SSG), ~90 KB | 12 KB, shell de SPA |

GTM `GTM-KWRL7CWP` já carrega no site antigo — é o mesmo container, portanto o cut-over não
exige troca de ID.

### Comportamento de host/protocolo (já correto na infraestrutura)

| Origem | Status | Destino |
| --- | --- | --- |
| `http://grupobcenergia.com.br` | 301 | `https://grupobcenergia.com.br/` |
| `http://www.grupobcenergia.com.br` | 301 | `https://www.grupobcenergia.com.br/` |
| `https://grupobcenergia.com.br` | 200 | — (canônica) |
| `https://www.grupobcenergia.com.br` | 200 | — **não redireciona para a raiz** |

**Pendência de infraestrutura (P1):** `www` responde 200 em paralelo à raiz. No cut-over,
definir a raiz como domínio **Primary** em Project settings → Domains para que `www` passe a
redirecionar (301) para `https://grupobcenergia.com.br`.

---

## 3. O que JÁ está validado no build deste projeto

Verificado localmente (Blocos 07/08 + reconferência neste bloco):

- **Pré-render:** 37 rotas indexáveis geradas como HTML estático, com `title`, `description`,
  canonical absoluta, Open Graph, Twitter Cards, H1 único, conteúdo, links internos e JSON-LD
  no HTML inicial (antes do React).
- **Sitemap local:** `public/sitemap.xml` com **37 `<loc>`**, todas HTTPS, sem UTM, sem preview,
  sem rotas noindex. Gerado por `scripts/generate-sitemap.ts` nos hooks `predev`/`prebuild`.
- **Alinhamento das três fontes:** rotas indexáveis (`src/config/routes.ts`) = sitemap = rotas
  pré-renderizadas = 37.
- **Noindex preservado:** `/contato/enviado`, `/conteudo/blog`, `/conteudo/bc-cast`
  (`noindex,follow`) — política inalterada.
- **Proteção de preview:** qualquer host fora de `grupobcenergia.com.br` /
  `www.grupobcenergia.com.br` recebe `noindex,nofollow` em runtime
  (`isPreviewEnvironment()` em `src/config/site.ts`). Mantida.
- **robots.txt do projeto:** libera tudo exceto `/contato/enviado`, aponta para
  `https://grupobcenergia.com.br/sitemap.xml`. Já reflete a configuração final de produção.
- **Simulador — GO:** `https://simulador.bcenergiacomdesconto.com.br/` responde **200**.
  A integração ativa usa a raiz. `/4hed/` não é usada e **não foi reintroduzida**.
- **Mixed content:** nenhum asset em `http://`. Existem 3 links de navegação externos em
  `http://www.appenergia.com.br/Grupo_BC_Energia/` (área do cliente). O equivalente HTTPS
  redireciona para `https://site.grupobcenergia.com.br/...` e retorna **403** — destino HTTPS
  não comprovadamente válido, portanto **não alterado** (P2, ver §7).

---

## 4. Checklist de cut-over (TI) — pré-requisito para o Bloco 09 continuar

1. Publicar este projeto no Lovable (gera a URL `.lovable.app`).
2. Conectar `grupobcenergia.com.br` **e** `www.grupobcenergia.com.br` em
   Project settings → Domains deste projeto.
3. Definir a raiz como **Primary** (faz o `www` redirecionar 301).
4. Aguardar emissão do SSL para o novo projeto.
5. Confirmar que `https://grupobcenergia.com.br/robots.txt` retorna 200 e que a Home traz
   canonical + JSON-LD no HTML inicial.
6. Só então executar as validações §5 abaixo.

Detalhes operacionais e plano de reversão: `docs/CUTOVER.md` e `docs/ROLLBACK.md`.

---

## 5. Validações a executar EM PRODUÇÃO (após o cut-over)

| # | Validação | Critério de aceite |
| --- | --- | --- |
| 1 | Domínio oficial | raiz 200; `www` e `http` 301 → raiz |
| 2 | SSL | certificado válido, sem mixed content |
| 3 | robots.txt | 200, públicas liberadas, `Sitemap:` correto |
| 4 | sitemap.xml | 200, XML válido, 37 URLs HTTPS, sem 404/noindex/UTM/legado |
| 5 | Canonical | `https://grupobcenergia.com.br/...` em todas as indexáveis |
| 6 | HTML inicial | title, description, canonical, robots, OG, Twitter, H1, conteúdo, links, JSON-LD |
| 7 | Noindex | `/contato/enviado` e demais com `noindex,follow` |
| 8 | 404 | `/teste-404-validacao-go-live` → página 404, noindex, fora do sitemap |
| 9 | Redirects | registrar ORIGEM / DESTINO / STATUS / RESULTADO |
| 10 | Simulador | raiz 200, iframe carrega e recebe tema |
| 11 | Formulários | 1 smoke test identificado como **TESTE** (não gerar leads em massa) |
| 12 | WhatsApp | número e mensagem corretos, mobile + desktop |
| 13 | UTMs | `?utm_source=qa&utm_medium=test&utm_campaign=go_live&utm_project_id=TESTE` → `bc_utm`, `bc_utm_first`, persistência SPA |
| 14 | Data Layer | eventos do §6 sem duplicidade e sem PII |
| 15 | Performance | LCP, CLS, peso, bundle, requisições, TTFB (LAB) |
| 16 | Mobile | 360 px e 390 px sem overflow horizontal |
| 17 | Console/Network | sem erro JS, 404, 500, CORS ou mixed content |

---

## 6. Tracking

### Eventos esperados no Data Layer

`virtual_page_view`, `view_solution`, `view_segment`, `view_regional`, `cta_click`,
`whatsapp_click`, `form_start`, `form_step`, `bill_upload`, `form_submit`, `form_error`,
`lead_generated`. Esquema completo em `docs/TRACKING.md`.

`bill_upload` só dispara quando existir campo de arquivo — hoje nenhum formulário do site possui
upload, então a ausência do evento é esperada e não é falha.

### GTM

- Container **GTM-KWRL7CWP**, já presente no `index.html` e também no site atual.
- **Não publicar o container automaticamente** — decisão humana de Marketing/Analytics.
- Validar com Preview/Debug do GTM após o cut-over.

### GA4

- Validar DebugView/Tempo real **depois** da publicação humana do container.
- Foco: `page_view`/`virtual_page_view`, `view_solution`, `cta_click`, `whatsapp_click`,
  `form_start`, `form_submit`, `lead_generated`.
- Não criar propriedade nem Measurement ID.

### Conversões

- Evento principal recomendado: **`lead_generated`**.
- Não marcar como conversão principal: `cta_click`, `form_start`, `view_solution`.
- `qualified_lead`, `opportunity_created`, `sale` dependem de CRM/backend — não simular no navegador.

---

## 7. Problemas conhecidos

| Prioridade | Item | Situação |
| --- | --- | --- |
| **P0** | Domínio oficial ainda serve a aplicação antiga | Bloqueia o Bloco 09; depende da TI |
| **P1** | `https://www...` responde 200 sem redirecionar para a raiz | Resolver definindo a raiz como Primary no cut-over |
| **P2** | 3 links externos em `http://www.appenergia.com.br/...` | Alvo HTTPS retorna 403; manter `http://` até a TI confirmar destino válido |

Nenhum problema P0/P1 originado no código deste projeto.

---

## 8. Baseline de produção

Preencher após o cut-over. Baseline de referência (ambiente local, preview de build):

| Data | Rota | Device | LCP | CLS | TTFB | Peso | Observação |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-08 | `/` | Desktop | ~1,5 s | 0,00 | — | ~1,01 MB assets + 93 KB HTML | LAB local, sem CDN |
| — | `/` | Mobile | — | — | — | — | medir em produção |
| — | `/produtos` | Desktop | — | — | — | — | medir em produção |

**LAB** = medição sintética local/Lighthouse. **FIELD** = CrUX/Search Console — só existirá após
semanas de tráfego real; **não estimar**.

---

## 9. Search Console (execução humana)

1. Confirmar propriedade do domínio.
2. Validar o domínio.
3. Enviar `https://grupobcenergia.com.br/sitemap.xml`.
4. Inspecionar a Home.
5. Inspecionar páginas de solução.
6. Inspecionar segmentos prioritários.
7. Inspecionar páginas regionais.
8. Solicitar indexação das páginas prioritárias.
9. Verificar a canonical escolhida pelo Google.
10. Acompanhar o total de páginas indexadas.

### Páginas prioritárias (rotas reais do projeto)

**Prioridade 1 — Home + Soluções**
`/`, `/produtos`, `/produtos/mercado-livre-de-energia`, `/produtos/consorcio-bc-energia`,
`/produtos/gestao-de-energia`, `/produtos/irec`, `/produtos/certificacao-renovavel-irec`

**Prioridade 2 — Segmentos e institucionais**
`/segmentos`, `/segmentos/agronegocio`, `/segmentos/condominio`, `/segmentos/saude`,
`/segmentos/educacional`, `/segmentos/varejo`, `/sobre`, `/sobre/sustentabilidade`, `/contato`

**Prioridade 3 — Regionais**
`/energia-solar-goiania`, `/energia-solar-anapolis`, `/energia-solar-aparecida-de-goiania`,
`/energia-solar-trindade`, `/energia-solar-em-rio-verde`, `/energia-solar-palmas`,
`/energia-solar-no-tocantins`

---

## 10. Monitoramento pós-publicação

### 15 minutos
Site online · SSL válido · Home e 3 rotas internas 200 · console sem erro · formulário abre ·
CTA de WhatsApp abre · GTM carregando.

### 1 hora
Leads de teste chegando ao destino · `lead_generated` no Data Layer · GA4 Tempo real ·
nenhum 404 inesperado · robots.txt e sitemap.xml 200.

### 24 horas
Volume de leads comparável ao histórico · sem picos de 404/500 · performance estável ·
sitemap aceito no Search Console · canonical reconhecida.

### 7 dias
Páginas indexadas · impressões · cliques · consultas · CTR · posições · Core Web Vitals ·
páginas não indexadas · erros de rastreamento · leads orgânicos · conversões.

Queda temporária de posições logo após uma migração é esperada. **Crescimento orgânico imediato
não é critério de sucesso técnico.**
