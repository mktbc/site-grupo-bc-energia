# FRONT-END 15 — Páginas regionais

Redesign das **7 páginas regionais já existentes**. Nenhuma rota nova, nenhum
dado local inventado, nenhum `LocalBusiness`.

## 1. Auditoria inicial (antes)

| Rota | H1 | Hero | Intro | Soluções | Benefícios | FAQ | CTA |
| --- | --- | --- | --- | --- | --- | --- | --- |
| /energia-solar-goiania | 1 | PageHeader centrado, sem CTA | sim | lista `<ul>` ad-hoc | lista simples | sim | ButtonLink verde |
| /energia-solar-aparecida-de-goiania | 1 | idem | sim | idem | idem | sim | idem |
| /energia-solar-anapolis | 1 | idem | sim | idem | idem | sim | idem |
| /energia-solar-trindade | 1 | idem | sim | idem | idem | sim | idem |
| /energia-solar-em-rio-verde | 1 | idem | sim | idem | idem | sim | idem |
| /energia-solar-palmas | 1 | idem | sim | idem | idem | sim | idem |
| /energia-solar-no-tocantins | 1 | idem | sim | idem | idem | sim | idem |

Problemas: template fora do Design System (cores `teal-*`/`gray-100` cruas,
containers ad-hoc), hero sem CTA, soluções em cards de texto sem ícone nem
fonte única de portfólio, prova institucional ausente.
Metadata, canonical, robots, sitemap, BreadcrumbList e FAQPage já estavam
corretos e **não foram alterados**.

## 2. Arquitetura comum (depois)

1. `PageHeader` (`align="left"`, `compact`) — breadcrumb, eyebrow, H1,
   descrição curta, CTA primário (`/contato`) e âncora `#solucoes`.
2. `RegionalIntro` — contexto regional + card "Como funciona o atendimento".
3. `RegionalSolutions` (`#solucoes`) — cards com nome/URL/ícone vindos de
   `PRODUCT_HUB_ITEMS`; só a justificativa é regional.
4. `ProductSteps` — como funciona (passo a passo real da região).
5. `ProductBenefits` — diferenciais, com `BCIcon` decorativo.
6. `RegionalAudience` — perfis atendidos (checklist em 2 colunas).
7. `Customers` (`variant="grid"`) — prova institucional geral, sem case local.
8. `ProductFaq` + `StructuredData(faqSchema)` — só perguntas reais existentes.
9. `RelatedLinks` (`variant="cards"`) — links internos já existentes.
10. `ClosingCta` — CTA final da região + link institucional.

Ritmo de superfícies: `surface` → `muted` → `surface` → `muted` → `surface`
→ `muted` → `dark` (CTA). Mesma paleta em todas as cidades.

## 3. Goiânia (piloto)

- **Hero:** eyebrow "Atendimento na região · GO", H1 preservado, descrição
  nova de uma linha, CTA "Enviar minha conta para análise".
- **Intro:** dois parágrafos existentes (sede real na Av. Dep. Jamel Cecílio,
  informação já publicada) + card de atendimento.
- **Soluções:** Mercado Livre de Energia, Consórcio BC Energia, Gestão de Energia.
- **Benefícios:** diferenciais existentes com ícones do DS.
- **FAQ:** preservado integralmente (Accordion, `h3` + `button` + `aria-expanded`).
- **CTA:** CTA regional existente + "Conhecer o Grupo BC Energia".

## 4. Demais cidades de GO

- **Aparecida de Goiânia:** foco em indústria, logística e comércio.
- **Anápolis:** baixa tensão sem obra + migração para consumo maior.
- **Trindade:** comércio local, serviços e residências.
- **Rio Verde:** consumo agroindustrial contínuo e comércio urbano.

Copy, FAQ, passos e perfis continuam exclusivos por página (fonte:
`src/data/regions`).

## 5. Palmas x 6. Tocantins

- **Palmas:** página **municipal** — assinatura de energia renovável para
  residências, comércio e serviços da cidade; link para a página estadual.
- **Tocantins:** página **estadual** — panorama do atendimento no estado,
  inclui Certificação Renovável I-REC e aponta para Palmas.

Similaridade (Jaccard sobre HTML renderizado, inclui o chrome compartilhado):
Palmas x Tocantins **0,64**; Goiânia x Aparecida **0,59**; Goiânia x Trindade
**0,58**. A estrutura visual é comum por decisão de projeto; a diferenciação
está na copy, no escopo (cidade x estado) e na seleção de soluções.

Repetição de "energia solar" no HTML final: 2 a 7 ocorrências por página
(1.038 a 1.268 palavras).

## 7. Soluções por rota

| Rota | Soluções mostradas |
| --- | --- |
| Goiânia | Mercado Livre, Consórcio, Gestão |
| Aparecida de Goiânia | Mercado Livre, Consórcio, Gestão |
| Anápolis | Consórcio, Mercado Livre, Gestão |
| Trindade | Consórcio, Mercado Livre |
| Rio Verde | Mercado Livre, Consórcio, Gestão |
| Palmas | Consórcio, Mercado Livre, Gestão |
| Tocantins | Consórcio, Mercado Livre, Gestão, I-REC |

URL do I-REC: `/produtos/certificacao-renovavel-irec` (0 ocorrências de
`/produtos/irec` no build).

## 8. Componentes criados

`src/components/Regional/`: `RegionalSection`, `RegionalIntro`,
`RegionalSolutions`, `RegionalAudience`.
Reutilizados: `PageHeader`, `SectionHeader`, `Card`, `BCIcon`, `Accordion`,
`ProductSteps`, `ProductBenefits`, `ProductFaq`, `Customers`, `RelatedLinks`,
`ClosingCta`, `Container`, `ButtonLink`.

## 9. Responsividade

- Mobile 360 / 390 / 768: hero em coluna, CTA full-width, cards 1→2 colunas,
  card lateral abaixo do texto. Sem overflow horizontal.
- Desktop 1024 / 1280 / 1440: grid 7/5 na intro, soluções em 3–4 colunas,
  container do DS (máx. 1200 px).

## 10. Acessibilidade

1 H1 por rota (7/7), hierarquia H2/H3 coerente, FAQ com `h3 > button` e
`aria-expanded`, `bc-focus-ring` nos links, contraste do DS, `alt` sem afirmar
localização não comprovada.

## 11. Performance

JS inicial 490,3 KB bruto / **151,2 KB gzip** (budget ≤ 160 KB). Nenhuma
biblioteca nova. Conteúdo regional continua em chunk próprio (lazy route).
Imagens: apenas assets existentes, WebP, lazy e dimensões preservadas.

## 12. SEO

33 rotas pré-renderizadas, sitemap com 33 URLs, metadata e canonical
preservados por rota, BreadcrumbList e FAQPage presentes nas 7 regionais,
`robots` seguindo a regra de ambiente (noindex fora de produção).
Nenhum `LocalBusiness`. Cobertura comercial em `coverage.ts` inalterada
(GO, TO, MT, MG, PR); páginas regionais continuam 7; novas páginas: 0.

## 13. Screenshots

`/tmp/browser/regional/screenshots/`: `goiania_{360,390,768,1024,1280,1440}.png`,
`palmas_{390,768,1280,1440}.png`, `tocantins_{390,768,1280,1440}.png`,
`rioverde_{390,768,1280,1440}.png`.
