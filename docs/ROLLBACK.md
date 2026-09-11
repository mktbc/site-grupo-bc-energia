# Plano de rollback

## Antes de publicar

1. Guardar o artefato do site atualmente em produção (pasta/deploy anterior).
2. Anotar o commit publicado e a versão do container GTM em uso.
3. Exportar o container GTM atual (Admin → Export Container) antes de publicar
   a nova versão.

## Gatilhos de rollback

- Queda de leads (formulários/WhatsApp) sem causa identificada em até 24h.
- Erro de JavaScript bloqueando renderização em qualquer rota principal.
- Perda em massa de indexação ou `noindex` servido em produção.
- Falha nas Edge Functions de formulário.

## Procedimento

1. **Site**: restaurar o deploy anterior (troca de artefato/rollback do provedor).
   Como o site é estático, o rollback é imediato e não envolve banco de dados.
2. **GTM**: no container, "Versions" → selecionar a versão anterior → *Publish*.
3. **Supabase**: nenhuma migração destrutiva foi feita nos Blocos 01–07; as Edge
   Functions e a tabela `app_config` permanecem compatíveis com as duas versões
   do site. Não é necessário rollback de banco.
4. **DNS**: se o cut-over envolveu troca de apontamento, reverter o registro e
   aguardar o TTL (manter TTL baixo — 300s — nas 48h anteriores ao go-live).

## Depois do rollback

- Registrar o motivo e o horário.
- Reproduzir o problema no ambiente duplicado (que permanece com `noindex`).
- Só reprogramar o cut-over após correção validada por novo QA.
