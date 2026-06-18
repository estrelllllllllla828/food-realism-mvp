import { useCallback, useRef, useState } from 'react'
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
          style={{ width: `${position}%` }}
          animate={{ width: `${position}%` }}
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
          style={{ left: `${position}%`, x: '-50%' }}
          animate={{ left: `${position}%` }}
          transition={isDragging ? { duration: 0 } : SPRING_SLIDE}
        />

        <motion.div
          data-handle
          className="absolute top-1/2 z-30 cursor-grab active:cursor-grabbing"
          style={{ left: `${position}%`, x: '-50%', y: '-50%' }}
          animate={{
            left: `${position}%`,
            y: isDragging ? '-50%' : ['-50%', `calc(-50% - ${MOTION.floatAmplitude}px)`, '-50%'],
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
