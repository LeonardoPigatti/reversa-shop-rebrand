import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import './AuthSidebar.css'

export default function AuthSidebar({ isOpen, onClose }) {
  const { login, registro } = useAuth()
  const [modo, setModo] = useState('login')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(null)

  const [form, setForm] = useState({
    nome: '', email: '', senha: '', confirmarSenha: '',
    cpf: '', telefone: '', nascimento: '', genero: '',
  })

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const trocarModo = (m) => { setModo(m); setErro(null) }

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
      // Reseta o form e fecha
      setForm({ nome: '', email: '', senha: '', confirmarSenha: '', cpf: '', telefone: '', nascimento: '', genero: '' })
      setErro(null)
      onClose()
    } catch (err) {
      setErro(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setErro(null)
    onClose()
  }

  return (
    <>
      <div
        className={`auth-overlay ${isOpen ? 'auth-overlay--visible' : ''}`}
        onClick={handleClose}
      />

      <aside className={`auth-sidebar ${isOpen ? 'auth-sidebar--open' : ''}`}>

        <div className="auth-sidebar__header">
          <h2 className="auth-sidebar__title">
            {modo === 'login' ? 'ENTRAR' : 'CRIAR CONTA'}
          </h2>
          <button className="auth-sidebar__close" onClick={handleClose}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Fechar
          </button>
        </div>

        <div className="auth-sidebar__divider" />

        <div className="auth-sidebar__tabs">
          <button
            className={`auth-sidebar__tab ${modo === 'login' ? 'auth-sidebar__tab--active' : ''}`}
            onClick={() => trocarModo('login')}
          >
            LOGIN
          </button>
          <button
            className={`auth-sidebar__tab ${modo === 'registro' ? 'auth-sidebar__tab--active' : ''}`}
            onClick={() => trocarModo('registro')}
          >
            CADASTRO
          </button>
        </div>

        <div className="auth-sidebar__body">
          <form className="auth-sidebar__form" onSubmit={handleSubmit}>

            {modo === 'registro' && (
              <div className="auth-sidebar__field">
                <label className="auth-sidebar__label">Nome completo</label>
                <input className="auth-sidebar__input" placeholder="Seu nome" value={form.nome} onChange={set('nome')} required />
              </div>
            )}

            <div className="auth-sidebar__field">
              <label className="auth-sidebar__label">E-mail</label>
              <input className="auth-sidebar__input" type="email" placeholder="seu@email.com" value={form.email} onChange={set('email')} required />
            </div>

            <div className="auth-sidebar__field">
              <label className="auth-sidebar__label">Senha</label>
              <input className="auth-sidebar__input" type="password" placeholder="••••••••" value={form.senha} onChange={set('senha')} required />
            </div>

            {modo === 'registro' && (
              <>
                <div className="auth-sidebar__field">
                  <label className="auth-sidebar__label">Confirmar senha</label>
                  <input className="auth-sidebar__input" type="password" placeholder="••••••••" value={form.confirmarSenha} onChange={set('confirmarSenha')} required />
                </div>

                <div className="auth-sidebar__row">
                  <div className="auth-sidebar__field">
                    <label className="auth-sidebar__label">CPF</label>
                    <input className="auth-sidebar__input" placeholder="000.000.000-00" value={form.cpf} onChange={set('cpf')} />
                  </div>
                  <div className="auth-sidebar__field">
                    <label className="auth-sidebar__label">Telefone</label>
                    <input className="auth-sidebar__input" placeholder="(11) 99999-9999" value={form.telefone} onChange={set('telefone')} />
                  </div>
                </div>

                <div className="auth-sidebar__row">
                  <div className="auth-sidebar__field">
                    <label className="auth-sidebar__label">Nascimento</label>
                    <input className="auth-sidebar__input" placeholder="DD/MM/AAAA" value={form.nascimento} onChange={set('nascimento')} />
                  </div>
                  <div className="auth-sidebar__field">
                    <label className="auth-sidebar__label">Gênero</label>
                    <select className="auth-sidebar__input" value={form.genero} onChange={set('genero')}>
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

            {erro && <p className="auth-sidebar__erro">{erro}</p>}

            <button className="auth-sidebar__submit" type="submit" disabled={loading}>
              {loading ? 'AGUARDE...' : modo === 'login' ? 'ENTRAR' : 'CRIAR CONTA'}
            </button>

            {modo === 'login' && (
              <p className="auth-sidebar__switch">
                Não tem conta?{' '}
                <button type="button" className="auth-sidebar__switch-btn" onClick={() => trocarModo('registro')}>
                  Cadastre-se
                </button>
              </p>
            )}

          </form>
        </div>
      </aside>
    </>
  )
}