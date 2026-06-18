import type {
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

const MOCK_FOODS: FoodItem[] = [
  {
    food_id: '10023',
    name: '體然销魂卤肉饭',
    shop_name: '台味小馆',
    merchant_img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80&auto=format&fit=crop',
    price: 28.5,
    distance_km: 1.2,
    rating: 4.2,
    ai_evaluation: {
      realism_score: 0.55,
      real_img_sample: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80',
      dimensions: { portion_match: 0.4, color_match: 0.6, ingredient_match: 0.8 },
      tags: ['份量严重缩水', '颜色偏暗', '肉块较小'],
      sample_count: 47,
    },
  },
  {
    food_id: '10024',
    name: '芝士拉丝披萨',
    shop_name: '意式窑炉',
    merchant_img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80&auto=format&fit=crop',
    price: 58,
    distance_km: 0.8,
    rating: 4.9,
    ai_evaluation: {
      realism_score: 0.92,
      real_img_sample: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
      dimensions: { portion_match: 0.95, color_match: 0.9, ingredient_match: 0.91 },
      tags: ['芝士量足', '色泽诱人'],
      sample_count: 128,
    },
  },
  {
    food_id: '10025',
    name: '招牌黄焖鸡米饭',
    shop_name: '黄焖鸡大王',
    merchant_img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80&auto=format&fit=crop',
    price: 22,
    distance_km: 2.1,
    rating: 4.5,
    ai_evaluation: {
      realism_score: 0.72,
      real_img_sample: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
      dimensions: { portion_match: 0.7, color_match: 0.75, ingredient_match: 0.71 },
      tags: ['鸡肉偏少', '整体尚可'],
      sample_count: 89,
    },
  },
  {
    food_id: '10026',
    name: '豪华寿司拼盘',
    shop_name: '鲜鲜寿司',
    merchant_img: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=80&auto=format&fit=crop',
    price: 88,
    distance_km: 3.5,
    rating: 3.8,
    ai_evaluation: {
      realism_score: 0.38,
      real_img_sample: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80',
      dimensions: { portion_match: 0.3, color_match: 0.45, ingredient_match: 0.4 },
      tags: ['严重图文不符', '数量减半', '摆盘差距大'],
      sample_count: 63,
    },
  },
  {
    food_id: '10027',
    name: '经典牛肉汉堡',
    shop_name: '牛堡工厂',
    merchant_img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&auto=format&fit=crop',
    price: 35,
    distance_km: 1.5,
    rating: 4.6,
    ai_evaluation: {
      realism_score: 0.85,
      real_img_sample: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80',
      dimensions: { portion_match: 0.88, color_match: 0.82, ingredient_match: 0.86 },
      tags: ['肉饺多肉', '菜蔬新鲜'],
      sample_count: 156,
    },
  },
  {
    food_id: '10028',
    name: '麻辣香锅',
    shop_name: '香锅大师',
    merchant_img: 'https://images.unsplash.com/photo-1585032226651-759b368d8c70?w=600&q=80&auto=format&fit=crop',
    price: 45,
    distance_km: 0.5,
    rating: 4.3,
    ai_evaluation: {
      realism_score: 0.68,
      real_img_sample: 'https://images.unsplash.com/photo-1563379091339-03246963d29a?w=600&q=80',
      dimensions: { portion_match: 0.65, color_match: 0.7, ingredient_match: 0.69 },
      tags: ['蔬菜偏少', '整体还行'],
      sample_count: 72,
    },
  },
]


const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'p1',
    food_id: '10026',
    food_name: '豪华寿司拼盘',
    shop_name: '日料小屋',
    caption: '点的豪华拼盘到手就傻眼了，图片和实物差了一个铺子…避雷！',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80&auto=format&fit=crop',
    rating: 2,
    realism_score: 0.35,
    user: { id: 'u1', nickname: '吃货小美', avatar: 'https://i.pravatar.cc/80?img=1' },
    likes: 234,
    comment_count: 18,
    created_at: '2小时前',
    tags: ['避雷', '照骗实键'],
    imageHeight: 'tall',
  },
  {
    id: 'p2',
    food_id: '10024',
    food_name: '芝士拉丝披萨',
    shop_name: '意式窑炉',
    caption: '这家真的可以！拉丝长到能打结，和店里照片几乎一样，安利推荐',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80&auto=format&fit=crop',
    rating: 5,
    realism_score: 0.94,
    user: { id: 'u2', nickname: '披萨控', avatar: 'https://i.pravatar.cc/80?img=12' },
    likes: 891,
    comment_count: 42,
    created_at: '5小时前',
    tags: ['真实好店', '拉丝教程'],
    imageHeight: 'medium',
  },
  {
    id: 'p3',
    food_id: '10023',
    food_name: '暗然销魂卤肉饭',
    shop_name: '台味小馆',
    caption: '肉量偏少但味道还行，肉丁比宣传图小一圈，不算太坑',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80&auto=format&fit=crop',
    rating: 3,
    realism_score: 0.52,
    user: { id: 'u3', nickname: '台北阿杰', avatar: 'https://i.pravatar.cc/80?img=33' },
    likes: 156,
    comment_count: 9,
    created_at: '昨天',
    tags: ['午餐打卡', '肉量少'],
    imageHeight: 'short',
  },
  {
    id: 'p4',
    food_id: '10027',
    food_name: '经典牛肉汉堡',
    shop_name: '牛堡工厂',
    caption: '牛肉饺多肉多菜，面包也松软，和照片差不多，值得回购',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80&auto=format&fit=crop',
    rating: 5,
    realism_score: 0.88,
    user: { id: 'u4', nickname: '汉堡猎人', avatar: 'https://i.pravatar.cc/80?img=52' },
    likes: 445,
    comment_count: 27,
    created_at: '昨天',
    tags: ['回购', '真实好店'],
    imageHeight: 'medium',
  },
  {
    id: 'p5',
    food_id: '10028',
    food_name: '麻辣香锅',
    shop_name: '香锅大师',
    caption: '菜品新鲜但分量一般，辣度可以自选，总体不踩雷',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d29a?w=500&q=80&auto=format&fit=crop',
    rating: 4,
    realism_score: 0.7,
    user: { id: 'u5', nickname: '辣妹子', avatar: 'https://i.pravatar.cc/80?img=45' },
    likes: 312,
    comment_count: 15,
    created_at: '3天前',
    tags: ['晚餐', '中等真实度'],
    imageHeight: 'tall',
  },
  {
    id: 'p6',
    food_id: '10025',
    food_name: '黄焖鸡米饭',
    shop_name: '黄焖鸡大师',
    caption: '鸡块大小还可以，汤汁挺浓，和店里图片比起来没太大偏差',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80&auto=format&fit=crop',
    rating: 4,
    realism_score: 0.74,
    user: { id: 'u6', nickname: '干饭王', avatar: 'https://i.pravatar.cc/80?img=68' },
    likes: 178,
    comment_count: 6,
    created_at: '3天前',
    tags: ['午餐', '性价比'],
    imageHeight: 'short',
  },
]

