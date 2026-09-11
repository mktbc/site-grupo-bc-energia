import FinalCtaSection from '@/components/Cta/FinalCtaSection'
import { HEADER_CLIENT_LINK } from '@/config/navigation'

/**
 * Home — CTA final (REFORMULAÇÃO FINAL DA HOME).
 *
 * Card corporativo em azul escuro com chamada forte para a simulação de
 * economia (`/simulador-de-economia`) e, como alternativa, contato direto
 * com um consultor (WhatsApp oficial). Tracking e rotas preservados.
 */
const FinalCta = () => (
  <FinalCtaSection
    id="home_cta_final"
    eyebrow="PRÓXIMO PASSO"
    title="Descubra agora quanto a sua empresa"
    titleLine2="pode economizar em energia"
    description="Use o simulador do Grupo BC Energia ou envie sua conta para análise: nosso time indica o caminho mais vantajoso para o seu perfil de consumo — Mercado Livre de Energia, Consórcio BC Energia ou gestão."
    actionText="Simulação gratuita e sem compromisso."
    primaryCta={{ href: '/simulador-de-economia', label: 'Simular minha economia' }}
    secondaryCta={{
      href: HEADER_CLIENT_LINK.href,
      label: 'Falar com um consultor',
      target: '_blank',
      rel: 'noopener noreferrer'
    }}
    graphic={{ variant: 'chevrons', tone: 'light', size: 'medium', position: 'bottom-right', opacity: 0.06 }}
  />
)

export default FinalCta
