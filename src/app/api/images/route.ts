import { NextRequest, NextResponse } from 'next/server'
import { generateImageQueries, categorizeImages, type PexelsPhoto } from '@/lib/images'
import type { MarketingBrief } from '@/lib/anthropic'
import { mockCategorizedImages } from '@/lib/test-mocks'
import { validateApiKeys, getSecurityHeaders } from '@/lib/env'

export async function POST(request: NextRequest) {
  try {
    const brief: MarketingBrief = await request.json()
    
    if (!brief.industry || !brief.businessDescription) {
      return NextResponse.json(
        { error: 'Industry and business description are required' },
        { status: 400 }
      )
    }

    const apiValidation = validateApiKeys()
    
    // Return mock data for tests or when API key is not properly configured
    if (process.env.NODE_ENV === 'test' || !apiValidation.hasValidPexelsKey) {
      
      // Add a small delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const response = NextResponse.json({
        success: true,
        images: mockCategorizedImages,
        totalPhotos: 4,
        queries: ['business', 'technology', 'team', 'professional']
      })

      // Add security headers
      const securityHeaders = getSecurityHeaders()
      Object.entries(securityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value)
      })

      return response
    }

    // Generate relevant search queries based on the business
    const queries = generateImageQueries(brief.industry, brief.businessDescription)
    
    // Take the first 4 most relevant queries to avoid rate limits
    const selectedQueries = queries.slice(0, 4)
    
    // Fetch images for each query
    const imagePromises = selectedQueries.map(async (query: string) => {
      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=8&page=1`,
          {
            headers: {
              'Authorization': process.env.PEXELS_API_KEY!,
            },
          }
        )
        
        if (!response.ok) {
          throw new Error(`Pexels API error for query "${query}": ${response.status}`)
        }
        
        const data = await response.json()
        return data.photos || []
      } catch (error) {
        console.error(`Error fetching images for query "${query}":`, error)
        return []
      }
    })

    const results = await Promise.all(imagePromises)
    
    // Flatten and deduplicate photos
    const allPhotos: PexelsPhoto[] = []
    const seenIds = new Set<number>()
    
    results.forEach(photos => {
      photos.forEach((photo: PexelsPhoto) => {
        if (!seenIds.has(photo.id)) {
          seenIds.add(photo.id)
          allPhotos.push(photo)
        }
      })
    })

    // Categorize images for different sections
    const categorizedImages = categorizeImages(allPhotos)
    
    const response = NextResponse.json({
      success: true,
      images: categorizedImages,
      totalPhotos: allPhotos.length,
      queries: selectedQueries
    })

    // Add security headers
    const securityHeaders = getSecurityHeaders()
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    return response
  } catch (error) {
    console.error('Error in images API:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to curate images',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}