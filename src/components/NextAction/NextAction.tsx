import Link from '@/components/Link'
import Container from '@/components/Container/Container'
import { trackNextAction } from '@/lib/analytics'

export type NextActionProps = {
  /** Frase curta de apoio (opcional). Ex.: "Ainda está avaliando?" */
  prompt?: string
  /** Âncora sempre descritiva — nunca "saiba mais". */
  label: string
  href: string
  /** Nível de intenção: define apenas a cor do link, nunca um botão. */
  intent?: 'baixa' | 'media' | 'alta'
  /** Identificador do clique no data layer. */
  tracking: string
  /** Envolve em Container quando usado como faixa entre seções. */
  standalone?: boolean
  className?: string
}

const INTENT_CLASS: Record<NonNullable<NextActionProps['intent']>, string> = {
  baixa: 'text-bc-primary hover:text-bc-dark',
  media: 'text-bc-primary hover:text-bc-dark',
  alta: 'text-bc-dark hover:text-bc-primary'
}

/**
 * Próxima ação natural ao fim de uma seção.
 *
 * Nunca é botão: é link textual com seta discreta (hover: cor + translateX de
 * 3px em 200ms). O botão continua reservado ao CTA principal da página, para
 * a leitura não virar uma sequência de blocos de conversão.
 */
const NextAction = ({
  prompt,
  label,
  href,
  intent = 'baixa',
  tracking,
  standalone = false,
  className = ''
}: NextActionProps) => {
  const content = (
    <div className={standalone ? '' : className}>
      {prompt ? <p className="font-sans t-body-sm text-text-secondary">{prompt}</p> : null}
      <Link
        href={href}
        data-cta-name={tracking}
        onClick={() => trackNextAction({ action_name: tracking, destination: href })}
        className={`group mt-2 inline-flex min-h-[44px] items-center gap-2 t-action-label transition-colors duration-200 ease-bc focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 motion-reduce:transition-none ${INTENT_CLASS[intent]}`}
      >
        <span className="underline-offset-4 group-hover:underline">{label}</span>
        <span
          aria-hidden="true"
          className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
        >
          →
        </span>
      </Link>
    </div>
  )

  if (!standalone) return content

  return (
    <div className={`bg-surface-subtle py-7 lg:py-8 ${className}`}>
      <Container>{content}</Container>
    </div>
  )
}

export default NextAction
