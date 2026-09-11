<<<<<<< HEAD
# Site Institucional — Grupo BC Energia

Site institucional do Grupo BC Energia, construído com **React + Vite + TypeScript**,
**Tailwind CSS** e **react-router-dom v6** (SPA compatível com o editor Lovable).

> Este projeto foi **migrado de Next.js (App Router)** para React + Vite. A migração cobriu
> apenas o front-end (design, páginas, componentes, estilos e assets). A camada de dados/backend
> (formulários, blog, Salesforce, GTM/RD Station) foi substituída por mocks/placeholders — veja
> **[MIGRACAO-TI.md](./MIGRACAO-TI.md)** para os pontos que a TI precisa reconectar.

## Começando

```bash
npm install
npm run dev        # servidor de desenvolvimento (http://localhost:8080)
```

## Scripts

| Script | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (Vite), porta 8080 |
| `npm run build` | Typecheck (`tsc`) + build de produção (`vite build`) → `dist/` |
| `npm run typecheck` | Checagem de tipos sem emitir arquivos |
| `npm run lint` | ESLint (Vite/React/TypeScript) |
| `npm run preview` | Pré-visualiza o build de produção |
| `npm run format` | Formata o código com Prettier |

## Stack

- **React 18** + **Vite 5** + **TypeScript**
- **react-router-dom v6** — roteamento SPA (cada página em `src/pages/*`, rotas em `src/App.tsx`)
- **Tailwind CSS** + **tailwind-variants** — estilização
- **react-helmet-async** — SEO por rota (`src/config/meta.ts`)
- **swiper** — carrosséis/sliders

## Estrutura

```
src/
  App.tsx              # todas as rotas (react-router-dom)
  main.tsx             # entrypoint (BrowserRouter + HelmetProvider)
  pages/               # páginas (portadas do App Router do Next)
  components/          # componentes de UI (inclui shims Image/Link/Seo)
  components/Layout/   # RootLayout (Header/Footer/SimuleAgora + Outlet)
  config/              # meta.ts (SEO) e integrations.ts (endpoints/placeholders)
  data/segments/       # dados locais dos segmentos (11 JSONs)
  services/            # mocks das fontes de dados (Salesforce, blog, segmentos)
  helpers/, hooks/, types/, styles/
```
=======
# site-grupo-bc-energia
>>>>>>> 0c938117e0a536e2bc8372a79b1efbd2470f5a4b
