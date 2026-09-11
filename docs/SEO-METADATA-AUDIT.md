# ETAPA SEO 03 — Metadata por página

> Escopo: apenas metadata (title, description, canonical, robots, OG, Twitter),
> intenção de busca e consistência por URL.
> Nenhuma alteração visual, de layout, de componentes ou de conteúdo comercial.
> Data: 20/08/2026 · Fonte: `src/config/routes.ts`, `src/config/meta.ts`,
> `src/config/meta-content.ts`, `src/config/site.ts`, `src/components/Seo/Seo.tsx`.

Validação automática: `bunx tsx scripts/audit-metadata.ts` (script somente leitura).

## 1. Reconciliação 34 x 37

Não há divergência real de rotas: `INDEXABLE_ROUTES` tem **37** entradas nas duas
auditorias. A tabela de totais da SEO 01 separou 3 URLs em uma linha própria
("REVISAR"), deixando "INDEX = 34". As 3 URLs são:

| URL | Classificação anterior | Classificação atual | Motivo | Recomendação |
| --- | --- | --- | --- | --- |
| `/sobre/leilao` | REVISAR (fora da contagem INDEX) | Indexável (37) | Conteúdo curto, mas real e no sitemap | Manter indexável nesta etapa; decidir noindex só após ampliar conteúdo |
| `/sobre/fator-de-alavancagem` | REVISAR | Indexável (37) | Página regulatória curta | Manter; candidata a noindex em etapa futura |
| `/sobre/condicoes-gerais-varejistas` | REVISAR | Indexável (37) | Conteúdo legal/PDF | Manter; candidata a noindex em etapa futura |

Nenhuma rota foi removida nesta etapa.

## 2. Matriz de metadata (37 rotas indexáveis)

Legenda OG/Twitter: **OK** = og:title/description iguais ao title/description,
og:url igual à canonical, imagem absoluta; twitter espelha o OG (`summary_large_image`).
Robots: `index,follow` no build de produção (`VITE_SEO_ENV=production`);
`noindex,nofollow` em qualquer host de preview (proteção de ambiente, mantida).

