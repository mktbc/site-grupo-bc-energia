import { ReactNode } from 'react'

import SectionHeader from '@/components/SectionHeader/SectionHeader'

import InstitutionalSection, { type InstitutionalSectionTone } from './InstitutionalSection'

export type InstitutionalGalleryItem = {
  id: string
  title: string
  image: string
  location?: string
  /** Linhas técnicas já existentes (rótulo: valor). */
  specs?: Array<{ label: string; value: string }>
}

export type InstitutionalGalleryProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  items: Array<InstitutionalGalleryItem>
  tone?: InstitutionalSectionTone
  id?: string
  children?: ReactNode
}

/**
 * Galeria editorial de estrutura (usinas): grid de cards com imagem, título
 * em H3 e ficha técnica. Sem carousel automático.
 */
const InstitutionalGallery = ({
  eyebrow,
  title,
  description,
  items,
  tone = 'muted',
  id,
  children
}: InstitutionalGalleryProps) => (
  <InstitutionalSection tone={tone} id={id}>
    <SectionHeader eyebrow={eyebrow} title={title} description={description} />
    {children}

    <ul className="mt-7 grid grid-cols-1 gap-8 sm:grid-cols-2">
      {items.slice(0, 3).map((item, index) => (
        <li key={item.id} className={index === 0 ? 'flex sm:col-span-2' : 'flex'}>
          <article className="flex w-full flex-col overflow-hidden rounded-[8px] bg-surface">
            <img
              src={item.image}
              alt={`Vista da usina do ${item.title}`}
              width={index === 0 ? 1600 : 900}
              height={index === 0 ? 900 : 563}
              sizes={index === 0 ? '100vw' : '(max-width: 640px) 100vw, 50vw'}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="bc-fmt-landscape"
            />

            <div className="flex flex-1 flex-col gap-3 p-6">
              <h3 className="t-h4 text-text-primary">{item.title}</h3>

              {item.location ? (
                <p className="t-eyebrow text-bc-primary">{item.location}</p>
              ) : null}

              {item.specs?.length ? (
                <dl className="mt-1 flex flex-col gap-1.5 t-body-sm text-text-secondary">
                  {item.specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between gap-4">
                      <dt>{spec.label}</dt>
                      <dd className="text-right font-semibold text-text-primary">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          </article>
        </li>
      ))}
    </ul>
  </InstitutionalSection>
)

export default InstitutionalGallery
