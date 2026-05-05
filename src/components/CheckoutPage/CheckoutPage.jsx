import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import './CheckoutPage.css'

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const STEPS = ['IDENTIFICAÇÃO', 'ENTREGA', 'PAGAMENTO', 'REVISÃO']

function StepIndicator({ current }) {
  return (
    <div className="ck-steps">
      {STEPS.map((label, i) => (
        <div key={label} className="ck-steps__item">
          <div className={`ck-steps__dot ${i < current ? 'ck-steps__dot--done' : i === current ? 'ck-steps__dot--active' : ''}`}>
            {i < current ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <span>{i + 1}</span>
            )}
          </div>
          <span className={`ck-steps__label ${i === current ? 'ck-steps__label--active' : ''}`}>{label}</span>
          {i < STEPS.length - 1 && <div className={`ck-steps__line ${i < current ? 'ck-steps__line--done' : ''}`} />}
        </div>
      ))}
    </div>
  )
}

function Field({ label, id, type = 'text', placeholder, value, onChange, half, mask }) {
  return (
    <div className={`ck-field ${half ? 'ck-field--half' : ''}`}>
      <label className="ck-field__label" htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        className="ck-field__input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </div>
  )
}

// ── Step 0: Identificação ──────────────────────────────────
function StepIdentificacao({ data, setData }) {
  const set = (key) => (val) => setData((d) => ({ ...d, [key]: val }))
  return (
    <div className="ck-form">
      <h3 className="ck-form__title">QUEM É VOCÊ?</h3>
      <div className="ck-row">
        <Field label="Nome completo" id="nome" placeholder="Seu nome" value={data.nome} onChange={set('nome')} />
        <Field label="CPF" id="cpf" placeholder="000.000.000-00" value={data.cpf} onChange={set('cpf')} half />
      </div>
      <div className="ck-row">
        <Field label="E-mail" id="email" type="email" placeholder="seu@email.com" value={data.email} onChange={set('email')} />
        <Field label="Telefone / WhatsApp" id="tel" placeholder="(11) 99999-9999" value={data.tel} onChange={set('tel')} half />
      </div>
      <div className="ck-row">
        <Field label="Data de nascimento" id="nascimento" placeholder="DD/MM/AAAA" value={data.nascimento} onChange={set('nascimento')} half />
        <div className="ck-field ck-field--half">
          <label className="ck-field__label">Gênero</label>
          <select className="ck-field__input" value={data.genero} onChange={(e) => set('genero')(e.target.value)}>
            <option value="">Selecionar</option>
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
            <option value="nao-binario">Não-binário</option>
            <option value="prefiro-nao">Prefiro não informar</option>
          </select>
        </div>
      </div>
    </div>
  )
}

