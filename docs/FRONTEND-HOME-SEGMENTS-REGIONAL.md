# FRONT-END 06 — Home: Segmentos + Presença Regional

FASE 3 · FRONT-END 06. Escopo restrito às seções de segmentos e de presença
regional da Home. Nenhuma outra seção (Hero, Soluções, Números, Depoimentos,
Customers, Blog/BC Cast, FinalCta, Footer, páginas internas) foi alterada.

## 1. Estrutura anterior

- **Segmentos na Home:** não existia seção de segmentos. A única menção era um
  link solto dentro de `RelatedLinks` ("Veja os segmentos atendidos").
- **Presença regional na Home:** não existia. Havia apenas dois links regionais
  (Goiânia e Tocantins) dentro do mesmo `RelatedLinks`.
- **Fonte dos dados:** segmentos em `src/components/Navbar/Items.data.ts` →
  `src/config/navigation.ts` (`SEGMENT_HUB_ITEMS`); cobertura geográfica
  declarada em um único texto dentro de `src/pages/produtos/solutions.data.ts`
  ("Onde atendemos?"); páginas regionais em `src/data/regions/`.
- **Problemas:** a Home não comunicava para quem a empresa atende nem onde
  atua; risco de a cobertura ser confundida com as 7 páginas regionais de SEO;
  string de cobertura duplicável (hardcode único, sem fonte compartilhada).

## 2. Segmentos (nova seção)

| Item | Valor |
| --- | --- |
| Eyebrow | ATUAÇÃO MULTISSEGMENTO |
| H2 | Soluções para diferentes perfis de negócio |
| Descrição | "Do agronegócio ao varejo, a solução muda conforme o perfil de consumo e o tipo de ligação — o objetivo é sempre reduzir o custo da energia." |
| Quantidade | 6 de 11 (amostra) |
| Layout | 3 colunas (lg) · 2 (sm/tablet) · 1 (mobile) |
| Background | `bg-surface-muted` |
| CTA | "Ver todos os segmentos" → `/segmentos` (ButtonLink outline) |

### Segmentos exibidos

| Segmento | Visual | Destino |
| --- | --- | --- |
| Agronegócio | ícone oficial `agronegocio.svg` | /segmentos/agronegocio |
| Condomínio | `condominio.svg` | /segmentos/condominio |
| Saúde | `saude.svg` | /segmentos/saude |
| Varejo | `varejo.svg` | /segmentos/varejo |
| Serviço | `servico.svg` | /segmentos/servico |
| Residencial | `residencial.svg` | /segmentos/residencial |

Somente ícones (nenhuma foto nova). Nenhum segmento foi removido do hub; os 11
continuam em `/segmentos`. Os segmentos com sobreposição editorial identificada
na fase de SEO (lazer, turismo, serviço, varejo, bares e restaurantes,
educacional) não foram reescritos — apenas evitou-se copy repetida nos cards.

### Fonte de dados

- Arquivo: `src/config/navigation.ts` (`HOME_SEGMENT_HIGHLIGHTS` +
  `HOME_SEGMENT_ITEMS`, derivados de `SEGMENT_HUB_ITEMS`).
- Compartilhada com o hub `/segmentos` e com o menu: sim.
- Hardcodes removidos: nenhuma lista paralela foi criada; a seleção de
  destaques vive em configuração, não no componente.

## 3. Presença regional (nova seção)

| Item | Valor |
| --- | --- |
| Eyebrow | PRESENÇA REGIONAL |
| H2 | Atendimento perto de quem consome |
| Descrição | Sede em Goiânia, atendimento em cinco estados, com solução e condições variando por perfil de consumo e distribuidora |
| Layout | texto 5/12 + lista de estados 7/12 (desktop); 1 coluna no mobile |
| Background | `bg-surface-brand` (verde da marca, texto `text-inverse`) |
| CTA | "Falar com um especialista" → `/contato` |

### Estados

Fonte única: `src/data/coverage.ts`.

**Cobertura oficial: GO, TO, MT, MG e PR. Total: 5 UFs.**

GO · Goiás — TO · Tocantins — MT · Mato Grosso — MG · Minas Gerais — PR · Paraná.

Correção aplicada nesta revisão: DF, PA (Pará) e SP foram removidos — o Grupo BC
Energia não atua nesses estados. Não confundir as 7 páginas regionais de SEO
(cidades/estado dentro de GO e TO) com UFs de atuação: são 5 UFs e 7 rotas.


### Mapa/visual

- Tipo: não existe mapa no projeto e nenhum mapa fictício foi desenhado. A
  presença é apresentada como grade textual de estados (UF + nome completo).
- Arquivo: nenhum asset novo.
- Interativo: não. Nenhuma biblioteca de mapas adicionada.
- Responsividade: 3 colunas (xl), 2 (sm), 1 (mobile).
- Acessibilidade: `<ul aria-label="Estados atendidos">`, siglas `aria-hidden`
  com o nome completo em texto, foco visível com offset sobre o fundo da marca.

### Links regionais exibidos

- Goiás → `/energia-solar-goiania`
- Tocantins → `/energia-solar-no-tocantins`

Os demais estados aparecem como texto, sem link (não existe rota regional para
eles e nenhuma foi criada). Nenhuma regra comercial (percentuais, mínimo de
conta) aparece nesta seção.

## 4. Design System

`Container`, `SectionHeader`, `HubCard`, `HubCardGrid`, `ButtonLink`, tokens
(`surface-muted`, `surface-brand`, `text-inverse`, `bc-yellow`, `rounded-card`,
`duration-normal`, `ease-bc`, `bc-section-lg`). Nenhuma nova família de card.

## 5. Responsividade validada

Mobile 360/390 (1 coluna), tablet 768 (2 colunas), desktop 1024/1280/1440
(3 colunas nos segmentos; 5/12 + 7/12 na regional).

## 6. Performance

- JS inicial antes: 148.9 KB gzip · depois: 148.9 KB gzip (budget ≤ 160 KB).
- Nenhuma imagem nova, nenhuma biblioteca nova, nenhum JS novo (seções
  estáticas).

## 7. Auditorias

- `npm run audit:design-system`: 0 ERROR · 3 WARNING · 8 INFO (pré-existentes).
- `npm run audit:performance`: 0 ERROR de budget.
- Semântica HTML: 33/33 rotas com exatamente 1 H1.
- Prerender: 33 rotas + 404.html. Metadata, canonical, robots, sitemap e
  JSON-LD inalterados.

## 8. Screenshots

Capturados em 1440, 1280, 1024, 768, 390 e 360 para as seções Segmentos e
Presença Regional.

## 9. Arquivos alterados

- `src/data/coverage.ts` (novo)
- `src/pages/home/Sections/Segments.tsx` (novo)
- `src/pages/home/Sections/RegionalPresence.tsx` (novo)
- `src/pages/home/Sections/index.ts`
- `src/pages/home/page.tsx`
- `src/config/navigation.ts`
- `src/pages/produtos/solutions.data.ts`
- `docs/FRONTEND-HOME-SEGMENTS-REGIONAL.md` (novo)
