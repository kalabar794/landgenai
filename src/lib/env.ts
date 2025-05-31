// Environment variable validation and security utilities

interface EnvironmentConfig {
  anthropicApiKey: string | null
  pexelsApiKey: string | null
  nodeEnv: string
  isProduction: boolean
  isTest: boolean
  isDevelopment: boolean
  isVercel: boolean
}

// Validate and sanitize environment variables
export const getEnvironmentConfig = (): EnvironmentConfig => {
  const nodeEnv = process.env.NODE_ENV || 'development'
  
  return {
    anthropicApiKey: process.env.ANTHROPIC_API_KEY || null,
    pexelsApiKey: process.env.PEXELS_API_KEY || null,
    nodeEnv,
    isProduction: nodeEnv === 'production',
    isTest: nodeEnv === 'test',
    isDevelopment: nodeEnv === 'development',
    isVercel: Boolean(process.env.VERCEL),
  }
}

// Check if API keys are properly configured
export const validateApiKeys = (): {
  hasValidAnthropicKey: boolean
  hasValidPexelsKey: boolean
  isFullyConfigured: boolean
} => {
  const config = getEnvironmentConfig()
  
  const hasValidAnthropicKey = Boolean(
    config.anthropicApiKey && 
    config.anthropicApiKey.startsWith('sk-ant-api03-') &&
    config.anthropicApiKey.length > 50
  )
  
  const hasValidPexelsKey = Boolean(
    config.pexelsApiKey && 
    config.pexelsApiKey.length > 20 &&
    !config.pexelsApiKey.includes('test')
  )
  
  return {
    hasValidAnthropicKey,
    hasValidPexelsKey,
    isFullyConfigured: hasValidAnthropicKey && hasValidPexelsKey
  }
}

// Mask sensitive values for logging
export const maskApiKey = (key: string | null): string => {
  if (!key) return 'NOT_SET'
  if (key.includes('test') || key.includes('dummy')) return 'TEST_KEY'
  
  const start = key.substring(0, 8)
  const end = key.substring(key.length - 4)
  const masked = '*'.repeat(Math.max(0, key.length - 12))
  
  return `${start}${masked}${end}`
}

// Security headers for API responses
export const getSecurityHeaders = () => ({
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
})

// Rate limiting configuration
export const getRateLimitConfig = () => {
  const config = getEnvironmentConfig()
  
  return {
    // More lenient in development, stricter in production
    windowMs: config.isProduction ? 15 * 60 * 1000 : 5 * 60 * 1000, // 15 min prod, 5 min dev
    maxRequests: config.isProduction ? 10 : 50, // 10 requests per window in prod
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
  }
}