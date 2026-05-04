import './CategoryCard.css'

export default function CategoryCard({ label, onClick }) {
  function handleClick(e) {
    e.preventDefault()
    onClick?.()
  }

  return (
    <a href="#" className="category-card" onClick={handleClick}>
      <span className="category-card__label">{label}</span>
    </a>
  )
}