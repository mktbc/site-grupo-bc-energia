import { ReactNode } from 'react'

import Container from '@/components/Container/Container'
import SectionHeader from '@/components/SectionHeader/SectionHeader'
import Link from '@/components/Link'
import { trackNextAction } from '@/lib/analytics'

export type QuickAnswer = {
  /** Pergunta real, escrita como o usuário pergunta. */
  question: string
  /** Resposta objetiva em 2–4 linhas. Deve fazer sentido lida isoladamente. */
  answer: ReactNode
  /** Aprofundamento opcional — link descritivo, nunca "saiba mais". */
  deepen?: { label: string; href: string }
}

export type QuickAnswersProps = {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  items: QuickAnswer[]
  /** Prefixo do evento de clique dos links de aprofundamento. */
  tracking: string
  className?: string
}

/**
 * Respostas rápidas antes da explicação longa.
 *
 * Camada 1 do conteúdo (resposta) — as camadas seguintes continuam nas seções
 * editoriais da própria página. Propositalmente NÃO é card e NÃO é accordion:
 * o texto precisa estar visível no HTML, ser escaneável e continuar agradável
 * de ler. Nenhum CTA fica entre a pergunta e a resposta.
 */
const QuickAnswers = ({
  id,
  eyebrow = 'Respostas rápidas',
  title,
  description,
  items,
  tracking,
  className = ''
}: QuickAnswersProps) => {
  if (!items.length) return null

  return (
    <section id={id} className={`bg-surface bc-level-mid ${className}`.trim()}>
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} description={description} variant="editorial" level="mid" />

        <div className="mt-10 grid gap-x-14 gap-y-9 lg:mt-12 lg:grid-cols-2">
          {items.map((item) => (
            <div key={item.question} className="measure-body">
              <h3 className="t-h4 text-text-primary">{item.question}</h3>
              <p className="mt-2.5 t-body text-text-secondary">{item.answer}</p>
              {item.deepen ? (
                <Link
                  href={item.deepen.href}
                  data-cta-name={`${tracking}_aprofundar`}
                  onClick={() =>
                    trackNextAction({
                      action_name: `${tracking}_aprofundar`,
                      destination: item.deepen!.href
                    })
                  }
                  className="group mt-3 inline-flex min-h-[44px] items-center gap-2 t-action-label text-bc-primary transition-colors duration-200 ease-bc hover:text-bc-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 motion-reduce:transition-none"
                >
                  <span className="underline-offset-4 group-hover:underline">{item.deepen.label}</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
                  >
                    →
                  </span>
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default QuickAnswers
