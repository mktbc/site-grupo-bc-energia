/**
 * Catálogo da iconografia oficial do Grupo BC Energia.
 *
 * Os arquivos originais do pacote da marca ("Ativo 1" a "Ativo 35") foram
 * mantidos sem qualquer alteração de traço ou cor (#18857D) e apenas
 * renomeados para nomes semânticos em `src/assets/icons/bc/`.
 *
 * Regras de uso:
 *  - sempre priorizar estes ícones em vez de bibliotecas genéricas;
 *  - ícone decorativo (acompanhado de texto) → `decorative` (padrão) → aria-hidden;
 *  - ícone com significado próprio → passar `label` (vira alt/aria-label).
 */

const iconFiles = import.meta.glob('../assets/icons/bc/*.svg', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>

const resolve = (name: string): string => iconFiles[`../assets/icons/bc/${name}.svg`]

export type BCIconCategory =
  | 'economia'
  | 'solar'
  | 'baterias'
  | 'sustentabilidade'
  | 'gestao'
  | 'mercado'
  | 'mobilidade'

export type BCIconMeta = {
  /** Arquivo original no pacote oficial da marca. */
  asset: string
  category: BCIconCategory
  /** Descrição curta do desenho — apoia a escolha do ícone certo. */
  description: string
  src: string
}

const raw = {
  /* ------------------------------- Economia ------------------------------ */
  'economia-dinheiro': { asset: 'Ativo 1', category: 'economia', description: 'Cédulas e moedas' },
  'meta-economia': { asset: 'Ativo 2', category: 'economia', description: 'Alvo com cifrão' },
  'economia-na-mao': { asset: 'Ativo 3', category: 'economia', description: 'Mão com moeda' },
  'economia-na-conta': {
    asset: 'Ativo 33',
    category: 'economia',
    description: 'Mão com saco de dinheiro'
  },
  'contrato-aprovado': {
    asset: 'Ativo 34',
    category: 'economia',
    description: 'Contrato assinado com selo de aprovação'
  },
  'fatura-energia': {
    asset: 'Ativo 35',
    category: 'economia',
    description: 'Conta de energia com cifrão'
  },

  /* --------------------------------- Solar ------------------------------- */
  'energia-solar': { asset: 'Ativo 6', category: 'solar', description: 'Sol sobre painel solar' },
  'painel-solar-conexao': {
    asset: 'Ativo 7',
    category: 'solar',
    description: 'Painel solar com cabo de conexão'
  },
  'eficiencia-energetica-solar': {
    asset: 'Ativo 8',
    category: 'solar',
    description: 'Painel solar ligado a lâmpada'
  },
  'solar-armazenamento': {
    asset: 'Ativo 9',
    category: 'solar',
    description: 'Painel solar com bateria'
  },
  'solar-baterias': {
    asset: 'Ativo 10',
    category: 'solar',
    description: 'Painel solar com duas baterias'
  },
  'usina-solar': {
    asset: 'Ativo 17',
    category: 'solar',
    description: 'Usina solar com sol e nuvens'
  },
  'solar-residencial': {
    asset: 'Ativo 22',
    category: 'solar',
    description: 'Casa com painel solar'
  },
  'geracao-distribuida': {
    asset: 'Ativo 23',
    category: 'solar',
    description: 'Painel solar enviando energia para uma casa'
  },
  'autoconsumo-solar': {
    asset: 'Ativo 26',
    category: 'solar',
    description: 'Casa com painel solar e tomada'
  },
  'painel-solar': { asset: 'Ativo 27', category: 'solar', description: 'Painel solar com sol' },
  'gestao-geracao-solar': {
    asset: 'Ativo 29',
    category: 'solar',
    description: 'Engrenagem com painel solar'
  },

  /* ------------------------------- Baterias ------------------------------ */
  'carregamento-dispositivos': {
    asset: 'Ativo 12',
    category: 'baterias',
    description: 'Dispositivos em carregamento'
  },
  'monitoramento-consumo': {
    asset: 'Ativo 13',
    category: 'baterias',
    description: 'Celular monitorando carga'
  },
  'bateria-energia': {
    asset: 'Ativo 24',
    category: 'baterias',
    description: 'Bateria com raio de energia'
  },
  'bateria-carga': {
    asset: 'Ativo 32',
    category: 'baterias',
    description: 'Bateria carregada'
  },

  /* ---------------------------- Sustentabilidade ------------------------- */
  'gestao-sustentavel': {
    asset: 'Ativo 14',
    category: 'sustentabilidade',
    description: 'Engrenagem com folha'
  },
  'ciclo-recursos': {
    asset: 'Ativo 16',
    category: 'sustentabilidade',
    description: 'Gota d’água em ciclo'
  },
  'energia-limpa': {
    asset: 'Ativo 18',
    category: 'sustentabilidade',
    description: 'Planta ligada a uma tomada'
  },
  'planeta-sustentavel': {
    asset: 'Ativo 19',
    category: 'sustentabilidade',
    description: 'Planeta com folhas'
  },
  'inovacao-sustentavel': {
    asset: 'Ativo 20',
    category: 'sustentabilidade',
    description: 'Lâmpada em forma de planta'
  },
  'ciclo-energia-renovavel': {
    asset: 'Ativo 30',
    category: 'sustentabilidade',
    description: 'Planeta com sol e setas de ciclo'
  },
  'energia-eolica': {
    asset: 'Ativo 31',
    category: 'sustentabilidade',
    description: 'Turbinas eólicas com sol'
  },
  'parque-eolico-solar': {
    asset: 'Ativo 25',
    category: 'sustentabilidade',
    description: 'Parque eólico e solar'
  },
  'clima-energia': {
    asset: 'Ativo 11',
    category: 'sustentabilidade',
    description: 'Nuvens com raios de energia'
  },

  /* --------------------------------- Gestão ------------------------------ */
  'gestao-energia-renovavel': {
    asset: 'Ativo 5',
    category: 'gestao',
    description: 'Engrenagem com turbina eólica'
  },
  'eficiencia-energetica': {
    asset: 'Ativo 21',
    category: 'gestao',
    description: 'Engrenagem com raio'
  },

  /* -------------------------------- Mercado ------------------------------ */
  'mercado-crescimento': {
    asset: 'Ativo 4',
    category: 'mercado',
    description: 'Planeta com moedas e gráfico de crescimento'
  },
  'energia-global': {
    asset: 'Ativo 28',
    category: 'mercado',
    description: 'Planeta com lâmpada e tomada'
  },

  /* ------------------------------ Mobilidade ----------------------------- */
  'mobilidade-eletrica': {
    asset: 'Ativo 15',
    category: 'mobilidade',
    description: 'Estação de recarga de veículo elétrico'
  }
} as const satisfies Record<string, Omit<BCIconMeta, 'src'>>

export type BCIconName = keyof typeof raw

export const BC_ICONS: Record<BCIconName, BCIconMeta> = Object.fromEntries(
  Object.entries(raw).map(([name, meta]) => [name, { ...meta, src: resolve(name) }])
) as Record<BCIconName, BCIconMeta>

export const BC_ICON_NAMES = Object.keys(BC_ICONS) as Array<BCIconName>

export const getBCIcon = (name: BCIconName): string => BC_ICONS[name].src

export const getBCIconsByCategory = (category: BCIconCategory): Array<BCIconName> =>
  BC_ICON_NAMES.filter((name) => BC_ICONS[name].category === category)
