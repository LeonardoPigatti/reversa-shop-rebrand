import { useEffect, useState } from 'react'
import './ProductGrid.css'

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

// category é o label da CategorySection (ex: 'FEMININO', 'CALÇADOS')
// mapeamos para o filtro correto do banco
const CATEGORY_FILTER = {
  NOVIDADES:   {},
  FEMININO:    { genero: 'feminino' },
  MASCULINO:   { genero: 'masculino' },
  'PLUS SIZE': { plus_size: 'true' },
  CALÇADOS:    { categoria: 'Calçados' },
  ACESSÓRIOS:  { categoria: 'Acessórios' },
}

export default function ProductGrid({ category }) {
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    if (!category) return
    setLoading(true)
    setErro(null)

    const filter = CATEGORY_FILTER[category] ?? {}
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
  }, [category])

  if (loading) {
    return (
      <div className="todos-page__loading">
        <span className="todos-page__spinner" />
        Carregando produtos...
      </div>
    )
  }

  if (erro) {
    return <div className="todos-page__erro">⚠️ {erro}</div>
  }

  if (produtos.length === 0) {
    return (
      <section className="product-grid">
        <h2 className="product-grid__title">{category}</h2>
        <p className="todos-page__vazio">Nenhum produto encontrado.</p>
      </section>
    )
  }

  return (
    <section className="product-grid">
      <h2 className="product-grid__title">{category}</h2>
      <div className="product-grid__items">
        {produtos.map((p) => {
          const installments = 6
          const installmentValue = p.preco / installments
          const preco = p.preco_promocional ?? p.preco
          const pix = preco * 0.95

          return (
            <a href="#" key={p._id} className="product-card">
              <div className="product-card__img-wrap">
                <img
                  src={
                    p.imagem ||
                    `https://placehold.co/300x380/1a0020/ff00aa?text=${encodeURIComponent(p.nome)}`
                  }
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
        })}
      </div>
    </section>
  )
}