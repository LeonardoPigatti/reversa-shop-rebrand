import { useState } from 'react'
import './CategoryCard.css'

export default function CategoryCard({ label, color }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href="#"
      className={`category-card ${hovered ? 'category-card--hovered' : ''}`}
      style={{
        '--card-color': color,
        background: hovered ? color : '#1a1a2e',
        borderColor: color,
        boxShadow: hovered
          ? `0 8px 30px ${color}55`
          : 'var(--shadow-lg)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="category-card__pattern"
        style={{ backgroundImage: `radial-gradient(circle, ${color}33 1px, transparent 1px)` }}
      />
      <span className="category-card__label">{label}</span>
    </a>
  )
}
