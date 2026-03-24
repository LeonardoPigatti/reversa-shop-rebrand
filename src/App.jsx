import AnnouncementBar from './components/AnnouncementBar/AnnouncementBar'
import Header from './components/Header/Header'
import HeroBanner from './components/HeroBanner/HeroBanner'
import CategorySection from './components/CategorySection/CategorySection'

export default function App() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <HeroBanner />
        {/* <CategorySection /> */}
      </main>
    </>
  )
}
