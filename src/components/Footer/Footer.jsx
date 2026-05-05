import './Footer.css'
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP, FaSpotify, FaWhatsapp, FaTiktok } from 'react-icons/fa'

const SOCIALS = [
  { icon: <FaFacebookF />, href: '#' },
  { icon: <FaInstagram />, href: '#' },
  { icon: <FaYoutube />,   href: '#' },
  { icon: <FaPinterestP />, href: '#' },
  { icon: <FaSpotify />,   href: '#' },
  { icon: <FaWhatsapp />,  href: '#' },
  { icon: <FaTiktok />,    href: '#' },
]

const LINKS = {
  DEPARTAMENTOS: ['Acessórios', 'Calçados', 'Decor', 'Feminino', 'Masculino', 'Plus Size', 'Ver Todos'],
  'LOJA MIDNIGHT QUEENS CLUB': ['Presentes', 'Black Friday', 'Ofertas', 'Halloween', 'Lollapalooza', 'Looks Para Festivais', 'Looks Pra Trabalhar'],
  INSTITUCIONAL: ['Quem Somos', 'Onde Encontrar', 'Minha Conta', 'Rastrear Pedido', 'Contato'],
  'INFORMAÇÕES ÚTEIS': ['Entregas e Prazos', 'Trocas e Devoluções', 'Termos e Condições', 'Política de Privacidade', 'Garantia'],
}

export default function Footer() {
  return (
    <footer className="footer">

      {/* Newsletter */}
      <div className="footer__newsletter">
        <div className="footer__newsletter-text">
          <strong>ASSINE NOSSA NEWSLETTER</strong>
          <p>Cadastre seu e-mail para receber ofertas exclusivas!</p>
        </div>
        <div className="footer__newsletter-form">
          <input type="text" placeholder="Nome" className="footer__input" />
          <input type="email" placeholder="Email" className="footer__input" />
          <button className="footer__btn">CADASTRAR</button>
        </div>
      </div>

      {/* Main */}
      <div className="footer__main">

        {/* Coluna brand */}
        <div className="footer__brand">
          <span className="footer__logo">MIDNIGHT</span>
          <p className="footer__desc">
            A melhor e mais variada loja em moda alternativa! Vestuário, calçados, acessórios, bolsas e muito mais!
          </p>
          <div className="footer__socials">
            {SOCIALS.map((s, i) => (
              <a key={i} href={s.href} className="footer__social-link">{s.icon}</a>
            ))}
          </div>
        </div>

        {/* Coluna Brava */}
        <div className="footer__brava">
          <span className="footer__brava-title">BRAVA<br /><small>ESTÚDIO</small></span>
<p
  className="footer__desc"
  style={{ bottom: '25px', position: 'relative' }}
>
  Conheça também o Brava Estúdio. O melhor salão alternativo de São Paulo
</p>
          <div className="footer__socials">
            {SOCIALS.map((s, i) => (
              <a key={i} href={s.href} className="footer__social-link">{s.icon}</a>
            ))}
          </div>
        </div>

        {/* Colunas de links */}
        {Object.entries(LINKS).map(([title, items]) => (
          <div key={title} className="footer__col">
            <h4 className="footer__col-title">{title}</h4>
            <ul className="footer__col-list">
              {items.map((item) => (
                <li key={item}><a href="#" className="footer__link">{item}</a></li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* Bottom */}
      <div className="footer__bottom">
        <p>MIDNIGHT QUEENS CLUB Comércio Ltda. | CNPJ: 19.517.809/0001-13 © 2013-2025 - Todos Direitos Reservados - Av. São João, 439. Loja 280. CEP 01035-001. São Paulo - SP - Brasil. Telefone Whatsapp (11) 91861-7964. falecom@lojamidnight</p>
      </div>

    </footer>
  )
}