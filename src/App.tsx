import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import RootLayout from '@/components/Layout/RootLayout'

// A Home é crítica para o LCP e permanece no bundle inicial (import estático).
import Home from '@/pages/home/page'

// Demais páginas são carregadas sob demanda (code splitting por rota).
const Contato = lazy(() => import('@/pages/contato/page'))
const ContatoEnviado = lazy(() => import('@/pages/contato/enviado/page'))
const Conteudo = lazy(() => import('@/pages/conteudo/page'))
const ConteudoBcCast = lazy(() => import('@/pages/conteudo/bc-cast/page'))
const ConteudoBlog = lazy(() => import('@/pages/conteudo/blog/page'))
const ConteudoBlogArtigo = lazy(() => import('@/pages/conteudo/blog/artigo/page'))
const ConteudoBcCastEpisodio = lazy(() => import('@/pages/conteudo/bc-cast/episodio/page'))

const EnergiaSolarAnapolis = lazy(() => import('@/pages/energia-solar-anapolis/page'))
const EnergiaSolarAparecida = lazy(() => import('@/pages/energia-solar-aparecida-de-goiania/page'))
const EnergiaSolarRioVerde = lazy(() => import('@/pages/energia-solar-em-rio-verde/page'))
const EnergiaSolarGoiania = lazy(() => import('@/pages/energia-solar-goiania/page'))
const EnergiaSolarTocantins = lazy(() => import('@/pages/energia-solar-no-tocantins/page'))
const EnergiaSolarPalmas = lazy(() => import('@/pages/energia-solar-palmas/page'))
const EnergiaSolarTrindade = lazy(() => import('@/pages/energia-solar-trindade/page'))

const Produtos = lazy(() => import('@/pages/produtos/page'))
const ProdutoMercadoLivre = lazy(() => import('@/pages/produtos/mercado-livre-de-energia/page'))
const ProdutoConsorcio = lazy(() => import('@/pages/produtos/consorcio-bc-energia/page'))
const ProdutoGestao = lazy(() => import('@/pages/produtos/gestao-de-energia/page'))
const ProdutoCertificacaoIrec = lazy(() => import('@/pages/produtos/certificacao-renovavel-irec/page'))
const ProdutoArrendamento = lazy(() => import('@/pages/produtos/arrendamento-de-usinas/page'))

const Simulador = lazy(() => import('@/pages/simulador-de-economia/page'))

const Segmentos = lazy(() => import('@/pages/segmentos/page'))
const Segmento = lazy(() => import('@/pages/segmentos/segmento/page'))

const Sobre = lazy(() => import('@/pages/sobre/page'))
const SobreQuemSomos = lazy(() => import('@/pages/sobre/quem-somos/page'))
const SobreNossasUsinas = lazy(() => import('@/pages/sobre/nossas-usinas/page'))
const SobreLgpd = lazy(() => import('@/pages/sobre/lgpd/page'))
const SobreLeilao = lazy(() => import('@/pages/sobre/leilao/page'))
const SobreFatorAlavancagem = lazy(() => import('@/pages/sobre/fator-de-alavancagem/page'))
const SobreSustentabilidade = lazy(() => import('@/pages/sobre/sustentabilidade/page'))
const SobreSocial = lazy(() => import('@/pages/sobre/social/page'))
const SobreCondicoesVarejistas = lazy(() => import('@/pages/sobre/condicoes-gerais-varejistas/page'))

const NotFound = lazy(() => import('@/pages/not-found'))
const PdfRedirect = lazy(() => import('@/pages/documentos/PdfRedirect'))

// Página interna de referência do Design System (noindex, fora do sitemap).
const DesignSystem = lazy(() => import('@/pages/design-system/page'))


/**
 * Fallback leve durante o download do chunk da rota.
 * Reserva altura mínima de viewport para não gerar CLS relevante e não
 * introduz dependências nem animações pesadas.
 */
const RouteFallback = () => <div className="min-h-screen" aria-busy="true" aria-live="polite" />

