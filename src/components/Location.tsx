import { location } from '../data/content'
import { Reveal } from './Reveal'

export function Location() {
  return (
    <section id="location" className="relative py-24 sm:py-32 lg:py-40 bg-surface/40">
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <span className="amber-rule mb-6" />
          <p className="kicker mb-4">{location.eyebrow}</p>
        </Reveal>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          <Reveal delay={80} className="lg:col-span-8">
            <h2 className="font-display text-[11vw] leading-[0.98] xs:text-6xl sm:text-7xl lg:text-8xl text-ivory">
              {location.address}
            </h2>
          </Reveal>

          <Reveal delay={160} className="lg:col-span-4 flex flex-col justify-end gap-8 border-t border-ivory/10 pt-8 lg:border-t-0 lg:pt-0">
            <div>
              <p className="font-mono uppercase text-xs tracking-[0.2em] text-amber mb-2">{location.hoursLabel}</p>
              <p className="text-lg text-ivory">{location.hours}</p>
            </div>
            <div>
              <p className="font-mono uppercase text-xs tracking-[0.2em] text-amber mb-2">{location.phoneLabel}</p>
              <a href={`tel:${location.phone.replace(/[^+\d]/g, '')}`} className="text-lg text-ivory hover:text-amber transition-colors">
                {location.phone}
              </a>
            </div>
            <div>
              <p className="font-mono uppercase text-xs tracking-[0.2em] text-amber mb-2">{location.telegramLabel}</p>
              <a
                href={`https://t.me/${location.telegram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer noopener"
                className="text-lg text-ivory hover:text-amber transition-colors"
              >
                {location.telegram}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
