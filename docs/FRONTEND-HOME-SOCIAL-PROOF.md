# FRONT-END 05 — Home: Números + Prova Social

## 1. Estrutura anterior

Ordem na Home: Hero → Como ajudamos → Soluções → **Numbers** → **TestimonyCarousel** → **Customers** → RelatedLinks → Content → FinalCta.

- **Numbers** (`src/components/Numbers`): seção teal com `arrowMask`, logo branco, `Heading` grande, 3 métricas vindas de `getNumbers()` (Edge Function `salesforce-numbers`, com fallback local), CTA "Quero Economizar" → `/contato`, imagem de fundo `fundo-numeros.webp`. Métricas em amarelo `text-amber-400`, fora dos tokens do DS.
- **TestimonyCarousel**: Swiper com 3 depoimentos reais, `TestimonyCard` com fundo `bg-gray-200/60`, ícone de aspas decorativo, texto em itálico cinza, sem `blockquote`/`cite`.
- **Customers**: carrossel de 20+ logos reais de clientes.

Problemas: métricas duplicadas em 4 arquivos, dependência de fetch para exibir números na primeira renderização, seção pesada (logo + máscara + imagem + CTA), depoimentos sem semântica de citação, três blocos seguidos com pouco contraste entre si.

## 2. Métricas encontradas

| Métrica | Valor | Fonte | Status |
| --- | --- | --- | --- |
| Clientes | `+ de 5 mil` | `src/services/salesForce/salesForce.ts` (FALLBACK) | Confirmada — também no Hero (`+5 mil clientes atendidos`) |
| Economia gerada | `+ de R$400M` / `R$ 400 milhões` | `salesForce.ts`, `Sliders.data.tsx` (slide 3 + trust line) | Confirmada — mesma ordem de grandeza, formatação divergente |
| CO₂ evitado | `+ de 15 mil` toneladas | `salesForce.ts`, `sobre/sustentabilidade/data.ts`, `sobre/social/data.ts`, `sobre/condicoes-gerais-varejistas/data.ts` | Confirmada |
| Métricas remotas | variáveis | Edge Function `salesforce-numbers` (secret `SALESFORCE_API`) | Não configurada no ambiente duplicado → sempre o fallback |

## 3. Conflitos

- **Nenhum conflito de valor** foi encontrado: os três indicadores aparecem com o mesmo número em todas as fontes.
- **Divergência de formatação** (não de dado): `+ de R$400M` (serviço) vs `R$ 400 milhões` (Hero). Mantidos ambos; a seção de números usa `+ de R$ 400M`.
- **Pendência**: os valores podem estar desatualizados em relação ao Salesforce real. Nada foi alterado — decisão de negócio.

## 4. Fonte única

Criado `src/data/companyMetrics.ts` com `COMPANY_METRICS` (id, value, label, description) e `COMPANY_METRICS_LEGACY` (title/subtitle) consumido como fallback por `salesForce.ts`. Nenhum número novo foi criado.

## 5. Seção de números (atual)

- Eyebrow: `ESCALA E EXPERIÊNCIA` (amarelo sobre fundo escuro)
- H2: `Resultados construídos no mercado de energia`
- Descrição: 2 linhas
- 3 métricas, sem cards e sem ícones, divisores `border-white/10`
- Background: `bg-surface-dark`, `bc-section-lg`
- Valor em Barlow Condensed (`font-display`, clamp 2.5–3.5rem, `text-bc-yellow`, `whitespace-nowrap`), label em Onest (`t-label`), contexto em `t-body-sm`
- Semântica: `<dl>/<dt>/<dd>` com `dt` em `sr-only`

## 6. Prova social

`src/pages/home/Sections/Testimonials.tsx` — grade de 3 depoimentos reais em `Card` (`bg-surface`), sem carousel (conteúdo fixo cabe numa linha). `<blockquote>` para a citação e `<cite>` para o autor, logo do cliente com `loading="lazy"` 56×56.

| Autor | Empresa/cargo | Foto | Origem |
| --- | --- | --- | --- |
| Jhonatan Pinheiro | Supervisor de ESG da Novo Mundo | `novomundo.png` | `src/pages/home/Home.data.ts` |
| Taissa Machado | Gestora de Meio Ambiente da Triunfo Concebra | `triunfoconcebra.png` | idem |
| Heder Dias | Supervisor do Grupo Cereal | `grupocereal.png` | idem |

Textos preservados integralmente. Logos de clientes: `Customers` mantido como está (fora do escopo de redesign desta etapa).

## 7. CTA

Nenhum CTA novo. O CTA da antiga seção de números foi removido porque o fluxo já tem CTA no Hero, no fim de Soluções e no `FinalCta`.

## 8. Responsividade

- 360/390: 1 coluna nas métricas e nos depoimentos, sem compressão
- 768: métricas 2 colunas, depoimentos 1 coluna
- 1024/1280/1440: métricas 3 colunas com divisores, depoimentos 3 colunas, header limitado a 46rem

## 9. Acessibilidade

H2 por seção, `<dl>` semântica, `blockquote`/`cite`, alt descritivo nas logos, contraste validado em superfície escura (amarelo e branco sobre `surface-dark`), foco preservado (sem novos elementos interativos).

## 10. Performance e auditorias

- JS inicial: 148,1 KB gzip (budget 160 KB) — 0 ERROR no budget
- Nenhuma imagem nova; logos abaixo da dobra em `lazy`
- Design System: 0 ERROR · 3 WARNING · 8 INFO (todos pré-existentes)
- SEO: 33 rotas pré-renderizadas, sitemap 33, canonical, robots, JSON-LD intactos, 1 H1 por rota

## 11. Screenshots

`home_numeros` e `home_depoimentos` em 1440, 1280, 1024, 768, 390 e 360.
