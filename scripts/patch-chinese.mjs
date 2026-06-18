import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const files = {
  'src/components/XRaySlider.tsx': String.raw`import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Warning } from '@phosphor-icons/react'
import ClaySquish from './clay/ClaySquish'
import {
  MOTION,
  SHADOW_CLAY_HANDLE,
  SHADOW_CLAY_HANDLE_PRESSED,
  SIZE,
  SPRING_BUTTON,
  SPRING_SLIDE,
} from '../design/tokens'

interface XRaySliderProps {
  merchantImg: string
  realImg: string
  realismScore: number
  merchantAlt?: string
  realAlt?: string
}

const GRAY_MASK_THRESHOLD = 0.6
const SLIDER_MIN = 4
const SLIDER_MAX = 96

export default function XRaySlider({
  merchantImg,
  realImg,
  realismScore,
  merchantAlt = '\u5546\u5bb6\u5ba3\u4f20\u56fe',
  realAlt = '\u5b9e\u62cd\u6837\u672c',
}: XRaySliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [imagesReady, setImagesReady] = useState({ merchant: false, real: false })

  const showGrayMask = realismScore < GRAY_MASK_THRESHOLD

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = Math.max(SLIDER_MIN, Math.min(SLIDER_MAX, ((clientX - rect.left) / rect.width) * 100))
    setPosition(pct)
  }, [])

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    updatePosition(e.clientX)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    updatePosition(e.clientX)
  }

  const handlePointerUp = () => setIsDragging(false)

  const handleTrackClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-handle]')) return
    updatePosition(e.clientX)
  }

  return (
    <div className="clay-card-thick overflow-hidden">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-clay bg-surface shadow-clay-inset-deep"
        onClick={handleTrackClick}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <img
          src={realImg}
          alt={realAlt}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
          onLoad={() => setImagesReady((s) => ({ ...s, real: true }))}
        />

        <motion.div
          className="absolute inset-0 overflow-hidden will-change-[width]"
          style={{ width: \`\${position}%\` }}
          animate={{ width: \`\${position}%\` }}
          transition={isDragging ? { duration: 0 } : SPRING_SLIDE}
        >
          <img
            src={merchantImg}
            alt={merchantAlt}
            className="absolute inset-0 h-full object-cover"
            style={{
              width: containerRef.current?.offsetWidth ?? '100%',
              maxWidth: 'none',
              filter: showGrayMask ? 'saturate(0.35) brightness(0.85)' : 'none',
            }}
            draggable={false}
            onLoad={() => setImagesReady((s) => ({ ...s, merchant: true }))}
          />

          {showGrayMask && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <ClaySquish variant="card" className="clay-card flex flex-col items-center gap-1 px-5 py-3">
                <Warning size={28} weight="fill" className="text-tomato" />
                <p className="text-sm font-black text-tomato">{'\u8b66\u544a\u907f\u5751'}</p>
                <p className="text-caption">{'\u771f\u5b9e\u5ea6\u504f\u4f4e'}</p>
              </ClaySquish>
            </div>
          )}
        </motion.div>

        <motion.div
          className="pointer-events-none absolute top-0 z-20 h-full w-1 bg-canvas shadow-clay-raised-sm"
          style={{ left: \`\${position}%\`, x: '-50%' }}
          animate={{ left: \`\${position}%\` }}
          transition={isDragging ? { duration: 0 } : SPRING_SLIDE}
        />

        <motion.div
          data-handle
          className="absolute top-1/2 z-30 cursor-grab active:cursor-grabbing"
          style={{ left: \`\${position}%\`, x: '-50%', y: '-50%' }}
          animate={{
            left: \`\${position}%\`,
            y: isDragging ? '-50%' : ['-50%', \`calc(-50% - \${MOTION.floatAmplitude}px)\`, '-50%'],
          }}
          transition={
            isDragging
              ? SPRING_BUTTON
              : { y: { repeat: Infinity, duration: MOTION.floatDuration, ease: 'easeInOut' }, left: SPRING_SLIDE }
          }
          onPointerDown={handlePointerDown}
        >
          <ClaySquish
            variant="none"
            className="flex flex-col items-center justify-center rounded-pill bg-canvas"
            style={{
              width: SIZE.handleWidth,
              height: SIZE.handleHeight,
              boxShadow: isDragging ? SHADOW_CLAY_HANDLE_PRESSED : SHADOW_CLAY_HANDLE,
            }}
            whileTap={{ scale: MOTION.squishScale, boxShadow: SHADOW_CLAY_HANDLE_PRESSED }}
            transition={SPRING_BUTTON}
          >
            <div className="clay-grip h-8 w-5 rounded-pill bg-surface shadow-clay-inset" />
          </ClaySquish>
        </motion.div>

        <div className="pointer-events-none absolute bottom-3 left-3 rounded-pill bg-ink px-3 py-1 text-caption font-bold text-canvas shadow-clay-capsule">
          {'\u5546\u5bb6\u56fe'}
        </div>
        <div className="pointer-events-none absolute bottom-3 right-3 rounded-pill bg-fresh px-3 py-1 text-caption font-bold text-canvas shadow-clay-capsule">
          {'\u5b9e\u62cd\u56fe'}
        </div>

        {(!imagesReady.merchant || !imagesReady.real) && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface">
            <span className="animate-pulse-soft text-subtitle">{'\u56fe\u7247\u52a0\u8f7d\u4e2d...'}</span>
          </div>
        )}
      </div>

      <p className="px-4 py-3 text-center text-caption">
        {'\u62d6\u52a8\u6ed1\u5757\uff0c\u5bf9\u6bd4\u5546\u5bb6\u5ba3\u4f20 vs \u5b9e\u62cd'}
      </p>
    </div>
  )
}
`,
  'src/components/AIRadarPanel.tsx': String.raw`interface AIRadarPanelProps {
  portionMatch: number
  ingredientMatch: number
  colorMatch: number
  tags?: string[]
}

const DIMENSIONS = [
  { key: 'portion', label: '\u4efd\u91cf\u5339\u914d', accessor: (p: AIRadarPanelProps) => p.portionMatch },
  { key: 'ingredient', label: '\u98df\u6750\u5339\u914d', accessor: (p: AIRadarPanelProps) => p.ingredientMatch },
  { key: 'color', label: '\u8272\u5dee\u5bf9\u6bd4', accessor: (p: AIRadarPanelProps) => p.colorMatch },
] as const

const CX = 120
const CY = 108
const MAX_R = 68
const ANGLES = [0, 120, 240]
const GRID_LEVELS = [0.25, 0.5, 0.75, 1]
const DOT_COLORS = ['#FF6B6B', '#FFD54F', '#4CAF50'] as const

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

export default function AIRadarPanel({
  portionMatch,
  ingredientMatch,
  colorMatch,
  tags = [],
}: AIRadarPanelProps) {
  const props = { portionMatch, ingredientMatch, colorMatch, tags }
  const values = DIMENSIONS.map((d) => d.accessor(props))

  const dataPoints = values
    .map((v, i) => {
      const pt = polar(CX, CY, MAX_R * v, ANGLES[i])
      return \`\${pt.x},\${pt.y}\`
    })
    .join(' ')

  return (
    <div className="clay-card p-5">
      <h3 className="text-title">{'AI \u771f\u5b9e\u5ea6\u96f7\u8fbe'}</h3>
      <p className="mt-1 text-caption">{'\u591a\u7ef4\u5ea6\u5206\u6790 \u00b7 \u667a\u80fd\u6807\u7b7e'}</p>

      <div className="clay-tray mt-4 flex justify-center p-4">
        <svg viewBox="0 0 240 210" className="h-52 w-full max-w-[260px]">
          <rect x="8" y="8" width="224" height="194" rx="20" fill="#FFF9F0" />

          {GRID_LEVELS.map((level) => (
            <polygon
              key={level}
              points={ANGLES.map((a) => {
                const p = polar(CX, CY, MAX_R * level, a)
                return \`\${p.x},\${p.y}\`
              }).join(' ')}
              fill="none"
              stroke="#C4946C"
              strokeOpacity={0.2}
              strokeWidth={2}
            />
          ))}

          {ANGLES.map((a, i) => {
            const p = polar(CX, CY, MAX_R, a)
            return (
              <line
                key={i}
                x1={CX}
                y1={CY}
                x2={p.x}
                y2={p.y}
                stroke="#C4946C"
                strokeOpacity={0.2}
                strokeWidth={2}
              />
            )
          })}

          <polygon
            points={dataPoints}
            fill="#FFF3C4"
            stroke="#F9A825"
            strokeWidth={3}
            strokeLinejoin="round"
          />

          {values.map((v, i) => {
            const pt = polar(CX, CY, MAX_R * v, ANGLES[i])
            return (
              <g key={i}>
                <circle cx={pt.x} cy={pt.y} r={12} fill="#FFF9F0" />
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={9}
                  fill={DOT_COLORS[i]}
                  stroke="#FFF9F0"
                  strokeWidth={3}
                />
              </g>
            )
          })}

          {DIMENSIONS.map((d, i) => {
            const pt = polar(CX, CY, MAX_R + 26, ANGLES[i])
            return (
              <text
                key={d.key}
                x={pt.x}
                y={pt.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#8A8175"
                fontSize={9}
                fontWeight={700}
              >
                {d.label}
              </text>
            )
          })}
        </svg>
      </div>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="clay-tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
`,
}

for (const [rel, content] of Object.entries(files)) {
  const out = path.join(root, rel)
  fs.writeFileSync(out, content, 'utf8')
  console.log('wrote', rel)
}
