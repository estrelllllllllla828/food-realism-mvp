export interface AIEvaluation {
  realism_score: number
  real_img_sample: string
  dimensions: {
    portion_match: number
    color_match: number
    ingredient_match: number
  }
  tags: string[]
  sample_count?: number
}

export interface FoodItem {
  food_id: string
  name: string
  merchant_img: string
  price: number
  shop_name: string
  distance_km: number
  rating: number
  ai_evaluation: AIEvaluation
}

export interface FoodDetail extends FoodItem {
  description?: string
  platform?: 'meituan' | 'eleme'
}

export interface CompareRequest {
  food_id: string
  user_uploaded_img: string
}

export interface CompareResponse {
  status: 'success' | 'error'
  calculated_score: number
  diff_highlights: string[]
  reward_points: number
}

export interface CreateCommunityPostRequest {
  caption: string
  food_name: string
  shop_name: string
  image: string
  rating: number
  realism_score?: number
  tags?: string[]
}

export interface CommunityComment {
  id: string
  user: {
    id: string
    nickname: string
    avatar: string
  }
  content: string
  likes: number
  created_at: string
}

export interface CommunityPost {
  id: string
  food_id: string
  food_name: string
  shop_name: string
  caption: string
  image: string
  rating: number
  realism_score: number
  user: {
    id: string
    nickname: string
    avatar: string
  }
  likes: number
  comment_count: number
  created_at: string
  tags: string[]
  imageHeight: 'short' | 'medium' | 'tall'
}

export interface CommunityPostDetail extends CommunityPost {
  comments: CommunityComment[]
}

export interface UserProfile {
  id: string
  nickname: string
  avatar: string
  bio: string
  stats: {
    likes_received: number
    mines_cleared: number
    posts_count: number
  }
}

export interface UserPost {
  id: string
  image: string
  food_name: string
  realism_score: number
}

export interface FavoriteItem {
  id: string
  food_id: string
  name: string
  shop_name: string
  image: string
  realism_score: number
  price: number
}

export type RealismLevel = 'high' | 'medium' | 'low'

export type SortOption = 'default' | 'distance' | 'realism' | 'rating'

export function getRealismLevel(score: number): RealismLevel {
  if (score > 0.8) return 'high'
  if (score >= 0.6) return 'medium'
  return 'low'
}

export function formatRealismPercent(score: number): number {
  return Math.round(score * 100)
}
