# PERFORMANCE 03 — Fontes e carregamento tipográfico

Etapa executada sobre a base de PERFORMANCE 01 (imagens/LCP) e 02 (code splitting).
Nenhuma alteração de família, peso visual, tamanho, hierarquia ou layout.

---

## 1. Famílias

| Família | Uso | Origem antes | Origem depois |
| --- | --- | --- | --- |
| Onest | corpo, UI, botões, textos (`font-sans`) | Google Fonts (CDN) | self-hosted `/fonts/*.woff2` |
| Barlow Condensed | títulos H1–H4 (`font-display`) | Google Fonts (CDN) | self-hosted `/fonts/*.woff2` |

Fallbacks mantidos exatamente como estavam (`tailwind.config.ts` e `globals.css`):
`Onest, system-ui, -apple-system, 'Segoe UI', sans-serif` e
`'Barlow Condensed', Onest, system-ui, sans-serif`.

Famílias antigas: nenhuma ativa. `Roboto` aparece apenas como fallback de sistema
no stack de `src/components/Forms/bc-form.css` (LEGÍTIMO FALLBACK). A menção a
`Montserrat` era apenas um comentário residual — corrigido (sem efeito visual).

## 2. Pesos

| Família | Pesos antes | Pesos depois | Uso real |
| --- | --- | --- | --- |
| Onest | 400, 500, 600, 700 | 400, 500, 600, 700 | 400 (body/`font-normal`), 500 (`font-medium`), 600 (`font-semibold`, 54 ocorrências), 700 (`font-bold`) |
| Barlow Condensed | 700 | 700 | títulos (`h1`–`h4`) |

Nenhum peso removível: todos os quatro pesos de Onest são efetivamente usados.
`font-light` (300) aparece em 2 componentes (`Heading` subtitle, `Customers` eyebrow);
o peso 300 **não era carregado antes** e continua não sendo carregado — o navegador
resolve para o mais próximo (400), exatamente como no comportamento atual. Carregar
o 300 mudaria a aparência e, portanto, não foi feito.

Itálico: nenhuma variante itálica carregada nem necessária (`italic` aparece em 2
componentes e é resolvido por síntese do navegador — comportamento inalterado).

## 3. Formatos e arquivos

Somente **WOFF2**, subsets `latin` e `latin-ext` (pt-BR). Subsets cirílico, grego
e vietnamita do Google foram descartados — nunca eram baixados em pt-BR, mas
deixam de existir na cadeia.

| Arquivo | KB |
| --- | ---: |
| `onest-400-latin.woff2` | 31,5 |
| `onest-500-latin.woff2` | 31,5 |
| `onest-600-latin.woff2` | 31,5 |
| `onest-700-latin.woff2` | 31,5 |
| `barlow-condensed-700-latin.woff2` | 21,9 |
| `onest-{400,500,600,700}-latin-ext.woff2` | 15,6 cada |
| `barlow-condensed-700-latin-ext.woff2` | 14,3 |

Total em `public/fonts`: **224,6 KB** (10 arquivos). Nenhum TTF/OTF/WOFF.

## 4. Peso e requests

Carregamento real de uma página em pt-BR (subsets `latin`):

| | Antes (Google Fonts) | Depois (self-hosted) |
| --- | --- | --- |
| Conexões externas | 2 (`fonts.googleapis.com`, `fonts.gstatic.com`) | 0 |
| Requests até a fonte | 3 (HTML → CSS externo → woff2) | 1 (preload direto no HTML) |
| Requests de fonte na Home | 5 woff2 + 1 CSS externo | 5 woff2 |
| Bytes de fonte (latin) | ~148 KB + CSS externo | ~148 KB |

O ganho principal é de **latência e caminho crítico**, não de bytes: elimina-se o
CSS render-blocking de terceiros e a cadeia DNS/TLS para dois domínios externos.
Os dois arquivos da primeira dobra passam a ser descobertos no primeiro byte do HTML.

## 5. Preload

Apenas 2 arquivos, ambos com `crossorigin` e `type="font/woff2"`:

- `/fonts/onest-400-latin.woff2` — texto de corpo e CTAs da primeira dobra;
- `/fonts/barlow-condensed-700-latin.woff2` — H1 do hero e navegação.

Pesos 500/600/700 de Onest e os subsets `latin-ext` **não** recebem preload —
são carregados sob demanda pelo CSS. Nenhuma duplicação: o preload aponta para o
mesmo URL declarado no `@font-face` (validado pelo script de auditoria).

## 6. font-display

Todos os 10 blocos `@font-face` em `src/styles/fonts.css` usam `font-display: swap`
(mesma estratégia que o Google já entregava com `&display=swap`). Nenhum `block`.

## 7. Arquitetura CSS

- `src/styles/fonts.css` (novo) — todos os `@font-face`, centralizados.
- `src/styles/globals.css` — `@import './fonts.css'` na primeira linha; o Vite
  inline o conteúdo no CSS principal em build, sem `@import` em runtime.
- `tailwind.config.ts` — inalterado (`fontFamily.sans` = Onest, `fontFamily.display`
  = Barlow Condensed).

## 8. Fontes órfãs

Nenhuma. Todos os 10 arquivos em `public/fonts` são referenciados por `@font-face`
(verificado por `npm run audit:fonts`).

## 9. Validação

- `/`, `/produtos/mercado-livre-de-energia`, `/segmentos/agronegocio`,
  `/energia-solar-goiania`, `/sobre` — computed `font-family` idêntico em H1 e body;
  screenshots sem diferença visual, sem quebra de linha nova, sem FOIT perceptível.
- Requests de fonte observados: apenas os 5 arquivos locais. As duas requisições
  `Onest-*.ttf` restantes vêm do **iframe externo do simulador**
  (`simulador.bcenergiacomdesconto.com.br`) — terceiro, fora do escopo desta etapa.
- `npm run build` → 33 rotas prerender + `404.html`, 0 falhas.
- `tsc --noEmit` → 0 erros. `npm run audit:fonts` → 0 ERROR.

## 10. Limitações

- **CLS tipográfico**: validação visual OK; sem métrica de campo. Nenhum
  `size-adjust`/`ascent-override` foi aplicado (item 15 da especificação) porque não
  há deslocamento mensurável — aplicá-los alteraria métricas visuais.
  `VALIDAÇÃO VISUAL OK · MEDIÇÃO REAL PENDENTE EM PRODUÇÃO`.
- Fonte variável de Onest não adotada: os 4 estáticos somam 126 KB (latin) contra
  um arquivo variável maior por página que use um único peso; sem benefício claro.
- Peso 300 (`font-light`) segue sem arquivo próprio — mantido para não alterar o
  visual atual. Se o design quiser o 300 real, é decisão de tipografia, não de
  performance.

## 11. Recomendações futuras

1. Medir CLS/LCP reais em produção após o cut-over.
2. Avaliar `Cache-Control: immutable` de 1 ano para `/fonts/*` no hosting.
3. Tratar as fontes carregadas pelo iframe do simulador na etapa de terceiros.
