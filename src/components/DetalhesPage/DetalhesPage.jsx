import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import './DetalhesPage.css'

const GENEROS = [
  { value: 'feminino',    label: 'Feminino' },
  { value: 'masculino',   label: 'Masculino' },
  { value: 'nao-binario', label: 'Não-binário' },
  { value: 'prefiro-nao', label: 'Prefiro não informar' },
]

function Field({ label, id, type = 'text', value, onChange, placeholder, readOnly }) {
  return (
    <div className="det-field">
      <label className="det-label" htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        className={`det-input ${readOnly ? 'det-input--readonly' : ''}`}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </div>
  )
}

export default function DetalhesPage() {
  const { user, login } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [sucesso, setSucesso] = useState(null)
  const [erro, setErro] = useState(null)
  const [tab, setTab] = useState('dados') // 'dados' | 'senha'

  const [form, setForm] = useState({
    nome: '', email: '', cpf: '', telefone: '', nascimento: '', genero: '',
  })

  const [senhaForm, setSenhaForm] = useState({
    senhaAtual: '', novaSenha: '', confirmar: '',
  })

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }))
  const setSenha = (key) => (val) => setSenhaForm((f) => ({ ...f, [key]: val }))

  // Carregar dados atuais
  useEffect(() => {
    const token = localStorage.getItem('rvlt_token')
    if (!token) return
    fetch('http://localhost:5000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setForm({
          nome:       data.nome       ?? '',
          email:      data.email      ?? '',
          cpf:        data.cpf        ?? '',
          telefone:   data.telefone   ?? '',
          nascimento: data.nascimento ?? '',
          genero:     data.genero     ?? '',
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const salvarDados = async (e) => {
    e.preventDefault()
    setSaving(true)
    setErro(null)
    setSucesso(null)
    try {
      const token = localStorage.getItem('rvlt_token')
      const res = await fetch('http://localhost:5000/api/auth/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      // Atualiza token e user no localStorage
      localStorage.setItem('rvlt_token', data.token)
      localStorage.setItem('rvlt_user', JSON.stringify(data.user))

      setSucesso('Dados atualizados com sucesso!')
    } catch (err) {
      setErro(err.message)
    } finally {
      setSaving(false)
    }
  }

  const salvarSenha = async (e) => {
    e.preventDefault()
    setErro(null)
    setSucesso(null)
    if (senhaForm.novaSenha !== senhaForm.confirmar) {
      setErro('As senhas não coincidem.')
      return
    }
    if (senhaForm.novaSenha.length < 6) {
      setErro('A nova senha deve ter pelo menos 6 caracteres.')
      return
    }
    setSaving(true)
    try {
      const token = localStorage.getItem('rvlt_token')
      const res = await fetch('http://localhost:5000/api/auth/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          senhaAtual: senhaForm.senhaAtual,
          novaSenha:  senhaForm.novaSenha,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      localStorage.setItem('rvlt_token', data.token)
      setSenhaForm({ senhaAtual: '', novaSenha: '', confirmar: '' })
      setSucesso('Senha alterada com sucesso!')
    } catch (err) {
      setErro(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="det-loading">
        <span className="det-spinner" />
        Carregando...
      </div>
    )
  }

  return (
    <div className="det-page">
      <div className="det-header">
        <h1 className="det-title">DETALHES DA CONTA</h1>
        <p className="det-sub">Gerencie suas informações pessoais</p>
      </div>

      {/* Tabs */}
      <div className="det-tabs">
        <button
          className={`det-tab ${tab === 'dados' ? 'det-tab--active' : ''}`}
          onClick={() => { setTab('dados'); setErro(null); setSucesso(null) }}
        >
          DADOS PESSOAIS
        </button>
        <button
          className={`det-tab ${tab === 'senha' ? 'det-tab--active' : ''}`}
          onClick={() => { setTab('senha'); setErro(null); setSucesso(null) }}
        >
          ALTERAR SENHA
        </button>
      </div>

      <div className="det-body">

        {/* ── Dados pessoais ── */}
        {tab === 'dados' && (
          <form className="det-form" onSubmit={salvarDados}>
            <div className="det-section">
              <p className="det-section__title">INFORMAÇÕES BÁSICAS</p>
              <div className="det-row">
                <Field label="Nome completo" id="nome" value={form.nome} onChange={set('nome')} placeholder="Seu nome" />
                <Field label="E-mail" id="email" type="email" value={form.email} onChange={set('email')} placeholder="seu@email.com" />
              </div>
              <div className="det-row">
                <Field label="CPF" id="cpf" value={form.cpf} onChange={set('cpf')} placeholder="000.000.000-00" />
                <Field label="Telefone / WhatsApp" id="tel" value={form.telefone} onChange={set('telefone')} placeholder="(11) 99999-9999" />
              </div>
              <div className="det-row">
                <Field label="Data de nascimento" id="nasc" value={form.nascimento} onChange={set('nascimento')} placeholder="DD/MM/AAAA" />
                <div className="det-field">
                  <label className="det-label">Gênero</label>
                  <select className="det-input" value={form.genero} onChange={(e) => set('genero')(e.target.value)}>
                    <option value="">Selecionar</option>
                    {GENEROS.map((g) => (
                      <option key={g.value} value={g.value}>{g.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {erro && <p className="det-erro">{erro}</p>}
            {sucesso && <p className="det-sucesso">✓ {sucesso}</p>}

            <button className="det-submit" type="submit" disabled={saving}>
              {saving ? 'SALVANDO...' : 'SALVAR ALTERAÇÕES'}
            </button>
          </form>
        )}

        {/* ── Senha ── */}
        {tab === 'senha' && (
          <form className="det-form" onSubmit={salvarSenha}>
            <div className="det-section">
              <p className="det-section__title">ALTERAR SENHA</p>
              <p className="det-section__hint">A senha deve ter no mínimo 6 caracteres.</p>
              <div className="det-col">
                <Field label="Senha atual" id="senhaAtual" type="password" value={senhaForm.senhaAtual} onChange={setSenha('senhaAtual')} placeholder="••••••••" />
                <Field label="Nova senha" id="novaSenha" type="password" value={senhaForm.novaSenha} onChange={setSenha('novaSenha')} placeholder="••••••••" />
                <Field label="Confirmar nova senha" id="confirmar" type="password" value={senhaForm.confirmar} onChange={setSenha('confirmar')} placeholder="••••••••" />
              </div>
            </div>

            {erro && <p className="det-erro">{erro}</p>}
            {sucesso && <p className="det-sucesso">✓ {sucesso}</p>}

            <button className="det-submit" type="submit" disabled={saving}>
              {saving ? 'SALVANDO...' : 'ALTERAR SENHA'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}