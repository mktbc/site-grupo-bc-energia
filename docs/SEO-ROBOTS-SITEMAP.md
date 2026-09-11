# SEO 05 — robots.txt, sitemap e proteção do ambiente de preview

Etapa exclusivamente de SEO técnico. Nenhuma alteração de front-end.

## 1. Fonte de verdade

| Item | Fonte |
| --- | --- |
| Rotas indexáveis | `src/config/routes.ts` → `INDEXABLE_ROUTES` (33) |
| Rotas noindex | `src/config/routes.ts` → `NOINDEX_ROUTES` (7) |
| Redirects | `src/config/routes.ts` → `REDIRECTS` (1) + `/documentos/*` (6) |
| Domínio oficial | `src/config/site.ts` → `SITE_URL` |
| Geração | `scripts/generate-sitemap.ts` (hooks `predev` / `prebuild`) |
| Auditoria | `scripts/audit-robots-sitemap.ts` |

Não existe segunda lista manual. `public/sitemap.xml` e `public/robots.txt` são
**gerados** — não editar manualmente.

## 2. robots.txt

### Produção (`VITE_SEO_ENV=production`)

```
User-agent: *
Allow: /

Sitemap: https://grupobcenergia.com.br/sitemap.xml
```

- Nenhum `Disallow` sobre páginas `noindex,follow` — o crawler precisa acessar a
  página para ler o meta robots.
- Nenhum bloqueio de `/assets/`, `/img/`, `/fonts/`, CSS ou JS.
- Não existem rotas públicas `/admin`, `/api`, `/internal`, `/private`,
  `/debug`, `/test` no projeto — nenhuma regra inventada.

### Preview / staging / Lovable (qualquer outro valor)

```
User-agent: *
Disallow: /
```

Camada **adicional**. A proteção principal continua sendo o meta robots.

## 3. Proteção de ambiente

| Ambiente | robots.txt | Meta robots |
| --- | --- | --- |
| Preview / Lovable / localhost | `Disallow: /` | `noindex,nofollow` (todas as páginas) |
| Produção — página INDEX | `Allow: /` | `index,follow` |
| Produção — página NOINDEX | `Allow: /` | `noindex,follow` |

Regra em `src/config/site.ts` (`isPreviewEnvironment()`): host fora de
`PRODUCTION_HOSTS` → preview; no build/SSG, `VITE_SEO_ENV !== 'production'` →
preview. A liberação de indexação exige ambiente explicitamente `production`.

## 4. Sitemap

- 33 URLs = exatamente `INDEXABLE_ROUTES`.
- Absolutas, HTTPS, domínio oficial, sem query/hash/UTM, sem duplicidades.
- **Sem `<lastmod>`**: o projeto não possui fonte confiável de data de
  modificação por página; usar a data do build seria data falsa.
- **Sem `<changefreq>` e `<priority>`**: eram valores artificiais repetidos e
  ignorados pelos buscadores. Removidos — sitemap simples e correto.

Ausentes por definição (noindex / redirect / 404):
`/produtos/irec`, `/sobre/leilao`, `/sobre/fator-de-alavancagem`,
`/sobre/condicoes-gerais-varejistas`, `/contato/enviado`, `/conteudo`,
`/conteudo/blog`, `/conteudo/bc-cast`, `/documentos/*`.

Regionais mantidas como INDEX, incluindo `/energia-solar-palmas` e
`/energia-solar-no-tocantins`.

## 5. Domínio

- Oficial: `https://grupobcenergia.com.br` (variante **non-www**).
- `canonical`, `og:url`, `<loc>` do sitemap e `Sitemap:` do robots derivam todos
  de `SITE_URL` — sem divergência no código.
- Nenhuma referência interna em `http://` ao domínio próprio. As ocorrências de
  `http://` restantes são links externos legítimos
  (`appenergia.com.br` — portal de terceiros) e o namespace XML do sitemap.

## 6. Pendências de infraestrutura (cut-over)

Não devem ser resolvidas com hacks no React:

1. **Redirects 301** — hoje 7 redirects client-side (1 I-REC + 6 `/documentos/*`).
   Precisam virar 301 reais no servidor/CDN no cut-over.
2. **www ↔ non-www** — consolidação para non-www depende de configuração de
   DNS/hosting externa.
3. **HTTP → HTTPS** — redirecionamento e SSL dependem do hosting.

## 7. Validação

```
VITE_SEO_ENV=production npm run build
bunx tsx scripts/audit-robots-sitemap.ts        # preview
VITE_SEO_ENV=production bunx tsx scripts/audit-robots-sitemap.ts
```

## 8. Checklist de go-live

- [ ] Build com `VITE_SEO_ENV=production`
- [ ] robots.txt acessível
- [ ] sitemap.xml acessível
- [ ] sitemap contém 33 URLs
- [ ] sitemap enviado ao Search Console (somente após cut-over)
- [ ] Home `index,follow`
- [ ] páginas INDEX `index,follow`
- [ ] páginas NOINDEX `noindex,follow`
- [ ] canonicals usando domínio oficial
- [ ] www/non-www consolidado
- [ ] HTTP redirecionando para HTTPS
- [ ] redirects antigos configurados como 301
- [ ] preview continua noindex
