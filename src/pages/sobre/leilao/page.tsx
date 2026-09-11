import { InstitutionalProse, PageHeader } from '@/components'
import { BCIcon } from '@/components/BCIcon'
import Link from '@/components/Link'

/**
 * /sobre/leilao — página regulatória (noindex, follow).
 * Sem leilões disponíveis: mantém o aviso original em layout institucional.
 */
const Auction = () => (
  <div className="min-h-screen">
    <PageHeader
      align="left"
      compact
      flush
      eyebrowRule={false}
      eyebrow="Informação regulatória"
      title="Leilão"
      description="Avisos de leilões de energia promovidos pelo Grupo BC Energia."
      bgImage="/img/pages/contact.webp"
      category="Sobre"
    />

    <InstitutionalProse>
      <div className="flex items-start gap-4 rounded-card bg-surface-muted p-6">
        <BCIcon name="mercado-crescimento" size={36} className="shrink-0" />
        <p className="mt-0 font-semibold text-text-primary">
          Não temos leilões disponíveis no momento.
        </p>
      </div>

      <p>
        Enquanto isso, você pode conhecer as soluções do grupo para redução de custo com energia,
        como o{' '}
        <Link href="/produtos/mercado-livre-de-energia">Mercado Livre de Energia</Link>, o{' '}
        <Link href="/produtos/consorcio-bc-energia">Consórcio BC Energia</Link> e a{' '}
        <Link href="/produtos/gestao-de-energia">gestão de energia</Link>.
      </p>
    </InstitutionalProse>
  </div>
)

export default Auction
