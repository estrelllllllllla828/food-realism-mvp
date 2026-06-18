import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lightning } from '@phosphor-icons/react'
import { fetchCommunityPosts } from '../api/mockApi'
import type { CommunityPost } from '../types'
import CommunityCard from '../components/CommunityCard'
import { StaggerItem, StaggerReveal } from '../components/clay/StaggerReveal'
import { SHADOW_CLAY_RAISED_SM, SPRING_STAGGER } from '../design/tokens'

export default function CommunityPage() {
  const location = useLocation()
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchCommunityPosts().then((data) => {
      setPosts(data)
      setLoading(false)
    })
  }, [location.key])

  return (
    <main className="page-shell">
      <motion.header
        className="mb-5"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING_STAGGER}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-clay bg-tomato-soft"
            style={{ boxShadow: SHADOW_CLAY_RAISED_SM }}
          >
            <Lightning size={24} weight="fill" className="text-tomato" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-ink">{'避雷圈'}</h1>
            <p className="text-caption">{'真实买家秀 · UGC 广场'}</p>
          </div>
        </div>
      </motion.header>

      {loading ? (
        <div className="masonry">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="masonry-item clay-card clay-skeleton aspect-[3/4]" />
          ))}
        </div>
      ) : (
        <StaggerReveal className="masonry">
          {posts.map((post) => (
            <StaggerItem key={post.id} className="masonry-item">
              <CommunityCard post={post} />
            </StaggerItem>
          ))}
        </StaggerReveal>
      )}
    </main>
  )
}
