import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Canvas grain texture for Reservar button
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const render = () => {
      const imageData = ctx.createImageData(64, 64)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255
        data[i] = v * 0.6 + 40     // R - warm brown
        data[i + 1] = v * 0.4 + 20 // G
        data[i + 2] = v * 0.15 + 5 // B
        data[i + 3] = 255
      }
      ctx.putImageData(imageData, 0, 0)
      animId = requestAnimationFrame(render)
    }
    animId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(animId)
  }, [])

  const navLinks = [
    { label: 'Cabañas', href: '#cabins' },
    { label: 'Café', href: '#cafe' },
    { label: 'Galería', href: '#gallery' },
    { label: 'Contacto', href: '#contact' },
  ]

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      }}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="font-display text-lg font-medium text-white tracking-wide"
        >
          Cabañas del Bosque
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
              className="font-body text-sm text-[#b0b0b0] transition-colors duration-250 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollTo('#booking')}
            className="relative overflow-hidden rounded-full px-6 py-2.5 font-body text-sm font-medium transition-all duration-300 hover:shadow-[0_4px_20px_rgba(193,120,23,0.3)]"
            style={{
              border: '1px solid rgba(193, 120, 23, 0.5)',
              color: '#c17817',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#c17817'
              e.currentTarget.style.color = '#d4902a'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(193, 120, 23, 0.5)'
              e.currentTarget.style.color = '#c17817'
            }}
          >
            <canvas
              ref={canvasRef}
              width={64}
              height={64}
              className="pointer-events-none absolute inset-0 h-full w-full"
              style={{ imageRendering: 'pixelated', zIndex: 0, opacity: 0.25 }}
            />
            <span className="relative z-[1]">Reservar</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="absolute left-0 right-0 top-16 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl md:hidden"
          style={{ animation: 'slideDown 0.4s ease' }}
        >
          <div className="flex flex-col items-center gap-6 px-6 py-8">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                className="font-body text-lg text-[#b0b0b0] transition-colors hover:text-white"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => scrollTo('#booking')}
              className="mt-2 rounded-full px-8 py-3 font-body text-sm font-medium"
              style={{ background: '#c17817', color: '#0a0a0a' }}
            >
              Reservar
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  )
}
