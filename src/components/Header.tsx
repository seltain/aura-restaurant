import { useEffect, useState } from 'react'
import { nav } from '../data/content'
import { useBooking } from '../context/BookingContext'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { openBooking } = useBooking()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [menuOpen])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || menuOpen ? 'bg-ground/90 backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-content mx-auto flex items-center justify-between px-5 sm:px-8 lg:px-12 h-[76px] lg:h-[88px]">
          <a href="#top" className="font-display text-2xl tracking-[0.12em] text-ivory">
            AURA
          </a>

          <nav className="hidden lg:flex items-center gap-9" aria-label="Основная навигация">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="kicker text-ivoryDim hover:text-amber transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <button type="button" onClick={openBooking} className="btn-outline">
              Забронировать стол
            </button>
          </div>

          <button
            type="button"
            className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[6px]"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={`block h-px w-6 bg-ivory transition-transform duration-300 ${menuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`}
            />
            <span
              className={`block h-px w-6 bg-ivory transition-transform duration-300 ${menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </header>

      {/* rendered outside <header> so header's conditional backdrop-blur never
          becomes a containing block that would clip this fixed overlay */}
      <div
        id="mobile-nav"
        className={`lg:hidden fixed inset-0 z-40 bg-ground transition-opacity duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="h-full flex flex-col items-center justify-center gap-8" aria-label="Мобильная навигация">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="font-display text-4xl xs:text-5xl text-ivory hover:text-amber transition-colors duration-300"
              style={{ transitionDelay: menuOpen ? `${i * 40}ms` : '0ms' }}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              handleNavClick()
              openBooking()
            }}
            className="btn-filled mt-4"
          >
            Забронировать стол
          </button>
        </nav>
      </div>
    </>
  )
}
