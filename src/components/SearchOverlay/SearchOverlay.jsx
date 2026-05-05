import { useState, useEffect, useRef } from 'react'
import ProductDialog from '../ProductDialog/ProductDialog'
import './SearchOverlay.css'

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function SearchCard({ item, onClick }) {
  const preco = item.preco_promocional ?? item.preco
  const installmentValue = preco / 6

  return (
    <div className="search-card" onClick={onClick} role="button" tabIndex={0}>
      {item.oferta && <span className="search-card__badge">OFERTA</span>}
      <div className="search-card__img-wrap">
        <img
          src={item.imagem || `https://placehold.co/200x260/1a0020/ff00aa?text=${encodeURIComponent(item.nome)}`}
          alt={item.nome}
          className="search-card__img"
        />
      </div>
      <div className="search-card__info">
        <p className="search-card__categoria">{item.categoria}</p>
        <p className="search-card__nome">{item.nome}</p>
        {item.preco_promocional && (
          <p className="search-card__preco-old">{formatPrice(item.preco)}</p>
        )}
        <p className="search-card__preco">{formatPrice(preco)}</p>
        <p className="search-card__parcelas">6x de {formatPrice(installmentValue)} s/ juros</p>
        <p className="search-card__pix">{formatPrice(preco * 0.95)} no PIX</p>
      </div>
    </div>
  )
}

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const inputRef = useRef(null)
  const debounceRef = useRef(null)

  // Foca o input ao abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
      setItens([])
    }
  }, [isOpen])

  // Fecha com ESC
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Debounce da busca
  useEffect(() => {
    clearTimeout(debounceRef.current)
    if (!query.trim()) { setItens([]); return }

    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/itens?busca=${encodeURIComponent(query)}`)
        const data = await res.json()
        setItens(data)
      } catch {
        setItens([])
      } finally {
        setLoading(false)
      }
    }, 350)
  }, [query])

  return (
    <>
      <div className={`search-overlay ${isOpen ? 'search-overlay--open' : ''}`}>

        {/* Input */}
        <div className="search-overlay__input-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            className="search-overlay__input"
            placeholder="Pesquisar produtos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-overlay__close" onClick={onClose} title="Fechar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="search-overlay__divider" />

        {/* Resultados */}
        <div className="search-overlay__body">
          {!query.trim() && (
            <p className="search-overlay__hint">Digite para pesquisar produtos...</p>
          )}

          {query.trim() && loading && (
            <div className="search-overlay__loading">
              <span className="search-overlay__spinner" />
              Buscando...
            </div>
          )}

          {query.trim() && !loading && itens.length === 0 && (
            <p className="search-overlay__empty">
              Nenhum produto encontrado para "<strong>{query}</strong>"
            </p>
          )}

          {!loading && itens.length > 0 && (
            <>
              <p className="search-overlay__count">
                {itens.length} {itens.length === 1 ? 'resultado' : 'resultados'} para <strong>"{query}"</strong>
              </p>
              <div className="search-overlay__grid">
                {itens.map((item) => (
                  <SearchCard
                    key={item._id}
                    item={item}
                    onClick={() => setSelectedItem(item)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div className="search-backdrop" onClick={onClose} />
      )}

      {/* Dialog do produto */}
      {selectedItem && (
        <ProductDialog item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  )
}