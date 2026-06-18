import { useState } from 'react'
import { BowlFood } from '@phosphor-icons/react'

const FALLBACK =
  'https://placehold.co/400x400/FFF3C4/8A8175/png?text=%E7%BE%8E%E9%A3%9F&font=noto-sans-sc'

interface FoodImageProps {
  src: string
  alt: string
  className?: string
  eager?: boolean
}

export default function FoodImage({ src, alt, className = '', eager }: FoodImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div className="relative h-full w-full bg-cheese-soft">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center clay-skeleton">
          <BowlFood size={28} weight="duotone" className="animate-pulse-soft text-ink-faint" />
        </div>
      )}
      <img
        src={failed ? FALLBACK : src}
        alt={alt}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setFailed(true)
          setLoaded(true)
        }}
      />
    </div>
  )
}
