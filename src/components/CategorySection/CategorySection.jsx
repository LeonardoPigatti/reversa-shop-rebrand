import CATEGORIES from '../../data/categories'
import CategoryCard from '../CategoryCard/CategoryCard'
import './CategorySection.css'

export default function CategorySection({ onSelectCategory }) {
  return (
    <section className="category-section">
      <h2 className="category-section__title">COMPRE POR CATEGORIA</h2>
      <div className="category-section__grid">
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.label}
            label={cat.label}
            color={cat.color}
            onClick={() => onSelectCategory(cat.label)}
          />
        ))}
      </div>
    </section>
  )
}