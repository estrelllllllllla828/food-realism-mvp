import { Link } from 'react-router-dom'
import { Heart, MapPin } from '@phosphor-icons/react'
import type { FoodItem } from '../types'
import ClaySquish from './clay/ClaySquish'
import FoodImage from './FoodImage'
import StarRating from './StarRating'
import { RealismCapsuleBadge } from './RealismCapsule'

interface FoodCardProps {
  food: FoodItem
  isFavorite: boolean
  onToggleFavorite: (foodId: string) => void
  onBadgeClick: (sampleCount: number) => void
  eagerImage?: boolean
}

export default function FoodCard({
  food,
  isFavorite,
  onToggleFavorite,
  onBadgeClick,
  eagerImage,
}: FoodCardProps) {
  const { ai_evaluation: ai } = food

  return (
    <Link to={`/food/${food.food_id}`} className="block">
      <ClaySquish variant="card" className="clay-card flex gap-4 p-4">
        <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-clay shadow-clay-inset-deep">
          <FoodImage
            src={food.merchant_img}
            alt={food.name}
            className="h-full w-full object-cover"
            eager={eagerImage}
          />
          <RealismCapsuleBadge
            score={ai.realism_score}
            onClick={() => onBadgeClick(ai.sample_count ?? 0)}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div>
            <p className="text-caption">{food.shop_name}</p>
            <h3 className="mt-0.5 line-clamp-2 text-lg font-black leading-snug text-ink">
              {food.name}
            </h3>
            <div className="mt-2 flex items-center gap-1.5 text-caption">
              <MapPin size={12} weight="bold" className="text-fresh" />
              <span>{food.distance_km} km</span>
              <span className="text-ink-faint">{'\u00b7'}</span>
              <StarRating rating={Math.round(food.rating)} size={12} />
            </div>
          </div>

          <div className="flex items-end justify-between">
            <span className="text-xl font-black text-tomato">
              {'\u00a5'}
              {food.price.toFixed(0)}
            </span>
            <ClaySquish
              as="button"
              type="button"
              variant="raised-sm"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onToggleFavorite(food.food_id)
              }}
              className="rounded-pill p-2"
              aria-label={isFavorite ? '\u53d6\u6d88\u6536\u85cf' : '\u6536\u85cf'}
            >
              <Heart
                size={20}
                weight={isFavorite ? 'fill' : 'bold'}
                className={isFavorite ? 'text-tomato' : 'text-ink-faint'}
              />
            </ClaySquish>
          </div>
        </div>
      </ClaySquish>
    </Link>
  )
}
