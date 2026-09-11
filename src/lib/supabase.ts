/**
 * Cliente Supabase carregado sob demanda.
 *
 * PERFORMANCE 02 — o pacote `@supabase/supabase-js` pesa ~214 KB brutos
 * (~55 KB gzip). Antes ele entrava no bundle inicial de TODAS as rotas
 * (inclusive as que nunca chamam o backend), porque `lib/supabase.ts` era
 * importado estaticamente por `config/integrations.ts` (executado no boot).
 *
 * Agora o módulo é buscado via `import()` apenas quando alguém realmente
 * precisa do cliente — formulários, serviços (blog/segmentos/salesforce) e
 * o carregamento assíncrono da config pública.
 */
import type { SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL =
  (import.meta.env.VITE_SUPABASE_URL as string) || 'https://ufbkblkahyzfsjsoqmzg.supabase.co'
const SUPABASE_ANON_KEY =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  'sb_publishable_IEyoZTETPiYQaFd7X2MNLQ_ar-1YyHY'

let clientPromise: Promise<SupabaseClient> | null = null

/** Retorna (e memoiza) o cliente Supabase, baixando o SDK sob demanda. */
export const getSupabase = (): Promise<SupabaseClient> => {
  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: { persistSession: false }
      })
    )
  }
  return clientPromise
}
