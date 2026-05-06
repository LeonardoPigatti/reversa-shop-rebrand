import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useWishlist } from '../../context/WishlistContext'
import './WishlistBtn.css'

export default function WishlistBtn({ item, onLoginRequired }) {
  const { user } = useAuth()
  const { estaNA, toggle } = useWishlist()
  const [pop, setPop] = useState(false)

  const ativo = estaNA(item._id)

  const handleClick = (e) => {
    e.stopPropagation()
    if (!user) { onLoginRequired?.(); return }
    toggle(item)
    setPop(true)
    setTimeout(() => setPop(false), 400)
  }

  return (
    <button
      className={`wishlist-btn ${ativo ? 'wishlist-btn--active' : ''} ${pop ? 'wishlist-btn--pop' : ''}`}
      onClick={handleClick}
      title={ativo ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={ativo ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  )
}