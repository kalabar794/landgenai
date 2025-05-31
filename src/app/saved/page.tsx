'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorBoundary from '@/components/ErrorBoundary'
import type { SavedLandingPage } from '@/lib/database'

export default function SavedLandingPages() {
  const [landingPages, setLandingPages] = useState<SavedLandingPage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchLandingPages()
  }, [])

  const fetchLandingPages = async (query?: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const url = query 
        ? `/api/landing-pages?q=${encodeURIComponent(query)}`
        : '/api/landing-pages'
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success) {
        setLandingPages(data.landingPages)
      } else {
        throw new Error(data.error || 'Failed to fetch landing pages')
      }
    } catch (error) {
      console.error('Error fetching landing pages:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch landing pages')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchLandingPages(searchQuery)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getIndustryColor = (industry: string) => {
    const colors: Record<string, string> = {
      technology: 'bg-blue-100 text-blue-800',
      healthcare: 'bg-green-100 text-green-800',
      finance: 'bg-yellow-100 text-yellow-800',
      education: 'bg-purple-100 text-purple-800',
      retail: 'bg-pink-100 text-pink-800',
      'real-estate': 'bg-indigo-100 text-indigo-800',
      'food-beverage': 'bg-red-100 text-red-800',
      travel: 'bg-cyan-100 text-cyan-800',
      fitness: 'bg-orange-100 text-orange-800'
    }
    return colors[industry] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
        message="Loading saved landing pages..."
      />
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6 transition-colors"
            >
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Saved Landing Pages
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse and manage your AI-generated landing pages
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by business name..."
                className="flex-1 px-4 py-3 border-0 bg-white/60 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all placeholder-gray-500"
              />
              <button
                type="submit"
                className="px-6 py-3 gradient-warm text-white rounded-xl hover:opacity-90 transition-opacity font-medium"
              >
                Search
              </button>
            </form>
          </div>

          {/* Error State */}
          {error && (
            <div className="max-w-md mx-auto mb-8 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
              <p className="font-medium">Error loading landing pages</p>
              <p className="text-sm">{error}</p>
              <button
                onClick={() => fetchLandingPages()}
                className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Landing Pages Grid */}
          {landingPages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 text-2xl">📄</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                No landing pages found
              </h2>
              <p className="text-gray-600 mb-6">
                {searchQuery ? 'Try a different search term' : 'Create your first landing page to see it here'}
              </p>
              {!searchQuery && (
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 gradient-warm text-white rounded-xl hover:opacity-90 transition-opacity font-medium"
                >
                  Create Landing Page
                </Link>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {landingPages.map((page) => (
                <div key={page.id} className="glass rounded-2xl p-6 hover-lift">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getIndustryColor(page.industry)}`}>
                      {page.industry}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(page.createdAt)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {page.businessName}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {page.brief.businessDescription}
                  </p>
                  
                  <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg p-3 mb-4">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                      {page.content.heroSection.title}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {page.content.heroSection.subtitle}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{page.content.features.length} features</span>
                      <span>•</span>
                      <span>{page.content.testimonials.length} testimonials</span>
                    </div>
                    
                    <Link
                      href={`/view/${page.id}`}
                      className="px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors font-medium"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Create New CTA */}
          {landingPages.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 gradient-warm text-white rounded-2xl hover:opacity-90 transition-all font-semibold hover-lift"
              >
                ✨ Create Another Landing Page
              </Link>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  )
}