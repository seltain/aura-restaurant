import { reservation } from '../data/content'
import { Reveal } from './Reveal'
import { useBooking } from '../context/BookingContext'

export function ReservationSection() {
  const { openBooking } = useBooking()

  return (
    <section id="reservation" className="relative py-28 sm:py-36 lg:py-48 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{ background: 'radial-gradient(60% 60% at 50% 40%, rgba(200,155,90,0.10), transparent 70%)' }}
      />
      <div className="relative max-w-content mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <Reveal className="flex flex-col items-center">
          <span className="amber-rule mb-6" />
          <p className="kicker mb-6 text-center">{reservation.eyebrow}</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display italic text-5xl sm:text-6xl lg:text-7xl max-w-[16ch] mx-auto">
            {reservation.title}
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-6 text-ivoryDim text-lg max-w-[42ch] mx-auto">{reservation.subtitle}</p>
        </Reveal>
        <Reveal delay={200}>
          <button type="button" onClick={openBooking} className="btn-filled mt-10">
            {reservation.ctaButton}
          </button>
        </Reveal>
      </div>
    </section>
  )
}
