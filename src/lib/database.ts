import { createClient } from '@libsql/client'
import type { LandingPageContent, MarketingBrief } from './anthropic'
import type { PexelsPhoto } from './images'

interface CategorizedImages {
  hero: PexelsPhoto[]
  features: PexelsPhoto[]
  about: PexelsPhoto[]
  testimonials: PexelsPhoto[]
}

export interface SavedLandingPage {
  id: string
  businessName: string
  industry: string
  content: LandingPageContent
  images: CategorizedImages
  brief: MarketingBrief
  createdAt: string
  updatedAt: string
}

// Initialize SQLite database
const initDatabase = () => {
  if (process.env.NODE_ENV === 'test') {
    // Use in-memory database for tests
    return createClient({
      url: ':memory:',
    })
  }

  // For Vercel, use in-memory database as it's serverless
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    return createClient({
      url: ':memory:',
    })
  }

  // Use local SQLite file for development
  return createClient({
    url: process.env.DATABASE_URL || 'file:local.db',
  })
}

const db = initDatabase()

// Initialize database tables
export const initTables = async () => {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS landing_pages (
        id TEXT PRIMARY KEY,
        business_name TEXT NOT NULL,
        industry TEXT NOT NULL,
        content TEXT NOT NULL,
        images TEXT NOT NULL,
        brief TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await db.execute(`
      CREATE INDEX IF NOT EXISTS idx_business_name 
      ON landing_pages(business_name)
    `)

    await db.execute(`
      CREATE INDEX IF NOT EXISTS idx_industry 
      ON landing_pages(industry)
    `)

    await db.execute(`
      CREATE INDEX IF NOT EXISTS idx_created_at 
      ON landing_pages(created_at)
    `)

    console.log('Database tables initialized successfully')
  } catch (error) {
    console.error('Error initializing database tables:', error)
    throw error
  }
}

// Generate unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Save landing page to database
export const saveLandingPage = async (
  brief: MarketingBrief,
  content: LandingPageContent,
  images: CategorizedImages
): Promise<SavedLandingPage> => {
  try {
    const id = generateId()
    const now = new Date().toISOString()
    
    const result = await db.execute({
      sql: `
        INSERT INTO landing_pages 
        (id, business_name, industry, content, images, brief, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        id,
        brief.businessName,
        brief.industry,
        JSON.stringify(content),
        JSON.stringify(images),
        JSON.stringify(brief),
        now,
        now
      ]
    })

    if (result.rowsAffected === 0) {
      throw new Error('Failed to save landing page')
    }

    return {
      id,
      businessName: brief.businessName,
      industry: brief.industry,
      content,
      images,
      brief,
      createdAt: now,
      updatedAt: now
    }
  } catch (error) {
    console.error('Error saving landing page:', error)
    throw error
  }
}

// Get landing page by ID
export const getLandingPageById = async (id: string): Promise<SavedLandingPage | null> => {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM landing_pages WHERE id = ?',
      args: [id]
    })

    if (result.rows.length === 0) {
      return null
    }

    const row = result.rows[0]
    return {
      id: row.id as string,
      businessName: row.business_name as string,
      industry: row.industry as string,
      content: JSON.parse(row.content as string),
      images: JSON.parse(row.images as string),
      brief: JSON.parse(row.brief as string),
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string
    }
  } catch (error) {
    console.error('Error getting landing page by ID:', error)
    throw error
  }
}

// Get recent landing pages
export const getRecentLandingPages = async (limit: number = 10): Promise<SavedLandingPage[]> => {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM landing_pages ORDER BY created_at DESC LIMIT ?',
      args: [limit]
    })

    return result.rows.map(row => ({
      id: row.id as string,
      businessName: row.business_name as string,
      industry: row.industry as string,
      content: JSON.parse(row.content as string),
      images: JSON.parse(row.images as string),
      brief: JSON.parse(row.brief as string),
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string
    }))
  } catch (error) {
    console.error('Error getting recent landing pages:', error)
    throw error
  }
}

// Search landing pages by business name
export const searchLandingPages = async (query: string): Promise<SavedLandingPage[]> => {
  try {
    const result = await db.execute({
      sql: `
        SELECT * FROM landing_pages 
        WHERE business_name LIKE ? 
        ORDER BY created_at DESC 
        LIMIT 20
      `,
      args: [`%${query}%`]
    })

    return result.rows.map(row => ({
      id: row.id as string,
      businessName: row.business_name as string,
      industry: row.industry as string,
      content: JSON.parse(row.content as string),
      images: JSON.parse(row.images as string),
      brief: JSON.parse(row.brief as string),
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string
    }))
  } catch (error) {
    console.error('Error searching landing pages:', error)
    throw error
  }
}

// Update landing page
export const updateLandingPage = async (
  id: string,
  content: LandingPageContent,
  images: CategorizedImages
): Promise<SavedLandingPage | null> => {
  try {
    const now = new Date().toISOString()
    
    const result = await db.execute({
      sql: `
        UPDATE landing_pages 
        SET content = ?, images = ?, updated_at = ?
        WHERE id = ?
      `,
      args: [
        JSON.stringify(content),
        JSON.stringify(images),
        now,
        id
      ]
    })

    if (result.rowsAffected === 0) {
      return null
    }

    return await getLandingPageById(id)
  } catch (error) {
    console.error('Error updating landing page:', error)
    throw error
  }
}

// Delete landing page
export const deleteLandingPage = async (id: string): Promise<boolean> => {
  try {
    const result = await db.execute({
      sql: 'DELETE FROM landing_pages WHERE id = ?',
      args: [id]
    })

    return result.rowsAffected > 0
  } catch (error) {
    console.error('Error deleting landing page:', error)
    throw error
  }
}

// Get landing pages by industry
export const getLandingPagesByIndustry = async (industry: string): Promise<SavedLandingPage[]> => {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM landing_pages WHERE industry = ? ORDER BY created_at DESC',
      args: [industry]
    })

    return result.rows.map(row => ({
      id: row.id as string,
      businessName: row.business_name as string,
      industry: row.industry as string,
      content: JSON.parse(row.content as string),
      images: JSON.parse(row.images as string),
      brief: JSON.parse(row.brief as string),
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string
    }))
  } catch (error) {
    console.error('Error getting landing pages by industry:', error)
    throw error
  }
}

// Export database instance for advanced queries
export { db }