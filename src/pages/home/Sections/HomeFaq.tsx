import Accordion from '@/components/Accordion/Accordion'
import { Container } from '@/components/Container'
import StructuredData from '@/components/Seo/StructuredData'
import { faqSchema } from '@/components/Seo/structuredDataBuilders'
import Reveal from '@/components/Reveal/Reveal'
import { faq } from '@/pages/produtos/mercado-livre-de-energia/data'

/**
 * Home — FAQ interativo (REFORMULAÇÃO FINAL DA HOME).
 *
 * As 5 principais dúvidas reais sobre energia sustentável e Mercado Livre de
 * Energia — mesmo conteúdo oficial já publicado na página de produto
 * (`mercado-livre-de-energia/data.tsx`). Nenhuma pergunta foi inventada.
 * Accordion do Design System (H3 + button aria-expanded) + FAQPage JSON-LD.
 */

const items = faq.slice(0, 5)

/** FAQPage JSON-LD só aceita conteúdo textual (restringe aos itens string). */
const schemaItems = items.filter(
  (item): item is typeof item & { content: string } => typeof item.content === 'string'
)

const HomeFaq = () => (
  <section id="home_faq" className="bc-level-support bg-surface lg:py-[48px]">
    <StructuredData schemas={[faqSchema(schemaItems)]} />
    <Container width="editorial">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Cabeçalho editorial */}
        <Reveal className="lg:col-span-5 lg:pr-4 lg:pt-1">
          <p className="t-eyebrow text-text-accent">Perguntas frequentes</p>
          <h2 className="t-h2-mid mt-3 max-w-[22ch] text-balance text-text-primary">
            Dúvidas sobre energia sustentável e Mercado Livre
          </h2>
          <p className="mt-4 max-w-[46ch] t-body-lg text-text-secondary">
            As respostas diretas para as principais dúvidas de quem quer reduzir
            o custo de energia com fontes renováveis.
          </p>
          
        </Reveal>

        {/* Accordion limpo */}
        <Reveal delay={0.06} className="lg:col-span-7">
          <div className="border-t border-border-subtle/70">
            {items.map((item, index) => (
              <Accordion
                key={item.title}
                open={index === 0}
                variant="faq"
                title={item.title}
                content={item.content}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </Container>
  </section>
)

export default HomeFaq
