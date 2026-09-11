import { Container } from '@/components/Container'
import Image from '@/components/Image'
import { SectionHeader } from '@/components/SectionHeader'

import { logos } from './Customers.data'
import { CustomersProps } from './Customers.type'

/** Seleção priorizando marcas destacadas, sem remover nada da fonte de dados. */
const selectLogos = (limit?: number) => {
  if (!limit) return logos
  const featured = logos.filter((logo) => logo.featured)
  const rest = logos.filter((logo) => !logo.featured)
  return [...featured, ...rest].slice(0, limit)
}

/**
 * Prova de mercado — empresas que fazem parte da trajetória do Grupo BC Energia.
 *
 * Apresentação em grade estável, com altura normalizada, sem cards pesados e
 * sem movimento automático. 21 logos: 7 linhas no mobile (antes 11 em
 * 2 colunas, ~1.000px), 4 no desktop médio e 3 no desktop largo. A antiga variante em carrossel (Swiper) foi
 * removida: os logos são conteúdo estático, não exigem JavaScript.
 */
const Customers = ({
  eyebrow = 'PARCERIA E CONFIANÇA',
  title = 'Nossos Clientes',
  description,
  limit,
  className = ''
}: CustomersProps = {}) => (
  <section className={`bc-section-md bg-surface-muted ${className}`}>
    <Container>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />

      <ul className="mt-6 grid grid-cols-3 items-center gap-x-5 gap-y-5 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-6 lg:gap-x-8 lg:gap-y-6 xl:grid-cols-7">
        {selectLogos(limit).map((logo) => (
          <li key={logo.id} className="flex h-14 items-center justify-center lg:h-16">
            <Image
              src={`/img/components/customers/${logo.url}`}
              alt={logo.name ?? logo.title}
              width={200}
              height={200}
              loading="lazy"
              decoding="async"
              className="max-h-10 w-auto max-w-full object-contain sm:max-h-12 lg:max-h-14"
            />
          </li>
        ))}
      </ul>
    </Container>
  </section>
)

export default Customers
