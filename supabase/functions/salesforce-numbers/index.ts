// Edge Function: salesforce-numbers
// Proxy para os números (Salesforce Sites), aceita ?context=...
// Secret esperado: SALESFORCE_API  (base URL)
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const base = Deno.env.get('SALESFORCE_API')
    if (!base) {
      return new Response(JSON.stringify({ error: 'SALESFORCE_API não configurada' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const url = new URL(req.url)
    const context = (url.searchParams.get('context') || '').replace(/[^\w-]/g, '')

    const upstreamUrl = `${base.replace(/\/$/, '')}/getDadosParaConsulta-EILPjWCr1IDO7sF?query=${encodeURIComponent(context)}`
    const upstream = await fetch(upstreamUrl)
    const text = await upstream.text()

    if (!upstream.ok) {
      console.error(`salesforce-numbers upstream [${upstream.status}]: ${text}`)
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
    console.error('salesforce-numbers error:', e)
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
