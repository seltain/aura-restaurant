import { experience } from '../data/content'
import { Reveal } from './Reveal'

export function Experience() {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40">
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <span className="amber-rule mb-6" />
          <p className="kicker mb-4">{experience.eyebrow}</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl">{experience.title}</h2>
        </Reveal>

        <ul className="mt-16 sm:mt-20 divide-y divide-ivory/10 border-t border-ivory/10">
          {experience.items.map((item, i) => (
            <Reveal key={item.number} as="li" delay={i * 90}>
              <div className="group py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 lg:items-baseline transition-colors duration-500">
                <span className="font-mono text-amber/60 text-sm lg:col-span-1 group-hover:text-amber transition-colors duration-500">
                  {item.number}
                </span>
                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl lg:col-span-4 text-ivory group-hover:text-amber transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="lg:col-span-7 text-ivoryDim max-w-[56ch] opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
