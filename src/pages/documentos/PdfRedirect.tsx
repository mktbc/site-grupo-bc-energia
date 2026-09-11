import { useEffect } from 'react'

type Props = { file: string }

/**
 * Preserva as URLs `/documentos/<slug>` do site antigo (Next.js),
 * redirecionando para o PDF estático correspondente em `/docs/`.
 */
const PdfRedirect = ({ file }: Props) => {
  useEffect(() => {
    window.location.replace(`/docs/${file}`)
  }, [file])

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <p>
        Redirecionando para o documento…{' '}
        <a href={`/docs/${file}`}>Abrir o documento em PDF</a> se não for redirecionado
        automaticamente.
      </p>
    </main>
  )
}

export default PdfRedirect
