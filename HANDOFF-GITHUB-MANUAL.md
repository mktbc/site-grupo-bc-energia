# HANDOFF — Entrega final consolidada para upload manual no GitHub

**Data da entrega:** 11/09/2026
**Repositório oficial de destino:** `git@github.com:mktbc/site-grupo-bc-energia.git`
**Pacote:** `bc-energia-site-github-ready.zip` — projeto completo, abre direto na raiz.
**Push realizado:** NÃO. **Upload manual necessário:** SIM.

---

## 1. Base e versão

| Item | Valor |
|---|---|
| Base original do export | Lovable `Marketing-BC` @ `7e977c3` |
| Última base Lovable conhecida | **`9508940`** ("Corrigiu slider desktop e mobile"), reproduzida localmente no commit `b58ac55` |
| Versão consolidada | Árvore local com todos os blocos abaixo (hashes locais — não existem no GitHub até o upload) |
| Relação com o Lovable | O Lovable **não** contém nada posterior a `9508940`. Se voltar a ser usado, deve partir do GitHub |

Arquivos em relação à base `7e977c3`: 56 alterados, 5 adicionados, 1 removido.
Em relação ao Lovable `9508940`: 50 alterados, 5 adicionados.

Adicionados: `CLAUDE.md`, `HANDOFF-GITHUB-MANUAL.md`, `docs/EDITORIAL-ENERGY-PREMIUM.md`,
`src/components/Content/ArticleToc.tsx`, `src/data/content/toc.ts`.
Removido: `src/pages/home/Sections/SolutionHighlight.tsx` (órfão).

---

## 2. Blocos concluídos

| Bloco | Principais mudanças |
|---|---|
| **Home** | Home-vitrine: Soluções logo após o hero; Consórcio BC Energia protagonista (foto, painel translúcido, "Até 25%", adesão), Mercado Livre em destaque, complementares em cards, Consultoria Jurídica como link externo; H2 de "Como ajudamos" fora da escala de H1; métricas número→rótulo→explicação com `<dl>` válido; hero com altura fluida e H1 ≤ 64px; ruído decorativo removido |
| **Produtos** | Hub `/produtos` com Consórcio como destaque; eyebrow duplicado removido; amarelo do hero só em "perfil de consumo"; Mercado Livre com formulário logo após o FAQ; bloco de links duplicado removido em Mercado Livre e Consórcio (nenhum destino perdido) |
| **Segmentos** | Vitrine do hub em proporção única (antes 4:5 no desktop, ~1.117px); CTA "Ver todos" leva ao índice de 11; hero próprio nos 4 segmentos em split (antes a mesma foto); Desafios tipográfico × Benefícios em cards; ~10 divisores a menos por página |
| **Sobre** | Sem alteração (aprovada no relatório) |
| **Quem Somos** | Grade de logos compacta (era o bloco de ~708px); seção Estrutura 7/12 + vídeo 5/12 |
| **Nossas Usinas** | Registro fotográfico em 3 fotos 16:10 com as mais nítidas (antes 16:9 esticado, ~1.200px); hero próprio |
| **Conteúdo / Blog** | Sumário do artigo gerado dos H2 reais (+FAQ), recolhível no mobile e sticky no desktop; ids estáveis + `scroll-mt`; ritmo do corpo mais compacto; hero temático do artigo; hub sem repetição e com descrição dos formatos |
| **BC Cast** | Macrobloco escuro (mídia × leitura), como documentado no componente |
| **Contato** | Hero em alta resolução; passos com marcador 01–03; cards estáticos sem hover |
| **Contato Enviado** | Página legada (176px de padding, H1 "Contato", sem próximo passo) → cabeçalho compacto com a confirmação como H1 e 2 próximos passos |
| **Simulador** | Formulário lado a lado no desktop (antes empilhado, ~956px); embed com altura inicial estável |
| **Regionais** | Todos os divisores decorativos removidos do template; território em card; nome do lugar fora da escala de H1; heros de Rio Verde e Palmas trocados (retratos de ~500px ampliados ~4×) |

### Correções sistêmicas do relatório

| # | Status | Onde |
|---|---|---|
| S1 — índices 01–04 grandes | Concluído | `ProductSteps`, `ProductProcess` |
| S2 — H2 competindo com H1 | Concluído na Home | `Positioning` |
| S3 — hero interno alto | Concluído | `PageHeader`, `.hero-title` |
| S4 — excesso de divisores | Concluído | Segmentos, Regionais, `NextAction` |
| S5 — alvos de toque < 44px | Concluído | Rodapé, breadcrumbs (menu mobile já atendia) |
| S6 — dois amarelos | Concluído | Token exato `44.4 87% 57.6%` = #F1C035 |
| S7 — amarelo excessivo no hero | Concluído em `/produtos` | `produtos/page.tsx` |

---

## 3. Componentes compartilhados alterados

