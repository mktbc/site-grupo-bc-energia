# FRONT-END 07 — Home: Sustentabilidade + Usinas

## 1. Estrutura anterior

A Home **não tinha** seção de sustentabilidade nem de usinas. O conteúdo existia apenas em
páginas internas:

- `src/pages/sobre/sustentabilidade/page.tsx` + `data.ts` — geração 100% renovável, redução de
  emissões, conservação ambiental, replantio, +200 mil MWh, +15 mil t CO₂.
- `src/pages/sobre/nossas-usinas/page.tsx` + `data.ts` — 14 complexos com potência, tipo de
  estrutura, geração anual média e localização.

Problemas: a Home terminava em Presença Regional → Blog/CTA, sem nenhuma prova de que o grupo
possui ativos de geração próprios (autoridade técnica ausente).

## 2. Conteúdo validado (fontes no projeto)

| Claim usado | Fonte |
| --- | --- |
| Geração 100% renovável (fotovoltaica e hidrelétrica) | `sobre/sustentabilidade/page.tsx`, `sobre/nossas-usinas/data.ts` (CGH Rio Bonito) |
| Redução de emissões de CO₂ pelo consumo renovável | `sobre/sustentabilidade/page.tsx` |
| Certificação Renovável – I-REC | `/produtos/certificacao-renovavel-irec` |
| BC Renováveis opera as usinas | `sobre/nossas-usinas/page.tsx` |
| 14 complexos de geração | `sobre/nossas-usinas/data.ts` (14 registros) |
| Estrutura fixa e tracker | mesmo arquivo |
| Localizações (GO, MT, MG, DF) | mesmo arquivo |

A métrica de CO₂ **não** é repetida como headline — permanece exclusiva da seção `Stats`.

## 3. Sustentabilidade (`src/pages/home/Sections/Sustainability.tsx`)

- Eyebrow: `Energia com responsabilidade`
- H2: `Energia renovável como parte da estratégia do negócio`
- Descrição: 2–3 linhas ligando geração própria → custo menor + energia limpa comprovável
- Pilares: Geração 100% renovável · Redução de emissões · Comprovação com I-REC
- Layout: texto 5/12 · imagem 7/12 (1 coluna no mobile)
- Background: `bg-surface`
- CTA: `Conhecer a certificação I-REC` → `/produtos/certificacao-renovavel-irec`

| Pilar | Ícone (BCIcon) | Texto |
| --- | --- | --- |
| Geração 100% renovável | `energia-limpa` | Usinas fotovoltaicas e hidrelétricas próprias |
| Redução de emissões | `planeta-sustentavel` | MWh renovável evita emissões na operação do cliente |
| Comprovação com I-REC | `contrato-aprovado` | Certificação documenta a origem limpa |

Imagem: `/img/pages/usinas/palmeiras-de-goias-500x300.webp` · WebP · 51,6 KB · `loading="lazy"` ·
alt informativo com tipo de estrutura e município.

## 4. Usinas (`src/pages/home/Sections/PowerPlants.tsx`)

- Eyebrow: `Estrutura própria`
- H2: `Uma estrutura de geração que sustenta o que vendemos`
- Descrição: BC Renováveis, complexos solares e hidrelétricos no Centro-Oeste e Sudeste
- Layout: composição editorial 7/12 (1 imagem principal + 2 secundárias) e 5/12 (2 Cards + CTA).
  Sem carrossel e sem biblioteca nova.
- Background: `bg-surface-muted`
- CTA: `Conhecer nossas usinas` → `/sobre/nossas-usinas` (página não alterada)

Dados: 14 complexos; estrutura fixa/tracker; GO (Inhumas, Palmeiras de Goiás, Caiapônia, Corumbá de
Goiás, Panamá), MT, MG, DF. **Não usados por falta de contexto seguro**: soma de potência instalada,
número total de usinas individuais e geração anual agregada (existem por complexo, mas o total não
está declarado em lugar nenhum do projeto).

| Arquivo | Uso | Peso | Lazy |
| --- | --- | --- | --- |
| `/img/pages/nossas-usinas2.webp` | principal | 87,5 KB | sim |
| `/img/pages/usinas/Caiaponia.webp` | secundária | 91,6 KB | sim |
| `/img/pages/usinas/Varjao-de-Minas.webp` | secundária | 80,5 KB | sim |

Nenhum asset novo foi criado.

## 5. Design System

`Container`, `SectionHeader`, `Card`, `ButtonLink`, `BCIcon`, `bc-section-lg`, `rounded-xl/lg`,
tokens `surface`, `surface-muted`, `text-primary`, `text-secondary`, `bc-yellow` (CTA).

Ritmo de fundos: Segmentos (muted) → Regional (brand/teal) → Sustentabilidade (surface) →
Usinas (surface-muted). Sem dois blocos escuros seguidos.

## 6. Responsividade

360/390: coluna única, texto → imagens → cards → CTA; imagens em aspect-ratio fixo.
768: coluna única com respiro (sem 2 colunas espremidas). 1024/1280/1440: grid 12 colunas editorial.

## 7. Acessibilidade

H2 por seção + H3 nos cards de usinas; alt informativo (tipo de estrutura + município); links reais;
focus-visible herdado do Design System; contraste AA nos textos sobre superfície clara; ordem de
leitura texto → visual.

## 8. Performance e SEO

- JS inicial: 150 KB gzip (budget ≤ 160 KB) · 0 ERROR no `audit:budget`
- Design System: 0 ERROR · 3 WARNING · 8 INFO (pré-existentes)
- Semântica: 33/33 rotas com exatamente 1 H1
- Prerender: 33 rotas + 404 · metadata/canonical/robots/sitemap/JSON-LD inalterados

## 9. Screenshots validados

1440, 1280, 1024, 768, 390, 360 — seções Sustentabilidade e Usinas completas e transições.
