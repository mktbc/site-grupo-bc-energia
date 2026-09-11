// Edge Function: form-webhook
// Proxy para o webhook do N8N (envio de formulários).
// Secret esperado: FORM_WEBHOOK_URL
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const url = Deno.env.get('FORM_WEBHOOK_URL')
    if (!url) {
      return new Response(JSON.stringify({ error: 'FORM_WEBHOOK_URL não configurada' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return new Response(JSON.stringify({ error: 'Payload inválido' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const upstream = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    const text = await upstream.text()
    if (!upstream.ok) {
      console.error(`form-webhook upstream [${upstream.status}]: ${text}`)
      return new Response(
        JSON.stringify({ error: 'Upstream error', status: upstream.status, details: text }),
        { status: upstream.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(JSON.stringify({ ok: true, upstream: text }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (e) {
    console.error('form-webhook error:', e)
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
