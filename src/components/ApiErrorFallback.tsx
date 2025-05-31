'use client'

interface ApiErrorFallbackProps {
  error?: string
  onRetry?: () => void
  title?: string
  description?: string
}

const ApiErrorFallback = ({ 
  error = 'API request failed',
  onRetry,
  title = 'Service Unavailable',
  description = 'We are experiencing technical difficulties. Please try again in a moment.'
}: ApiErrorFallbackProps) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-orange-600 text-2xl">⚡</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          {title}
        </h2>
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 gradient-warm text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Try Again
          </button>
        )}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-500">
              Error Details
            </summary>
            <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
              {error}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}

export default ApiErrorFallback