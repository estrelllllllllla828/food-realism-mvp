import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ChatCircle, Heart, ShareNetwork } from '@phosphor-icons/react'
import { fetchCommunityPost } from '../api/mockApi'
import type { CommunityPostDetail } from '../types'
import CommentSection from '../components/CommentSection'
import RealismCapsule from '../components/RealismCapsule'
import StarRating from '../components/StarRating'
import ClaySquish from '../components/clay/ClaySquish'

export default function CommunityPostPage() {
  const { postId } = useParams<{ postId: string }>()
  const [post, setPost] = useState<CommunityPostDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (!postId) return
    fetchCommunityPost(postId).then((data) => {
      setPost(data)
      setLoading(false)
    })
  }, [postId])

  if (loading) {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-surface px-gutter pt-4">
        <div className="clay-card clay-skeleton aspect-[4/5]" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center bg-surface px-gutter">
        <p className="text-subtitle">{'\u5e16\u5b50\u4e0d\u5b58\u5728'}</p>
        <Link to="/community" className="clay-btn-primary mt-4">
          {'\u8fd4\u56de\u907f\u96f7\u5708'}
        </Link>
      </div>
    )
  }

  const likeCount = post.likes + (liked ? 1 : 0)

  return (
    <div className="mx-auto min-h-screen max-w-md bg-surface pb-8">
      <div className="sticky top-0 z-40 flex items-center gap-3 bg-surface px-gutter py-3 shadow-clay-raised-sm">
        <Link
          to="/community"
          className="clay-btn-secondary inline-flex items-center gap-1 rounded-pill px-3 py-2 text-sm font-bold"
        >
          <ArrowLeft size={18} weight="bold" />
          {'\u907f\u96f7\u5708'}
        </Link>
      </div>

      <div className="clay-card-thick mx-gutter overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden rounded-clay shadow-clay-inset-deep">
          <img src={post.image} alt={post.food_name} className="h-full w-full object-cover" />
          <div className="absolute left-3 top-3">
            <RealismCapsule score={post.realism_score} compact />
          </div>
        </div>
      </div>

      <div className="space-y-4 px-gutter pt-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={post.user.avatar}
              alt={post.user.nickname}
              className="h-11 w-11 shrink-0 rounded-pill object-cover shadow-clay-inset"
            />
            <div className="min-w-0">
              <p className="truncate font-black text-ink">{post.user.nickname}</p>
              <p className="text-caption">{post.created_at}</p>
            </div>
          </div>
          <ClaySquish as="button" type="button" variant="raised-sm" className="clay-btn-secondary shrink-0 rounded-pill px-4 py-2 text-xs font-bold">
            {'\u5173\u6ce8'}
          </ClaySquish>
        </div>

        <div>
          <h1 className="text-lg font-black leading-snug text-ink">{post.caption}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-sm font-bold text-tomato">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="clay-tray flex flex-wrap items-center gap-3 px-4 py-3">
          <StarRating rating={post.rating} />
          <span className="text-caption">
            {post.shop_name}
            {' · '}
            {post.food_name}
          </span>
          <Link to={`/food/${post.food_id}`} className="ml-auto text-sm font-bold text-tomato">
            {'\u67e5\u770b\u8be5\u83dc\u54c1 \u2192'}
          </Link>
        </div>

        <div className="flex items-center gap-6 border-y border-ink/5 py-3">
          <ClaySquish
            as="button"
            type="button"
            variant="none"
            onClick={() => setLiked((v) => !v)}
            className="flex items-center gap-1.5 text-sm font-bold text-ink-muted"
          >
            <Heart size={20} weight={liked ? 'fill' : 'bold'} className={liked ? 'text-tomato' : undefined} />
            {likeCount}
          </ClaySquish>
          <span className="flex items-center gap-1.5 text-sm font-bold text-ink-muted">
            <ChatCircle size={20} weight="bold" />
            {post.comment_count}
          </span>
          <ClaySquish as="button" type="button" variant="none" className="flex items-center gap-1.5 text-sm font-bold text-ink-muted">
            <ShareNetwork size={20} weight="bold" />
            {'\u5206\u4eab'}
          </ClaySquish>
        </div>

        <CommentSection comments={post.comments} commentCount={post.comment_count} />
      </div>
    </div>
  )
}