`PageHeader`, `ProductSteps`, `ProductProcess`, `NextAction`, `Customers`, `FormEmbed`,
`Breadcrumbs`, `Footer`, `Button` (hover primário), `ContentBody`, `EditorialLayout`,
`SegmentChallenges`, `SegmentBenefits`, `SegmentProof`, `InstitutionalStrip`,
`components/Regional/*` (5 componentes), formulários `FormularioMercadoLivre`, `FormularioIREC`,
`FormularioParceiro` (somente cor e `role` da mensagem de erro).
Tokens: `--bc-yellow`, `--bc-accent`. CSS: `globals.css` (`.hero-title`), `carousel.css`.

---

## 4. Decisões

**Visuais**
- Painel translúcido só sobre fotografia protagonista; cards comuns sólidos; hover de elevação apenas em elementos clicáveis.
- Amarelo #F1C035 restrito a CTA, número principal e destaque pontual.
- H1 ≤ 64px em todo o site; H2 de seção ≤ 48px.
- Fotografia: nenhuma imagem nova; só assets existentes, priorizando resolução compatível com a área exibida.

**Comerciais**
- Consórcio BC Energia (geração distribuída por assinatura) é o protagonista na Home e no hub de Produtos, por prioridade comercial, não pela ordem do código.
- Nenhum produto, número, critério ou claim novo foi criado.

**Tracking**
- `data-cta-name` preservados. Removido: `home_como_ajudamos_produtos` (link redundante após a vitrine). Adicionados: "Fazer adesão gratuita" (vitrine da Home, mesmo rótulo do hero) e os CTAs da página de confirmação (rótulos "Simular minha economia" e "Conhecer nossas soluções", via `PageHeader`).
- O formulário do Mercado Livre mudou de posição na página: métricas de profundidade de rolagem até ele podem variar.

---

## 5. C2 — padronização do 25%

**Padronização aprovada: "Até 25% de economia na conta de energia" / "Até 25% de economia".**
O 25% é a economia aplicada à conta de energia, não taxa mensal ou anual.

Busca global final (11/09/2026), excluindo a documentação:

| Termo | Ocorrências |
|---|---|
| "25% ao mês", "25% por ano", "25% mensal", "25% anual", "25% ao ano", "25% por mês" | 0 |
| "desconto anual", "economia anual", "desconto mensal" | 0 |
| "economia mensal" | 3 — **mantidas** |

Mantidas, com motivo: `src/components/Simulator/Simulator.tsx`, `src/components/Simulator/simulator.data.ts` e
`src/pages/simulador-de-economia/page.tsx` — referem-se ao **valor em R$ estimado por mês** calculado pelo
simulador, não à taxa de 25%.
Correções feitas na consolidação anterior: 11 substituições em 5 arquivos (Consórcio page/data, quickAnswers,
artigo, hero slide 2).

---

## 6. Conflitos de conteúdo ainda abertos

| # | Conflito | Tratamento atual |
|---|---|---|
| C1 | Limiar do Consórcio: R$ 250 (site) × R$ 300 (campanhas) | Site mantém R$ 250 onde já existia; vitrine omite |
| C3 | "mais de 100 usinas" (Consórcio) × "14 complexos de geração" | Mantido; confirmar se usinas ≠ complexos |
| C4 | Estados: site cita DF e não SP; campanhas citam SP e não DF | Mantido |
| C5 | Slide 1 do hero (H1) é Mercado Livre; vitrine prioriza Consórcio | Mantido — trocar muda o H1 (SEO) |
| C6 | App Energia em `http://` e `https://` | Mantido; padronizar em https |
| C7 | 25% "sobre a parcela de energia da fatura" (FAQ) × "na conta de energia" | Qualificador preservado |
| C8 | Gestão de Energia: "Até 25% nas despesas com conta e consumo" | Outro produto; confirmar vigência |

---

## 7. Decisões humanas pendentes

- **Fotos:** usinas em alta resolução (12 de 14 têm só 500×300); fotos regionais próprias (Aparecida de Goiânia e Trindade usam a mesma foto aérea; Rio Verde reutiliza a foto do segmento Agronegócio); hero próprio de Quem Somos (hoje a mesma foto de `/sobre` e `/produtos`); foto real de atendimento para Contato (hoje a mesma do hero de Gestão de Energia); imagem/capa oficial do BC Cast; heros próprios para Conteúdo, Blog, BC Cast, Leilão e Fator de Alavancagem (hoje `contact.webp`, 897×750).
- **Teste real** de envio dos formulários (contato, simulador e formulários de produto) no navegador.
- **Âncoras do artigo** derivam do texto dos H2; para links externos permanentes, fixar `id` nos dados.
- **Conflitos C1, C3–C8** (seção 6).

---

## 8. Validações

**Executadas neste ambiente**

| Validação | Resultado |
|---|---|
| Bundle esbuild de `src/main.tsx` e `src/entry-server.tsx` (resolve todos os imports e aliases) | 0 erros, 0 avisos |
| Referências de assets em código, dados e `index.html` | 138 referências, 0 faltando; 21 logos de clientes, 0 faltando |
| Links internos para rotas | Nenhum link para rota inexistente |
| Âncoras novas | `#todos-os-segmentos` com alvo; ids do sumário gerados e testados (10 H2 únicos) |
| H1 | Componentes com `<h1>`: `PageHeader`, `SegmentsHero`, 404, hero da Home — um por página |
| `data-cta-name` (literais, base × atual) | 1 removido intencional, 1 adicionado (seção 4) |
| Regressão por inspeção (26 marcadores dos blocos) | 26/26 presentes |
| Busca global C2 | Seção 5 |
| Varredura de segurança | Seção 9 |
| Conferência do ZIP extraído | Idêntico à árvore consolidada |

