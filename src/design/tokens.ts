/** Central design tokens ? single source of truth for clay UI */

export const COLORS = {
  surface: '#FDFBF7',
  canvas: '#FFF9F0',
  cheese: { DEFAULT: '#FFD54F', light: '#FFE082', soft: '#FFF3C4', dark: '#F9A825' },
  tomato: { DEFAULT: '#FF6B6B', light: '#FF8A80', soft: '#FFCDD2', dark: '#E53935' },
  fresh: { DEFAULT: '#4CAF50', light: '#81C784', soft: '#C8E6C9', dark: '#388E3C' },
  ink: { DEFAULT: '#2D2419', muted: '#8A8175', faint: '#B5ADA3' },
  shadow: {
    highlight: 'rgba(255, 252, 245, 0.98)',
    coreWarm: 'rgba(196, 148, 108, 0.18)',
    coreTomato: 'rgba(210, 100, 90, 0.08)',
    coreCheese: 'rgba(220, 170, 80, 0.2)',
    dropWarm: 'rgba(196, 160, 120, 0.12)',
    dropSoft: 'rgba(180, 150, 120, 0.08)',
  },
} as const

export const RADIUS = {
  clay: '28px',
  clayLg: '32px',
  pill: '9999px',
} as const

export const SPACING = {
  gutter: '1rem',
  cardGap: '1rem',
  navOffset: '5.5rem',
  navFloat: '1rem',
  navBottom: '1.25rem',
  navPad: '0.75rem',
} as const

export const SIZE = {
  navIcon: 40,
  navBarMinHeight: 68,
  handleWidth: 40,
  handleHeight: 64,
} as const

export const SHADOW_LAYERS = {
  highlightSoft: `inset 4px 4px 10px ${COLORS.shadow.highlight}`,
  highlightStrong: `inset 5px 5px 14px ${COLORS.shadow.highlight}`,
  coreWarmSm: `inset -3px -4px 8px ${COLORS.shadow.coreWarm}`,
  coreWarmMd: `inset -4px -6px 12px ${COLORS.shadow.coreWarm}`,
  coreCheese: `inset -4px -6px 12px ${COLORS.shadow.coreCheese}`,
  dropWarmSm: `0 4px 12px ${COLORS.shadow.dropWarm}`,
  dropWarmMd: `0 8px 20px ${COLORS.shadow.dropSoft}`,
} as const

export const SHADOW_CLAY_CARD = [
  SHADOW_LAYERS.highlightSoft,
  SHADOW_LAYERS.coreWarmMd,
  SHADOW_LAYERS.dropWarmSm,
].join(', ')

export const SHADOW_CLAY_CARD_PRESSED = [
  `inset 6px 6px 14px ${COLORS.shadow.coreWarm}`,
  `inset -2px -2px 6px ${COLORS.shadow.highlight}`,
  `0 2px 6px ${COLORS.shadow.dropSoft}`,
].join(', ')

export const SHADOW_CLAY_RAISED_SM = [
  `inset 3px 3px 8px ${COLORS.shadow.highlight}`,
  SHADOW_LAYERS.coreWarmSm,
  SHADOW_LAYERS.dropWarmSm,
].join(', ')

export const SHADOW_CLAY_INSET = [
  `inset 5px 5px 12px ${COLORS.shadow.coreWarm}`,
  `inset -3px -3px 8px ${COLORS.shadow.highlight}`,
].join(', ')

export const SHADOW_CLAY_INSET_DEEP = [
  `inset 6px 6px 16px ${COLORS.shadow.coreWarm}`,
  `inset -4px -4px 10px ${COLORS.shadow.highlight}`,
].join(', ')

export const SHADOW_CLAY_NAV = [
  `inset 0 6px 12px ${COLORS.shadow.highlight}`,
  SHADOW_LAYERS.coreWarmSm,
  SHADOW_LAYERS.dropWarmMd,
].join(', ')

export const SHADOW_CLAY_FAB = [
  SHADOW_LAYERS.highlightSoft,
  SHADOW_LAYERS.coreCheese,
  SHADOW_LAYERS.dropWarmSm,
].join(', ')

export const SHADOW_CLAY_FAB_PRESSED = [
  `inset 6px 6px 14px ${COLORS.shadow.coreCheese}`,
  `inset -2px -2px 6px ${COLORS.shadow.highlight}`,
  `0 2px 6px ${COLORS.shadow.dropSoft}`,
].join(', ')

export const SHADOW_CLAY_BUTTON_PRIMARY = [
  'inset 4px 4px 10px rgba(255, 200, 190, 0.4)',
  `inset -4px -6px 12px ${COLORS.shadow.coreTomato}`,
  `0 6px 16px ${COLORS.shadow.dropSoft}`,
].join(', ')

export const SHADOW_CLAY_BUTTON_PRIMARY_PRESSED = [
  `inset 7px 7px 16px ${COLORS.shadow.coreTomato}`,
  'inset -2px -2px 6px rgba(255, 200, 190, 0.35)',
  `0 2px 6px ${COLORS.shadow.dropSoft}`,
].join(', ')

export const SHADOW_CLAY_CAPSULE = [
  'inset 2px 2px 5px rgba(255, 255, 255, 0.55)',
  `inset -2px -3px 5px ${COLORS.shadow.coreWarm}`,
  SHADOW_LAYERS.dropWarmSm,
].join(', ')

export const SHADOW_CLAY_HANDLE = SHADOW_CLAY_RAISED_SM
export const SHADOW_CLAY_HANDLE_PRESSED = SHADOW_CLAY_INSET_DEEP

export const SHADOW_TOKENS = {
  'clay-card': SHADOW_CLAY_CARD,
  'clay-card-pressed': SHADOW_CLAY_CARD_PRESSED,
  'clay-raised-sm': SHADOW_CLAY_RAISED_SM,
  'clay-inset': SHADOW_CLAY_INSET,
  'clay-inset-deep': SHADOW_CLAY_INSET_DEEP,
  'clay-nav': SHADOW_CLAY_NAV,
  'clay-fab': SHADOW_CLAY_FAB,
  'clay-fab-pressed': SHADOW_CLAY_FAB_PRESSED,
  'clay-button-primary': SHADOW_CLAY_BUTTON_PRIMARY,
  'clay-button-primary-pressed': SHADOW_CLAY_BUTTON_PRIMARY_PRESSED,
  'clay-capsule': SHADOW_CLAY_CAPSULE,
  'clay-handle': SHADOW_CLAY_HANDLE,
  'clay-handle-pressed': SHADOW_CLAY_HANDLE_PRESSED,
} as const

export const MOTION = {
  squishScale: 0.95,
  squishScaleFab: 0.95,
  floatAmplitude: 6,
  floatDuration: 2.8,
  staggerDelay: 0.07,
} as const

export const SPRING_BUTTON = { type: 'spring' as const, stiffness: 520, damping: 26, mass: 0.75 }
export const SPRING_FAB = { type: 'spring' as const, stiffness: 600, damping: 22, mass: 0.85 }
export const SPRING_STAGGER = { type: 'spring' as const, stiffness: 380, damping: 24, mass: 0.9 }
export const SPRING_FLOAT = { type: 'spring' as const, stiffness: 120, damping: 12, mass: 0.6 }
export const SPRING_TAB_ICON = { type: 'spring' as const, stiffness: 480, damping: 18, mass: 0.5 }
export const SPRING_SLIDE = { type: 'spring' as const, stiffness: 340, damping: 32, mass: 1 }
