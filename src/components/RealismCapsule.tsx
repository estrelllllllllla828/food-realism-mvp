import { Check, WarningCircle } from '@phosphor-icons/react'
import { formatRealismPercent, getRealismLevel } from '../types'

interface RealismCapsuleProps {
  score: number
  compact?: boolean
}

const CONFIG = {
  high: {
    clay: 'clay-capsule-fresh',
    icon: Check,
    label: (p: number) => `${p}% 所见即所得`,
  },
  medium: {
    clay: 'clay-capsule-cheese',
    icon: WarningCircle,
    label: (p: number) => `${p}% 略有出入`,
  },
  low: {
    clay: 'clay-capsule-tomato',
    icon: WarningCircle,
    label: (p: number) => `${p}% 严重照骗`,
  },
} as const

export default function RealismCapsule({ score, compact }: RealismCapsuleProps) {
  const level = getRealismLevel(score)
  const percent = formatRealismPercent(score)
  const { clay, icon: Icon, label } = CONFIG[level]

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-pill font-bold ${clay} ${
        compact ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11px]'
      }`}
    >
      <Icon size={compact ? 12 : 14} weight="bold" />
      {label(percent)}
    </span>
  )
}

interface RealismCapsuleBadgeProps extends RealismCapsuleProps {
  onClick?: () => void
}

export function RealismCapsuleBadge({ score, onClick }: RealismCapsuleBadgeProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if ('vibrate' in navigator) navigator.vibrate(10)
    onClick?.()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="absolute left-2 top-2 z-10 transition-transform duration-200 ease-clay active:scale-95"
    >
      <RealismCapsule score={score} compact />
    </button>
  )
}
