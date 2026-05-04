import { useState } from 'react'
import Logo from '../Logo/Logo'
import HeaderIcons from '../HeaderIcons/HeaderIcons'
import Navbar from '../Navbar/Navbar'
import CartSidebar from '../CartSidebar/CartSidebar'
import './Header.css'

export default function Header({ onWishlistClick }) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <>
      <header className="header">
        <div className="header__top">
          <Logo />
          <HeaderIcons
            onWishlistClick={onWishlistClick}
            onCartClick={() => setIsCartOpen(true)}
          />
        </div>
        <Navbar />
      </header>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  )
}