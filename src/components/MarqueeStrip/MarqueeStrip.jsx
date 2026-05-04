import './MarqueeStrip.css'

const ITEMS = ['ENVIO PARA TODO O BRASIL', 'MODA ALTERNATIVA', 'EM ATÉ 6X SEM JUROS', '1º TROCA GRATIS']

export default function MarqueeStrip() {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS]

  return (
    <div className="marquee-strip">
      <div className="marquee-strip__track">
        {repeated.map((item, i) => (
          <span key={i} className="marquee-strip__item">
            {item} <span className="marquee-strip__dot"></span>
          </span>
        ))}
      </div>
    </div>
  )
}