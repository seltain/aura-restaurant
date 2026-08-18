import type { ReactNode, ElementType } from 'react'
import { useReveal } from '../hooks/useReveal'

type RevealProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  direction?: 'up' | 'none'
}

/** Fades content in with a slight upward shift the first time it enters the viewport. */
export function Reveal({ children, as: Tag = 'div', className = '', delay = 0, direction = 'up' }: RevealProps) {
  const { ref, inView } = useReveal<HTMLElement>()

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${direction === 'up' ? 'reveal--up' : ''} ${inView ? 'reveal--visible' : ''} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  )
}
