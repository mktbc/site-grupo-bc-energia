# FRONT-END 10 — Footer + fechamento da Home

Escopo: rodapé e transição Final CTA → Footer. Nenhuma outra seção da Home e
nenhuma página interna foi redesenhada.

## 1. Footer anterior

- Arquivos: `Footer.tsx`, `Footer.data.ts`, `Footer.style.ts`, `ItemsCol.tsx`, `Item.tsx`.
- Estrutura: bloco institucional (logo vertical + 2 endereços + redes) e 5 colunas
  espelhando integralmente os dropdowns do Header (`Navbar/Items.data`), incluindo
  os 11 segmentos.
- Logo: `Logo-BC-Energia-Vertical-Branco.svg`, 200x116, dominante no bloco.
- Background: `footer-bg.webp` (227 KB) em `bg-cover` + 3 camadas de overlay/gradiente
  sobre `bg-bc-dark`.
- Container: ad-hoc `container mx-auto max-w-[1240px]`, divergente do DS.
- Barra legal: `bg-bc-primary-dark/80` (faixa teal), copyright dinâmico e 2 links legais.
- Problemas: imagem decorativa pesada, container ad-hoc, hierarquia visual plana
  (títulos de coluna em `font-display text-xl`), 11 segmentos listados, faixa teal
  inferior competindo com o Final CTA (também teal), cores fora de token
  (`text-amber-400`, `bg-bc-primary-dark/80`), `md:pr-36` para desviar do widget flutuante.

## 2. Footer atual

- Superfície: `bg-surface-dark` sólido, sem imagem. Fio superior `bg-white/10`.
- Container: `<Container>` do Design System (`bc-container`), padding `py-14 lg:py-16`.
- Grid: 12 colunas no desktop (4 marca + 8 navegação em 3 colunas);
  2 colunas no tablet; 1 coluna no mobile.
- Blocos: marca e contato · Soluções · Institucional · Navegar · redes sociais ·
  barra legal.
- Sem CTA grande: a conversão continua no Final CTA.
- Estático: nenhuma animação, marquee ou parallax.

## 3. Logo

`/logo-bc-energia.svg` (a mesma assinatura horizontal branca do Header), 211x37,
renderizada em `h-8 w-auto`. O logo vertical de 200x116 saiu de uso no rodapé.

## 4. Navegação

Derivada de `Footer.nav.ts`, que consome `config/navigation.ts` (fonte única,
por sua vez derivada de `Navbar/Items.data`). Nenhuma lista paralela.

| Grupo | Links |
| --- | --- |
| Soluções | Mercado livre de energia · Consórcio BC Energia · Gestão de Energia · Certificação Renovável I-REC · Arrendamento de usinas · Consultoria Jurídica (externo) |
| Institucional | Quem Somos · Nossas Usinas · Sustentabilidade · Social · Contato |
| Navegar | Segmentos atendidos (/segmentos) · Todas as soluções (/produtos) · Blog · BC Cast |
| Regulatório e legal (barra inferior) | LGPD · Leilão · Fator de Alavancagem · Condições Gerais Varejistas |

Os 11 segmentos não são listados: o rodapé leva a `/segmentos`. Blog e BC Cast
seguem noindex e aparecem no grupo secundário "Navegar".

## 5. Contato

- WhatsApp: `HEADER_CLIENT_LINK.href` (mesmo número do Header, nada novo).
- E-mail: não existe e-mail institucional configurado no projeto, portanto não é exibido.
- Telefone: não há telefone fixo configurado além do WhatsApp.
- Endereços: Goiânia (GO) e São Paulo (SP), exatamente os já publicados no rodapé anterior.

## 6. Redes sociais

Fonte: `Footer.data.ts` (mesma lista de `SOCIAL_PROFILES` em `config/site.ts`).

| Rede | URL configurada | Ícone |
| --- | --- | --- |
| Instagram | https://www.instagram.com/grupobcenergia/ | /img/icons/instagram.svg |
| Facebook | https://www.facebook.com/GrupoBCEnergia | /img/icons/facebook.svg |
| LinkedIn | https://www.linkedin.com/company/grupobcenergia/ | /img/icons/linkedin.svg |
| YouTube | https://www.youtube.com/@grupobcenergia | /img/icons/youtube.svg |

