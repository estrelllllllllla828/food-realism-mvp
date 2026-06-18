import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const transcript =
  'C:/Users/Estrella/.cursor/projects/c-Users-Estrella-Desktop/agent-transcripts/9bb97772-5ba4-44a5-9903-5a2fe3eec84d/9bb97772-5ba4-44a5-9903-5a2fe3eec84d.jsonl'

function extractMockFoods() {
  for (const line of fs.readFileSync(transcript, 'utf8').split('\n')) {
    if (!line.includes('黯然销魂')) continue
    try {
      const obj = JSON.parse(line)
      for (const part of obj.message?.content ?? []) {
        if (part.name === 'Write' && part.input?.path?.includes('mockApi.ts')) {
          const c = part.input.contents
          const m = c.match(/const MOCK_FOODS: FoodItem\[\] = \[([\s\S]*?)\]\n\n/)
          if (m && /[\u4e00-\u9fff]/.test(m[0])) return `const MOCK_FOODS: FoodItem[] = [${m[1]}]\n`
        }
      }
    } catch {
      /* ignore */
    }
  }
  throw new Error('MOCK_FOODS not found in transcript')
}

const mockFoods = extractMockFoods()

const file = `import type {
  CommunityComment,
  CommunityPost,
  CommunityPostDetail,
  CreateCommunityPostRequest,
  CompareRequest,
  CompareResponse,
  FavoriteItem,
  FoodDetail,
  FoodItem,
  UserPost,
  UserProfile,
} from '../types'

${mockFoods}
const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'p1',
    food_id: '10026',
    food_name: '\u8c6a\u534e\u5bff\u53f8\u62fc\u76d8',
    shop_name: '\u65e5\u6599\u5c0f\u5c4b',
    caption: '\u70b9\u7684\u8c6a\u534e\u62fc\u76d8\u5230\u624b\u5c31\u50bb\u773c\u4e86\uff0c\u56fe\u7247\u548c\u5b9e\u7269\u5dee\u4e86\u4e00\u4e2a\u94fa\u5b50\u2026\u907f\u96f7\uff01',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80',
    rating: 2,
    realism_score: 0.35,
    user: { id: 'u1', nickname: '\u5403\u8d27\u5c0f\u7f8e', avatar: 'https://i.pravatar.cc/80?img=1' },
    likes: 234,
    comment_count: 18,
    created_at: '2\u5c0f\u65f6\u524d',
    tags: ['\u907f\u96f7', '\u7167\u9a97\u5b9e\u952e'],
    imageHeight: 'tall',
  },
  {
    id: 'p2',
    food_id: '10024',
    food_name: '\u829d\u58eb\u62c9\u4e1d\u62ab\u8428',
    shop_name: '\u610f\u5f0f\u7a91\u7089',
    caption: '\u8fd9\u5bb6\u771f\u7684\u53ef\u4ee5\uff01\u62c9\u4e1d\u957f\u5230\u80fd\u6253\u7ed3\uff0c\u548c\u5e97\u91cc\u7167\u7247\u51e0\u4e4e\u4e00\u6837\uff0c\u5b89\u5229\u5229\u63a8\u8350',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80',
    rating: 5,
    realism_score: 0.94,
    user: { id: 'u2', nickname: '\u62ab\u8428\u63a7', avatar: 'https://i.pravatar.cc/80?img=12' },
    likes: 891,
    comment_count: 42,
    created_at: '5\u5c0f\u65f6\u524d',
    tags: ['\u771f\u5b9e\u597d\u5e97', '\u62c9\u4e1d\u6559\u7a0b'],
    imageHeight: 'medium',
  },
  {
    id: 'p3',
    food_id: '10023',
    food_name: '\u6697\u7136\u9500\u9b42\u5364\u8089\u996d',
    shop_name: '\u53f0\u5473\u5c0f\u9986',
    caption: '\u8089\u91cf\u504f\u5c11\u4f46\u5473\u9053\u8fd8\u884c\uff0c\u8089\u4e01\u6bd4\u5ba3\u4f20\u56fe\u5c0f\u4e00\u5708\uff0c\u4e0d\u7b97\u592a\u5751',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80',
    rating: 3,
    realism_score: 0.52,
    user: { id: 'u3', nickname: '\u53f0\u5317\u963f\u6770', avatar: 'https://i.pravatar.cc/80?img=33' },
    likes: 156,
    comment_count: 9,
    created_at: '\u6628\u5929',
    tags: ['\u5348\u9910\u6253\u5361', '\u8089\u91cf\u5c11'],
    imageHeight: 'short',
  },
  {
    id: 'p4',
    food_id: '10027',
    food_name: '\u7ecf\u5178\u725b\u8089\u6c49\u5821',
    shop_name: '\u725b\u5821\u5de5\u5382',
    caption: '\u725b\u8089\u997a\u591a\u8089\u591a\u83dc\uff0c\u9762\u5305\u4e5f\u677e\u8f6f\uff0c\u548c\u7167\u7247\u5dee\u4e0d\u591a\uff0c\u503c\u5f97\u56de\u8d2d',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80',
    rating: 5,
    realism_score: 0.88,
    user: { id: 'u4', nickname: '\u6c49\u5821\u730e\u4eba', avatar: 'https://i.pravatar.cc/80?img=52' },
    likes: 445,
    comment_count: 27,
    created_at: '\u6628\u5929',
    tags: ['\u56de\u8d2d', '\u771f\u5b9e\u597d\u5e97'],
    imageHeight: 'medium',
  },
  {
    id: 'p5',
    food_id: '10028',
    food_name: '\u9ebb\u8fa3\u9999\u9505',
    shop_name: '\u9999\u9505\u5927\u5e08',
    caption: '\u83dc\u54c1\u65b0\u9c9c\u4f46\u5206\u91cf\u4e00\u822c\uff0c\u8fa3\u5ea6\u53ef\u4ee5\u81ea\u9009\uff0c\u603b\u4f53\u4e0d\u8e29\u96f7',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d29a?w=500&q=80',
    rating: 4,
    realism_score: 0.7,
    user: { id: 'u5', nickname: '\u8fa3\u59b9\u5b50', avatar: 'https://i.pravatar.cc/80?img=45' },
    likes: 312,
    comment_count: 15,
    created_at: '3\u5929\u524d',
    tags: ['\u665a\u9910', '\u4e2d\u7b49\u771f\u5b9e\u5ea6'],
    imageHeight: 'tall',
  },
  {
    id: 'p6',
    food_id: '10025',
    food_name: '\u9ec4\u7116\u9e21\u7c73\u996d',
    shop_name: '\u9ec4\u7116\u9e21\u5927\u5e08',
    caption: '\u9e21\u5757\u5927\u5c0f\u8fd8\u53ef\u4ee5\uff0c\u6c64\u6c41\u633a\u6d53\uff0c\u548c\u5e97\u91cc\u56fe\u7247\u6bd4\u8d77\u6765\u6ca1\u592a\u5927\u504f\u5dee',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80',
    rating: 4,
    realism_score: 0.74,
    user: { id: 'u6', nickname: '\u5e72\u996d\u738b', avatar: 'https://i.pravatar.cc/80?img=68' },
    likes: 178,
    comment_count: 6,
    created_at: '3\u5929\u524d',
    tags: ['\u5348\u9910', '\u6027\u4ef7\u6bd4'],
    imageHeight: 'short',
  },
]

let communityPosts: CommunityPost[] = [...INITIAL_COMMUNITY_POSTS]

const MOCK_POST_COMMENTS: Record<string, CommunityComment[]> = {
  p1: [
    { id: 'c1', user: { id: 'u7', nickname: '\u5bff\u53f8\u7231\u597d\u8005', avatar: 'https://i.pravatar.cc/80?img=8' }, content: '\u6211\u4e5f\u70b9\u8fc7\uff0c\u5b9e\u7269\u50cf\u4fbf\u5229\u5e97\u4fbf\u5f53\u2026', likes: 45, created_at: '1\u5c0f\u65f6\u524d' },
    { id: 'c2', user: { id: 'u8', nickname: '\u6392\u96f7\u5148\u950b', avatar: 'https://i.pravatar.cc/80?img=15' }, content: '\u611f\u8c22\u5206\u4eab\uff0c\u5df2\u6536\u85cf\u907f\u5751', likes: 32, created_at: '1\u5c0f\u65f6\u524d' },
    { id: 'c3', user: { id: 'u1', nickname: '\u5403\u8d27\u5c0f\u7f8e', avatar: 'https://i.pravatar.cc/80?img=1' }, content: '\u5e97\u91cc\u8bf4\u662f\u6444\u5f71\u68da\u62cd\u7684\uff0c\u6211\u770b\u5c31\u662f\u7167\u9a97', likes: 67, created_at: '50\u5206\u949f\u524d' },
  ],
  p2: [
    { id: 'c4', user: { id: 'u9', nickname: '\u829d\u58eb\u515c', avatar: 'https://i.pravatar.cc/80?img=22' }, content: '\u95ee\u95ee\u5e97\u94fa\u540d\u5b57\uff0c\u660e\u5929\u5c31\u70b9', likes: 12, created_at: '3\u5c0f\u65f6\u524d' },
    { id: 'c5', user: { id: 'u2', nickname: '\u62ab\u8428\u63a7', avatar: 'https://i.pravatar.cc/80?img=12' }, content: '\u610f\u5f0f\u7a91\u7089\uff0c\u5728\u5546\u5708\u91cc', likes: 28, created_at: '2\u5c0f\u65f6\u524d' },
    { id: 'c6', user: { id: 'u10', nickname: '\u591c\u732b\u5b50', avatar: 'https://i.pravatar.cc/80?img=31' }, content: '\u5403\u4e86\u4e09\u6b21\u4e86\uff0c\u6bcf\u6b21\u90fd\u633a\u7a33', likes: 19, created_at: '1\u5c0f\u65f6\u524d' },
  ],
  p3: [
    { id: 'c7', user: { id: 'u11', nickname: '\u5364\u8089\u996d\u8ff7', avatar: 'https://i.pravatar.cc/80?img=41' }, content: '\u8089\u662f\u5c11\u4f46\u6c64\u5f88\u9999\uff0c\u770b\u4f60\u63a5\u53d7\u4e0d', likes: 8, created_at: '\u6628\u5929' },
  ],
  p4: [
    { id: 'c8', user: { id: 'u12', nickname: 'BurgerFan', avatar: 'https://i.pravatar.cc/80?img=55' }, content: '\u53cc\u5c42\u725b\u8089\u9171\u662f\u771f\u7684\u591a\uff01', likes: 21, created_at: '\u6628\u5929' },
    { id: 'c9', user: { id: 'u13', nickname: '\u6253\u5de5\u4eba\u5348\u9910', avatar: 'https://i.pravatar.cc/80?img=62' }, content: '\u5957\u9910\u52a0\u70f8\u674f\u521a\u521a\u597d', likes: 14, created_at: '\u6628\u5929' },
  ],
  p5: [
    { id: 'c10', user: { id: 'u14', nickname: '\u9999\u9505\u8fbe\u4eba', avatar: 'https://i.pravatar.cc/80?img=70' }, content: '\u5fae\u8fa3\u521a\u521a\u597d\uff0c\u91cd\u53e3\u5473\u5f88\u723d', likes: 11, created_at: '2\u5929\u524d' },
  ],
  p6: [
    { id: 'c11', user: { id: 'u15', nickname: '\u5348\u9910\u4e0d\u56de\u590d', avatar: 'https://i.pravatar.cc/80?img=77' }, content: '\u9ec4\u7116\u9e21\u7684\u8001\u5e97\uff0c\u8fd9\u5bb6\u662f\u5206\u5e97', likes: 5, created_at: '2\u5929\u524d' },
  ],
}

const MOCK_USER: UserProfile = {
  id: 'me',
  nickname: '\u771f\u5b9e\u5916\u5356\u8fbe\u4eba',
  avatar: 'https://i.pravatar.cc/120?img=60',
  bio: '\u4e13\u6ce8\u63ed\u9732\u7167\u9a97\uff0c\u5206\u4eab\u771f\u5b9e\u4e70\u5bb6\u79c0',
  stats: {
    likes_received: 1286,
    mines_cleared: 47,
    posts_count: 12,
  },
}

const MOCK_USER_POSTS: UserPost[] = [
  { id: 'mp1', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80', food_name: '\u5364\u8089\u996d\u5b9e\u62cd', realism_score: 0.55 },
  { id: 'mp2', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80', food_name: '\u5bff\u53f8\u907f\u5751', realism_score: 0.38 },
  { id: 'mp3', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', food_name: '\u62ab\u8428\u597d\u8bc4', realism_score: 0.92 },
  { id: 'mp4', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80', food_name: '\u6c49\u5821\u6d4b\u8bc4', realism_score: 0.85 },
  { id: 'mp5', image: 'https://images.unsplash.com/photo-1563379091339-03246963d29a?w=400&q=80', food_name: '\u9999\u9505\u8bb0\u5f55', realism_score: 0.68 },
  { id: 'mp6', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80', food_name: '\u9ec4\u7116\u9e21', realism_score: 0.72 },
]

const MOCK_FAVORITES: FavoriteItem[] = [
  { id: 'f1', food_id: '10024', name: '\u829d\u58eb\u62c9\u4e1d\u62ab\u8428', shop_name: '\u610f\u5f0f\u7a91\u7089', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80', realism_score: 0.92, price: 58 },
  { id: 'f2', food_id: '10027', name: '\u7ecf\u5178\u725b\u8089\u6c49\u5821', shop_name: '\u725b\u5821\u5de5\u5382', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&q=80', realism_score: 0.85, price: 35 },
  { id: 'f3', food_id: '10025', name: '\u62db\u724c\u9ec4\u7116\u9e21\u7c73\u996d', shop_name: '\u9ec4\u7116\u9e21\u5927\u738b', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80', realism_score: 0.72, price: 22 },
]

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function fetchFoodList(): Promise<FoodItem[]> {
  await delay(300)
  return MOCK_FOODS
}

export async function fetchFoodDetail(foodId: string): Promise<FoodDetail | null> {
  await delay(400)
  const food = MOCK_FOODS.find((f) => f.food_id === foodId)
  if (!food) return null
  return {
    ...food,
    description: '\u5546\u5bb6\u5ba3\u4f20\u56fe vs \u98df\u5ba2\u5b9e\u62cd\uff0cAI \u591a\u6a21\u6001\u6bd4\u5bf9\u8fd8\u539f\u771f\u5b9e\u9762\u8c8c\u3002',
    platform: food.food_id === '10024' ? 'eleme' : 'meituan',
  }
}

export async function fetchCommunityPosts(): Promise<CommunityPost[]> {
  await delay(350)
  return [...communityPosts]
}

export async function fetchCommunityPost(postId: string): Promise<CommunityPostDetail | null> {
  await delay(280)
  const post = communityPosts.find((p) => p.id === postId)
  if (!post) return null
  return {
    ...post,
    comments: MOCK_POST_COMMENTS[postId] ?? [],
  }
}

export async function createCommunityPost(req: CreateCommunityPostRequest): Promise<CommunityPost> {
  await delay(450)
  const realism = req.realism_score ?? Math.min(0.95, Math.max(0.2, req.rating / 5))
  const post: CommunityPost = {
    id: \`p\${Date.now()}\`,
    food_id: \`user-\${Date.now()}\`,
    food_name: req.food_name,
    shop_name: req.shop_name,
    caption: req.caption,
    image: req.image,
    rating: req.rating,
    realism_score: realism,
    user: {
      id: MOCK_USER.id,
      nickname: MOCK_USER.nickname,
      avatar: MOCK_USER.avatar,
    },
    likes: 0,
    comment_count: 0,
    created_at: '\u521a\u521a',
    tags: req.tags?.length ? req.tags : ['\u4e70\u5bb6\u79c0'],
    imageHeight: 'medium',
  }
  communityPosts = [post, ...communityPosts]
  MOCK_POST_COMMENTS[post.id] = []
  return post
}

export async function fetchUserProfile(): Promise<UserProfile> {
  await delay(200)
  return MOCK_USER
}

export async function fetchUserPosts(): Promise<UserPost[]> {
  await delay(250)
  return MOCK_USER_POSTS
}

export async function fetchFavorites(): Promise<FavoriteItem[]> {
  await delay(250)
  return MOCK_FAVORITES
}

export async function compareUploadedImage(req: CompareRequest): Promise<CompareResponse> {
  await delay(2500)
  const base = MOCK_FOODS.find((f) => f.food_id === req.food_id)
  const variance = (Math.random() - 0.5) * 0.1
  const calculated = Math.max(0.1, Math.min(0.99, (base?.ai_evaluation.realism_score ?? 0.5) + variance))
  return {
    status: 'success',
    calculated_score: Math.round(calculated * 100) / 100,
    diff_highlights: ['bowl_size', 'meat_color'],
    reward_points: 10 + Math.floor(Math.random() * 5),
  }
}
`

fs.writeFileSync(path.join(root, 'src/api/mockApi.ts'), file, 'utf8')

const communityPage = fs.readFileSync(path.join(root, 'src/pages/CommunityPage.tsx'), 'utf8')
const fixedCommunityPage = communityPage
  .replace(/<h1[^>]*>[^<]*<\/h1>/, `<h1 className="text-2xl font-black text-ink">{'\u907f\u96f7\u5708'}</h1>`)
  .replace(/<p className="text-caption">[^<]*<\/p>/, `<p className="text-caption">{'\u771f\u5b9e\u4e70\u5bb6\u79c0 \u00b7 UGC \u5e7f\u573a'}</p>`)

fs.writeFileSync(path.join(root, 'src/pages/CommunityPage.tsx'), fixedCommunityPage, 'utf8')

const out = fs.readFileSync(path.join(root, 'src/api/mockApi.ts'), 'utf8')
console.log('mockApi cn', (out.match(/[\u4e00-\u9fff]/g) || []).length, 'bad', (out.match(/\?{3,}/g) || []).length)
