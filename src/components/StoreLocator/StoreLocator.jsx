import './StoreLocator.css'

const STORES = [
  {
    id: 1,
    neighborhood: 'LIBERDADE',
    address: 'R. GALVÃO BUENO, 40\nLOJA 422',
    district: 'Liberdade',
    city: 'São Paulo/SP',
    whatsapp: '(011) 91002-0376',
    hours: ['Seg. a Sab. das 10:30 as 18:30', 'Dom das 10:30 as 18:00'],
    img: 'src/assets/stores/store_1.jpg',
    mapsUrl: '#',
  },
  {
    id: 2,
    neighborhood: 'GALERIA DO ROCK',
    address: 'AV. SÃO JOÃO, 439\nLOJA 280',
    district: 'Centro histórico',
    city: 'São Paulo/SP',
    whatsapp: '(011) 93396-9337',
    hours: ['Seg. a Sab. das 11:00 as 18:00', 'Fechado aos domingos'],
    img: 'src/assets/stores/store_2.jpg',
    mapsUrl: '#',
  },
]

export default function StoreLocator() {
  return (
    <section className="store-locator">
      {STORES.map((store) => (
        <div key={store.id} className="store-card">
          <img src={store.img} alt={store.neighborhood} className="store-card__bg" />
          <div className="store-card__overlay" />
          <div className="store-card__content">
            <span className="store-card__neighborhood">{store.neighborhood}</span>
            <h3 className="store-card__address">
              {store.address.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h3>
            <p className="store-card__district">{store.district}</p>
            <p className="store-card__city">{store.city}</p>
            <div className="store-card__details">
              <p>Whatsapp {store.whatsapp}</p>
              {store.hours.map((h, i) => <p key={i}>{h}</p>)}
            </div>
            <a href={store.mapsUrl} className="store-card__btn">VISITE A LOJA</a>
          </div>
        </div>
      ))}
    </section>
  )
}