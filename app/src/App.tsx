import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import About from './sections/About'
import Cabins from './sections/Cabins'
import CafeMenu from './sections/CafeMenu'
import Gallery from './sections/Gallery'
import Booking from './sections/Booking'
import ContactFooter from './sections/ContactFooter'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    let lenisInstance: any = null

    const initLenis = async () => {
      const LenisModule = await import('lenis')
      const Lenis = LenisModule.default || LenisModule

      lenisInstance = new Lenis({
        lerp: 0.1,
        duration: 1.2,
      })

      lenisInstance.on('scroll', ScrollTrigger.update)

      gsap.ticker.add((time: number) => {
        lenisInstance.raf(time * 1000)
      })

      gsap.ticker.lagSmoothing(0)
    }

    initLenis()

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy()
      }
    }
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <Navigation />
      <Hero />
      <About />
      <Cabins />
      <CafeMenu />
      <Gallery />
      <Booking />
      <ContactFooter />
    </div>
  )
}
