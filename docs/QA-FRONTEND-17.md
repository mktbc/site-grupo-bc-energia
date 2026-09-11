# FRONT-END 17 — QA global e revisão final do site

Auditoria global de fechamento da FASE 3. Nenhuma área nova foi redesenhada e
nenhuma página foi criada: apenas correções de regressão, ruído de console,
tokens do Design System e falsos positivos das auditorias automatizadas.

## 1. Build, tipos e pré-render

| Checagem | Resultado |
| --- | --- |
| `npm run build` | OK — 33 rotas + `404.html` pré-renderizadas |
| `npm run typecheck` | 0 erros |
| Cache busting | 62/62 chunks JS com hash |

## 2. SEO técnico

| Auditoria | Resultado |
| --- | --- |
| Semântica HTML | 33 rotas indexáveis · **todas com exatamente 1 H1** · 0 erros |
| Indexação | INDEX 33 · NOINDEX 7 · REDIRECT 1 — OK |
| Robots + sitemap | 33 URLs no sitemap = `INDEXABLE_ROUTES` · 33 canonicals em `dist/` |
| Dados estruturados | Válidos nas 33 rotas indexáveis |
| Metadata | Títulos e descriptions únicos; todas as `ogImage` existem em `public/` |
| 404 / redirects | 5.840 links internos verificados · **0 quebrados** · 0 chains/loops |

## 3. Performance (sem regressão)

- JS inicial: **151,2 KB gzip** (490,4 KB bruto), 62 chunks.
- LCP da Home: `/bg-home.webp` — 50,7 KB.
- Scripts de terceiros no HTML inicial: **0** (GTM em idle).
- Fontes self-hosted: 10 arquivos WOFF2 · 224,6 KB · 2 preloads.
- Budget: 0 ERROR, 1 WARNING (1 imagem acima do budget), 8 INFO.

## 4. QA de navegador (Playwright)

20 rotas × 3 viewports (1440, 390 e 360 px):

- **0 overflow horizontal** em qualquer rota/viewport.
- **1 H1 por rota** também no DOM hidratado.
- Console limpo após a correção das future flags do React Router.
- Requisições 404 remanescentes são de terceiros externos (GTM e simulador),
  esperadas no ambiente de preview sem credenciais.

## 5. Correções aplicadas nesta etapa

1. **React Router — ruído de console.** `BrowserRouter` passou a declarar
   `future={{ v7_startTransition, v7_relativeSplatPath }}` em `src/main.tsx`.
   Elimina os dois avisos exibidos em todas as rotas.
2. **Design System — cores cruas.** `bg-black` substituído por
   `bg-surface-dark` em `Fields/Terms.tsx` e `YouTubeEmbed.tsx`.
   Auditoria do DS: **0 ERROR · 0 WARNING** (antes 3 WARNING).
3. **`scripts/audit-navigation.ts` — falsos positivos.** A checagem do logo
   agora aceita qualquer `aria-label` que contenha "Grupo BC Energia"
   (o texto real é "Página inicial do Grupo BC Energia") e a checagem de alvo
   de toque ignora ícones decorativos (`<svg className="h-6 w-6">`) dentro de
   botões maiores. Resultado: **9 OK · 0 aviso · 0 erro**.
4. **`scripts/audit-fonts-performance.ts` — falsos positivos.** Os
   `@font-face` de fallback com métricas ajustadas (`Onest Fallback`,
   `Barlow Condensed Fallback`, `src: local(...)`) deixaram de ser tratados
   como fontes de rede. Resultado: **0 ERROR** (antes 6).

## 6. Pendências registradas (fora do escopo desta etapa)

| Item | Natureza | Observação |
| --- | --- | --- |
| 3 números de WhatsApp distintos (`config/integrations.ts` × `config/navigation.ts`) | Validação comercial | Definir o número oficial por contexto antes do go live |
| Similaridade editorial 64–66% entre segmentos (Educacional / Saúde / Serviços) | Conteúdo | Diferenciação editorial futura |
| `bc-form.css` referencia a família antiga `Roboto` | Cosmético | Stack de fallback herdada do formulário legado |
| 7 INFO de containers ad-hoc (`max-w-[…]`) | Design System | Larguras de leitura intencionais, não são containers de página |
| Peso 300 de Onest sem arquivo próprio | Performance | Cai no peso mais próximo, sem download extra |
