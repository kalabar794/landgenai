import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export interface MarketingBrief {
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

export interface LandingPageContent {
  headline: string
  subheadline: string
  heroSection: {
    title: string
    subtitle: string
    ctaText: string
  }
  features: Array<{
    title: string
    description: string
    icon?: string
  }>
  aboutSection: {
    title: string
    content: string
  }
  testimonials: Array<{
    name: string
    role: string
    content: string
    rating: number
  }>
  ctaSections: Array<{
    title: string
    subtitle: string
    buttonText: string
  }>
  footer: {
    companyName: string
    tagline: string
  }
}

export async function generateLandingPageContent(brief: MarketingBrief): Promise<LandingPageContent> {
  const prompt = `You are an expert marketing copywriter. Create compelling landing page content based on this business brief.

Business Information:
- Name: ${brief.businessName}
- Industry: ${brief.industry}
- Description: ${brief.businessDescription}
${brief.website ? `- Website: ${brief.website}` : ''}
${brief.targetAudience ? `- Target Audience: ${brief.targetAudience}` : ''}
${brief.productServices ? `- Products/Services: ${brief.productServices}` : ''}
${brief.uniqueSellingPoints ? `- Unique Selling Points: ${brief.uniqueSellingPoints}` : ''}
${brief.campaignGoals ? `- Campaign Goals: ${brief.campaignGoals}` : ''}

Create a complete landing page content structure. The content should be:
- Compelling and conversion-focused
- Industry-appropriate
- Audience-specific
- Professional yet engaging
- Include 3-4 key features
- Include 2-3 testimonials with realistic names and roles
- Include multiple CTA sections

Return ONLY a valid JSON object with this exact structure:
{
  "headline": "Main compelling headline",
  "subheadline": "Supporting subheadline",
  "heroSection": {
    "title": "Hero section title",
    "subtitle": "Hero section subtitle", 
    "ctaText": "Call to action button text"
  },
  "features": [
    {
      "title": "Feature title",
      "description": "Feature description",
      "icon": "icon-name"
    }
  ],
  "aboutSection": {
    "title": "About section title",
    "content": "About section content paragraph"
  },
  "testimonials": [
    {
      "name": "Customer name",
      "role": "Job title at Company",
      "content": "Testimonial content",
      "rating": 5
    }
  ],
  "ctaSections": [
    {
      "title": "CTA section title",
      "subtitle": "CTA section subtitle",
      "buttonText": "Button text"
    }
  ],
  "footer": {
    "companyName": "${brief.businessName}",
    "tagline": "Company tagline"
  }
}`

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    const parsedContent = JSON.parse(content.text)
    return parsedContent as LandingPageContent
  } catch (error) {
    console.error('Error generating content with Claude:', error)
    
    // Fallback content
    return {
      headline: `Transform Your Business with ${brief.businessName}`,
      subheadline: `Professional ${brief.industry} solutions that deliver results`,
      heroSection: {
        title: `Welcome to ${brief.businessName}`,
        subtitle: brief.businessDescription,
        ctaText: 'Get Started Today'
      },
      features: [
        {
          title: 'Professional Service',
          description: 'Expert solutions tailored to your needs',
          icon: 'star'
        },
        {
          title: 'Proven Results',
          description: 'Track record of success and satisfied customers',
          icon: 'chart'
        },
        {
          title: 'Quality Guarantee',
          description: 'We stand behind our work with confidence',
          icon: 'shield'
        }
      ],
      aboutSection: {
        title: `About ${brief.businessName}`,
        content: brief.businessDescription || 'We are dedicated to providing exceptional service and results for our clients.'
      },
      testimonials: [
        {
          name: 'Sarah Johnson',
          role: 'Business Owner',
          content: 'Outstanding service and results. Highly recommended!',
          rating: 5
        },
        {
          name: 'Mike Chen',
          role: 'Marketing Director',
          content: 'Professional, reliable, and delivers on promises.',
          rating: 5
        }
      ],
      ctaSections: [
        {
          title: 'Ready to Get Started?',
          subtitle: 'Contact us today for a free consultation',
          buttonText: 'Contact Us Now'
        }
      ],
      footer: {
        companyName: brief.businessName,
        tagline: `Your trusted ${brief.industry} partner`
      }
    }
  }
}