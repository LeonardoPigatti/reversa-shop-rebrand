import { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext'
import './ProductDialog.css'

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function Stars({ rating = 0 }) {
  return (
    <div className="pd-stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= rating ? 'pd-star pd-star--filled' : 'pd-star'}>★</span>
      ))}
    </div>
  )
}

export default function ProductDialog({ item, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null)
  const [qty, setQty] = useState(1)
  const { adicionar } = useCart()

  // Fecha com ESC
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Bloqueia scroll do body
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!item) return null

  const preco = item.preco_promocional ?? item.preco
  const pix = preco * 0.95
  const installmentValue = preco / 6

  return (
    <div className="pd-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pd-modal">

        {/* Canto decorativo superior esquerdo */}
        <div className="pd-corner pd-corner--tl" />
        <div className="pd-corner pd-corner--tr" />
        <div className="pd-corner pd-corner--bl" />
        <div className="pd-corner pd-corner--br" />

        {/* Botão fechar */}
        <button className="pd-close" onClick={onClose} title="Fechar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* ── Lado esquerdo — imagem ── */}
        <div className="pd-left">
          {item.oferta && <span className="pd-badge">OFERTA</span>}
          {item.colecao && <span className="pd-colecao">{item.colecao}</span>}
          <div className="pd-img-wrap">
            <img
              src={item.imagem || `https://placehold.co/500x600/1a0020/ff00aa?text=${encodeURIComponent(item.nome)}`}
              alt={item.nome}
              className="pd-img"
            />
          </div>
        </div>

        {/* ── Lado direito — info ── */}
        <div className="pd-right">
          <p className="pd-categoria">{item.categoria}</p>
          <h2 className="pd-nome">{item.nome}</h2>

          <Stars rating={0} />

          {item.descricao && (
            <p className="pd-descricao">{item.descricao}</p>
          )}

          <div className="pd-divider" />

          {/* Tamanhos */}
          {item.tamanhos?.length > 0 && (
            <div className="pd-tamanhos">
              <p className="pd-label">TAMANHO</p>
              <div className="pd-tamanhos__grid">
                {item.tamanhos.map((t) => (
                  <button
                    key={t}
                    className={`pd-tamanho ${selectedSize === t ? 'pd-tamanho--active' : ''}`}
                    onClick={() => setSelectedSize(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Gênero */}
          <p className="pd-genero">
            <span className="pd-label">GÊNERO </span>
            {item.genero?.toUpperCase()}
          </p>

          <div className="pd-divider" />

          {/* Preços */}
          <div className="pd-precos">
            {item.preco_promocional && (
              <p className="pd-preco-old">DE: {formatPrice(item.preco)}</p>
            )}
            <p className="pd-preco-label">POR:</p>
            <p className="pd-preco">{formatPrice(preco)}</p>
            <p className="pd-installments">6x de <strong>{formatPrice(installmentValue)}</strong> sem juros</p>
            <p className="pd-pix">ou {formatPrice(pix)} no PIX</p>
          </div>

          <div className="pd-divider" />

          {/* Quantidade + Carrinho */}
          <div className="pd-actions">
            <div className="pd-qty">
              <button className="pd-qty__btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span className="pd-qty__val">{qty}</span>
              <button className="pd-qty__btn" onClick={() => setQty((q) => q + 1)}>+</button>
            </div>

            <button className="pd-cart-btn" onClick={() => { adicionar(item, selectedSize, qty); onClose() }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              ADICIONAR AO CARRINHO
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}