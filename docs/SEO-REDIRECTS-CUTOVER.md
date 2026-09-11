# Redirects de cut-over — Grupo BC Energia

Configuração exigida no servidor/CDN no go-live. Independente do código React.
Todos os redirects devem ser **HTTP 301**, em salto único, preservando path e query.

## Redirects de URL

| Origem | Destino | Tipo | Prioridade |
| --- | --- | --- | --- |
| `/produtos/irec` | `/produtos/certificacao-renovavel-irec` | 301 | P0 |
| `/documentos/campanha_com_fidelidade_2anos` | `/docs/campanha_com_fidelidade_2anos.pdf` | 301 | P1 |
| `/documentos/campanha_sem_fidelidade` | `/docs/campanha_sem_fidelidade.pdf` | 301 | P1 |
| `/documentos/condicoes_gerais_gd` | `/docs/condicoes_gerais_gd.pdf` | 301 | P1 |
| `/documentos/condicoes_gerais_gd_v2` | `/docs/condicoes_gerais_gd_v2.pdf` | 301 | P1 |
| `/documentos/condicoes_gerais_gd_alta_tensao` | `/docs/condicoes_gerais_gd_alta_tensao.pdf` | 301 | P1 |
| `/documentos/condicoes_gerais_gd_externo` | `/docs/condicoes_gerais_gd_externo.pdf` | 301 | P1 |

## Redirects de domínio e protocolo

| Origem | Destino | Tipo | Prioridade |
| --- | --- | --- | --- |
| `http://grupobcenergia.com.br/*` | `https://grupobcenergia.com.br/*` | 301 | P0 |
| `http://www.grupobcenergia.com.br/*` | `https://grupobcenergia.com.br/*` | 301 (salto único) | P0 |
| `https://www.grupobcenergia.com.br/*` | `https://grupobcenergia.com.br/*` | 301 | P0 |

Regras: sem chains (`http://www` → `https://www` → `https://non-www` é proibido),
sem loops, path preservado, query string preservada (UTMs inclusive).

## Status HTTP

| Requisito | Prioridade |
| --- | --- |
| Rotas desconhecidas retornam **HTTP 404** servindo `dist/404.html` | P0 |
| `/sitemap.xml` e `/robots.txt` retornam 200 | P0 |

## Checklist de cut-over

- [ ] URL inexistente retorna HTTP 404
- [ ] Página 404 permanece noindex,nofollow
- [ ] 404 não herda metadata da Home
- [ ] `/produtos/irec` retorna 301
- [ ] `/documentos/*` retornam 301
- [ ] HTTP redireciona para HTTPS
- [ ] www redireciona para non-www
- [ ] Sem redirect chains
- [ ] Sem redirect loops
- [ ] Paths preservados
- [ ] Queries preservadas quando aplicável
