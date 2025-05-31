import { test, expect } from '@playwright/test'

test.describe('Form Submission Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Navigate to form
    await page.getByText('Get Started Free').click()
    await expect(page.getByText('Tell Us About Your Business')).toBeVisible()
  })

  test('should display form with all required fields', async ({ page }) => {
    // Check form title and description
    await expect(page.getByText('Tell Us About Your Business')).toBeVisible()
    await expect(page.getByText('The more details you provide')).toBeVisible()
    
    // Check required fields
    await expect(page.getByLabel('Business Name *')).toBeVisible()
    await expect(page.getByLabel('Industry *')).toBeVisible()
    await expect(page.getByLabel('Business Description *')).toBeVisible()
    
    // Check optional fields
    await expect(page.getByLabel('Website URL')).toBeVisible()
    await expect(page.getByLabel('Target Audience')).toBeVisible()
    await expect(page.getByLabel('Products/Services')).toBeVisible()
    await expect(page.getByLabel('Unique Selling Points')).toBeVisible()
    await expect(page.getByLabel('Campaign Goals')).toBeVisible()
    
    // Check submit button
    await expect(page.getByText('🚀 Generate My Landing Page')).toBeVisible()
  })

  test('should show validation for required fields', async ({ page }) => {
    // Try to submit empty form
    await page.getByText('🚀 Generate My Landing Page').click()
    
    // Should show browser validation (required fields will be highlighted)
    // The form should not proceed due to HTML5 validation
    await expect(page.getByText('Tell Us About Your Business')).toBeVisible()
  })

  test('should fill out form with valid data', async ({ page }) => {
    // Fill required fields
    await page.getByLabel('Business Name *').fill('TestCorp Solutions')
    await page.getByLabel('Website URL').fill('https://testcorp.com')
    await page.getByLabel('Industry *').selectOption('technology')
    await page.getByLabel('Business Description *').fill('We provide innovative AI-powered solutions for modern businesses looking to automate their workflows and increase productivity.')
    
    // Fill optional fields
    await page.getByLabel('Target Audience').fill('Small to medium-sized businesses, particularly in tech and finance sectors, who want to streamline their operations.')
    await page.getByLabel('Products/Services').fill('AI workflow automation, business process optimization, custom software development, and consulting services.')
    await page.getByLabel('Unique Selling Points').fill('AI-first approach, 99.9% uptime guarantee, white-glove onboarding, and 24/7 expert support.')
    await page.getByLabel('Campaign Goals').fill('Generate qualified leads, increase demo bookings by 200%, and establish thought leadership in the AI automation space.')
    
    // Check that fields are filled
    await expect(page.getByLabel('Business Name *')).toHaveValue('TestCorp Solutions')
    await expect(page.getByLabel('Industry *')).toHaveValue('technology')
    await expect(page.getByLabel('Business Description *')).toHaveValue('We provide innovative AI-powered solutions for modern businesses looking to automate their workflows and increase productivity.')
  })

  test('should show industry options with emojis', async ({ page }) => {
    await page.getByLabel('Industry *').click()
    
    // Check that options have emojis and proper labels
    const industrySelect = page.getByLabel('Industry *')
    await expect(industrySelect.locator('option[value="technology"]')).toHaveText('🚀 Technology')
    await expect(industrySelect.locator('option[value="healthcare"]')).toHaveText('🏥 Healthcare')
    await expect(industrySelect.locator('option[value="finance"]')).toHaveText('💰 Finance')
    await expect(industrySelect.locator('option[value="education"]')).toHaveText('📚 Education')
    await expect(industrySelect.locator('option[value="retail"]')).toHaveText('🛍️ Retail')
  })

  test('should show helpful placeholders', async ({ page }) => {
    // Check placeholders provide helpful examples
    await expect(page.getByLabel('Business Name *')).toHaveAttribute('placeholder', 'e.g., TechFlow Solutions')
    await expect(page.getByLabel('Website URL')).toHaveAttribute('placeholder', 'https://your-website.com')
    await expect(page.getByLabel('Business Description *')).toHaveAttribute('placeholder', 'Describe your business, what you do, and what makes you unique. Be specific about your value proposition.')
    await expect(page.getByLabel('Target Audience')).toHaveAttribute('placeholder', 'Who are your ideal customers? Include demographics, interests, and pain points.')
  })

  test('should show loading state on submission', async ({ page }) => {
    // Fill minimum required fields
    await page.getByLabel('Business Name *').fill('Test Business')
    await page.getByLabel('Industry *').selectOption('technology')
    await page.getByLabel('Business Description *').fill('A test business description for our landing page generator.')
    
    // Submit form
    await page.getByText('🚀 Generate My Landing Page').click()
    
    // Should show loading state (if we can catch it before redirect)
    // This might be fast, so we'll check for either loading or the next page
    const loadingText = page.getByText('Creating Your Landing Page...')
    const dashboardText = page.getByText('Marketing Brief Dashboard')
    
    await expect(loadingText.or(dashboardText)).toBeVisible()
  })

  test('should navigate to dashboard after successful submission', async ({ page }) => {
    // Fill and submit form
    await page.getByLabel('Business Name *').fill('Dashboard Test Corp')
    await page.getByLabel('Industry *').selectOption('finance')
    await page.getByLabel('Business Description *').fill('Financial services company specializing in wealth management and investment advisory.')
    
    await page.getByText('🚀 Generate My Landing Page').click()
    
    // Should navigate to dashboard
    await expect(page.getByText('Marketing Brief Dashboard')).toBeVisible()
    await expect(page.getByText('Review your brief and generate your landing page')).toBeVisible()
  })

  test('should display form benefits', async ({ page }) => {
    // Check the benefits section at bottom of form
    await expect(page.getByText('⚡ Takes 2 minutes')).toBeVisible()
    await expect(page.getByText('🎨 Professional design')).toBeVisible()
    await expect(page.getByText('📈 Conversion optimized')).toBeVisible()
  })

  test('should have proper form styling', async ({ page }) => {
    // Check for glass morphism styling
    const formContainer = page.locator('.glass')
    await expect(formContainer).toBeVisible()
    
    // Check for proper input styling
    const businessNameInput = page.getByLabel('Business Name *')
    await expect(businessNameInput).toHaveClass(/bg-white\/60/)
    await expect(businessNameInput).toHaveClass(/backdrop-blur-sm/)
    await expect(businessNameInput).toHaveClass(/rounded-2xl/)
  })
})