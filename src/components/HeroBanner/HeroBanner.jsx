import { useState, useEffect, useRef } from 'react'
import './HeroBanner.css'

// Coloque seus 3 banners aqui
import banner1 from '../../assets/banner3.png'
import banner2 from '../../assets/stores/panico2.png'
import banner3 from '../../assets/stores/panico3.png'
const BANNERS = [
  banner1,
  banner2, // troque pelos outros quando tiver as imagens
  banner3,
]

const INTERVAL = 5000

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(null)
  const [direction, setDirection] = useState('next') // 'next' | 'prev'
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef(null)

  const goTo = (index, dir = 'next') => {
    if (animating || index === current) return
    setDirection(dir)
    setPrev(current)
    setAnimating(true)
    setCurrent(index)
  }

  const next = () => goTo((current + 1) % BANNERS.length, 'next')
  const prev_ = () => goTo((current - 1 + BANNERS.length) % BANNERS.length, 'prev')

  // Auto play
  useEffect(() => {
    timerRef.current = setInterval(next, INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [current, animating])

  // Reset animação após transição
  useEffect(() => {
    if (!animating) return
    const t = setTimeout(() => {
      setPrev(null)
      setAnimating(false)
    }, 600)
    return () => clearTimeout(t)
  }, [animating])

  return (
    <section className="hero">
      {/* Slides */}
      {BANNERS.map((img, i) => {
        let cls = 'hero__slide'
        if (i === current) cls += animating ? ` hero__slide--enter-${direction}` : ' hero__slide--active'
        else if (i === prev) cls += ` hero__slide--exit-${direction}`
        else cls += ' hero__slide--hidden'

        return (
          <div
            key={i}
            className={cls}
            style={{ backgroundImage: `url(${img})` }}
          >
            <div className="hero__blob hero__blob--left" />
            <div className="hero__blob hero__blob--right" />
            <div className="hero__side hero__side--left" />
            <div className="hero__side hero__side--right" />
          </div>
        )
      })}

      {/* Setas */}
      <button className="hero__arrow hero__arrow--left" onClick={prev_} title="Anterior">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button className="hero__arrow hero__arrow--right" onClick={next} title="Próximo">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="hero__dots">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`}
            onClick={() => goTo(i, i > current ? 'next' : 'prev')}
            title={`Banner ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}