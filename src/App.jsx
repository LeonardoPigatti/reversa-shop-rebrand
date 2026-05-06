import { useState } from 'react'
import { CartProvider }     from './context/CartContext'
import { AuthProvider }     from './context/AuthContext'
import { WishlistProvider } from './context/WishlistContext'
import { CarteiraProvider } from './context/CarteiraContext'
import AnnouncementBar  from './components/AnnouncementBar/AnnouncementBar'
import Header           from './components/Header/Header'
import HeroBanner       from './components/HeroBanner/HeroBanner'
import CategorySection  from './components/CategorySection/CategorySection'
import ProductGrid      from './components/ProductGrid/ProductGrid'
import StoreLocator     from './components/StoreLocator/StoreLocator'
import MarqueeStrip     from './components/MarqueeStrip/MarqueeStrip'
import WishlistPage     from './components/WishlistPage/WishlistPage'
import TodosPage        from './components/TodosPage/TodosPage'
import CheckoutPage     from './components/CheckoutPage/CheckoutPage'
import PedidosPage      from './components/PedidosPage/PedidosPage'
import DetalhesPage     from './components/DetalhesPage/DetalhesPage'
import CarteiraPage     from './components/CarteiraPage/CarteiraPage'
import WelcomeDialog    from './components/WelcomeDialog/WelcomeDialog'
import Footer           from './components/Footer/Footer'
import Banner           from './components/Banner/Banner'
import BatChat          from './components/BatChat/BatChat'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [page, setPage] = useState('home')
  const [pageData, setPageData] = useState(null)

  const handleNavigate = (newPage, data = null) => {
    setPage(newPage)
    setPageData(data)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <CarteiraProvider>
            <AnnouncementBar />
            <Header
              onWishlistClick={() => handleNavigate('wishlist')}
              onNavigate={handleNavigate}
              onCheckout={() => handleNavigate('checkout')}
            />

            <main>
              {page === 'wishlist'  && <WishlistPage onBack={() => handleNavigate('home')} />}
              {page === 'catalog'   && <TodosPage title={pageData?.title} filter={pageData?.filter} />}
              {page === 'checkout'  && <CheckoutPage onBack={() => handleNavigate('home')} />}
              {page === 'pedidos'   && <PedidosPage />}
              {page === 'detalhes'  && <DetalhesPage />}
              {page === 'carteira'  && <CarteiraPage />}

              {page === 'home' && (
                <>
                  <HeroBanner />
                  <CategorySection onSelectCategory={setSelectedCategory} />
                  {selectedCategory && <ProductGrid carousel category={selectedCategory} />}
                  <Banner
                    url="src\assets\stores\cat.jpg"
                    width="100%"
                    height="125px"
                    text="Uniforme de quem não segue regra"
                    textColor="#c2bfbf"
                    fontSize="2rem"
                    textShadow={true}
                  />
                  <ProductGrid onlyOfertas carousel />
                  <ProductGrid recentes carousel />
                  <StoreLocator />
                  <MarqueeStrip />
                </>
              )}
            </main>

            {page !== 'checkout' && <Footer />}
            {page === 'home' && <WelcomeDialog />}
            <BatChat />
          </CarteiraProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}