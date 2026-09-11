import { ReactNode } from 'react'

import SectionHeader from '@/components/SectionHeader/SectionHeader'
import type { PowerPlant } from '@/data/powerPlants'

import InstitutionalSection, { type InstitutionalSectionTone } from './InstitutionalSection'
import type { SectionGraphic } from '@/components/Product/ProductSection'

export type InstitutionalPlantsProps = {
  /** Elemento oficial de apoio da seção — VISUAL SYSTEM 02. */
  graphic?: SectionGraphic
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  plants: Array<PowerPlant>
  tone?: InstitutionalSectionTone
  id?: string
}

/** Extrai a UF já presente no campo `location` ("Município (GO)"). */
const ufOf = (location: string) => location.match(/\(([A-Z]{2})\)/)?.[1] ?? '—'

/**
 * Listagem editorial do parque de geração (VISUAL 14).
 *
 * Substitui o catálogo de cards por uma tabela responsiva agrupada por estado:
 * cada complexo ocupa uma linha com a ficha técnica já cadastrada. Nenhum dado
 * técnico é criado aqui — tudo vem de `src/data/powerPlants.ts`.
 */
const InstitutionalPlants = ({
  graphic = { variant: 'diagonal', tone: 'teal', size: 'medium', position: 'bottom-left', opacity: 0.05 },
  eyebrow,
  title,
  description,
  plants,
  tone = 'surface',
  id
}: InstitutionalPlantsProps) => {
  const groups = plants.reduce<Array<{ uf: string; items: Array<PowerPlant> }>>((acc, plant) => {
    const uf = ufOf(plant.location)
    const group = acc.find((entry) => entry.uf === uf)
    if (group) group.items.push(plant)
    else acc.push({ uf, items: [plant] })
    return acc
  }, [])

  return (
    <InstitutionalSection graphic={graphic} tone={tone} id={id}>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />

      <div className="mt-7 flex flex-col gap-10">
        {groups.map((group) => (
          <div key={group.uf}>
            <div className="flex items-baseline gap-4 border-b border-border-default pb-3">
              <h3 className="t-h2 text-bc-dark">
                {group.uf}
              </h3>
              <p className="t-eyebrow text-bc-primary">
                {group.items.length}
                {group.items.length > 1 ? ' complexos' : ' complexo'}
              </p>
            </div>

            <ul>
              {group.items.map((plant) => (
                <li
                  key={plant.id}
                  className="grid grid-cols-1 gap-x-8 gap-y-3 border-b border-border-subtle py-6 lg:grid-cols-12 lg:items-baseline"
                >
                  <div className="lg:col-span-4">
                    <h4 className="t-h4 text-text-primary">{plant.title}</h4>
                    <p className="mt-1 t-body-sm text-text-secondary">{plant.location}</p>
                  </div>

                  <dl className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4 lg:col-span-8">
                    {plant.specs.map((spec) => (
                      <div key={spec.label}>
                        <dt className="t-caption font-semibold tracking-[0.14em] text-text-secondary">
                          {spec.label}
                        </dt>
                        <dd className="mt-1 t-h4-display text-bc-dark">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </InstitutionalSection>
  )
}

export default InstitutionalPlants
