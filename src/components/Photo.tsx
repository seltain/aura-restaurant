import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

type PhotoProps = {
  src: string
  alt: string
  className?: string
  /** 'melt' feathers the edges all the way into the page background — for hero/chef portraits. */
  vignette?: 'soft' | 'melt'
  reveal?: boolean
  priority?: boolean
  /** CSS object-position, e.g. to crop out an unwanted region of the source photo. */
  objectPosition?: string
}

/**
 * Unified photo treatment: warm amber tint overlay + edge vignette so images
 * sit inside the page rather than float as hard rectangles. Falls back to a
 * labelled placeholder when the source file is missing.
 */
export function Photo({
  src,
  alt,
  className = '',
  vignette = 'soft',
  reveal = true,
  priority = false,
  objectPosition,
}: PhotoProps) {
  const [failed, setFailed] = useState(false)
  const { ref, inView } = useReveal<HTMLDivElement>()
  const shouldAnimate = reveal ? inView : true
  const filename = src.split('/').pop()

  return (
    <div
      ref={ref}
      className={`photo-frame photo-frame--${vignette} ${reveal ? 'photo-frame--reveal' : ''} ${shouldAnimate ? 'photo-frame--visible' : ''} ${className}`}
    >
      {failed ? (
        <div className="photo-frame__placeholder" role="img" aria-label={alt}>
          <span className="photo-frame__placeholder-mark" aria-hidden="true" />
          <span className="photo-frame__placeholder-name">{filename}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="photo-frame__media"
          style={objectPosition ? { objectPosition } : undefined}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}
