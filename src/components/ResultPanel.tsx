import { Coin } from '@phosphor-icons/react'
import { formatRealismPercent } from '../types'

interface ResultPanelProps {
  score: number
  rewardPoints: number
  diffHighlights: string[]
}

const HIGHLIGHT_LABELS: Record<string, string> = {
  bowl_size: '碗型/份量',
  meat_color: '肉色/色泽',
}

export default function ResultPanel({ score, rewardPoints, diffHighlights }: ResultPanelProps) {
  const percent = formatRealismPercent(score)

  return (
    <div className="clay-card overflow-hidden p-0">
      <div className="bg-cheese-soft px-4 py-8 text-center shadow-clay-inset">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-pill bg-canvas shadow-clay-raised">
          <Coin size={36} weight="fill" className="text-cheese-dark" />
        </div>
        <p className="mt-3 text-2xl font-black text-ink">+{rewardPoints} 积分</p>
        <p className="text-caption">感谢为真实度数据库贡献数据</p>
      </div>

      <div className="space-y-4 p-4">
        <div className="clay-tray flex items-center justify-between px-4 py-3">
          <span className="text-subtitle">本次测算还原度</span>
          <span className="text-xl font-black text-tomato">{percent}%</span>
        </div>

        <div>
          <p className="mb-2 text-caption">AI 发现的主要差异</p>
          <div className="flex flex-wrap gap-2">
            {diffHighlights.map((h) => (
              <span key={h} className="clay-tag">
                {HIGHLIGHT_LABELS[h] ?? h}
              </span>
            ))}
          </div>
        </div>

        <p className="clay-tray py-3 text-center text-caption font-bold text-fresh-dark">
          你的实拍已加入该菜品的 AI 真实度样本库
        </p>
      </div>
    </div>
  )
}
