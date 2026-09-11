# Mapa de perguntas por cluster

Ferramenta interna de arquitetura de conteúdo. Serve para decidir **onde** uma
pergunta é respondida antes de criar qualquer URL nova.

Regras aplicadas:

- Nenhuma resposta usa número, prazo ou condição que não exista no conteúdo publicado.
- Quando a resposta depende de região, distribuidora, perfil de consumo ou contrato, isso é dito no texto.
- Toda resposta é autossuficiente e tem um próximo passo depois — nunca antes.
- Pergunta só vira página nova quando tem intenção própria, profundidade e valor editorial.

## Camadas de conteúdo por página estratégica

```text
Resposta rápida  →  Explicação  →  Detalhes  →  Conteúdo relacionado  →  Próximo passo
```

Implementação: bloco "respostas rápidas" logo após a apresentação da solução
(`src/components/QuickAnswers`, conteúdo em `src/data/quickAnswers.ts`), seguido
pelas seções editoriais já existentes, conteúdo contextual e conversão.

## Cluster — Energia por assinatura / Geração Distribuída

| Pergunta | Intenção | Página que responde | Status | Pilar | Próximo passo |
| --- | --- | --- | --- | --- | --- |
| O que é energia por assinatura? | Informacional | /produtos/consorcio-bc-energia | Publicado | Consórcio BC Energia | Simulador |
| Preciso instalar placas solares? | Informacional/comercial | /produtos/consorcio-bc-energia | Publicado | Consórcio BC Energia | Simulador |
| Quem pode contratar? | Comercial | /produtos/consorcio-bc-energia | Publicado | Consórcio BC Energia | Simulador |
| Quanto posso economizar? | Comercial | /produtos/consorcio-bc-energia | Publicado (com critérios) | Consórcio BC Energia | Simulador |
| Existe taxa de adesão ou fidelidade? | Comercial | /produtos/consorcio-bc-energia | Publicado | Consórcio BC Energia | Contato |
| Onde está disponível? | Comercial/local | Páginas regionais | Parcial — depende de validação por distribuidora | Consórcio BC Energia | Simulador |
| Como funciona o faturamento? | Informacional | — | Backlog | Consórcio BC Energia | — |

## Cluster — Mercado Livre de Energia

| Pergunta | Intenção | Página que responde | Status | Pilar | Próximo passo |
| --- | --- | --- | --- | --- | --- |
| O que é o Mercado Livre de Energia? | Informacional | /produtos/mercado-livre-de-energia | Publicado | Mercado Livre | Análise de conta |
| Quem pode migrar? | Comercial | /produtos/mercado-livre-de-energia | Publicado | Mercado Livre | Análise de conta |
| Qual a diferença para o mercado regulado? | Informacional | /produtos/mercado-livre-de-energia | Publicado | Mercado Livre | Como funciona |
| Quais são as etapas da migração? | Comercial | /produtos/mercado-livre-de-energia | Publicado | Mercado Livre | Análise de conta |
| Quanto tempo leva? | Comercial | /produtos/mercado-livre-de-energia | Publicado como critério (sem prazo fixo) | Mercado Livre | Análise de conta |
| Como fica a gestão depois da migração? | Comercial | /produtos/gestao-de-energia | Publicado | Mercado Livre | Gestão de Energia |
| Quais riscos e responsabilidades existem? | Informacional | — | Backlog editorial | Mercado Livre | — |

## Cluster — Gestão de Energia

| Pergunta | Intenção | Página que responde | Status | Pilar | Próximo passo |
| --- | --- | --- | --- | --- | --- |
| O que é gestão de energia? | Informacional | /produtos/gestao-de-energia | Publicado | Gestão de Energia | Contato |
| Quem precisa? | Comercial | /produtos/gestao-de-energia | Publicado | Gestão de Energia | Contato |
| O que é analisado? | Informacional | /produtos/gestao-de-energia | Publicado | Gestão de Energia | Contato |
| O que é demanda contratada? | Informacional | /produtos/gestao-de-energia (definição curta) | Publicado — merece guia próprio | Gestão de Energia | Backlog: guia dedicado |
| Como melhorar previsibilidade? | Comercial | /produtos/gestao-de-energia | Publicado | Gestão de Energia | Mercado Livre |

## Cluster — Certificação Renovável I-REC

| Pergunta | Intenção | Página que responde | Status | Pilar | Próximo passo |
| --- | --- | --- | --- | --- | --- |
| O que é o I-REC? | Informacional | /produtos/certificacao-renovavel-irec | Publicado | I-REC | Contato |
| O que o certificado comprova? | Informacional | /produtos/certificacao-renovavel-irec | Publicado | I-REC | Contato |
| Quem utiliza? | Comercial | /produtos/certificacao-renovavel-irec | Publicado | I-REC | Contato |
| Como funciona a certificação? | Informacional | /produtos/certificacao-renovavel-irec | Publicado | I-REC | Nossas usinas |

## Cluster — Arrendamento de usinas

| Pergunta | Intenção | Página que responde | Status | Pilar | Próximo passo |
| --- | --- | --- | --- | --- | --- |
| O que é o arrendamento? | Informacional | /produtos/arrendamento-de-usinas | Publicado | Arrendamento | Contato |
| Para quem faz sentido? | Comercial | /produtos/arrendamento-de-usinas | Publicado | Arrendamento | Contato |
| O que fica sob responsabilidade do grupo? | Comercial | /produtos/arrendamento-de-usinas | Publicado | Arrendamento | Contato |

## Backlog (qualidade antes de volume)

Só entram no site com informação validada internamente:

1. Como funciona o faturamento na energia por assinatura (fatura da distribuidora + fatura do desconto).
2. Riscos e responsabilidades do consumidor no Ambiente de Contratação Livre.
3. Guia dedicado sobre demanda contratada.
4. Comparativos úteis: energia por assinatura vs. instalação solar própria; Mercado Livre vs. mercado regulado.
5. Disponibilidade por região com base em distribuidora validada.
6. Datas de publicação/atualização e autoria real nos conteúdos técnicos.

## O que foi deliberadamente evitado

- `llms.txt` e arquivos "para IA".
- Schema para informação que não existe como texto visível.
- FAQ inflada: perguntas já respondidas no bloco rápido foram removidas da FAQ da mesma página, para não repetir a mesma dúvida duas vezes.
- Páginas novas para cada pergunta.