**NÃO VALIDADO NESTE AMBIENTE** (sem `node_modules`; registro npm e GitHub bloqueados pela rede):
- TypeScript (`npm run typecheck`)
- ESLint (`npm run lint`)
- Build de produção com Vite + Tailwind + sitemap + prerender (`npm run build`)
- Validação visual e responsiva (1920/1440/1366/1024/768/390), overflow horizontal e console no navegador
- Envio real de formulários e funcionamento do embed do simulador

---

## 9. Segurança

| Item | Resultado |
|---|---|
| .git removido | SIM |
| .workspace removido | SIM (e `.workspace/` no `.gitignore`) |
| node_modules removido | SIM (não existe na árvore) |
| dist removido | SIM (não existe na árvore) |
| tokens encontrados | SIM — no export original do Lovable (`.workspace/.git/config`, token de acesso Git) |
| tokens removidos | SIM — o diretório nunca entrou na árvore consolidada |
| secrets identificados | NÃO — varredura por JWT, chaves privadas, tokens de GitHub/AWS/Stripe/Google/Slack, chave de serviço do Supabase, cabeçalhos de autorização e URLs com credencial: nenhum resultado |
| .env reais incluídos | NÃO — só `.env.example` (placeholders e links públicos); `.env` real ignorado no `.gitignore` |

Observação: `src/lib/supabase.ts` contém uma chave **publicável** do Supabase como fallback. É pública por design (vai ao navegador; proteção via RLS) e foi mantida para não quebrar formulários. Recomendado definir `VITE_SUPABASE_ANON_KEY` no ambiente de deploy.
**Ação recomendada:** o ZIP original do Lovable (`bc-energia-frontend-completo.zip`) contém o token — não compartilhe esse arquivo.

---

## 10. Assets problemáticos (mantidos em `public/`, sem exibição)

| Asset | Problema | Referências |
|---|---|---|
| `img/pages/segmentos/saude-v2.webp` | Marca d'água "MOCKUP/LOGO" | Apenas comentário — órfão |
| `img/pages/gestao-de-energia-intro.webp` (+`-600`) | Texto embutido "até 26%" | Apenas comentário — órfão |
| `img/pages/mercado-livre-de-energia-intro.webp` (+`-600`) | Texto embutido | Só em `solutions.data.ts`, arquivo não importado — efetivamente órfão |
| `img/components/bc-cast/cast-1..5` (.webp/.jpg) | Fotos genéricas; `cast-3` e `cast-5` mostram geração eólica (o grupo não opera); `cast-1` duplica outra foto | Nenhuma — órfãos |
| `img/pages/contact.webp` | 897×750, ampliada em heros largos | **Em uso** em 7 páginas |

Candidatos à remoção futura: todos os órfãos acima. Não removidos nesta entrega (sem limpeza destrutiva).
Também em `src/data/segments/*.json` há spans `text-amber-400` em um campo `title` que não é renderizado pelas páginas atuais (dados preservados).

---

## 11. Como subir manualmente no GitHub

1. **Veja o estado do repositório:** branch padrão, último commit e se ele já contém o projeto (ex.: `AGENTS.md` com bloco LOVABLE). Não sobrescreva nada sem comparar.
2. **Crie uma branch** pela interface (seletor de branch → `claude/editorial-energy-premium` → "Create branch").
3. **Envie o conteúdo do ZIP descompactado** para essa branch:
   - Repositório já com o projeto: prefira o editor web `github.dev` (tecla `.` no repositório) ou um Codespace — arraste a pasta inteira para o explorador, revise as diferenças na aba Source Control e faça o commit. A interface "Upload files" aceita no máximo 100 arquivos por envio.
   - Exclua `src/pages/home/Sections/SolutionHighlight.tsx` se existir no repositório.
   - Não envie o `.zip` compactado como arquivo, nem a pasta `.workspace` do export antigo.
4. **Sem force push**, sem apagar branches.
5. **Abra um Pull Request** para a branch padrão e revise o diff.
6. **Antes do merge (Codespace):** `npm install && npm run typecheck && npm run lint && npm run build` — é a primeira validação completa desta entrega. Depois, teste visual nos breakpoints e um envio real de formulário.

## 12. Como continuar

- Leia `CLAUDE.md` (regras de trabalho) e `docs/EDITORIAL-ENERGY-PREMIUM.md` (conceito, decisões por bloco e conflitos).
- Novas entregas por chat devem partir **do estado do GitHub** (enviar um ZIP atualizado do repositório), não do Lovable nem de ZIPs antigos.
- Próximos passos: validar build e visual desta entrega; decidir C1, C3–C8; produzir as fotos listadas na seção 7; remover os assets órfãos da seção 10.
