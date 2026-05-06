import { useState } from 'react'
import './FilterSidebar.css'

// Ordem preferida dos tamanhos
const ORDEM_TAMANHOS = [
  'PP', 'P', 'M', 'G', 'GG', 'XG',
  '1G', '2G', '3G', '4G', '5G',
  '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44',
  'U',
]

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="fs-section">
      <button className="fs-section__header" onClick={() => setOpen((o) => !o)}>
        <span>{title}</span>
        <svg
          className={`fs-section__chevron ${open ? 'fs-section__chevron--up' : ''}`}
          width="12" height="12" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className="fs-section__body">{children}</div>}
    </div>
  )
}

export default function FilterSidebar({ filtros, onChange, onLimpar, itens = [] }) {
  // Derivar opções disponíveis dos itens reais
  const categoriasDisponiveis = [...new Set(itens.map((i) => i.categoria).filter(Boolean))].sort()
  const tamanhosDisponiveis = ORDEM_TAMANHOS.filter((t) =>
    itens.some((i) => i.tamanhos?.includes(t))
  )
  const temPlusSize = itens.some((i) => i.plus_size)
  const [collapsed, setCollapsed] = useState(false)
  const { categorias, tamanhos, plusSize, precoMin, precoMax } = filtros

  const toggleCategoria = (cat) => {
    const novo = categorias.includes(cat)
      ? categorias.filter((c) => c !== cat)
      : [...categorias, cat]
    onChange({ ...filtros, categorias: novo })
  }

  const toggleTamanho = (tam) => {
    const novo = tamanhos.includes(tam)
      ? tamanhos.filter((t) => t !== tam)
      : [...tamanhos, tam]
    onChange({ ...filtros, tamanhos: novo })
  }

  const temFiltro =
    categorias.length > 0 ||
    tamanhos.length > 0 ||
    plusSize ||
    precoMin > 0 ||
    precoMax < 1000

  return (
    <aside className={`fs ${collapsed ? 'fs--collapsed' : ''}`}>
      <div className="fs-header">
        <span className="fs-header__title">FILTROS</span>
        <div className="fs-header__actions">
          {temFiltro && !collapsed && (
            <button className="fs-header__limpar" onClick={onLimpar}>LIMPAR</button>
          )}
          <button className="fs-header__toggle" onClick={() => setCollapsed((c) => !c)} title={collapsed ? 'Expandir' : 'Recolher'}>
            <svg
              className={`fs-header__arrow ${collapsed ? 'fs-header__arrow--right' : ''}`}
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>
      </div>

      {!collapsed && <>
      {/* Categorias */}
      <Section title="CATEGORIAS">
        <div className="fs-list">
          {categoriasDisponiveis.map((cat) => (
            <label key={cat} className="fs-check">
              <input
                type="checkbox"
                checked={categorias.includes(cat)}
                onChange={() => toggleCategoria(cat)}
              />
              <span className="fs-check__box" />
              <span className="fs-check__label">{cat}</span>
            </label>
          ))}
        </div>
      </Section>

      {/* Tamanho */}
      <Section title="TAMANHO">
        <div className="fs-tamanhos">
          {tamanhosDisponiveis.map((tam) => (
            <button
              key={tam}
              className={`fs-tam ${tamanhos.includes(tam) ? 'fs-tam--active' : ''}`}
              onClick={() => toggleTamanho(tam)}
            >
              {tam}
            </button>
          ))}
        </div>
      </Section>

      {/* Plus Size — só aparece se tiver itens plus size */}
      {temPlusSize && (
        <Section title="TEM PLUS SIZE?">
          <label className="fs-check">
            <input
              type="checkbox"
              checked={plusSize}
              onChange={() => onChange({ ...filtros, plusSize: !plusSize })}
            />
            <span className="fs-check__box" />
            <span className="fs-check__label">Plus Size</span>
          </label>
        </Section>
      )}

      {/* Preço */}
      <Section title="PREÇO">
        <div className="fs-preco">
          <div className="fs-preco__inputs">
            <input
              className="fs-preco__input"
              type="number"
              min={0}
              max={precoMax}
              value={precoMin}
              onChange={(e) => onChange({ ...filtros, precoMin: Number(e.target.value) })}
            />
            <span className="fs-preco__sep">—</span>
            <input
              className="fs-preco__input"
              type="number"
              min={precoMin}
              max={9999}
              value={precoMax}
              onChange={(e) => onChange({ ...filtros, precoMax: Number(e.target.value) })}
            />
          </div>
          <p className="fs-preco__label">
            R$ {precoMin} — R$ {precoMax}
          </p>
        </div>
      </Section>

      {temFiltro && (
        <button className="fs-limpar-btn" onClick={onLimpar}>
          LIMPAR FILTROS
        </button>
      )}
      </>}
    </aside>
  )
}