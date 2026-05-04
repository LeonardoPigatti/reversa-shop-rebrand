import './WishlistPage.css'
import { FiHeart } from 'react-icons/fi'

export default function WishlistPage({ onBack }) {
  return (
    <div className="wishlist-page">
      <div className="wishlist-page__header">
        <h1 className="wishlist-page__title">LISTA DE DESEJOS</h1>
        <nav className="wishlist-page__breadcrumb">
          <a onClick={onBack} style={{ cursor: 'pointer' }}>Home</a>
          <span>/</span>
          <strong>Lista de Desejos</strong>
        </nav>
      </div>

      <div className="wishlist-page__empty">
        <FiHeart className="wishlist-page__icon" />
        <h2 className="wishlist-page__empty-title">A LISTA DE DESEJOS ESTÁ VAZIA</h2>
        <p className="wishlist-page__empty-text">
          Você ainda não tem nenhum produto na lista de desejos.<br />
          Você encontrará muitos produtos interessantes em nossa página "Loja".
        </p>
        <button onClick={onBack} className="wishlist-page__btn">RETORNAR A LOJA</button>
      </div>
    </div>
  )
}