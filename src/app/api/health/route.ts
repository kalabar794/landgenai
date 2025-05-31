import { NextResponse } from 'next/server'
import { getEnvironmentConfig, validateApiKeys, maskApiKey, getSecurityHeaders } from '@/lib/env'

export async function GET() {
  try {
    const config = getEnvironmentConfig()
    const apiValidation = validateApiKeys()
    
    const response = NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: config.nodeEnv,
      platform: {
        vercel: config.isVercel,
        production: config.isProduction,
      },
      services: {
        anthropic: {
          configured: apiValidation.hasValidAnthropicKey,
          keyMask: maskApiKey(config.anthropicApiKey),
        },
        pexels: {
          configured: apiValidation.hasValidPexelsKey,
          keyMask: maskApiKey(config.pexelsApiKey),
        },
        database: {
          type: config.isProduction ? 'in-memory' : 'sqlite',
          status: 'available',
        }
      },
      security: {
        allServicesConfigured: apiValidation.isFullyConfigured,
        readyForProduction: apiValidation.isFullyConfigured && config.isProduction,
      }
    })

    // Add security headers
    const securityHeaders = getSecurityHeaders()
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        timestamp: new Date().toISOString(),
        error: process.env.NODE_ENV === 'development' 
          ? (error instanceof Error ? error.message : 'Unknown error')
          : 'Internal server error'
      },
      { status: 500 }
    )
  }
}