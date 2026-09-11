/**
 * Busca posts do blog via Edge Function `blog-posts` (Supabase externo).
 * Secret usado pela function: BLOG_API (base URL do WordPress REST).
 */
import { getSupabase } from '@/lib/supabase'

export const getBlogPosts = async (): Promise<any[]> => {
  try {
    const { data, error } = await (await getSupabase()).functions.invoke('blog-posts', {
      method: 'GET'
    })
    if (error) {
      console.error('blog-posts error:', error)
      return []
    }
    return Array.isArray(data) ? data : []
  } catch (e) {
    console.error('blog-posts exception:', e)
    return []
  }
}
