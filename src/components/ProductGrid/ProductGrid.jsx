import './ProductGrid.css'

const MOCK_PRODUCTS = {
  NOVIDADES: [
    { id: 1, name: 'BODY MANGA LONGA ARRASTÃO', price: 99.90, rating: 0, installments: 6, img: 'https://placehold.co/300x380/1a0020/ff00aa?text=BODY' },
    { id: 2, name: 'VESTIDO GODÊ PRETO', price: 154.90, rating: 5, installments: 6, img: 'https://placehold.co/300x380/1a0020/ff00aa?text=VESTIDO' },
    { id: 3, name: 'CROPPED NEON', price: 59.90, rating: 4, installments: 6, img: 'https://placehold.co/300x380/1a0020/ff00aa?text=CROPPED' },
  ],
  FEMININO: [
    { id: 1, name: 'VESTIDO FLORAL DARK', price: 119.90, rating: 5, installments: 6, img: 'https://placehold.co/300x380/1a0020/ff00aa?text=VESTIDO' },
    { id: 2, name: 'BLUSA CIGANINHA', price: 69.90, rating: 3, installments: 6, img: 'https://placehold.co/300x380/1a0020/ff00aa?text=BLUSA' },
    { id: 3, name: 'SAIA MIDI PLISSADA', price: 99.90, rating: 4, installments: 6, img: 'https://placehold.co/300x380/1a0020/ff00aa?text=SAIA' },
  ],
  MASCULINO: [
    { id: 1, name: 'CAMISETA BÁSICA PRETA', price: 49.90, rating: 4, installments: 6, img: 'https://placehold.co/300x380/1a0020/ff00aa?text=CAMISETA' },
    { id: 2, name: 'CALÇA JOGGER', price: 139.90, rating: 5, installments: 6, img: 'https://placehold.co/300x380/1a0020/ff00aa?text=CALCA' },
    { id: 3, name: 'MOLETOM OVERSIZED', price: 179.90, rating: 4, installments: 6, img: 'https://placehold.co/300x380/1a0020/ff00aa?text=MOLETOM' },
  ],
  'PLUS SIZE': [
    { id: 1, name: 'VESTIDO PLUS GODÊ', price: 129.90, rating: 5, installments: 6, img: 'https://placehold.co/300x380/1a0020/ff00aa?text=VESTIDO' },
    { id: 2, name: 'CALÇA WIDE LEG', price: 149.90, rating: 4, installments: 6, img: 'https://placehold.co/300x380/1a0020/ff00aa?text=CALCA' },
    { id: 3, name: 'BLUSA PLUS VELUDO', price: 79.90, rating: 3, installments: 6, img: 'https://placehold.co/300x380/1a0020/ff00aa?text=BLUSA' },
  ],
  CALÇADOS: [
    { id: 1, name: 'TÊNIS PLATAFORMA', price: 199.90, rating: 5, installments: 6, img: 'https://placehold.co/300x380/1a0020/ff00aa?text=TENIS' },
    { id: 2, name: 'SANDÁLIA TIRAS', price: 79.90, rating: 4, installments: 6, img: 'https://placehold.co/300x380/1a0020/ff00aa?text=SANDALIA' },
    { id: 3, name: 'BOTA COURO VEGANO', price: 249.90, rating: 5, installments: 6, img: 'https://placehold.co/300x380/1a0020/ff00aa?text=BOTA' },
  ],
  ACESSÓRIOS: [
    { id: 1, name: 'COLAR TRILUNA', price: 69.90, rating: 0, installments: 6, img: 'https://placehold.co/300x380/1a0020/ff00aa?text=COLAR' },
    { id: 2, name: 'MOCHILA NAPA MOON', price: 264.90, rating: 5, installments: 6, img: 'https://placehold.co/300x380/1a0020/ff00aa?text=MOCHILA' },
    { id: 3, name: 'BOLSA TÉRMICA MOON', price: 144.90, rating: 4, installments: 6, img: 'https://placehold.co/300x380/1a0020/ff00aa?text=BOLSA' },
  ],
}

function Stars({ rating }) {
  return (
    <div className="product-card__stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= rating ? 'star star--filled' : 'star'}>★</span>
      ))}
    </div>
  )
}

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function ProductGrid({ category }) {
  const products = MOCK_PRODUCTS[category] ?? []

  return (
    <section className="product-grid">
      <h2 className="product-grid__title">{category}</h2>
      <div className="product-grid__items">
        {products.map((p) => {
          const installmentValue = p.price / p.installments
          const pix = p.price * 0.95

          return (
            <a href="#" key={p.id} className="product-card">
              <div className="product-card__img-wrap">
                <img src={p.img} alt={p.name} className="product-card__img" />
              </div>
              <div className="product-card__info">
                <p className="product-card__name">{p.name}</p>
                <p className="product-card__price">{formatPrice(p.price)}</p>
                <p className="product-card__installments">
                  {p.installments}x de {formatPrice(installmentValue)} s/ juros
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