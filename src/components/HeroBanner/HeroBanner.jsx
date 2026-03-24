import bannerImg from '../../assets/banner3.png'
import './HeroBanner.css'

export default function HeroBanner() {
  return (
    <section className="hero" style={{ backgroundImage: `url(${bannerImg})` }}>
      {/* Blobs decorativos */}
      <div className="hero__blob hero__blob--left" />
      <div className="hero__blob hero__blob--right" />

      {/* Gradiente lateral esquerdo */}
      <div className="hero__side hero__side--left" />

      {/* Gradiente lateral direito */}
      <div className="hero__side hero__side--right" />
    </section>
  )
}