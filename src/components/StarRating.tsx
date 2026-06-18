import { Star } from '@phosphor-icons/react'

interface StarRatingProps {
  rating: number
  max?: number
  size?: number
}

export default function StarRating({ rating, max = 5, size = 14 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          size={size}
          weight={i < rating ? 'fill' : 'bold'}
          className={i < rating ? 'text-cheese-dark' : 'text-cheese-soft'}
        />
      ))}
    </div>
  )
}
