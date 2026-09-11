# BLOCO 10 — SEO de conteúdo e estratégia orgânica

Documento de estratégia editorial do novo site do Grupo BC Energia.
Complementa os Blocos 01–09 (técnico, metadata, performance, arquitetura,
front-end, tracking, QA, go live).

---

## 1. Princípio que rege este bloco

**Nada é inventado.** Não há dado comercial, volume de busca, depoimento,
credencial, prazo ou percentual de economia criado por este bloco. O que existe
aqui é: taxonomia editorial, mapeamento de intenção, templates, dados
estruturados e regras de indexação — toda a infraestrutura para publicar
conteúdo real quando ele existir.

Por consequência:

- `src/data/content/articles.ts` está **vazio de propósito**.
- Os 2 episódios do BC Cast em `src/data/content/episodes.ts` são os **reais**
  já publicados no canal do grupo (mesmos dados que a Home já usava).
- Blog e BC Cast permanecem **`noindex,follow`** (regra do bloco), com trava em
  `CONTENT_INDEXING_ENABLED`.

---

## 2. Papel de cada tipo de página

| Tipo | Intenção que atende | Exemplo | Indexação |
|---|---|---|---|
| Solução (money page) | Comercial / transacional | `/produtos/mercado-livre-de-energia` | index |
| Segmento | Comercial por perfil | `/segmentos/agronegocio` | index |
| Regional (LP) | Comercial + geográfica | `/energia-solar-goiania` | index |
| Institucional | Marca / confiança | `/sobre/quem-somos` | index |
| **Artigo de blog** | **Informacional / comparativa** | "O que é mercado livre de energia" | noindex hoje |
| **Episódio BC Cast** | **Marca / autoridade** | "BC Cast #01" | noindex hoje |

Regra de ouro: **conteúdo editorial nunca disputa a intenção comercial** de uma
página existente. Ele responde a dúvida que **antecede** a decisão e encaminha
para a money page.

---

## 3. Clusters editoriais

Definidos em `src/data/content/clusters.ts`. Cada cluster nasce de uma solução
real e tem uma money page.

| Cluster | Money page | Escopo |
|---|---|---|
| Mercado Livre de Energia | `/produtos/mercado-livre-de-energia` | Migração, funcionamento, custos, contratos, riscos |
| Geração distribuída / assinatura | `/produtos/consorcio-bc-energia` | Geração compartilhada, créditos, adesão sem obra |
| Gestão de energia | `/produtos/gestao-de-energia` | Fatura, demanda contratada, previsibilidade |
| Renovável e I-REC | `/produtos/certificacao-renovavel-irec` | Origem renovável, certificação, relato ESG |
| Economia na conta | `/contato` | Leitura da conta, caminhos de redução |
| Usinas e arrendamento | `/produtos/arrendamento-de-usinas` | Operação e arrendamento |

Distinção obrigatória (erro comum no setor): **geração distribuída**,
**geração compartilhada** e **energia por assinatura** não são sinônimos e
precisam ser diferenciados nos textos.

---

## 4. Keyword map e backlog

Fonte: `src/data/seo-content-map.ts` (arquivo de planejamento, não consumido
pelo front-end). São 22 oportunidades mapeadas com intenção, funil, cluster,
money page de destino e status.

**Sobre métricas:** nenhum volume de busca, CPC, dificuldade ou posição foi
declarado. O projeto não tem Search Console nem Semrush conectados e estimar
número seria inventar dado. O campo `metrics` existe e deve ser preenchido com
`source` + `collectedAt` quando houver coleta real.

Distribuição por status:

- `planned` (9) — pauta pode ser escrita com o que o projeto já sustenta.
- `requires-research` (9) — tema regulatório/tarifário (ANEEL, tributos,
  elegibilidade, bandeiras, regras do I-REC). **Exige pesquisa externa
  atualizada e citação de fonte antes de publicar.**
- `existing` (2) — intenção já coberta por página do site; não criar artigo.
- `blocked` (1) — conteúdo regional complementar, depende de evidência de
  demanda no Search Console.

Prioridade sugerida para os primeiros 3 artigos (todos `planned`, sem
dependência regulatória):

1. **O que é geração distribuída** — base do cluster de maior tráfego potencial.
2. **Dá para ter energia solar sem instalar placas?** — objeção nº 1 das LPs.
3. **Energia no agronegócio** — já tem lastro no BC Cast (episódio real).

---

## 5. Prevenção de canibalização

Regras aplicadas ao backlog:

1. Uma intenção = uma página. Se a money page já ranqueia para a intenção,
   o status vira `existing` e nenhum artigo é criado.
2. Artigo conceitual ("o que é X") **nunca** usa title comercial
   ("contrate X", "X para empresas").
3. Conteúdo regional (`/energia-solar-<cidade>`) é território exclusivo das LPs.
   Artigo com recorte geográfico só é permitido para dúvida complementar
   comprovada — por isso `regional-goias-duvidas` está `blocked`.
4. Artigo de segmento trata do **problema**; a página de segmento trata da
   **oferta**.
5. Todo artigo linka para a money page do cluster com âncora descritiva
   (nunca "saiba mais"). Implementado em
   `getCommercialLinks()` (`src/data/content/related.ts`), que puxa o rótulo do
   breadcrumb real da rota.

