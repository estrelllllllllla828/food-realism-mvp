import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Camera } from '@phosphor-icons/react'
import { compareUploadedImage, fetchFoodDetail } from '../api/mockApi'
import type { CompareResponse, FoodDetail } from '../types'
import PanUploadButton from '../components/PanUploadButton'
import AILoadingAnimation from '../components/AILoadingAnimation'
import ResultPanel from '../components/ResultPanel'

type Phase = 'idle' | 'loading' | 'done'

export default function UploadPage() {
  const [searchParams] = useSearchParams()
  const foodId = searchParams.get('foodId') ?? '10023'
  const [food, setFood] = useState<FoodDetail | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  const [result, setResult] = useState<CompareResponse | null>(null)

  useEffect(() => {
    fetchFoodDetail(foodId).then(setFood)
  }, [foodId])

  const handleSelect = async (file: File) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      const base64 = e.target?.result as string
      setPreview(base64)
      setPhase('loading')

      const response = await compareUploadedImage({
        food_id: foodId,
        user_uploaded_img: base64,
      })

      setResult(response)
      setPhase('done')
    }
    reader.readAsDataURL(file)
  }

  const reset = () => {
    setPhase('idle')
    setPreview(null)
    setResult(null)
  }

  return (
    <main className="page-shell">
      <header className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-clay bg-cheese-soft shadow-clay-raised-sm">
          <Camera size={24} weight="fill" className="text-tomato" />
        </div>
        <h1 className="text-title">测一测</h1>
        <p className="mt-1 text-caption">
          {food?.name ? `当前菜品：${food.name}` : '收到外卖后拍一张，AI 帮你比对'}
        </p>
      </header>

      {phase === 'idle' && (
        <div className="flex flex-col items-center gap-8">
          <PanUploadButton onSelect={handleSelect} />
          <p className="max-w-xs text-center text-caption">
            上传后模拟调用 POST /api/v1/ai/compare 进行多模态比对
          </p>
        </div>
      )}

      {phase === 'loading' && (
        <div className="space-y-4">
          {preview && (
            <div className="clay-card-thick overflow-hidden">
              <img
                src={preview}
                alt="预览"
                className="aspect-video w-full rounded-clay object-cover shadow-clay-inset"
              />
            </div>
          )}
          <AILoadingAnimation />
        </div>
      )}

      {phase === 'done' && result && (
        <div className="space-y-4">
          {preview && (
            <div className="clay-card-thick overflow-hidden">
              <img
                src={preview}
                alt="你的实拍"
                className="aspect-video w-full rounded-clay object-cover shadow-clay-inset"
              />
            </div>
          )}
          <ResultPanel
            score={result.calculated_score}
            rewardPoints={result.reward_points}
            diffHighlights={result.diff_highlights}
          />
          <button type="button" onClick={reset} className="clay-btn-primary w-full">
            再拍一张
          </button>
        </div>
      )}
    </main>
  )
}
