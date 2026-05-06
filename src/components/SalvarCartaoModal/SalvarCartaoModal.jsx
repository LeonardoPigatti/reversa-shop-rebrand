import { useState } from 'react'
import { useCarteira } from '../../context/CarteiraContext'
import './SalvarCartaoModal.css'

export default function SalvarCartaoModal({ numero, nome_titular, validade, onClose }) {
  const { adicionar } = useCarteira()
  const [apelido, setApelido] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSalvar = async () => {
    setSaving(true)
    try {
      await adicionar({ numero, nome_titular, validade, apelido })
    } finally {
      setSaving(false)
      onClose()
    }
  }

  return (
    <div className="scm-backdrop" onClick={onClose}>
      <div className="scm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="scm-corner scm-corner--tl" />
        <div className="scm-corner scm-corner--tr" />
        <div className="scm-corner scm-corner--bl" />
        <div className="scm-corner scm-corner--br" />

        <div className="scm-icon">💳</div>
        <h3 className="scm-title">SALVAR CARTÃO?</h3>
        <p className="scm-text">
          Deseja salvar o cartão <strong>•••• {numero.slice(-4)}</strong> na sua carteira para compras mais rápidas?
        </p>

        <div className="scm-field">
          <label className="scm-label">Apelido (opcional)</label>
          <input
            className="scm-input"
            placeholder="Ex: Nubank pessoal"
            value={apelido}
            onChange={(e) => setApelido(e.target.value)}
          />
        </div>

        <p className="scm-hint">🔒 O CVV nunca é armazenado.</p>

        <div className="scm-btns">
          <button className="scm-btn scm-btn--skip" onClick={onClose}>
            NÃO, OBRIGADO
          </button>
          <button className="scm-btn scm-btn--save" onClick={handleSalvar} disabled={saving}>
            {saving ? 'SALVANDO...' : 'SALVAR'}
          </button>
        </div>
      </div>
    </div>
  )
}