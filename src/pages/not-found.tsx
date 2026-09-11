import Link from '@/components/Link'
import Seo from '@/components/Seo'
import { NOT_FOUND_META } from '@/config/meta'

/**
 * Página Not Found (rota `*` e rotas dinâmicas com parâmetro inválido).
 *
 * SEO (ETAPA SEO 06):
 *  - metadata própria (nunca a da Home);
 *  - robots noindex,nofollow em qualquer ambiente;
 *  - sem canonical (não existe URL válida para uma rota inexistente);
 *  - sem JSON-LD de página válida;
 *  - H1 textual ("Página não encontrada"), o "404" é apenas visual.
 */
const NotFound = () => (
  <div className="flex min-h-[70vh] w-full items-center justify-center bg-teal-600 px-6 text-center">
    <Seo
      title={NOT_FOUND_META.title}
      description={NOT_FOUND_META.description}
      noindex
      nofollow
    />

    <div>
      <p aria-hidden="true" className="mb-2 text-9xl text-gray-200">
        404
      </p>
      <h1 className="mb-2 t-h2 text-white">Página não encontrada</h1>
      <p className="text-white">
        A página que você tentou acessar não foi encontrada ou não existe mais.
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <Link
          className="inline-block rounded bg-gray-200 px-4 py-2 transition-all hover:bg-gray-100"
          href="/"
        >
          Retornar para home
        </Link>
        <Link
          className="inline-block rounded border border-gray-200 px-4 py-2 text-white transition-all hover:bg-white/10"
          href="/produtos"
        >
          Conhecer as soluções
        </Link>
        <Link
          className="inline-block rounded border border-gray-200 px-4 py-2 text-white transition-all hover:bg-white/10"
          href="/contato"
        >
          Falar com a BC Energia
        </Link>
      </div>
    </div>
  </div>
)

export default NotFound
