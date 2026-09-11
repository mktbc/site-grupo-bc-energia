# FRONT-END 16 — Conteúdo / Blog / BC Cast

Etapa de padronização editorial das rotas `/conteudo`, `/conteudo/blog`,
`/conteudo/bc-cast` e das rotas reais de artigo e episódio.
**Nenhuma liberação de indexação foi feita nesta etapa.**

## 1. Auditoria das rotas editoriais

| Rota | Tipo | H1 | Conteúdo | Imagem | Data | Autor/Convidado | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/conteudo` | hub | Conteúdo | destaques + áreas + temas | header | ausente | ausente | ok |
| `/conteudo/blog` | hub | Blog | 1 destaque real | ausente no artigo | ausente | ausente | ok |
| `/conteudo/bc-cast` | hub | BC Cast | 1 destaque + 1 anterior | thumb YouTube | ausente | Rubens Fileti / Tiago Mendonça | ok |
| `/conteudo/blog/energia-solar-por-assinatura` | artigo | Energia solar por assinatura: entenda como funciona | corpo em blocos + FAQ + fontes | ausente | ausente | ausente | ok |
| `/conteudo/bc-cast/tiago-mendonca` | episódio | BC Cast #01 \| Tiago Mendonça… | vídeo facade + convidados | thumb YouTube | ausente | Tiago Mendonça | ok |
| `/conteudo/bc-cast/rubens-fileti` | episódio | BC Cast #02 \| Rubens Fileti… | vídeo facade + convidados | thumb YouTube | ausente | Rubens Fileti | ok |

## 2. Fontes de dados

- Artigos: `src/data/content/articles.ts` (1 artigo real)
- Episódios: `src/data/content/episodes.ts` (2 episódios reais)
- Clusters: `src/data/content/clusters.ts` (taxonomia única, reutilizada)
- Relacionados: `src/data/content/related.ts`
- Feed externo: **não é consumido** nas rotas editoriais. A Edge Function
  `blog-posts` (WordPress) permanece no projeto, mas não é chamada por
  `/conteudo/*`. Nenhum mock foi reintroduzido.

## 3. Componentes

Criados em `src/components/Content/`:

- `ContentSection` — invólucro de seção (reusa `ProductSection`: container 1200px, 3 superfícies)
- `ArticleCard` — card textual de artigo (imagem/tema/data opcionais)
- `EpisodeCard` — card de vídeo (thumbnail 16:9, badge BC Cast, convidado)
- `EditorialLayout` — coluna de leitura única (~72ch), fim dos `max-w` ad hoc
- `RelatedContent` — até 3 conteúdos reais; não renderiza se não houver
- `ContentCta` — CTA contextual único, ao fim da leitura

Refatorados: `ContentBody`, `ContentEmptyState` (tokens do DS).
Removido: `ContentCard` (substituído por `ArticleCard`/`EpisodeCard`).

Artigo e episódio compartilham tokens, mas não são o mesmo objeto visual:
artigo é texto, episódio é vídeo.

## 4. Indexação

| Rota | Robots | Sitemap |
| --- | --- | --- |
| `/conteudo` | noindex,follow | fora |
| `/conteudo/blog` | noindex,follow | fora |
| `/conteudo/bc-cast` | noindex,follow | fora |
| artigos | noindex,follow | fora |
| episódios | noindex,follow | fora |

`CONTENT_INDEXING_ENABLED = false` em `src/config/meta-content.ts`.
`INDEXABLE_ROUTES` e o sitemap seguem com **33 URLs**. Canonical inalterado.
Nenhum schema `Article`/`VideoObject`/`PodcastEpisode` novo foi adicionado —
os existentes só emitem com dados reais (hoje o VideoObject fica ausente).

## 5. YouTube

- Facade preservado (`YouTubeEmbed`), iframe só após interação.
- **Iframes no carregamento inicial: 0** em todas as rotas editoriais (medido).
- Cards usam thumbnail estática `i.ytimg.com` com `width/height`, `loading=lazy`
  e `decoding=async`. Alvo de play ≥ 44px.

## 6. Performance

- Build: OK, prerender de 33 rotas + 404.
- Nenhuma biblioteca nova.
- Rotas editoriais permanecem em chunks próprios (fora do bundle da Home).
- Budget de JS inicial mantido (< 160 KB gzip).

## 7. Acessibilidade

- 1 H1 por rota (validado em 1440 e 390).
- Hierarquia H1 > H2 > H3 sem saltos; links do corpo sublinhados com `focus-visible`.
- Alt real nas thumbnails ("Miniatura do vídeo: …"); nenhum contexto inventado.
- 0 erros de console nas 5 rotas.

## 8. Screenshots

`/tmp/browser/content/`: `conteudo`, `blog`, `bccast`, `artigo`, `episodio`
em 1440 e 390.

## 9. Pendências editoriais (não escondidas)

- Apenas **1 artigo real** publicado — o hub do blog roda com destaque único.
- Artigo sem imagem, sem data de publicação, sem autor e sem revisor.
- Episódios sem `uploadDate`, sem duração, sem descrição e sem transcrição.
- Sem thumbnail própria dos episódios (usa a do YouTube).
- Volume insuficiente para busca, filtros ou paginação — não implementados.
- Enquanto esses campos faltarem, `Article` e `VideoObject` permanecem parciais
  ou ausentes, e a indexação não deve ser liberada
  (ver `docs/CONTENT-INDEXING-CRITERIA.md`).
