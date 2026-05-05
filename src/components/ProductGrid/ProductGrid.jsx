import { useEffect, useState, useRef } from 'react'
import './ProductGrid.css'

const PAGE_SIZE = 6

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

const CATEGORY_FILTER = {
  NOVIDADES:   {},
  FEMININO:    { genero: 'feminino' },
  MASCULINO:   { genero: 'masculino' },
  'PLUS SIZE': { plus_size: 'true' },
  CALÇADOS:    { categoria: 'Calçados' },
  ACESSÓRIOS:  { categoria: 'Acessórios' },
}

function ProductCard({ p }) {
  const installments = 6
  const installmentValue = p.preco / installments
  const preco = p.preco_promocional ?? p.preco
  const pix = preco * 0.95

  return (
    <a href="#" className="product-card">
      {p.oferta && <span className="product-card__badge">OFERTA</span>}
      <div className="product-card__img-wrap">
        <img
          src={p.imagem || `https://placehold.co/300x380/1a0020/ff00aa?text=${encodeURIComponent(p.nome)}`}
          alt={p.nome}
          className="product-card__img"
        />
      </div>
      <div className="product-card__info">
        <p className="product-card__name">{p.nome}</p>
        <Stars />
        {p.preco_promocional && (
          <p className="product-card__price-old">{formatPrice(p.preco)}</p>
        )}
        <p className="product-card__price">{formatPrice(preco)}</p>
        <p className="product-card__installments">
          {installments}x de {formatPrice(installmentValue)} s/ juros
        </p>
        <p className="product-card__pix">{formatPrice(pix)} no PIX</p>
      </div>
    </a>
  )
}

export default function ProductGrid({ category, onlyOfertas = false, carousel = false, recentes = false }) {
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)
  const [pagina, setPagina] = useState(0)
  const trackRef = useRef(null)

  const totalPaginas = Math.ceil(produtos.length / PAGE_SIZE)

  useEffect(() => {
    if (!category && !onlyOfertas && !recentes) return
    setLoading(true)
    setErro(null)
    setPagina(0)

    const filter = { ...(CATEGORY_FILTER[category] ?? {}) }
    if (onlyOfertas) filter.oferta = 'true'
    if (recentes) filter.limit = PAGE_SIZE

    const params = new URLSearchParams(filter).toString()
    const url = `http://localhost:5000/api/itens${params ? `?${params}` : ''}`

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar produtos')
        return res.json()
      })
      .then((data) => {
        setProdutos(data)
        setLoading(false)
      })
      .catch((err) => {
        setErro(err.message)
        setLoading(false)
      })
  }, [category, onlyOfertas])

  // Move o track para a página atual
  useEffect(() => {
    if (!trackRef.current || !carousel) return
    const offset = pagina * 100
    trackRef.current.style.transform = `translateX(-${offset}%)`
  }, [pagina, carousel])

  const titulo = recentes ? 'NOVIDADES' : onlyOfertas ? 'OFERTAS' : category

  if (loading) {
    return (
      <div className="todos-page__loading">
        <span className="todos-page__spinner" />
        Carregando produtos...
      </div>
    )
  }

  if (erro) return <div className="todos-page__erro">⚠️ {erro}</div>

  if (produtos.length === 0) {
    return (
      <section className="product-grid">
        <h2 className="product-grid__title">{titulo}</h2>
        <p className="todos-page__vazio">Nenhum produto encontrado.</p>
      </section>
    )
  }

  // Modo normal — renderiza tudo em grid
  if (!carousel) {
    return (
      <section className="product-grid">
        <h2 className="product-grid__title">{titulo}</h2>
        <div className="product-grid__items">
          {produtos.map((p) => <ProductCard key={p._id} p={p} />)}
        </div>
      </section>
    )
  }

  // Modo carrossel — divide em páginas, cada página é um "slide"
  const paginas = Array.from({ length: totalPaginas }, (_, i) =>
    produtos.slice(i * PAGE_SIZE, i * PAGE_SIZE + PAGE_SIZE)
  )

  return (
    <section className="product-grid">

      <div className="product-grid__header">
        <h2 className="product-grid__title">{titulo}</h2>

        {totalPaginas > 1 && (
          <div className="product-grid__nav">
            <button
              className="product-grid__nav-btn"
              onClick={() => setPagina((p) => p - 1)}
              disabled={pagina === 0}
              title="Anterior"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <span className="product-grid__nav-info">
              {pagina + 1} / {totalPaginas}
            </span>

            <button
              className="product-grid__nav-btn"
              onClick={() => setPagina((p) => p + 1)}
              disabled={pagina >= totalPaginas - 1}
              title="Próximo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Viewport — esconde o que está fora */}
      <div className="product-grid__viewport">
        {/* Track — contém todas as páginas lado a lado */}
        <div className="product-grid__track" ref={trackRef}>
          {paginas.map((grupo, i) => (
            <div key={i} className="product-grid__slide">
              {grupo.map((p) => <ProductCard key={p._id} p={p} />)}
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}