import Link from '@/components/Link'
import type { ContentBlock } from '@/data/content/types'
import { getHeadingIds } from '@/data/content/toc'

/**
 * Renderiza o corpo de um conteúdo editorial a partir de blocos estruturados.
 *
 * Nunca usa dangerouslySetInnerHTML: o corpo vem de dados tipados do projeto,
 * não de HTML solto. A hierarquia começa em H2 (o H1 é o título da página).
 *
 * Blocos suportados: heading, paragraph (com link contextual opcional), list,
 * quote e table (comparativos simples, com rolagem horizontal no mobile).
 *
 * Headings recebem id estável (`getHeadingIds`, o mesmo usado pelo sumário)
 * e `scroll-mt` para não ficarem sob o header fixo. Ritmo: 24px entre
 * blocos e respiro maior antes de cada H2, que marca a troca de seção.
 */
const ContentBody = ({ blocks, ctaName }: { blocks: ContentBlock[]; ctaName?: string }) => {
  if (!blocks?.length) return null

  const headingIds = getHeadingIds(blocks)

  return (
    <div className="mx-auto flex w-full max-w-[78ch] flex-col gap-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading': {
            const Tag = block.level === 2 ? 'h2' : 'h3'
            return (
              <Tag
                key={index}
                id={headingIds[index]}
                className={
                  block.level === 2
                    ? 'mt-10 scroll-mt-28 t-h3 text-text-primary first:mt-0'
                    : 'mt-2 scroll-mt-28 t-h4 text-text-primary'
                }
              >
                {block.text}
              </Tag>
            )
          }
          case 'paragraph':
            return (
              <p key={index} className="t-body-lg text-text-secondary">
                {block.text}
                {block.link && (
                  <>
                    {' '}
                    <Link
                      href={block.link.href}
                      className="font-semibold text-text-accent underline underline-offset-4 hover:text-bc-primary"
                      data-cta-name={
                        block.link.cta && ctaName ? `${ctaName}-inline` : undefined
                      }
                    >
                      {block.link.label}
                    </Link>
                  </>
                )}
              </p>
            )
          case 'list': {
            const Tag = block.ordered ? 'ol' : 'ul'
            return (
              <Tag
                key={index}
                className={`flex list-outside flex-col gap-2 pl-6 t-body-lg text-text-secondary ${ block.ordered ? 'list-decimal' : 'list-disc' }`}
              >
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </Tag>
            )
          }
          case 'table':
            return (
              <div key={index} className="-mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0">
                <table className="w-full min-w-[34rem] border-collapse text-left t-body text-text-secondary">
                  {block.caption && (
                    <caption className="mb-3 text-left t-body text-text-secondary">
                      {block.caption}
                    </caption>
                  )}
                  <thead>
                    <tr>
                      {block.columns.map((column) => (
                        <th
                          key={column}
                          scope="col"
                          className="border-b border-border-subtle bg-surface-muted p-4 align-top font-semibold text-text-primary"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) =>
                          cellIndex === 0 ? (
                            <th
                              key={cellIndex}
                              scope="row"
                              className="border-b border-border-subtle p-4 align-top font-semibold text-text-primary"
                            >
                              {cell}
                            </th>
                          ) : (
                            <td
                              key={cellIndex}
                              className="border-b border-border-subtle p-4 align-top"
                            >
                              {cell}
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case 'quote':
            return (
              <blockquote
                key={index}
                className="bc-editorial-rule rounded-r-[16px] bg-surface-muted px-6 py-5 t-body-lg italic text-text-primary shadow-sm"
              >
                <p>{block.text}</p>
                {block.source && (
                  <cite className="mt-2 block text-caption not-italic text-text-secondary">
                    {block.source}
                  </cite>
                )}
              </blockquote>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

export default ContentBody
