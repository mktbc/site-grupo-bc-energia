import { buttonStyles } from '@/components/Button/Button.style'
import Card from '@/components/Card/Card'
import Link from '@/components/Link'

export type ContentCtaProps = {
  heading?: string
  description?: string
  label: string
  href: string
  /** Nome do CTA para o tracking central (data-cta-name). */
  ctaName?: string
  onClick?: () => void
}

/**
 * CTA contextual de fim de conteúdo.
 *
 * Discreto por decisão editorial: conteúdo educa, não captura. É um bloco
 * único, no fim da leitura, com rótulo definido pelo cluster do conteúdo —
 * nunca o mesmo CTA comercial repetido em todas as seções.
 */
const ContentCta = ({
  heading = 'Próximo passo',
  description,
  label,
  href,
  ctaName,
  onClick
}: ContentCtaProps) => (
  <div data-cta-location="content_section" className="mt-7">
    <Card variant="muted" padding="lg" className="items-start gap-4">
      <h2 className="t-h4 text-text-primary">{heading}</h2>
      {description ? <p className="t-body text-text-secondary">{description}</p> : null}
      <Link
        href={href}
        className={buttonStyles({ variant: 'primary', size: 'md' })}
        data-cta-name={ctaName}
        onClick={onClick}
      >
        {label}
      </Link>
    </Card>
  </div>
)

export default ContentCta
