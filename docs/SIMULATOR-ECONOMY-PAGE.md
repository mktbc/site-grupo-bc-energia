# SIMULADOR 01 — Simulador de Economia de Energia

## Rota

| Item | Valor |
| --- | --- |
| Rota | `/simulador-de-economia` |
| Robots (produção) | `noindex,follow` (via `NOINDEX_ROUTES`) |
| Robots (preview/dev) | `noindex,nofollow` (bloqueio de ambiente já existente) |
| Canonical | `https://grupobcenergia.com.br/simulador-de-economia` |
| Sitemap | fora (33 URLs indexáveis mantidas) |
| Prerender | não (rotas noindex não são pré-renderizadas) |
| Carregamento | `React.lazy` em `src/App.tsx` (chunk próprio) |

## Fórmula

```
economiaMes = Math.round(valorConta * descontoEstado)
```

Faixa da conta: mínimo R$ 800, máximo R$ 5.000, step R$ 100, default R$ 1.200.

## Estados e percentuais

| Estado | Percentual exibido |
| --- | --- |
| Goiás | até 25% |
| Tocantins | até 23% |
| Paraná | até 22% |
| Minas Gerais | até 18% |
| Mato Grosso | até 18% |

Todos os percentuais são apresentados sempre como estimativa ("até X%"),
nunca como economia garantida. Nenhum estado fora da cobertura comercial
(GO, TO, MT, MG, PR) foi incluído.

## Validação matemática (browser)

| Estado | Conta | Economia exibida |
| --- | --- | --- |
| Goiás | R$ 800 | R$ 200 |
| Goiás | R$ 1.200 | R$ 300 |
| Goiás | R$ 5.000 | R$ 1.250 |
| Tocantins | R$ 1.200 | R$ 276 |
| Paraná | R$ 1.200 | R$ 264 |
| Minas Gerais | R$ 1.200 | R$ 216 |
| Mato Grosso | R$ 1.200 | R$ 216 |

Formatação BRL via `toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })`
sem casas decimais.

## UI e Design System

- Card principal: `bg-surface-brand`, `rounded-xl`, `shadow-md` (sem gradiente novo).
- Estado selecionado: `bg-bc-yellow` + `text-bc-dark`; não selecionado: `bg-white/10`
  com borda `white/40`.
- Resultado: `text-bc-yellow`, tamanho responsivo com `clamp(2.75rem, 11vw, 4.5rem)`.
- Nota de transparência: componente `Alert` (variant `info`), texto comercial preservado.
- Seções da página: `ProductSection`, `SectionHeader`, `ProductSteps`, `PageHeader`.
- Auditoria de Design System: **0 ERROR, 0 WARNING** (apenas INFO de largura
  interna `max-w-[880px]/[680px]`, padrão já usado no projeto).

## Formulário

- Componente reutilizado: `FormEmbed` (`variant="bare"`), o mesmo de `/contato`.
- Campos alterados: não. Payload alterado: não. Integração alterada: não.
- Seção `#lead-form` com `SectionHeader` de contexto ("Análise personalizada").
- Oportunidade futura (não implementada, exigiria mudança de integração):
  enviar `estado_simulado`, `valor_conta_simulado`, `percentual_estimado` e
  `economia_estimada` ao formulário.

## Tracking

Eventos emitidos pelo helper existente (`src/lib/analytics`), sem alteração de GTM:

| Evento | Quando | Parâmetros |
| --- | --- | --- |
| `simulator_view` | montagem do simulador | `source: simulador` |
| `simulator_state_select` | clique em estado | `state`, `discount_percent` |
| `simulator_value_change` | slider, com debounce de 600 ms | `value_range` (faixa, nunca o valor exato) |
| `simulator_cta_click` | CTA do simulador | `cta_location: simulator`, `source: simulador`, `destination: lead-form` |

Nenhum evento carrega PII. O valor da conta é enviado apenas como faixa
(`800-1199`, `1200-1999`, `2000-3499`, `3500-5000`).

## Acessibilidade

- 1 H1 por página (PageHeader).
- Estados: `button` + `aria-pressed`, altura mínima 44px, foco visível.
- Slider: `<input type="range">` nativo, `aria-label`, `aria-valuetext` com o
  valor e a economia estimada, navegação por teclado nativa.
- **Decisão sobre live region:** o resultado NÃO usa `aria-live`. Cada passo do
  slider (R$ 100) geraria um anúncio, criando ruído. O leitor de tela recebe a
  informação pelo `aria-valuetext` do próprio slider.
- Sem animação numérica: atualização instantânea.

## Responsividade

Validado em 360, 390, 768, 1024, 1280 e 1440: **0 overflow horizontal** em todos
os breakpoints. Tabela com `table-fixed` e quebra do cabeçalho no mobile, sem
ocultar informação. CTA full-width dentro do card de resultado.

## Performance

| Métrica | Antes | Depois |
| --- | --- | --- |
| JS inicial Home (gzip) | 151,2 KB | 151,5 KB |
| Maior chunk (gzip) | 70,2 KB (warning de budget de 70 KB, no limite) | 70,2 KB |
| Bibliotecas novas | — | nenhuma |

O simulador não é importado pela Home; carrega apenas no chunk da rota.
`lucide-react` não existe no projeto, então a nota usa o `Alert` do Design
System em vez de ícone externo (nenhuma dependência adicionada).

## Pendências

- Decisão de indexação (`noindex` → `index`) após validação comercial.
- FAQ não criada: não há perguntas e respostas reais reutilizáveis para esta
  página nesta etapa. Sem FAQ, sem `FAQPage`.
- Passagem dos dados do simulador para o formulário (depende de integração).
- Warning pré-existente de budget: maior chunk em 70,2 KB gzip.
