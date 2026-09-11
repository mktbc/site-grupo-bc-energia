# FRONT-END 11 — Páginas de Produtos

Fase 3 (Front-end e Design System). Objetivo: uma arquitetura visual única para
as cinco soluções, sem cinco layouts desconectados e sem alterar a proposta
comercial publicada.

## 1. Auditoria inicial (antes)

| Produto | Hero | Benefícios | Steps | Form | FAQ | CTA |
| --- | --- | --- | --- | --- | --- | --- |
| Mercado Livre | PageHeader center + ArrowMask | `Features` (3 cards, grid ad-hoc) | `HowItWorks` (6 itens) | `FormularioMercadoLivre` em `BcFormSection` | 4 itens (`Accordion`) | Cta legacy + Numbers + form |
| Consórcio | PageHeader center | `Features` dentro do `About` | bloco inline `howItWorksB` (markup próprio) | `FormEmbed` | 4 itens | Numbers + form |
| Gestão | PageHeader center | nenhum (só `ChecklistItem`) | inexistente | `FormularioMercadoLivre` | nenhuma | 2× `Cta` legacy + form |
| I-REC (certificação) | PageHeader center | `Features` com números "01/02/03" | inexistente | `FormEmbed` | nenhuma | `Cta light` + form |
| Arrendamento | PageHeader center | `<ul>` de texto corrido | `howItWorks` só no data (não renderizado) | `FormularioParceiro` | nenhuma | Cta legacy + caixa cinza + form |

Problemas visuais recorrentes: containers ad-hoc (`lg:w-3/5`, `pl-6 pr-6 pt-10`),
`bg-gray-100`/`bg-teal` hardcoded, `text-justify`, ícones diferentes para a mesma
função (✓ vs 01/02/03), heros idênticos sem CTA e ordem de seções divergente.

## 2. Arquitetura final (comum às cinco páginas)

```
PageHeader (align="left", breadcrumb + eyebrow + H1 + descrição + CTA)
ProductIntro        — o que é / qual problema resolve (5/12 texto, 7/12 imagem)
ProductBenefits     — 3 ou 4 cards do DS
ProductSteps        — como funciona (passos numerados)
ProductAudience     — para quem é + requisitos (quando há copy real)
ProductHighlight    — checklist de escopo/portfólio (superfície escura)
Numbers             — prova (dados reais de faturamento)
ProductFaq          — Accordion do DS (somente onde já existia FAQ)
RelatedLinks        — linking interno
ProductFormSection / FormEmbed — CTA final (um único formulário por página)
```

Ritmo de fundo: `surface` → `surface-muted` → `surface` → `dark`, sem "cor por
produto". Todos os cards usam `Card` + `BCIcon`; todos os checks usam o mesmo
ícone.

## 3. Componentes compartilhados

Criados em `src/components/Product/` (exportados via `src/components/index.ts`):

- `ProductSection` — invólucro com `Container` e tons `surface | muted | dark`.
- `ProductIntro` — introdução 5/12 + 7/12, highlights e CTA opcional.
- `ProductBenefits` — grade de 3/4 cards (`Card` + `BCIcon`).
- `ProductSteps` — passos numerados + imagem + nota, sem timeline decorativa.
- `ProductAudience` — perfis + checklist de requisitos.
- `ProductHighlight` — checklist de escopo/portfólio.
- `ProductFaq` — `Accordion` do DS (H3 + `button aria-expanded`).
- `ProductFormSection` — contêiner visual do formulário (campos intocados).

Refatorado: `PageHeader` ganhou `cta` e `secondaryCta` (apenas na variante
`align="left"`), sem alterar o LCP (mesmo `bgImage` WebP, sem imagem nova).

Removido: `src/pages/produtos/mercado-livre-de-energia/Sections/` (substituído
por `ProductHighlight`).

## 4. Por produto

