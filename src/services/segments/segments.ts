/**
 * Dados de segmentos. Tenta a Edge Function `segments` (Supabase externo,
 * secret `API`). Se falhar, cai nos JSONs locais em `src/data/segments`.
 */
import { getSupabase } from '@/lib/supabase'
import { getSegmentData } from '@/data/segments'

export const getSegment = async (segment?: string) => {
  if (!segment) return getSegmentData(segment)
  try {
    const { data, error } = await (await getSupabase()).functions.invoke(
      `segments?segment=${encodeURIComponent(segment)}`,
      { method: 'GET' }
    )
    if (error || !data) {
      if (error) console.warn('segments edge fn falhou, usando local:', error.message)
      return getSegmentData(segment)
    }
    return data
  } catch (e) {
    console.warn('segments exception, usando local:', e)
    return getSegmentData(segment)
  }
}
