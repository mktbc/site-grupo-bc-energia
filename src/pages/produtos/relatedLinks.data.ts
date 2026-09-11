/**
 * Linking interno das páginas de solução.
 *
 * Fonte única das âncoras: `src/config/internalLinks.ts`. Aqui apenas
 * escolhemos, por solução, QUAIS destinos fazem sentido — separados em três
 * intenções distintas:
 *
 *  1. `PRODUCT_AUDIENCE_LINKS` — "Para quem esta solução faz sentido?"
 *  2. `PRODUCT_CONTENT_LINKS`  — "Entenda melhor antes de decidir"
 *  3. `PRODUCT_RELATED`        — "Próximos passos" (soluções complementares,
 *     regiões atendidas, institucional e conversão)
 *
 * Nenhuma rota nova: todos os destinos já existem no projeto.
 */
import { RelatedLinkItem } from '@/components/RelatedLinks/RelatedLinks.type'
import {
  PRODUCT_AUDIENCE,
  PRODUCT_CONTENT,
  linkTo,
  linksTo
} from '@/config/internalLinks'

const toItems = (hrefs: Array<string>): Array<RelatedLinkItem> =>
  linksTo(hrefs).map(({ label, href, description, shortLabel }) => ({
    label,
    href,
    description,
    shortLabel
  }))

/** Segmentos realmente compatíveis com cada solução. */
export const PRODUCT_AUDIENCE_LINKS: Record<string, Array<RelatedLinkItem>> = Object.fromEntries(
  Object.entries(PRODUCT_AUDIENCE).map(([slug, hrefs]) => [slug, toItems(hrefs)])
)

/** Conteúdos educativos existentes relacionados à solução (nunca inventados). */
export const PRODUCT_CONTENT_LINKS: Record<string, Array<RelatedLinkItem>> = Object.fromEntries(
  Object.entries(PRODUCT_CONTENT).map(([slug, hrefs]) => [slug, toItems(hrefs)])
)

/** Próximos passos por solução — destinos distribuídos, sem repetir âncoras. */
export const PRODUCT_RELATED: Record<string, Array<RelatedLinkItem>> = {
  'mercado-livre-de-energia': toItems([
    '/produtos/gestao-de-energia',
    '/energia-solar-goiania',
    '/energia-solar-em-rio-verde',
    '/conteudo/blog',
    '/simulador-de-economia',
    '/contato'
  ]),
  'consorcio-bc-energia': toItems([
    '/sobre/nossas-usinas',
    '/energia-solar-aparecida-de-goiania',
    '/energia-solar-palmas',
    '/conteudo/blog',
    '/simulador-de-economia',
    '/contato'
  ]),
  'gestao-de-energia': toItems([
    '/produtos/mercado-livre-de-energia',
    '/produtos/certificacao-renovavel-irec',
    '/contato'
  ]),
  irec: toItems([
    '/produtos/mercado-livre-de-energia',
    '/sobre/sustentabilidade',
    '/contato'
  ]),
  'certificacao-renovavel-irec': toItems([
    '/produtos/mercado-livre-de-energia',
    '/produtos/gestao-de-energia',
    '/sobre/sustentabilidade',
    '/contato'
  ]),
  'arrendamento-de-usinas': toItems([
    '/sobre/nossas-usinas',
    '/produtos/consorcio-bc-energia',
    '/sobre/quem-somos',
    '/contato'
  ]).map((item) =>
    item.href === '/contato'
      ? {
          ...item,
          label: 'Falar sobre o arrendamento da minha usina',
          description: 'Apresente seu ativo de geração para avaliação técnica.'
        }
      : item
  ),
  produtos: [
    {
      ...linkTo('/segmentos'),
      eyebrow: 'Perfis de consumo',
      icon: 'gestao-energia-renovavel',
      ctaLabel: 'Ver segmentos atendidos'
    },
    {
      ...linkTo('/energia-solar-goiania'),
      eyebrow: 'Região',
      icon: 'energia-solar',
      ctaLabel: 'Ver atendimento em Goiânia'
    },
    {
      ...linkTo('/energia-solar-no-tocantins'),
      eyebrow: 'Região',
      icon: 'energia-global',
      ctaLabel: 'Ver atendimento no Tocantins'
    },
    {
      ...linkTo('/contato'),
      eyebrow: 'Próximo passo',
      icon: 'fatura-energia',
      accent: true,
      ctaLabel: 'Enviar minha conta'
    }
  ]
}
