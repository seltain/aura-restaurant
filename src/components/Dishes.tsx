import { dishes } from '../data/content'
import { Reveal } from './Reveal'
import { Photo } from './Photo'

const priceFormatter = new Intl.NumberFormat('ru-RU')

export function Dishes() {
  let portraitCount = 0

  return (
    <section id="dishes" className="relative py-24 sm:py-32 lg:py-40">
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <span className="amber-rule mb-6" />
          <p className="kicker mb-4">Кухня</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl max-w-[16ch]">Фирменные блюда</h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-5 max-w-[52ch] text-ivoryDim text-base sm:text-lg">
            Сибирский продукт в современной подаче — то, ради чего гости возвращаются в AURA снова.
          </p>
        </Reveal>

        <div className="mt-16 sm:mt-20 flex flex-col gap-20 sm:gap-24 lg:gap-32">
          {dishes.map((dish) => {
            const isLandscape = dish.orientation === 'landscape'
            const imageFirst = !isLandscape && portraitCount % 2 === 0
            if (!isLandscape) portraitCount += 1

            return (
              <article
                key={dish.id}
                className={`group grid grid-cols-1 items-center gap-8 lg:gap-14 ${
                  isLandscape ? '' : 'lg:grid-cols-12'
                }`}
              >
                {isLandscape ? (
                  <>
                    <Reveal className="relative">
                      <div className="relative overflow-hidden">
                        <Photo
                          src={dish.image.src}
                          alt={dish.image.alt}
                          vignette="soft"
                          className="aspect-[16/10] sm:aspect-[21/9] transition-transform duration-700 ease-candle group-hover:scale-[1.03]"
                        />
                        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 [background:radial-gradient(60%_60%_at_50%_50%,rgba(200,155,90,0.22),transparent_70%)]" />
                      </div>
                    </Reveal>
                    <Reveal delay={100} className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 mt-6 sm:mt-8">
                      <div>
                        <h3 className="font-display text-3xl sm:text-4xl text-ivory">{dish.name}</h3>
                        <p className="mt-2 text-ivoryDim max-w-[54ch]">{dish.description}</p>
                      </div>
                      <p className="font-mono text-amber text-lg whitespace-nowrap">{priceFormatter.format(dish.price)} ₽</p>
                    </Reveal>
                  </>
                ) : (
                  <>
                    <Reveal
                      className={`lg:col-span-7 relative ${imageFirst ? 'lg:order-1' : 'lg:order-2'}`}
                    >
                      <div className="relative overflow-hidden">
                        <Photo
                          src={dish.image.src}
                          alt={dish.image.alt}
                          vignette="soft"
                          objectPosition={dish.id === 'dish-4' ? 'center 78%' : undefined}
                          className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] transition-transform duration-700 ease-candle group-hover:scale-[1.03]"
                        />
                        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 [background:radial-gradient(60%_60%_at_50%_50%,rgba(200,155,90,0.24),transparent_70%)]" />
                      </div>
                    </Reveal>

                    <Reveal
                      delay={100}
                      className={`lg:col-span-5 ${imageFirst ? 'lg:order-2' : 'lg:order-1'}`}
                    >
                      <p className="font-mono text-xs tracking-[0.24em] uppercase text-ivory/35">Блюдо</p>
                      <h3 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl text-ivory">{dish.name}</h3>
                      <p className="mt-4 text-ivoryDim max-w-[42ch]">{dish.description}</p>
                      <p className="mt-6 font-mono text-amber text-lg">{priceFormatter.format(dish.price)} ₽</p>
                    </Reveal>
                  </>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
