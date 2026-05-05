import { useState } from 'react'
import AnnouncementBar from './components/AnnouncementBar/AnnouncementBar'
import Header from './components/Header/Header'
import HeroBanner from './components/HeroBanner/HeroBanner'
import CategorySection from './components/CategorySection/CategorySection'
import ProductGrid from './components/ProductGrid/ProductGrid'
import StoreLocator from './components/StoreLocator/StoreLocator'
import MarqueeStrip from './components/MarqueeStrip/MarqueeStrip'
import WishlistPage from './components/WishlistPage/WishlistPage'
import TodosPage from './components/TodosPage/TodosPage'
import Footer from './components/Footer/Footer'
import Banner from './components/Banner/Banner'


// pageData: { title, filter } — null quando page === 'home' ou 'wishlist'
export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [page, setPage] = useState('home')
  const [pageData, setPageData] = useState(null)

  const handleNavigate = (newPage, data = null) => {
    setPage(newPage)
    setPageData(data)
  }

  return (
    <>
      <AnnouncementBar />
      <Header
        onWishlistClick={() => handleNavigate('wishlist')}
        onNavigate={handleNavigate}
      />

      <main>
        {page === 'wishlist' && (
          <WishlistPage onBack={() => handleNavigate('home')} />
        )}

        {page === 'catalog' && (
          <TodosPage
            title={pageData?.title}
            filter={pageData?.filter}
          />
        )}

        {page === 'home' && (
          <>
            <HeroBanner />
            <CategorySection onSelectCategory={setSelectedCategory} />
            {selectedCategory && <ProductGrid carousel category={selectedCategory} />}
            <Banner url="src\assets\stores\cat.jpg" width="100%" height="125px" text="Uniforme de quem não segue regra"
  textColor="#c2bfbf"
  fontSize="2rem"
  textShadow={true} />
  <ProductGrid onlyOfertas carousel />
  <ProductGrid recentes carousel />
            <StoreLocator />
            <MarqueeStrip />
              <ProductGrid recentes carousel />
          </>
        )}
      </main>

      <Footer />
    </>
  )
}