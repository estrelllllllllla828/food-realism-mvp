import { useState } from 'react'
import { Heart, PaperPlaneTilt } from '@phosphor-icons/react'
import type { CommunityComment } from '../types'
import ClaySquish from './clay/ClaySquish'

interface CommentSectionProps {
  comments: CommunityComment[]
  commentCount: number
}

export default function CommentSection({ comments, commentCount }: CommentSectionProps) {
  const [draft, setDraft] = useState('')
  const [localComments, setLocalComments] = useState(comments)
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return

    setLocalComments((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        user: {
          id: 'me',
          nickname: '\u771f\u5b9e\u5916\u5356\u8fbe\u4eba',
          avatar: 'https://i.pravatar.cc/80?img=60',
        },
        content: text,
        likes: 0,
        created_at: '\u521a\u521a',
      },
    ])
    setDraft('')
  }

  return (
    <section className="pb-24">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-base font-black text-ink">
          {'\u5171 '}
          {commentCount + (localComments.length - comments.length)}
          {' \u6761\u8bc4\u8bba'}
        </h2>
      </div>

      <ul className="space-y-4">
        {localComments.map((comment) => {
          const liked = likedIds.has(comment.id)
          return (
            <li key={comment.id} className="flex gap-3">
              <img
                src={comment.user.avatar}
                alt={comment.user.nickname}
                className="h-9 w-9 shrink-0 rounded-pill object-cover shadow-clay-inset"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-ink">{comment.user.nickname}</span>
                  <span className="text-caption">{comment.created_at}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{comment.content}</p>
                <ClaySquish
                  as="button"
                  type="button"
                  variant="none"
                  onClick={() =>
                    setLikedIds((prev) => {
                      const next = new Set(prev)
                      if (next.has(comment.id)) next.delete(comment.id)
                      else next.add(comment.id)
                      return next
                    })
                  }
                  className="mt-2 flex items-center gap-1 text-caption font-bold text-ink-faint"
                >
                  <Heart size={14} weight={liked ? 'fill' : 'bold'} className={liked ? 'text-tomato' : undefined} />
                  {comment.likes + (liked ? 1 : 0)}
                </ClaySquish>
              </div>
            </li>
          )
        })}
      </ul>

      <form
        onSubmit={handleSubmit}
        className="safe-bottom fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-ink/5 bg-surface px-gutter py-3"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={'\u8bf4\u70b9\u4ec0\u4e48\u2026'}
            className="clay-tray min-w-0 flex-1 rounded-pill px-4 py-2.5 text-sm text-ink outline-none"
          />
          <ClaySquish
            as="button"
            type="submit"
            variant="primary"
            className={`clay-btn-primary shrink-0 rounded-pill px-4 py-2.5 ${draft.trim() ? '' : 'pointer-events-none opacity-40'}`}
          >
            <PaperPlaneTilt size={18} weight="bold" />
          </ClaySquish>
        </div>
      </form>
    </section>
  )
}
