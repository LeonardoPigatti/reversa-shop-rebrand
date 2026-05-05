import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import './AuthPage.css'

export default function AuthPage({ onSuccess, onBack }) {
  const { login, registro } = useAuth()
  const [modo, setModo] = useState('login') // 'login' | 'registro'
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(null)

  const [form, setForm] = useState({
    nome: '', email: '', senha: '', confirmarSenha: '',
    cpf: '', telefone: '', nascimento: '', genero: '',
  })

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro(null)

    if (modo === 'registro' && form.senha !== form.confirmarSenha) {
      setErro('As senhas não coincidem.')
      return
    }

    setLoading(true)
    try {
      if (modo === 'login') {
        await login(form.email, form.senha)
      } else {
        await registro({
          nome: form.nome,
          email: form.email,
          senha: form.senha,
          cpf: form.cpf,
          telefone: form.telefone,
          nascimento: form.nascimento,
          genero: form.genero,
        })
      }
      onSuccess?.()
    } catch (err) {
      setErro(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Cantos decorativos */}
        <div className="auth-corner auth-corner--tl" />
        <div className="auth-corner auth-corner--tr" />
        <div className="auth-corner auth-corner--bl" />
        <div className="auth-corner auth-corner--br" />

        <button className="auth-back" onClick={onBack}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          VOLTAR
        </button>

        <h1 className="auth-title">
          {modo === 'login' ? 'ENTRAR' : 'CRIAR CONTA'}
        </h1>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${modo === 'login' ? 'auth-tab--active' : ''}`}
            onClick={() => { setModo('login'); setErro(null) }}
          >
            LOGIN
          </button>
          <button
            className={`auth-tab ${modo === 'registro' ? 'auth-tab--active' : ''}`}
            onClick={() => { setModo('registro'); setErro(null) }}
          >
            CADASTRO
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>

          {modo === 'registro' && (
            <div className="auth-field">
              <label className="auth-label">Nome completo</label>
              <input className="auth-input" placeholder="Seu nome" value={form.nome} onChange={set('nome')} required />
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label">E-mail</label>
            <input className="auth-input" type="email" placeholder="seu@email.com" value={form.email} onChange={set('email')} required />
          </div>

          <div className="auth-field">
            <label className="auth-label">Senha</label>
            <input className="auth-input" type="password" placeholder="••••••••" value={form.senha} onChange={set('senha')} required />
          </div>

          {modo === 'registro' && (
            <>
              <div className="auth-field">
                <label className="auth-label">Confirmar senha</label>
                <input className="auth-input" type="password" placeholder="••••••••" value={form.confirmarSenha} onChange={set('confirmarSenha')} required />
              </div>

              <div className="auth-row">
                <div className="auth-field">
                  <label className="auth-label">CPF</label>
                  <input className="auth-input" placeholder="000.000.000-00" value={form.cpf} onChange={set('cpf')} />
                </div>
                <div className="auth-field">
                  <label className="auth-label">Telefone</label>
                  <input className="auth-input" placeholder="(11) 99999-9999" value={form.telefone} onChange={set('telefone')} />
                </div>
              </div>

              <div className="auth-row">
                <div className="auth-field">
                  <label className="auth-label">Nascimento</label>
                  <input className="auth-input" placeholder="DD/MM/AAAA" value={form.nascimento} onChange={set('nascimento')} />
                </div>
                <div className="auth-field">
                  <label className="auth-label">Gênero</label>
                  <select className="auth-input" value={form.genero} onChange={set('genero')}>
                    <option value="">Selecionar</option>
                    <option value="feminino">Feminino</option>
                    <option value="masculino">Masculino</option>
                    <option value="nao-binario">Não-binário</option>
                    <option value="prefiro-nao">Prefiro não informar</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {erro && <p className="auth-erro">{erro}</p>}

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? 'AGUARDE...' : modo === 'login' ? 'ENTRAR' : 'CRIAR CONTA'}
          </button>

          {modo === 'login' && (
            <p className="auth-switch">
              Não tem conta?{' '}
              <button type="button" className="auth-switch__btn" onClick={() => { setModo('registro'); setErro(null) }}>
                Cadastre-se
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  )
}