import { NextResponse } from 'next/server'
import { seedJournalData } from '@/app/actions/seed-data'

export async function POST() {
  try {
    const result = await seedJournalData()
    
    if (result.success) {
      return NextResponse.json({ 
        message: `Successfully seeded ${result.count} journal entries for March 27, 2026`,
        count: result.count 
      })
    } else {
      return NextResponse.json({ 
        error: result.error 
      }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to seed data' 
    }, { status: 500 })
  }
}
