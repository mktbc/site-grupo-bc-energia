import { EditorialIndex } from '@/components/Editorial'

import RegionalSection, { type RegionalSectionTone } from './RegionalSection'

export type RegionalAudienceProps = {
  eyebrow?: string
  title: string
  description?: string
  /** Perfis atendidos — frases já publicadas na página regional. */
  items: Array<string>
  tone?: RegionalSectionTone
  id?: string
}

/**
 * VISUAL 13 — perfis atendidos como lista editorial numerada.
 *
 * Sem card, sem grade pesada e sem ícones decorativos. Os perfis são
 * exatamente os publicados nos dados da rota.
 */
const RegionalAudience = ({
  eyebrow = 'Perfis atendidos',
  title,
  description,
  items,
  tone = 'surface',
  id
}: RegionalAudienceProps) => {
  if (!items?.length) return null

  return (
    <RegionalSection tone={tone} id={id}>
      <EditorialIndex eyebrow={eyebrow} title={title} description={description}>

        <ul className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bc-primary/10 text-bc-primary"
              >
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10.5 8 14.5 16 6" />
                </svg>
              </span>
              <p className="t-body-sm text-text-primary">{item}</p>
            </li>
          ))}
        </ul>
      </EditorialIndex>
    </RegionalSection>
  )
}

export default RegionalAudience
