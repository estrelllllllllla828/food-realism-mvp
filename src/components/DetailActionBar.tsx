import { Heart, ShoppingCart } from '@phosphor-icons/react'
import ClaySquish from './clay/ClaySquish'
import { SPACING } from '../design/tokens'

interface DetailActionBarProps {
  platform: 'meituan' | 'eleme'
  isFavorite: boolean
  onOrder: () => void
  onToggleFavorite: () => void
}

export default function DetailActionBar({
  platform,
  isFavorite,
  onOrder,
  onToggleFavorite,
}: DetailActionBarProps) {
  const platformLabel = platform === 'meituan' ? '去美团下单' : '去饿了么下单'

  return (
    <div
      className="safe-bottom fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2"
      style={{ paddingLeft: SPACING.gutter, paddingRight: SPACING.gutter, paddingBottom: SPACING.navBottom }}
    >
      <div className="clay-action-dock flex items-center gap-3 px-4 py-3">
        <ClaySquish
          as="button"
          type="button"
          variant="raised-sm"
          onClick={onToggleFavorite}
          className="clay-btn-secondary shrink-0 rounded-pill"
          aria-label="收藏"
        >
          <Heart
            size={22}
            weight={isFavorite ? 'fill' : 'bold'}
            className={isFavorite ? 'text-tomato' : 'text-ink-muted'}
          />
        </ClaySquish>
        <ClaySquish
          as="button"
          type="button"
          variant="primary"
          onClick={onOrder}
          className="clay-btn-primary flex flex-1 items-center justify-center gap-2"
        >
          <ShoppingCart size={20} weight="bold" />
          {platformLabel}
        </ClaySquish>
      </div>
    </div>
  )
}
