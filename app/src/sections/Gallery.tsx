import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  { src: '/images/gallery-1.jpg', alt: 'Pareja disfrutando café en porche al amanecer' },
  { src: '/images/gallery-2.jpg', alt: 'Desayuno gourmet en mesa de madera' },
  { src: '/images/gallery-3.jpg', alt: 'Persona leyendo junto a ventana con lluvia' },
  { src: '/images/gallery-4.jpg', alt: 'Fogata nocturna con amigos' },
  { src: '/images/gallery-5.jpg', alt: 'Vista aérea de cabañas en el bosque' },
  { src: '/images/gallery-6.jpg', alt: 'Baño rústico con tina de cobre' },
  { src: '/images/gallery-7.jpg', alt: 'Sendero de hiking en el bosque' },
  { src: '/images/gallery-8.jpg', alt: 'Café artesanal siendo servido' },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from(stripRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="gallery"
      style={{ marginTop: '120px', paddingTop: '80px', paddingBottom: '40px' }}
    >
      {/* Header */}
      <div ref={headerRef} className="mb-12 px-6 text-center">
        <h2
          className="font-display text-4xl font-normal text-white md:text-[44px]"
          style={{ lineHeight: '48px', letterSpacing: '-0.88px' }}
        >
          Momentos Inolvidables
        </h2>
        <p className="mt-3 font-body text-sm text-[#b0b0b0]" style={{ letterSpacing: '0.14px' }}>
          Cada rincón cuenta una historia
        </p>
      </div>

      {/* Horizontal Strip */}
      <div
        ref={stripRef}
        className="flex gap-4 overflow-x-auto px-6 pb-6"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#c17817 #141414' }}
      >
        {galleryImages.map((img, idx) => (
          <div
            key={idx}
            className="group flex-shrink-0 overflow-hidden rounded-lg"
            style={{ width: '400px' }}
          >
            <div className="overflow-hidden" style={{ aspectRatio: '16/10' }}>
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-[1.03]"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Custom scrollbar indicator */}
      <div className="mx-auto mt-6 h-[3px] w-[120px] overflow-hidden rounded-full bg-[#141414]">
        <div className="h-full w-1/3 rounded-full bg-[#c17817]" />
      </div>
    </section>
  )
}
