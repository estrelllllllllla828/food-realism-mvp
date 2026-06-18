import { motion } from 'framer-motion'
import { SPRING_SLIDE } from '../design/tokens'

type TabId = 'posts' | 'favorites'

interface ClayTabSwitchProps {
  tabs: { id: TabId; label: string }[]
  active: TabId
  onChange: (id: TabId) => void
}

export default function ClayTabSwitch({ tabs, active, onChange }: ClayTabSwitchProps) {
  const activeIndex = tabs.findIndex((t) => t.id === active)
  const tabWidth = 100 / tabs.length

  return (
    <div className="relative rounded-clay bg-surface p-1 shadow-clay-inset-deep">
      <motion.div
        className="absolute bottom-1 top-1 rounded-clay bg-canvas shadow-clay-raised-sm"
        style={{ width: `calc(${tabWidth}% - 4px)` }}
        animate={{ left: `calc(${activeIndex * tabWidth}% + 2px)` }}
        transition={SPRING_SLIDE}
      />
      <div className="relative flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex-1 rounded-clay py-2.5 text-sm font-bold transition-colors duration-200 ${
              active === tab.id ? 'text-ink' : 'text-ink-muted'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
