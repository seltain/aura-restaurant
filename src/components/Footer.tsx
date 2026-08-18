import { nav, footer, location } from '../data/content'
import { useBooking } from '../context/BookingContext'

export function Footer() {
  const { openBooking } = useBooking()

  return (
    <footer className="relative border-t border-ivory/10 pt-16 pb-10">
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div>
            <a href="#top" className="font-display text-3xl tracking-[0.1em] text-ivory">
              AURA
            </a>
            <p className="mt-4 text-sm text-ivoryDim max-w-[28ch]">{footer.description}</p>
            <button type="button" onClick={openBooking} className="btn-outline mt-6">
              Забронировать стол
            </button>
          </div>

          <div>
            <p className="font-mono uppercase text-xs tracking-[0.2em] text-amber mb-4">Навигация</p>
            <nav className="flex flex-col gap-3" aria-label="Навигация в подвале">
              {nav.map((item) => (
                <a key={item.href} href={item.href} className="text-ivoryDim hover:text-amber transition-colors">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-mono uppercase text-xs tracking-[0.2em] text-amber mb-4">Контакты</p>
            <address className="not-italic flex flex-col gap-3 text-ivoryDim">
              <span>{location.address}</span>
              <a href={`tel:${location.phone.replace(/[^+\d]/g, '')}`} className="hover:text-amber transition-colors">
                {location.phone}
              </a>
              <a
                href={`https://t.me/${location.telegram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-amber transition-colors"
              >
                {location.telegram}
              </a>
            </address>
          </div>

          <div>
            <p className="font-mono uppercase text-xs tracking-[0.2em] text-amber mb-4">{location.hoursLabel}</p>
            <p className="text-ivoryDim">{location.hours}</p>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-ivory/10 text-xs text-ivory/35 font-mono tracking-wide">
          {footer.copyright}
        </div>
      </div>
    </footer>
  )
}
