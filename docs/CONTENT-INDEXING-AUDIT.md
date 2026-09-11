# Auditoria de indexação — conteúdo editorial (Blog + BC Cast)

Relatório vivo. Gerar a versão atual com:

```bash
bun run audit:indexing-content
```

Fonte da decisão: `src/config/contentIndexing.ts` (critérios técnicos) +
`EDITORIAL_APPROVED` (liberação humana, Fase C).

## Como a decisão é tomada

1. A URL passa pelos critérios mínimos (conteúdo completo, H2, resumo, data,
   autoria, imagem, links internos, intenção de busca, fontes quando o tema é
   regulatório).
2. Se passar, ainda precisa estar em `EDITORIAL_APPROVED` para receber
   `index,follow`. Nada é liberado automaticamente.
3. Hubs só são indexáveis com massa crítica: 3 artigos indexáveis
   (`/conteudo/blog`), 2 episódios indexáveis (`/conteudo/bc-cast`), e pelo
   menos um dos dois para `/conteudo`.
4. Somente URLs indexáveis entram no `sitemap.xml` (gerado automaticamente).

## Status atual

| URL | Tipo | Atual | Recomendado | Motivo / pendências |
| --- | --- | --- | --- | --- |
| `/conteudo` | hub | noindex,follow | manter noindex | sem destinos indexáveis |
| `/conteudo/blog` | hub | noindex,follow | manter noindex | 0 de 3 artigos indexáveis |
| `/conteudo/bc-cast` | hub | noindex,follow | manter noindex | 0 de 2 episódios indexáveis |
| `/conteudo/blog/energia-solar-por-assinatura` | artigo | noindex,follow | liberar após revisão | conteúdo completo, headings, links internos e intenção clara — faltam data real, autoria real e imagem editorial |
| `/conteudo/bc-cast/tiago-mendonca` | episódio | noindex,follow | manter noindex | só vídeo + título: sem resumo, data, tópicos ou transcrição |
| `/conteudo/bc-cast/rubens-fileti` | episódio | noindex,follow | manter noindex | só vídeo + título: sem resumo, data, tópicos ou transcrição |

## Fases

- **A — auditoria**: concluída (este documento + script).
- **B — correção editorial**: preencher os dados reais pendentes acima.
- **C — liberação seletiva**: adicionar o slug em `EDITORIAL_APPROVED`.
- **D — sitemap**: automático assim que a URL vira indexável.
- **E — canonical/metadata**: já self-referencing por rota (`meta-content.ts`).
- **F — monitoramento**: Search Console após a primeira liberação.

## Fora de escopo (permanecem noindex)

`/contato/enviado`, `/simulador-de-economia`, `/documentos/*`,
`/design-system`, páginas regulatórias em `/sobre` — páginas funcionais, não
conteúdo editorial.
