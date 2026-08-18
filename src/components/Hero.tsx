import { useEffect, useRef, useState } from 'react'
import { hero } from '../data/content'
import { useBooking } from '../context/BookingContext'

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const imgRef = useRef<HTMLDivElement | null>(null)
  const { openBooking } = useBooking()
  const [imageFailed, setImageFailed] = useState(false)

  // Signature motif: a warm glow that drifts gently toward the cursor.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let raf = 0
    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        section.style.setProperty('--glow-x', `${x}%`)
        section.style.setProperty('--glow-y', `${y}%`)
      })
    }
    section.addEventListener('mousemove', handleMove)
    return () => {
      section.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Subtle parallax drift on the hero photo while scrolling.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        if (y < window.innerHeight && imgRef.current) {
          imgRef.current.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(1.06)`
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden flex items-end"
    >
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        {imageFailed ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-surface" role="img" aria-label={hero.image.alt}>
            <span className="w-6 h-6 rounded-full border border-amber/60" />
            <span className="font-mono uppercase tracking-[0.18em] text-xs text-ivory/40">
              {hero.image.src.split('/').pop()}
            </span>
          </div>
        ) : (
          <img
            src={hero.image.src}
            alt={hero.image.alt}
            className="w-full h-full object-cover"
            style={{ filter: 'sepia(0.18) saturate(1.1) brightness(0.62) hue-rotate(-6deg) contrast(1.05)' }}
            fetchPriority="high"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>

      {/* base darkening + bottom gradient so text stays legible */}
      <div className="absolute inset-0 bg-gradient-to-t from-ground via-ground/35 to-ground/10" />
      <div className="absolute inset-0 bg-ground/25" />
      {/* edges melt into the page background rather than cropping hard */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 min(18vw, 220px) rgba(18, 14, 11, 0.9)',
          background:
            'radial-gradient(ellipse at 50% 40%, transparent 45%, rgba(18,14,11,0.55) 88%, #120E0B 100%)',
        }}
      />

      {/* candlelight glow motif */}
      <div className="candle-glow" style={{ ['--glow-x' as string]: '55%', ['--glow-y' as string]: '35%' }} />

      <div className="relative z-10 w-full max-w-content mx-auto px-5 sm:px-8 lg:px-12 pb-16 sm:pb-20 lg:pb-28">
        <p className="kicker mb-4">{hero.kicker}</p>

        <h1 className="font-display italic text-[13vw] xs:text-[11vw] sm:text-6xl md:text-7xl lg:text-[5.5rem] max-w-[16ch] text-ivory">
          {hero.headline}
        </h1>

        <p className="mt-6 max-w-[38ch] text-lg sm:text-xl text-ivoryDim">{hero.subheadline}</p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button type="button" onClick={openBooking} className="btn-filled">
            {hero.ctaPrimary}
          </button>
          <a href="#menu" className="btn-outline">
            {hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  )
}
