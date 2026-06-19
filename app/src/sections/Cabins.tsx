import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const cabinsData = [
  {
    id: 'standard',
    name: 'Cabaña Estándar',
    description: 'Acogedora cabaña para dos, perfecta para una escapada romántica. Cama king-size, chimenea y vista al bosque.',
    price: '$2,400',
    image: '/images/cabin-standard.jpg',
    category: 'estandar',
  },
  {
    id: 'suite',
    name: 'Cabaña Suite',
    description: 'Espacio amplio con sala privada, jacuzzi exterior y terraza panorámica. Ideal para lunas de miel.',
    price: '$4,200',
    image: '/images/cabin-suite.jpg',
    category: 'suite',
  },
  {
    id: 'family',
    name: 'Cabaña Familiar',
    description: 'Dos habitaciones, cocina equipada y área de juegos. Capacidad para 6 personas.',
    price: '$5,800',
    image: '/images/cabin-family.jpg',
    category: 'familiar',
  },
]

const filters = [
  { key: 'todas', label: 'Todas' },
  { key: 'estandar', label: 'Estándar' },
  { key: 'suite', label: 'Suite' },
  { key: 'familiar', label: 'Familiar' },
]

export default function Cabins() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState('todas')

  const filteredCabins = activeFilter === 'todas'
    ? cabinsData
    : cabinsData.filter((c) => c.category === activeFilter)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current?.children || [], {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="cabins"
      className="bg-[#141414] py-20"
      style={{ marginTop: '120px' }}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <h2
            className="font-display text-4xl font-normal text-white md:text-[44px]"
            style={{ lineHeight: '48px', letterSpacing: '-0.88px' }}
          >
            Nuestras Cabañas
          </h2>

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className="rounded-full px-5 py-2 font-body text-[13px] font-medium transition-all duration-300"
                style={{
                  background: activeFilter === f.key ? '#c17817' : 'transparent',
                  color: activeFilter === f.key ? '#0a0a0a' : '#b0b0b0',
                  border: activeFilter === f.key ? 'none' : '1px solid rgba(255,255,255,0.12)',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCabins.map((cabin) => (
            <div
              key={cabin.id}
              className="group cursor-pointer overflow-hidden rounded-lg bg-[#0a0a0a] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img
                  src={cabin.image}
                  alt={cabin.name}
                  className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-5">
                <h3
                  className="font-display text-2xl font-medium text-white"
                  style={{ letterSpacing: '-0.24px' }}
                >
                  {cabin.name}
                </h3>

                <p className="mt-2 line-clamp-2 font-body text-xs leading-4 text-[#b0b0b0]"
                  style={{ letterSpacing: '0.12px' }}
                >
                  {cabin.description}
                </p>

                <p
                  className="mt-3 font-display text-2xl font-semibold"
                  style={{ color: '#c17817', letterSpacing: '-0.28px' }}
                >
                  {cabin.price}{' '}
                  <span className="font-body text-xs font-normal text-[#b0b0b0]">/ noche</span>
                </p>

                <button
                  className="mt-4 inline-flex items-center gap-2 font-body text-[13px] font-medium transition-colors"
                  style={{ color: '#c17817' }}
                  onClick={() => {
                    const el = document.querySelector('#booking')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Ver detalles <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
