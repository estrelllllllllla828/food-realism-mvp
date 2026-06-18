import { Link } from 'react-router-dom'
import { ChatCircle, Heart } from '@phosphor-icons/react'
import type { CommunityPost } from '../types'
import ClaySquish from './clay/ClaySquish'
import FoodImage from './FoodImage'
import RealismCapsule from './RealismCapsule'
import { SHADOW_CLAY_INSET_DEEP, SHADOW_CLAY_CAPSULE } from '../design/tokens'

const HEIGHT_MAP = {
  short: 'aspect-[4/5]',
  medium: 'aspect-[3/4]',
  tall: 'aspect-[2/3]',
} as const

interface CommunityCardProps {
  post: CommunityPost
}

export default function CommunityCard({ post }: CommunityCardProps) {
  return (
    <Link to={`/community/${post.id}`} className="block">
      <ClaySquish variant="card" className="clay-card-thick overflow-hidden">
        <div
          className={`relative overflow-hidden rounded-clay ${HEIGHT_MAP[post.imageHeight]}`}
          style={{ boxShadow: SHADOW_CLAY_INSET_DEEP }}
        >
          <FoodImage
            src={post.image}
            alt={post.food_name}
            className="h-full w-full object-cover"
          />
          <div className="absolute left-2 top-2">
            <RealismCapsule score={post.realism_score} compact />
          </div>
        </div>

        <div className="space-y-2 p-3">
          <h3 className="line-clamp-2 text-sm font-black leading-snug text-ink">{post.caption}</h3>
          <p className="truncate text-caption">
            {post.shop_name}
            {' \u00b7 '}
            {post.food_name}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex min-w-0 items-center gap-2">
              <div
                className="shrink-0 rounded-pill bg-cheese-soft p-0.5"
                style={{ boxShadow: SHADOW_CLAY_CAPSULE }}
              >
                <img
                  src={post.user.avatar}
                  alt={post.user.nickname}
                  className="h-7 w-7 rounded-pill object-cover"
                />
              </div>
              <span className="truncate text-caption font-bold text-ink-muted">
                {post.user.nickname}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-2 text-caption font-bold text-ink-faint">
              <span className="flex items-center gap-0.5">
                <Heart size={12} weight="fill" className="text-tomato" />
                {post.likes}
              </span>
              <span className="flex items-center gap-0.5">
                <ChatCircle size={12} weight="bold" />
                {post.comment_count}
              </span>
            </div>
          </div>
        </div>
      </ClaySquish>
    </Link>
  )
}
