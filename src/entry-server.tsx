/**
 * Entrada de SSG (pré-renderização estática).
 *
 * Usada apenas por `scripts/prerender.ts` no build: renderiza cada rota
 * indexável para HTML e devolve também as tags de <head> geradas pelo
 * react-helmet-async. Não é usada em runtime no navegador.
 *
 * Usa `renderToPipeableStream` com `onAllReady` porque as rotas são
 * carregadas com React.lazy — o stream aguarda a resolução do Suspense,
 * o que `renderToString` não faz (produziria HTML vazio).
 */
import { StrictMode } from 'react'
import { Writable } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import type { HelmetServerState } from 'react-helmet-async'

import App from './App'

export type RenderResult = {
  html: string
  head: string
}

const collect = () => {
  const chunks: string[] = []
  const stream = new Writable({
    write(chunk, _encoding, callback) {
      chunks.push(chunk.toString())
      callback()
    }
  })
  return { stream, value: () => chunks.join('') }
}

export const render = (url: string): Promise<RenderResult> =>
  new Promise((resolve, reject) => {
    const helmetContext: { helmet?: HelmetServerState } = {}
    const { stream, value } = collect()

    const { pipe, abort } = renderToPipeableStream(
      <StrictMode>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </StrictMode>,
      {
        onAllReady() {
          stream.on('finish', () => {
            const helmet = helmetContext.helmet
            const head = helmet
              ? [helmet.title, helmet.meta, helmet.link, helmet.script]
                  .map((part) => (part ? part.toString() : ''))
                  .filter(Boolean)
                  .join('\n    ')
              : ''
            resolve({ html: value(), head })
          })
          pipe(stream)
        },
        onError(error) {
          reject(error)
        }
      }
    )

    // Rede de segurança: nenhuma rota deve levar mais que 20s para renderizar.
    setTimeout(() => abort(), 20_000)
  })
