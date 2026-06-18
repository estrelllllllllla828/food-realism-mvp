import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const files = {
  'src/components/navigation/BottomNav.tsx': `import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Camera, House, Lightning, UserCircle } from '@phosphor-icons/react'
import {
  SHADOW_CLAY_INSET,
  SHADOW_CLAY_NAV,
  SHADOW_CLAY_RAISED_SM,
  SIZE,
  SPACING,
  SPRING_FAB,
  SPRING_TAB_ICON,
} from '../../design/tokens'

const TAB_ITEMS = [
  { to: '/', label: '首页', icon: House, end: true },
  { to: '/community', label: '避雷圈', icon: Lightning, end: false },
  { to: '/upload', label: '测一测', icon: Camera, end: false, accent: true },
  { to: '/profile', label: '我的', icon: UserCircle, end: false },
] as const

export default function BottomNav() {
  const location = useLocation()

  return (
    <nav
      className="safe-bottom pointer-events-none fixed bottom-0 left-0 right-0 z-50 flex justify-center"
      style={{
        paddingLeft: SPACING.navFloat,
        paddingRight: SPACING.navFloat,
        paddingBottom: SPACING.navBottom,
      }}
    >
      <motion.div
        className="clay-nav-dock pointer-events-auto flex w-full max-w-md items-center justify-between"
        style={{
          minHeight: SIZE.navBarMinHeight,
          padding: SPACING.navPad,
          boxShadow: SHADOW_CLAY_NAV,
        }}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={SPRING_FAB}
      >
        {TAB_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive =
            item.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.to)
          const isAccent = 'accent' in item && item.accent

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className="flex flex-1 flex-col items-center gap-0.5 py-1"
            >
              <motion.div
                className={\`flex items-center justify-center rounded-pill \${isAccent ? 'bg-cheese-soft' : 'bg-canvas'}\`}
                style={{
                  width: SIZE.navIcon,
                  height: SIZE.navIcon,
                  boxShadow: isActive ? SHADOW_CLAY_INSET : SHADOW_CLAY_RAISED_SM,
                }}
                animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                transition={SPRING_TAB_ICON}
              >
                <Icon
                  size={22}
                  weight={isActive ? 'fill' : 'bold'}
                  className={isActive ? 'text-tomato' : 'text-ink-muted'}
                />
              </motion.div>
              <span
                className={\`text-[10px] font-bold \${isActive ? 'text-ink' : 'text-ink-muted'}\`}
              >
                {item.label}
              </span>
            </NavLink>
          )
        })}
      </motion.div>
    </nav>
  )
}
`,
}

for (const [rel, content] of Object.entries(files)) {
  const filePath = path.join(root, rel)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content, { encoding: 'utf8' })
  console.log('fixed:', rel)
}
