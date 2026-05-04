import Badge from '../Badge/Badge'
import './HeaderIcons.css'

export default function HeaderIcons({ onWishlistClick }) {
  return (
    <div className="header-icons">

      {/* Search */}
      <button className="header-icons__btn header-icons__btn--search" title="Pesquisar">
        <span className="header-icons__search-label">PESQUISAR</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </button>

      {/* Wishlist */}
      <button className="header-icons__btn" title="Favoritos" onClick={onWishlistClick}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <Badge count={0} />
      </button>

      {/* Cart */}
      <button className="header-icons__btn" title="Carrinho">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        <Badge count={3} />
      </button>

      {/* Account */}
      <button className="header-icons__btn" title="Minha Conta">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </button>

    </div>
  )
}