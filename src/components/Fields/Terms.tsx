import { useState } from 'react'

import { Button } from '@/components'

const Label = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        style={{ display: open ? 'block' : 'none' }}
        className="w:full fixed left-5 right-5 top-5 z-[110] m-auto rounded-lg bg-white p-8 text-center md:top-20 md:w-4/5 lg:w-3/4 xl:w-2/4"
      >
        <h3 className="mb-2 t-h3-editorial">Termos de Solicitação de Inscrição</h3>
        <p>
          Ao fazer minha <strong>solicitação de inscrição</strong>, declaro ter conhecimento de que
          a mesma não se trata de uma autorização de entrada no evento.
        </p>
        <br />
        <p>
          {' '}
          O <strong>GRUPO BC ENERGIA</strong> em tempo hábil confirmará ou rejeitará a solicitação
          de inscrição conforme seus critérios de avaliação.
        </p>
        <br />
        <p>
          Também declaro ter conhecimento de que ao receber minha confirmação de inscrição no
          evento, assumo o compromisso de{' '}
          <strong>realizar o PAGAMENTO DA TAXA DE INSCRIÇÃO SOLIDÁRIA</strong>, no valor de{' '}
          <strong>R$100,00 (CEM REAIS)</strong> cujo valor será cobrado e coletado diretamente pela
          <strong> ASSOCIAÇÃO BLOOMY</strong> bloomy.org.br, associacaobloomy@gmail.com, que o
          reverterá em ações sociais sem fins lucrativos.
        </p>
        <br />
        <p>
          Conheça mais sobre a Associação Bloomy.{' '}
          <a
            className="text-blue-500"
            href=" https://www.instagram.com/bloomy_ong/"
            target="_blank"
          >
            Clique aqui.
          </a>
        </p>
        <div className="mt-4 text-center">
          <Button className="pb-2 pt-2" onClick={() => setOpen(false)}>
            Ok, estou ciente e aceito os termos
          </Button>
        </div>
      </div>
      <div className="bg-yellow-200 px-2 py-1 text-left font-bold">
        <span className="inline text-green-800">
          Aceito os termos. Inscrição no valor de R$100,00 (valor repassado para a Associação
          Bloomy).{' '}
        </span>
        <span
          title="Clique para ler os termos"
          onClick={() => setOpen(true)}
          className="inline text-blue-600 hover:cursor-pointer hover:text-blue-800"
        >
          Clique aqui para ler os termos.
        </span>
      </div>
      <div
        style={{ display: open ? 'block' : 'none' }}
        className="fixed left-0 right-0 top-0 z-[100] h-full w-full bg-surface-dark/80"
      ></div>
    </>
  )
}

export default Label
