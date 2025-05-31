import { NextRequest, NextResponse } from 'next/server'
import { 
  saveLandingPage, 
  getRecentLandingPages, 
  searchLandingPages,
  initTables 
} from '@/lib/database'
import type { LandingPageContent, MarketingBrief } from '@/lib/anthropic'
import type { PexelsPhoto } from '@/lib/images'

interface CategorizedImages {
  hero: PexelsPhoto[]
  features: PexelsPhoto[]
  about: PexelsPhoto[]
  testimonials: PexelsPhoto[]
}

// Initialize database tables on first request
let tablesInitialized = false

const ensureTablesInitialized = async () => {
  if (!tablesInitialized) {
    await initTables()
    tablesInitialized = true
  }
}

// GET /api/landing-pages - Get recent landing pages or search
export async function GET(request: NextRequest) {
  try {
    await ensureTablesInitialized()
    
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const limit = parseInt(searchParams.get('limit') || '10')

    let landingPages
    if (query) {
      landingPages = await searchLandingPages(query)
    } else {
      landingPages = await getRecentLandingPages(limit)
    }

    return NextResponse.json({
      success: true,
      landingPages,
      count: landingPages.length
    })
  } catch (error) {
    console.error('Error in landing-pages GET API:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch landing pages',
        details: process.env.NODE_ENV === 'development' 
          ? (error instanceof Error ? error.message : 'Unknown error')
          : 'Database error occurred'
      },
      { status: 500 }
    )
  }
}

// POST /api/landing-pages - Save new landing page
export async function POST(request: NextRequest) {
  try {
    await ensureTablesInitialized()
    
    const body = await request.json()
    const { brief, content, images }: {
      brief: MarketingBrief
      content: LandingPageContent
      images: CategorizedImages
    } = body

    // Validate required fields
    if (!brief || !content || !images) {
      return NextResponse.json(
        { error: 'Missing required fields: brief, content, images' },
        { status: 400 }
      )
    }

    if (!brief.businessName || !brief.industry || !brief.businessDescription) {
      return NextResponse.json(
        { error: 'Brief must contain businessName, industry, and businessDescription' },
        { status: 400 }
      )
    }

    const savedLandingPage = await saveLandingPage(brief, content, images)

    return NextResponse.json({
      success: true,
      landingPage: savedLandingPage
    })
  } catch (error) {
    console.error('Error in landing-pages POST API:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to save landing page',
        details: process.env.NODE_ENV === 'development' 
          ? (error instanceof Error ? error.message : 'Unknown error')
          : 'Database error occurred'
      },
      { status: 500 }
    )
  }
}