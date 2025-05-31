import { test, expect } from '@playwright/test'

test.describe('AI Generation Flow Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set up mock API responses for testing
    await page.route('**/api/generate', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          content: {
            headline: "Transform Your Business with TestCorp Solutions",
            subheadline: "Professional technology solutions that deliver results",
            heroSection: {
              title: "Welcome to TestCorp Solutions",
              subtitle: "We provide innovative AI-powered solutions for modern businesses looking to automate their workflows and increase productivity.",
              ctaText: "Get Started Today"
            },
            features: [
              {
                title: "Professional Service",
                description: "Expert solutions tailored to your needs",
                icon: "star"
              },
              {
                title: "Proven Results",
                description: "Track record of success and satisfied customers",
                icon: "chart"
              },
              {
                title: "Quality Guarantee",
                description: "We stand behind our work with confidence",
                icon: "shield"
              }
            ],
            aboutSection: {
              title: "About TestCorp Solutions",
              content: "We provide innovative AI-powered solutions for modern businesses looking to automate their workflows and increase productivity."
            },
            testimonials: [
              {
                name: "Sarah Johnson",
                role: "Business Owner",
                content: "Outstanding service and results. Highly recommended!",
                rating: 5
              },
              {
                name: "Mike Chen",
                role: "Marketing Director",
                content: "Professional, reliable, and delivers on promises.",
                rating: 5
              }
            ],
            ctaSections: [
              {
                title: "Ready to Get Started?",
                subtitle: "Contact us today for a free consultation",
                buttonText: "Contact Us Now"
              }
            ],
            footer: {
              companyName: "TestCorp Solutions",
              tagline: "Your trusted technology partner"
            }
          },
          brief: {
            businessName: "TestCorp Solutions",
            industry: "technology",
            businessDescription: "We provide innovative AI-powered solutions for modern businesses."
          }
        })
      })
    })

    await page.route('**/api/images', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          images: {
            hero: [
              {
                id: 1,
                src: {
                  large: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
                  medium: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
                  small: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                },
                alt: "Technology workspace"
              }
            ],
            features: [
              {
                id: 2,
                src: {
                  large: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
                  medium: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
                  small: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                },
                alt: "Professional team"
              },
              {
                id: 3,
                src: {
                  large: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg",
                  medium: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg",
                  small: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg"
                },
                alt: "Business analytics"
              },
              {
                id: 4,
                src: {
                  large: "https://images.pexels.com/photos/3183154/pexels-photo-3183154.jpeg",
                  medium: "https://images.pexels.com/photos/3183154/pexels-photo-3183154.jpeg",
                  small: "https://images.pexels.com/photos/3183154/pexels-photo-3183154.jpeg"
                },
                alt: "Quality assurance"
              }
            ],
            about: [
              {
                id: 5,
                src: {
                  large: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
                  medium: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
                  small: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
                },
                alt: "Company culture"
              }
            ],
            testimonials: [
              {
                id: 6,
                src: {
                  large: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
                  medium: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
                  small: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                },
                alt: "Sarah Johnson"
              },
              {
                id: 7,
                src: {
                  large: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
                  medium: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
                  small: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                },
                alt: "Mike Chen"
              }
            ]
          },
          totalPhotos: 7,
          queries: ["technology workspace", "professional team", "business analytics", "quality assurance"]
        })
      })
    })
  })

  test('should complete full AI generation flow', async ({ page }) => {
    // Start from homepage
    await page.goto('/')
    
    // Navigate to form
    await page.getByText('Get Started Free').click()
    
    // Fill out brief form
    await page.getByLabel('Business Name *').fill('TestCorp Solutions')
    await page.getByLabel('Industry *').selectOption('technology')
    await page.getByLabel('Business Description *').fill('We provide innovative AI-powered solutions for modern businesses looking to automate their workflows and increase productivity.')
    
    // Submit form
    await page.getByText('🚀 Generate My Landing Page').click()
    
    // Should navigate to dashboard
    await expect(page.getByText('Marketing Brief Dashboard')).toBeVisible()
    await expect(page.getByText('TestCorp Solutions')).toBeVisible()
    
    // Navigate to preview
    await page.getByText('Generate Landing Page').click()
    
    // Should show loading state
    await expect(page.getByText('Generating Your Landing Page')).toBeVisible()
    
    // Should eventually show the generated preview
    await expect(page.getByText('Preview: TestCorp Solutions')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('AI-generated landing page')).toBeVisible()
  })

  test('should display generated content correctly', async ({ page }) => {
    // Navigate directly to preview with session data
    await page.goto('/')
    await page.getByText('Get Started Free').click()
    
    // Fill form
    await page.getByLabel('Business Name *').fill('TestCorp Solutions')
    await page.getByLabel('Industry *').selectOption('technology')
    await page.getByLabel('Business Description *').fill('We provide innovative AI-powered solutions for modern businesses.')
    await page.getByText('🚀 Generate My Landing Page').click()
    
    // Go to preview
    await page.getByText('Generate Landing Page').click()
    
    // Wait for content to load
    await expect(page.getByText('Welcome to TestCorp Solutions')).toBeVisible({ timeout: 10000 })
    
    // Check hero section
    await expect(page.getByText('Welcome to TestCorp Solutions')).toBeVisible()
    await expect(page.getByText('We provide innovative AI-powered solutions')).toBeVisible()
    await expect(page.getByText('Get Started Today')).toBeVisible()
    
    // Check features section
    await expect(page.getByText('Why Choose TestCorp Solutions?')).toBeVisible()
    await expect(page.getByText('Professional Service')).toBeVisible()
    await expect(page.getByText('Proven Results')).toBeVisible()
    await expect(page.getByText('Quality Guarantee')).toBeVisible()
    
    // Check about section
    await expect(page.getByText('About TestCorp Solutions')).toBeVisible()
    
    // Check testimonials
    await expect(page.getByText('What Our Clients Say')).toBeVisible()
    await expect(page.getByText('Sarah Johnson')).toBeVisible()
    await expect(page.getByText('Mike Chen')).toBeVisible()
    
    // Check CTA section
    await expect(page.getByText('Ready to Get Started?')).toBeVisible()
    await expect(page.getByText('Contact Us Now')).toBeVisible()
    
    // Check footer
    await expect(page.getByText('Your trusted technology partner')).toBeVisible()
  })

  test('should display images in generated content', async ({ page }) => {
    // Navigate to preview
    await page.goto('/')
    await page.getByText('Get Started Free').click()
    await page.getByLabel('Business Name *').fill('TestCorp Solutions')
    await page.getByLabel('Industry *').selectOption('technology')
    await page.getByLabel('Business Description *').fill('Test description')
    await page.getByText('🚀 Generate My Landing Page').click()
    await page.getByText('Generate Landing Page').click()
    
    // Wait for preview to load
    await expect(page.getByText('Preview: TestCorp Solutions')).toBeVisible({ timeout: 10000 })
    
    // Check that images are loaded
    const heroImage = page.locator('img[alt="Technology workspace"]')
    await expect(heroImage).toBeVisible()
    
    const featureImages = page.locator('img[alt*="Professional team"], img[alt*="Business analytics"], img[alt*="Quality assurance"]')
    await expect(featureImages).toHaveCount(3)
    
    const aboutImage = page.locator('img[alt="Company culture"]')
    await expect(aboutImage).toBeVisible()
    
    const testimonialImages = page.locator('img[alt*="Sarah Johnson"], img[alt*="Mike Chen"]')
    await expect(testimonialImages).toHaveCount(2)
  })

  test('should have preview controls', async ({ page }) => {
    // Navigate to preview
    await page.goto('/')
    await page.getByText('Get Started Free').click()
    await page.getByLabel('Business Name *').fill('TestCorp Solutions')
    await page.getByLabel('Industry *').selectOption('technology')
    await page.getByLabel('Business Description *').fill('Test description')
    await page.getByText('🚀 Generate My Landing Page').click()
    await page.getByText('Generate Landing Page').click()
    
    // Wait for preview
    await expect(page.getByText('Preview: TestCorp Solutions')).toBeVisible({ timeout: 10000 })
    
    // Check preview controls
    await expect(page.getByText('Regenerate')).toBeVisible()
    await expect(page.getByText('Back to Brief')).toBeVisible()
    
    // Test back to brief navigation
    await page.getByText('Back to Brief').click()
    await expect(page.getByText('Marketing Brief Dashboard')).toBeVisible()
  })

  test('should handle regenerate functionality', async ({ page }) => {
    // Navigate to preview
    await page.goto('/')
    await page.getByText('Get Started Free').click()
    await page.getByLabel('Business Name *').fill('TestCorp Solutions')
    await page.getByLabel('Industry *').selectOption('technology')
    await page.getByLabel('Business Description *').fill('Test description')
    await page.getByText('🚀 Generate My Landing Page').click()
    await page.getByText('Generate Landing Page').click()
    
    // Wait for initial content
    await expect(page.getByText('Preview: TestCorp Solutions')).toBeVisible({ timeout: 10000 })
    
    // Click regenerate
    await page.getByText('Regenerate').click()
    
    // Should show loading state again
    await expect(page.getByText('Regenerating...')).toBeVisible()
    
    // Should reload with new content (same in our mock, but the request was made)
    await expect(page.getByText('Welcome to TestCorp Solutions')).toBeVisible({ timeout: 10000 })
  })
})