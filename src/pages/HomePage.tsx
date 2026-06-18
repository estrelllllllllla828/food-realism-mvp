import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkle } from '@phosphor-icons/react'
import { fetchFoodList } from '../api/mockApi'
import type { FoodItem, SortOption } from '../types'
import FilterBar from '../components/FilterBar'
import FoodCard from '../components/FoodCard'
import Toast from '../components/Toast'
import { StaggerItem, StaggerReveal } from '../components/clay/StaggerReveal'
import { SHADOW_CLAY_RAISED_SM, SPRING_STAGGER } from '../design/tokens'

function sortFoods(foods: FoodItem[], sort: SortOption): FoodItem[] {
  const copy = [...foods]
  switch (sort) {
    case 'distance':
      return copy.sort((a, b) => a.distance_km - b.distance_km)
    case 'realism':
      return copy.sort((a, b) => b.ai_evaluation.realism_score - a.ai_evaluation.realism_score)
    default:
      return copy
  }
}

export default function HomePage() {
  const [foods, setFoods] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState<SortOption>('default')
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['10024', '10027']))
  const [toast, setToast] = useState({ visible: false, message: '' })

  useEffect(() => {
    fetchFoodList().then((data) => {
      setFoods(data)
      setLoading(false)
    })
  }, [])

  const sortedFoods = useMemo(() => sortFoods(foods, sort), [foods, sort])

  const toggleFavorite = (foodId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(foodId)) next.delete(foodId)
      else next.add(foodId)
      return next
    })
  }

  return (
    <main className="page-shell">
      <motion.header className="mb-5" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={SPRING_STAGGER}>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-clay bg-cheese-soft" style={{ boxShadow: SHADOW_CLAY_RAISED_SM }}>
            <Sparkle size={24} weight="fill" className="text-tomato" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-ink">{'真实外卖'}</h1>
            <p className="text-caption">{'3D Clay · AI 防照骗'}</p>
          </div>
        </div>
      </motion.header>

      <FilterBar active={sort} onChange={setSort} />

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="clay-card clay-skeleton h-40" />
          ))}
        </div>
      ) : (
        <StaggerReveal className="space-y-4">
          {sortedFoods.map((food, index) => (
            <StaggerItem key={food.food_id}>
              <FoodCard
                food={food}
                eagerImage={index < 2}
                isFavorite={favorites.has(food.food_id)}
                onToggleFavorite={toggleFavorite}
                onBadgeClick={(count) =>
                  setToast({
                    visible: true,
                    message: `AI 综合 ${count || '多'} 位食客实拍提取`,
                  })
                }
              />
            </StaggerItem>
          ))}
        </StaggerReveal>
      )}

      <Toast message={toast.message} visible={toast.visible} onHide={() => setToast((t) => ({ ...t, visible: false }))} />
    </main>
  )
}
