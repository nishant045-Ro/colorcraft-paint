import { lazy, Suspense, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import ToastProvider from './components/Toast'
import CursorTrail from './components/CursorTrail'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ColorExplorer from './components/ColorExplorer'
import RoomPainter from './components/RoomPainter'
import PaintCalculator from './components/PaintCalculator'
import Testimonials from './components/Testimonials'
import Services from './components/Services'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { DEFAULT_COLOR } from './data/colors'

const PaintBackground = lazy(() => import('./components/PaintBackground'))

function App() {
  const [selected, setSelected] = useState(DEFAULT_COLOR)

  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <Suspense fallback={null}>
          <PaintBackground accent={selected.hex} />
        </Suspense>
        <CursorTrail color={selected.hex} />
        <Navbar />
        <main>
          <Hero onPick={setSelected} />
          <ColorExplorer selected={selected} onSelect={setSelected} />
          <RoomPainter selected={selected} onSelect={setSelected} />
          <PaintCalculator color={selected} />
          <Services />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </ToastProvider>
    </MotionConfig>
  )
}

export default App
