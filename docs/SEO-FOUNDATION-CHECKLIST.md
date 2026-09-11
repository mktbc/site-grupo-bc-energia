# Checklist-mestre — Fundação técnica de SEO (Fase 1)

Estado consolidado ao final da ETAPA SEO 09.
INDEX: 33 · NOINDEX: 7 · REDIRECT: 7 · 404: noindex,nofollow, sem canonical, sem JSON-LD.

## DONE

| Item | Evidência |
| --- | --- |
| Inventário de URLs | `src/config/routes.ts`, `docs/SEO-URL-INVENTORY.md` |
| Pré-renderização (SSG) | `scripts/prerender.ts` — 33 rotas + `404.html` |
| Metadata única por rota | `src/config/meta.ts`, `audit-metadata` OK |
| Canonical por rota | 33 canonicals verificadas em `dist/` |
| robots.txt | `public/robots.txt` com detecção de ambiente |
| sitemap.xml | 33 URLs, gerado por `scripts/generate-sitemap.ts` |
| Index / noindex | `audit-indexation`: INDEX 33 · NOINDEX 7 |
| Redirects app-level | `/produtos/irec` + 6 `/documentos/*` |
| JSON-LD | `audit-structured-data`: válido em 33 rotas |
| Headings / semântica HTML | `audit-html-semantics`: 33/33 com 1 H1 |
| 404 app-level | `dist/404.html`, noindex,nofollow, sem canonical |
| Links internos | 6.516 verificados, 0 quebrados, 0 órfãs |
| Proteção de preview | `isPreviewEnvironment()` → noindex fora de produção |
| Conteúdo provisório | `src/mooks/` removido; 0 Lorem Ipsum/mocks em rotas INDEX |
| Percentual comercial | "até 25%" único em todo o HTML final |

## PENDING CONTENT

- Palmas × Tocantins: 42% de similaridade — diferenciação editorial recomendada.
- Segmentos com sobreposição ALTA: `lazer`, `turismo`, `servico`, `varejo`,
  `bares-e-restaurantes`, `educacional`.
- Blog: aguardando artigos próprios para liberar indexação.
- BC Cast: faltam data, duração e transcrição reais (bloqueia `VideoObject`).
- `/sobre/nossas-usinas`: salto H1→H3; corrigir com conteúdo editorial real.
- Lacunas de produto: "como funciona" em gestão de energia; público-alvo no I-REC;
  FAQ em arrendamento de usinas.
- Valor mínimo de conta em baixa tensão: R$ 250,00 × R$ 300,00 (regra de negócio).
- Fonte única de verdade comercial (`src/config/business.ts`) inexistente.
- Arte `/img/pages/consorcio-intro.webp` com "ATÉ 26%" embutido.

## PENDING INFRA (fora do escopo do Lovable — cut-over)

- HTTP 404 real (status code) para rotas desconhecidas.
- 301 real de `/produtos/irec` → `/produtos/certificacao-renovavel-irec`.
- 301 real de `/documentos/*` → PDFs.
- Redirecionamento HTTP → HTTPS.
- Redirecionamento www → non-www.
- Apontamento de DNS para o novo build (bloqueio de GO LIVE).
- Reconexão de GTM e RD Station.

## PENDING PERFORMANCE (Fase 2 — não executada)

- Imagens (formatos, dimensões, arte com texto embutido).
- Code splitting adicional e tamanho dos chunks.
- Estratégia de fontes.
- Scripts de terceiros (GTM, RD Station).
- Facade de YouTube (validar ganho real).
- Métricas: LCP, INP, CLS.
