import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Phone, Clock, Instagram, Facebook, MessageCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
  {
    icon: MapPin,
    title: 'Ubicación',
    lines: [
      'Camino al Bosque Km 12,',
      'Sierra Madre Oriental, México.',
      'A 45 minutos de Monterrey.',
    ],
  },
  {
    icon: Phone,
    title: 'Contacto',
    lines: ['+52 (81) 1234-5678', 'hola@cabaniasdelbosque.com'],
    isEmail: [false, true],
  },
  {
    icon: Clock,
    title: 'Horario',
    lines: [
      'Check-in: 3:00 PM / Check-out: 12:00 PM',
      'Recepción: 8:00 AM - 10:00 PM',
    ],
  },
]

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: MessageCircle, href: '#', label: 'WhatsApp' },
]

export default function ContactFooter() {
  const sectionRef = useRef<HTMLElement>(null)
  const colsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = colsRef.current?.querySelectorAll('.contact-col')
      if (cols) {
        gsap.from(cols, {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact">
      {/* Contact Area */}
      <div className="bg-[#141414]" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div ref={colsRef} className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {contactInfo.map((item, idx) => (
              <div key={idx} className="contact-col flex flex-col items-start">
                <item.icon size={20} className="mb-4 text-[#b0b0b0]" />
                <h4 className="mb-3 font-body text-sm font-semibold text-white">{item.title}</h4>
                {item.lines.map((line, i) => (
                  <p key={i} className="font-body text-sm text-[#b0b0b0]" style={{ letterSpacing: '0.14px' }}>
                    {item.isEmail && item.isEmail[i] ? (
                      <a href={`mailto:${line}`} className="transition-colors hover:text-[#c17817]">
                        {line}
                      </a>
                    ) : (
                      line
                    )}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <footer
        className="border-t border-white/8"
        style={{ borderColor: 'rgba(255,255,255,0.08)', padding: '32px 0' }}
      >
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <p className="font-body text-xs text-[#b0b0b0]" style={{ letterSpacing: '0.12px' }}>
            © 2026 Cabañas del Bosque. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-[#b0b0b0] transition-colors duration-250 hover:text-[#c17817]"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </section>
  )
}
