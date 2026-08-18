import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { reservation } from '../data/content'
import { useBooking } from '../context/BookingContext'

const todayISO = () => new Date().toISOString().split('T')[0]

export function BookingModal() {
  const { isOpen, closeBooking } = useBooking()
  const [submitted, setSubmitted] = useState(false)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const firstFieldRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    document.documentElement.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBooking()
    }
    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => firstFieldRef.current?.focus(), 60)
    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [isOpen, closeBooking])

  const handleClose = () => {
    closeBooking()
    setTimeout(() => setSubmitted(false), 400)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            aria-label="Закрыть окно бронирования"
            className="absolute inset-0 bg-ground/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[520px] max-h-[92vh] overflow-y-auto bg-surfaceLight shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
          >
            <div className="h-[3px] w-full bg-gradient-to-r from-amber/20 via-amber to-amber/20" />

            <div className="p-6 sm:p-10">
              <button
                type="button"
                onClick={handleClose}
                aria-label="Закрыть"
                className="absolute right-5 top-6 sm:right-7 sm:top-8 w-9 h-9 flex items-center justify-center text-ivoryDim hover:text-amber transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>

              {!submitted ? (
                <>
                  <p className="kicker mb-3">{reservation.eyebrow}</p>
                  <h2 id="booking-title" className="font-display text-3xl sm:text-4xl text-ivory">
                    {reservation.title}
                  </h2>
                  <p className="mt-2 text-ivoryDim text-sm sm:text-base">{reservation.subtitle}</p>

                  <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <Field label="Имя">
                      <input
                        ref={firstFieldRef}
                        required
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder="Как к вам обращаться"
                        className="booking-input"
                      />
                    </Field>

                    <Field label="Телефон">
                      <input
                        required
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        placeholder="+7 (___) ___-__-__"
                        pattern="^[+0-9()\s-]{10,20}$"
                        className="booking-input"
                      />
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Дата">
                        <input required type="date" name="date" min={todayISO()} className="booking-input" />
                      </Field>
                      <Field label="Время">
                        <select required name="time" defaultValue="" className="booking-input">
                          <option value="" disabled>
                            Выбрать
                          </option>
                          {reservation.timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <Field label="Количество гостей">
                      <select required name="guests" defaultValue="2" className="booking-input">
                        {reservation.guestOptions.map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'гость' : 'гостя'}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <button type="submit" className="btn-filled w-full mt-2">
                      {reservation.ctaButton}
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-6 sm:py-10 text-center">
                  <span className="mx-auto mb-6 flex w-14 h-14 items-center justify-center rounded-full border border-amber/60">
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true">
                      <path d="M1 8L7 14L19 1" stroke="#C89B5A" strokeWidth="1.4" />
                    </svg>
                  </span>
                  <h2 id="booking-title" className="font-display text-3xl sm:text-4xl text-ivory">
                    {reservation.successTitle}
                  </h2>
                  <p className="mt-3 text-ivoryDim max-w-[38ch] mx-auto">{reservation.successText}</p>
                  <button type="button" onClick={handleClose} className="btn-outline mt-8">
                    Закрыть
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block font-mono uppercase text-[0.68rem] tracking-[0.18em] text-ivoryDim mb-2">{label}</span>
      {children}
    </label>
  )
}
