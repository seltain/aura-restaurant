import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { menu } from '../data/content'
import { Reveal } from './Reveal'

const priceFormatter = new Intl.NumberFormat('ru-RU')

export function Menu() {
  const [activeId, setActiveId] = useState(menu[0].id)
  const active = menu.find((c) => c.id === activeId) ?? menu[0]

  return (
    <section id="menu" className="relative py-24 sm:py-32 lg:py-40 bg-surface/40">
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <span className="amber-rule mb-6" />
          <p className="kicker mb-4">Меню</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl">Полное меню</h2>
        </Reveal>

        <Reveal delay={140}>
          <div
            role="tablist"
            aria-label="Категории меню"
            className="mt-12 sm:mt-14 flex gap-2 overflow-x-auto pb-1 -mx-5 px-5 sm:mx-0 sm:px-0 scrollbar-none"
          >
            {menu.map((category) => {
              const isActive = category.id === activeId
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`menu-panel-${category.id}`}
                  id={`menu-tab-${category.id}`}
                  onClick={() => setActiveId(category.id)}
                  className={`relative whitespace-nowrap font-mono uppercase text-xs sm:text-sm tracking-[0.18em] px-5 py-3 border transition-colors duration-300 ${
                    isActive
                      ? 'border-amber text-amber'
                      : 'border-ivory/15 text-ivoryDim hover:border-ivory/40 hover:text-ivory'
                  }`}
                >
                  {category.label}
                </button>
              )
            })}
          </div>
        </Reveal>

        <div className="mt-4 sm:mt-6 min-h-[420px]" id={`menu-panel-${active.id}`} role="tabpanel" aria-labelledby={`menu-tab-${active.id}`}>
          <AnimatePresence mode="wait">
            <motion.ul
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="divide-y divide-ivory/10"
            >
              {active.items.map((item) => (
                <li key={item.name} className="group flex items-baseline justify-between gap-6 py-5 sm:py-6">
                  <div className="min-w-0">
                    <h3 className="font-display text-xl sm:text-2xl text-ivory group-hover:text-amber transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 text-sm sm:text-base text-ivoryDim">{item.description}</p>
                  </div>
                  <p className="font-mono text-amber text-sm sm:text-base whitespace-nowrap shrink-0">
                    {priceFormatter.format(item.price)} ₽
                  </p>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
