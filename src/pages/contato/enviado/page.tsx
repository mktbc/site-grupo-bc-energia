import { PageHeader } from '@/components'

/**
 * /contato/enviado — confirmação de envio (pageType 'success' no tracking).
 *
 * Antes: hero centralizado legado (Section `first`, 176px de padding no topo)
 * com H1 "Contato", mensagem como H2 numa segunda seção e nenhum próximo
 * passo. Agora: um único cabeçalho compacto, no mesmo sistema de /contato,
 * com a mensagem de confirmação como H1 e dois próximos passos para páginas
 * que já existem. Texto da confirmação preservado. Fora do sitemap.
 */
const ContatoEnviado = () => (
  <div>
    <PageHeader
      align="left"
      compact
      flush
      eyebrowRule={false}
      eyebrow="Mensagem recebida"
      title="Formulário enviado com sucesso!"
      description="Seus dados foram enviados e serão analisados pela nossa equipe o mais breve possível. Obrigado."
      bgImage="/img/pages/gestao-de-energia-hero.webp"
      category="Contato"
      cta={{ label: 'Simular minha economia', href: '/simulador-de-economia' }}
      secondaryCta={{ label: 'Conhecer nossas soluções', href: '/produtos' }}
    />
  </div>
)

export default ContatoEnviado
