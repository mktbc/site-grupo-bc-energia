# CLAUDE.md — Site Grupo BC Energia

Leia também `AGENTS.md` (regras do Lovable) e `docs/EDITORIAL-ENERGY-PREMIUM.md`
(conceito, decisões e conflitos pendentes).

## Repositório e fluxo
- Oficial: `git@github.com:mktbc/site-grupo-bc-energia.git`.
- Entregas fora de um ambiente com git (ex.: chat) chegam como ZIP completo com
  `HANDOFF-GITHUB-MANUAL.md` na raiz; leia-o antes de continuar.
- Branch de evolução visual: `claude/editorial-energy-premium`, salvo se o
  repositório já tiver outro fluxo definido — nesse caso siga o existente e registre aqui.
- Sempre `git fetch` antes de trabalhar e antes de cada push; compare local × remoto.
- Proibido: force push, reescrever histórico publicado, apagar branches, criar outro repositório.
- Commits pequenos e temáticos (`feat(home): …`, `fix(responsive): …`, `refactor(ui): …`).
- Fluxo: analisar → implementar → validar → commitar → push → relatar.

## Validação antes de cada push
`npm run typecheck`, `npm run lint`, `npm run build` (o build roda sitemap e prerender).
Conferir no navegador: 1920, 1440, 1366, 1024, 768 e 390px; sem overflow horizontal;
um H1 por página; CTAs e links; console sem erros.
Nunca declarar validação que não foi executada — escrever "Não validado neste ambiente".

## Limites
- Não inventar produtos, números, métricas, clientes, certificações, claims ou critérios.
  Conflitos de conteúdo vão para a tabela de conflitos do doc, não para o código.
- Preservar: rotas, URLs, SEO/metadados, tracking (`data-cta-name`, GTM/GA4),
  formulários, integrações, Supabase, regras de negócio.
- Nunca versionar `.workspace/` (contém token de acesso Git do Lovable).
- Se o Lovable voltar a ser usado, ele deve acompanhar este repositório, não divergir.

## Conteúdo
- Percentual do Consórcio: somente "Até 25% de economia na conta de energia" /
  "Até 25% de economia" (decisão C2). Nunca "ao mês"/"por ano".

## Marca
Navy `#242F40`, verde `#18857D`, turquesa `#24D2C8`, amarelo `#F1C035` (estratégico).
Barlow Condensed (títulos/métricas) + Onest (texto/UI). Tokens em `src/styles/globals.css`.
