import { useCart } from '../../context/CartContext'
import './CartSidebar.css'

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function CartSidebar({ isOpen, onClose }) {
  const { itens, remover, alterarQty, total, totalItens } = useCart()

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? 'cart-overlay--visible' : ''}`}
        onClick={onClose}
      />

      <aside className={`cart-sidebar ${isOpen ? 'cart-sidebar--open' : ''}`}>

        {/* Header */}
        <div className="cart-sidebar__header">
          <h2 className="cart-sidebar__title">
            CARRINHO
            {totalItens > 0 && (
              <span className="cart-sidebar__count">{totalItens}</span>
            )}
          </h2>
          <button className="cart-sidebar__close" onClick={onClose} title="Fechar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Fechar
          </button>
        </div>

        <div className="cart-sidebar__divider" />

        {/* Body */}
        <div className="cart-sidebar__body">
          {itens.length === 0 ? (
            <div className="cart-sidebar__empty-wrap">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p className="cart-sidebar__empty">Seu carrinho está vazio.</p>
            </div>
          ) : (
            <ul className="cart-sidebar__list">
              {itens.map((item) => {
                const preco = item.preco_promocional ?? item.preco
                return (
                  <li key={item.key} className="cart-item">
                    <div className="cart-item__img-wrap">
                      <img
                        src={item.imagem || `https://placehold.co/80x100/1a0020/ff00aa?text=${encodeURIComponent(item.nome)}`}
                        alt={item.nome}
                        className="cart-item__img"
                      />
                    </div>

                    <div className="cart-item__info">
                      <p className="cart-item__nome">{item.nome}</p>
                      {item.tamanho && (
                        <p className="cart-item__tamanho">TAM: {item.tamanho}</p>
                      )}
                      <p className="cart-item__preco">{formatPrice(preco)}</p>

                      <div className="cart-item__actions">
                        <div className="cart-item__qty">
                          <button
                            className="cart-item__qty-btn"
                            onClick={() => alterarQty(item.key, item.quantidade - 1)}
                          >−</button>
                          <span className="cart-item__qty-val">{item.quantidade}</span>
                          <button
                            className="cart-item__qty-btn"
                            onClick={() => alterarQty(item.key, item.quantidade + 1)}
                          >+</button>
                        </div>

                        <button
                          className="cart-item__remove"
                          onClick={() => remover(item.key)}
                          title="Remover"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14H6L5 6" />
                            <path d="M10 11v6M14 11v6" />
                            <path d="M9 6V4h6v2" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <p className="cart-item__subtotal">
                      {formatPrice(preco * item.quantidade)}
                    </p>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Footer com total */}
        {itens.length > 0 && (
          <>
            <div className="cart-sidebar__divider" />
            <div className="cart-sidebar__footer">
              <div className="cart-sidebar__total">
                <span className="cart-sidebar__total-label">TOTAL</span>
                <span className="cart-sidebar__total-value">{formatPrice(total)}</span>
              </div>
              <p className="cart-sidebar__pix">
                ou {formatPrice(total * 0.95)} no PIX
              </p>
              <button className="cart-sidebar__checkout">
                FINALIZAR COMPRA
              </button>
            </div>
          </>
        )}

      </aside>
    </>
  )
}