import { NextResponse } from 'next/server'
import db from '@/db'

export async function POST() {
  try {
    // Add philosophical columns to existing table
    await db.execute(`
      ALTER TABLE journal_entries 
      ADD COLUMN IF NOT EXISTS philosopher TEXT,
      ADD COLUMN IF NOT EXISTS philosophical_school TEXT,
      ADD COLUMN IF NOT EXISTS key_concept TEXT,
      ADD COLUMN IF NOT EXISTS personal_reflection TEXT,
      ADD COLUMN IF NOT EXISTS mood TEXT
    `)
    
    return NextResponse.json({ 
      message: 'Successfully migrated database schema for philosophical journaling' 
    })
  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json({ 
      error: 'Failed to migrate database' 
    }, { status: 500 })
  }
}
