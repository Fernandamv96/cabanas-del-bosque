import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, Users, ChevronLeft, ChevronRight, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const cabinTypes = [
  {
    id: 'standard',
    name: 'Cabaña Estándar',
    price: 2400,
    image: '/images/cabin-standard.jpg',
    capacity: '2 personas',
  },
  {
    id: 'suite',
    name: 'Cabaña Suite',
    price: 4200,
    image: '/images/cabin-suite.jpg',
    capacity: '2 personas',
  },
  {
    id: 'family',
    name: 'Cabaña Familiar',
    price: 5800,
    image: '/images/cabin-family.jpg',
    capacity: '6 personas',
  },
]

export default function Booking() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const [step, setStep] = useState(1)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [selectedCabin, setSelectedCabin] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const selectedCabinData = cabinTypes.find((c) => c.id === selectedCabin)
  const nights = checkIn && checkOut
    ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)))
    : 0
  const total = nights * (selectedCabinData?.price || 0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from(cardRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.9,
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

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleConfirm = () => {
    setConfirmed(true)
  }

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="relative"
      style={{
        marginTop: '120px',
        paddingTop: '100px',
        paddingBottom: '100px',
      }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(193,120,23,0.3) 35px, rgba(193,120,23,0.3) 36px)`,
        }}
      />

      <div className="relative mx-auto max-w-[800px] px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-12 text-center">
          <h2
            className="font-display text-4xl font-normal text-white md:text-[44px]"
            style={{ lineHeight: '48px', letterSpacing: '-0.88px' }}
          >
            Reserva tu Escapada
          </h2>
          <p className="mt-3 font-body text-sm text-[#b0b0b0]" style={{ letterSpacing: '0.14px' }}>
            Selecciona tus fechas y deja que el bosque te abrace
          </p>
        </div>

        {/* Booking Card */}
        <div
          ref={cardRef}
          className="rounded-xl p-6 md:p-10"
          style={{
            background: '#141414',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
          }}
        >
          {confirmed ? (
            /* Success State */
            <div className="flex flex-col items-center py-8 text-center">
              <div
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                style={{ background: 'rgba(76, 175, 80, 0.15)' }}
              >
                <Check size={32} style={{ color: '#4caf50' }} />
              </div>
              <h3 className="font-display text-2xl font-medium text-white">
                ¡Reservación Confirmada!
              </h3>
              <p className="mt-3 font-body text-sm text-[#b0b0b0]">
                Hemos enviado un correo de confirmación a {email}.<br />
                ¡Te esperamos en Cabañas del Bosque!
              </p>
            </div>
          ) : (
            <>
              {/* Step Indicator */}
              <div className="mb-10">
                <div className="flex items-center justify-center gap-0">
                  {[1, 2, 3].map((s, i) => (
                    <div key={s} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300"
                          style={{
                            background: step >= s ? '#c17817' : 'transparent',
                            border: step >= s ? '2px solid #c17817' : '2px solid rgba(255,255,255,0.2)',
                            color: step >= s ? '#0a0a0a' : '#b0b0b0',
                          }}
                        >
                          {step > s ? <Check size={14} /> : s}
                        </div>
                        <span
                          className="mt-2 hidden font-body text-xs font-medium md:block"
                          style={{ color: step >= s ? '#c17817' : '#b0b0b0' }}
                        >
                          {s === 1 ? 'Fechas' : s === 2 ? 'Huéspedes' : 'Confirmar'}
                        </span>
                      </div>
                      {i < 2 && (
                        <div
                          className="mx-3 mb-5 h-0.5 w-12 transition-all duration-300 md:mx-6 md:w-20"
                          style={{ background: step > s ? '#c17817' : 'rgba(255,255,255,0.08)' }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              <div className="min-h-[320px]">
                {/* Step 1 - Dates */}
                {step === 1 && (
                  <div className="animate-fadeIn">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.36px] text-[#b0b0b0]">
                          Llegada
                        </label>
                        <div className="relative">
                          <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b0b0b0]" />
                          <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full rounded bg-[#0a0a0a] py-3 pl-10 pr-4 font-body text-sm text-white outline-none transition-colors focus:border-[#c17817]"
                            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.36px] text-[#b0b0b0]">
                          Salida
                        </label>
                        <div className="relative">
                          <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b0b0b0]" />
                          <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full rounded bg-[#0a0a0a] py-3 pl-10 pr-4 font-body text-sm text-white outline-none transition-colors focus:border-[#c17817]"
                            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                            min={checkIn || new Date().toISOString().split('T')[0]}
                          />
                        </div>
                      </div>
                    </div>

                    {checkIn && checkOut && nights > 0 && (
                      <div className="mt-6 rounded-lg bg-[rgba(76,175,80,0.08)] p-4">
                        <div className="flex items-center gap-2">
                          <Check size={16} style={{ color: '#4caf50' }} />
                          <span className="font-body text-sm" style={{ color: '#4caf50' }}>
                            Disponible — {nights} {nights === 1 ? 'noche' : 'noches'}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={handleNext}
                        disabled={!checkIn || !checkOut}
                        className="inline-flex items-center gap-2 rounded bg-[#c17817] px-6 py-3 font-body text-sm font-medium text-[#0a0a0a] transition-all hover:bg-[#d4902a] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Continuar <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2 - Guests & Cabin */}
                {step === 2 && (
                  <div className="animate-fadeIn">
                    <h4 className="mb-4 font-body text-sm font-semibold text-[#b0b0b0]">
                      Selecciona tu cabaña
                    </h4>

                    <div className="space-y-3">
                      {cabinTypes.map((cabin) => (
                        <button
                          key={cabin.id}
                          onClick={() => setSelectedCabin(cabin.id)}
                          className="flex w-full items-center gap-4 rounded-lg p-4 text-left transition-all duration-300 hover:-translate-y-0.5"
                          style={{
                            background: selectedCabin === cabin.id ? 'rgba(193,120,23,0.12)' : '#0a0a0a',
                            border: selectedCabin === cabin.id ? '1px solid #c17817' : '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          <img
                            src={cabin.image}
                            alt={cabin.name}
                            className="h-16 w-20 flex-shrink-0 rounded object-cover"
                          />
                          <div className="flex-1">
                            <h5 className="font-display text-lg font-medium text-white">{cabin.name}</h5>
                            <p className="font-body text-xs text-[#b0b0b0]">{cabin.capacity}</p>
                          </div>
                          <span className="font-display text-xl font-semibold" style={{ color: '#c17817' }}>
                            ${cabin.price.toLocaleString()}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center gap-8">
                      <div>
                        <label className="mb-2 flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.36px] text-[#b0b0b0]">
                          <Users size={14} /> Adultos
                        </label>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#c17817] hover:text-[#c17817]"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <span className="font-display text-2xl text-white">{adults}</span>
                          <button
                            onClick={() => setAdults(Math.min(6, adults + 1))}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#c17817] hover:text-[#c17817]"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.36px] text-[#b0b0b0]">
                          <Users size={14} /> Niños
                        </label>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setChildren(Math.max(0, children - 1))}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#c17817] hover:text-[#c17817]"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <span className="font-display text-2xl text-white">{children}</span>
                          <button
                            onClick={() => setChildren(Math.min(4, children + 1))}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#c17817] hover:text-[#c17817]"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <button
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 rounded border border-white/20 px-6 py-3 font-body text-sm font-medium text-white transition-colors hover:border-[#c17817] hover:text-[#c17817]"
                      >
                        <ChevronLeft size={16} /> Regresar
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={!selectedCabin}
                        className="inline-flex items-center gap-2 rounded bg-[#c17817] px-6 py-3 font-body text-sm font-medium text-[#0a0a0a] transition-all hover:bg-[#d4902a] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Continuar <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3 - Confirm */}
                {step === 3 && (
                  <div className="animate-fadeIn">
                    {/* Summary */}
                    <div
                      className="mb-6 rounded-lg p-5"
                      style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <h4 className="mb-4 font-body text-sm font-semibold text-white">Resumen</h4>

                      <div className="space-y-3">
                        <div className="flex justify-between font-body text-sm">
                          <span className="text-[#b0b0b0]">Cabaña</span>
                          <span className="text-white">{selectedCabinData?.name}</span>
                        </div>
                        <div className="flex justify-between font-body text-sm">
                          <span className="text-[#b0b0b0]">Llegada</span>
                          <span className="text-white">{checkIn}</span>
                        </div>
                        <div className="flex justify-between font-body text-sm">
                          <span className="text-[#b0b0b0]">Salida</span>
                          <span className="text-white">{checkOut}</span>
                        </div>
                        <div className="flex justify-between font-body text-sm">
                          <span className="text-[#b0b0b0]">Noches</span>
                          <span className="text-white">{nights}</span>
                        </div>
                        <div className="flex justify-between font-body text-sm">
                          <span className="text-[#b0b0b0]">Huéspedes</span>
                          <span className="text-white">{adults} adultos{children > 0 ? `, ${children} niños` : ''}</span>
                        </div>
                        <div
                          className="my-3"
                          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                        />
                        <div className="flex justify-between">
                          <span className="font-body text-sm text-[#b0b0b0]">Total</span>
                          <span
                            className="font-display text-3xl font-semibold"
                            style={{ color: '#c17817', letterSpacing: '-0.28px' }}
                          >
                            ${total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Contact Form */}
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.36px] text-[#b0b0b0]">
                          Nombre completo
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Tu nombre"
                          className="w-full rounded bg-[#0a0a0a] py-3 px-4 font-body text-sm text-white placeholder-[#555] outline-none transition-all focus:border-[#c17817] focus:shadow-[0_0_0_3px_rgba(193,120,23,0.15)]"
                          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.36px] text-[#b0b0b0]">
                            Correo electrónico
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            className="w-full rounded bg-[#0a0a0a] py-3 px-4 font-body text-sm text-white placeholder-[#555] outline-none transition-all focus:border-[#c17817] focus:shadow-[0_0_0_3px_rgba(193,120,23,0.15)]"
                            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                          />
                        </div>
                        <div>
                          <label className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.36px] text-[#b0b0b0]">
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+52 (81) 1234-5678"
                            className="w-full rounded bg-[#0a0a0a] py-3 px-4 font-body text-sm text-white placeholder-[#555] outline-none transition-all focus:border-[#c17817] focus:shadow-[0_0_0_3px_rgba(193,120,23,0.15)]"
                            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <button
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 rounded border border-white/20 px-6 py-3 font-body text-sm font-medium text-white transition-colors hover:border-[#c17817] hover:text-[#c17817]"
                      >
                        <ChevronLeft size={16} /> Regresar
                      </button>
                      <button
                        onClick={handleConfirm}
                        disabled={!name || !email}
                        className="inline-flex items-center justify-center gap-2 rounded bg-[#c17817] px-8 py-4 font-body text-sm font-semibold text-[#0a0a0a] transition-all hover:bg-[#d4902a] disabled:cursor-not-allowed disabled:opacity-40"
                        style={{ minWidth: '240px' }}
                      >
                        Confirmar Reservación
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Contact email */}
        <p className="mt-6 text-center font-body text-xs text-[#b0b0b0]" style={{ letterSpacing: '0.12px' }}>
          ¿Preguntas? Escríbenos a{' '}
          <a href="mailto:reservas@cabaniasdelbosque.com" className="text-[#c17817] transition-colors hover:text-[#d4902a]">
            reservas@cabaniasdelbosque.com
          </a>
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </section>
  )
}