// ── Step 1: Entrega ────────────────────────────────────────
function StepEntrega({ data, setData }) {
  const set = (key) => (val) => setData((d) => ({ ...d, [key]: val }))
  return (
    <div className="ck-form">
      <h3 className="ck-form__title">ONDE ENTREGAMOS?</h3>
      <div className="ck-row">
        <Field label="CEP" id="cep" placeholder="00000-000" value={data.cep} onChange={set('cep')} half />
      </div>
      <div className="ck-row">
        <Field label="Endereço" id="rua" placeholder="Rua, Avenida..." value={data.rua} onChange={set('rua')} />
        <Field label="Número" id="num" placeholder="123" value={data.num} onChange={set('num')} half />
      </div>
      <div className="ck-row">
        <Field label="Complemento" id="comp" placeholder="Apto, Bloco..." value={data.comp} onChange={set('comp')} half />
        <Field label="Bairro" id="bairro" placeholder="Seu bairro" value={data.bairro} onChange={set('bairro')} half />
      </div>
      <div className="ck-row">
        <Field label="Cidade" id="cidade" placeholder="Sua cidade" value={data.cidade} onChange={set('cidade')} />
        <Field label="Estado" id="estado" placeholder="SP" value={data.estado} onChange={set('estado')} half />
      </div>

      <h3 className="ck-form__title" style={{ marginTop: '1.5rem' }}>FRETE</h3>
      <div className="ck-frete">
        {[
          { id: 'pac', label: 'PAC', prazo: '8 a 12 dias úteis', valor: 18.90 },
          { id: 'sedex', label: 'SEDEX', prazo: '2 a 4 dias úteis', valor: 34.90 },
          { id: 'retirada', label: 'Retirar na loja', prazo: 'Disponível em 1 dia útil', valor: 0 },
        ].map((op) => (
          <label key={op.id} className={`ck-frete__option ${data.frete === op.id ? 'ck-frete__option--active' : ''}`}>
            <input
              type="radio"
              name="frete"
              value={op.id}
              checked={data.frete === op.id}
              onChange={() => set('frete')(op.id)}
            />
            <div className="ck-frete__info">
              <span className="ck-frete__label">{op.label}</span>
              <span className="ck-frete__prazo">{op.prazo}</span>
            </div>
            <span className="ck-frete__valor">
              {op.valor === 0 ? 'Grátis' : formatPrice(op.valor)}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

// ── Step 2: Pagamento ──────────────────────────────────────
function StepPagamento({ data, setData }) {
  const set = (key) => (val) => setData((d) => ({ ...d, [key]: val }))
  return (
    <div className="ck-form">
      <h3 className="ck-form__title">COMO VOCÊ PAGA?</h3>

      <div className="ck-payment-methods">
        {[
          { id: 'cartao', label: 'Cartão de crédito', icon: '💳' },
          { id: 'pix', label: 'PIX', icon: '⚡' },
          { id: 'boleto', label: 'Boleto', icon: '📄' },
        ].map((m) => (
          <button
            key={m.id}
            className={`ck-payment-method ${data.metodo === m.id ? 'ck-payment-method--active' : ''}`}
            onClick={() => set('metodo')(m.id)}
          >
            <span className="ck-payment-method__icon">{m.icon}</span>
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      {data.metodo === 'cartao' && (
        <div className="ck-cartao">
          <Field label="Número do cartão" id="cardnum" placeholder="0000 0000 0000 0000" value={data.cardNum} onChange={set('cardNum')} />
          <Field label="Nome no cartão" id="cardname" placeholder="NOME COMO NO CARTÃO" value={data.cardName} onChange={set('cardName')} />
          <div className="ck-row">
            <Field label="Validade" id="cardval" placeholder="MM/AA" value={data.cardVal} onChange={set('cardVal')} half />
            <Field label="CVV" id="cardcvv" placeholder="123" value={data.cardCvv} onChange={set('cardCvv')} half />
          </div>
          <div className="ck-field">
            <label className="ck-field__label">Parcelas</label>
            <select className="ck-field__input" value={data.parcelas} onChange={(e) => set('parcelas')(e.target.value)}>
              {[1,2,3,4,5,6].map((n) => (
                <option key={n} value={n}>{n}x sem juros</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {data.metodo === 'pix' && (
        <div className="ck-pix">
          <div className="ck-pix__qr">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <rect width="80" height="80" fill="#0d0010" />
              <rect x="10" y="10" width="25" height="25" fill="#ff00aa" />
              <rect x="13" y="13" width="19" height="19" fill="#0d0010" />
              <rect x="16" y="16" width="13" height="13" fill="#ff00aa" />
              <rect x="45" y="10" width="25" height="25" fill="#ff00aa" />
              <rect x="48" y="13" width="19" height="19" fill="#0d0010" />
              <rect x="51" y="16" width="13" height="13" fill="#ff00aa" />
              <rect x="10" y="45" width="25" height="25" fill="#ff00aa" />
              <rect x="13" y="48" width="19" height="19" fill="#0d0010" />
              <rect x="16" y="51" width="13" height="13" fill="#ff00aa" />
              <rect x="45" y="45" width="6" height="6" fill="#ff00aa" />
              <rect x="54" y="45" width="6" height="6" fill="#ff00aa" />
              <rect x="63" y="45" width="6" height="6" fill="#ff00aa" />
              <rect x="45" y="54" width="6" height="6" fill="#ff00aa" />
              <rect x="63" y="54" width="6" height="6" fill="#ff00aa" />
              <rect x="45" y="63" width="6" height="6" fill="#ff00aa" />
              <rect x="54" y="63" width="6" height="6" fill="#ff00aa" />
              <rect x="63" y="63" width="6" height="6" fill="#ff00aa" />
            </svg>
          </div>
          <p className="ck-pix__info">QR Code gerado após confirmação do pedido.</p>
          <p className="ck-pix__desconto">Desconto de 5% no PIX!</p>
        </div>
      )}

      {data.metodo === 'boleto' && (
        <div className="ck-boleto">
          <p className="ck-boleto__info">Boleto gerado após confirmação. Vencimento em <strong>3 dias úteis</strong>.</p>
        </div>
      )}

      <div className="ck-cupom">
        <h3 className="ck-form__title" style={{ marginTop: '1.5rem' }}>CUPOM DE DESCONTO</h3>
        <div className="ck-cupom__row">
          <input className="ck-field__input" placeholder="Digite seu cupom" value={data.cupom} onChange={(e) => set('cupom')(e.target.value)} />
          <button className="ck-cupom__btn">APLICAR</button>
        </div>
      </div>
    </div>
  )
}

// ── Step 3: Revisão ────────────────────────────────────────
function StepRevisao({ identificacao, entrega, pagamento, itens, total }) {
  const freteValores = { pac: 18.90, sedex: 34.90, retirada: 0 }
  const frete = freteValores[entrega.frete] ?? 0
  const totalFinal = total + frete

  const metodoLabel = { cartao: 'Cartão de crédito', pix: 'PIX', boleto: 'Boleto' }

  return (
    <div className="ck-revisao">
      <h3 className="ck-form__title">REVISE SEU PEDIDO</h3>

      <div className="ck-revisao__section">
        <p className="ck-revisao__section-title">IDENTIFICAÇÃO</p>
        <p>{identificacao.nome}</p>
        <p>{identificacao.email} · {identificacao.tel}</p>
        <p>CPF: {identificacao.cpf}</p>
      </div>

      <div className="ck-revisao__section">
        <p className="ck-revisao__section-title">ENTREGA</p>
        <p>{entrega.rua}, {entrega.num} {entrega.comp}</p>
        <p>{entrega.bairro} — {entrega.cidade}/{entrega.estado} · CEP {entrega.cep}</p>
        <p className="ck-revisao__frete">Frete: {entrega.frete ? entrega.frete.toUpperCase() : '—'} · {frete === 0 ? 'Grátis' : formatPrice(frete)}</p>
      </div>

      <div className="ck-revisao__section">
        <p className="ck-revisao__section-title">PAGAMENTO</p>
        <p>{metodoLabel[pagamento.metodo] ?? '—'}</p>
        {pagamento.metodo === 'cartao' && pagamento.cardNum && (
          <p>**** **** **** {pagamento.cardNum.slice(-4)} · {pagamento.parcelas}x sem juros</p>
        )}
      </div>

      <div className="ck-revisao__section">
        <p className="ck-revisao__section-title">ITENS ({itens.length})</p>
        <ul className="ck-revisao__itens">
          {itens.map((item) => {
            const preco = item.preco_promocional ?? item.preco
            return (
              <li key={item.key} className="ck-revisao__item">
                <img
                  src={item.imagem || `https://placehold.co/50x60/1a0020/ff00aa?text=${encodeURIComponent(item.nome)}`}
                  alt={item.nome}
                  className="ck-revisao__item-img"
                />
                <div className="ck-revisao__item-info">
                  <p className="ck-revisao__item-nome">{item.nome}</p>
                  {item.tamanho && <p className="ck-revisao__item-tam">TAM: {item.tamanho}</p>}
                  <p className="ck-revisao__item-qty">Qtd: {item.quantidade}</p>
                </div>
                <p className="ck-revisao__item-preco">{formatPrice(preco * item.quantidade)}</p>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="ck-revisao__total">
        <div className="ck-revisao__total-row">
          <span>Subtotal</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="ck-revisao__total-row">
          <span>Frete</span>
          <span>{frete === 0 ? 'Grátis' : formatPrice(frete)}</span>
        </div>
        <div className="ck-revisao__total-row ck-revisao__total-row--final">
          <span>TOTAL</span>
          <span>{formatPrice(totalFinal)}</span>
        </div>
        {pagamento.metodo === 'pix' && (
          <div className="ck-revisao__total-row ck-revisao__pix">
            <span>No PIX</span>
            <span>{formatPrice(totalFinal * 0.95)}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Página principal ───────────────────────────────────────
export default function CheckoutPage({ onBack }) {
  const { itens, total, limpar } = useCart()
  const [step, setStep] = useState(0)
  const [pedidoFeito, setPedidoFeito] = useState(false)
  const [numeroPedido, setNumeroPedido] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [erroSalvar, setErroSalvar] = useState(null)

  const [identificacao, setIdentificacao] = useState({
    nome: '', cpf: '', email: '', tel: '', nascimento: '', genero: '',
  })
  const [entrega, setEntrega] = useState({
    cep: '', rua: '', num: '', comp: '', bairro: '', cidade: '', estado: '', frete: '',
  })
  const [pagamento, setPagamento] = useState({
    metodo: '', cardNum: '', cardName: '', cardVal: '', cardCvv: '', parcelas: '1', cupom: '',
  })

  const confirmar = async () => {
    setSalvando(true)
    setErroSalvar(null)
    try {
      const freteValores = { pac: 18.90, sedex: 34.90, retirada: 0 }
      const valorFrete = freteValores[entrega.frete] ?? 0
      const res = await fetch("http://localhost:5000/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identificacao,
          entrega,
          pagamento,
          itens,
          subtotal: total,
          total: total + valorFrete,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Erro ao salvar pedido")
      setNumeroPedido(data.numero)
      setPedidoFeito(true)
      limpar()
    } catch (err) {
      setErroSalvar(err.message)
    } finally {
      setSalvando(false)
    }
  }


  if (pedidoFeito) {
    return (
      <div className="ck-success">
        <div className="ck-success__icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="ck-success__title">PEDIDO CONFIRMADO!</h2>
        {numeroPedido && <p className="ck-success__numero">Nº {numeroPedido}</p>}
        <p className="ck-success__sub">Você receberá um e-mail com os detalhes do seu pedido.</p>
        <button className="ck-success__btn" onClick={onBack}>CONTINUAR COMPRANDO</button>
      </div>
    )
  }

  return (
    <div className="ck-page">
      <div className="ck-header">
        <button className="ck-back" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          VOLTAR
        </button>
        <h1 className="ck-title">CHECKOUT</h1>
      </div>

      <StepIndicator current={step} />

      <div className="ck-body">
        <div className="ck-main">
          {step === 0 && <StepIdentificacao data={identificacao} setData={setIdentificacao} />}
          {step === 1 && <StepEntrega data={entrega} setData={setEntrega} />}
          {step === 2 && <StepPagamento data={pagamento} setData={setPagamento} />}
          {step === 3 && (
            <StepRevisao
              identificacao={identificacao}
              entrega={entrega}
              pagamento={pagamento}
              itens={itens}
              total={total}
            />
          )}

          <div className="ck-nav">
            {step > 0 && (
              <button className="ck-nav__back" onClick={() => setStep((s) => s - 1)}>
                VOLTAR
              </button>
            )}
            {step < 3 ? (
              <button className="ck-nav__next" onClick={() => setStep((s) => s + 1)}>
                CONTINUAR
              </button>
            ) : (
              <button className="ck-nav__next ck-nav__next--confirm" onClick={confirmar} disabled={salvando}>
                {salvando ? "SALVANDO..." : "CONFIRMAR PEDIDO"}
              </button>
            )}
          </div>
        </div>

        {/* Resumo lateral */}
        <aside className="ck-aside">
          <p className="ck-aside__title">RESUMO</p>
          <ul className="ck-aside__list">
            {itens.map((item) => {
              const preco = item.preco_promocional ?? item.preco
              return (
                <li key={item.key} className="ck-aside__item">
                  <div className="ck-aside__item-img-wrap">
                    <img
                      src={item.imagem || `https://placehold.co/50x60/1a0020/ff00aa?text=${encodeURIComponent(item.nome)}`}
                      alt={item.nome}
                      className="ck-aside__item-img"
                    />
                    <span className="ck-aside__item-qty">{item.quantidade}</span>
                  </div>
                  <div className="ck-aside__item-info">
                    <p className="ck-aside__item-nome">{item.nome}</p>
                    {item.tamanho && <p className="ck-aside__item-tam">TAM: {item.tamanho}</p>}
                  </div>
                  <p className="ck-aside__item-preco">{formatPrice(preco * item.quantidade)}</p>
                </li>
              )
            })}
          </ul>
          <div className="ck-aside__divider" />
          <div className="ck-aside__total-row">
            <span>Subtotal</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="ck-aside__total-row ck-aside__total-row--final">
            <span>TOTAL</span>
            <span>{formatPrice(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}