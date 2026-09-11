// Edge Function: blog-posts
// Proxy para a API do blog (WordPress REST). Repassa query string.
// Secret esperado: BLOG_API  (base URL)
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const base = Deno.env.get('BLOG_API')
    if (!base) {
      return new Response(JSON.stringify({ error: 'BLOG_API não configurada' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const reqUrl = new URL(req.url)
    const qs = reqUrl.search ? reqUrl.search : ''
    const upstreamUrl = `${base.replace(/\/$/, '')}/posts${qs}`
    const upstream = await fetch(upstreamUrl)
    const text = await upstream.text()

    if (!upstream.ok) {
      console.error(`blog-posts upstream [${upstream.status}]: ${text}`)
      return new Response(
        JSON.stringify({ error: 'Upstream error', status: upstream.status, details: text }),
        { status: upstream.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(text, {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (e) {
    console.error('blog-posts error:', e)
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
