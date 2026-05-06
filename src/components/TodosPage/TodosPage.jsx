import { useEffect, useState } from 'react'
import FilterSidebar from '../FilterSidebar/FilterSidebar'
import ProductDialog from '../ProductDialog/ProductDialog'
import WishlistBtn from '../WishlistBtn/WishlistBtn'
import './TodosPage.css'

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function Stars({ rating = 0 }) {
  return (
    <div className="product-card__stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= rating ? 'star star--filled' : 'star'}>★</span>
      ))}
    </div>
  )
}

const FILTROS_INICIAIS = {
  categorias: [],
  tamanhos: [],
  plusSize: false,
  precoMin: 0,
  precoMax: 1000,
}

export default function TodosPage({ title = 'TODOS OS PRODUTOS', filter = {} }) {
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [filtros, setFiltros] = useState(FILTROS_INICIAIS)

  useEffect(() => {
    setLoading(true)
    setErro(null)

    const params = new URLSearchParams(filter).toString()
    const url = `http://localhost:5000/api/itens${params ? `?${params}` : ''}`

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar itens')
        return res.json()
      })
      .then((data) => { setItens(data); setLoading(false) })
      .catch((err) => { setErro(err.message); setLoading(false) })
  }, [JSON.stringify(filter)])

  // Filtragem local
  const itensFiltrados = itens.filter((item) => {
    if (filtros.categorias.length > 0 && !filtros.categorias.includes(item.categoria)) return false
    if (filtros.tamanhos.length > 0 && !filtros.tamanhos.some((t) => item.tamanhos?.includes(t))) return false
    if (filtros.plusSize && !item.plus_size) return false
    const preco = item.preco_promocional ?? item.preco
    if (preco < filtros.precoMin || preco > filtros.precoMax) return false
    return true
  })

  if (loading) {
    return (
      <div className="todos-page__loading">
        <span className="todos-page__spinner" />
        Carregando produtos...
      </div>
    )
  }

  if (erro) return <div className="todos-page__erro">⚠️ {erro}</div>

  return (
    <div className="todos-page">
      <FilterSidebar
        filtros={filtros}
        onChange={setFiltros}
        onLimpar={() => setFiltros(FILTROS_INICIAIS)}
      />

      <section className="todos-page__content">
        <div className="todos-page__top">
          <h2 className="product-grid__title">{title}</h2>
          <span className="todos-page__count">
            {itensFiltrados.length} {itensFiltrados.length === 1 ? 'produto' : 'produtos'}
          </span>
        </div>

        {itensFiltrados.length === 0 ? (
          <p className="todos-page__vazio">Nenhum produto encontrado com esses filtros.</p>
        ) : (
          <div className="product-grid__items">
            {itensFiltrados.map((item) => {
              const installments = 6
              const installmentValue = item.preco / installments
              const preco = item.preco_promocional ?? item.preco
              const pix = preco * 0.95

              return (
                <div
                  key={item._id}
                  className="product-card"
                  onClick={() => setSelectedItem(item)}
                  role="button"
                  tabIndex={0}
                >
                  <WishlistBtn item={item} />
                  {item.oferta && <span className="product-card__badge">OFERTA</span>}
                  <div className="product-card__img-wrap">
                    <img
                      src={item.imagem || `https://placehold.co/300x380/1a0020/ff00aa?text=${encodeURIComponent(item.nome)}`}
                      alt={item.nome}
                      className="product-card__img"
                    />
                  </div>
                  <div className="product-card__info">
                    <p className="product-card__name">{item.nome}</p>
                    <Stars />
                    {item.preco_promocional && (
                      <p className="product-card__price-old">{formatPrice(item.preco)}</p>
                    )}
                    <p className="product-card__price">{formatPrice(preco)}</p>
                    <p className="product-card__installments">
                      {installments}x de {formatPrice(installmentValue)} s/ juros
                    </p>
                    <p className="product-card__pix">{formatPrice(pix)} no PIX</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {selectedItem && (
        <ProductDialog item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}