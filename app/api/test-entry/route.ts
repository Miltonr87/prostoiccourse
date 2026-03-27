import { NextResponse } from 'next/server'
import db from '@/db'
import { journalEntries } from '@/db/schema'

export async function POST() {
  try {
    // Try to insert a simple test entry first
    const result = await db.insert(journalEntries).values({
      userId: 'mock-user-123',
      content: "Test entry for March 27 - Today I reflected on Stoic principles.",
      philosopher: "Marcus Aurelius",
      philosophicalSchool: "Stoicism",
      keyConcept: "Control and Acceptance",
      personalReflection: "I need to practice accepting what I cannot control.",
      mood: "Contemplative",
      createdAt: new Date('2026-03-27T08:30:00.000Z'),
      updatedAt: new Date('2026-03-27T08:30:00.000Z'),
    }).returning()
    
    return NextResponse.json({ 
      message: 'Successfully created test entry',
      entry: result[0]
    })
  } catch (error) {
    console.error('Test entry error:', error)
    return NextResponse.json({ 
      error: (error as Error).message 
    }, { status: 500 })
  }
}
