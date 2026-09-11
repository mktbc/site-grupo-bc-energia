# FRONT-END 03 — Home: Hero + primeira dobra

## 1. Hero anterior

- Altura: `h-[105vh]` (excedia a viewport, empurrava a próxima seção)
- Slides: 3 (Swiper, loop, autoplay 2.5s)
- H1: `sr-only` em `Sections/Slider.tsx` (título do meta), slides com H2
- Headline slide 1: "Migre sua empresa para o Mercado Livre e economize na conta de energia"
- Subheadline: parágrafo de 3 linhas com jargão ("Nossa atuação vai além da migração...")
- CTA: único, `variant="secondary"` (branco) — "Conhecer o Mercado Livre de Energia"
- Imagem: `/bg-home.webp` (50,7 KB), overlay `teal-950` fixo
- Alinhamento: centralizado no mobile, à esquerda apenas em `lg`
- Problemas: H1 invisível; hero alto demais; nenhum CTA de conversão; sem eyebrow; sem prova de confiança; tipografia fora do Design System (`text-3xl`… hardcoded); autoplay muito rápido (2,5s) e sem `prefers-reduced-motion`; loop do Swiper duplicava slides no DOM.

## 2. Hero atual

- Altura: `min-h-[100svh]` no mobile · `h-[86svh] min-h-[600px] max-h-[860px]` a partir de `md`
- Layout: coluna única, conteúdo alinhado à esquerda, largura máxima 680px (parágrafo 600px)
- Imagem: `/bg-home.webp` (mantida), `bg-[center_right_30%]`
- Overlay: gradiente `bc-dark/90 → /70 → /30` (mobile) e `/85 → /55 → /10` (desktop)
- Tipografia: `t-eyebrow`, `t-h1` (clamp do Design System), body `text-lg/xl`
- Componentes: `Section`, `ButtonLink` (primary/outline), tokens `bc-yellow`, `bc-dark`, `text-inverse`

## 3. H1

- Antes: `sr-only` com o title da rota
- Depois: headline visível do primeiro slide (`primary: true` em `Sliders.data.tsx`)
- Quantidade no HTML prerenderizado: **1** (auditoria: 33 rotas com exatamente 1 H1)
- Viabilizado trocando `loop` por `rewind` no Swiper do hero — sem slides duplicados no DOM.

## 4. Copy

| Elemento | Antes | Depois |
| --- | --- | --- |
| Eyebrow | — | GRUPO BC ENERGIA |
| Headline | Migre sua empresa para o Mercado Livre e economize na conta de energia | Reduza o custo de energia da sua empresa com o **Mercado Livre** |
| Subheadline | Solução para empresas com contas acima de R$10 mil. Nossa atuação vai além da migração… | Comercialização, gestão e geração distribuída de energia para empresas com contas acima de R$ 10 mil. Analisamos a sua conta e mostramos onde está a economia. |
| CTA principal | Conhecer o Mercado Livre de Energia → /produtos/mercado-livre-de-energia | Enviar minha conta para análise → /contato |
| CTA secundário | — | Conhecer soluções → /produtos |

Nenhuma promessa, percentual ou número novo foi criado.

## 5. Prova de confiança

Linha discreta abaixo dos CTAs: “+5 mil clientes atendidos · +R$ 400 milhões de economia gerada”.
Fonte: `src/services/salesForce/salesForce.ts` (FALLBACK da seção Números) e slide 3 já existente.

## 6. Slider

- Biblioteca: Swiper (mantida, nenhuma lib nova)
- Slides: 3 (slide 1 = H1; slides 2 e 3 = H2, mesma composição visual)
- Autoplay: 7s (antes 2,5s), desativado quando `prefers-reduced-motion: reduce`
- `loop: false` + `rewind: true`
- Controles: dots com pill ativa amarela, setas reduzidas e ocultas < 768px, `focus-visible` com outline amarelo

## 7. Mobile

- 360 / 390: headline em 4 linhas, CTAs empilhados full-width, trust line visível, sem sobreposição do texto sobre a pessoa da imagem (overlay mais forte)
- 768: layout idêntico ao desktop em coluna única

## 8. Acessibilidade

- H1 real e visível, ordem de leitura eyebrow → h1 → texto → CTAs → confiança
- CTAs com texto descritivo, alvo ≥ 48px (`size="lg"`)
- Controles do Swiper com foco visível
- Autoplay respeita `prefers-reduced-motion`

## 9. Performance (medido após a mudança)

- Hero image: `/bg-home.webp` 50,7 KB · preload `fetchpriority=high` preservado
- JS inicial: 148,9 KB gzip (budget 160 KB) — OK
- LCP (Home mobile 390, local): **1,21 s**
- CLS: **0,00036**
- Third-party no HTML inicial: 0 · font preloads: 2
- Budget: 0 ERROR

## 10. SEO

Sem alteração em title, description, canonical, robots ou JSON-LD.
33 rotas prerenderizadas · sitemap com 33 URLs · 1 H1 por rota · 404 com H1.

## 11. Screenshots validados

1440, 1280, 1024, 768, 390, 360 (`/tmp/browser/hero/home-*.png`).

## 12. Pendências

- Warnings pré-existentes de imagens > 500 KB (`footer-bg.png`, `2147948282.jpg`) fora do escopo desta etapa.
- Botão flutuante de WhatsApp fica próximo da trust line em 360px — avaliar na etapa de conversão.
