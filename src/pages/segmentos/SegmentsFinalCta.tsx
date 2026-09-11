import FinalCtaSection from '@/components/Cta/FinalCtaSection'

/**
 * VISUAL SYSTEM 07 — fechamento do hub /segmentos.
 * Padrão global de CTA; grafismo em loops para não repetir a seção anterior.
 */
const SegmentsFinalCta = () => (
  <FinalCtaSection
    eyebrow="Próximo passo"
    title="Quer descobrir qual solução faz mais sentido para o seu negócio?"
    description="Nossa equipe analisa seu perfil de consumo e indica o melhor caminho."
    actionText="Envie sua conta de energia para uma análise inicial."
    primaryCta={{ label: 'Enviar minha conta para análise', href: '/contato' }}
    secondaryCta={{ label: 'Falar com um especialista', href: '/contato' }}
    graphic={{ variant: 'loops', tone: 'light', size: 'medium', position: 'bottom-right', opacity: 0.05 }}
  />
)

export default SegmentsFinalCta
