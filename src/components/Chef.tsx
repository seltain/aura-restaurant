import { chef } from '../data/content'
import { Reveal } from './Reveal'
import { Photo } from './Photo'

export function Chef() {
  return (
    <section id="chef" className="relative py-24 sm:py-32 lg:py-40 bg-surface/40">
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <Reveal className="lg:col-span-5 lg:col-start-1">
            <Photo
              src={chef.image.src}
              alt={chef.image.alt}
              vignette="melt"
              className="aspect-[4/5] lg:aspect-[3/4]"
            />
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <span className="amber-rule mb-6" />
              <p className="kicker mb-4">{chef.eyebrow}</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ivory">{chef.name}</h2>
              <p className="mt-2 font-mono uppercase text-xs tracking-[0.2em] text-ivoryDim">{chef.role}</p>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-8 font-display italic text-2xl sm:text-3xl text-amber max-w-[22ch] leading-snug">
                «{chef.quote}»
              </p>
            </Reveal>

            <div className="mt-8 space-y-4 max-w-[58ch]">
              {chef.bio.map((p, i) => (
                <Reveal key={p.slice(0, 12)} as="p" delay={180 + i * 80} className="text-ivoryDim">
                  {p}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
