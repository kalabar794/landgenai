'use client'

import { useState } from 'react'
import { previewExamples, PreviewExample } from '@/data/previewExamples'

interface PreviewShowcaseProps {
  selectedExample?: string
}

const PreviewCard = ({ example, isSelected, onClick }: {
  example: PreviewExample
  isSelected: boolean
  onClick: () => void
}) => (
  <div 
    className={`cursor-pointer transition-all duration-300 ${
      isSelected ? 'scale-105 ring-4 ring-orange-400' : 'hover:scale-102'
    }`}
    onClick={onClick}
  >
    <div className="glass rounded-2xl p-6 hover-lift">
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: example.colors.primary }}
        ></div>
        <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">
          {example.industry}
        </span>
      </div>
      
      <h3 className="font-bold text-gray-900 mb-2">{example.businessName}</h3>
      <p className="text-gray-600 text-sm mb-4">{example.description}</p>
      
      <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 overflow-hidden">
        <div 
          className="h-full w-full opacity-80"
          style={{ 
            background: `linear-gradient(135deg, ${example.colors.primary}, ${example.colors.secondary})` 
          }}
        >
          <div className="p-4 text-white">
            <div className="text-xs font-bold mb-1">{example.landingPage.hero.headline}</div>
            <div className="text-xs opacity-90 line-clamp-2">{example.landingPage.hero.subheadline}</div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex -space-x-1">
          {example.landingPage.testimonials.slice(0, 3).map((testimonial, idx) => (
            <img
              key={idx}
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>
        <span className="text-xs text-gray-500">Click to preview</span>
      </div>
    </div>
  </div>
)

const LandingPagePreview = ({ example }: { example: PreviewExample }) => (
  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
    {/* Preview Header */}
    <div className="bg-gray-900 text-white p-4 flex items-center gap-3">
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <div className="text-sm text-gray-300">{example.website}</div>
    </div>

    {/* Landing Page Content */}
    <div className="max-h-[600px] overflow-y-auto">
      {/* Hero Section */}
      <section 
        className="relative text-white py-16 px-6"
        style={{ 
          background: `linear-gradient(135deg, ${example.colors.primary}, ${example.colors.secondary})` 
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {example.landingPage.hero.headline}
          </h1>
          <p className="text-lg mb-8 opacity-95 max-w-2xl mx-auto">
            {example.landingPage.hero.subheadline}
          </p>
          <button 
            className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            style={{ color: example.colors.primary }}
          >
            {example.landingPage.hero.ctaText} →
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose {example.businessName}?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {example.landingPage.features.map((feature, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              {example.landingPage.about.title}
            </h2>
            <p className="text-gray-600 mb-8">{example.landingPage.about.content}</p>
            <button 
              className="px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: example.colors.primary }}
            >
              Learn More →
            </button>
          </div>
          <div 
            className="h-64 bg-gradient-to-br rounded-xl"
            style={{ 
              background: `linear-gradient(135deg, ${example.colors.primary}20, ${example.colors.secondary}20)` 
            }}
          ></div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {example.landingPage.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-16 px-6 text-white"
        style={{ 
          background: `linear-gradient(135deg, ${example.colors.primary}, ${example.colors.secondary})` 
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {example.landingPage.cta.title}
          </h2>
          <p className="text-lg mb-8 opacity-95">
            {example.landingPage.cta.subtitle}
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
            {example.landingPage.cta.buttonText} →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-2">{example.businessName}</h3>
          <p className="text-gray-400">Professional landing page by AI</p>
        </div>
      </footer>
    </div>
  </div>
)

export default function PreviewShowcase({ selectedExample }: PreviewShowcaseProps) {
  const [activeExample, setActiveExample] = useState<string>(
    selectedExample || previewExamples[0].id
  )

  const currentExample = previewExamples.find(ex => ex.id === activeExample) || previewExamples[0]

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Example Cards */}
      <div className="lg:col-span-1">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Choose an Example</h3>
        <div className="space-y-4">
          {previewExamples.map((example) => (
            <PreviewCard
              key={example.id}
              example={example}
              isSelected={activeExample === example.id}
              onClick={() => setActiveExample(example.id)}
            />
          ))}
        </div>
      </div>

      {/* Preview Display */}
      <div className="lg:col-span-3">
        <div className="sticky top-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Live Preview</h3>
          <LandingPagePreview example={currentExample} />
        </div>
      </div>
    </div>
  )
}