---

## 6. Arquitetura implementada

### Dados

```
src/data/content/
  types.ts       tipos (Article, Episode, ContentBlock, FAQ, CTA…)
  clusters.ts    taxonomia editorial + money pages
  articles.ts    artigos reais (vazio hoje) + seletores
  episodes.ts    episódios reais do BC Cast + seletores
  related.ts     relacionados (explícito > cluster > tag) + links comerciais
src/data/seo-content-map.ts   keyword map / backlog (planejamento)
```

### Rotas

| Rota | Página |
|---|---|
| `/conteudo/blog` | hub por cluster, com estado vazio honesto |
| `/conteudo/blog/:slug` | template de artigo |
| `/conteudo/bc-cast` | hub de episódios reais |
| `/conteudo/bc-cast/:slug` | template de episódio |

Slug inexistente → redireciona para o hub (sem página de erro indexável).

### Componentes

- `src/components/Content/ContentBody.tsx` — renderiza blocos tipados
  (H2/H3, parágrafo, lista, citação). **Sem `dangerouslySetInnerHTML`.**
- `src/components/Content/ContentCard.tsx` — card de listagem; só mostra data e
  autoria quando existem.
- `src/components/Content/ContentEmptyState.tsx` — estado vazio com links reais.

### Metadata

`src/config/meta-content.ts` resolve as rotas dinâmicas e é usado por
`RootLayout` e `Breadcrumbs` via `resolveRouteMeta()`. Separado de `meta.ts`
para evitar dependência circular.

### Dados estruturados

Adicionados em `src/components/Seo/structuredData.ts`:

- `articleSchema()` — `BlogPosting`; retorna `null` sem `headline` +
  `datePublished` reais.
- `videoObjectSchema()` — retorna `null` sem name, description, thumbnail,
  uploadDate e embedUrl reais. **Hoje nenhum episódio emite VideoObject**,
  porque não temos data de publicação e descrição oficiais.

Melhor nenhum schema do que schema falso: dado estruturado divergente do
conteúdo visível é penalizável.

### Tracking

Os templates disparam `content_engagement` (evento já existente do Bloco 06)
com `content_type` = `blog_article` | `bc_cast_episode` e `content_id` = slug.
CTAs de conteúdo têm `data-cta-name` (`blog-<slug>`, `bc-cast-<slug>`) e são
capturados pela delegação de cliques já existente.

---

## 7. E-E-A-T

O que foi previsto na estrutura (campos `author`, `reviewer`, `sources`,
`publishedAt`, `updatedAt`) e o que **depende de decisão humana**:

- Definir quem assina os conteúdos (pessoa real com cargo real).
- Definir revisor técnico para temas regulatórios.
- Não há página de autor: só faz sentido criar quando houver autoria recorrente.

Nada disso foi preenchido automaticamente porque autoria falsa é o oposto de
E-E-A-T.

---

## 8. Fluxo de publicação recomendado

1. Escolher uma pauta em `src/data/seo-content-map.ts`.
2. Se `requiresExternalResearch: true`, pesquisar a regra vigente e reunir as
   fontes oficiais.
3. Escrever o artigo como objeto `Article` em `src/data/content/articles.ts`.
4. Conferir `docs/CONTENT-INDEXING-CRITERIA.md`.
5. Publicar ainda em `noindex` e revisar no ambiente.
6. Ao atingir o volume mínimo, liberar a indexação seguindo o passo a passo do
   documento de critérios.

---

## 9. Pendências que dependem do cliente

| Pendência | Responsável | Impacto |
|---|---|---|
| Definir autoria e revisão técnica dos conteúdos | Marketing | E-E-A-T |
| Fornecer descrição, data e duração reais dos episódios do BC Cast | Marketing | Libera `VideoObject` e indexação do BC Cast |
| Aprovar as 3 primeiras pautas | Marketing | Início da produção |
| Conectar Search Console após o cut-over | TI / Marketing | Métricas reais no keyword map |
| Validar temas regulatórios (9 pautas) | Especialista de energia | Segurança da informação publicada |

---

## 10. Registro de correções comerciais

### 2026-08-14 — Percentual de economia no artigo "Energia solar por assinatura"

**Correção aplicada:**

- O artigo `src/data/content/articles.ts` continha a frase "economia de até 26% na conta de luz".
- A referência comercial correta informada pela equipe do Grupo BC Energia é **"até 25%"**.
- Todas as ocorrências no artigo foram substituídas por "até 25%".

**Regras mantidas:**

- O percentual é apresentado como **condição divulgada**, não como garantia.
- O texto reforça que o percentual efetivo **varia conforme a região, a solução contratada e o perfil de consumo**.
- O percentual **não foi transformado em argumento repetitivo de SEO**: continua sendo um dado pontual dentro da explicação sobre como a solução funciona.

**Escopo da correção:**

- Alterado apenas o artigo "Energia solar por assinatura: entenda como funciona" (`slug: energia-solar-por-assinatura`), produzido no Bloco 12.
- Páginas de produto e demais conteúdos não foram modificadas, conforme instrução de não alterar percentuais específicos de outras páginas sem identificar o contexto comercial de cada uma.
