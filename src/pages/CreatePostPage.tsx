import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, NotePencil, Star } from '@phosphor-icons/react'
import { createCommunityPost } from '../api/mockApi'
import ClaySquish from '../components/clay/ClaySquish'
import Toast from '../components/Toast'
import { SHADOW_CLAY_RAISED_SM } from '../design/tokens'

export default function CreatePostPage() {
  const navigate = useNavigate()
  const [image, setImage] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [foodName, setFoodName] = useState('')
  const [shopName, setShopName] = useState('')
  const [rating, setRating] = useState(4)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '' })

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setImage(ev.target?.result as string)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const canSubmit = Boolean(image && caption.trim() && foodName.trim() && shopName.trim() && !submitting)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit || !image) return

    setSubmitting(true)
    try {
      await createCommunityPost({
        caption: caption.trim(),
        food_name: foodName.trim(),
        shop_name: shopName.trim(),
        image,
        rating,
      })
      setToast({ visible: true, message: '\u5e16\u5b50\u5df2\u53d1\u5e03\u5230\u907f\u96f7\u5708' })
      setTimeout(() => navigate('/community'), 600)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="page-shell">
      <header className="mb-6 text-center">
        <div
          className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-clay bg-cheese-soft"
          style={{ boxShadow: SHADOW_CLAY_RAISED_SM }}
        >
          <NotePencil size={24} weight="fill" className="text-tomato" />
        </div>
        <h1 className="text-title">{'\u53d1\u5e16\u5230\u907f\u96f7\u5708'}</h1>
        <p className="mt-1 text-caption">{'\u5206\u4eab\u771f\u5b9e\u4e70\u5bb6\u79c0\uff0c\u5e2e\u5927\u5bb6\u907f\u5751'}</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <ClaySquish as="label" variant="card" className="clay-card relative block cursor-pointer overflow-hidden p-0">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="sr-only"
            onChange={handleImageSelect}
          />
          {image ? (
            <img src={image} alt={'\u5e16\u5b50\u56fe\u7247'} className="aspect-[4/5] w-full object-cover" />
          ) : (
            <div className="flex aspect-[4/5] flex-col items-center justify-center gap-2">
              <Camera size={36} weight="bold" className="text-ink-muted" />
              <span className="text-sm font-bold text-ink-muted">{'\u62cd\u6444\u6216\u9009\u62e9\u5b9e\u62cd\u56fe'}</span>
            </div>
          )}
        </ClaySquish>

        <div className="clay-card space-y-3 p-4">
          <label className="block">
            <span className="text-caption">{'\u6587\u6848'}</span>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              maxLength={200}
              placeholder={'\u5199\u5199\u8fd9\u5bb6\u5e97\u771f\u5b9e\u611f\u600e\u4e48\u6837\u2026'}
              className="clay-tray mt-1 w-full resize-none rounded-clay px-3 py-2.5 text-sm text-ink outline-none"
            />
          </label>

          <label className="block">
            <span className="text-caption">{'\u83dc\u54c1\u540d\u79f0'}</span>
            <input
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder={'\u4f8b\uff1a\u829d\u58eb\u62c9\u4e1d\u62ab\u8428'}
              className="clay-tray mt-1 w-full rounded-clay px-3 py-2.5 text-sm text-ink outline-none"
            />
          </label>

          <label className="block">
            <span className="text-caption">{'\u5e97\u94fa\u540d\u79f0'}</span>
            <input
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              placeholder={'\u4f8b\uff1a\u610f\u5f0f\u7a91\u7089'}
              className="clay-tray mt-1 w-full rounded-clay px-3 py-2.5 text-sm text-ink outline-none"
            />
          </label>

          <div>
            <span className="text-caption">{'\u771f\u5b9e\u5ea6\u8bc4\u5206'}</span>
            <div className="mt-2 flex gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <ClaySquish
                  key={i}
                  as="button"
                  type="button"
                  variant="none"
                  onClick={() => setRating(i + 1)}
                  className="rounded-pill p-1"
                >
                  <Star
                    size={28}
                    weight={i < rating ? 'fill' : 'bold'}
                    className={i < rating ? 'text-cheese-dark' : 'text-cheese-soft'}
                  />
                </ClaySquish>
              ))}
            </div>
          </div>
        </div>

        <ClaySquish
          as="button"
          type="submit"
          variant="primary"
          className={`clay-btn-primary w-full ${canSubmit ? '' : 'pointer-events-none opacity-40'}`}
        >
          {submitting ? '\u53d1\u5e03\u4e2d\u2026' : '\u53d1\u5e03\u5230\u907f\u96f7\u5708'}
        </ClaySquish>
      </form>

      <Toast message={toast.message} visible={toast.visible} onHide={() => setToast((t) => ({ ...t, visible: false }))} />
    </main>
  )
}
