# FRONT-END 08 — Home: BC Cast + Conteúdo

## 1. Estrutura anterior

Uma única seção `Content` (`bg-gray-100`, `Section` legado) contendo:

- `BcCast.tsx` — `Heading subtitle="BC Cast"`, grid de 2 colunas com **todos** os episódios em
  `YouTubeEmbed` de altura fixa (400px) e CTA em link externo para
  `https://www.youtube.com/@grupobcenergia/videos`.
- `Blog.tsx` — **desativado** (comentado em `Content.tsx`). Consumia o WordPress externo via
  `useGetBlogPosts`, com carrossel Swiper, `bg-[length:100%_100%]` e `h3` dentro de link.

Problemas: sem eyebrow/descrição do Design System; sem hierarquia entre episódios; H2 genérico
("Confira nosso podcast" na prática); altura fixa causando desperdício de espaço; CTA saindo do
site em vez de apontar para o hub real `/conteudo/bc-cast`; subseção de blog morta consumindo
feed externo; `bg-gray-100` fora dos tokens.

## 2. Fontes de dados

| Conteúdo | Fonte | Mock? |
| --- | --- | --- |
| Episódios | `src/data/content/episodes.ts` (`getEpisodes`, `getEpisodeLabel`) | não |
| Artigos | `src/data/content/articles.ts` (`getArticles`) | não |
| Categoria do artigo | `src/data/content/clusters.ts` | não |

`src/mooks/content.ts` continua removido e **não** foi reintroduzido. Nenhum placeholder.

## 3. Episódios encontrados (2 reais)

| # | Título | Convidado | Thumbnail | Campos ausentes |
| --- | --- | --- | --- | --- |
| 02 | Rubens Fileti — Presidente da ACIEG | Rubens Fileti (Presidente da ACIEG) | `i.ytimg.com/vi/RrcOwWEAoDY/hqdefault.jpg` | data, duração, descrição, transcrição |
| 01 | Tiago Mendonça — Ex-Secretário de Agricultura, Pecuária e Abastecimento de Goiás | Tiago Mendonça | `i.ytimg.com/vi/vVnokGbhNPk/hqdefault.jpg` | idem |

Data, duração e transcrição permanecem pendências registradas na fase SEO — não foram estimadas.
A seção funciona sem esses campos.

## 4. Artigos encontrados (1 real)

| Artigo | Cluster | Imagem | Destino |
| --- | --- | --- | --- |
| Energia solar por assinatura: entenda como funciona | Geração distribuída e energia por assinatura | nenhuma (pendência editorial) | `/conteudo/blog/energia-solar-por-assinatura` |

Com um único artigo, o grid não é preenchido artificialmente: renderiza-se **um** card
tipográfico (`max-w-3xl`). Nenhuma thumbnail nova foi gerada.

## 5. Composição BC Cast (`src/pages/home/Sections/Content/BcCast.tsx`)

- Eyebrow: `BC Cast` (t-eyebrow, amarelo sobre fundo escuro)
- H2: `Conversas sobre energia, negócios e decisões que movem empresas`
- Descrição: 2 linhas sobre o tipo de conversa e o público
- Layout: destaque 7/12 (facade 16:9 + rótulo do episódio + H3 + convidado) e coluna 5/12 com o
  episódio secundário (thumb 16:9 + H3 + convidado) e CTA
- Background: `bg-bc-dark`
- CTA: `Ver todos os episódios` → `/conteudo/bc-cast` (rota real, sem `nofollow`)

## 6. Composição editorial (`src/pages/home/Sections/Content/Articles.tsx`)

- Eyebrow: `Conteúdo`
- H2: `Material para entender melhor o mercado de energia`
- Descrição: 2 linhas
- Layout: `Card` (variant default, interactive) com Badge de cluster, H3 linkado e excerpt real
- Background: `bg-surface`
- CTA: `Ver todos os conteúdos` → `/conteudo/blog`

Ritmo de fundos: Usinas (`surface-muted`) → BC Cast (`bc-dark`) → Conteúdo (`surface`) →
Customers/FinalCta (não alterados).

## 7. Vídeo e imagens

`YouTubeEmbed` (facade da PERFORMANCE 04) preservado: thumbnail + botão acessível
(`aria-label="Reproduzir vídeo: …"`), iframe apenas após clique, `loading="lazy"`,
`decoding="async"`. Zero iframes de YouTube no carregamento inicial (verificado em 6 breakpoints).
Contêineres com `aspect-video` reservam espaço (sem CLS). Nenhuma imagem nova foi criada.

## 8. Responsividade (validada)

- 360 / 390: coluna única, thumbnail legível, títulos em 3–4 linhas, botões ≥44px, sem scroll horizontal
- 768: coluna única com destaque grande e card secundário horizontal (thumb + texto)
- 1024 / 1280 / 1440: grid 12 colunas, destaque 7/12 + lista 5/12; artigos em `Card`

## 9. Acessibilidade

H2 por seção e H3 por episódio/artigo; play como `<button>` com label; navegação por `<Link>`;
`alt=""` na thumbnail decorativa do facade (o título está em HTML ao lado); focus-visible do DS;
contraste AA no bloco escuro.

## 10. Indexação (inalterada)

`/conteudo`, `/conteudo/blog`, `/conteudo/bc-cast` e as rotas de episódio/artigo permanecem
`noindex,follow` e fora do sitemap e de `INDEXABLE_ROUTES`. Nenhum `Article`, `PodcastEpisode` ou
`VideoObject` novo foi emitido na Home. Links internos seguem normais (sem `nofollow`).

## 11. Performance / auditorias

- JS inicial: 151,2 KB gzip (budget ≤ 160 KB) — 0 ERROR no `audit:budget`
- Design System: 0 ERROR
- Semântica: 33/33 rotas com exatamente 1 H1 · prerender 33 rotas + 404
- Nenhuma biblioteca adicionada (o Swiper deixou de ser usado por esta seção)

## 12. Screenshots

1440, 1280, 1024, 768, 390, 360 — BC Cast completo e Conteúdo completo, incluindo as transições
Usinas → BC Cast → Conteúdo.
