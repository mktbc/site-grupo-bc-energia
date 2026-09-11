import { useEffect, useState } from 'react'

import { ButtonLink, Heading, Section } from '@/components'
import { getNumbers } from '@/services'
import Image from '@/components/Image'

import { NumbersProps } from './Numbers.type'

type NumberItem = { title?: string; subtitle?: string }

const Numbers = ({
  children,
  btnText,
  btnLink,
  context,
  subTitle,
  bgImage,
  target
}: NumbersProps) => {
  // Antes: Server Component async (const data = await getNumbers(context)).
  // Agora: client component com estado (dados vêm de mock — ver services/salesForce).
  const [data, setData] = useState<NumberItem[]>([])

  useEffect(() => {
    let active = true
    getNumbers(context).then((res) => {
      if (active) setData(res)
    })
    return () => {
      active = false
    }
  }, [context])

  return (
    <>
      <Section bgImage={bgImage || ''} id="home_numeros" className="bg-teal-600" arrowMask>
        <div className="m-auto mb-8 flex w-full flex-col gap-9 text-center lg:w-3/4">
          <Image
            className="mx-auto"
            src={`/img/global/grupo-bc-logo-solo-branca.svg`}
            alt="Grupo BC Energia"
            width={64}
            height={46}
          />
          <Heading className="mb-0 text-white">{children}</Heading>
        </div>

        <div className="mb-12 text-center">
          {subTitle && (
            <h3 className="mb-7 mt-10 t-h2 text-white lg:mb-10 lg:mt-12">
              {subTitle}
            </h3>
          )}
          <div className="flex flex-col justify-center gap-12 text-white lg:flex-row">
            {!!data.length &&
              data.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <p className="t-metric-lg text-bc-yellow">{item.title}</p>
                  <p className="t-body-lg">{item.subtitle}</p>
                </div>
              ))}
          </div>
        </div>
        <ButtonLink href={btnLink} target={target || '_self'} variant="secondary">
          {btnText}
        </ButtonLink>
      </Section>
    </>
  )
}

export default Numbers
