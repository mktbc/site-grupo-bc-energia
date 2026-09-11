# Pesquisa de palavras-chave e priorização editorial — Bloco 11

**Fonte dos dados:** Semrush, base `br` (Brasil) — coleta em **2026-08-14**.
Volumes são estimativas do Semrush (Google orgânico), não números reais de
tráfego. Nenhum número aqui foi inventado; o que não tem dado está marcado
como *sem dado*.

> A trava `CONTENT_INDEXING_ENABLED = false` (`src/config/meta-content.ts`)
> permanece ativa. A liberação será **artigo por artigo**, conforme
> `docs/CONTENT-INDEXING-CRITERIA.md` — não pelo hub inteiro.

---

## 1. Dados coletados (Semrush, br, 2026-08-14)

### Cluster: Mercado Livre de Energia

| Keyword | Volume/mês | KD | CPC | Competição |
|---|---|---|---|---|
| mercado livre de energia | 4.400 | 30 | US$ 1,49 | média |
| mercado de energia livre | 1.900 | — | US$ 1,49 | média |
| mercado livre de energia como funciona | 590 | — | US$ 1,03 | alta |
| mercado livre de energia residencial | 590 | — | US$ 0,75 | alta |
| como funciona o mercado livre de energia | 390 | — | US$ 1,03 | alta |
| o que é mercado livre de energia | 260 | — | US$ 0,88 | média |
| como migrar para o mercado livre de energia | 50 | — | US$ 1,68 | média |
| quem pode migrar para o mercado livre de energia | 50 | — | US$ 0,80 | média |
| quanto tempo para migrar para o mercado livre | 40 | — | — | baixa |

**SERP (KD 30 — viável):** mercadolivredeenergia.com.br, CCEE, Origo, Enel,
Comerc, Copel, Wikipedia, Idec, Canal Solar. É um SERP misto: página
institucional/produto no topo + blogs de comercializadoras.
→ **Leitura:** a *money page* `/produtos/mercado-livre-de-energia` disputa o
termo-cabeça; os artigos ficam com as caudas de dúvida ("como funciona",
"quem pode migrar", "quanto tempo").

### Cluster: Geração distribuída / energia por assinatura

| Keyword | Volume/mês | KD | CPC | Competição |
|---|---|---|---|---|
| energia solar | 74.000 | — | US$ 0,58 | média |
| geração distribuída | 3.600 | 36 | US$ 0,56 | baixa |
| energia solar por assinatura | 2.400 | 17 | US$ 0,63 | alta |
| energia por assinatura | 1.300 | 29 | US$ 0,76 | média |
| comprar energia solar | 880 | — | US$ 0,87 | alta |
| energia solar por assinatura vale a pena | 590 | — | US$ 0,51 | alta |
| como funciona energia solar por assinatura | 140 | — | US$ 0,37 | média |
| o que é geração distribuída | 110 | — | US$ 0,09 | baixa |

**SERP "energia solar por assinatura" (KD 17 — fácil):** Matrix, Enova, Origo,
Portal Solar, Echo, EDP, BV, Ultragaz, Click Livre. Concorrência direta de
comercializadoras, mas dificuldade baixa.
→ **Leitura:** este é o melhor custo-benefício do projeto — volume relevante
(2.400/mês) com KD 17. Corrige a hipótese inicial que colocava "energia por
assinatura" em P2.

### Cluster: Gestão de energia

| Keyword | Volume/mês | KD | Observação |
|---|---|---|---|
| gestão de energia | 480 | 10 | **intenção contaminada** |
| gerenciamento de energia | 170 | — | idem |
| gestão energética | 110 | — | mais limpo, B2B |
| gestão de energia e eficiência energética | 90 | — | limpo, B2B |
| o que é gestão de energia | 50 | — | misto |
| demanda contratada | 170 | 18 | limpo, B2B |
| o que é demanda contratada de energia elétrica | 50 | — | limpo |
| como funciona a demanda contratada de energia | 40 | — | limpo |
| como calcular demanda contratada | 20 | — | limpo, utilitário |

