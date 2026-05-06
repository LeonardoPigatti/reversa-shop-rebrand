import { useState } from 'react'
import { useCarteira } from '../../context/CarteiraContext'
import './CarteiraPage.css'

const BANDEIRA_ICON = {
  visa:       '💳 VISA',
  mastercard: '💳 MASTERCARD',
  elo:        '💳 ELO',
  amex:       '💳 AMEX',
  hipercard:  '💳 HIPERCARD',
  outro:      '💳 CARTÃO',
}

const BANDEIRA_COLOR = {
  visa:       '#1a1f71',
  mastercard: '#eb001b',
  elo:        '#ffcb00',
  amex:       '#007bc1',
  hipercard:  '#822124',
  outro:      '#333',
}

function CartaoVisual({ cartao, onRemover, onPrincipal }) {
  const [confirmando, setConfirmando] = useState(false)

  return (
    <div className={`cw-card ${cartao.principal ? 'cw-card--principal' : ''}`}>
      {cartao.principal && <span className="cw-card__badge">PRINCIPAL</span>}

      <div className="cw-card__chip" />

      <div className="cw-card__bandeira" style={{ color: BANDEIRA_COLOR[cartao.bandeira] }}>
        {BANDEIRA_ICON[cartao.bandeira]}
      </div>

      <p className="cw-card__numero">•••• •••• •••• {cartao.numero_final}</p>

      <div className="cw-card__bottom">
        <div>
          <p className="cw-card__label">TITULAR</p>
          <p className="cw-card__value">{cartao.nome_titular.toUpperCase()}</p>
        </div>
        <div>
          <p className="cw-card__label">VALIDADE</p>
          <p className="cw-card__value">{cartao.validade}</p>
        </div>
      </div>

      {cartao.apelido && (
        <p className="cw-card__apelido">"{cartao.apelido}"</p>
      )}

      <div className="cw-card__actions">
        {!cartao.principal && (
          <button className="cw-card__action" onClick={() => onPrincipal(cartao._id)}>
            Tornar principal
          </button>
        )}
        {!confirmando ? (
          <button className="cw-card__action cw-card__action--danger" onClick={() => setConfirmando(true)}>
            Remover
          </button>
        ) : (
          <div className="cw-card__confirm">
            <span>Tem certeza?</span>
            <button className="cw-card__action cw-card__action--danger" onClick={() => onRemover(cartao._id)}>Sim</button>
            <button className="cw-card__action" onClick={() => setConfirmando(false)}>Não</button>
          </div>
        )}
      </div>
    </div>
  )
}

function NovoCartaoForm({ onSalvar, onCancelar }) {
  const [form, setForm] = useState({ numero: '', nome_titular: '', validade: '', apelido: '' })
  const [saving, setSaving] = useState(false)
  const [erro, setErro] = useState(null)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const formatarNumero = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  const formatarValidade = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`
    return digits
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro(null)
    setSaving(true)
    try {
      await onSalvar(form)
    } catch (err) {
      setErro(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="cw-form" onSubmit={handleSubmit}>
      <h3 className="cw-form__title">NOVO CARTÃO</h3>

      <div className="cw-form__field">
        <label className="cw-form__label">Número do cartão</label>
        <input
          className="cw-form__input"
          placeholder="0000 0000 0000 0000"
          value={form.numero}
          onChange={(e) => setForm((f) => ({ ...f, numero: formatarNumero(e.target.value) }))}
          required
        />
      </div>

      <div className="cw-form__field">
        <label className="cw-form__label">Nome do titular</label>
        <input
          className="cw-form__input"
          placeholder="COMO NO CARTÃO"
          value={form.nome_titular}
          onChange={set('nome_titular')}
          required
        />
      </div>

      <div className="cw-form__row">
        <div className="cw-form__field">
          <label className="cw-form__label">Validade</label>
          <input
            className="cw-form__input"
            placeholder="MM/AA"
            value={form.validade}
            onChange={(e) => setForm((f) => ({ ...f, validade: formatarValidade(e.target.value) }))}
            required
          />
        </div>
        <div className="cw-form__field">
          <label className="cw-form__label">Apelido (opcional)</label>
          <input
            className="cw-form__input"
            placeholder="Ex: Nubank pessoal"
            value={form.apelido}
            onChange={set('apelido')}
          />
        </div>
      </div>

      <p className="cw-form__hint">🔒 O CVV nunca é armazenado por segurança.</p>

      {erro && <p className="cw-form__erro">{erro}</p>}

      <div className="cw-form__btns">
        <button type="button" className="cw-form__btn cw-form__btn--cancel" onClick={onCancelar}>
          CANCELAR
        </button>
        <button type="submit" className="cw-form__btn cw-form__btn--save" disabled={saving}>
          {saving ? 'SALVANDO...' : 'SALVAR CARTÃO'}
        </button>
      </div>
    </form>
  )
}

export default function CarteiraPage() {
  const { cartoes, adicionar, remover, definirPrincipal } = useCarteira()
  const [adicionando, setAdicionando] = useState(false)

  const handleSalvar = async (dados) => {
    await adicionar(dados)
    setAdicionando(false)
  }

  return (
    <div className="cw-page">
      <div className="cw-header">
        <h1 className="cw-title">CARTEIRA</h1>
        <p className="cw-sub">Seus cartões salvos para compras rápidas</p>
      </div>

      {cartoes.length === 0 && !adicionando && (
        <div className="cw-empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
          <p>Nenhum cartão cadastrado ainda.</p>
        </div>
      )}

      <div className="cw-grid">
        {cartoes.map((cartao) => (
          <CartaoVisual
            key={cartao._id}
            cartao={cartao}
            onRemover={remover}
            onPrincipal={definirPrincipal}
          />
        ))}
      </div>

      {adicionando ? (
        <NovoCartaoForm
          onSalvar={handleSalvar}
          onCancelar={() => setAdicionando(false)}
        />
      ) : (
        <button className="cw-add-btn" onClick={() => setAdicionando(true)}>
          + ADICIONAR CARTÃO
        </button>
      )}
    </div>
  )
}