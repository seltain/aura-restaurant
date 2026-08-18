import { interior } from '../data/content'
import { Reveal } from './Reveal'
import { Photo } from './Photo'

const offsets = ['', 'lg:mt-20', 'lg:-mt-10', 'lg:mt-10']
const ratios = ['aspect-[3/4]', 'aspect-[4/3]', 'aspect-[3/4]', 'aspect-[4/5]']

export function Interior() {
  return (
    <section id="interior" className="relative py-24 sm:py-32 lg:py-40">
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <span className="amber-rule mb-6" />
          <p className="kicker mb-4">{interior.eyebrow}</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl">{interior.title}</h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-5 max-w-[52ch] text-ivoryDim text-base sm:text-lg">{interior.intro}</p>
        </Reveal>

        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {interior.images.map((img, i) => (
            <Reveal key={img.src} delay={i * 80} className={offsets[i % offsets.length]}>
              <figure className="group relative overflow-hidden cursor-default">
                <Photo
                  src={img.src}
                  alt={img.alt}
                  vignette="soft"
                  className={`${ratios[i % ratios.length]} transition-transform duration-700 ease-candle group-hover:scale-[1.04]`}
                />
                <div className="absolute inset-0 bg-ground/0 group-hover:bg-ground/45 transition-colors duration-500" />
                <figcaption className="absolute left-0 right-0 bottom-0 p-5 sm:p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-candle">
                  <span className="font-display italic text-xl sm:text-2xl text-ivory">{img.caption}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
