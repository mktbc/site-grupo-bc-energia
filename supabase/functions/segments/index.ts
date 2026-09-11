// Edge Function: segments
// Proxy para a API de segmentos. Aceita ?segment=<slug>.
// Secret esperado: API  (base URL da API própria)
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const base = Deno.env.get('API')
    if (!base) {
      return new Response(JSON.stringify({ error: 'API não configurada' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const url = new URL(req.url)
    const segment = (url.searchParams.get('segment') || '').replace(/[^\w-]/g, '')
    if (!segment) {
      return new Response(JSON.stringify({ error: 'segment é obrigatório' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const upstreamUrl = `${base.replace(/\/$/, '')}/segments?segment=${encodeURIComponent(segment)}`
    const upstream = await fetch(upstreamUrl)
    const text = await upstream.text()

    if (!upstream.ok) {
      console.error(`segments upstream [${upstream.status}]: ${text}`)
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
    console.error('segments error:', e)
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
