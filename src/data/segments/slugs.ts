/**
 * Índice leve dos segmentos (slug → nome exibido).
 *
 * PERFORMANCE 02 — `src/data/segments/index.ts` importa os 11 JSONs de
 * conteúdo (~42 KB). Como `config/routes.ts`, `config/meta.ts` e
 * `lib/analytics/pageType.ts` só precisavam da LISTA de slugs (e do nome do
 * segmento para o breadcrumb), eles arrastavam todo o conteúdo dos segmentos
 * para o bundle inicial de todas as rotas.
 *
 * Este módulo espelha exatamente o campo `title` de cada JSON — nenhum dado
 * novo. O conteúdo completo continua sendo carregado apenas pela rota
 * `/segmentos/:segmento`.
 */
export const SEGMENT_NAMES: Record<string, string> = {
  agronegocio: 'Agronegócio',
  'bares-e-restaurantes': 'Bares e Restaurantes',
  condominio: 'Condomínio',
  educacional: 'Educacional',
  lazer: 'Lazer',
  religioso: 'Religioso',
  residencial: 'Residencial',
  saude: 'Saúde',
  servico: 'Serviço',
  turismo: 'Turismo',
  varejo: 'Varejo'
}

export const SEGMENT_SLUGS: string[] = Object.keys(SEGMENT_NAMES)
