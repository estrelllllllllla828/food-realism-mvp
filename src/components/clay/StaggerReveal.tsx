import { motion } from 'framer-motion'
import { MOTION, SPRING_STAGGER } from '../../design/tokens'

interface StaggerRevealProps {
  children: React.ReactNode
  className?: string
}

export function StaggerReveal({ children, className }: StaggerRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: MOTION.staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 32, scale: 0.92 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: SPRING_STAGGER,
        },
      }}
    >
      {children}
    </motion.div>
  )
}
