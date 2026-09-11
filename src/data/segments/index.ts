/**
 * Dados locais dos segmentos (empacotados na migração Next → Vite).
 *
 * Estes 11 JSONs vieram de `src/app/api/segments/*.json` do projeto Next.
 * São conteúdo estático do site (não são segredos), então foram incluídos no
 * bundle para que a rota `/segmentos/:segmento` renderize sem backend.
 *
 * ⚠️  TODO: TI reconectar (opcional) — se preferirem servir via API externa,
 * ver `src/services/segments/segments.ts`.
 */
import agronegocio from './agronegocio.json'
import baresERestaurantes from './bares-e-restaurantes.json'
import condominio from './condominio.json'
import educacional from './educacional.json'
import lazer from './lazer.json'
import religioso from './religioso.json'
import residencial from './residencial.json'
import saude from './saude.json'
import servico from './servico.json'
import turismo from './turismo.json'
import varejo from './varejo.json'

// Estrutura flexível: os JSONs alimentam PageHeader, AboutSegment, Cta e Benefits.
export interface SegmentData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export const SEGMENTS: Record<string, SegmentData> = {
  agronegocio,
  'bares-e-restaurantes': baresERestaurantes,
  condominio,
  educacional,
  lazer,
  religioso,
  residencial,
  saude,
  servico,
  turismo,
  varejo
}

/** Retorna os dados do segmento pelo slug, ou `null` se não existir. */
export const getSegmentData = (segment?: string): SegmentData | null => {
  if (!segment) return null
  return SEGMENTS[segment] ?? null
}
