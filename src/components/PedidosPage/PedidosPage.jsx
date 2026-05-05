import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import './PedidosPage.css'

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  })
}

const STATUS_CONFIG = {
  pendente:   { label: 'Pendente',    color: '#aaa' },
  confirmado: { label: 'Confirmado',  color: '#ff00aa' },
  em_preparo: { label: 'Em preparo',  color: '#c800ff' },
  enviado:    { label: 'Enviado',     color: '#ff4dbb' },
  entregue:   { label: 'Entregue',    color: '#00e676' },
  cancelado:  { label: 'Cancelado',   color: '#ff4444' },
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, color: '#aaa' }
  return (
    <span className="ped-status" style={{ color: cfg.color, borderColor: cfg.color }}>
      {cfg.label}
    </span>
  )
}

function PedidoCard({ pedido, onExpand, expanded }) {
  const numero = pedido._id.toString().slice(-6).toUpperCase()
  const freteLabel = { pac: 'PAC', sedex: 'SEDEX', retirada: 'Retirada na loja' }

  return (
    <div className={`ped-card ${expanded ? 'ped-card--open' : ''}`}>

      {/* Header do card */}
      <button className="ped-card__header" onClick={() => onExpand(pedido._id)}>
        <div className="ped-card__meta">
          <span className="ped-card__numero">#{numero}</span>
          <span className="ped-card__data">{formatDate(pedido.createdAt)}</span>
        </div>
        <div className="ped-card__mid">
          <span className="ped-card__itens">{pedido.itens.length} {pedido.itens.length === 1 ? 'item' : 'itens'}</span>
          <span className="ped-card__total">{formatPrice(pedido.total)}</span>
        </div>
        <div className="ped-card__right">
          <StatusBadge status={pedido.status} />
          <svg
            className={`ped-card__arrow ${expanded ? 'ped-card__arrow--up' : ''}`}
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* Detalhe expandido */}
      {expanded && (
        <div className="ped-card__body">

          {/* Itens */}
          <div className="ped-section">
            <p className="ped-section__title">ITENS</p>
            <ul className="ped-itens">
              {pedido.itens.map((item, i) => (
                <li key={i} className="ped-item">
                  <img
                    src={item.imagem || `https://placehold.co/56x70/1a0020/ff00aa?text=${encodeURIComponent(item.nome)}`}
                    alt={item.nome}
                    className="ped-item__img"
                  />
                  <div className="ped-item__info">
                    <p className="ped-item__nome">{item.nome}</p>
                    {item.tamanho && <p className="ped-item__det">TAM: {item.tamanho}</p>}
                    <p className="ped-item__det">Qtd: {item.quantidade}</p>
                  </div>
                  <p className="ped-item__preco">{formatPrice(item.subtotal)}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="ped-divider" />

          {/* Entrega + Pagamento */}
          <div className="ped-grid">
            <div className="ped-section">
              <p className="ped-section__title">ENTREGA</p>
              <p className="ped-section__text">{pedido.entrega.rua}, {pedido.entrega.numero} {pedido.entrega.comp}</p>
              <p className="ped-section__text">{pedido.entrega.bairro} — {pedido.entrega.cidade}/{pedido.entrega.estado}</p>
              <p className="ped-section__text">CEP {pedido.entrega.cep}</p>
              <p className="ped-section__text ped-section__frete">
                {freteLabel[pedido.entrega.frete]} · {pedido.entrega.valor_frete === 0 ? 'Grátis' : formatPrice(pedido.entrega.valor_frete)}
              </p>
            </div>

            <div className="ped-section">
              <p className="ped-section__title">PAGAMENTO</p>
              <p className="ped-section__text" style={{ textTransform: 'capitalize' }}>{pedido.pagamento.metodo}</p>
              {pedido.pagamento.metodo === 'cartao' && (
                <p className="ped-section__text">{pedido.pagamento.parcelas}x sem juros</p>
              )}
              {pedido.pagamento.cupom && (
                <p className="ped-section__text">Cupom: {pedido.pagamento.cupom}</p>
              )}
            </div>
          </div>

          <div className="ped-divider" />

          {/* Total */}
          <div className="ped-totais">
            <div className="ped-totais__row">
              <span>Subtotal</span>
              <span>{formatPrice(pedido.subtotal)}</span>
            </div>
            <div className="ped-totais__row">
              <span>Frete</span>
              <span>{pedido.entrega.valor_frete === 0 ? 'Grátis' : formatPrice(pedido.entrega.valor_frete)}</span>
            </div>
            <div className="ped-totais__row ped-totais__row--final">
              <span>TOTAL</span>
              <span>{formatPrice(pedido.total)}</span>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default function PedidosPage() {
  const { user } = useAuth()
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    if (!user?.email) return
    fetch(`http://localhost:5000/api/pedidos?email=${encodeURIComponent(user.email)}`)
      .then((r) => r.json())
      .then((data) => { setPedidos(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [user])

  const toggle = (id) => setExpandedId((prev) => (prev === id ? null : id))

  if (loading) {
    return (
      <div className="ped-loading">
        <span className="ped-spinner" />
        Carregando pedidos...
      </div>
    )
  }

  return (
    <div className="ped-page">
      <h1 className="ped-title">MEUS PEDIDOS</h1>

      {pedidos.length === 0 ? (
        <div className="ped-empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
          </svg>
          <p>Você ainda não fez nenhum pedido.</p>
        </div>
      ) : (
        <div className="ped-list">
          {pedidos.map((p) => (
            <PedidoCard
              key={p._id}
              pedido={p}
              expanded={expandedId === p._id}
              onExpand={toggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}