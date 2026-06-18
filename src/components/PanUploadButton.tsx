import { Camera } from '@phosphor-icons/react'
import ClaySquish from './clay/ClaySquish'

interface PanUploadButtonProps {
  onSelect: (file: File) => void
  disabled?: boolean
}

export default function PanUploadButton({ onSelect, disabled }: PanUploadButtonProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onSelect(file)
    e.target.value = ''
  }

  return (
    <ClaySquish
      as="label"
      variant="card"
      className={`clay-card relative mx-auto flex h-40 w-40 cursor-pointer flex-col items-center justify-center ${
        disabled ? 'pointer-events-none opacity-50' : ''
      }`}
    >
      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        disabled={disabled}
        onChange={handleChange}
      />
      <div className="flex h-14 w-14 items-center justify-center rounded-pill bg-cheese-soft shadow-clay-inset">
        <Camera size={28} weight="bold" className="text-ink" />
      </div>
      <span className="mt-3 text-sm font-black text-ink">{'\u62cd\u4e00\u5f20\u5b9e\u7269'}</span>
      <span className="text-caption">{'\u6216\u4ece\u76f8\u518c\u9009\u62e9'}</span>
    </ClaySquish>
  )
}