| URL | Intenção | Keyword principal | Title | Description | OG | Twitter | Canonical | Robots | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | Institucional / Comercial | comercializadora de energia | Comercializadora de Energia Solar \| Grupo BC Energia | Própria (HOME_META) | OK | OK | OK | index | CORRIGIDO |
| `/contato` | Transacional | falar com especialista em energia | Contato \| Grupo BC Energia | Própria | OK | OK | OK | index | OK |
| `/produtos` | Comercial | soluções em energia para empresas | Soluções em Energia \| Grupo BC Energia | Própria | OK | OK | OK | index | OK |
| `/produtos/mercado-livre-de-energia` | Comercial / Informacional | mercado livre de energia | Mercado Livre de Energia \| Grupo BC Energia | Própria | OK (img própria) | OK | OK | index | OK |
| `/produtos/consorcio-bc-energia` | Comercial | consórcio de energia | Consórcio BC Energia \| Grupo BC Energia | Própria | OK (img própria) | OK | OK | index | OK |
| `/produtos/gestao-de-energia` | Comercial | gestão de energia para empresas | Gestão de Energia para Empresas \| Grupo BC Energia | Própria | OK (img própria) | OK | OK | index | OK |
| `/produtos/irec` | Informacional | certificado I-REC | Certificado I-REC de Energia Renovável \| Grupo BC Energia | Própria | OK (img própria) | OK | OK | index | REVISAR (sobreposição) |
| `/produtos/certificacao-renovavel-irec` | Comercial | certificação renovável I-REC | Certificação Renovável I-REC \| Grupo BC Energia | Própria | OK (img própria) | OK | OK | index | REVISAR (sobreposição) |
| `/produtos/arrendamento-de-usinas` | Comercial | arrendamento de usinas solares | Arrendamento de Usinas Solares \| Grupo BC Energia | Própria | OK (img própria) | OK | OK | index | OK |
| `/segmentos` | Navegacional / Comercial | energia por segmento | Segmentos Atendidos \| Grupo BC Energia | Própria | OK | OK | OK | index | OK |
| `/segmentos/agronegocio` | Comercial | energia para agronegócio | Energia para o Agronegócio \| Grupo BC Energia | Própria (reescrita) | OK | OK | OK | index | CORRIGIDO |
| `/segmentos/bares-e-restaurantes` | Comercial | energia para bares e restaurantes | Energia para Bares e Restaurantes \| Grupo BC Energia | Própria (reescrita) | OK | OK | OK | index | CORRIGIDO |
| `/segmentos/condominio` | Comercial | energia para condomínios | Energia para Condomínios \| Grupo BC Energia | Própria (reescrita) | OK | OK | OK | index | CORRIGIDO |
| `/segmentos/educacional` | Comercial | energia para escolas | Energia para Escolas e Instituições de Ensino \| Grupo BC Energia | Própria (reescrita) | OK | OK | OK | index | CORRIGIDO |
| `/segmentos/lazer` | Comercial | energia para clubes e academias | Energia para Clubes, Academias e Lazer \| Grupo BC Energia | Própria (reescrita) | OK | OK | OK | index | CORRIGIDO |
| `/segmentos/religioso` | Comercial | energia para igrejas | Energia para Igrejas e Instituições Religiosas \| Grupo BC Energia | Própria (reescrita) | OK | OK | OK | index | CORRIGIDO |
| `/segmentos/residencial` | Comercial | energia solar por assinatura residencial | Energia Solar por Assinatura Residencial \| Grupo BC Energia | Própria | OK | OK | OK | index | OK |
| `/segmentos/saude` | Comercial | energia para hospitais e clínicas | Energia para Hospitais e Clínicas \| Grupo BC Energia | Própria (reescrita) | OK | OK | OK | index | CORRIGIDO |
| `/segmentos/servico` | Comercial | energia para empresas de serviços | Energia para Empresas de Serviços \| Grupo BC Energia | Própria (reescrita) | OK | OK | OK | index | CORRIGIDO |
| `/segmentos/turismo` | Comercial | energia para hotéis | Energia para Hotéis, Pousadas e Turismo \| Grupo BC Energia | Própria (reescrita) | OK | OK | OK | index | CORRIGIDO |
| `/segmentos/varejo` | Comercial | energia para lojas e supermercados | Energia para Lojas e Supermercados \| Grupo BC Energia | Própria (reescrita) | OK | OK | OK | index | CORRIGIDO |
| `/energia-solar-goiania` | Local | energia solar Goiânia | Energia Solar e Mercado Livre em Goiânia \| Grupo BC Energia | Própria | OK (img padrão) | OK | OK | index | OK |
| `/energia-solar-anapolis` | Local | energia solar Anápolis | Energia Solar por Assinatura em Anápolis \| Grupo BC Energia | Própria | OK (img padrão) | OK | OK | index | OK |
| `/energia-solar-aparecida-de-goiania` | Local | energia solar Aparecida de Goiânia | Energia Solar sem Obra em Aparecida de Goiânia \| Grupo BC Energia | Própria | OK (img padrão) | OK | OK | index | OK |
| `/energia-solar-em-rio-verde` | Local | energia solar Rio Verde | Energia para o Agronegócio em Rio Verde \| Grupo BC Energia | Própria | OK (img padrão) | OK | OK | index | OK |
| `/energia-solar-trindade` | Local | energia solar Trindade | Energia Solar por Assinatura em Trindade \| Grupo BC Energia | Própria | OK (img padrão) | OK | OK | index | OK |
| `/energia-solar-palmas` | Local | energia solar Palmas TO | Energia Solar por Assinatura em Palmas (TO) \| Grupo BC Energia | Própria | OK (img padrão) | OK | OK | index | REVISAR (canibalização) |
| `/energia-solar-no-tocantins` | Local | energia solar Tocantins | Energia Solar e Mercado Livre no Tocantins \| Grupo BC Energia | Própria | OK (img padrão) | OK | OK | index | REVISAR (canibalização) |
| `/sobre` | Institucional | Grupo BC Energia | Sobre o Grupo BC Energia | Própria | OK | OK | OK | index | OK |
| `/sobre/quem-somos` | Institucional | quem é o Grupo BC Energia | Quem Somos \| Grupo BC Energia | Própria | OK (img própria) | OK | OK | index | OK |
| `/sobre/nossas-usinas` | Institucional | usinas do Grupo BC Energia | Nossas Usinas \| Grupo BC Energia | Própria | OK (img própria) | OK | OK | index | OK |
| `/sobre/lgpd` | Institucional / Legal | LGPD Grupo BC Energia | LGPD e Privacidade de Dados \| Grupo BC Energia | Própria | OK | OK | OK | index | OK |
| `/sobre/leilao` | Informacional | leilão de energia | Leilão de Energia \| Grupo BC Energia | Própria | OK | OK | OK | index | RISCO (conteúdo raso) |
| `/sobre/fator-de-alavancagem` | Regulatório | fator de alavancagem varejista | Fator de Alavancagem \| Grupo BC Energia | Própria | OK | OK | OK | index | RISCO (regulatório) |
| `/sobre/sustentabilidade` | Institucional | sustentabilidade e ESG | Sustentabilidade e ESG \| Grupo BC Energia | Própria | OK (img própria) | OK | OK | index | OK |
| `/sobre/social` | Institucional | ações sociais | Ações Sociais \| Grupo BC Energia | Própria | OK (img própria) | OK | OK | index | OK |
| `/sobre/condicoes-gerais-varejistas` | Regulatório | condições gerais comercialização varejista | Condições Gerais da Comercialização Varejista \| Grupo BC Energia | Própria | OK | OK | OK | index | RISCO (legal/PDF) |

