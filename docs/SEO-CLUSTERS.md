# Clusters temáticos prioritários

Arquitetura dos dois ecossistemas prioritários do Grupo BC Energia:
**Energia por assinatura / Geração distribuída** e **Gestão de energia**.

Princípio: nenhuma URL nova, nenhum artigo fictício, nenhuma afirmação
regulatória ou regional sem base. Toda a estrutura reaproveita páginas e
conteúdos que já existem.

---

## 1. Mapeamento do que já existe

| Camada | Situação hoje |
|---|---|
| Páginas comerciais | 5 produtos, 11 segmentos, 7 regionais, institucionais, contato, simulador |
| Conteúdo editorial real | 1 artigo (`energia-solar-por-assinatura`) + 2 episódios do BC Cast |
| Linking interno | `src/config/internalLinks.ts` (catálogo descritivo + mapas de relação) |
| Conteúdo contextual | `src/data/content/contextual.ts` (só resolve relação real) |
| Backlog | `src/data/seo-content-map.ts` |

---

## 2. Estrutura de cluster (`src/data/content/clusters.ts`)

Cada cluster passou a declarar:

- `pillarPath` — página pilar (sempre uma página comercial existente).
- `moneyPath` — página de conversão do tema.
- `supportingPaths` — páginas comerciais de apoio.
- `segmentPaths` — **seletivo**: apenas segmentos em que o tema é realmente aplicável.
- `regionPaths` — regionais que participam do cluster.
- `relatedClusters` — vizinhança temática (Gestão ↔ Mercado Livre).
- `intents` — intenções que o cluster precisa cobrir.
- `ctaByIntent` — CTA por nível (`baixa`, `media`, `alta`), para o mesmo CTA
  não se repetir em todas as páginas do tema.
- `priority` — marca os dois clusters prioritários.

Helpers: `getClusterForPath()`, `clusterCta()`, `PRIORITY_CLUSTERS`.

---

## 3. Cluster 1 — Energia por assinatura / GD (prioritário)

- **Pilar:** `/produtos/consorcio-bc-energia`
- **Segmentos:** residencial, condomínio, bares e restaurantes, serviços, varejo
- **Regionais:** as 7 páginas regionais
- **CTA por intenção:** entender → verificar elegibilidade → simular economia
- **Vizinhos:** economia na conta, mercado livre

Toda página regional agora aponta explicitamente para o pilar do cluster, com
âncora descritiva e referência à cidade — sem criar dado local novo.

## 4. Cluster 2 — Gestão de energia (prioritário)

- **Pilar:** `/produtos/gestao-de-energia`
- **Segmentos:** varejo, saúde, serviços, agronegócio, turismo
- **CTA por intenção:** entender → ver o que a gestão acompanha → falar com especialista
- **Cruzamento obrigatório:** Gestão ↔ Mercado Livre (recíproco, já implementado
  em `PRODUCT_RELATED` nas duas páginas de produto)

---

## 5. Fluxos de navegação

```text
Produto (pilar) → conteúdo contextual real → segmento/regional → simulador/contato
Regional        → pilar GD → simulador → contato
Segmento        → solução aplicável → pilar do cluster → conversão
Gestão          ⇄ Mercado Livre
```

## 6. Hub `/conteudo`

Os temas deixaram de ser uma lista fixa: são ordenados por conteúdo real
publicado e por prioridade estratégica, e a contagem exibida vem do inventário
real (artigos + episódios). Temas sem conteúdo continuam visíveis apenas como
porta de entrada para a página pilar — nunca com número inventado.

## 7. Backlog editorial adicionado

Novas oportunidades registradas em `src/data/seo-content-map.ts`:

| Cluster | ID | Intenção | Status |
|---|---|---|---|
| GD | `gd-quem-pode` | elegibilidade | requires-research |
| GD | `gd-vale-a-pena` | decisão | planned |
| GD | `gd-vs-mercado-livre` | comparativa | requires-research |
| Gestão | `gestao-o-que-e` | topo | planned |
| Gestão | `gestao-multiplas-unidades` | comercial | planned |
| Gestão | `gestao-medicao` | operacional | requires-research |

Prioridade de produção: `gestao-o-que-e` → `gd-vale-a-pena` →
`gd-quem-pode` (após pesquisa regulatória).