let communityPosts: CommunityPost[] = [...INITIAL_COMMUNITY_POSTS]

const MOCK_POST_COMMENTS: Record<string, CommunityComment[]> = {
  p1: [
    { id: 'c1', user: { id: 'u7', nickname: '寿司爱好者', avatar: 'https://i.pravatar.cc/80?img=8' }, content: '我也点过，实物像便利店便当…', likes: 45, created_at: '1小时前' },
    { id: 'c2', user: { id: 'u8', nickname: '排雷先锋', avatar: 'https://i.pravatar.cc/80?img=15' }, content: '感谢分享，已收藏避坑', likes: 32, created_at: '1小时前' },
    { id: 'c3', user: { id: 'u1', nickname: '吃货小美', avatar: 'https://i.pravatar.cc/80?img=1' }, content: '店里说是摄影棚拍的，我看就是照骗', likes: 67, created_at: '50分钟前' },
  ],
  p2: [
    { id: 'c4', user: { id: 'u9', nickname: '芝士兜', avatar: 'https://i.pravatar.cc/80?img=22' }, content: '问问店铺名字，明天就点', likes: 12, created_at: '3小时前' },
    { id: 'c5', user: { id: 'u2', nickname: '披萨控', avatar: 'https://i.pravatar.cc/80?img=12' }, content: '意式窑炉，在商圈里', likes: 28, created_at: '2小时前' },
    { id: 'c6', user: { id: 'u10', nickname: '夜猫子', avatar: 'https://i.pravatar.cc/80?img=31' }, content: '吃了三次了，每次都挺稳', likes: 19, created_at: '1小时前' },
  ],
  p3: [
    { id: 'c7', user: { id: 'u11', nickname: '卤肉饭迷', avatar: 'https://i.pravatar.cc/80?img=41' }, content: '肉是少但汤很香，看你接受不', likes: 8, created_at: '昨天' },
  ],
  p4: [
    { id: 'c8', user: { id: 'u12', nickname: 'BurgerFan', avatar: 'https://i.pravatar.cc/80?img=55' }, content: '双层牛肉酱是真的多！', likes: 21, created_at: '昨天' },
    { id: 'c9', user: { id: 'u13', nickname: '打工人午餐', avatar: 'https://i.pravatar.cc/80?img=62' }, content: '套餐加烴杏刚刚好', likes: 14, created_at: '昨天' },
  ],
  p5: [
    { id: 'c10', user: { id: 'u14', nickname: '香锅达人', avatar: 'https://i.pravatar.cc/80?img=70' }, content: '微辣刚刚好，重口味很爽', likes: 11, created_at: '2天前' },
  ],
  p6: [
    { id: 'c11', user: { id: 'u15', nickname: '午餐不回复', avatar: 'https://i.pravatar.cc/80?img=77' }, content: '黄焖鸡的老店，这家是分店', likes: 5, created_at: '2天前' },
  ],
}

