# FRONT-END 14 — Contato + Formulários

Escopo: apresentação de `/contato` e dos formulários comerciais.
**Nada de integração foi alterado** — payloads, Edge Functions, Salesforce,
RD Station, UTM, dataLayer, nomes de campos e lista de UF permanecem iguais.

## /contato

Nova hierarquia da página (`src/pages/contato/page.tsx`):

1. `PageHeader` (alinhado à esquerda, breadcrumb, H1 único “Contato”).
2. Bloco de formulário em duas colunas: texto de apoio + embed do simulador.
3. `ProductSteps` — “O que acontece depois do envio” (3 passos).
4. Canais reais: WhatsApp oficial (`HEADER_CLIENT_LINK`) e os dois escritórios
   já publicados no rodapé (Goiânia e São Paulo), em `<address>`.

Nenhum telefone, e-mail ou endereço novo foi inventado.

## FormEmbed

`src/components/FormEmbed/FormEmbed.tsx` ganhou a prop `variant`:

- `section` (padrão): bloco teal completo, usado em produtos, segmentos e regionais.
- `bare`: apenas o card do iframe, para páginas com cabeçalho próprio (`/contato`).

O `src`, os query params herdados da página, o tema via `postMessage` e o
auto-resize são idênticos nos dois casos.

## Formulários internos (bc-form)

Correção de contraste: os formulários `bc-form` foram desenhados para fundo
escuro (labels brancas). Dentro de `ProductFormSection` (card claro do DS) as
labels ficavam invisíveis.

Solução puramente visual: `ProductFormSection` aplica a classe
`bc-form-surface`, e `src/components/Forms/bc-form.css` recebeu um tema claro
escopado nessa classe:

- labels e textos com `--text-primary` / `--text-secondary`;
- inputs com borda `--border-default`, hover `--border-strong`, foco em
  `--bc-primary` com anel de 3px;
- erro em `--error` (borda + texto + ícone), não apenas cor;
- `font-size: 16px` nos campos (evita zoom automático no iOS).

`/produtos/irec` passou a usar `ProductFormSection` no lugar de
`BcFormSection`, alinhando os cinco formulários de produto ao mesmo contêiner.

## Validação

- `tsgo --noEmit`: 0 erros.
- H1 único em `/contato`.
- Iframe do simulador carregando e redimensionando normalmente.
