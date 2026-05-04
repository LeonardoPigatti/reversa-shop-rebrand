import { useState } from 'react'
import AnnouncementBar from './components/AnnouncementBar/AnnouncementBar'
import Header from './components/Header/Header'
import HeroBanner from './components/HeroBanner/HeroBanner'
import CategorySection from './components/CategorySection/CategorySection'
import ProductGrid from './components/ProductGrid/ProductGrid'
import StoreLocator from './components/StoreLocator/StoreLocator'
import MarqueeStrip from './components/MarqueeStrip/MarqueeStrip'
import Footer from './components/Footer/Footer'




export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  return (
    <>
      <AnnouncementBar />
      <Header />
<main>
  <HeroBanner />
  <CategorySection onSelectCategory={setSelectedCategory} />
  {selectedCategory && (
    <ProductGrid category={selectedCategory} />
  )}
    <MarqueeStrip />
    <StoreLocator />
    <Footer />

</main>
    </>
  )
}
