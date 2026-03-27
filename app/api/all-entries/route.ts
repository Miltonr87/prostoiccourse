import { NextResponse } from 'next/server'
import db from '@/db'
import { journalEntries } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  try {
    const entries = await db
      .select()
      .from(journalEntries)
      .where(eq(journalEntries.userId, 'mock-user-123'))
      .orderBy(journalEntries.createdAt)
    
    return NextResponse.json({ 
      entries,
      count: entries.length
    })
  } catch (error) {
    console.error('Query error:', error)
    return NextResponse.json({ 
      error: (error as Error).message 
    }, { status: 500 })
  }
}
