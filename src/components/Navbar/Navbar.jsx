import { useState, useRef } from 'react'
import NAV_LINKS from '../../data/navLinks'
import './Navbar.css'

function NavItem({ link, active, onClickLink, onNavigate }) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef(null)
  const hasDropdown = link.subitens?.length > 0

  const show = () => {
    clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const hide = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120)
  }

  const handleClick = (e) => {
    e.preventDefault()
    onClickLink(link)
    setOpen(false)
  }

  const handleSubClick = (e, sub) => {
    e.preventDefault()
    onNavigate?.('catalog', { title: sub.label.toUpperCase(), filter: sub.filter })
    setOpen(false)
  }

  return (
    <div
      className="navbar__item"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <a
        href={link.href}
        onClick={handleClick}
        className={`navbar__link ${active ? 'navbar__link--active' : ''}`}
      >
        {link.label}
        {hasDropdown && (
          <svg
            className={`navbar__chevron ${open ? 'navbar__chevron--up' : ''}`}
            width="10" height="10" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
      </a>

      {hasDropdown && (
        <div
          className={`navbar__dropdown ${open ? 'navbar__dropdown--open' : ''}`}
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          <a href="#" className="navbar__dropdown-all" onClick={handleClick}>
            Ver tudo em {link.label}
          </a>
          <div className="navbar__dropdown-divider" />
          {link.subitens.map((sub) => (
            <a
              key={sub.label}
              href="#"
              className="navbar__dropdown-item"
              onClick={(e) => handleSubClick(e, sub)}
            >
              {sub.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navbar({ onNavigate }) {
  const [active, setActive] = useState('HOME')

  const handleClickLink = (link) => {
    setActive(link.label)
    if (link.label === 'HOME') { onNavigate?.('home', null); return }
    if (link.page) onNavigate?.(link.page, { title: link.label, filter: link.filter ?? {} })
  }

  return (
    <nav className="navbar">
      {NAV_LINKS.map((link) => (
        <NavItem
          key={link.label}
          link={link}
          active={active === link.label}
          onClickLink={handleClickLink}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  )
}