import { test, expect } from '@playwright/test'

test.describe('Visual Regression Tests', () => {
  test('homepage should match visual baseline', async ({ page }) => {
    await page.goto('/')
    
    // Wait for animations and content to load
    await page.waitForTimeout(2000)
    
    // Hide dynamic elements that might cause flaky tests
    await page.addStyleTag({
      content: `
        .animate-float { animation: none !important; }
        .animate-fade-in-up { animation: none !important; }
        .animate-pulse { animation: none !important; }
      `
    })
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot('homepage-full.png', {
      fullPage: true,
      threshold: 0.3 // Allow for small differences in rendering
    })
  })

  test('form page should match visual baseline', async ({ page }) => {
    await page.goto('/')
    await page.getByText('Get Started Free').click()
    
    // Wait for form to load
    await page.waitForTimeout(1000)
    
    // Disable animations
    await page.addStyleTag({
      content: `
        .hover-lift { transform: none !important; }
        .animate-fade-in-up { animation: none !important; }
      `
    })
    
    await expect(page).toHaveScreenshot('form-page.png', {
      fullPage: true,
      threshold: 0.3
    })
  })

  test('dashboard page should match visual baseline', async ({ page }) => {
    // Set up session storage with test data
    await page.goto('/')
    await page.evaluate(() => {
      sessionStorage.setItem('marketingBrief', JSON.stringify({
        businessName: 'Visual Test Corp',
        industry: 'technology',
        businessDescription: 'A test company for visual regression testing',
        website: 'https://visualtest.com',
        targetAudience: 'Test audience',
        productServices: 'Test products',
        uniqueSellingPoints: 'Test USPs',
        campaignGoals: 'Test goals'
      }))
    })
    
    await page.goto('/dashboard')
    await page.waitForTimeout(1000)
    
    await expect(page).toHaveScreenshot('dashboard-page.png', {
      fullPage: true,
      threshold: 0.3
    })
  })

  test('preview showcase should match visual baseline', async ({ page }) => {
    await page.goto('/')
    
    // Scroll to preview showcase
    await page.getByText('See What AI Can Create For You').scrollIntoViewIfNeeded()
    
    // Wait for content to load
    await page.waitForTimeout(2000)
    
    // Disable animations
    await page.addStyleTag({
      content: `
        .hover-lift { transform: none !important; }
        .animate-fade-in-up { animation: none !important; }
      `
    })
    
    // Take screenshot of the preview showcase section
    const showcaseSection = page.locator('text=See What AI Can Create For You').locator('..').locator('..')
    await expect(showcaseSection).toHaveScreenshot('preview-showcase.png', {
      threshold: 0.3
    })
  })

  test('mobile homepage should match visual baseline', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Wait for mobile layout to settle
    await page.waitForTimeout(2000)
    
    // Disable animations
    await page.addStyleTag({
      content: `
        .animate-float { animation: none !important; }
        .animate-fade-in-up { animation: none !important; }
        .animate-pulse { animation: none !important; }
      `
    })
    
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      threshold: 0.3
    })
  })

  test('mobile form should match visual baseline', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.getByText('Get Started Free').click()
    
    await page.waitForTimeout(1000)
    
    // Disable animations
    await page.addStyleTag({
      content: `
        .hover-lift { transform: none !important; }
        .animate-fade-in-up { animation: none !important; }
      `
    })
    
    await expect(page).toHaveScreenshot('form-mobile.png', {
      fullPage: true,
      threshold: 0.3
    })
  })

  test('example card hover states', async ({ page }) => {
    await page.goto('/')
    
    // Scroll to examples
    await page.getByText('TechFlow Solutions').scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)
    
    // Disable float animations but keep hover effects
    await page.addStyleTag({
      content: `
        .animate-float { animation: none !important; }
        .animate-fade-in-up { animation: none !important; }
      `
    })
    
    // Hover over first example card
    await page.getByText('TechFlow Solutions').hover()
    await page.waitForTimeout(500)
    
    // Take screenshot of hover state
    const exampleCard = page.getByText('TechFlow Solutions').locator('..')
    await expect(exampleCard).toHaveScreenshot('example-card-hover.png', {
      threshold: 0.3
    })
  })

  test('button states should match baseline', async ({ page }) => {
    await page.goto('/')
    
    // Find main CTA button
    const ctaButton = page.getByText('Create Your Landing Page →').first()
    await ctaButton.scrollIntoViewIfNeeded()
    
    // Normal state
    await expect(ctaButton).toHaveScreenshot('button-normal.png', {
      threshold: 0.3
    })
    
    // Hover state
    await ctaButton.hover()
    await page.waitForTimeout(300)
    await expect(ctaButton).toHaveScreenshot('button-hover.png', {
      threshold: 0.3
    })
  })

  test('form input states should match baseline', async ({ page }) => {
    await page.goto('/')
    await page.getByText('Get Started Free').click()
    
    const businessNameInput = page.getByLabel('Business Name *')
    
    // Empty state
    await expect(businessNameInput).toHaveScreenshot('input-empty.png', {
      threshold: 0.3
    })
    
    // Focused state
    await businessNameInput.focus()
    await page.waitForTimeout(300)
    await expect(businessNameInput).toHaveScreenshot('input-focused.png', {
      threshold: 0.3
    })
    
    // Filled state
    await businessNameInput.fill('Test Business Name')
    await page.waitForTimeout(300)
    await expect(businessNameInput).toHaveScreenshot('input-filled.png', {
      threshold: 0.3
    })
  })

  test('glass morphism effects should render correctly', async ({ page }) => {
    await page.goto('/')
    await page.getByText('Get Started Free').click()
    
    // Wait for glass effects to render
    await page.waitForTimeout(1000)
    
    // Take screenshot of the form container to verify glass morphism
    const formContainer = page.locator('.glass').first()
    await expect(formContainer).toHaveScreenshot('glass-morphism-form.png', {
      threshold: 0.3
    })
    
    // Go back to homepage and check testimonials glass effect
    await page.getByText('← Back to Examples').click()
    await page.getByText('Trusted by Growing Businesses').scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)
    
    const testimonialsSection = page.getByText('Trusted by Growing Businesses').locator('..')
    await expect(testimonialsSection).toHaveScreenshot('glass-morphism-testimonials.png', {
      threshold: 0.3
    })
  })
})