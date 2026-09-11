# Editorial Energy Premium — conceito, decisões e pendências

Registro vivo da evolução visual do site do Grupo BC Energia. Atualize a cada
etapa relevante (o que mudou, por quê, o que está pendente).

## Conceito

Autoridade institucional + energia + clareza comercial + sofisticação.
Percepção-alvo: "Essa empresa é grande, confiável, moderna e domina o assunto."
A sofisticação vem de tipografia, fotografia, proporção, composição, cor,
hierarquia e profundidade controlada — não de efeitos.

Fontes de verdade: Manual de Marca Rev. 01, relatório visual/técnico (46 rotas),
`docs/DESIGN-SYSTEM.md`, código atual e conteúdo aprovado.

## Regras de sistema já aplicadas

| Tema | Regra |
|---|---|
| Cor | Navy `#242F40` estrutura; verde `#18857D` institucional; turquesa `#24D2C8` informação; amarelo `#F1C035` só em CTA, número principal e destaque pontual |
| Tipografia | Barlow Condensed em H1–H3, headlines e métricas; Onest em texto, UI e botões |
| Escala | H1 hero ≤ 64px; H2 de seção ≤ 48px (`t-h2-lead`); H2 nunca usa `t-h1` |
| Superfícies | Painel translúcido (`media-panel`) só sobre fotografia protagonista; cards comuns sólidos |
| Movimento | Hover de elevação apenas em elementos clicáveis |
| Ruído | Sem filetes, cantoneiras ou linhas quando espaço + tipografia já organizam |
| Métricas | Número → rótulo → explicação; `<dl>` válido; nenhum número novo sem fonte |
| Tracking | `data-cta-name` existentes preservados; novos seguem o padrão da seção |

## Home — narrativa (implementada)

1. Hero → 2. Vitrine de soluções → 3. Como ajudamos → 4. Resultados →
5. Segmentos → 6. Presença regional → 7. Estrutura própria → 8. Conteúdo/BC Cast →
9. FAQ → 10. Institucional → 11. CTA final → Footer.

### Vitrine
- Protagonista: **Consórcio BC Energia** (geração distribuída por assinatura —
  núcleo comercial). Foto `consorcio-intro`, painel translúcido, "Até 25%",
  CTA "Fazer adesão gratuita" (App Energia) + "Como funciona o Consórcio".
- Destaque: **Mercado Livre de Energia** (empresas em alta tensão, conta a partir de R$ 10 mil).
- Complementares: Gestão de Energia, Certificação I-REC, Arrendamento de Usinas.
- Externo: Consultoria Jurídica (BC Energia Direito).
- Assets descartados: `gestao-de-energia-intro.webp` e
  `mercado-livre-de-energia-intro.webp` têm texto embutido (um diz "até 26%").

### Histórico de decisão
- v1 (11/09): Mercado Livre como protagonista (1º item do hub e slide 1 do hero).
  Aplicada no Lovable pelo agente (commit `cc27f0d`), seguida da correção de
  slider do próprio Lovable (`9508940`: bullets a 32/24px, slides de altura igual).
- v2 (11/09): invertido para Consórcio após orientação de que o protagonista
  deve seguir prioridade comercial, não a ordem do código. **Não está no Lovable.**

## Conflitos de conteúdo — decidir antes de publicar

| # | Conflito | Onde | Status |
|---|---|---|---|
| C1 | Limiar do Consórcio: R$ 250 (site) vs R$ 300 (campanhas) | `consorcio-bc-energia/data.tsx`, `quickAnswers.ts` | Omitido na vitrine até decisão |
| C2 | "até 25% **ao mês**" vs "até 25% **por ano**" no mesmo produto | Consórcio, quickAnswers, artigos, hero | **RESOLVIDO** — padrão aprovado: "Até 25% de economia na conta de energia" / "Até 25% de economia" |
| C3 | "mais de 100 usinas" (Consórcio) vs "14 complexos de geração" (Home/Usinas) | `consorcio-bc-energia/data.tsx`, `data/powerPlants.ts` | Pode ser usinas ≠ complexos; confirmar |
| C4 | Estados: site cita GO, TO, MT, MG, PR e DF; materiais de campanha citam SP e não DF | `data/coverage.ts` | Confirmar cobertura atual |
| C5 | Slide 1 do hero (H1) é Mercado Livre, vitrine prioriza Consórcio | `Sliders.data.tsx` | Trocar a ordem muda o H1 (SEO) — decidir |
| C6 | URL do App Energia em `http://` em alguns pontos e `https://` em outros | `Sliders.data.tsx`, `solutions.data.ts` | Técnico, baixo risco; padronizar em https |
| C7 | 25% "sobre a parcela de energia da fatura" (FAQ rápido) vs "na conta de energia" (demais textos) | `quickAnswers.ts` | Qualificador preservado no FAQ — confirmar se o 25% incide sobre a conta total ou só sobre a parcela de energia |
| C8 | Gestão de Energia cita "Até 25% nas despesas com conta e consumo" | `gestao-de-energia/page.tsx` | Claim de outro produto, fora do C2 — confirmar se é vigente |

