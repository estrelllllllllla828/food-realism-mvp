import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from '@phosphor-icons/react'
import { fetchFoodDetail } from '../api/mockApi'
import type { FoodDetail } from '../types'
import { formatRealismPercent } from '../types'
import RealismCapsule from '../components/RealismCapsule'
import XRaySlider from '../components/XRaySlider'
import AIRadarPanel from '../components/AIRadarPanel'
import DetailActionBar from '../components/DetailActionBar'
import Toast from '../components/Toast'

export default function DetailPage() {
  const { foodId } = useParams<{ foodId: string }>()
  const [food, setFood] = useState<FoodDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '' })

  useEffect(() => {
    if (!foodId) return
    fetchFoodDetail(foodId).then((data) => {
      setFood(data)
      setLoading(false)
    })
  }, [foodId])

  if (loading) {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-surface px-gutter pt-4">
        <div className="clay-card clay-skeleton aspect-[4/3]" />
      </div>
    )
  }

  if (!food) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center bg-surface px-gutter">
        <p className="text-subtitle">{'菜品不存在'}</p>
        <Link to="/" className="clay-btn-primary mt-4">{'返回首页'}</Link>
      </div>
    )
  }

  const { ai_evaluation: ai } = food

  return (
    <div className="mx-auto min-h-screen max-w-md bg-surface pb-32">
      <div className="sticky top-0 z-40 bg-surface px-gutter py-3 shadow-clay-raised-sm">
        <Link to="/" className="clay-btn-secondary inline-flex items-center gap-1 rounded-pill px-3 py-2 text-sm font-bold">
          <ArrowLeft size={18} weight="bold" />
          {'返回'}
        </Link>
      </div>

      <div className="space-y-4 px-gutter">
        <XRaySlider merchantImg={food.merchant_img} realImg={ai.real_img_sample} realismScore={ai.realism_score} />

        <section className="clay-card p-4">
          <p className="text-caption">{food.shop_name}</p>
          <div className="mt-1 flex items-start justify-between gap-3">
            <h1 className="text-2xl font-black leading-tight text-ink">{food.name}</h1>
            <span className="shrink-0 text-2xl font-black text-tomato">{'¥'}{food.price.toFixed(0)}</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <RealismCapsule score={ai.realism_score} />
            <span className="text-caption">
              {'基于 '}{ai.sample_count ?? '—'}{'位食客 · AI 还原 '}{formatRealismPercent(ai.realism_score)}%
            </span>
          </div>
        </section>

        <AIRadarPanel
          portionMatch={ai.dimensions.portion_match}
          ingredientMatch={ai.dimensions.ingredient_match}
          colorMatch={ai.dimensions.color_match}
          tags={ai.tags}
        />

        <Link to={`/upload?foodId=${food.food_id}`} className="clay-tray block py-4 text-center text-sm font-bold text-ink-muted">
          {'我也来上传实拍测评 →'}
        </Link>
      </div>

      <DetailActionBar
        platform={food.platform ?? 'meituan'}
        isFavorite={isFavorite}
        onToggleFavorite={() => setIsFavorite((v) => !v)}
        onOrder={() =>
          setToast({
            visible: true,
            message: food.platform === 'eleme' ? '正在跳转饿了么...' : '正在跳转美团...',
          })
        }
      />

      <Toast message={toast.message} visible={toast.visible} onHide={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  )
}
