'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface MarketingBrief {
  businessName: string
  website?: string
  industry: string
  businessDescription: string
  targetAudience?: string
  productServices?: string
  uniqueSellingPoints?: string
  campaignGoals?: string
  logoUrl?: string
}

export default function BriefForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<MarketingBrief>({
    businessName: '',
    website: '',
    industry: '',
    businessDescription: '',
    targetAudience: '',
    productServices: '',
    uniqueSellingPoints: '',
    campaignGoals: '',
    logoUrl: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.businessName || !formData.industry || !formData.businessDescription) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Store the brief in sessionStorage
      sessionStorage.setItem('marketingBrief', JSON.stringify(formData))
      
      toast.success('Brief saved successfully!')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Failed to save brief')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass rounded-3xl p-8 md:p-12 hover-lift">
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-warm rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-2xl">📝</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell Us About Your Business</h2>
          <p className="text-gray-600">The more details you provide, the better your AI-generated landing page will be</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="businessName" className="block text-sm font-semibold text-gray-900 mb-3">
                Business Name *
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 border-0 bg-white/60 backdrop-blur-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all placeholder-gray-500"
                placeholder="e.g., TechFlow Solutions"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="website" className="block text-sm font-semibold text-gray-900 mb-3">
                Website URL
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-4 border-0 bg-white/60 backdrop-blur-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all placeholder-gray-500"
                placeholder="https://your-website.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-semibold text-gray-900 mb-3">
              Industry *
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              className="w-full px-4 py-4 border-0 bg-white/60 backdrop-blur-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            >
              <option value="">Select your industry</option>
              <option value="technology">🚀 Technology</option>
              <option value="healthcare">🏥 Healthcare</option>
              <option value="finance">💰 Finance</option>
              <option value="education">📚 Education</option>
              <option value="retail">🛍️ Retail</option>
              <option value="real-estate">🏠 Real Estate</option>
              <option value="food-beverage">🍕 Food & Beverage</option>
              <option value="travel">✈️ Travel & Tourism</option>
              <option value="fitness">💪 Fitness & Wellness</option>
              <option value="other">📋 Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="businessDescription" className="block text-sm font-semibold text-gray-900 mb-3">
              Business Description *
            </label>
            <textarea
              id="businessDescription"
              name="businessDescription"
              value={formData.businessDescription}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-4 border-0 bg-white/60 backdrop-blur-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all placeholder-gray-500 resize-none"
              placeholder="Describe your business, what you do, and what makes you unique. Be specific about your value proposition."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="targetAudience" className="block text-sm font-semibold text-gray-900 mb-3">
                Target Audience
              </label>
              <textarea
                id="targetAudience"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-4 border-0 bg-white/60 backdrop-blur-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all placeholder-gray-500 resize-none"
                placeholder="Who are your ideal customers? Include demographics, interests, and pain points."
              />
            </div>

            <div>
              <label htmlFor="productServices" className="block text-sm font-semibold text-gray-900 mb-3">
                Products/Services
              </label>
              <textarea
                id="productServices"
                name="productServices"
                value={formData.productServices}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-4 border-0 bg-white/60 backdrop-blur-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all placeholder-gray-500 resize-none"
                placeholder="List your main products or services with key benefits."
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="uniqueSellingPoints" className="block text-sm font-semibold text-gray-900 mb-3">
                Unique Selling Points
              </label>
              <textarea
                id="uniqueSellingPoints"
                name="uniqueSellingPoints"
                value={formData.uniqueSellingPoints}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-4 border-0 bg-white/60 backdrop-blur-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all placeholder-gray-500 resize-none"
                placeholder="What sets you apart from competitors? What makes you unique?"
              />
            </div>

            <div>
              <label htmlFor="campaignGoals" className="block text-sm font-semibold text-gray-900 mb-3">
                Campaign Goals
              </label>
              <textarea
                id="campaignGoals"
                name="campaignGoals"
                value={formData.campaignGoals}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-4 border-0 bg-white/60 backdrop-blur-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all placeholder-gray-500 resize-none"
                placeholder="What do you want to achieve? Leads, sales, sign-ups, awareness?"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full gradient-warm text-white py-5 px-8 rounded-2xl hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-lg hover-lift"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Your Landing Page...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  🚀 Generate My Landing Page
                </span>
              )}
            </button>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">⚡ Takes 2 minutes</span> • 
              <span className="font-semibold"> 🎨 Professional design</span> • 
              <span className="font-semibold"> 📈 Conversion optimized</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}