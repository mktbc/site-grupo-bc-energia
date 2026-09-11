import { PageHeader } from '@/components'
import { ContentEmptyState, ContentSection } from '@/components/Content'
import { CLUSTERS, CLUSTER_LIST } from '@/data/content/clusters'
import { getArticles } from '@/data/content/articles'
import BlogEditorialHub from './BlogEditorialHub'


/**
 * Hub do Blog — /conteudo/blog (VISUAL 15)
 *
 * Com pouco volume publicado, a página não simula um portal: um artigo
 * protagonista bem resolvido e, quando existirem, os demais em lista editorial.
 * Nenhum placeholder, nenhum card fictício.
 *
 * Fonte: src/data/content/articles.ts. Indexação: noindex,follow.
 */
const Blog = () => {
  const articles = getArticles()
  const [featured, ...rest] = articles

  return (
    <>
      <PageHeader
        title="Blog"
        eyebrow="Conteúdo"
        description="Conteúdos sobre mercado livre de energia, geração distribuída, gestão de energia e redução de custo na conta de luz."
        category="Conteúdo"
        align="left"
        bgImage="/img/pages/contact.webp"
      />

      {articles.length === 0 ? (
        <ContentSection>
          <ContentEmptyState
            title="Os primeiros artigos estão em produção"
            description="O plano editorial já está definido por tema. Enquanto os artigos não são publicados, veja as páginas que explicam cada solução do Grupo BC Energia."
            links={CLUSTER_LIST.map((cluster) => ({
              label: `${cluster.name}: como funciona`,
              href: cluster.moneyPath
            }))}
          />
        </ContentSection>
      ) : (
        <BlogEditorialHub
          featured={featured}
          featuredKind={CLUSTERS[featured.cluster]?.name ?? 'Artigo'}
          featureTitle={rest.length > 0 ? 'Em destaque' : 'O artigo mais recente'}
          rest={rest}
          clusters={CLUSTER_LIST}
        />
      )}

    </>
  )
}

export default Blog