**Alerta de intenção:** a maioria das perguntas de "gestão de energia"
("como tirar gestão de energia do monitor", "como resolver gestão de energia
no pc") é sobre **modo de economia de monitor/PC**, não sobre energia
elétrica empresarial. Otimizar a página de produto para o termo puro
atrairia tráfego inútil.
→ **Leitura:** rebaixar "gestão de energia" como keyword-alvo e atacar o
cluster por **"demanda contratada"** e **"gestão energética / eficiência
energética"**.

### Cluster: I-REC / sustentabilidade

| Keyword | Volume/mês | KD |
|---|---|---|
| irec | 480 | — |
| i-rec | 320 | — |
| certificado i-rec | 90 | 11 |

Volume pequeno e ambíguo ("irec" também retorna outras entidades), mas
dificuldade muito baixa e público qualificado (ESG/compras).
→ **Leitura:** P3 em prioridade de tráfego, porém barato de conquistar e
com alto valor comercial por lead.

### Cluster: Economia na conta de energia

`como reduzir conta de energia da empresa` — **sem dado no Semrush br**
(volume abaixo do rastreado). A hipótese de que seria P1 **não se sustenta
com dados**. O tema segue válido como conteúdo de fundo de funil e captura
de cauda longa, mas não como aposta principal.

### Regional (Goiás/Tocantins)

| Keyword | Volume/mês | KD | CPC |
|---|---|---|---|
| energia solar em aparecida | 1.300 | — | — |
| energia solar goiania | 590 | 26 | US$ 1,05 |
| cooperativa de energia solar | 480 | — | US$ 0,56 |
| energia solar em goiânia | 390 | 26 | US$ 1,05 |
| energia solar em goias | 210 | — | US$ 0,77 |
| energia solar perto de mim | 210 | — | US$ 0,80 |

→ **Leitura:** as LPs regionais já existentes cobrem essa intenção e têm
KD baixo. Prioridade é **otimizar as LPs**, não criar artigos concorrentes —
confirma o status `blocked` de `regional-goias-duvidas`.

---

## 2. Priorização revisada (dados > hipótese)

Mudanças em relação à ordem sugerida antes da pesquisa:

| Hipótese inicial | Decisão com dados | Motivo |
|---|---|---|
| "energia por assinatura" = P2 | **sobe para P1** | 2.400/mês com KD 17 |
| "como reduzir conta de energia da empresa" = P1 | **desce para P3** | sem volume rastreado |
| "gestão de energia" = P2 | **reposicionado** | intenção contaminada (monitor/PC) |
| "certificado I-REC" = P2 | **P3** | 90/mês, mas KD 11 e lead qualificado |

### P1 — produzir primeiro

| # | Título recomendado | Keyword principal | Vol. | KD | Intenção | Funil | Money page | ID no backlog |
|---|---|---|---|---|---|---|---|---|
| 1 | Energia solar por assinatura: como funciona e para quem faz sentido | energia solar por assinatura | 2.400 | 17 | informacional | meio | `/produtos/consorcio-bc-energia` | `gd-sem-placas` |
| 2 | Como funciona o Mercado Livre de Energia | como funciona o mercado livre de energia | 390+590 | 30 | informacional | topo | `/produtos/mercado-livre-de-energia` | `mle-o-que-e` |
| 3 | Quem pode migrar para o Mercado Livre de Energia | quem pode migrar para o mercado livre de energia | 50 | — | informacional | meio | `/produtos/mercado-livre-de-energia` | `mle-quem-pode-migrar` ⚠ regulatório |
| 4 | O que é geração distribuída (e o que ela não é) | o que é geração distribuída | 110 | 36 | informacional | topo | `/produtos/consorcio-bc-energia` | `gd-o-que-e` |

### P2 — segunda onda

| # | Título recomendado | Keyword principal | Vol. | KD | Money page | ID |
|---|---|---|---|---|---|---|
| 5 | Demanda contratada: o que é e por que pesa na fatura | demanda contratada | 170 | 18 | `/produtos/gestao-de-energia` | `gestao-demanda` ⚠ |
| 6 | Mercado cativo x mercado livre: o que muda para a empresa | mercado cativo e mercado livre diferença | — | — | `/produtos/mercado-livre-de-energia` | `mle-cativo-vs-livre` ⚠ |
| 7 | Créditos de energia: como aparecem na conta | créditos de energia como funciona | — | — | `/produtos/consorcio-bc-energia` | `gd-creditos` ⚠ |
| 8 | Como ler a conta de energia da sua empresa | como ler a conta de energia empresarial | — | — | `/produtos/gestao-de-energia` | `gestao-fatura` ⚠ |

### P3 — depois

`irec-o-que-e` (90/mês, KD 11), `economia-caminhos` (sem volume),
`gd-modelos`, `mle-custos`, `mle-riscos-gestao`, `seg-agro`,
`seg-condominio`, `seg-varejo`, `gestao-previsibilidade`, `irec-relato`,
`economia-conta-alta`.

**Bloqueado:** `regional-goias-duvidas` — as LPs regionais já atendem a
intenção; ação correta é otimizar a LP, não criar artigo.

⚠ = `requiresExternalResearch: true`. Não publicar sem checar a regra
vigente e citar fonte oficial (ANEEL, CCEE, distribuidora).

---

## 3. Briefing padrão por conteúdo

Cada artigo P1/P2 deve entrar em `src/data/content/articles.ts` com:

- `title` com a keyword principal em posição natural, até ~60 caracteres
- `excerpt` exclusivo, 120–160 caracteres (vira a meta description)
- `cluster` correspondente + `publishedAt` real
- H1 único = título; H2 respondendo cada pergunta do bloco "Question Keywords"
- **1 link interno obrigatório** para a `moneyPath` do cluster, com âncora descritiva
- CTA do cluster (`CLUSTERS[id].cta`)
- `sources[]` quando o tema for regulatório
- FAQ só se estiver visível na página (condição para emitir `FAQPage`)

Sem promessa de percentual de economia, prazo ou condição comercial que não
exista nas páginas oficiais.

---

## 4. Limites desta pesquisa

- Volumes são estimativas do Semrush, não dados do Search Console. O site
  ainda não está publicado no domínio oficial, então não há dado próprio de
  impressões/cliques para cruzar. Refazer esta priorização após 30–60 dias
  de Search Console pós-go-live.
- Dificuldade (KD) precisa ser lida contra a autoridade do domínio novo:
  KD 17–30 é alcançável, mas com prazo de meses e publicação constante.
- Nenhum dado regulatório de 2026 (tarifas, regras de migração, ANEEL) foi
  coletado aqui — isso é pesquisa por pauta, feita na hora de escrever.
