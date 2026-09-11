import { FormEvent, useState } from 'react'

import { Form, Heading } from '@/components'
import Image from '@/components/Image'

type Props = {
  title?: string
}

const FormWrap = ({ title }: Props) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setIsSuccess(true)
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="flex w-full flex-col justify-center px-6 py-8 lg:py-6">
      {isSuccess ? (
        <div className="flex flex-col items-center">
          <Image
            className=""
            src="/img/icons/mail-sent.svg"
            alt="BC Energia"
            width={130}
            height={130}
          />{' '}
          <h2 className="mb-3 text-center t-h2 text-white">
            Formulário enviado com sucesso!
          </h2>
          <p className="text-center t-body-lg text-white">
            Seus dados foram enviados e serão analisados pela nossa equipe o mais breve possível.
            Obrigado.
          </p>
        </div>
      ) : (
        <div>
          {title && <Heading className="text-white">{title}</Heading>}
          <Form loading={loading} onSubmit={onSubmit} />
        </div>
      )}
      {/* TODO: TI reconectar — script de rastreamento RD Station (antes: next/script
          com RDSTATION_TRACKING_CODE_SCRIPT_URL). Ver src/config/integrations.ts. */}
    </div>
  )
}

export default FormWrap
