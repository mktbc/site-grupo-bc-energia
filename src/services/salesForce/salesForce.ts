/**
 * Números da seção "Numbers" via Edge Function `salesforce-numbers`.
 * Secret usado pela function: SALESFORCE_API.
 */
import { getSupabase } from '@/lib/supabase'
import { COMPANY_METRICS_LEGACY } from '@/data/companyMetrics'

type NumberItem = { title?: string; subtitle?: string }

const FALLBACK: NumberItem[] = COMPANY_METRICS_LEGACY

export const getNumbers = async (context: string): Promise<NumberItem[]> => {
  try {
    const { data, error } = await (await getSupabase()).functions.invoke(
      `salesforce-numbers?context=${encodeURIComponent(context || '')}`,
      { method: 'GET' }
    )
    if (error) {
      console.error('salesforce-numbers error:', error)
      return FALLBACK
    }
    if (Array.isArray(data) && data.length) return data as NumberItem[]
    return FALLBACK
  } catch (e) {
    console.error('salesforce-numbers exception:', e)
    return FALLBACK
  }
}
