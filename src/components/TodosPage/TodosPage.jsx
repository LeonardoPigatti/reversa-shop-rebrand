import { useEffect, useState } from 'react'
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

// Sem props = mostra tudo
// Com filter = { genero: 'feminino' } ou { categoria: 'Calçados' } etc
export default function TodosPage({ title = 'TODOS OS PRODUTOS', filter = {} }) {
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

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
      .then((data) => {
        setItens(data)
        setLoading(false)
      })
      .catch((err) => {
        setErro(err.message)
        setLoading(false)
      })
  }, [JSON.stringify(filter)])

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

  return (
    <section className="product-grid">
      <h2 className="product-grid__title">{title}</h2>

      {itens.length === 0 ? (
        <p className="todos-page__vazio">Nenhum produto encontrado.</p>
      ) : (
        <div className="product-grid__items">
          {itens.map((item) => {
            const installments = 6
            const installmentValue = item.preco / installments
            const preco = item.preco_promocional ?? item.preco
            const pix = preco * 0.95

            return (
              <a href="#" key={item._id} className="product-card">
                <div className="product-card__img-wrap">
                  <img
                    src={
                      item.imagem ||
                      `https://placehold.co/300x380/1a0020/ff00aa?text=${encodeURIComponent(item.nome)}`
                    }
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
              </a>
            )
          })}
        </div>
      )}
    </section>
  )
}