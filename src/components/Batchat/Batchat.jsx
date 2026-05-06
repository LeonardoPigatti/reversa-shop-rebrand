import { useState, useEffect, useRef } from 'react'
import './BatChat.css'

const BAT_RESPONSES = [
  'Olá! Sou o Bat, seu assistente da Midnight Queens Club! 🦇 Como posso ajudar?',
  'Quer saber sobre nossas coleções? Temos o melhor do dark, punk e alternativo!',
  'Frete grátis acima de R$ 350! E 5% de desconto no PIX 🖤',
  'Nossa coleção Marimoon acabou de chegar! Peças exclusivas e limitadas ✨',
  'Parcelamos em até 6x sem juros no cartão! 💳',
  'Dúvidas sobre tamanho? Nossa grade vai do PP ao 5G!',
  'Acesse sua conta para ver sua lista de desejos e pedidos 🌙',
]

const QUICK_QUESTIONS = [
  'Ver ofertas',
  'Frete e prazo',
  'Formas de pagamento',
  'Coleção Marimoon',
  'Tamanhos disponíveis',
]

export default function BatChat() {
  const [open, setOpen] = useState(false)
  const [acrobacia, setAcrobacia] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bat', text: 'Olá! Sou o Bat 🦇 assistente da Midnight Queens Club! Como posso ajudar?' }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)

  // Drag
  const [pos, setPos] = useState({ x: null, y: null })
  const dragging = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const batRef = useRef(null)

  const handleMouseDown = (e) => {
    if (open) return
    dragging.current = true
    dragOffset.current = {
      x: e.clientX - (pos.x ?? window.innerWidth - 120),
      y: e.clientY - (pos.y ?? window.innerHeight - 110),
    }
    e.preventDefault()
  }

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return
      const newX = e.clientX - dragOffset.current.x
      const newY = e.clientY - dragOffset.current.y
      setPos({ x: Math.max(0, Math.min(newX, window.innerWidth - 130)), y: Math.max(0, Math.min(newY, window.innerHeight - 100)) })
    }
    const onUp = () => { dragging.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [])

  const handleOpen = () => {
    setAcrobacia(true)
    setTimeout(() => {
      setAcrobacia(false)
      setOpen(true)
    }, 600)
  }

  const handleClose = () => setOpen(false)

  const sendMessage = (text) => {
    if (!text.trim()) return
    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const resp = BAT_RESPONSES[Math.floor(Math.random() * BAT_RESPONSES.length)]
      setMessages((m) => [...m, { from: 'bat', text: resp }])
      setTyping(false)
    }, 1000 + Math.random() * 800)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* Chat window */}
      {open && (
        <div className="batchat__window" style={pos.x !== null ? { left: pos.x - 270, top: Math.max(10, pos.y - 520), right: 'auto', bottom: 'auto' } : {}}>
          <div className="batchat__header">
            <div className="batchat__header-info">
              <BatSVG size={32} animate />
              <div>
                <p className="batchat__header-name">BAT</p>
                <p className="batchat__header-status">● Online</p>
              </div>
            </div>
            <button className="batchat__close-btn" onClick={handleClose}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="batchat__messages">
            {messages.map((msg, i) => (
              <div key={i} className={`batchat__msg batchat__msg--${msg.from}`}>
                {msg.from === 'bat' && <BatSVG size={20} />}
                <p className="batchat__msg-text">{msg.text}</p>
              </div>
            ))}
            {typing && (
              <div className="batchat__msg batchat__msg--bat">
                <BatSVG size={20} />
                <div className="batchat__typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </div>

          {/* Perguntas rápidas */}
          <div className="batchat__quick">
            {QUICK_QUESTIONS.map((q) => (
              <button key={q} className="batchat__quick-btn" onClick={() => sendMessage(q)}>
                {q}
              </button>
            ))}
          </div>

          <form className="batchat__input-wrap" onSubmit={handleSubmit}>
            <input
              className="batchat__input"
              placeholder="Digite sua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="batchat__send">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Botão morcego */}
      {!open && (
        <button
          ref={batRef}
          className={`batchat__bat-btn ${acrobacia ? 'batchat__bat-btn--flip' : ''}`}
          onClick={handleOpen}
          onMouseDown={handleMouseDown}
          title="Falar com o Bat"
          style={pos.x !== null ? { left: pos.x, top: pos.y, right: 'auto', bottom: 'auto' } : {}}
        >
          <BatSVG size={100} animate={!acrobacia} />
        </button>
      )}
    </>
  )
}

function BatSVG({ size = 40, animate = false }) {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 100 70"
      className={animate ? 'bat-svg bat-svg--animate' : 'bat-svg'}
    >
      {/* Asa esquerda */}
      <path className="bat-wing bat-wing--left" d="M50 35 Q30 20 10 15 Q5 25 15 30 Q25 32 50 38Z" fill="#ff00aa" />
      {/* Asa direita */}
      <path className="bat-wing bat-wing--right" d="M50 35 Q70 20 90 15 Q95 25 85 30 Q75 32 50 38Z" fill="#ff00aa" />
      {/* Dedos asa esq */}
      <path d="M10 15 Q7 8 12 6" stroke="#c800ff" strokeWidth="1.5" fill="none" />
      <path d="M18 13 Q16 5 21 4" stroke="#c800ff" strokeWidth="1.5" fill="none" />
      <path d="M27 12 Q26 4 31 3" stroke="#c800ff" strokeWidth="1.5" fill="none" />
      {/* Dedos asa dir */}
      <path d="M90 15 Q93 8 88 6" stroke="#c800ff" strokeWidth="1.5" fill="none" />
      <path d="M82 13 Q84 5 79 4" stroke="#c800ff" strokeWidth="1.5" fill="none" />
      <path d="M73 12 Q74 4 69 3" stroke="#c800ff" strokeWidth="1.5" fill="none" />
      {/* Corpo */}
      <ellipse cx="50" cy="38" rx="10" ry="12" fill="#1a0020" />
      {/* Orelhas */}
      <polygon points="43,28 40,18 47,25" fill="#ff00aa" />
      <polygon points="57,28 60,18 53,25" fill="#ff00aa" />
      {/* Olhos */}
      <circle cx="45" cy="36" r="3" fill="#ff00aa" />
      <circle cx="55" cy="36" r="3" fill="#ff00aa" />
      <circle cx="46" cy="35" r="1.2" fill="#fff" />
      <circle cx="56" cy="35" r="1.2" fill="#fff" />
      {/* Nariz */}
      <path d="M48 40 Q50 42 52 40" stroke="#ff00aa" strokeWidth="1" fill="none" />
      {/* Presas */}
      <rect x="47" y="41" width="2.5" height="4" rx="1" fill="white" />
      <rect x="50.5" y="41" width="2.5" height="4" rx="1" fill="white" />
    </svg>
  )
}