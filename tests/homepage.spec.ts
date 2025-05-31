import { test, expect } from '@playwright/test'

test.describe('Homepage Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display homepage with hero section', async ({ page }) => {
    // Check hero headline
    await expect(page.getByRole('heading', { name: /Beautiful Landing Pages/ })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Built by AI/ })).toBeVisible()
    
    // Check hero description
    await expect(page.getByText('Transform your business ideas into stunning')).toBeVisible()
    
    // Check CTAs are present - use more specific selectors
    await expect(page.getByRole('button', { name: 'Create Your Landing Page →' })).toBeVisible()
    await expect(page.locator('nav').getByRole('button', { name: 'Get Started Free' })).toBeVisible()
  })

  test('should display stats section', async ({ page }) => {
    // Use more specific selectors for stats
    await expect(page.locator('.text-3xl').filter({ hasText: '300%' })).toBeVisible()
    await expect(page.getByText('Higher Conversion Rate')).toBeVisible()
    await expect(page.locator('.text-3xl').filter({ hasText: '2 Min' })).toBeVisible()
    await expect(page.locator('.text-3xl').filter({ hasText: '10K+' })).toBeVisible()
  })

  test('should display preview showcase', async ({ page }) => {
    await expect(page.getByText('See What AI Can Create For You')).toBeVisible()
    await expect(page.getByText('Choose an Example')).toBeVisible()
    await expect(page.getByText('Live Preview')).toBeVisible()
    
    // Check example cards are present
    await expect(page.getByText('TechFlow Solutions')).toBeVisible()
    await expect(page.getByText('EcoGreen Wellness')).toBeVisible()
    await expect(page.getByText('FinanceForward')).toBeVisible()
  })

  test('should display features section', async ({ page }) => {
    await expect(page.getByText('AI-Powered Copy')).toBeVisible()
    await expect(page.getByText('Smart Design')).toBeVisible()
    await expect(page.getByText('Lightning Fast')).toBeVisible()
  })

  test('should display testimonials', async ({ page }) => {
    await expect(page.getByText('Trusted by Growing Businesses')).toBeVisible()
    await expect(page.getByText('Sarah Chen')).toBeVisible()
    await expect(page.getByText('Mike Rodriguez')).toBeVisible()
    await expect(page.getByText('Emma Thompson')).toBeVisible()
  })

  test('should navigate to form when clicking CTA', async ({ page }) => {
    await page.getByText('Create Your Landing Page →').first().click()
    
    // Should show the form
    await expect(page.getByText('Tell Us About Your Business')).toBeVisible()
    await expect(page.getByText('Business Name *')).toBeVisible()
    
    // Should have back button
    await expect(page.getByText('← Back to Examples')).toBeVisible()
  })

  test('should navigate back from form', async ({ page }) => {
    // Go to form
    await page.getByText('Get Started Free').click()
    await expect(page.getByText('Tell Us About Your Business')).toBeVisible()
    
    // Go back
    await page.getByText('← Back to Examples').click()
    await expect(page.getByText('Beautiful Landing Pages')).toBeVisible()
  })
})

test.describe('Preview Showcase Interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should switch between preview examples', async ({ page }) => {
    // Wait for preview showcase to load
    await expect(page.getByText('Choose an Example')).toBeVisible()
    
    // Initially should show TechFlow (first example) - use more specific selector
    await expect(page.locator('section').getByRole('heading', { name: /Automate Your Workflow/ })).toBeVisible()
    
    // Click on EcoGreen Wellness example
    await page.getByText('EcoGreen Wellness').click()
    
    // Should show EcoGreen content
    await expect(page.locator('section').getByRole('heading', { name: /Pure Wellness/ })).toBeVisible()
    await expect(page.getByText('100% Organic Certified')).toBeVisible()
    
    // Click on FinanceForward example
    await page.getByText('FinanceForward').click()
    
    // Should show FinanceForward content
    await expect(page.locator('section').getByRole('heading', { name: /Your Financial Future/ })).toBeVisible()
    await expect(page.getByText('Personalized Strategies')).toBeVisible()
  })

  test('should display preview browser UI', async ({ page }) => {
    // Check browser mockup elements
    await expect(page.locator('.bg-red-500.rounded-full')).toBeVisible() // Red dot
    await expect(page.locator('.bg-yellow-500.rounded-full')).toBeVisible() // Yellow dot
    await expect(page.locator('.bg-green-500.rounded-full')).toBeVisible() // Green dot
    
    // Check URL display
    await expect(page.getByText('https://techflow.ai')).toBeVisible()
  })

  test('should show example card details', async ({ page }) => {
    // Check industry tags - use more specific selectors within the sidebar
    await expect(page.locator('.space-y-4').getByText('Technology')).toBeVisible()
    await expect(page.locator('.space-y-4').getByText('Health & Wellness')).toBeVisible()
    await expect(page.locator('.space-y-4').getByText('Finance')).toBeVisible()
    
    // Check click to preview text
    await expect(page.getByText('Click to preview')).toHaveCount(6) // 6 example cards
  })
})