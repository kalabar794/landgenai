'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import OptimizedImage from '@/components/OptimizedImage'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorBoundary from '@/components/ErrorBoundary'
import type { SavedLandingPage } from '@/lib/database'

interface ViewLandingPageProps {
  params: Promise<{ id: string }>
}

export default function ViewLandingPage({ params }: ViewLandingPageProps) {
  const router = useRouter()
  const [landingPage, setLandingPage] = useState<SavedLandingPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params
      fetchLandingPage(resolvedParams.id)
    }
    loadParams()
  }, [])

  const fetchLandingPage = async (id?: string) => {
    try {
      setLoading(true)
      setError(null)
      
      if (!id) {
        const resolvedParams = await params
        id = resolvedParams.id
      }
      
      const response = await fetch(`/api/landing-pages/${id}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Landing page not found')
        }
        throw new Error(`Failed to fetch: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success) {
        setLandingPage(data.landingPage)
      } else {
        throw new Error(data.error || 'Failed to fetch landing page')
      }
    } catch (error) {
      console.error('Error fetching landing page:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch landing page')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
        message="Loading landing page..."
      />
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-red-600 text-2xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error.includes('not found') ? 'Page Not Found' : 'Error Loading Page'}
          </h1>
          <p className="text-gray-600 mb-6">
            {error}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => fetchLandingPage()}
              className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Try Again
            </button>
            <Link
              href="/saved"
              className="block w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              Back to Saved Pages
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!landingPage) {
    return null
  }

  const { content, images, brief } = landingPage

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        {/* Preview Controls */}
        <div className="bg-gray-900 text-white p-4 sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">Viewing: {brief.businessName}</h1>
              <p className="text-gray-300 text-sm">
                Created: {new Date(landingPage.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/saved"
                className="px-4 py-2 border border-gray-600 text-white rounded hover:bg-gray-800 transition-colors"
              >
                ← Back to Saved
              </Link>
              <Link
                href="/"
                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
              >
                Create New
              </Link>
            </div>
          </div>
        </div>

        {/* Generated Landing Page */}
        <div className="landing-page bg-white">
          {/* Hero Section */}
          <section className="relative gradient-warm text-white py-24 md:py-32 overflow-hidden">
            {images.hero[0] && (
              <div className="absolute inset-0">
                <OptimizedImage
                  src={images.hero[0].src.large}
                  alt={images.hero[0].alt}
                  width={1920}
                  height={800}
                  priority
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 via-red-500/90 to-pink-600/90"></div>
              </div>
            )}
            <div className="absolute inset-0 bg-black/20"></div>
            
            <div className="relative container mx-auto px-4 text-center">
              <div className="animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  {content.heroSection.title}
                </h1>
                <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed opacity-95">
                  {content.heroSection.subtitle}
                </p>
                <button className="bg-white text-gray-900 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl">
                  {content.heroSection.ctaText} →
                </button>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
            <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          </section>

          {/* Features Section */}
          <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-20 animate-fade-in-up">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Why Choose {brief.businessName}?
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {content.subheadline}
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                {content.features.map((feature, index) => (
                  <div key={index} className="group text-center hover-lift">
                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 h-full">
                      {images.features[index] && (
                        <div className="w-full h-56 mb-6 overflow-hidden rounded-xl">
                          <OptimizedImage
                            src={images.features[index].src.medium}
                            alt={images.features[index].alt}
                            width={400}
                            height={224}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="w-16 h-16 gradient-warm rounded-2xl mx-auto mb-6 flex items-center justify-center">
                        <span className="text-white text-2xl">✨</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="animate-fade-in-up">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                    {content.aboutSection.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {content.aboutSection.content}
                  </p>
                  <button className="gradient-warm text-white px-8 py-4 rounded-2xl hover:opacity-90 transition-all font-semibold text-lg hover-lift">
                    Learn More →
                  </button>
                </div>
                
                {images.about[0] && (
                  <div className="relative">
                    <div className="absolute -inset-4 gradient-warm rounded-2xl opacity-20 animate-float"></div>
                    <OptimizedImage
                      src={images.about[0].src.large}
                      alt={images.about[0].alt}
                      width={600}
                      height={500}
                      className="relative w-full h-96 md:h-[500px] object-cover rounded-2xl shadow-2xl"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-20 animate-fade-in-up">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  What Our Clients Say
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Don't just take our word for it - hear from our satisfied customers
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {content.testimonials.map((testimonial, index) => (
                  <div key={index} className="glass rounded-2xl p-8 hover-lift">
                    <div className="flex mb-4 justify-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">★</span>
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 text-center leading-relaxed font-medium">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center justify-center">
                      {images.testimonials[index] && (
                        <OptimizedImage
                          src={images.testimonials[index].src.small}
                          alt={testimonial.name}
                          width={56}
                          height={56}
                          className="w-14 h-14 rounded-full object-cover mr-4 ring-4 ring-white shadow-lg"
                        />
                      )}
                      <div className="text-center">
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          {content.ctaSections.map((cta, index) => (
            <section key={index} className="py-24 gradient-warm text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative container mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  {cta.title}
                </h2>
                <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed opacity-95">
                  {cta.subtitle}
                </p>
                <button className="bg-white text-gray-900 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl">
                  {cta.buttonText} →
                </button>
              </div>
            </section>
          ))}

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <div className="w-12 h-12 gradient-warm rounded-xl mx-auto mb-6"></div>
              <h3 className="text-3xl font-bold mb-3">{content.footer.companyName}</h3>
              <p className="text-gray-400 text-lg">{content.footer.tagline}</p>
            </div>
          </footer>
        </div>
      </div>
    </ErrorBoundary>
  )
}