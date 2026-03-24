import { useState } from 'react'
import NAV_LINKS from '../../data/navLinks'
import './Navbar.css'

export default function Navbar() {
  const [active, setActive] = useState('HOME')

  return (
    <nav className="navbar">
      {NAV_LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          onClick={() => setActive(link.label)}
          className={`navbar__link ${active === link.label ? 'navbar__link--active' : ''}`}
        >
          {link.label}
          {link.dropdown && (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          )}
        </a>
      ))}
    </nav>
  )
}
