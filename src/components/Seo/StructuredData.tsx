import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

import { resolveRouteMeta } from '@/config/meta-content'

import type { JsonLd } from './structuredDataBuilders'

/**
 * Injeta um ou mais blocos JSON-LD no <head> (react-helmet-async).
 * Use os builders de `structuredDataBuilders.ts` para montar os objetos.
 *
 * ETAPA SEO 07: páginas noindex (incluindo 404 e redirects) não emitem
 * schema de aquisição — rich results só fazem sentido em URL indexável.
 */
const StructuredData = ({ schemas }: { schemas: Array<JsonLd | null | undefined> }) => {
  const { pathname } = useLocation()
  const meta = resolveRouteMeta(pathname)

  const valid = schemas.filter(Boolean) as JsonLd[]
  if (meta.noindex || valid.length === 0) return null

  return (
    <Helmet>
      {valid.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}

export default StructuredData
