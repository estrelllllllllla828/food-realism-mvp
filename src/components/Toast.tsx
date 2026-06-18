import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SHADOW_CLAY_CARD, SPRING_STAGGER } from '../design/tokens'

interface ToastProps {
  message: string
  visible: boolean
  onHide: () => void
}

export default function Toast({ message, visible, onHide }: ToastProps) {
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(onHide, 2200)
    return () => clearTimeout(timer)
  }, [visible, onHide])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed left-1/2 top-24 z-[100] -translate-x-1/2"
          initial={{ opacity: 0, y: -20, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.9 }}
          transition={SPRING_STAGGER}
        >
          <div
            className="max-w-[280px] rounded-clay bg-canvas px-5 py-3 text-center text-sm font-bold text-ink"
            style={{ boxShadow: SHADOW_CLAY_CARD }}
          >
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
