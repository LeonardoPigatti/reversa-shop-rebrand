import { useEffect, useState } from 'react'
import './WelcomeDialog.css'

export default function WelcomeDialog() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Só mostra uma vez por sessão
    const visto = sessionStorage.getItem('rvlt_welcome')
    if (!visto) {
      setTimeout(() => setVisible(true), 800)
    }
  }, [])

  const fechar = () => {
    sessionStorage.setItem('rvlt_welcome', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="wd-backdrop" onClick={fechar}>
      <div className="wd-modal" onClick={(e) => e.stopPropagation()}>

        {/* Cantos decorativos */}
        <div className="wd-corner wd-corner--tl" />
        <div className="wd-corner wd-corner--tr" />
        <div className="wd-corner wd-corner--bl" />
        <div className="wd-corner wd-corner--br" />

        {/* Fechar */}
        <button className="wd-close" onClick={fechar} title="Fechar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Esquerda — imagem */}
        <div className="wd-left">
          <img
            src="src/assets/stores/mari.jpg"
            alt="RVLT Store"
            className="wd-img"
          />
          <div className="wd-img-overlay" />
          <p className="wd-img-tag">EST. 2018 · SÃO PAULO</p>
        </div>

        {/* Direita — texto */}
        <div className="wd-right">
          <span className="wd-eyebrow">💥🦄💿 NOVA COLEÇÃO 💿🦄💥</span>
          <h2 className="wd-title" data-text="MIDNIGHT QUEENS CLUB × MARIMOON">MIDNIGHT QUEENS CLUB × MARIMOON</h2>

          <div className="wd-divider" />

          <p className="wd-text">
            <strong>ALERTA:</strong> essa coleção não faz sentido — e é exatamente por isso que funciona.
          </p>
          <p className="wd-text">
            Criada com a mente caótica e icônica da Marimoon, isso aqui é um surto fashion coletivo: 
            cor batendo com cor, estampa brigando com estampa, textura em cima de textura e <em>zero vontade de ser "normal"</em>.
          </p>
          <p className="wd-text wd-text--destaque">
            É glitch, é emo, é pop, é kawaii, é tudo junto AO MESMO TEMPO.
          </p>
          <p className="wd-text wd-text--small">
            💖 Se fez sentido demais, você usou errado. &nbsp; 💖 Se ficou estranho, perfeito.
          </p>

          <button className="wd-btn" onClick={fechar}>
            MISTURA. EXAGERA. REINVENTA. 💿✨
          </button>

          <button className="wd-skip" onClick={fechar}>
            Não mostrar novamente
          </button>
        </div>

      </div>
    </div>
  )
}