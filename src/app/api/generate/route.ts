import { NextRequest, NextResponse } from 'next/server'
import { generateLandingPageContent, type MarketingBrief } from '@/lib/anthropic'
import { mockLandingPageContent } from '@/lib/test-mocks'
import { validateApiKeys, getSecurityHeaders } from '@/lib/env'

export async function POST(request: NextRequest) {
  try {
    const apiValidation = validateApiKeys()
    
    // Validate API keys securely
    if (!apiValidation.hasValidAnthropicKey && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { 
          error: 'Service unavailable',
          details: 'AI service not configured. Please contact support.'
        },
        { status: 503 }
      )
    }

    const brief: MarketingBrief = await request.json()
    
    // Validate required fields
    if (!brief.businessName || !brief.industry || !brief.businessDescription) {
      return NextResponse.json(
        { error: 'Missing required fields: businessName, industry, businessDescription' },
        { status: 400 }
      )
    }

    // Validate field lengths
    if (brief.businessName.length > 100) {
      return NextResponse.json(
        { error: 'Business name must be less than 100 characters' },
        { status: 400 }
      )
    }

    if (brief.businessDescription.length > 1000) {
      return NextResponse.json(
        { error: 'Business description must be less than 1000 characters' },
        { status: 400 }
      )
    }

    // Generate content using Claude or return mock data for testing
    let content
    if (process.env.NODE_ENV === 'test' || !apiValidation.hasValidAnthropicKey) {
      // Return mock data for tests
      content = {
        ...mockLandingPageContent,
        heroSection: {
          ...mockLandingPageContent.heroSection,
          title: `Welcome to ${brief.businessName}`,
          subtitle: brief.businessDescription,
        },
        footer: {
          ...mockLandingPageContent.footer,
          companyName: brief.businessName
        }
      }
      
      // Add a small delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
    } else {
      content = await generateLandingPageContent(brief)
    }
    
    const response = NextResponse.json({
      success: true,
      content,
      brief
    })

    // Add security headers
    const securityHeaders = getSecurityHeaders()
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    return response
  } catch (error) {
    console.error('Error in generate API:', error)
    
    // Different error responses based on error type
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { 
            error: 'Authentication failed',
            details: 'Invalid API configuration. Please contact support.'
          },
          { status: 401 }
        )
      }
      
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { 
            error: 'Service temporarily unavailable',
            details: 'Too many requests. Please try again in a moment.'
          },
          { status: 429 }
        )
      }
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to generate landing page content',
        details: process.env.NODE_ENV === 'development' 
          ? (error instanceof Error ? error.message : 'Unknown error')
          : 'An unexpected error occurred. Please try again.'
      },
      { status: 500 }
    )
  }
}