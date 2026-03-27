import { NextResponse } from 'next/server'
import db from '@/db'
import { journalEntries } from '@/db/schema'

const additionalEntries = [
  {
    userId: 'mock-user-123',
    content: "Reading Sartre today made me think about the weight of absolute freedom. Every choice I make defines who I am, and there's no excuse for not taking responsibility. It's both terrifying and liberating.",
    philosopher: "Jean-Paul Sartre",
    philosophicalSchool: "Existentialism",
    keyConcept: "Absolute Freedom",
    personalReflection: "I've been blaming circumstances for my lack of progress, but Sartre reminds me that I am free to choose my response to any situation. Time to take ownership.",
    mood: "Inspired",
    createdAt: new Date('2026-03-27T12:15:00.000Z'),
    updatedAt: new Date('2026-03-27T12:15:00.000Z'),
  },
  {
    userId: 'mock-user-123',
    content: "Plato's Allegory of the Cave keeps coming to mind. How much of what I perceive as reality is just shadows on the wall? The news I consume, the social media feeds - are they the cave or the way out?",
    philosopher: "Plato",
    philosophicalSchool: "Platonism",
    keyConcept: "Allegory of the Cave",
    personalReflection: "I need to question my sources of truth more. Maybe I should spend less time consuming curated content and more time seeking direct experience and knowledge.",
    mood: "Confused",
    createdAt: new Date('2026-03-27T15:45:00.000Z'),
    updatedAt: new Date('2026-03-27T15:45:00.000Z'),
  },
  {
    userId: 'mock-user-123',
    content: "Aristotle's concept of the Golden Mean resonates today. I've been oscillating between extreme workaholism and complete laziness. The virtuous path lies in finding the balance - working with purpose but also allowing for proper rest and contemplation.",
    philosopher: "Aristotle",
    philosophicalSchool: "Aristotelianism",
    keyConcept: "Golden Mean",
    personalReflection: "This week I'll schedule both focused work time and dedicated leisure. Neither extreme serves my growth or well-being.",
    mood: "Clarity",
    createdAt: new Date('2026-03-27T18:20:00.000Z'),
    updatedAt: new Date('2026-03-27T18:20:00.000Z'),
  },
  {
    userId: 'mock-user-123',
    content: "Epicurus would say I'm seeking happiness in the wrong places. The expensive dinner I had last night brought temporary pleasure, but the simple morning walk with a friend brought lasting joy. Ataraxia - freedom from disturbance - comes from simple pleasures and meaningful connections.",
    philosopher: "Epicurus",
    philosophicalSchool: "Epicureanism",
    keyConcept: "Ataraxia",
    personalReflection: "I should focus more on cultivating friendships and simple pleasures rather than chasing external achievements for happiness.",
    mood: "Peaceful",
    createdAt: new Date('2026-03-27T20:00:00.000Z'),
    updatedAt: new Date('2026-03-27T20:00:00.000Z'),
  }
]

export async function POST() {
  try {
    let successCount = 0
    
    for (const entry of additionalEntries) {
      try {
        await db.insert(journalEntries).values(entry)
        successCount++
      } catch (error) {
        console.error('Failed to insert entry:', error)
      }
    }
    
    return NextResponse.json({ 
      message: `Successfully added ${successCount} additional entries`,
      count: successCount
    })
  } catch (error) {
    console.error('Error adding entries:', error)
    return NextResponse.json({ 
      error: (error as Error).message 
    }, { status: 500 })
  }
}
