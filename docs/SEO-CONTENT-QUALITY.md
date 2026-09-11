# SEO 09 — Conteúdo provisório, páginas thin e qualidade editorial

Auditoria executada sobre o HTML pré-renderizado em `dist/` (33 rotas indexáveis)
por `scripts/audit-content-quality.ts`. Nenhuma alteração de design foi feita.

## 1. Conteúdo provisório

| Item | Resultado |
| --- | --- |
| Lorem Ipsum em páginas INDEX | 0 |
| Placeholders visíveis | 0 (`placeholder=` só em `<input>`, uso legítimo) |
| "mock/dummy/coming soon" visível | 0 |
| TODO/FIXME | apenas em comentários de código (GTM/RD Station, `src/config/integrations.ts`) — não renderizados |

**Correção aplicada:** a seção BC Cast da Home lia `src/mooks/content.ts`.
O diretório `src/mooks/` foi **removido** e a seção passou a ler a fonte real e
validada `src/data/content/episodes.ts` (mesmos 2 episódios reais, mesmas URLs
de vídeo, mesmo layout). Nenhum episódio novo foi criado.

## 2. Mocks / fontes de dados renderizadas

| Diretório | Situação |
| --- | --- |
| `src/mooks/` | **removido** nesta etapa |
| `src/mocks/` | não existe |
| `src/data/content/` | conteúdo real (2 episódios, artigos redacionais reais) |
| `src/data/regions/` | conteúdo real das 7 regionais |
| `src/data/segments/` | conteúdo real dos 11 segmentos |
| Blog na Home | consome API real (`useGetBlogPosts`), com estado vazio honesto |

## 3. Blog / BC Cast

- `/conteudo`, `/conteudo/blog`, `/conteudo/bc-cast`: **noindex,follow**, fora do
  sitemap e fora de `INDEXABLE_ROUTES` — validado pelo script (0 erros).
- Indexação editorial continua desabilitada (`docs/CONTENT-INDEXING-CRITERIA.md`).
- Pendência editorial: campos reais (data, duração, transcrição) para liberar
  `VideoObject` e a indexação do BC Cast.

## 4. Páginas thin (critério composto)

Sinais avaliados por página: volume textual (<300 palavras), nº de `<section>` (<3),
nº de H2 (<2) e links internos no `<main>` (<3). 3+ sinais = THIN, 2 = ATENÇÃO.
Hubs são avaliados por capacidade de distribuição de links, não por volume.

| Classificação | Qtde | Rotas |
| --- | --- | --- |
| OK | 33 | todas as rotas indexáveis |
| ATENÇÃO | 0 | — |
| THIN | 0 | — |

Mediana de 607 palavras no `<main>`. Páginas curtas por função (não thin):
`/contato` (79 palavras — formulário), `/sobre` (122 — hub), `/segmentos` (225 — hub),
`/sobre/nossas-usinas` (370 — listagem factual de usinas).

`/sobre/nossas-usinas`: conteúdo real e suficiente (lista de complexos, localização
e capacidade). **Mantida INDEX.** O warning semântico H1→H3 permanece documentado
em `docs/SEO-HTML-SEMANTICS.md` — a correção depende de conteúdo editorial novo.

## 5. Produtos (5 soluções)

| Rota | Problema | Solução | Funcionamento | Público | Benefícios | CTA | Links | Lacuna |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| /produtos/mercado-livre-de-energia | ✔ | ✔ | ✔ (HowItWorks) | ✔ | ✔ | ✔ | ✔ | — |
| /produtos/consorcio-bc-energia | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | — |
| /produtos/gestao-de-energia | ✔ | ✔ | parcial | ✔ | ✔ | ✔ | ✔ | falta etapa "como funciona" |
| /produtos/certificacao-renovavel-irec | ✔ | ✔ | parcial | parcial | ✔ | ✔ | ✔ | público-alvo pouco explícito |
| /produtos/arrendamento-de-usinas | ✔ | ✔ | parcial | ✔ | ✔ | ✔ | ✔ | FAQ ausente |

Hub `/produtos`: 775 palavras + 6 destinos de solução — cumpre a função de
contextualizar o portfólio e distribuir links. **OK.**

## 6. Segmentos (11 rotas) — sobreposição

Similaridade Jaccard sobre o `<main>` normalizado (top ocorrências):

| Página A | Página B | Similaridade | Classe |
| --- | --- | --- | --- |
| /segmentos/lazer | /segmentos/turismo | 79% | ALTA |
| /segmentos/servico | /segmentos/varejo | 72% | ALTA |
| /segmentos/bares-e-restaurantes | /segmentos/educacional | 68% | ALTA |
| /segmentos/bares-e-restaurantes | /segmentos/servico | 68% | ALTA |
| /segmentos/bares-e-restaurantes | /segmentos/turismo | 68% | ALTA |

**REVISAR CONTEÚDO** (diferenciação editorial futura): `lazer`, `turismo`,
`servico`, `varejo`, `bares-e-restaurantes`, `educacional`. O template é comum;
a introdução, os problemas do segmento e o FAQ é que precisam de diferenciação.
Nenhuma página foi reescrita nesta etapa.

