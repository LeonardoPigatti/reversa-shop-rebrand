import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useWishlist } from '../../context/WishlistContext'
import ProductDialog from '../ProductDialog/ProductDialog'
import './WishlistPage.css'

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function WishlistPage({ onBack, onLoginClick }) {
  const { user } = useAuth()
  const { itens, remover } = useWishlist()
  const [selectedItem, setSelectedItem] = useState(null)

  if (!user) {
    return (
      <div className="wl-page">
        <div className="wl-header">
          <button className="wl-back" onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            VOLTAR
          </button>
          <h1 className="wl-title">LISTA DE DESEJOS</h1>
        </div>
        <div className="wl-login">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <p className="wl-login__text">Faça login para ver sua lista de desejos.</p>
          <button className="wl-login__btn" onClick={onLoginClick}>ENTRAR / CADASTRAR</button>
        </div>
      </div>
    )
  }

  return (
    <div className="wl-page">
      <div className="wl-header">
        <button className="wl-back" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          VOLTAR
        </button>
        <h1 className="wl-title">LISTA DE DESEJOS</h1>
        {itens.length > 0 && (
          <span className="wl-count">{itens.length} {itens.length === 1 ? 'item' : 'itens'}</span>
        )}
      </div>

      {itens.length === 0 ? (
        <div className="wl-empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <p>Sua lista de desejos está vazia.</p>
        </div>
      ) : (
        <div className="wl-grid">
          {itens.map((item) => {
            const preco = item.preco_promocional ?? item.preco
            const pix = preco * 0.95
            const installmentValue = preco / 6

            return (
              <div
                key={item.itemId}
                className="wl-card"
                onClick={() => setSelectedItem({ ...item, _id: item.itemId })}
              >
                <button
                  className="wl-card__remove"
                  onClick={(e) => { e.stopPropagation(); remover(item.itemId) }}
                  title="Remover dos favoritos"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>

                <div className="wl-card__img-wrap">
                  <img
                    src={item.imagem || `https://placehold.co/300x380/1a0020/ff00aa?text=${encodeURIComponent(item.nome)}`}
                    alt={item.nome}
                    className="wl-card__img"
                  />
                </div>

                <div className="wl-card__info">
                  <p className="wl-card__categoria">{item.categoria}</p>
                  <p className="wl-card__nome">{item.nome}</p>
                  {item.preco_promocional && (
                    <p className="wl-card__preco-old">{formatPrice(item.preco)}</p>
                  )}
                  <p className="wl-card__preco">{formatPrice(preco)}</p>
                  <p className="wl-card__parcelas">6x de {formatPrice(installmentValue)} s/ juros</p>
                  <p className="wl-card__pix">{formatPrice(pix)} no PIX</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {selectedItem && (
        <ProductDialog item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}