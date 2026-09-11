import { useEffect, useRef, useState } from 'react'

import './bc-form.css'

import { getSupabase } from '@/lib/supabase'
import { getFormUtms, useFormTracking } from '@/lib/analytics'

type FormState = {
  nome: string
  email: string
  whatsapp: string
  empresa: string
  cnpj: string
  cargo: string
  estado: string
  distribuidora: string
  situacaoAtual: string
  valorFatura: string
}

type FormErrors = Partial<Record<keyof FormState, string | null>>

interface FormularioMercadoLivreProps {
  solucao?: string
  showIntro?: boolean
  introText?: string
}

const UTM_DEFAULTS: Record<string, string> = {
  utm_fonte: 'Marketing',
  utm_medium: 'organic',
  utm_campaign: 'SEO',
  utm_channel: 'Formulario Site'
}

// Envio via Edge Function `form-webhook` (Supabase). Secret: FORM_WEBHOOK_URL.

const ESTADOS_BR = [
  { value: 'AC', label: 'Acre (AC)' },
  { value: 'AL', label: 'Alagoas (AL)' },
  { value: 'AP', label: 'Amapá (AP)' },
  { value: 'AM', label: 'Amazonas (AM)' },
  { value: 'BA', label: 'Bahia (BA)' },
  { value: 'CE', label: 'Ceará (CE)' },
  { value: 'DF', label: 'Distrito Federal (DF)' },
  { value: 'ES', label: 'Espírito Santo (ES)' },
  { value: 'GO', label: 'Goiás (GO)' },
  { value: 'MA', label: 'Maranhão (MA)' },
  { value: 'MT', label: 'Mato Grosso (MT)' },
  { value: 'MS', label: 'Mato Grosso do Sul (MS)' },
  { value: 'MG', label: 'Minas Gerais (MG)' },
  { value: 'PA', label: 'Pará (PA)' },
  { value: 'PB', label: 'Paraíba (PB)' },
  { value: 'PR', label: 'Paraná (PR)' },
  { value: 'PE', label: 'Pernambuco (PE)' },
  { value: 'PI', label: 'Piauí (PI)' },
  { value: 'RJ', label: 'Rio de Janeiro (RJ)' },
  { value: 'RN', label: 'Rio Grande do Norte (RN)' },
  { value: 'RS', label: 'Rio Grande do Sul (RS)' },
  { value: 'RO', label: 'Rondônia (RO)' },
  { value: 'RR', label: 'Roraima (RR)' },
  { value: 'SC', label: 'Santa Catarina (SC)' },
  { value: 'SP', label: 'São Paulo (SP)' },
  { value: 'SE', label: 'Sergipe (SE)' },
  { value: 'TO', label: 'Tocantins (TO)' }
]

