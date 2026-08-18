import { story } from '../data/content'
import { Reveal } from './Reveal'
import { Photo } from './Photo'

export function Story() {
  return (
    <section id="story" className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          <div className="lg:col-span-7 lg:col-start-1 order-2 lg:order-1">
            <Reveal>
              <span className="amber-rule mb-6" />
              <p className="kicker mb-6">{story.eyebrow}</p>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="font-display italic text-4xl sm:text-5xl lg:text-6xl max-w-[14ch] text-ivory">
                {story.quote}
              </h2>
            </Reveal>

            <div className="mt-10 space-y-5 max-w-[52ch]">
              {story.paragraphs.map((p, i) => (
                <Reveal key={p.slice(0, 12)} as="p" delay={140 + i * 80} className="text-ivoryDim text-base sm:text-lg">
                  {p}
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2 lg:mt-16">
            <Reveal delay={100}>
              <Photo
                src={story.image.src}
                alt={story.image.alt}
                vignette="soft"
                className="aspect-[4/5] lg:aspect-[3/4]"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
