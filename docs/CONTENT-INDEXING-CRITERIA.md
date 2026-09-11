# Critérios de indexação de conteúdo — Blog e BC Cast

**Status atual: `/conteudo/blog`, `/conteudo/bc-cast` e todas as rotas de item
(`/conteudo/blog/:slug`, `/conteudo/bc-cast/:slug`) estão `noindex,follow` e
fora do `sitemap.xml`.**

A avaliação agora é **por URL**, em `src/config/contentIndexing.ts`:
`ready` (index,follow), `needs-editorial-review` e `not-ready` (noindex,follow).
Além de cumprir os critérios deste documento, o slug precisa de liberação
editorial explícita em `EDITORIAL_APPROVED`. Relatório atual:
`bun run audit:indexing-content` (ver docs/CONTENT-INDEXING-AUDIT.md).

> Observação: no ambiente duplicado (preview), TODAS as páginas recebem
> `noindex,nofollow` por `isPreviewEnvironment()` (Bloco 01). A trava deste
> documento é adicional e continua valendo no domínio oficial.

## Por que noindex agora

- O Blog não tem nenhum artigo real publicado (`src/data/content/articles.ts`
  está intencionalmente vazio).
- O BC Cast tem 2 episódios reais, mas sem descrição editorial, data de
  publicação, duração ou transcrição — dados que não podem ser inventados.
- Indexar página de listagem vazia ou item sem conteúdo próprio gera
  *thin content* e desperdício de rastreamento.

## Checklist para liberar a indexação

### Hub do Blog (`/conteudo/blog`)

- [ ] Pelo menos **3 artigos reais publicados**, revisados e aprovados.
- [ ] Cada artigo pertence a um cluster de `src/data/content/clusters.ts`.
- [ ] Hub com texto introdutório próprio (não é só uma lista de links).
- [ ] Title e description exclusivos (já definidos em `src/config/meta.ts`).

### Artigo (`/conteudo/blog/:slug`)

- [ ] Conteúdo original, sem *lorem ipsum* e sem texto gerado sem revisão.
- [ ] H1 único = título do artigo; hierarquia H2/H3 coerente.
- [ ] `excerpt` (usado como description) exclusivo, entre ~120 e 160 caracteres.
- [ ] `publishedAt` real preenchido (sem isso o schema `Article` não é emitido).
- [ ] Autor real informado quando houver responsável identificável.
- [ ] Pelo menos 1 link interno para a página comercial do cluster
      (`solutionPath` ou `moneyPath`) com âncora descritiva.
- [ ] Se o tema for regulatório/tarifário (`requiresExternalResearch: true`):
      pesquisa externa atualizada feita e **fontes citadas** em `sources`.
- [ ] Nenhuma promessa de percentual de economia, prazo ou condição comercial
      que não exista nas páginas oficiais do site.
- [ ] FAQ, se houver, está **visível na página** (só então o `FAQPage` é emitido).

### Hub do BC Cast (`/conteudo/bc-cast`)

- [ ] Pelo menos 2 episódios com página própria completa (abaixo).
- [ ] Texto introdutório explicando o que é o BC Cast.

### Episódio (`/conteudo/bc-cast/:slug`)

- [ ] `excerpt`: resumo editorial real do episódio (não a transcrição).
- [ ] `uploadDate` real (ISO) — obrigatório para o `VideoObject`.
- [ ] `duration` no formato ISO 8601 (ex.: `PT42M10S`), quando disponível.
- [ ] Thumbnail oficial do episódio (para `VideoObject.thumbnailUrl`).
- [ ] `topics` reais ou transcrição/resumo em blocos — conteúdo textual próprio
      além do vídeo embedado.
- [ ] Convidado(s) com nome e cargo corretos.

## Como liberar (passo a passo)

1. Cumprir o checklist acima para o conteúdo em questão.
2. Preencher os dados reais em `src/data/content/articles.ts` e/ou
   `src/data/content/episodes.ts`.
3. Alterar `CONTENT_INDEXING_ENABLED` para `true` em
   `src/config/meta-content.ts`.
4. Incluir as rotas no sitemap: remover `/conteudo/blog` e `/conteudo/bc-cast`
   de `NOINDEX_ROUTES` em `src/config/routes.ts` e adicionar as rotas de item
   (hub + slugs dos conteúdos publicados) em `INDEXABLE_ROUTES`.
5. Rodar `npm run build` (o sitemap e o prerender são regenerados nos hooks).
6. Validar: `robots` da página deve sair como ausente (indexável), canonical
   auto-referente e JSON-LD presente.
7. Solicitar indexação no Search Console após o cut-over de domínio.

## O que NÃO fazer

- Não liberar indexação "para testar".
- Não publicar artigo com dado regulatório sem fonte e sem data de verificação.
- Não criar artigo que dispute a mesma intenção de uma página comercial
  existente (ver seção de canibalização em `docs/SEO-CONTENT-PLAN.md`).
- Não gerar transcrição automática sem revisão humana.

---

## Status por conteúdo

### `/conteudo/blog/energia-solar-por-assinatura` — aguardando revisão editorial

Primeiro artigo P1 do plano (`docs/SEO-KEYWORD-RESEARCH-2026.md`).
Tecnicamente completo, **noindex,follow** e fora do sitemap.

Atendido:

- [x] Conteúdo original, sem placeholder, ~1.500 palavras.
- [x] H1 único; H2/H3 coerentes; FAQ visível na página (FAQPage emitido).
- [x] `excerpt` exclusivo (159 caracteres) usado como description.
- [x] Links internos com âncora descritiva para `/produtos/consorcio-bc-energia`,
      `/produtos/mercado-livre-de-energia` e `/contato`.
- [x] Sem promessa própria de economia: o "até 26%" aparece apenas como
      condição divulgada do Consórcio BC Energia (origem:
      `src/pages/produtos/consorcio-bc-energia/data.tsx`).
- [x] Breadcrumb visual + BreadcrumbList.
- [x] Tracking `content_view` e `content_cta_click`.

Pendências que BLOQUEIAM a liberação:

- [ ] `publishedAt` — data real de publicação (sem isso o schema `Article`
      não é emitido, por desenho).
- [ ] `author` / `reviewer` — pessoa real do Grupo BC Energia.
- [ ] **PENDÊNCIA DE IMAGEM EDITORIAL** — não existe asset adequado no
      projeto. O campo `image` ficou vazio e o cabeçalho usa a imagem
      institucional padrão. Não usar placeholder nem banco de imagens
      genérico.
- [ ] Revisão humana das afirmações comerciais (valor mínimo de R$ 250,00,
      ausência de fidelidade e de taxa de adesão, faixa de até 26%) —
      confirmar que seguem vigentes.

Nenhuma afirmação regulatória (ANEEL, Lei 14.300, tarifas, tributos) foi
escrita no artigo. A explicação de créditos e de responsabilidade da
distribuidora reproduz o que já está publicado na página comercial do
Consórcio BC Energia. Se, na revisão, o time quiser aprofundar regulação,
isso exige pesquisa externa e citação de fonte (`sources`).