### Regra C2 (aprovada em 11/09/2026)
O 25% é a economia/desconto aplicado à conta de energia — não é taxa mensal nem
anual. Usar somente "Até 25% de economia na conta de energia" ou, em espaço
curto, "Até 25% de economia". Nunca "ao mês", "por ano", "mensal", "anual".
Rótulos de métrica curtos ("Até 25%" + legenda "de economia…") são aceitos.

## Bloco Produtos (11/09, após o ZIP consolidado)

| Item | Mudança | Alcance |
|---|---|---|
| S1 | Numerais 01–04 dos passos: 44px teal 45% → marcador de 18px | ProductSteps/ProductProcess — produtos, segmentos, regionais, simulador |
| S3 | Hero interno: `lg:pt-44/pb-28` → `lg:pt-36/pb-20`, min-height 680→600px; H1 com teto de 64px; círculo decorativo removido | PageHeader — 38 rotas |
| S7 | `/produtos`: destaque amarelo só em "perfil de consumo"; eyebrow duplicado removido | /produtos |
| Hub | Protagonista do portfólio = Consórcio (mesma prioridade da Home) | /produtos |
| Espaço | Grade de logos: 104px → 72px de padding | Customers (3 páginas) |
| Cauda | Mercado Livre: formulário logo após o FAQ; bloco "Entenda melhor este tema" duplicado removido em Mercado Livre e Consórcio; `/conteudo/blog` movido para "Próximos passos" (nenhum destino perdido) | 2 páginas de produto |

## Bloco Segmentos (11/09)

| Item | Mudança | Alcance |
|---|---|---|
| Vitrine do hub | Proporção única 4:3/16:10 (antes 4:5 no desktop, ~850px de foto); `object-position` por segmento | /segmentos |
| Foto Saúde | `saude-v2` tinha marca d'água "MOCKUP/LOGO" → `saude.webp` | /segmentos |
| Hero do hub | Menos padding, H1 em 3 linhas; CTA "Ver todos" agora leva ao índice de 11 (antes caía na vitrine de 5) | /segmentos |
| Hero dos segmentos em split | Foto própria (antes 4 páginas com a mesma usina); intro tipográfica quando a foto se repetiria | 4 segmentos |
| Desafios × Benefícios | Desafios tipográfico sem filetes; Benefícios em cards de superfície | 11 segmentos |
| Divisores | Prova, faixa de logos e NextAction sem filetes redundantes (~10 a menos por página) | 11 segmentos + NextAction em produtos |

## Bloco Sobre + Nossas Usinas (11/09)

| Item | Mudança | Alcance |
|---|---|---|
| "Fechamento" de 708px (quem-somos) | Era a grade de 21 logos (`Customers`), não o CTA: 7 linhas no mobile (antes 11), 3–4 no desktop | Customers — produtos, quem-somos, nossas-usinas |
| Registro fotográfico (1.200px) | 3 fotos 16:10 na escala real dos arquivos; fotos mais nítidas + CGH hidrelétrica | InstitutionalStrip — nossas-usinas |
| Hero Nossas Usinas | `nossas-usinas.webp` (usina própria) no lugar da foto compartilhada | nossas-usinas |
| Estrutura (quem-somos) | Texto 7/12 + vídeo vertical 5/12 (antes vídeo de 320px numa coluna vazia de 7/12) | quem-somos |
| /sobre | Sem alteração (aprovada no relatório) | — |

