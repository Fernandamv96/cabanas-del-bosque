import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.to(titleRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to(arrowRef.current, { opacity: 1, duration: 0.6 }, '-=0.3')
  }, [])

  const scrollToBooking = () => {
    const el = document.querySelector('#booking')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/cabin-standard.jpg"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src="/videos/hero-cabin.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.2) 40%, rgba(10,10,10,0.4) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1
          ref={titleRef}
          className="max-w-[700px] font-display text-5xl font-normal text-white opacity-0 md:text-6xl lg:text-7xl"
          style={{
            textShadow: '0 2px 30px rgba(0,0,0,0.5)',
            lineHeight: '1.05',
            letterSpacing: '-1.28px',
            transform: 'translateY(30px)',
          }}
        >
          Refugio en el Corazón del Bosque
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 max-w-[480px] font-body text-lg text-[#b0b0b0] opacity-0"
          style={{
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            transform: 'translateY(20px)',
          }}
        >
          Cabañas boutique con alma artesanal y café de especialidad
        </p>

        <button
          ref={ctaRef}
          onClick={scrollToBooking}
          className="mt-8 rounded-full px-9 py-3.5 font-body text-sm font-medium text-[#0a0a0a] opacity-0 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(193,120,23,0.3)]"
          style={{
            background: '#c17817',
            transform: 'translateY(20px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#d4902a'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#c17817'
          }}
        >
          Reserva tu Estancia
        </button>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={arrowRef}
        className="absolute bottom-8 right-8 z-10 opacity-0"
      >
        <div
          className="flex flex-col items-center gap-2"
          style={{ animation: 'bounce 2s ease-in-out infinite' }}
        >
          <div className="h-6 w-0.5 bg-white/50" />
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </section>
  )
}
