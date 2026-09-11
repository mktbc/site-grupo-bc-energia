# Auditoria global de acessibilidade — Grupo BC Energia

Escopo: front-end completo (44 rotas). Identidade visual, SEO, tracking, rotas
e prerender preservados. O banner inicial da Home não teve o design alterado —
apenas a camada de acessibilidade.

## Correções aplicadas

| Página/componente | Problema | Severidade | Correção | Status |
| --- | --- | --- | --- | --- |
| `Link` (global) | CTAs com `target="_self"` viravam `<a>` nativo e recarregavam a página inteira, perdendo foco, contexto e performance | P0 | `_self` passa a navegar por SPA | Corrigido |
| `RootLayout` | Suspense acima do layout desmontava header, `<main>` e footer a cada rota | P0 | Suspense movido para dentro do `<main>` | Corrigido |
| Navegação SPA | Troca de rota não movia foco nem anunciava a nova página | P0 | `RouteFocus`: foco em `<main tabindex="-1">` + região `aria-live` com o título | Corrigido |
| Carrossel da Home | Slides fora de tela alcançáveis por Tab | P0 | `inert` nos slides inativos (sem mudança visual) | Corrigido |
| Carrossel da Home | Controles com mensagens em inglês | P1 | Módulo A11y do Swiper com textos pt-BR (slide anterior/próximo, ir para o slide N) | Corrigido |
| Carrossel da Home | Autoplay não pausava | P1 | Pausa ao passar o mouse e ao interagir; sem autoplay em `prefers-reduced-motion` | Corrigido |
| Indicadores do carrossel | Alvo de toque de 10px | P1 | Área de toque ampliada para ~44px via pseudo-elemento | Corrigido |
| Accordion / FAQ | Painel sem `aria-controls`, conteúdo fechado ainda lido por leitor de tela | P1 | `aria-controls`, `role="region"`, `aria-labelledby` e `hidden` quando fechado | Corrigido |

## Verificado e já conforme

- Skip link "Ir para o conteúdo principal" como primeiro item de tabulação, em todas as rotas.
- Foco visível global (`:focus-visible`, contorno 3px) e utilitário `bc-focus-ring`.
- `lang="pt-br"` no documento e `<title>` descritivo por rota.
- Landmarks `header`, `nav`, `main`, `section`, `footer`; um único H1 por rota.
- Menu desktop e mobile com `aria-expanded`, `aria-controls`, `aria-label` e botões reais.
- Modal com foco preso, ESC e devolução de foco.
- Formulários com `label` real, `required`, `aria-describedby` e alertas com `role="alert"`/`status`.
- Simulador com `aria-valuetext` no slider (sem anúncio contínuo) e resultado descrito em texto.
- Imagens com `alt` obrigatório por tipagem; decorativos com `alt=""` e `aria-hidden`.
- Nenhum `div onClick` de navegação; `tabindex` positivo inexistente.
- `prefers-reduced-motion` respeitado globalmente.

## QA executado

- Navegação apenas por teclado na Home e em `/produtos`: skip link, header, carrossel, conteúdo e footer.
- Foco e anúncio do título validados na troca de rota.
- Sem overflow horizontal em 320, 390 e 430px.
- Typecheck, build de produção e prerender (33 rotas + 404) sem erros.

## Pendências recomendadas

- Validação com leitor de tela real (NVDA/VoiceOver) nas jornadas Home → Produto → Simulador.
- Legendas nos vídeos do BC Cast (dependem do material de origem).
