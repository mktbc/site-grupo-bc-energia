# FRONT-END 09 — Home: Customers + Final CTA

Escopo: apenas o bloco de logos (Customers) e o CTA final da Home, além da
transição visual para o Footer. Footer, Header, Hero e demais seções não foram
alterados.

## 1. Customers — antes

- Componente: `src/components/Customers/Customers.tsx` (`variant="carousel"`).
- Fonte de dados: `src/components/Customers/Customers.data.ts` — 21 logos PNG em
  `public/img/components/customers/`.
- Layout: carrossel Swiper com autoplay contínuo (2,5 s), loop infinito,
  2 slides em mobile e 5 em desktop.
- Problemas: movimento automático permanente, alt vindo do `title` técnico do
  arquivo (`bandnewsfmgoiania`), tamanhos não normalizados, título "Nossos
  Clientes" afirmando relação comercial de clientela para todo o conjunto.

## 2. Customers — atual (somente Home)

- Eyebrow: `PRESENÇA NO MERCADO`
- H2: `Empresas que fazem parte da nossa história`
- Descrição: "Marcas de diferentes portes e segmentos que já se conectaram às
  soluções de energia do Grupo BC Energia."
- Exibidos: 12 logos (dos 21 da fonte — nada foi removido do dado).
- Layout: grade estável (2 / 3 / 4 / 6 colunas), altura normalizada
  (`max-h-14` → `lg:max-h-16`, `w-auto`, `object-contain`), sem cards.
- Fundo: `bg-surface-muted`, espaçamento `bc-section-lg`, `Container` + `SectionHeader`.
- Sem carrossel, sem autoplay, sem marquee. Demais páginas seguem no carrossel legado.

### Logos exibidos na Home

| Marca | Arquivo | Formato | Uso |
| --- | --- | --- | --- |
| Coco Bambu Restaurante | coco-bambu-restaurante.png | PNG | Home + demais páginas |
| Coming | coming.png | PNG | Home + demais páginas |
| Drogaria Santa Marta | drogariasantamarta.png | PNG | Home + demais páginas |
| Flamboyant | flamboyant.png | PNG | Home + demais páginas |
| Fujioka | fujioka.png | PNG | Home + demais páginas |
| Grupo Jorlan | grupo-jorlan.png | PNG | Home + demais páginas |
| Grupo Natureza (O Boticário) | grupo-natureza-o-boticario.png | PNG | Home + demais páginas |
| Grupo Cereal | grupocereal.png | PNG | Home + demais páginas |
| Mega Moda Park | mega-moda-park.png | PNG | Home + demais páginas |
| Novo Mundo | novomundo.png | PNG | Home + demais páginas |
| Teuto | teuto.png | PNG | Home + demais páginas |
| Triunfo Concebra | triunfoconcebra.png | PNG | Home + demais páginas |

Demais logos da fonte (BandNews FM Goiânia, Curtidora Tocantins, Igreja Luz,
Lifebox, Limagrain, Lui Doces, Piquiras, Richesse, Tea Shop) permanecem no
`Customers.data.ts` e continuam sendo exibidos nas páginas que usam o carrossel.
Nenhum asset foi deletado.

### Relação comercial

O conjunto não está classificado no projeto entre clientes e parceiros — o dado
original traz apenas nome e arquivo. Por isso a copy adotada é neutra
("Empresas que fazem parte da nossa história"), sem afirmar que todas são
clientes. Nenhuma marca foi adicionada por existir no repositório.

### Acessibilidade e performance dos logos

- `alt` com o nome real da marca (`alt="Novo Mundo"`), nunca "logo cliente".
- `loading="lazy"`, `decoding="async"`, `width`/`height` reservados.
- Sem grayscale: parte dos logos perde legibilidade dessaturada.
- Maior arquivo: `triunfoconcebra.png` (10,7 KB). Nenhum logo novo criado.

## 3. Final CTA — antes

- Headline: "Descubra quanto sua empresa pode economizar".
- Texto longo repetindo as três soluções.
- CTAs: "Enviar minha conta para análise" (`/contato`) + "Falar com um
  especialista" (WhatsApp hardcodado no arquivo).
- Fundo `bg-teal-600` com container ad-hoc e composição centralizada.
- Problemas: número de WhatsApp duplicado no componente, centralização
  destoando do resto da Home (alinhado à esquerda) e headline sugerindo economia
  antes de qualquer análise.

## 4. Final CTA — atual

- Eyebrow: `PRÓXIMO PASSO`
- H2: "Sua conta de energia pode revelar oportunidades de economia"
- Descrição (2 linhas): envio da conta para análise do perfil de consumo.
- CTA principal: `Enviar minha conta para análise` → `/contato`
  (`HEADER_CTA.labelLong` / `HEADER_CTA.href`).
- CTA secundário: `Falar com um especialista` → WhatsApp oficial de
  `HEADER_CLIENT_LINK.href` (nenhum número novo).
- Fundo: `bg-surface-brand` (teal institucional), fio superior em `bc-yellow`.
- Layout: duas colunas em desktop (headline à esquerda, texto + CTAs à direita),
  uma coluna em tablet/mobile; `Container` + `bc-section-lg`.
- Sem glassmorphism, sem imagem nova, sem estilo de botão local (`ButtonLink`).

### Consistência de conversão

Header, Hero e Final CTA usam o mesmo rótulo e o mesmo destino (`/contato`),
com o WhatsApp oficial como ação secundária.

## 5. Transição para o Footer

Sequência final: Customers (claro) → Final CTA (teal) → Footer (navy). As três
superfícies são distintas, sem borda dupla nem espaçamento duplicado.

Pendências registradas do Footer (não alteradas nesta etapa):
- container ad-hoc `max-w-[1240px]` divergente do `Container` do DS;
- `footer-bg.png` com 508,9 KB (acima do budget de imagens);
- faixa inferior em teal muito próxima do Final CTA — avaliar em FRONT-END 10.

## 6. Validações

- `npm run build`: OK · TypeScript sem erros · 33 rotas pré-renderizadas + 404.
- `npm run audit:design-system`: 0 ERROR · 3 WARNING · 8 INFO (pré-existentes).
- `npm run audit:performance` / `audit:budget`: JS inicial 151,5 KB gzip
  (budget ≤ 160 KB), 0 ERROR. Nenhuma biblioteca nova.
- SEO: sitemap com 33 URLs, canonical/robots/metadata/JSON-LD intactos,
  exatamente 1 H1 na Home em todos os breakpoints.
- Screenshots validados em 1440, 1280, 1024, 768, 390 e 360 px.
