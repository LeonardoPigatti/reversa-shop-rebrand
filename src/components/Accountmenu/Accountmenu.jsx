import { useState, useRef } from 'react'
import './AccountMenu.css'

const MENU_ITEMS = [
  { label: 'Painel',             href: '/minha-conta' },
  { label: 'Pedidos',            href: '/minha-conta/pedidos' },
  { label: 'Downloads',          href: '/minha-conta/downloads' },
  { label: 'Carteira',           href: '/minha-conta/carteira' },
  { label: 'Lista de Espera',    href: '/minha-conta/lista-de-espera' },
  { label: 'Cupons',             href: '/minha-conta/cupons' },
  { label: 'Endereços',          href: '/minha-conta/enderecos' },
  { label: 'Detalhes da conta',  href: '/minha-conta/detalhes' },
  { label: 'Lista de Desejos',   href: '/minha-conta/lista-de-desejos' },
  { label: 'Logout',             href: '/logout', isLogout: true },
]

export default function AccountMenu() {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef(null)

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150)
  }

  return (
    <div
      className="account-menu"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Botão Account */}
      <button className="header-icons__btn account-menu__trigger" title="Minha Conta">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </button>

      {/* Dropdown */}
      <div className={`account-menu__dropdown ${open ? 'account-menu__dropdown--open' : ''}`}>
        <ul className="account-menu__list">
          {MENU_ITEMS.map((item) => (
            <li key={item.label} className="account-menu__item">
              <a
                href={item.href}
                className={`account-menu__link ${item.isLogout ? 'account-menu__link--logout' : ''}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}