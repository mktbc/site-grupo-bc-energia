# FRONT-END 04 — Home: Como ajudamos + Soluções

## 1. Estrutura anterior

Ordem: Hero → **Soluções** → **Como ajudamos** → Números → Depoimentos.

### Soluções (antes)
- `src/pages/home/Sections/Solutions.tsx` com `Heading` + `ProductCard`.
- Título genérico: "Conheça aqui algumas das soluções que oferecemos para redução na conta de energia".
- 6 cards `ProductCard`: fundo teal escuro, imagem 240px de altura, ícone grande sobre a foto, descrição longa (3–4 linhas) e **botão grande "Conhecer a solução" em todos os cards**.
- Fundo branco cru (`bg-white`), grid `lg:grid-cols-2 xl:grid-cols-3`, container ad-hoc.

### Como ajudamos (antes)
- 4 itens em `<li>` com classes de card escritas à mão, `Heading` com subtitle, `Section` com `px-6 py-16` arbitrário.
- Ficava **abaixo** das soluções — o visitante via o portfólio antes de entender o benefício.

### Principais problemas
- Ordem invertida (portfólio antes da proposta de valor).
- Hero escuro → seção de cards teal escuros: sem mudança de ritmo visual.
- Botão grande repetido em 6 cards; card não clicável por inteiro.
- Cards fora do Design System (cores e sombras próprias), containers ad-hoc, spacing arbitrário.
- Duas listas paralelas de produtos (`ProductCard.data`) divergindo do hub `/produtos`.

## 2. Como ajudamos (atual)

- **Eyebrow:** ENERGIA QUE GERA RESULTADO (`t-eyebrow`)
- **H2:** Reduza custos e tenha mais controle sobre a energia da sua operação
- **Descrição:** 2 linhas no desktop, sem promessa nova.
- **Layout:** 4 pilares — 4 col (lg) / 2 col (md) / 1 col (mobile).
- **Background:** `bg-surface` (claro, logo após o Hero escuro).
- **Spacing:** `bc-section-lg`.

### Pilares

| Nome | Ícone (BCIcon) | Descrição |
| --- | --- | --- |
| Economia | `economia-na-conta` | Análise do perfil de consumo e indicação da solução com melhor custo, sem investimento inicial. |
| Gestão | `eficiencia-energetica` | Acompanhamento de contratos, medição e faturamento no Mercado Livre. |
| Previsibilidade | `contrato-aprovado` | Contratos de longo prazo e time próprio do diagnóstico ao suporte. |
| Sustentabilidade | `energia-limpa` | Fontes renováveis e certificação I-REC. |

Ícones em 32px dentro de um badge 56px com `bg-bc-primary/[0.08]`, `aria-hidden`.

## 3. Soluções (atual)

- **H2:** Um portfólio para cada perfil de consumo
- **Descrição:** "Empresas, condomínios e residências: escolha o modelo mais adequado ao seu consumo e à sua conexão."
- **Quantidade:** 6 cards, derivados de `PRODUCT_HUB_ITEMS` (mesma fonte do menu e de `/produtos` — nada inventado).
- **Layout:** `HubCardGrid` 3 / 2 / 1 colunas (3 + 3, sem cards órfãos).
- **Background:** `bg-surface-muted`.
- **CTA final:** "Ver todas as soluções" → `/produtos` (`ButtonLink` outline).

| Solução | Elemento visual | Descrição | Destino |
| --- | --- | --- | --- |
| Mercado Livre de Energia | BCIcon `mercado-crescimento` | Negocie energia diretamente com o gerador e reduza o custo da operação. | /produtos/mercado-livre-de-energia |
| Consórcio BC Energia | BCIcon `solar-residencial` | Energia de usina solar por assinatura, sem obra e sem placas. | /produtos/consorcio-bc-energia |
| Gestão de Energia | BCIcon `monitoramento-consumo` | Faturas, medição e contratos acompanhados. | /produtos/gestao-de-energia |
| Certificação Renovável – I-REC | BCIcon `energia-limpa` | Comprovação de consumo de fonte renovável. | /produtos/certificacao-renovavel-irec |
| Arrendamento de Usinas | BCIcon `usina-solar` | Condições de arrendamento para donos de usina/área. | /produtos/arrendamento-de-usinas |
| Consultoria Jurídica | BCIcon `contrato-aprovado` | Apoio jurídico especializado (item real do hub/menu). | https://www.bced.com.br/ (nova aba) |

## 4. Design System

- `Container` em ambas as seções (containers ad-hoc eliminados).
- `SectionHeader` para eyebrow + H2 + descrição.
- `Card` (variante default) nos pilares; `HubCard`/`HubCardGrid` nas soluções.
- `ButtonLink` (primary outline) no CTA final.
- Tokens: `bg-surface`, `bg-surface-muted`, `border-border-subtle`, `rounded-card`, `shadow-card`, `bc-section-lg`, `t-eyebrow`, `t-h4`, `t-body-sm`.

## 5. Responsividade

- 360 / 390: 1 coluna, padding confortável, ícones 32px, card-link com área de toque total.
- 768: 2 colunas em ambas as seções.
- 1024 / 1280 / 1440: pilares em 4 colunas, soluções em 3 colunas (3 + 3).

## 6. Acessibilidade

- H2 por seção, H3 por pilar e por solução (1 H1 na página — validado em 6 viewports).
- Card inteiro é `<a>` (`HubCard`), com `focus-visible:ring` e `aria-label` quando aplicável.
- Ícones decorativos com `aria-hidden` / `role="presentation"`.
- Hover/transição respeitam `motion-reduce`.

## 7. Performance

- Nenhuma imagem nova (ícones SVG já existentes, ~1–2 KB).
- JS inicial: 148,3 KB gzip (budget ≤ 160 KB) — sem dependências novas.
- CLS estável: cards sem imagem, altura definida por conteúdo.
- Auditoria design-system: 0 ERROR (warnings/infos são pré-existentes fora do escopo).

## 8. Screenshots

`/tmp/browser/home04/home-{1440,1280,1024,768,390,360}.png`

## 9. Arquivos alterados

- `src/pages/home/Sections/HowWeHelp.tsx`
- `src/pages/home/Sections/Solutions.tsx`
- `src/pages/home/page.tsx` (ordem: Como ajudamos → Soluções)
- `docs/FRONTEND-HOME-SOLUTIONS.md` (novo)
