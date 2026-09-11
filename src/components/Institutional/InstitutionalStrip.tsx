import InstitutionalSection, { type InstitutionalSectionTone } from './InstitutionalSection'

export type InstitutionalStripItem = {
  src: string
  alt: string
  caption?: string
}

export type InstitutionalStripProps = {
  items: Array<InstitutionalStripItem>
  tone?: InstitutionalSectionTone
  id?: string
  /** Rótulo acessível da faixa de imagens. */
  label: string
}

/**
 * Faixa editorial de imagens reais — até 3 fotos em 16:10.
 *
 * Desktop: 3 colunas iguais. Mobile: a primeira em largura total e as outras
 * duas lado a lado. Antes, a primeira ocupava o container inteiro em 16:9
 * (~1.200px de seção) e no mobile todas iam para 4:5; as fotos das usinas
 * têm 500–900px de largura e ficavam ampliadas e borradas.
 */
const InstitutionalStrip = ({ items, tone = 'soft', id, label }: InstitutionalStripProps) => {
  const photos = items.slice(0, 3)

  if (!photos.length) return null

  return (
    <InstitutionalSection tone={tone} id={id}>
      <ul aria-label={label} className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:gap-4 lg:grid-cols-3 lg:gap-5">
        {photos.map((item, index) => (
          <li key={item.src} className={index === 0 ? 'col-span-2 lg:col-span-1' : undefined}>
            <figure className="m-0">
              <img
                src={item.src}
                alt={item.alt}
                width={900}
                height={563}
                sizes={index === 0 ? '(min-width: 1024px) 33vw, 100vw' : '(min-width: 1024px) 33vw, 50vw'}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full rounded-[var(--bc-radius-media-lg)] object-cover"
              />
              {item.caption ? (
                <figcaption className="mt-2 t-body-sm leading-snug text-text-secondary">
                  {item.caption}
                </figcaption>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>
    </InstitutionalSection>
  )
}

export default InstitutionalStrip
