/**
 * Fonte única do parque de geração do Grupo BC Energia (BC Renováveis).
 *
 * Os dados vieram integralmente de `src/pages/sobre/nossas-usinas/data.ts`
 * (nomes, localizações, quantidade de usinas, potência, tipo de estrutura e
 * geração anual média). Nenhum dado técnico novo foi criado — a Home e a
 * página institucional passam a ler daqui, evitando divergência de valores.
 */
export type PowerPlant = {
  id: string
  /** Nome do complexo, como já publicado. */
  title: string
  /** Município e UF. */
  location: string
  image: string
  specs: Array<{ label: string; value: string }>
}

export const POWER_PLANTS: Array<PowerPlant> = [
  {
    id: 'aracu',
    title: 'Complexo Araçu',
    location: 'Inhumas (GO)',
    image: '/img/pages/usinas/Aracu.webp',
    specs: [
      { label: 'Usinas fotovoltaicas', value: '8' },
      { label: 'Potência total', value: '3.326,59 KWp' },
      { label: 'Tipo de estrutura', value: 'Fixa e Tracker' },
      { label: 'Geração anual média', value: '5.877,96 MWh' }
    ]
  },
  {
    id: 'barra-do-garcas',
    title: 'Complexo Barra do Garças',
    location: 'Barra do Garças (MT)',
    image: '/img/pages/usinas/Barra-do-Garcas.webp',
    specs: [
      { label: 'Usinas fotovoltaicas', value: '3' },
      { label: 'Potência total', value: '881,28 KWp' },
      { label: 'Tipo de estrutura', value: 'Fixa' },
      { label: 'Geração anual média', value: '1.378,40 MWh' }
    ]
  },
  {
    id: 'bom-sucesso',
    title: 'Complexo Bom Sucesso',
    location: 'Palmeiras de Goiás (GO)',
    image: '/img/pages/usinas/Bom-Sucesso.webp',
    specs: [
      { label: 'Usinas fotovoltaicas', value: '1' },
      { label: 'Potência total', value: '785,81 KWp' },
      { label: 'Tipo de estrutura', value: 'Fixa' },
      { label: 'Geração anual média', value: '1.261,80 MWh' }
    ]
  },
  {
    id: 'caiaponia',
    title: 'Complexo Caiapônia',
    location: 'Caiapônia (GO)',
    image: '/img/pages/usinas/Caiaponia.webp',
    specs: [
      { label: 'Usinas fotovoltaicas', value: '8' },
      { label: 'Potência total', value: '6.424,01 KWp' },
      { label: 'Tipo de estrutura', value: 'Fixa e Tracker' },
      { label: 'Geração anual média', value: '11.145,98 MWh' }
    ]
  },
  {
    id: 'palmeiras-de-goias',
    title: 'Complexo Palmeiras de Goiás',
    location: 'Palmeiras de Goiás (GO)',
    image: '/img/pages/usinas/palmeiras-de-goias-500x300.webp',
    specs: [
      { label: 'Usinas fotovoltaicas', value: '5' },
      { label: 'Potência total', value: '7.128,00 KWp' },
      { label: 'Tipo de estrutura', value: 'Tracker' },
      { label: 'Geração anual média', value: '14.378,00 MWh' }
    ]
  },
  {
    id: 'cgh-rio-bonito',
    title: 'CGH Rio Bonito',
    location: 'Caiapônia (GO)',
    image: '/img/pages/usinas/CGH-Rio-Bonito.webp',
    specs: [
      { label: 'Usinas hidrelétricas', value: '2' },
      { label: 'Potência total', value: '1.900,00 KWp' },
      { label: 'Tipo de estrutura', value: 'Hidráulica' },
      { label: 'Geração anual média', value: '5.757,63 MWh' }
    ]
  },
  {
    id: 'clareira-de-aracu',
    title: 'Complexo Clareira de Araçu',
    location: 'Inhumas (GO)',
    image: '/img/pages/usinas/ClareiradeAracu.jpg',
    specs: [
      { label: 'Usinas fotovoltaicas', value: '2' },
      { label: 'Potência total', value: '1.902,78 KWp' },
      { label: 'Tipo de estrutura', value: 'Tracker' },
      { label: 'Geração anual média', value: '3.487,70 MWh' }
    ]
  },
  {
    id: 'corumba',
    title: 'Complexo Corumbá',
    location: 'Corumbá de Goiás (GO)',
    image: '/img/pages/usinas/Corumba.jpg',
    specs: [
      { label: 'Usinas fotovoltaicas', value: '6' },
      { label: 'Potência total', value: '6.874,56 KWp' },
      { label: 'Tipo de estrutura', value: 'Tracker' },
      { label: 'Geração anual média', value: '12.697,50 MWh' }
    ]
  },
  {
    id: 'panama',
    title: 'Complexo Panamá',
    location: 'Panamá (GO)',
    image: '/img/pages/usinas/panama-1-500x300.webp',
    specs: [
      { label: 'Usinas fotovoltaicas', value: '7' },
      { label: 'Potência total', value: '491,94 KWp' },
      { label: 'Tipo de estrutura', value: 'Fixa' },
      { label: 'Geração anual média', value: '826,37 MWh' }
    ]
  },
  {
    id: 'paranoa',
    title: 'Complexo Paranoá',
    location: 'Paranoá (DF)',
    image: '/img/pages/usinas/paranoa-500x300.webp',
    specs: [
      { label: 'Usinas fotovoltaicas', value: '8' },
      { label: 'Potência total', value: '3.124,89 KWp' },
      { label: 'Tipo de estrutura', value: 'Fixa' },
      { label: 'Geração anual média', value: '5.036,31 MWh' }
    ]
  },
  {
    id: 'rio-bonito',
    title: 'Complexo Rio Bonito',
    location: 'Caiapônia (GO)',
    image: '/img/pages/usinas/ufv-rio-bonito-1-500x300.webp',
    specs: [
      { label: 'Usinas fotovoltaicas', value: '2' },
      { label: 'Potência total', value: '1.690,80 KWp' },
      { label: 'Tipo de estrutura', value: 'Fixa' },
      { label: 'Geração anual média', value: '2.633,32 MWh' }
    ]
  },
  {
    id: 'rio-monte',
    title: 'Complexo Rio Monte',
    location: 'Caiapônia (GO)',
    image: '/img/pages/usinas/ufv-rio-monte-1-500x300.webp',
    specs: [
      { label: 'Usinas fotovoltaicas', value: '3' },
      { label: 'Potência total', value: '1.337,78 KWp' },
      { label: 'Tipo de estrutura', value: 'Fixa' },
      { label: 'Geração anual média', value: '2.163,66 MWh' }
    ]
  },
  {
    id: 'varjao-de-minas',
    title: 'Complexo Varjão de Minas',
    location: 'Varjão de Minas (MG)',
    image: '/img/pages/usinas/Varjao-de-Minas.webp',
    specs: [
      { label: 'Usinas fotovoltaicas', value: '6' },
      { label: 'Potência total', value: '6.769,62 KWp' },
      { label: 'Tipo de estrutura', value: 'Tracker' },
      { label: 'Geração anual média', value: '13.495,90 MWh' }
    ]
  },
  {
    id: 'vazante',
    title: 'Complexo Vazante',
    location: 'Vazante (MG)',
    image: '/img/pages/usinas/Vazante.webp',
    specs: [
      { label: 'Usinas fotovoltaicas', value: '6' },
      { label: 'Potência total', value: '6.542,73 KWp' },
      { label: 'Tipo de estrutura', value: 'Tracker' },
      { label: 'Geração anual média', value: '13.084,90 MWh' }
    ]
  }
]

/** Quantidade de complexos cadastrados — valor derivado, nunca digitado. */
export const POWER_PLANT_COUNT = POWER_PLANTS.length

/** UFs com complexos cadastrados, na ordem em que aparecem na lista. */
export const POWER_PLANT_STATES = Array.from(
  new Set(POWER_PLANTS.map((plant) => plant.location.replace(/^.*\(([A-Z]{2})\)$/, '$1')))
)
