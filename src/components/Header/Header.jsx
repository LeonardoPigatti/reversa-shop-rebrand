import Logo from '../Logo/Logo'
import HeaderIcons from '../HeaderIcons/HeaderIcons'
import Navbar from '../Navbar/Navbar'
import './Header.css'

export default function Header({ onWishlistClick }) {
  return (
    <header className="header">
      <div className="header__top">
        <Logo />
        <HeaderIcons onWishlistClick={onWishlistClick} />
      </div>
      <Navbar />
    </header>
  )
}