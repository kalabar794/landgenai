'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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

export default function Dashboard() {
  const router = useRouter()
  const [brief, setBrief] = useState<MarketingBrief | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedBrief = sessionStorage.getItem('marketingBrief')
    if (savedBrief) {
      setBrief(JSON.parse(savedBrief))
    } else {
      router.push('/')
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!brief) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Marketing Brief Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Review your brief and generate your landing page
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Brief</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Business Name</h3>
                <p className="text-gray-900">{brief.businessName}</p>
              </div>
              
              {brief.website && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Website</h3>
                  <p className="text-gray-900">{brief.website}</p>
                </div>
              )}
              
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Industry</h3>
                <p className="text-gray-900 capitalize">{brief.industry}</p>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="font-semibold text-gray-700 mb-2">Business Description</h3>
                <p className="text-gray-900">{brief.businessDescription}</p>
              </div>
              
              {brief.targetAudience && (
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-gray-700 mb-2">Target Audience</h3>
                  <p className="text-gray-900">{brief.targetAudience}</p>
                </div>
              )}
              
              {brief.productServices && (
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-gray-700 mb-2">Products/Services</h3>
                  <p className="text-gray-900">{brief.productServices}</p>
                </div>
              )}
              
              {brief.uniqueSellingPoints && (
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-gray-700 mb-2">Unique Selling Points</h3>
                  <p className="text-gray-900">{brief.uniqueSellingPoints}</p>
                </div>
              )}
              
              {brief.campaignGoals && (
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-gray-700 mb-2">Campaign Goals</h3>
                  <p className="text-gray-900">{brief.campaignGoals}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Link
              href="/"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Edit Brief
            </Link>
            <Link
              href="/preview"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Generate Landing Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}