Botões circulares de 44x44, `aria-label` "«Rede» do Grupo BC Energia (abre em nova aba)",
ícone com `alt=""` (decorativo).

## 7. Legal

- Copyright dinâmico: `© {ano} Grupo BC Energia. Todos os direitos reservados.`
- Regulatório e legal: LGPD, Leilão, Fator de Alavancagem, Condições Gerais Varejistas,
  em `text-sm text-white/65`, peso claramente menor que as páginas comerciais.
- Não existe página de Termos ou Política de Privacidade separada: nada foi inventado.
- Não havia razão social nem CNPJ no rodapé anterior, portanto nada foi removido.

## 8. Background

- `footer-bg.png` (509 KB) e `footer-bg.webp` (227 KB) não são mais referenciados e
  foram removidos de `public/img/global/`.
- Uso anterior: textura decorativa a 40% de opacidade, coberta por três overlays.
- Uso atual: `bg-surface-dark` sólido. Redução de 227 KB baixados no rodapé de
  todas as 33 rotas (e 509 KB a menos no repositório/deploy).

## 9. Responsividade

- 360 e 390: uma coluna, links com 36px de altura mínima, redes sociais 44x44,
  barra legal em duas linhas sem aperto, `pb-28` preservado para não colidir com o
  widget flutuante de WhatsApp. Sem overflow horizontal.
- 768: marca em uma coluna e navegação em duas.
- 1024 / 1280 / 1440: 4 + 8 colunas, sem coluna estreita e sem linha órfã.

## 10. Acessibilidade

- `<footer>` único, três `<nav>` rotulados (Soluções, Institucional, Navegar) e um
  `<nav aria-label="Regulatório e legal">`.
- Títulos de coluna como `<p>`, sem criar H2/H3 desnecessários. A Home segue com 1 H1.
- `focus-visible:ring-2 ring-amber-400` com offset sobre `surface-dark` em todos os links.
- Contraste sobre `surface-dark`: texto principal branco/75, secundário branco/70,
  eyebrows em `bc-yellow`, barra legal branco/65.
- Alvos de toque: links 36px de altura; redes sociais 44x44.

## 11. Performance

- JS inicial: 151,5 KB gzip antes, 151,1 KB gzip depois (budget ≤ 160 KB).
- Imagem de rodapé: 227 KB antes, 0 KB depois.
- Nenhuma biblioteca nova. Nenhum hex, shadow, radius ou max-width arbitrário.
- Budget: 0 ERROR, 1 WARNING (imagem `/img/pages/2147948282.jpg`, pré-existente e
  fora do escopo desta etapa).

## 12. Ordem final da Home

1. Slider (Hero, único H1)
2. Como Ajudamos
3. Soluções
4. Números
5. Depoimentos
6. Segmentos
7. Presença Regional
8. Sustentabilidade
9. Usinas
10. Links relacionados
11. Conteúdo (BC Cast + artigos)
12. Customers (grid de logos)
13. Final CTA (`surface-brand`)
14. Footer (`surface-dark`)

## 13. Consistência de Design System

A Home usa `Container`, `SectionHeader`, `Card`/`HubCard`, `ButtonLink`, tokens de
cor e `bc-section-*` nas seções redesenhadas. O audit aponta 0 ERROR, 3 WARNING e
6 INFO, todos pré-existentes (max-width de leitura em parágrafos e no Hero).

## 14. Ajustes fora do Footer

Nenhum. A transição já funcionava: `surface-brand` (Final CTA) → `surface-dark`
(Footer), sem faixa intermediária. A faixa teal registrada na etapa anterior era a
barra legal do próprio rodapé e foi eliminada nesta etapa.

## 15. Validações

- `npm run build`: OK · TypeScript sem erros · 33 rotas pré-renderizadas + 404.
- `npm run audit:design-system`: 0 ERROR · 3 WARNING · 6 INFO.
- `npm run audit:budget`: 0 ERROR · 1 WARNING · 8 INFO · JS inicial 151,1 KB gzip.
- SEO: sitemap com 33 URLs, canonical, robots, metadata e JSON-LD intactos,
  exatamente 1 H1 em 33/33 rotas.
- Screenshots: Home e rodapé em 1440, 1280, 1024, 768, 390 e 360; transição
  Final CTA → Footer em 1440 e 390.
