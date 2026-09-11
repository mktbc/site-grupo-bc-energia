# SEO 07 — JSON-LD e dados estruturados

Etapa exclusivamente técnica: nenhuma alteração de layout, copy, imagens ou componentes visuais.

## 1. Schemas existentes e arquivos responsáveis

| Schema | Builder | Emissor | Rotas | Origem dos dados |
| --- | --- | --- | --- | --- |
| Organization | `src/components/Seo/structuredData.ts` | `RootLayout` → `Seo` | `/` | `src/config/site.ts` |
| WebSite | idem | `RootLayout` → `Seo` | `/` | `src/config/site.ts` |
| BreadcrumbList | idem | `RootLayout` → `Seo` | todas as indexáveis com `breadcrumb` em `meta.ts` | `src/config/meta.ts` |
| Service | idem | `RootLayout` → `Seo` | 5 páginas de produto com `schemaType: 'Service'` | `src/config/meta.ts` |
| FAQPage | idem | `StructuredData` na página | Mercado Livre, Consórcio, 7 regionais, artigos com FAQ | `data.tsx` da página / `src/data/regions` |
| Article/BlogPosting | idem | `StructuredData` | `/conteudo/blog/:slug` (noindex → não emitido) | `src/data/content/articles.ts` |
| VideoObject | idem | `StructuredData` | `/conteudo/bc-cast/:slug` (noindex → não emitido) | `src/data/content/episodes.ts` |

Não existem `LocalBusiness`, `Product`, `ItemList`, `PodcastSeries` ou `PodcastEpisode` no projeto — e nenhum foi criado.

## 2. Regras de uso

1. **Uma única identidade**: `@id = https://grupobcenergia.com.br/#organization`. `WebSite`, `Service`, `Article` e `VideoObject` referenciam esse `@id` (`organizationRef()`) em vez de recriar dados.
2. **Organization e WebSite só na Home.** `WebSite` não tem `SearchAction` — o site não possui busca interna.
3. **Sem dados inventados**: nenhum `contactPoint`, telefone, endereço, CNPJ, `offers`, `aggregateRating` ou `areaServed`. `sameAs` usa apenas os 4 perfis oficiais já declarados em `site.ts` (Instagram, Facebook, LinkedIn, YouTube).
4. **Logo**: `https://grupobcenergia.com.br/img/global/grupo-bc-logo-vertical-color.webp` — absoluta, HTTPS, domínio oficial, asset real.
5. **Nome institucional**: sempre `Grupo BC Energia`.
6. **URLs**: sempre `https://grupobcenergia.com.br` (sem `www`, sem preview, sem trailing slash exceto raiz), via `buildCanonical()`.

## 3. Política de FAQ

`FAQPage` só é emitido onde existe bloco de FAQ **visível** na página, e o JSON-LD é montado a partir **da mesma fonte de dados** que renderiza os acordeões — logo, pergunta e resposta são idênticas por construção. Itens de FAQ com conteúdo React (não-string) são filtrados e não entram no schema. Nenhuma FAQ foi criada nesta etapa.

## 4. Política para regionais

Páginas regionais emitem apenas `BreadcrumbList` + `FAQPage` (FAQ real e visível). Não emitem `Service` (o serviço vive nas páginas de produto) nem `areaServed` ampliado.

## 5. Política para LocalBusiness

`LocalBusiness` **não é utilizado**. Uma página de atendimento em uma cidade não comprova unidade física. Só poderá ser adicionado quando houver endereço real, verificável e mantido pelo Grupo BC Energia naquela localidade.

## 6. Correções aplicadas nesta etapa

- `@id` canônico para Organization e WebSite; `publisher`/`provider` passam a referenciar esse `@id` (evita Organizations concorrentes).
- `Service` ganhou `@id` próprio (`<url>#service`) e provider centralizado.
- **Nenhum schema em páginas noindex**: `RootLayout` só emite Organization/WebSite/Breadcrumb/Service em rota indexável, e `StructuredData` retorna `null` quando a rota é noindex (atinge `/conteudo/*`, `/contato/enviado`, `/sobre/leilao`, `/sobre/fator-de-alavancagem`, `/sobre/condicoes-gerais-varejistas`, artigos e episódios).
- **Rotas de redirect** (`/produtos/irec`) passam a resolver `REDIRECT_META` (noindex, nofollow, sem canonical, sem JSON-LD).
- **404** sem qualquer JSON-LD (validado em `dist/404.html`).
- Novo `scripts/audit-structured-data.ts`.

## 7. Matriz das 33 rotas indexáveis

| Rota | Organization | WebSite | Service | Breadcrumb | FAQ | Outro |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | SIM | SIM | NÃO | N/A | NÃO | — |
| `/contato` | NÃO | NÃO | NÃO | SIM | NÃO | — |
| `/produtos` | NÃO | NÃO | NÃO | SIM | NÃO | — |
| `/produtos/mercado-livre-de-energia` | NÃO | NÃO | SIM | SIM | SIM | — |
| `/produtos/consorcio-bc-energia` | NÃO | NÃO | SIM | SIM | SIM | — |
| `/produtos/gestao-de-energia` | NÃO | NÃO | SIM | SIM | NÃO | — |
| `/produtos/certificacao-renovavel-irec` | NÃO | NÃO | SIM | SIM | NÃO | — |
| `/produtos/arrendamento-de-usinas` | NÃO | NÃO | SIM | SIM | NÃO | — |
| `/segmentos` | NÃO | NÃO | NÃO | SIM | NÃO | — |
| `/segmentos/*` (11 rotas) | NÃO | NÃO | NÃO | SIM | NÃO | — |
| `/sobre`, `/sobre/quem-somos`, `/sobre/nossas-usinas`, `/sobre/lgpd`, `/sobre/sustentabilidade`, `/sobre/social` | NÃO | NÃO | NÃO | SIM | NÃO | — |
| `/energia-solar-*` (7 regionais) | NÃO | NÃO | NÃO | SIM | SIM | — |

Coluna "Erro": nenhuma rota apresentou erro na auditoria.

## 8. Limitações registradas

- `/conteudo/blog/:slug` possui `Article` e `/conteudo/bc-cast/:slug` possui `VideoObject` implementados, mas **suprimidos** enquanto o conteúdo é noindex. Os episódios não têm `uploadDate`/`thumbnailUrl` reais — o builder retorna `null` nesses casos (nada é inventado).
- `og:image` social padrão ainda usa `/bg-home.jpg` (pendência de design, não bloqueia schema).

## 9. Validação

```bash
npm run build                              # inclui prerender das 33 rotas + 404
bunx tsx scripts/audit-structured-data.ts  # JSON-LD, duplicidade, URLs, escopo
npx tsc --noEmit
```

## 10. Checklist pós-go-live

- [ ] Organization válido
- [ ] WebSite válido
- [ ] Services válidos
- [ ] BreadcrumbList válido
- [ ] FAQPage somente quando visível
- [ ] Nenhum schema em 404
- [ ] Nenhum schema principal em redirect
- [ ] URLs HTTPS/non-www
- [ ] Nenhum schema duplicado
- [ ] Rich Results Test executado nas páginas prioritárias
- [ ] Search Console sem erros de dados estruturados