Assets com problema mantidos em `public/`, sem exibição: `saude-v2.webp` (marca d'água
"MOCKUP"), `gestao-de-energia-intro.webp` ("até 26%" embutido — referência trocada por
`gestao-de-energia-lead.webp`) e `mercado-livre-de-energia-intro.webp` (texto embutido; só
referenciado em `solutions.data.ts`, arquivo sem importação).

## Bloco Conteúdo / Blog + BC Cast (11/09)

| Item | Mudança | Alcance |
|---|---|---|
| Artigo longo | Sumário gerado dos H2 reais (+ FAQ): recolhível abaixo de lg, lateral sticky no desktop; ids estáveis + `scroll-mt-28` | template de artigo |
| Ritmo do corpo | 24px entre blocos, respiro maior antes de H2 | ContentBody — artigos e transcrições de episódios |
| Hero do artigo | Foto por cluster (GD → `energia-por-assinatura.webp`) no lugar da foto de contato | template de artigo |
| Hub /conteudo | Sem eyebrow duplicado; Blog e BC Cast com descrição já publicada | /conteudo |
| BC Cast | Macrobloco escuro (como documentado) — mídia × leitura | /conteudo/bc-cast |

Regra de ids: `block.id` nos dados tem prioridade; sem ele, o id vem do texto do heading.
Editar o texto de um H2 muda a âncora — para links externos permanentes, fixe `id` no dado.

Assets sem uso e inadequados em `public/img/components/bc-cast/`: `cast-1..5` são fotos
genéricas (não do BC Cast); `cast-3` e `cast-5` mostram geração eólica, que o grupo não opera;
`cast-1` duplica `energia-por-assinatura.webp`. `contact.webp` (897×750) é hero de 7 páginas.

## Bloco Contato + Simulador (11/09)

| Item | Mudança | Alcance |
|---|---|---|
| Hero /contato e /contato/enviado | `gestao-de-energia-hero.webp` (1920×705, especialistas) no lugar de `contact.webp` (897×750, usina aérea) | 2 páginas |
| /contato | Passos com marcador 01–03; cards estáticos sem hover de elevação e sem filete lateral | /contato |
| /contato/enviado | Página legada (176px de padding, H1 "Contato", sem próximo passo) → cabeçalho compacto com a confirmação como H1 e 2 próximos passos | /contato/enviado |
| Simulador #lead-form | Cabeçalho 5/12 + formulário 7/12 no desktop (antes empilhado, ~956px) | /simulador-de-economia |
| FormEmbed | Altura inicial 400px (sem salto de 150px); variante `section` sem círculos/filete decorativos | 6 páginas |

`contact.webp` continua como hero de Conteúdo, Blog, BC Cast e episódio (ver bloco Conteúdo).

## Bloco Regionais (11/09)

| Item | Mudança | Alcance |
|---|---|---|
| Divisores (S4) | Todos os decorativos removidos de `components/Regional`; restam só os funcionais (linhas do FAQ e de links relacionados) | 7 regionais |
| Território | Card de superfície; nome do lugar `t-h1` → `t-h2-lead` | 7 regionais |
| Soluções / Diferenciais / Perfis | Solução indicada em card; Diferenciais em cards; Perfis como lista com check em 2 colunas | 7 regionais |
| Hero Rio Verde / Palmas | Retratos de ~500px ampliados ~4× → `agronegocio-hero.webp` / `energia-por-assinatura.webp` | 2 regionais |

Pendência: Aparecida de Goiânia e Trindade usam a mesma foto aérea (`FOTO_BANNER_02` e a versão
tingida `FOTO_BANNER_023`).

## Fechamento técnico (11/09)

| Item | Mudança |
|---|---|
| S6 | Token `--bc-yellow`/`--bc-accent` = `44.4 87% 57.6%` (#F1C035 exato; o valor anterior arredondava para #F1BF37). Hover do botão primário, tema/foco do carrossel e foco do rodapé saíram de `amber-*` para o token |
| S5 | Links do rodapé 44px sem mudar o ritmo (gap zerado); links legais 44px; breadcrumbs com 44px de área e margem negativa |
| Formulários | Mensagem de erro de envio em `text-yellow-300` sobre fundo claro (ilegível) → `text-error` + `role="alert"` |

## Próximas etapas (relatório visual)
- Todas as correções sistêmicas do relatório (S1–S7) foram aplicadas. Pendências agora são de
  conteúdo e fotografia (ver HANDOFF, seção "Decisões humanas pendentes").
