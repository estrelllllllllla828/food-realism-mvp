import { motion, type HTMLMotionProps } from 'framer-motion'
import {
  MOTION,
  SHADOW_CLAY_CARD,
  SHADOW_CLAY_CARD_PRESSED,
  SHADOW_CLAY_FAB,
  SHADOW_CLAY_FAB_PRESSED,
  SHADOW_CLAY_BUTTON_PRIMARY,
  SHADOW_CLAY_BUTTON_PRIMARY_PRESSED,
  SHADOW_CLAY_RAISED_SM,
  SHADOW_CLAY_INSET,
  SPRING_BUTTON,
  SPRING_FAB,
} from '../../design/tokens'

type ClayVariant = 'card' | 'raised-sm' | 'inset' | 'fab' | 'primary' | 'none'

const SHADOW_MAP: Record<ClayVariant, { rest: string; pressed: string }> = {
  card: { rest: SHADOW_CLAY_CARD, pressed: SHADOW_CLAY_CARD_PRESSED },
  'raised-sm': { rest: SHADOW_CLAY_RAISED_SM, pressed: SHADOW_CLAY_INSET },
  inset: { rest: SHADOW_CLAY_INSET, pressed: SHADOW_CLAY_INSET },
  fab: { rest: SHADOW_CLAY_FAB, pressed: SHADOW_CLAY_FAB_PRESSED },
  primary: { rest: SHADOW_CLAY_BUTTON_PRIMARY, pressed: SHADOW_CLAY_BUTTON_PRIMARY_PRESSED },
  none: { rest: 'none', pressed: 'none' },
}

const SPRING_MAP: Record<ClayVariant, typeof SPRING_BUTTON> = {
  card: SPRING_BUTTON,
  'raised-sm': SPRING_BUTTON,
  inset: SPRING_BUTTON,
  fab: SPRING_FAB,
  primary: SPRING_FAB,
  none: SPRING_BUTTON,
}

const SCALE_MAP: Record<ClayVariant, number> = {
  card: MOTION.squishScale,
  'raised-sm': MOTION.squishScale,
  inset: MOTION.squishScale,
  fab: MOTION.squishScaleFab,
  primary: MOTION.squishScale,
  none: 1,
}

interface ClaySquishProps extends HTMLMotionProps<'div'> {
  variant?: ClayVariant
  as?: 'div' | 'button' | 'a' | 'label'
  type?: 'button' | 'submit' | 'reset'
}

export default function ClaySquish({
  variant = 'card',
  as = 'div',
  children,
  className,
  style,
  ...props
}: ClaySquishProps) {
  const Component = motion[as] as typeof motion.div
  const shadows = SHADOW_MAP[variant]
  const spring = SPRING_MAP[variant]
  const scale = SCALE_MAP[variant]

  return (
    <Component
      className={className}
      style={{ boxShadow: shadows.rest, ...style }}
      whileTap={
        variant === 'none'
          ? undefined
          : { scale, boxShadow: shadows.pressed }
      }
      transition={spring}
      {...props}
    >
      {children}
    </Component>
  )
}
