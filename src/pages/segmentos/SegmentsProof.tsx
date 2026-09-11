import { logos } from '@/components/Customers/Customers.data'
import Image from '@/components/Image'

/** Seleção representativa (fonte de dados preservada integralmente). */
const displayedLogos = logos.filter((logo) => logo.featured).slice(0, 12)

/**
 * Momento 4a — Prova social compacta: faixa horizontal de logos reais,
 * sem caixa individual, sem grid espaçado.
 */
const SegmentsProof = () => (
  <section className="bg-surface pb-12 pt-14 lg:pb-14 lg:pt-20">
    <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10">
      <p className="t-eyebrow">Empresas que já confiam na BC</p>

      <ul className="mt-7 grid grid-cols-3 items-center gap-x-6 gap-y-4 rounded-card border border-border-subtle bg-surface-soft px-5 py-7 sm:grid-cols-4 lg:grid-cols-6 lg:gap-x-8 lg:px-8 lg:py-9">
        {displayedLogos.map((logo) => (
          <li key={logo.id} className="flex h-16 items-center justify-center lg:h-20">
            <Image
              src={`/img/components/customers/${logo.url}`}
              alt={logo.name ?? logo.title}
              width={200}
              height={200}
              loading="lazy"
              decoding="async"
              className="max-h-14 w-auto max-w-[180px] object-contain lg:max-h-[68px] lg:max-w-[210px]"
            />
          </li>
        ))}
      </ul>
    </div>
  </section>
)

export default SegmentsProof