const MOCK_USER: UserProfile = {
  id: 'me',
  nickname: '真实外卖达人',
  avatar: 'https://i.pravatar.cc/120?img=60',
  bio: '专注揭露照骗，分享真实买家秀',
  stats: { likes_received: 1286, mines_cleared: 47, posts_count: 12 },
}

const MOCK_USER_POSTS: UserPost[] = [
  { id: 'mp1', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80', food_name: '卤肉饭实拍', realism_score: 0.55 },
  { id: 'mp2', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80', food_name: '寿司避坑', realism_score: 0.38 },
  { id: 'mp3', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', food_name: '披萨好评', realism_score: 0.92 },
  { id: 'mp4', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80', food_name: '汉堡测评', realism_score: 0.85 },
  { id: 'mp5', image: 'https://images.unsplash.com/photo-1563379091339-03246963d29a?w=400&q=80', food_name: '香锅记录', realism_score: 0.68 },
  { id: 'mp6', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80', food_name: '黄焖鸡', realism_score: 0.72 },
]

const MOCK_FAVORITES: FavoriteItem[] = [
  { id: 'f1', food_id: '10024', name: '芝士拉丝披萨', shop_name: '意式窑炉', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80', realism_score: 0.92, price: 58 },
  { id: 'f2', food_id: '10027', name: '经典牛肉汉堡', shop_name: '牛堡工厂', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&q=80', realism_score: 0.85, price: 35 },
  { id: 'f3', food_id: '10025', name: '招牌黄焖鸡米饭', shop_name: '黄焖鸡大王', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80', realism_score: 0.72, price: 22 },
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
    description: '商家宣传图 vs 食客实拍，AI 多模态比对还原真实面貌。',
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
  return { ...post, comments: MOCK_POST_COMMENTS[postId] ?? [] }
}

export async function createCommunityPost(req: CreateCommunityPostRequest): Promise<CommunityPost> {
  await delay(450)
  const realism = req.realism_score ?? Math.min(0.95, Math.max(0.2, req.rating / 5))
  const post: CommunityPost = {
    id: `p${Date.now()}`,
    food_id: `user-${Date.now()}`,
    food_name: req.food_name,
    shop_name: req.shop_name,
    caption: req.caption,
    image: req.image,
    rating: req.rating,
    realism_score: realism,
    user: { id: MOCK_USER.id, nickname: MOCK_USER.nickname, avatar: MOCK_USER.avatar },
    likes: 0,
    comment_count: 0,
    created_at: '刚刚',
    tags: req.tags?.length ? req.tags : ['买家秀'],
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
