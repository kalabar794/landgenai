export interface PreviewExample {
  id: string
  title: string
  industry: string
  description: string
  businessName: string
  website: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  landingPage: {
    hero: {
      headline: string
      subheadline: string
      ctaText: string
      backgroundImage: string
    }
    features: Array<{
      title: string
      description: string
      icon: string
    }>
    about: {
      title: string
      content: string
    }
    testimonials: Array<{
      name: string
      role: string
      content: string
      rating: number
      avatar: string
    }>
    cta: {
      title: string
      subtitle: string
      buttonText: string
    }
  }
}

export const previewExamples: PreviewExample[] = [
  {
    id: "techflow-saas",
    title: "TechFlow Solutions",
    industry: "Technology",
    description: "AI-powered SaaS platform for workflow automation",
    businessName: "TechFlow Solutions",
    website: "https://techflow.ai",
    colors: {
      primary: "#4F46E5",
      secondary: "#7C3AED", 
      accent: "#06B6D4"
    },
    landingPage: {
      hero: {
        headline: "Automate Your Workflow, Amplify Your Results",
        subheadline: "TechFlow's AI-powered automation platform helps teams eliminate repetitive tasks and focus on what matters most. Increase productivity by 300% with intelligent workflow optimization.",
        ctaText: "Start Free 14-Day Trial",
        backgroundImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
      },
      features: [
        {
          title: "Smart Automation",
          description: "AI learns your processes and automatically optimizes workflows to save hours of manual work every day.",
          icon: "🤖"
        },
        {
          title: "Real-time Analytics",
          description: "Get instant insights into team performance with beautiful dashboards and actionable metrics.",
          icon: "📊"
        },
        {
          title: "Seamless Integration",
          description: "Connect with 100+ tools including Slack, Salesforce, and Google Workspace in just one click.",
          icon: "🔗"
        }
      ],
      about: {
        title: "Built for Modern Teams",
        content: "TechFlow was created by engineers who understood the pain of repetitive work. Our AI-first approach to workflow automation has helped over 10,000 teams reclaim their time and achieve breakthrough productivity. From startups to Fortune 500 companies, teams trust TechFlow to power their most critical processes."
      },
      testimonials: [
        {
          name: "Sarah Chen",
          role: "VP of Operations, InnovateCorp",
          content: "TechFlow reduced our manual processing time by 80%. The AI suggestions are incredibly accurate and our team loves the intuitive interface.",
          rating: 5,
          avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
        },
        {
          name: "Marcus Rodriguez",
          role: "CTO, DataScale",
          content: "Implementation was seamless and ROI was immediate. TechFlow has become essential to our operations.",
          rating: 5,
          avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
        }
      ],
      cta: {
        title: "Ready to Transform Your Workflow?",
        subtitle: "Join 10,000+ teams using TechFlow to automate success",
        buttonText: "Start Your Free Trial"
      }
    }
  },
  {
    id: "ecogreen-wellness",
    title: "EcoGreen Wellness",
    industry: "Health & Wellness",
    description: "Sustainable health products and eco-friendly lifestyle",
    businessName: "EcoGreen Wellness",
    website: "https://ecogreenwellness.com",
    colors: {
      primary: "#059669",
      secondary: "#10B981",
      accent: "#84CC16"
    },
    landingPage: {
      hero: {
        headline: "Pure Wellness, Planet-Friendly Promise",
        subheadline: "Discover organic supplements, eco-friendly beauty products, and sustainable wellness solutions that nourish your body while protecting our planet. 100% natural, zero compromise.",
        ctaText: "Shop Sustainable Wellness",
        backgroundImage: "https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg"
      },
      features: [
        {
          title: "100% Organic Certified",
          description: "Every product is USDA organic certified, ensuring pure, chemical-free wellness for you and your family.",
          icon: "🌱"
        },
        {
          title: "Carbon Neutral Shipping",
          description: "All orders ship carbon-neutral with biodegradable packaging. Good for you, great for the planet.",
          icon: "📦"
        },
        {
          title: "Third-Party Tested",
          description: "Independent lab testing guarantees purity, potency, and safety in every bottle we ship.",
          icon: "🧪"
        }
      ],
      about: {
        title: "Wellness That Doesn't Cost the Earth",
        content: "Founded by nutritionists and environmental scientists, EcoGreen Wellness bridges the gap between personal health and planetary health. Our products are sourced from regenerative farms, packaged in compostable materials, and formulated with the highest standards of purity. We believe true wellness includes caring for the world we live in."
      },
      testimonials: [
        {
          name: "Jennifer Martinez",
          role: "Yoga Instructor",
          content: "The quality is outstanding and I love that every purchase supports sustainable farming. My clients notice the difference!",
          rating: 5,
          avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
        },
        {
          name: "David Kim",
          role: "Wellness Coach",
          content: "Finally, supplements I can recommend with complete confidence. The transparency and eco-commitment are unmatched.",
          rating: 5,
          avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
        }
      ],
      cta: {
        title: "Start Your Sustainable Wellness Journey",
        subtitle: "Free shipping on orders over $75 • 30-day money-back guarantee",
        buttonText: "Shop Now"
      }
    }
  },
  {
    id: "financeforward-planning",
    title: "FinanceForward",
    industry: "Finance",
    description: "Modern financial planning and investment services",
    businessName: "FinanceForward",
    website: "https://financeforward.com",
    colors: {
      primary: "#1E40AF",
      secondary: "#3B82F6",
      accent: "#F59E0B"
    },
    landingPage: {
      hero: {
        headline: "Your Financial Future, Simplified",
        subheadline: "Expert financial planning meets cutting-edge technology. Get personalized investment strategies, retirement planning, and wealth management from certified advisors who put your goals first.",
        ctaText: "Get Free Financial Assessment",
        backgroundImage: "https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg"
      },
      features: [
        {
          title: "Personalized Strategies",
          description: "AI-powered analysis creates custom investment portfolios tailored to your risk tolerance and financial goals.",
          icon: "🎯"
        },
        {
          title: "Expert Guidance",
          description: "Certified Financial Planners (CFP) provide ongoing support and adjust strategies as your life changes.",
          icon: "👨‍💼"
        },
        {
          title: "Transparent Pricing",
          description: "No hidden fees or commissions. Flat-rate pricing means we're aligned with your success, not sales quotas.",
          icon: "💎"
        }
      ],
      about: {
        title: "Fiduciary Financial Planning for Modern Life",
        content: "FinanceForward was built on the principle that everyone deserves access to professional financial guidance. Our team of CFPs and investment advisors uses technology to make sophisticated financial planning accessible and affordable. As fiduciaries, we're legally bound to act in your best interest, not ours."
      },
      testimonials: [
        {
          name: "Robert Thompson",
          role: "Small Business Owner",
          content: "They helped me restructure my retirement planning and I'm now on track to retire 5 years earlier than expected. Incredible value.",
          rating: 5,
          avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
        },
        {
          name: "Lisa Wang",
          role: "Software Engineer",
          content: "The technology platform makes it easy to track progress and the advisors are genuinely helpful, not pushy at all.",
          rating: 5,
          avatar: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg"
        }
      ],
      cta: {
        title: "Take Control of Your Financial Future",
        subtitle: "Free consultation • No commitment • Fiduciary standard",
        buttonText: "Schedule Free Consultation"
      }
    }
  },
  {
    id: "creativestudio-design",
    title: "CreativeStudio Pro",
    industry: "Creative",
    description: "Design agency specializing in brand identity",
    businessName: "CreativeStudio Pro",
    website: "https://creativestudiopro.com",
    colors: {
      primary: "#7C2D12",
      secondary: "#EA580C",
      accent: "#F97316"
    },
    landingPage: {
      hero: {
        headline: "Brands That Break Through the Noise",
        subheadline: "We create bold, memorable brand identities that connect with your audience and drive business growth. From startups to Fortune 500s, we turn vision into visual impact.",
        ctaText: "Start Your Brand Journey",
        backgroundImage: "https://images.pexels.com/photos/3862618/pexels-photo-3862618.jpeg"
      },
      features: [
        {
          title: "Strategic Brand Design",
          description: "Data-driven design process that aligns your visual identity with business objectives and market positioning.",
          icon: "🎨"
        },
        {
          title: "Complete Brand Systems",
          description: "Logo, typography, color palette, guidelines, and applications across all touchpoints for consistent impact.",
          icon: "📐"
        },
        {
          title: "Market Research Integration",
          description: "Deep audience analysis and competitor research inform every design decision for maximum market resonance.",
          icon: "🔍"
        }
      ],
      about: {
        title: "Where Strategy Meets Creativity",
        content: "CreativeStudio Pro combines strategic thinking with world-class design execution. Our multidisciplinary team includes brand strategists, visual designers, and market researchers who work together to create brands that not only look great but perform exceptionally in the marketplace."
      },
      testimonials: [
        {
          name: "Alexandra Foster",
          role: "CEO, TechNova",
          content: "They completely transformed our brand perception. Customer engagement increased 400% after the rebrand. Worth every penny.",
          rating: 5,
          avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
        },
        {
          name: "Michael Chen",
          role: "Founder, GreenTech Solutions",
          content: "Professional, creative, and strategic. They understood our vision and brought it to life better than we imagined.",
          rating: 5,
          avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
        }
      ],
      cta: {
        title: "Ready to Build a Breakthrough Brand?",
        subtitle: "Free brand audit • Custom proposal • 100% satisfaction guarantee",
        buttonText: "Get Free Brand Audit"
      }
    }
  },
  {
    id: "foodie-delivery",
    title: "FoodieDelight",
    industry: "Food & Beverage",
    description: "Gourmet meal delivery and cooking experiences",
    businessName: "FoodieDelight",
    website: "https://foodiedelight.com",
    colors: {
      primary: "#DC2626",
      secondary: "#EF4444",
      accent: "#F97316"
    },
    landingPage: {
      hero: {
        headline: "Restaurant-Quality Meals, Delivered to Your Door",
        subheadline: "Experience chef-crafted gourmet meals made with premium ingredients and delivered fresh daily. From date nights to family dinners, we bring the restaurant experience home.",
        ctaText: "Order Your First Meal",
        backgroundImage: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
      },
      features: [
        {
          title: "Chef-Crafted Recipes",
          description: "Michelin-trained chefs create innovative dishes using seasonal, locally-sourced premium ingredients.",
          icon: "👨‍🍳"
        },
        {
          title: "Flexible Meal Plans",
          description: "Choose from 2-6 meals per week with options for dietary preferences and family sizes.",
          icon: "📅"
        },
        {
          title: "Easy 15-Minute Prep",
          description: "Pre-portioned ingredients and step-by-step instructions make gourmet cooking accessible to everyone.",
          icon: "⏱️"
        }
      ],
      about: {
        title: "Bringing Culinary Excellence Home",
        content: "FoodieDelight was founded by James Morrison, former head chef at acclaimed restaurants in NYC and SF. Frustrated by the lack of quality meal delivery options, he created a service that maintains restaurant standards while making gourmet cooking accessible to home cooks of all skill levels."
      },
      testimonials: [
        {
          name: "Emma Rodriguez",
          role: "Working Mother of 2",
          content: "Game-changer for our family! The kids actually eat vegetables now and I feel good about what we're having for dinner.",
          rating: 5,
          avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
        },
        {
          name: "Daniel Park",
          role: "Food Enthusiast",
          content: "The quality rivals my favorite restaurants but I'm cooking it myself. Love learning new techniques with each meal.",
          rating: 5,
          avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
        }
      ],
      cta: {
        title: "Experience Gourmet Cooking Tonight",
        subtitle: "50% off first order • Free shipping • Skip or cancel anytime",
        buttonText: "Claim Your Discount"
      }
    }
  },
  {
    id: "fitnesspro-training",
    title: "FitnessPro Elite",
    industry: "Fitness",
    description: "Personal training and fitness coaching platform",
    businessName: "FitnessPro Elite",
    website: "https://fitnessproelite.com",
    colors: {
      primary: "#B91C1C",
      secondary: "#DC2626",
      accent: "#F59E0B"
    },
    landingPage: {
      hero: {
        headline: "Transform Your Body, Transform Your Life",
        subheadline: "Get personalized training plans, nutrition coaching, and 24/7 support from certified personal trainers. Join thousands who've achieved their fitness goals with our proven system.",
        ctaText: "Start Your Transformation",
        backgroundImage: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg"
      },
      features: [
        {
          title: "Custom Training Plans",
          description: "AI-powered assessments create personalized workout plans that adapt as you progress toward your goals.",
          icon: "💪"
        },
        {
          title: "Expert Nutrition Coaching",
          description: "Registered dietitians provide meal plans, macro tracking, and ongoing nutrition support for optimal results.",
          icon: "🥗"
        },
        {
          title: "24/7 Trainer Support",
          description: "Direct access to certified trainers through our app for form checks, motivation, and plan adjustments.",
          icon: "📱"
        }
      ],
      about: {
        title: "Science-Based Fitness That Works",
        content: "FitnessPro Elite combines proven exercise science with cutting-edge technology to deliver results. Our team of certified trainers, sports scientists, and nutritionists have helped over 50,000 people achieve lasting fitness transformations through personalized, sustainable approaches."
      },
      testimonials: [
        {
          name: "Jessica Taylor",
          role: "Marketing Executive",
          content: "Lost 35 pounds and gained so much confidence. The trainers are incredibly supportive and the app makes everything easy to follow.",
          rating: 5,
          avatar: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg"
        },
        {
          name: "Mark Williams",
          role: "Construction Manager",
          content: "Finally found a program that fits my crazy schedule. Gained 20 pounds of muscle in 6 months. Couldn't be happier.",
          rating: 5,
          avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
        }
      ],
      cta: {
        title: "Ready to Start Your Fitness Journey?",
        subtitle: "Free fitness assessment • 30-day money-back guarantee • Cancel anytime",
        buttonText: "Get Your Free Assessment"
      }
    }
  }
]