const App = () => (
  <Suspense fallback={<RouteFallback />}>
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />

        <Route path="contato" element={<Contato />} />
        <Route path="contato/enviado" element={<ContatoEnviado />} />

        <Route path="conteudo" element={<Conteudo />} />
        <Route path="conteudo/bc-cast" element={<ConteudoBcCast />} />
        <Route path="conteudo/blog" element={<ConteudoBlog />} />
        <Route path="conteudo/blog/:slug" element={<ConteudoBlogArtigo />} />
        <Route path="conteudo/bc-cast/:slug" element={<ConteudoBcCastEpisodio />} />

        <Route path="energia-solar-anapolis" element={<EnergiaSolarAnapolis />} />
        <Route path="energia-solar-aparecida-de-goiania" element={<EnergiaSolarAparecida />} />
        <Route path="energia-solar-em-rio-verde" element={<EnergiaSolarRioVerde />} />
        <Route path="energia-solar-goiania" element={<EnergiaSolarGoiania />} />
        <Route path="energia-solar-no-tocantins" element={<EnergiaSolarTocantins />} />
        <Route path="energia-solar-palmas" element={<EnergiaSolarPalmas />} />
        <Route path="energia-solar-trindade" element={<EnergiaSolarTrindade />} />

        <Route path="produtos" element={<Produtos />} />
        <Route path="produtos/mercado-livre-de-energia" element={<ProdutoMercadoLivre />} />
        <Route path="produtos/consorcio-bc-energia" element={<ProdutoConsorcio />} />
        <Route path="produtos/gestao-de-energia" element={<ProdutoGestao />} />
        {/*
          ETAPA SEO 04 — consolidação I-REC.
          `/produtos/irec` deixou de ser página indexável e redireciona para a
          rota preferencial. O 301 real deve ser configurado no hosting no
          cut-over (ver docs/SEO-INDEXATION-MAP.md); aqui o SPA garante que o
          usuário nunca veja conteúdo duplicado.
        */}
        <Route
          path="produtos/irec"
          element={<Navigate to="/produtos/certificacao-renovavel-irec" replace />}
        />
        <Route path="produtos/certificacao-renovavel-irec" element={<ProdutoCertificacaoIrec />} />
        <Route path="produtos/arrendamento-de-usinas" element={<ProdutoArrendamento />} />

        <Route path="simulador-de-economia" element={<Simulador />} />

        <Route path="segmentos" element={<Segmentos />} />
        <Route path="segmentos/:segmento" element={<Segmento />} />

        <Route path="sobre" element={<Sobre />} />
        <Route path="sobre/quem-somos" element={<SobreQuemSomos />} />
        <Route path="sobre/nossas-usinas" element={<SobreNossasUsinas />} />
        <Route path="sobre/lgpd" element={<SobreLgpd />} />
        <Route path="sobre/leilao" element={<SobreLeilao />} />
        <Route path="sobre/fator-de-alavancagem" element={<SobreFatorAlavancagem />} />
        <Route path="sobre/sustentabilidade" element={<SobreSustentabilidade />} />
        <Route path="sobre/social" element={<SobreSocial />} />
        <Route path="sobre/condicoes-gerais-varejistas" element={<SobreCondicoesVarejistas />} />

        {/* Redirecionamentos das URLs de documentos do site antigo (Next.js) */}
        <Route path="documentos/campanha_com_fidelidade_2anos" element={<PdfRedirect file="campanha_com_fidelidade_2anos.pdf" />} />
        <Route path="documentos/campanha_sem_fidelidade" element={<PdfRedirect file="campanha_sem_fidelidade.pdf" />} />
        <Route path="documentos/condicoes_gerais_gd" element={<PdfRedirect file="condicoes_gerais_gd.pdf" />} />
        <Route path="documentos/condicoes_gerais_gd_v2" element={<PdfRedirect file="condicoes_gerais_gd_v2.pdf" />} />
        <Route path="documentos/condicoes_gerais_gd_alta_tensao" element={<PdfRedirect file="condicoes_gerais_gd_alta_tensao.pdf" />} />
        <Route path="documentos/condicoes_gerais_gd_externo" element={<PdfRedirect file="condicoes_gerais_gd_externo.pdf" />} />

        {/* Referência interna do Design System — noindex e fora do sitemap. */}
        <Route path="design-system" element={<DesignSystem />} />

        <Route path="*" element={<NotFound />} />

      </Route>
    </Routes>
  </Suspense>
)

export default App
