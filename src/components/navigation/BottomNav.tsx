import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Camera, House, Lightning, NotePencil, UserCircle } from '@phosphor-icons/react'
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
  { to: '/', label: '\u9996\u9875', icon: House, end: true },
  { to: '/community', label: '\u907f\u96f7\u5708', icon: Lightning, end: false },
  { to: '/upload', label: '\u6d4b\u4e00\u6d4b', icon: Camera, end: false, accent: true },
  { to: '/post/create', label: '\u53d1\u5e16', icon: NotePencil, end: false },
  { to: '/profile', label: '\u6211\u7684', icon: UserCircle, end: false },
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
        className="clay-nav-dock pointer-events-auto flex w-full max-w-md items-center justify-between gap-0.5"
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
              className="flex min-w-0 flex-1 flex-col items-center gap-0.5 py-1"
            >
              <motion.div
                className={`flex items-center justify-center rounded-pill ${isAccent ? 'bg-cheese-soft' : 'bg-canvas'}`}
                style={{
                  width: SIZE.navIcon,
                  height: SIZE.navIcon,
                  boxShadow: isActive ? SHADOW_CLAY_INSET : SHADOW_CLAY_RAISED_SM,
                }}
                animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                transition={SPRING_TAB_ICON}
              >
                <Icon
                  size={20}
                  weight={isActive ? 'fill' : 'bold'}
                  className={isActive ? 'text-tomato' : 'text-ink-muted'}
                />
              </motion.div>
              <span
                className={`truncate text-[9px] font-bold ${isActive ? 'text-ink' : 'text-ink-muted'}`}
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
