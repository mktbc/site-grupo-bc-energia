import { useState } from 'react'

import {
  Accordion,
  Alert,
  Badge,
  Button,
  Card,
  Container,
  Modal,
  SectionHeader
} from '@/components'
import { Input, Select, Textarea } from '@/components/Fields'
import Seo from '@/components/Seo/Seo'

/**
 * Página interna de referência do Design System.
 *
 * NÃO indexável: noindex,nofollow, fora de INDEXABLE_ROUTES e fora do
 * sitemap. Serve apenas para desenvolvimento/QA visual dos componentes base.
 */

const COLORS: Array<{ token: string; className: string; hex: string; uso: string }> = [
  { token: 'bc-primary', className: 'bg-bc-primary', hex: '#18857D', uso: 'Marca / ações' },
  { token: 'bc-primary-hover', className: 'bg-bc-primary-hover', hex: '#146E68', uso: 'Hover' },
  { token: 'bc-dark', className: 'bg-bc-dark', hex: '#242F40', uso: 'Superfícies escuras' },
  { token: 'bc-yellow', className: 'bg-bc-yellow', hex: '#F1C035', uso: 'CTA / foco' },
  { token: 'bc-cyan', className: 'bg-bc-cyan', hex: '#24D2C8', uso: 'Destaque em escuro' },
  { token: 'bc-green-light', className: 'bg-bc-green-light', hex: '#1B9D93', uso: 'Apoio' },
  { token: 'bc-gray', className: 'bg-bc-gray', hex: '#E5E5E5', uso: 'Neutro claro' },
  { token: 'surface-muted', className: 'bg-surface-muted', hex: '#F5F5F5', uso: 'Blocos alternados' },
  { token: 'success', className: 'bg-success', hex: '#1F8455', uso: 'Sucesso' },
  { token: 'warning', className: 'bg-warning', hex: '#B37312', uso: 'Atenção' },
  { token: 'info', className: 'bg-info', hex: '#186294', uso: 'Informação' },
  { token: 'error', className: 'bg-error', hex: '#BE2A2A', uso: 'Erro' }
]

const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="bc-section-sm border-t border-border-subtle">
    <h2 className="t-h3 mb-6 text-text-primary">{title}</h2>
    {children}
  </section>
)