const FormularioMercadoLivre = ({
  solucao = 'mercado_livre',
  showIntro = false,
  introText = 'Preencha o formulário abaixo e um de nossos consultores entrará em contato para avaliar a migração da sua empresa para o Mercado Livre de Energia.'
}: FormularioMercadoLivreProps) => {
  const [form, setForm] = useState<FormState>({
    nome: '',
    email: '',
    whatsapp: '',
    empresa: '',
    cnpj: '',
    cargo: '',
    estado: 'GO',
    distribuidora: '',
    situacaoAtual: '',
    valorFatura: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (success && successRef.current) {
      successRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [success])

  // Tracking do formulário (form_start / form_error / form_submit + lead_generated)
  const { onFormStart, onValidationError, onSubmitError, onSubmitSuccess } =
    useFormTracking('mercado_livre')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onFormStart()
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleValorFaturaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFormStart()
    const raw = e.target.value.replace(/[^\d.,]/g, '')
    setForm((prev) => ({ ...prev, valorFatura: raw }))
    if (errors.valorFatura) setErrors((prev) => ({ ...prev, valorFatura: null }))
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!form.nome.trim()) newErrors.nome = 'Preencha este campo.'
    if (!form.email.trim()) newErrors.email = 'Preencha este campo.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'E-mail inválido.'
    if (!form.whatsapp.trim()) newErrors.whatsapp = 'Preencha este campo.'
    if (!form.empresa.trim()) newErrors.empresa = 'Preencha este campo.'
    if (!form.cnpj.trim()) newErrors.cnpj = 'Preencha este campo.'
    if (!form.cargo.trim()) newErrors.cargo = 'Preencha este campo.'
    if (!form.distribuidora.trim()) newErrors.distribuidora = 'Preencha este campo.'
    if (!form.situacaoAtual) newErrors.situacaoAtual = 'Selecione uma opção.'
    if (!form.valorFatura.trim()) newErrors.valorFatura = 'Preencha este campo.'
    else {
      const numericValue = Number(form.valorFatura.replace(/\./g, '').replace(',', '.'))
      if (isNaN(numericValue) || numericValue <= 0)
        newErrors.valorFatura = 'Informe um valor válido.'
    }
    setErrors(newErrors)
    const invalidFields = Object.keys(newErrors)
    if (invalidFields.length > 0) onValidationError(invalidFields)
    return invalidFields.length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) {
      // Acessibilidade: leva o foco para o primeiro campo com erro
      window.setTimeout(() => {
        const first = document.querySelector<HTMLElement>(
          '.bc-form .bcf-input.error, .bc-form .bcf-select.error, .bc-form .bcf-textarea.error'
        )
        first?.focus()
        first?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }, 0)
      return
    }

    setLoading(true)
    setSubmitError(false)
    try {
      // Origem: URL atual > UTMs persistidas na sessão > padrão do site.
      const utms = getFormUtms(UTM_DEFAULTS)

      const payload = {
        ...form,
        whatsapp: form.whatsapp.replace(/\D/g, ''),
        ...utms,
        solucao,
        paginaOrigem: window.location.href,
        dataHoraEnvio: new Date().toISOString()
      }

      const { error } = await (await getSupabase()).functions.invoke('form-webhook', {
        body: payload
      })
      if (error) throw error

      setSuccess(true)
      onSubmitSuccess()
    } catch {
      setSubmitError(true)
      onSubmitError()
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div ref={successRef} className="mx-4 mb-6 rounded-lg bg-white p-8 text-center">
        <p className="t-h4 font-bold text-teal-700">Mensagem enviada com sucesso!</p>
        <p className="mt-2 text-gray-600">Em breve, um de nossos consultores entrará em contato.</p>
      </div>
    )
  }

  return (
    <form className="bc-form" onSubmit={handleSubmit} noValidate>
      {showIntro && <p className="bcf-intro">{introText}</p>}

      {submitError && (
        <p role="alert" className="mb-4 text-center t-label text-error">
          Ocorreu um erro ao enviar. Por favor, tente novamente ou fale conosco pelo WhatsApp.
        </p>
      )}

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="ml-nome">
            Nome completo<span className="bcf-required">*</span>
          </label>
          <input
            id="ml-nome"
            name="nome"
            aria-invalid={errors.nome ? true : undefined}
            aria-describedby={errors.nome ? 'ml-nome-error' : undefined}
            type="text"
            className={`bcf-input${errors.nome ? ' error' : ''}`}
            value={form.nome}
            onChange={handleChange}
          />
          {errors.nome && <span id="ml-nome-error" role="alert" className="bcf-error-text">{errors.nome}</span>}
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="ml-email">
            E-mail corporativo<span className="bcf-required">*</span>
          </label>
          <input
            id="ml-email"
            name="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'ml-email-error' : undefined}
            type="email"
            className={`bcf-input${errors.email ? ' error' : ''}`}
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <span id="ml-email-error" role="alert" className="bcf-error-text">{errors.email}</span>}
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="ml-whatsapp">
            WhatsApp<span className="bcf-required">*</span>
          </label>
          <input
            id="ml-whatsapp"
            name="whatsapp"
            aria-invalid={errors.whatsapp ? true : undefined}
            aria-describedby={errors.whatsapp ? 'ml-whatsapp-error' : undefined}
            type="tel"
            className={`bcf-input${errors.whatsapp ? ' error' : ''}`}
            placeholder="(XX) XXXXX-XXXX"
            value={form.whatsapp}
            onChange={handleChange}
          />
          {errors.whatsapp && <span id="ml-whatsapp-error" role="alert" className="bcf-error-text">{errors.whatsapp}</span>}
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="ml-empresa">
            Empresa<span className="bcf-required">*</span>
          </label>
          <input
            id="ml-empresa"
            name="empresa"
            aria-invalid={errors.empresa ? true : undefined}
            aria-describedby={errors.empresa ? 'ml-empresa-error' : undefined}
            type="text"
            className={`bcf-input${errors.empresa ? ' error' : ''}`}
            value={form.empresa}
            onChange={handleChange}
          />
          {errors.empresa && <span id="ml-empresa-error" role="alert" className="bcf-error-text">{errors.empresa}</span>}
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="ml-cnpj">
            CNPJ<span className="bcf-required">*</span>
          </label>
          <input
            id="ml-cnpj"
            name="cnpj"
            aria-invalid={errors.cnpj ? true : undefined}
            aria-describedby={errors.cnpj ? 'ml-cnpj-error' : undefined}
            type="text"
            className={`bcf-input${errors.cnpj ? ' error' : ''}`}
            placeholder="XX.XXX.XXX/XXXX-XX"
            value={form.cnpj}
            onChange={handleChange}
          />
          {errors.cnpj && <span id="ml-cnpj-error" role="alert" className="bcf-error-text">{errors.cnpj}</span>}
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="ml-cargo">
            Cargo<span className="bcf-required">*</span>
          </label>
          <input
            id="ml-cargo"
            name="cargo"
            aria-invalid={errors.cargo ? true : undefined}
            aria-describedby={errors.cargo ? 'ml-cargo-error' : undefined}
            type="text"
            className={`bcf-input${errors.cargo ? ' error' : ''}`}
            value={form.cargo}
            onChange={handleChange}
          />
          {errors.cargo && <span id="ml-cargo-error" role="alert" className="bcf-error-text">{errors.cargo}</span>}
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="ml-estado">
            Estado<span className="bcf-required">*</span>
          </label>
          <select
            id="ml-estado"
            name="estado"
            aria-invalid={errors.estado ? true : undefined}
            aria-describedby={errors.estado ? 'ml-estado-error' : undefined}
            className="bcf-select"
            value={form.estado}
            onChange={handleChange}
          >
            {ESTADOS_BR.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="ml-distribuidora">
            Distribuidora atual<span className="bcf-required">*</span>
          </label>
          <input
            id="ml-distribuidora"
            name="distribuidora"
            aria-invalid={errors.distribuidora ? true : undefined}
            aria-describedby={errors.distribuidora ? 'ml-distribuidora-error' : undefined}
            type="text"
            className={`bcf-input${errors.distribuidora ? ' error' : ''}`}
            placeholder="Ex: Equatorial, Cemig, Energisa"
            value={form.distribuidora}
            onChange={handleChange}
          />
          {errors.distribuidora && <span id="ml-distribuidora-error" role="alert" className="bcf-error-text">{errors.distribuidora}</span>}
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="ml-situacaoAtual">
            Situação atual<span className="bcf-required">*</span>
          </label>
          <select
            id="ml-situacaoAtual"
            name="situacaoAtual"
            aria-invalid={errors.situacaoAtual ? true : undefined}
            aria-describedby={errors.situacaoAtual ? 'ml-situacaoAtual-error' : undefined}
            className={`bcf-select${errors.situacaoAtual ? ' error' : ''}`}
            value={form.situacaoAtual}
            onChange={handleChange}
          >
            <option value="">Selecione uma opção</option>
            <option value="Cativo">Ainda no mercado cativo</option>
            <option value="MercadoLivre">Já estou no Mercado Livre</option>
            <option value="Migracao">Em processo de migração</option>
          </select>
          {errors.situacaoAtual && <span id="ml-situacaoAtual-error" role="alert" className="bcf-error-text">{errors.situacaoAtual}</span>}
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="ml-valorFatura">
            Valor médio da fatura de energia (R$)<span className="bcf-required">*</span>
          </label>
          <input
            id="ml-valorFatura"
            name="valorFatura"
            aria-invalid={errors.valorFatura ? true : undefined}
            aria-describedby={errors.valorFatura ? 'ml-valorFatura-error' : undefined}
            type="text"
            inputMode="decimal"
            className={`bcf-input${errors.valorFatura ? ' error' : ''}`}
            placeholder="Ex: 50.000,00"
            value={form.valorFatura}
            onChange={handleValorFaturaChange}
          />
          {errors.valorFatura && <span id="ml-valorFatura-error" role="alert" className="bcf-error-text">{errors.valorFatura}</span>}
        </div>
      </div>

      <div className="bcf-submit-wrap">
        <button type="submit" className="bcf-submit" disabled={loading}>
          {loading ? 'ENVIANDO...' : 'ENVIAR'}
        </button>
      </div>
    </form>
  )
}

export default FormularioMercadoLivre
