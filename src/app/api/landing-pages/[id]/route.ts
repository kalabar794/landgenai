import { NextRequest, NextResponse } from 'next/server'
import { 
  getLandingPageById, 
  updateLandingPage, 
  deleteLandingPage,
  initTables 
} from '@/lib/database'
import type { LandingPageContent } from '@/lib/anthropic'
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

// GET /api/landing-pages/[id] - Get specific landing page
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureTablesInitialized()
    
    const { id } = await params
    
    if (!id) {
      return NextResponse.json(
        { error: 'Landing page ID is required' },
        { status: 400 }
      )
    }

    const landingPage = await getLandingPageById(id)

    if (!landingPage) {
      return NextResponse.json(
        { error: 'Landing page not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      landingPage
    })
  } catch (error) {
    console.error('Error in landing-page GET API:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch landing page',
        details: process.env.NODE_ENV === 'development' 
          ? (error instanceof Error ? error.message : 'Unknown error')
          : 'Database error occurred'
      },
      { status: 500 }
    )
  }
}

// PUT /api/landing-pages/[id] - Update landing page
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureTablesInitialized()
    
    const { id } = await params
    
    if (!id) {
      return NextResponse.json(
        { error: 'Landing page ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { content, images }: {
      content: LandingPageContent
      images: CategorizedImages
    } = body

    // Validate required fields
    if (!content || !images) {
      return NextResponse.json(
        { error: 'Missing required fields: content, images' },
        { status: 400 }
      )
    }

    const updatedLandingPage = await updateLandingPage(id, content, images)

    if (!updatedLandingPage) {
      return NextResponse.json(
        { error: 'Landing page not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      landingPage: updatedLandingPage
    })
  } catch (error) {
    console.error('Error in landing-page PUT API:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to update landing page',
        details: process.env.NODE_ENV === 'development' 
          ? (error instanceof Error ? error.message : 'Unknown error')
          : 'Database error occurred'
      },
      { status: 500 }
    )
  }
}

// DELETE /api/landing-pages/[id] - Delete landing page
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureTablesInitialized()
    
    const { id } = await params
    
    if (!id) {
      return NextResponse.json(
        { error: 'Landing page ID is required' },
        { status: 400 }
      )
    }

    const deleted = await deleteLandingPage(id)

    if (!deleted) {
      return NextResponse.json(
        { error: 'Landing page not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Landing page deleted successfully'
    })
  } catch (error) {
    console.error('Error in landing-page DELETE API:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to delete landing page',
        details: process.env.NODE_ENV === 'development' 
          ? (error instanceof Error ? error.message : 'Unknown error')
          : 'Database error occurred'
      },
      { status: 500 }
    )
  }
}