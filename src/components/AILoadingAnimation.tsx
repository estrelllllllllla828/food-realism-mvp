import { MagnifyingGlass, Robot } from '@phosphor-icons/react'

export default function AILoadingAnimation() {
  return (
    <div className="clay-card flex flex-col items-center px-6 py-10">
      <div className="relative flex items-center gap-3">
        <Robot size={48} weight="fill" className="animate-robot-scan text-ink" />
        <MagnifyingGlass size={32} weight="bold" className="text-tomato" />
      </div>
      <p className="mt-6 text-center text-base font-black text-ink">
        正在施展多模态透视魔法...
      </p>
      <p className="mt-2 text-center text-caption">
        AI 小厨师正在对比你的实拍与商家图
      </p>
      <div className="mt-6 flex gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-full bg-tomato animate-pulse-soft"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  )
}
