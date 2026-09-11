# FRONT-END 12 — Páginas de Segmentos

Fase 3 (Front-end e Design System). Padrão visual único para o hub `/segmentos`
e as 11 páginas de segmento, preservando SEO, metadata e conteúdo real.

## 1. Auditoria inicial (antes)

| Segmento | Hero | Desafios | Soluções | Benefícios | CTA |
| --- | --- | --- | --- | --- | --- |
| agronegocio | PageHeader centralizado, H1 genérico "Soluções de energia para X" | parágrafo único (`challengesLead`) | RelatedLinks em lista | 3 itens do JSON (2 específicos) | Cta legado + FormEmbed |
| bares-e-restaurantes | idem | parágrafo único | lista | 3 itens genéricos | idem |
| condominio | idem | parágrafo único | lista | 3 itens (1 específico: 400 condomínios) | idem |
| educacional | idem | parágrafo único | lista | 3 itens genéricos | idem |
| lazer | idem | parágrafo único | lista | 3 itens genéricos | idem |
| religioso | idem | parágrafo único | lista | 3 itens genéricos | idem |
| residencial | idem | parágrafo único | lista | 3 itens específicos | idem |
| saude | idem | parágrafo único | lista | 3 itens genéricos | idem |
| servico | idem | parágrafo único | lista | 3 itens genéricos | idem |
| turismo | idem | parágrafo único | lista | 3 itens genéricos | idem |
| varejo | idem | parágrafo único | lista | 3 itens genéricos | idem |

Problemas registrados: H1 idêntico em 11 rotas (troca só do nome), bloco
`AboutSegment` com texto longo quase idêntico entre setores (lazer x turismo
= 0,77 de similaridade), soluções em lista textual duplicando nomes/URLs do
portfólio, CTA legado com claim institucional em `dangerouslySetInnerHTML`.

## 2. Arquitetura comum (depois)

```
PageHeader (align=left, breadcrumb + eyebrow + H1 + descrição + CTA duplo)
SegmentIntro       — contexto do segmento (texto + imagem do segmento)
SegmentChallenges  — 3 desafios em card + BCIcon (surface-muted)
SegmentIntro       — "Como ajudamos" (sem imagem)
SegmentSolutions   — HubCards do portfólio (surface-muted)
SegmentBenefits    — benefícios reais do JSON do segmento
ProductSteps       — "Como funciona a análise" (3 passos, reuso do primitivo)
Customers          — prova institucional (logos existentes)
SegmentCta         — próximo passo, bloco escuro pontual
RelatedLinks       — continue navegando
FormEmbed          — inalterado (campos, integração e tracking preservados)
```

Ritmo de fundo: `surface` → `muted` → `surface` → `muted` → `surface` → `muted`
→ `dark` (apenas no CTA final). Nenhuma cor por segmento.

## 3. Hub `/segmentos`

- Alterado: sim, apenas apresentação.
- Ajustes: `PageHeader` passou para a variante `align="left"` (mesma família das
  páginas de produto), `Heading` substituído por `SectionHeader`, container e
  espaçamento padronizados, bloco `Customers` (variante grid) adicionado como
  prova institucional.
- Cards: inalterados na arquitetura (`HubCard` + `HubCardGrid`, card inteiro
  clicável, fonte `SEGMENT_HUB_ITEMS`).

## 4. Fonte única de dados

- `src/data/segments/*.json` — conteúdo original (título, imagem, benefícios).
- `src/data/segments/segments.content.ts` — camada estrutural (eyebrow, H1,
  descrição, introdução, desafios, "como ajudamos", hrefs de soluções, análise,
  próximo passo).
- `src/config/navigation.ts` — `SEGMENT_HUB_ITEMS` (hub) e `PRODUCT_HUB_ITEMS`
  (cards de solução). Nenhuma lista paralela de produtos foi criada.
- `SEGMENT_SLUGS`/`SEGMENT_NAMES` permanecem como índice leve das rotas.

## 5. Soluções recomendadas