## 7. Regionais (7 rotas) — sobreposição

| Página A | Página B | Similaridade | Classe |
| --- | --- | --- | --- |
| /energia-solar-palmas | /energia-solar-no-tocantins | 42% | MODERADA |
| /energia-solar-aparecida-de-goiania | /energia-solar-trindade | 39% | MODERADA |
| /energia-solar-goiania | /energia-solar-no-tocantins | 38% | MODERADA |
| /energia-solar-goiania | /energia-solar-aparecida-de-goiania | 36% | MODERADA |
| /energia-solar-anapolis | /energia-solar-no-tocantins | 36% | MODERADA |

Nenhum par acima de 50%. **Decisão: manter as 7 INDEX.**

### Palmas × Tocantins

| Elemento | Diferenciação |
| --- | --- |
| H1 / title | municipal vs. estadual — distintos |
| Introdução | contexto de cidade vs. contexto de estado |
| Seções | mesma estrutura, textos próprios |
| FAQ | perguntas parcialmente distintas (uma estadual: "a solução é a mesma para todo o estado?") |
| Links | Palmas → Tocantins e Tocantins → Palmas (hierarquia clara) |

Similaridade 42% (MODERADA) com intenção municipal × estadual clara: **ambas INDEX**.
Recomendação editorial futura: reforçar dados locais em Palmas (distribuidora,
perfil de consumo) e cobertura multi-cidade no estadual.

## 8. Consistência comercial

| Dimensão | Valores encontrados no HTML final | Conflito |
| --- | --- | --- |
| Percentual de economia | **25%** (único) | nenhum |
| Valor mínimo de conta | R$ 250,00 / R$ 300,00 (baixa tensão) · R$ 10 mil (alta tensão) | ver nota |
| Demanda mínima | 30 kW | nenhum |
| Estados citados | Goiás, Tocantins, Minas Gerais, Mato Grosso, Paraná | nenhum removido/adicionado |
| Fidelidade / adesão | "sem fidelidade, sem taxa de adesão" | consistente |

**Correção aplicada:** 5 ocorrências residuais de "até 26%" foram alinhadas à regra
comercial vigente ("até 25%"), já validada pelo cliente:
`consorcio-bc-energia/page.tsx`, `consorcio-bc-energia/data.tsx` (3),
`gestao-de-energia/page.tsx`, `home/Sliders/Sliders.data.tsx`.

**PENDÊNCIA DE CONTEÚDO (não corrigida):** o valor mínimo de conta em baixa tensão
aparece como R$ 250,00 (artigos/consórcio) e R$ 300,00 (card de produto e select de
formulário). Depende de regra de negócio — não alterado automaticamente.

**PENDÊNCIA DE ARQUITETURA:** não existe `src/config/business.ts` ou equivalente.
Percentuais, valores mínimos, demanda e estados continuam hardcoded em múltiplos
arquivos (`solutions.data.ts`, `regions/index.ts`, `segments.content.ts`,
`articles.ts`, páginas de produto). Recomenda-se uma fonte única de verdade
comercial em fase posterior.

Assets: `/img/pages/consorcio-intro.webp` ainda traz "ECONOMIZE ATÉ 26%" embutido
na arte (ver `docs/PENDENCIAS-ASSETS.md`) — depende de nova peça gráfica.

## 9. CTAs (somente inventário, sem alteração)

"Quero economizar", "Solicitar análise da conta", "Falar com especialista",
"Simule agora". Promessas coerentes entre si (análise gratuita da conta);
padronização de CRO fica para fase posterior.

## 10. Links internos, órfãs e profundidade

- Links internos verificados: 6.516 · quebrados: 0 · para redirects: 0.
- **Página órfã corrigida:** `/energia-solar-anapolis` recebia 0 links internos.
  Foi adicionado um link em "Relacionados" da página de Goiânia (apenas um item de
  lista, sem mudança visual de componente).
- Órfãs restantes: **0**.
- Profundidade máxima a partir da Home: **3 cliques**.
- Links de páginas INDEX para conteúdo noindex: 4 (`/conteudo`, `/sobre/leilao`,
  `/sobre/fator-de-alavancagem`, `/sobre/condicoes-gerais-varejistas`) —
  classificação: **LEGÍTIMO** (navegação institucional) / `/conteudo`:
  **REVISAR APÓS PUBLICAÇÃO EDITORIAL**.

## 11. Conteúdo oculto

Único texto oculto do site: o `<h1 class="sr-only">` da Home (`Slider.tsx`).
Auditoria: reflete o título institucional da rota (`meta.ts`), sem keyword
stuffing, acessível a leitores de tela e justificado estruturalmente (o Swiper em
loop clona slides e geraria múltiplos H1). **Mantido como está.**
Nenhum texto criado exclusivamente para mecanismos de busca foi encontrado.

## 12. Páginas NOINDEX com conteúdo real

`/sobre/leilao`, `/sobre/fator-de-alavancagem`, `/sobre/condicoes-gerais-varejistas`
e `/contato/enviado` mantêm conteúdo real — decisão de noindex é estratégica,
não é erro.
