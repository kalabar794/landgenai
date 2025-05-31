import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  const perPage = searchParams.get('per_page') || '12'
  const page = searchParams.get('page') || '1'

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    )
  }

  if (!process.env.PEXELS_API_KEY) {
    return NextResponse.json(
      { error: 'Pexels API key not configured' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`,
      {
        headers: {
          'Authorization': process.env.PEXELS_API_KEY,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching from Pexels:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch images from Pexels',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { queries } = await request.json()
    
    if (!Array.isArray(queries)) {
      return NextResponse.json(
        { error: 'Queries must be an array' },
        { status: 400 }
      )
    }

    if (!process.env.PEXELS_API_KEY) {
      return NextResponse.json(
        { error: 'Pexels API key not configured' },
        { status: 500 }
      )
    }

    // Fetch images for all queries in parallel
    const imagePromises = queries.map(async (query: string) => {
      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=6&page=1`,
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
        return {
          query,
          photos: data.photos || []
        }
      } catch (error) {
        console.error(`Error fetching images for query "${query}":`, error)
        return {
          query,
          photos: []
        }
      }
    })

    const results = await Promise.all(imagePromises)
    
    // Flatten all photos into a single array
    const allPhotos = results.flatMap(result => result.photos)
    
    return NextResponse.json({
      success: true,
      photos: allPhotos,
      queryResults: results
    })
  } catch (error) {
    console.error('Error in Pexels batch API:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch images',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}