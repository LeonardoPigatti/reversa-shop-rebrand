import './CartSidebar.css'

export default function CartSidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay escuro atrás */}
      <div
        className={`cart-overlay ${isOpen ? 'cart-overlay--visible' : ''}`}
        onClick={onClose}
      />

      {/* Sidebar lateral direita */}
      <aside className={`cart-sidebar ${isOpen ? 'cart-sidebar--open' : ''}`}>
        <div className="cart-sidebar__header">
          <h2 className="cart-sidebar__title">CARRINHO</h2>
          <button className="cart-sidebar__close" onClick={onClose} title="Fechar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Fechar
          </button>
        </div>

        <div className="cart-sidebar__divider" />

        <div className="cart-sidebar__body">
          {/* Aqui entram os itens do carrinho */}
          <p className="cart-sidebar__empty">Seu carrinho está vazio.</p>
        </div>
      </aside>
    </>
  )
}