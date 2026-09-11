import { BCIcon } from '@/components/BCIcon'
import BrandGraphic from '@/components/BrandGraphic/BrandGraphic'
import Link from '@/components/Link'
import type { HubCardItem } from '@/config/navigation'

type Group = {
  title: string
  description?: string
  items: Array<HubCardItem>
}

type AboutTopicsProps = {
  id?: string
  eyebrow: string
  title: string
  description: string
  groups: Array<Group>
  legal: {
    title: string
    description: string
    items: Array<HubCardItem>
  }
}

/**
 * Card editorial do índice institucional: ícone em container suave,
 * título, descrição e seta à direita. Card inteiro clicável.
 */
const TopicItem = ({ item, ctaName }: { item: HubCardItem; ctaName: string }) => (
  <Link
    href={item.href}
    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    data-cta-name={ctaName}
    className={[
      'group flex min-h-[92px] items-start gap-4 rounded-[10px] border border-border-subtle bg-surface-card px-5 py-5 shadow-sm',
      'transition-[transform,colors,box-shadow] duration-200 ease-out',
      'hover:-translate-y-0.5 hover:border-bc-primary/25 hover:shadow-md',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
      'motion-reduce:transition-none motion-reduce:hover:transform-none'
    ].join(' ')}
  >
    {item.icon || item.iconSrc ? (
      <span
        aria-hidden="true"
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bc-primary/[0.07] text-bc-primary transition-colors duration-200 group-hover:bg-bc-primary/[0.12]"
      >
        {item.icon ? (
          <BCIcon name={item.icon} size={20} />
        ) : (
          <img src={item.iconSrc} alt="" aria-hidden="true" width={20} height={20} />
        )}
      </span>
    ) : null}

    <span className="min-w-0 flex-1">
      <span className="flex items-start justify-between gap-3">
        <span className="t-body-sm font-semibold text-text-primary transition-colors duration-200 group-hover:text-bc-primary">
          {item.title}
        </span>
        <span
          aria-hidden="true"
          className="shrink-0 text-bc-primary transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transform-none"
        >
          →
        </span>
      </span>
      {item.description ? (
        <span className="mt-1.5 block max-w-[46ch] t-body-sm leading-[1.5] text-text-secondary">
          {item.description}
        </span>
      ) : null}
    </span>
  </Link>
)

const GroupBlock = ({
  title,
  description,
  items,
  ctaPrefix
}: {
  title: string
  description?: string
  items: Array<HubCardItem>
  ctaPrefix: string
}) => (
  <div data-cta-location="hub_navigation">
    <span aria-hidden="true" className="mb-4 block h-[3px] w-8 rounded-full bg-bc-primary" />
    <h3 className="t-h4-display tracking-[0.02em] text-text-primary">
      {title}
    </h3>
    {description ? (
      <p className="mt-2 max-w-[62ch] t-body-sm leading-[1.65] text-text-secondary">{description}</p>
    ) : null}

    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-5">
      {items.map((item) => (
        <TopicItem key={item.href} item={item} ctaName={`${ctaPrefix}${item.title}`} />
      ))}
    </div>
  </div>
)

/**
 * Seção "Onde aprofundar" (/sobre) — central de navegação institucional
 * em blocos editoriais. Mesmos destinos, textos e tracking.
 */
const AboutTopics = ({ id, eyebrow, title, description, groups, legal }: AboutTopicsProps) => (
  <section id={id} className="relative overflow-hidden bg-surface-soft">
    {/* PRANCHETA 11 (chevrons) — único grafismo da seção, bem discreto. */}
    <BrandGraphic
      variant="chevrons"
      tone="teal"
      className="-top-16 right-[-14%] hidden h-[520px] w-[860px] opacity-[0.04] md:block lg:right-[-10%] lg:opacity-[0.06]"
    />

    <div className="bc-container relative py-14 lg:py-[72px] lg:pb-[88px]">
      <div className="mx-auto max-w-[1180px]">
        <header className="max-w-[58ch]">
          <p className="t-eyebrow mb-2 text-bc-primary">{eyebrow}</p>
          <h2 className="t-h2 text-text-primary">{title}</h2>
          <p className="mt-3 max-w-[560px] t-body text-text-secondary">
            {description}
          </p>
        </header>

        <div className="mt-12 flex flex-col gap-12 lg:mt-14 lg:gap-14">
          {groups.map((group) => (
            <GroupBlock
              key={group.title}
              title={group.title}
              description={group.description}
              items={group.items}
              ctaPrefix="hub_sobre_"
            />
          ))}

          <GroupBlock
            title={legal.title}
            description={legal.description}
            items={legal.items}
            ctaPrefix="hub_sobre_legal_"
          />
        </div>
      </div>
    </div>
  </section>
)

export default AboutTopics
