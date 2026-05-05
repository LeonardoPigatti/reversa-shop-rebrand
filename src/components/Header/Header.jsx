import { useState } from 'react'
import Logo from '../Logo/Logo'
import HeaderIcons from '../HeaderIcons/HeaderIcons'
import Navbar from '../Navbar/Navbar'
import CartSidebar from '../CartSidebar/CartSidebar'
import AuthSidebar from '../AuthSidebar/AuthSidebar'
import './Header.css'

export default function Header({ onWishlistClick, onNavigate, onCheckout }) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  return (
    <>
      <header className="header">
        <div className="header__top">
          <Logo />
          <HeaderIcons
            onWishlistClick={onWishlistClick}
            onCartClick={() => setIsCartOpen(true)}
            onLoginClick={() => setIsAuthOpen(true)}
          />
        </div>
        <Navbar onNavigate={onNavigate} />
      </header>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={onCheckout}
      />

      <AuthSidebar
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </>
  )
}