**Mercado Livre (piloto)** — Hero com "Enviar minha conta para análise" +
"Ver como funciona"; Intro com highlights "Quem pode? / Onde atendemos?";
4 benefícios; 3 passos (viabilidade → assessoria → gestão); contexto do ACL em
6 cards; "Para quem é" (indústrias, comércios, instituições + requisitos de
Grupo A); portfólio de contratos; Numbers; FAQ (4, com FAQPage schema);
`FormularioMercadoLivre`.

**Consórcio** — Hero com CTA para o app (fluxo já validado); Intro (até 25%,
sem taxa, sem fidelidade, a partir de R$250,00); 4 benefícios; 4 passos
(geração → injeção → créditos → economia); "Para quem é" (residencial e
comercial de baixa tensão + requisitos); contexto de Geração Distribuída (5
cards); Numbers; FAQ (4, com FAQPage schema); `FormEmbed`.

**Gestão** — Hero com "Enviar minha conta para análise"; Intro com highlights
(até 25% e Sistema de Gerenciamento de Energia); 4 benefícios derivados do
escopo publicado; `ProductHighlight` com o escopo do serviço; Numbers;
`FormularioMercadoLivre` (`solucao="gestao_energia"`). Sem FAQ (não existia).

**I-REC** — Hero explicativo; Intro "Entenda o que é I-REC" com highlights
(1 I-REC = 1 MWh; disponível ao mercado cativo); 3 benefícios; segunda intro
invertida "Somos especialistas em I-REC"; Numbers; `FormEmbed`. Sem FAQ.

**Arrendamento** — Hero para proprietários de usina; Intro com highlights
(+70 parceiros, gestão comercial); 4 benefícios (data existente); 3 passos
(gestão comercial, foco na manutenção, pagamento); Numbers;
`FormularioParceiro`. Sem FAQ.

## 5. Hub /produtos

Não alterado. Já usa `SolutionShowcase`/`HubCard` e permanece coerente com o
novo padrão das páginas internas.

## 6. Responsividade

Validado com Playwright (viewport 1800px de altura):

- 360 e 390: hero em coluna única, CTA full-width com altura ≥ 48px, cards 1 col.
- 768: cards 2 colunas, intro em coluna única.
- 1024 / 1280 / 1440: intro 5/12 + 7/12, benefícios 3–4 colunas.

## 7. Acessibilidade

- 1 H1 por rota (33/33 no audit de semântica).
- Hierarquia H2/H3 coerente (eyebrow não é heading).
- FAQ mantém `h3 > button` com `aria-expanded`.
- CTAs são links reais com `focus-visible` do DS; formulários inalterados
  (labels, validação, integração e tracking preservados).

## 8. Performance

- JS inicial: **151.1 KB gzip** (budget ≤ 160 KB) — inalterado pela etapa.
- Chunks de produto continuam lazy; `ProductHighlight` gerou chunk próprio
  compartilhado (3.22 KB gzip).
- Nenhuma biblioteca nova; nenhuma imagem nova; todas as imagens abaixo da dobra
  com `loading="lazy"`, `width/height`, WebP e `srcset/sizes` onde já existiam.
- Audits: design system 0 ERROR; budget 0 ERROR; estrutura de dados válida em
  33 rotas; prerender 33 rotas + 404.

## 9. Pendências registradas (não resolvidas nesta etapa)

- **Conflito comercial R$250 × R$300 e 25% × 26%**: os banners
  `/img/pages/consorcio-intro.webp` e `/img/pages/gestao-de-energia-intro.webp`
  são artes com texto embutido ("até 26%", "a partir de R$ 300,00"). Requer
  validação de negócio e nova arte; nenhum texto de código foi alterado.
- **Imagem repetida**: `/img/pages/arendamento-de-usinas-intro.webp` é usada no
  Consórcio (passos) e no Arrendamento. Sem asset melhor disponível hoje.
- **`FormEmbed` externo**: `simulador.bcenergiacomdesconto.com.br` responde 404
  no ambiente duplicado (integração não migrada). Pré-existente.
- `/produtos/irec` permanece apenas como redirect 301 para
  `/produtos/certificacao-renovavel-irec`; nenhuma nova referência foi criada.
