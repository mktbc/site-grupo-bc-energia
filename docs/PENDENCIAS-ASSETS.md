
## PENDÊNCIA DE ASSET — IMAGEM DE PRODUTO SEM TEXTO
- Data: 2026-08-14 · Seção: /produtos → Mercado Livre de Energia e Consórcio BC Energia
- `mercado-livre-de-energia-intro.webp` e `consorcio-intro.webp` possuem texto comercial embutido
  ("ECONOMIZE NA CONTA DE ENERGIA...", CTA e condições).
- Não existe no projeto versão da MESMA fotografia sem texto (`mercado-livre-de-energia-intro2.jpg`
  é outra fotografia). Nenhum asset novo foi criado.
- Ação necessária: fornecer a fotografia limpa (WebP), pois a informação comercial deve viver em HTML.

## Atualização — seção Consórcio BC Energia (/produtos)

- A arte `/img/pages/consorcio-intro.webp` possui texto embutido "ECONOMIZE ATÉ 26%…"
  e **foi retirada da seção** (não editada, não recortada, não escondida por CSS).
- Substituída pela fotografia institucional já existente no projeto
  `/img/pages/consorcio-de-energia-intro.jpg`, sem texto embutido, convertida para
  `/img/pages/consorcio-solucao.webp` (+ variante 600w).
- **PENDÊNCIA DE DESIGN — ARTE DO CONSÓRCIO ATUALIZADA PARA ATÉ 25%**: caso a peça
  publicitária volte a ser usada em algum ponto do site, ela precisa ser refeita com
  o percentual correto.

### DECISÃO HUMANA NECESSÁRIA
Divergência de percentual entre páginas (fora do escopo desta alteração):
- `src/pages/produtos/consorcio-bc-energia/data.tsx` (2 ocorrências) — "até 26%"
- `src/pages/produtos/consorcio-bc-energia/page.tsx` (1 ocorrência) — "até 26%"
- `src/pages/home/Sliders/Sliders.data.tsx` — "26% na energia"
- `src/pages/produtos/gestao-de-energia/page.tsx` — "26%"
Não foram alteradas por estarem fora da seção solicitada; aguardando autorização.

Condições comerciais sem fonte central no projeto (mantidas conforme conteúdo vigente):
conta mínima R$ 250,00, baixa tensão (Grupo B), lista de estados atendidos,
ausência de pagamento inicial/taxa administrativa.
