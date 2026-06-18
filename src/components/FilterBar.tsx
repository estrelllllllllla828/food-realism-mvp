import ClaySquish from './clay/ClaySquish'
import type { SortOption } from '../types'

const FILTERS: { id: SortOption; label: string }[] = [
  { id: 'default', label: '综合排序' },
  { id: 'distance', label: '距离最近' },
  { id: 'realism', label: '真实度最高' },
]

interface FilterBarProps {
  active: SortOption
  onChange: (sort: SortOption) => void
}

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="-mx-gutter mb-4 overflow-x-auto px-gutter pb-1 scrollbar-hide">
      <div className="flex gap-2">
        {FILTERS.map((f) => {
          const isActive = active === f.id
          return (
            <ClaySquish
              key={f.id}
              as="button"
              type="button"
              variant={isActive ? 'inset' : 'raised-sm'}
              onClick={() => onChange(f.id)}
              className={`clay-pill ${isActive ? 'clay-pill-active' : ''}`}
              style={isActive ? { boxShadow: undefined } : undefined}
            >
              {f.label}
            </ClaySquish>
          )
        })}
      </div>
    </div>
  )
}