## 3. Relatório de duplicidades

- **Titles duplicados:** nenhum (37 titles únicos, validados no HTML pré-renderizado).
- **Descriptions duplicadas:** nenhuma (37 descriptions únicas).
- **OG titles / OG descriptions duplicados:** nenhum — derivam 1:1 do title/description.
- **Canonicals duplicadas:** nenhuma; cada rota é autorreferente.
- **Fallback genérico:** nenhum. `DEFAULT_META` deixou de ser o metadata efetivo
  da Home (agora `HOME_META`) e permanece apenas como rede de segurança.
- **URLs com intenção sobreposta:**
  - `/produtos/irec` x `/produtos/certificacao-renovavel-irec` — mesmo produto.
    Melhor metadata/intenção hoje: **`/produtos/certificacao-renovavel-irec`**
    (título e descrição comerciais, alinhados ao conteúdo mais completo).
    Redirect/consolidação **não** executados nesta etapa.
  - `/energia-solar-palmas` x `/energia-solar-no-tocantins` — municipal x estadual;
    metadata já diferenciada (município vs. panorama estadual). Monitorar no GSC.
  - `/segmentos/residencial` x regionais de assinatura — perfil x localidade;
    metadata diferenciada, sem duplicidade textual.

## 4. og:image e Twitter

- Padrão global: `/bg-home.jpg` (1736x898 ≈ 1.91:1), absolutizado por `toAbsoluteUrl`.
  Classificação: **ACEITÁVEL TEMPORARIAMENTE** — proporção correta e imagem
  institucional real, mas não é arte dedicada 1200x630 com marca.
- Não há no projeto asset oficial 1200x630 mais adequado. Sugestão para etapa
  futura: `public/social/og-default.jpg` (basta trocar `DEFAULT_OG_IMAGE_PATH`).
- 11 rotas já usam imagem própria (produtos e páginas de `sobre`).
- Twitter: `summary_large_image` em todas; title/description/image espelham o OG.

## 5. Correções aplicadas

| Arquivo | Correção |
| --- | --- |
| `src/config/meta.ts` | `HOME_META` explícito para `/` (DEFAULT_META vira só fallback); `SEGMENT_META` com title e description próprios para os 11 segmentos |
| `scripts/audit-metadata.ts` | Novo script de validação automática (somente leitura) |
| `docs/SEO-METADATA-AUDIT.md` | Este documento |

Nenhum arquivo de componente visual, layout, estilo ou conteúdo de página foi tocado.
