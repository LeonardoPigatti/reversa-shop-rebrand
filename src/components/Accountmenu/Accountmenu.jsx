import { useState, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import './AccountMenu.css'

const MENU_ITEMS = [
  { label: 'Painel',            href: '/minha-conta' },
  { label: 'Pedidos',           href: '/minha-conta/pedidos' },
  { label: 'Downloads',         href: '/minha-conta/downloads' },
  { label: 'Carteira',          href: '/minha-conta/carteira' },
  { label: 'Lista de Espera',   href: '/minha-conta/lista-de-espera' },
  { label: 'Cupons',            href: '/minha-conta/cupons' },
  { label: 'Endereços',         href: '/minha-conta/enderecos' },
  { label: 'Detalhes da conta', href: '/minha-conta/detalhes' },
  { label: 'Lista de Desejos',  href: '/minha-conta/lista-de-desejos' },
]

export default function AccountMenu({ onLoginClick }) {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef(null)

  const handleMouseEnter = () => { clearTimeout(timeoutRef.current); setOpen(true) }
  const handleMouseLeave = () => { timeoutRef.current = setTimeout(() => setOpen(false), 150) }

  // Não logado — só o ícone, sem dropdown
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

  // Logado — OLÁ NOME + dropdown
  return (
    <div className="account-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button className="header-icons__btn account-menu__trigger" title={user.nome}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span className="account-menu__ola">OLÁ, {primeiroNome}</span>
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
              <a href={item.href} className="account-menu__link">{item.label}</a>
            </li>
          ))}
          <li className="account-menu__item">
            <button className="account-menu__link account-menu__link--logout" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}