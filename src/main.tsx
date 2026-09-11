import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import App from './App'
import '@/styles/globals.css'
import { loadAppConfig } from '@/config/integrations'
import { initUtmSession, initWebVitals } from '@/lib/analytics'
import { initThirdPartyScripts } from '@/lib/integrations'

// Carrega config pública (WhatsApp, RD Station, vagas) do Supabase antes/junto do render.
loadAppConfig()

// Captura/persistência de UTMs da sessão (sessionStorage, sem dados pessoais).
// Roda ANTES de qualquer script de terceiro: a atribuição não depende do GTM.
initUtmSession()

// Terceiros (GTM) — idle, produção apenas, inicialização única.
initThirdPartyScripts()

// RUM: Core Web Vitals de campo (amostragem 20%, sem PII), via dataLayer.
initWebVitals()

const container = document.getElementById('root')
if (!container) throw new Error('Elemento #root não encontrado no index.html')

const app = (
  <StrictMode>
    <HelmetProvider>
      {/* QA FRONT-END 17: future flags do React Router v7 já adotadas — remove
          os avisos de console e alinha o comportamento ao da próxima major. */}
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)

// Rotas pré-renderizadas (SSG) chegam com HTML no #root → hidratar.
// Demais rotas (noindex, 404, documentos) seguem com render de SPA.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
