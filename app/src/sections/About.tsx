import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const body1Ref = useRef<HTMLParagraphElement>(null)
  const body2Ref = useRef<HTMLParagraphElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const img1Ref = useRef<HTMLDivElement>(null)
  const img2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .to(body1Ref.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .to(body2Ref.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .to(img1Ref.current, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, '-=0.8')
        .to(img2Ref.current, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, '-=0.8')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="mx-auto max-w-[1200px] px-6"
      style={{ marginTop: '120px', marginBottom: '120px' }}
    >
      <div className="flex flex-col gap-12 md:flex-row md:gap-16">
        {/* Left Column - Text */}
        <div className="md:w-[55%] md:pt-8">
          <span
            ref={labelRef}
            className="mb-4 block font-body text-xs font-semibold uppercase tracking-[0.36px] text-[#b0b0b0] opacity-0"
            style={{ transform: 'translateY(20px)' }}
          >
            NUESTRA HISTORIA
          </span>

          <h2
            ref={titleRef}
            className="font-display text-4xl font-normal text-white opacity-0 md:text-[44px]"
            style={{
              lineHeight: '48px',
              letterSpacing: '-0.88px',
              transform: 'translateY(40px)',
            }}
          >
            Donde la Naturaleza Abraza el Confort
          </h2>

          <p
            ref={body1Ref}
            className="mt-6 font-body text-sm leading-5 text-[#b0b0b0] opacity-0"
            style={{ letterSpacing: '0.14px', transform: 'translateY(30px)' }}
          >
            Ubicadas en el corazón de la Sierra Madre, nuestras cabañas ofrecen una experiencia
            única que fusiona el encanto rústico con el lujo contemporáneo. Cada cabaña ha sido
            diseñada con materiales locales — madera de pino, piedra volcánica y artesanías
            regionales — para crear un espacio que respira junto con el bosque.
          </p>

          <p
            ref={body2Ref}
            className="mt-4 font-body text-sm leading-5 text-[#b0b0b0] opacity-0"
            style={{ letterSpacing: '0.14px', transform: 'translateY(30px)' }}
          >
            Nuestro café artesanal, tostado en pequeños lotes, es el compañero perfecto para las
            mañanas neblinosas y las tardes de lectura junto a la chimenea.
          </p>
        </div>

        {/* Right Column - Images */}
        <div className="relative md:w-[45%]">
          <div
            ref={img1Ref}
            className="ml-auto w-[70%] overflow-hidden rounded-lg opacity-0 md:w-[60%]"
            style={{
              transform: 'scale(0.95)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            <img
              src="/images/about-1.jpg"
              alt="Interior acogedor de cabaña con chimenea"
              className="h-auto w-full object-cover transition-transform duration-400 hover:scale-[1.03]"
            />
          </div>

          <div
            ref={img2Ref}
            className="relative -mt-10 mr-auto w-[80%] overflow-hidden rounded-lg opacity-0 md:-mt-10"
            style={{
              transform: 'scale(0.95)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            <img
              src="/images/about-2.jpg"
              alt="Taza de café en porche de cabaña"
              className="h-auto w-full object-cover transition-transform duration-400 hover:scale-[1.03]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
