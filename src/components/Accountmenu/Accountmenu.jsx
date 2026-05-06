import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import './AccountMenu.css'

const MENU_ITEMS = [
  { label: 'Pedidos',           page: 'pedidos' },
  { label: 'Carteira',          page: 'carteira' },
  { label: 'Cupons',            page: null },
  { label: 'Detalhes da conta', page: 'detalhes' },
]

export default function AccountMenu({ onLoginClick, onNavigate }) {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef(null)

  const handleMouseEnter = () => { clearTimeout(timeoutRef.current); setOpen(true) }
  const handleMouseLeave = () => { timeoutRef.current = setTimeout(() => setOpen(false), 150) }

  if (!user) {
    return (
      <button className="header-icons__btn" title="Entrar / Cadastrar" onClick={onLoginClick}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </button>
    )
  }

  const primeiroNome = user.nome.split(' ')[0].toUpperCase()
  const [showNome, setShowNome] = useState(false)

  useEffect(() => {
    const intervalo = setInterval(() => {
      setShowNome((s) => !s)
    }, 6000)
    return () => clearInterval(intervalo)
  }, [])

  return (
    <div className="account-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button className="header-icons__btn account-menu__trigger" title={user.nome}>
        <div className="account-menu__roleta">
          <div className={`account-menu__roleta-inner ${showNome ? 'account-menu__roleta-inner--nome' : ''}`}>
            <div className="account-menu__roleta-slot">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="account-menu__roleta-slot">
              <span className="account-menu__ola">OLÁ, {primeiroNome}</span>
            </div>
          </div>
        </div>
      </button>

      <div className={`account-menu__dropdown ${open ? 'account-menu__dropdown--open' : ''}`}>
        <div className="account-menu__user">
          <p className="account-menu__user-nome">{user.nome}</p>
          <p className="account-menu__user-email">{user.email}</p>
        </div>
        <div className="account-menu__divider" />
        <ul className="account-menu__list">
          {MENU_ITEMS.map((item) => (
            <li key={item.label} className="account-menu__item">
              <button
                className="account-menu__link"
                onClick={() => { setOpen(false); item.page && onNavigate?.(item.page) }}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li className="account-menu__item">
            <button
              className="account-menu__link account-menu__link--logout"
              onClick={() => { setOpen(false); logout() }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}