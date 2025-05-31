export interface PexelsPhoto {
  id: number
  width: number
  height: number
  url: string
  photographer: string
  photographer_url: string
  src: {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
    portrait: string
    landscape: string
    tiny: string
  }
  alt: string
}

export interface PexelsResponse {
  photos: PexelsPhoto[]
  total_results: number
  page: number
  per_page: number
  next_page?: string
}

export async function searchPexelsImages(query: string, perPage: number = 12): Promise<PexelsPhoto[]> {
  try {
    const response = await fetch(`/api/pexels?query=${encodeURIComponent(query)}&per_page=${perPage}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch images')
    }
    
    const data: PexelsResponse = await response.json()
    return data.photos
  } catch (error) {
    console.error('Error fetching Pexels images:', error)
    return []
  }
}

export function generateImageQueries(industry: string, businessDescription: string): string[] {
  const industryQueries: Record<string, string[]> = {
    technology: [
      'modern office technology',
      'team collaboration workspace',
      'digital innovation',
      'computer programming',
      'tech startup office'
    ],
    healthcare: [
      'medical professionals',
      'healthcare facility',
      'doctor patient consultation',
      'medical equipment',
      'wellness center'
    ],
    finance: [
      'financial planning',
      'business meeting',
      'investment consultation',
      'modern banking',
      'financial success'
    ],
    education: [
      'students learning',
      'classroom environment',
      'educational technology',
      'academic success',
      'knowledge sharing'
    ],
    retail: [
      'shopping experience',
      'retail store interior',
      'customer service',
      'product display',
      'retail technology'
    ],
    'real-estate': [
      'real estate agent',
      'beautiful home interior',
      'property viewing',
      'modern architecture',
      'home buying'
    ],
    'food-beverage': [
      'restaurant interior',
      'food preparation',
      'dining experience',
      'kitchen staff',
      'fresh ingredients'
    ],
    travel: [
      'travel destination',
      'vacation planning',
      'travel agency',
      'beautiful landscapes',
      'travel experience'
    ],
    fitness: [
      'fitness training',
      'gym equipment',
      'healthy lifestyle',
      'personal trainer',
      'wellness center'
    ]
  }

  // Get industry-specific queries
  const queries = industryQueries[industry] || [
    'professional business',
    'team collaboration',
    'modern workspace',
    'business success',
    'customer service'
  ]

  // Add generic business queries
  queries.push(
    'professional handshake',
    'team meeting',
    'business growth',
    'customer satisfaction'
  )

  return queries
}

export function categorizeImages(photos: PexelsPhoto[]): {
  hero: PexelsPhoto[]
  features: PexelsPhoto[]
  about: PexelsPhoto[]
  testimonials: PexelsPhoto[]
} {
  // Simple categorization based on image dimensions and content
  const hero = photos.filter(photo => photo.width > photo.height).slice(0, 3) // Landscape for hero
  const features = photos.filter(photo => photo.width < photo.height).slice(0, 6) // Portrait for features
  const about = photos.filter(photo => photo.width > photo.height).slice(3, 6) // More landscape
  const testimonials = photos.filter(photo => photo.width === photo.height || Math.abs(photo.width - photo.height) < 100).slice(0, 3) // Square-ish for testimonials

  return {
    hero: hero.length > 0 ? hero : photos.slice(0, 3),
    features: features.length > 0 ? features : photos.slice(3, 9),
    about: about.length > 0 ? about : photos.slice(9, 12),
    testimonials: testimonials.length > 0 ? testimonials : photos.slice(12, 15)
  }
}