const DesignSystemPage = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Seo
        title="Design System — uso interno"
        description="Referência interna de componentes do Grupo BC Energia."
        noindex
        nofollow
      />

      <Container className="bc-section-lg">
        <SectionHeader
          as="h1"
          eyebrow="Uso interno"
          title="Design System Grupo BC Energia"
          description="Fundação visual: tokens, tipografia, componentes base e estados. Página não indexável."
        />

        <Block title="Cores">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {COLORS.map((color) => (
              <Card key={color.token} padding="none" className="overflow-hidden">
                <div className={`h-16 w-full ${color.className}`} />
                <div className="p-4">
                  <p className="t-label">{color.token}</p>
                  <p className="t-body-sm text-text-secondary">{color.hex}</p>
                  <p className="t-body-sm text-text-muted">{color.uso}</p>
                </div>
              </Card>
            ))}
          </div>
        </Block>

        <Block title="Tipografia">
          <div className="space-y-4">
            <p className="t-eyebrow">Eyebrow · Onest 600</p>
            <p className="t-display text-text-primary">Display</p>
            <p className="t-h1 text-text-primary">Heading 1</p>
            <p className="t-h2 text-text-primary">Heading 2</p>
            <p className="t-h3 text-text-primary">Heading 3</p>
            <p className="t-h4 text-text-primary">Heading 4</p>
            <p className="t-body-lg text-text-secondary">Body large — Onest 400.</p>
            <p className="t-body text-text-secondary">Body — Onest 400.</p>
            <p className="t-body-sm text-text-secondary">Body small — Onest 400.</p>
            <p className="t-label text-text-primary">Label</p>
            <p className="t-caption text-text-muted">Caption</p>
          </div>
        </Block>

        <Block title="Botões">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="dark">Dark</Button>
            <Button variant="green">Green</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="gray">Gray</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
            <Button variant="primary" loading>
              Loading
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-card bg-bc-dark p-6">
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="light">Light</Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button size="sm">sm</Button>
            <Button size="md">md</Button>
            <Button size="lg">lg</Button>
            <Button size="xl">xl</Button>
          </div>
        </Block>

        <Block title="Formulários">
          <div className="grid gap-5 sm:grid-cols-2">
            <Input name="name" label="Nome" placeholder="Seu nome" />
            <Input name="email" label="E-mail" placeholder="voce@empresa.com.br" required />
            <Select
              name="segment"
              label="Segmento"
              placeholder="Selecione"
              options={[
                { label: 'Comércio', value: 'comercio' },
                { label: 'Indústria', value: 'industria' }
              ]}
            />
            <Input name="city" label="Campo desabilitado" placeholder="Desabilitado" disabled />
            <Textarea name="mensagem" label="Mensagem" placeholder="Como podemos ajudar?" />
          </div>
        </Block>

        <Block title="Cards">
          <div className="grid gap-6 md:grid-cols-3">
            <Card interactive>
              <p className="t-h4 text-text-primary">Card default</p>
              <p className="t-body-sm mt-2 text-text-secondary">Superfície branca, hover discreto.</p>
            </Card>
            <Card variant="muted">
              <p className="t-h4 text-text-primary">Card muted</p>
              <p className="t-body-sm mt-2 text-text-secondary">Para blocos alternados.</p>
            </Card>
            <Card variant="dark">
              <p className="t-h4">Card dark</p>
              <p className="t-body-sm mt-2 text-white/80">Sobre fundo navy institucional.</p>
            </Card>
          </div>
        </Block>

        <Block title="Badges">
          <div className="flex flex-wrap gap-3">
            <Badge>Produto</Badge>
            <Badge variant="accent">Destaque</Badge>
            <Badge variant="neutral">Categoria</Badge>
            <Badge variant="outline">Região</Badge>
            <Badge variant="dark">Institucional</Badge>
            <Badge variant="success">Ativo</Badge>
          </div>
        </Block>

        <Block title="Alerts">
          <div className="grid gap-4 md:grid-cols-2">
            <Alert variant="info" title="Informação">
              Mensagem informativa de apoio ao formulário.
            </Alert>
            <Alert variant="success" title="Enviado">
              Recebemos seu contato.
            </Alert>
            <Alert variant="warning" title="Atenção">
              Confira os dados informados.
            </Alert>
            <Alert variant="error" title="Erro">
              Não foi possível enviar. Tente novamente.
            </Alert>
          </div>
        </Block>

        <Block title="Accordion">
          <div className="max-w-2xl rounded-card border border-border-subtle bg-surface">
            <Accordion title="Como funciona a economia na conta de energia?" content="Conteúdo de exemplo do accordion padronizado." />
            <Accordion title="Preciso trocar de distribuidora?" content="Conteúdo de exemplo do accordion padronizado." />
          </div>
        </Block>

        <Block title="Modal">
          <Button onClick={() => setModalOpen(true)}>Abrir modal</Button>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Modal base"
            footer={<Button onClick={() => setModalOpen(false)}>Fechar</Button>}
          >
            Estrutura padrão de overlay, container, foco e scroll.
          </Modal>
        </Block>

        <Block title="Radius, sombras e espaçamento">
          <div className="flex flex-wrap gap-6">
            {['rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-full'].map((r) => (
              <div key={r} className="text-center">
                <div className={`h-16 w-16 bg-bc-gray ${r}`} />
                <p className="t-caption mt-2 text-text-muted">{r}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-6">
            {['shadow-sm', 'shadow-md', 'shadow-lg'].map((s) => (
              <div key={s} className="text-center">
                <div className={`h-16 w-28 rounded-card bg-surface ${s}`} />
                <p className="t-caption mt-2 text-text-muted">{s}</p>
              </div>
            ))}
          </div>
        </Block>
      </Container>
    </>
  )
}

export default DesignSystemPage
