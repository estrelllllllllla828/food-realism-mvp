import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Medal, ThumbsUp } from '@phosphor-icons/react'
import { fetchFavorites, fetchUserPosts, fetchUserProfile } from '../api/mockApi'
import type { FavoriteItem, UserPost, UserProfile } from '../types'
import RealismCapsule from '../components/RealismCapsule'
import ClayTabSwitch from '../components/ClayTabSwitch'

type ProfileTab = 'posts' | 'favorites'

const PROFILE_TABS = [
  { id: 'posts' as const, label: '我的发布' },
  { id: 'favorites' as const, label: '我的收藏' },
]

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [posts, setPosts] = useState<UserPost[]>([])
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [tab, setTab] = useState<ProfileTab>('posts')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchUserProfile(), fetchUserPosts(), fetchFavorites()]).then(
      ([profile, userPosts, favs]) => {
        setUser(profile)
        setPosts(userPosts)
        setFavorites(favs)
        setLoading(false)
      },
    )
  }, [])

  if (loading || !user) {
    return (
      <main className="page-shell">
        <div className="clay-card clay-skeleton h-48" />
      </main>
    )
  }

  return (
    <main className="page-shell">
      <header className="clay-card p-5">
        <div className="flex items-center gap-4">
          <div className="clay-avatar-frame shrink-0">
            <img
              src={user.avatar}
              alt={user.nickname}
              className="h-20 w-20 rounded-clay object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-black text-ink">{user.nickname}</h1>
            <p className="mt-0.5 text-caption">{user.bio}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { icon: ThumbsUp, value: user.stats.likes_received, label: '获赞' },
            { icon: Medal, value: user.stats.mines_cleared, label: '排雷次数' },
            { icon: Heart, value: user.stats.posts_count, label: '发布' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="clay-tray flex flex-col items-center py-3">
              <Icon size={20} weight="fill" className="text-tomato" />
              <span className="mt-1 text-lg font-black text-ink">{value}</span>
              <span className="text-caption">{label}</span>
            </div>
          ))}
        </div>
      </header>

      <div className="mt-6">
        <ClayTabSwitch tabs={PROFILE_TABS} active={tab} onChange={setTab} />
      </div>

      {tab === 'posts' ? (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {posts.map((post) => (
            <div key={post.id} className="clay-card overflow-hidden p-0">
              <div className="relative aspect-square shadow-clay-inset">
                <img
                  src={post.image}
                  alt={post.food_name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-2 left-2">
                  <RealismCapsule score={post.realism_score} compact />
                </div>
              </div>
              <p className="truncate p-3 text-xs font-bold text-ink">{post.food_name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {favorites.map((item) => (
            <Link
              key={item.id}
              to={`/food/${item.food_id}`}
              className="clay-card flex gap-3 p-3 transition-transform duration-200 ease-clay active:scale-[0.99]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 shrink-0 rounded-clay object-cover shadow-clay-inset"
              />
              <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                <div>
                  <p className="text-caption">{item.shop_name}</p>
                  <h3 className="truncate font-black text-ink">{item.name}</h3>
                </div>
                <div className="flex items-center justify-between">
                  <RealismCapsule score={item.realism_score} compact />
                  <span className="font-black text-tomato">{'\u00a5'}{item.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
