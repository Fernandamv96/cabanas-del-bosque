import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const menuCategories = [
  {
    name: 'Cafés',
    items: [
      { name: 'Americano', price: '$45' },
      { name: 'Cappuccino', price: '$65' },
      { name: 'Latte', price: '$70' },
      { name: 'Espresso', price: '$50' },
      { name: 'Moka', price: '$60' },
    ],
  },
  {
    name: 'Tés',
    items: [
      { name: 'Verde', price: '$60' },
      { name: 'Limón', price: '$60' },
      { name: 'Finas Hierbas', price: '$65' },
    ],
  },
  {
    name: 'Pasteles',
    items: [
      { name: 'Lemon Pie', price: '$85' },
      { name: 'Tarta de Manzana', price: '$90' },
      { name: 'Cheesecake', price: '$95' },
      { name: 'Chocolate', price: '$85' },
    ],
  },
]

export default function CafeMenu() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [openCategory, setOpenCategory] = useState<number | null>(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imgRef.current, {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })

      const els = contentRef.current?.querySelectorAll('.animate-in')
      if (els) {
        gsap.from(els, {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="cafe"
      className="mx-auto max-w-[1200px] px-6"
      style={{ marginTop: '120px', marginBottom: '120px' }}
    >
      <div className="flex flex-col gap-12 md:flex-row md:gap-16">
        {/* Left - Image */}
        <div ref={imgRef} className="md:w-[40%]">
          <div
            className="overflow-hidden rounded-lg"
            style={{ aspectRatio: '3/4', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
          >
            <img
              src="/images/cafe-interior.jpg"
              alt="Interior de cafetería artesanal"
              className="h-full w-full object-cover transition-transform duration-400 hover:scale-[1.03]"
            />
          </div>
        </div>

        {/* Right - Menu Content */}
        <div ref={contentRef} className="md:w-[60%]">
          <span className="animate-in mb-4 block font-body text-xs font-semibold uppercase tracking-[0.36px] text-[#b0b0b0]">
            CAFÉ ARTESANAL
          </span>

          <h2
            className="animate-in font-display text-4xl font-normal text-white md:text-[44px]"
            style={{ lineHeight: '48px', letterSpacing: '-0.88px' }}
          >
            Sabores del Bosque
          </h2>

          <p className="animate-in mt-4 font-body text-sm leading-5 text-[#b0b0b0]" style={{ letterSpacing: '0.14px' }}>
            Nuestro café es tostado artesanalmente en lotes pequeños, seleccionando los mejores
            granos de Chiapas y Veracruz. Cada taza cuenta una historia de montañas, niebla y dedicación.
          </p>

          {/* Accordion */}
          <div className="animate-in mt-8 space-y-3">
            {menuCategories.map((cat, idx) => (
              <div
                key={cat.name}
                className="overflow-hidden rounded-lg"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <button
                  onClick={() => setOpenCategory(openCategory === idx ? null : idx)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
                >
                  <h4 className="font-body text-lg font-medium text-white">{cat.name}</h4>
                  <Plus
                    size={18}
                    className="text-[#b0b0b0] transition-transform duration-300"
                    style={{
                      transform: openCategory === idx ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>

                <div
                  className="overflow-hidden transition-all duration-400"
                  style={{
                    maxHeight: openCategory === idx ? '400px' : '0px',
                    opacity: openCategory === idx ? 1 : 0,
                  }}
                >
                  <div className="space-y-0 px-5 pb-4">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between py-3"
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <span className="font-body text-sm text-[#b0b0b0]">{item.name}</span>
                        <div className="mx-4 flex-1" style={{ borderBottom: '1px dotted rgba(255,255,255,0.15)' }} />
                        <span
                          className="font-display text-xl font-semibold"
                          style={{ color: '#b0b0b0', letterSpacing: '-0.2px' }}
                        >
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="animate-in mt-8 rounded-full px-7 py-3 font-body text-sm font-medium transition-all duration-300 hover:bg-[#c17817] hover:text-[#0a0a0a]"
            style={{
              border: '1px solid #c17817',
              color: '#c17817',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#c17817'
              e.currentTarget.style.color = '#0a0a0a'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#c17817'
            }}
          >
            Visita Nuestro Café
          </button>
        </div>
      </div>
    </section>
  )
}
