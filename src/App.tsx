import { MotionConfig } from 'framer-motion'
import { BookingProvider } from './context/BookingContext'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Story } from './components/Story'
import { Dishes } from './components/Dishes'
import { Menu } from './components/Menu'
import { Interior } from './components/Interior'
import { Chef } from './components/Chef'
import { Experience } from './components/Experience'
import { ReservationSection } from './components/ReservationSection'
import { Location } from './components/Location'
import { Footer } from './components/Footer'
import { BookingModal } from './components/BookingModal'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BookingProvider>
        <Header />
        <main>
          <Hero />
          <Story />
          <Dishes />
          <Menu />
          <Interior />
          <Chef />
          <Experience />
          <ReservationSection />
          <Location />
        </main>
        <Footer />
        <BookingModal />
      </BookingProvider>
    </MotionConfig>
  )
}

export default App