| Segmento | Soluções mostradas |
| --- | --- |
| agronegocio | Mercado Livre, Gestão de Energia, Consórcio |
| bares-e-restaurantes | Consórcio, Mercado Livre, I-REC |
| condominio | Consórcio, Gestão de Energia |
| educacional | Consórcio, Mercado Livre, I-REC |
| lazer | Consórcio, Mercado Livre, Gestão de Energia |
| religioso | Consórcio, Mercado Livre |
| residencial | Consórcio |
| saude | Mercado Livre, Gestão de Energia, I-REC |
| servico | Consórcio, Mercado Livre, Gestão de Energia |
| turismo | Consórcio, Mercado Livre, I-REC |
| varejo | Consórcio, Mercado Livre, Gestão de Energia |

URL do I-REC preservada: `/produtos/certificacao-renovavel-irec`.

## 6. Sobreposição editorial

Similaridade (Jaccard de termos) entre pares críticos:

| Par | Texto legado renderizado | Copy estrutural atual |
| --- | --- | --- |
| lazer x turismo | 0,77 | 0,31 |
| servico x varejo | 0,45 | 0,17 |
| bares-e-restaurantes x varejo | 0,41 | 0,19 |
| bares-e-restaurantes x servico | 0,36 | 0,25 |
| educacional x saude | 0,35 | 0,28 |

O ganho vem de dois pontos: (a) a introdução passou a ser curta e específica,
derivada do próprio texto do segmento; (b) o parágrafo longo praticamente
idêntico entre setores deixou de ser renderizado. Nenhuma dor nova, percentual,
sazonalidade, case ou cliente foi inventado.

Pendência editorial registrada: os benefícios do JSON continuam genéricos em 8
dos 11 segmentos ("Entendemos a sua necessidade", "Adicione SUSTENTABILIDADE",
"Seja destaque no seu segmento"). Reescrevê-los exige decisão editorial e ficou
fora desta etapa.

## 7. Imagens

Todas as imagens são as já existentes: `coverUrl` do hero
(`/img/global/arrendamento-de-usinas.jpg` em 11 rotas — registrado como
pendência de asset) e a imagem específica de cada segmento em
`/img/pages/segmentos/*.webp` (11 arquivos distintos, incluindo
`hotelaria.webp` para turismo). Nenhuma imagem nova foi gerada. Imagens abaixo
da dobra com `loading="lazy"`, `decoding="async"`, `width`/`height` e `sizes`.

## 8. Responsividade

- Mobile 360 / 390 / 768: sem overflow horizontal em `/segmentos`,
  `/segmentos/agronegocio`, `/segmentos/varejo`, `/segmentos/turismo`.
- Desktop 1024 / 1280 / 1440: grid 3 colunas nos cards, hero em duas colunas.
- Cards e CTAs com altura mínima de 48px.

## 9. Acessibilidade

1 H1 por página (33/33 rotas pré-renderizadas), H2 por seção e H3 nos cards,
eyebrow sempre em `<p>`, links reais (card inteiro é `<a>`), `alt` descritivo nas
imagens de conteúdo e `aria-hidden` nos ícones decorativos, `focus-visible` nos
cards e CTAs.

## 10. Performance

- JS inicial: 490 KB (151,1 KB gzip) — dentro do budget de 160 KB.
- Rotas de segmento seguem lazy; os JSONs dos 11 segmentos permanecem no chunk
  da rota e não aparecem no bundle inicial da Home.
- Auditoria de performance: 0 WARNING, 1 INFO (fragmentação de chunks).

## 11. SEO

- Prerender: 33 rotas + 404.html.
- Sitemap: 33 URLs.
- Metadata, canonical, robots e JSON-LD inalterados (segmentos seguem apenas
  com BreadcrumbList, sem Service/Product).
- 1 H1 em 33/33 páginas.

## 12. Componentes criados

`src/components/Segment/`: `SegmentSection` (reuso do `ProductSection`),
`SegmentIntro`, `SegmentChallenges`, `SegmentSolutions`, `SegmentBenefits`,
`SegmentCta`.

## 13. Screenshots

`/segmentos` (1440, 1280, 768, 390), `/segmentos/agronegocio` (1440, 1280,
1024, 768, 390, 360), `/segmentos/varejo` (1440, 1280, 768, 390),
`/segmentos/turismo` (1440, 1280, 768, 390).
