# BLOCO 06 — Arquitetura de mensuração (GTM / GA4 / Data Layer)

Documento de referência para o time de marketing e para quem configurar o container.
**Nada foi publicado em GTM/GA4 e nenhum ID foi criado ou substituído pelo código.**

---

## 1. Auditoria do que já existia

| Item | Situação encontrada | Ação neste bloco |
|---|---|---|
| GTM `GTM-KWRL7CWP` | Instalado no `index.html` (head + noscript) | Mantido, sem alteração |
| GA4 | Não existe tag nativa no código (deve viver dentro do GTM) | Nenhuma tag criada |
| Data Layer | Inexistente — nenhum evento customizado | Criado (ver seção 3) |
| Meta Pixel / Google Ads | Não existem no código-fonte do site | Nada adicionado |
| UTMs | Lidas da URL apenas no momento do envio do formulário; perdidas em navegação interna | Persistência de sessão + first touch |
| SPA page view | Só o pageview inicial do GTM | `virtual_page_view` por rota |
| RD Station / Salesforce / Supabase | Integrações ativas | **Não alteradas** |

---

## 2. Onde está o código

```
src/lib/analytics/
  types.ts        Contrato dos eventos (nomes e parâmetros permitidos)
  dataLayer.ts    Único ponto que toca window.dataLayer
  pageType.ts     Classificação da página (home/solution/segment/regional/...)
  utm.ts          Captura, persistência e first touch das UTMs
  events.ts       Funções de evento tipadas
  useTracking.ts  Hooks: rota, delegação de cliques e formulários
```

Regra: nenhum componente chama `dataLayer.push` diretamente.

---

## 3. Eventos disparados

Todos em snake_case. Todos recebem o contexto de página
(`page_path`, `page_title`, `page_type` e, quando aplicável, `solution`, `segment`,
`region`, `region_uf`, `region_city`).

| Evento | Quando | Parâmetros próprios |
|---|---|---|
| `virtual_page_view` | Troca de rota no SPA (uma vez por rota) | — |
| `view_solution` | Página de solução/produto | `solution` |
| `view_segment` | Página de segmento | `segment` |
| `view_regional` | Página regional | `region` |
| `cta_click` | Clique em CTA marcado com `data-cta-name` | `cta_name`, `cta_location`, `link_url` |
| `whatsapp_click` | Clique em qualquer link `wa.me` / `wa.link` / `api.whatsapp.com` | `cta_name`, `cta_location` |
| `form_start` | Primeira interação em um formulário (1x por instância) | `form_name` |
| `form_step` | Etapa concluída (para formulários multi-etapa futuros) | `form_name`, `form_step`, `step_name` |
| `bill_upload` | Upload de conta de energia (helper pronto; hoje nenhum formulário tem campo de arquivo) | `form_name`, `file_type` |
| `form_error` | Erro de validação ou de envio | `form_name`, `error_type`, `field_name` |
| `form_submit` | Envio confirmado com sucesso | `form_name` |
| `lead_generated` | Junto do `form_submit`, com a origem da conversão | `conversion_type: 'lead'` + UTMs de sessão, `first_utm_*`, `landing_page` |
| `content_engagement` | Interação com conteúdo (vídeo, artigo) | `content_type`, `content_id` |

`cta_location` possível: `hero`, `header`, `solution_section`, `segment_section`,
`regional_section`, `content_section`, `form_section`, `footer`, `floating`.

### Marcação de CTA no HTML

```tsx
<div data-cta-location="hero">
  <ButtonLink href="/contato" data-cta-name="Enviar minha conta para análise">…</ButtonLink>
</div>
```

Links de WhatsApp são rastreados automaticamente, mesmo sem `data-cta-name`.

---

## 4. UTMs e origem da conversão

- Persistidas em `sessionStorage` (`bc_utm`), não em cookie ou localStorage.
- **First touch** (`first_utm_source/medium/campaign/campaign_id/content`) gravado uma
  única vez por sessão e nunca sobrescrito.
- `landing_page` = primeiro pathname da sessão.
- `utm_project_id` é preservado **exatamente** como recebido.
- Também são capturados `gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`.
- No envio dos formulários a prioridade é: **URL atual > sessão > padrão do site**.
  Os valores padrão (`UTM_DEFAULTS`) e o payload enviado ao webhook
  não mudaram de formato.

---

## 5. SPA e page view

O container atual não tem regra de History Change específica para este SPA, então o
`virtual_page_view` é emitido pela aplicação a cada mudança real de rota, após o
`<title>` da rota ser aplicado. Há proteção contra duplicidade (React StrictMode e
re-render).

**Configuração recomendada no GTM (a ser feita manualmente pelo time):**
desativar o page view automático do GA4 na tag de configuração e criar uma tag de
evento GA4 `page_view` acionada pelo gatilho customizado `virtual_page_view`.

---

## 6. Privacidade / LGPD

- Nenhum evento envia nome, e-mail, telefone, CPF/CNPJ ou conteúdo de campos.
- `form_error` envia apenas o **nome técnico do campo** (ex.: `email`), nunca o valor.
- `bill_upload` envia apenas o tipo do arquivo — nunca nome, tamanho ou conteúdo.
- `whatsapp_click` não registra número de telefone.
- Cliques usam o rótulo do botão, limitado a 80 caracteres.

---

## 7. O que ainda depende de ação humana (fora do código)

1. Criar no GTM os gatilhos de evento customizado com os nomes da seção 3.
2. Criar as tags GA4 correspondentes e marcar `lead_generated` como conversão.
3. Definir se `form_submit` ou `lead_generated` será a conversão importada no Google Ads.
4. Publicar o container (não feito por aqui, por decisão do escopo).
