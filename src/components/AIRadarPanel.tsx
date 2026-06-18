interface AIRadarPanelProps {
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
      return `${pt.x},${pt.y}`
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
                return `${p.x},${p.y}`
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
