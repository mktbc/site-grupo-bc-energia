import type { ContentBlock } from './types'

export type TocItem = { id: string; text: string }

/**
 * Slug estável a partir do texto do heading (sem acentos, minúsculo, hífens).
 * Mudar o texto do heading muda o id — por isso `block.id`, quando existir
 * nos dados, sempre tem prioridade.
 */
export const slugifyHeading = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)

/** IDs únicos para cada bloco de heading (undefined para os demais blocos). */
export const getHeadingIds = (blocks: ContentBlock[]): Array<string | undefined> => {
  const used = new Map<string, number>()

  return blocks.map((block) => {
    if (block.type !== 'heading') return undefined
    const base = block.id ?? slugifyHeading(block.text)
    const count = used.get(base) ?? 0
    used.set(base, count + 1)
    return count ? `${base}-${count + 1}` : base
  })
}

/** Sumário do corpo: somente os H2 reais, na ordem do texto. */
export const getToc = (blocks: ContentBlock[]): Array<TocItem> => {
  const ids = getHeadingIds(blocks)

  return blocks.flatMap((block, index) =>
    block.type === 'heading' && block.level === 2 && ids[index]
      ? [{ id: ids[index] as string, text: block.text }]
      : []
  )
}
