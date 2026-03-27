import { NextResponse } from 'next/server'
import db from '@/db'
import { journalEntries } from '@/db/schema'
import { eq, and, gte, lt } from 'drizzle-orm'

export async function GET() {
  try {
    const today = new Date('2026-03-27')
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    
    const entries = await db
      .select()
      .from(journalEntries)
      .where(
        and(
          eq(journalEntries.userId, 'mock-user-123'),
          gte(journalEntries.createdAt, startOfDay),
          lt(journalEntries.createdAt, endOfDay)
        )
      )
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
