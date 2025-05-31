'use client'

import { useState } from 'react'
import Link from 'next/link'
import BriefForm from '@/components/forms/BriefForm'
import PreviewShowcase from '@/components/PreviewShowcase'

const ExampleCard = ({ title, description, industry, image }: {
  title: string
  description: string
  industry: string
  image: string
}) => (
  <div className="glass rounded-2xl p-6 hover-lift cursor-pointer">
    <div className="w-full h-48 bg-gradient-warm-soft rounded-xl mb-4 flex items-center justify-center">
      <span className="text-gray-500 text-sm">{image}</span>
    </div>
    <div className="flex items-center gap-2 mb-2">
      <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">
        {industry}
      </span>
    </div>
    <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
)

export default function Home() {
  const [showForm, setShowForm] = useState(false)

  const examples = [
    {
      title: "TechFlow Solutions",
      description: "AI-powered SaaS platform for workflow automation",
      industry: "Technology",
      image: "🚀 SaaS Dashboard Preview"
    },
    {
      title: "EcoGreen Wellness",
      description: "Sustainable health products and eco-friendly lifestyle",
      industry: "Health & Wellness",
      image: "🌱 Wellness Brand Preview"
    },
    {
      title: "FinanceForward",
      description: "Modern financial planning and investment services",
      industry: "Finance",
      image: "💰 Finance App Preview"
    },
    {
      title: "CreativeStudio Pro",
      description: "Design agency specializing in brand identity",
      industry: "Creative",
      image: "🎨 Design Portfolio Preview"
    },
    {
      title: "FoodieDelight",
      description: "Gourmet meal delivery and cooking experiences",
      industry: "Food & Beverage",
      image: "🍕 Food Delivery Preview"
    },
    {
      title: "FitnessPro Elite",
      description: "Personal training and fitness coaching platform",
      industry: "Fitness",
      image: "💪 Fitness App Preview"
    }
  ]

  if (showForm) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <button 
              onClick={() => setShowForm(false)}
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6 transition-colors"
            >
              ← Back to Examples
            </button>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Create Your Landing Page
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tell us about your business and watch AI create a stunning, high-converting landing page
            </p>
          </div>
          <BriefForm />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 gradient-warm rounded-full opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 gradient-warm rounded-full opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-warm rounded-lg"></div>
            <span className="font-bold text-gray-900 text-xl">LandingAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/saved"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Saved Pages
            </Link>
            <button 
              onClick={() => setShowForm(true)}
              className="px-6 py-2 gradient-warm text-white rounded-full hover:opacity-90 transition-opacity font-medium"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">AI-Powered • Lightning Fast • No Coding Required</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Beautiful Landing Pages
            <br />
            <span className="gradient-text">Built by AI</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Transform your business ideas into stunning, high-converting landing pages in minutes. 
            Our AI analyzes your business and creates professional designs with compelling copy and perfect images.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={() => setShowForm(true)}
              className="px-8 py-4 gradient-warm text-white rounded-2xl hover:opacity-90 transition-all font-semibold text-lg hover-lift"
            >
              Create Your Landing Page →
            </button>
            <button className="px-8 py-4 glass rounded-2xl hover:bg-white/40 transition-all font-medium">
              View Examples ↓
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">300%</div>
              <div className="text-gray-600 text-sm">Higher Conversion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">2 Min</div>
              <div className="text-gray-600 text-sm">Average Generation Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">10K+</div>
              <div className="text-gray-600 text-sm">Landing Pages Created</div>
            </div>
          </div>
        </div>

        {/* Interactive Preview Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See What AI Can Create For You
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every landing page is unique, professional, and optimized for conversions. 
              Click through these real examples to see the quality.
            </p>
          </div>

          <PreviewShowcase />

          <div className="text-center mt-12">
            <button 
              onClick={() => setShowForm(true)}
              className="px-8 py-4 gradient-warm text-white rounded-2xl hover:opacity-90 transition-all font-semibold hover-lift"
            >
              Create Your Own Landing Page
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center glass rounded-2xl p-8 hover-lift">
            <div className="w-16 h-16 gradient-warm rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl">🧠</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Copy</h3>
            <p className="text-gray-600">Claude AI creates compelling, conversion-focused copy tailored to your business and audience.</p>
          </div>

          <div className="text-center glass rounded-2xl p-8 hover-lift">
            <div className="w-16 h-16 gradient-warm rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Design</h3>
            <p className="text-gray-600">Automatically curated images and professional layouts that match your industry and brand.</p>
          </div>

          <div className="text-center glass rounded-2xl p-8 hover-lift">
            <div className="w-16 h-16 gradient-warm rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
            <p className="text-gray-600">From business brief to complete landing page in under 2 minutes. No coding or design skills needed.</p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center glass rounded-2xl p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Trusted by Growing Businesses</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-3">"Incredible results! Our conversion rate increased by 250% with the AI-generated landing page."</p>
              <div className="font-semibold text-gray-900">Sarah Chen</div>
              <div className="text-gray-500 text-sm">Founder, TechStartup</div>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-3">"The AI understood our business perfectly. The copy and design were spot-on from the first try."</p>
              <div className="font-semibold text-gray-900">Mike Rodriguez</div>
              <div className="text-gray-500 text-sm">Marketing Director, GrowthCo</div>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-3">"Saved us weeks of work and thousands in design costs. The quality is amazing!"</p>
              <div className="font-semibold text-gray-900">Emma Thompson</div>
              <div className="text-gray-500 text-sm">CEO, DigitalAgency</div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Create Your Landing Page?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses using AI to create high-converting landing pages
          </p>
          <button 
            onClick={() => setShowForm(true)}
            className="px-12 py-5 gradient-warm text-white rounded-2xl hover:opacity-90 transition-all font-bold text-xl hover-lift"
          >
            Get Started Free - 2 Minutes ⏱️
          </button>
        </div>
      </div>
    </main>
  )
}