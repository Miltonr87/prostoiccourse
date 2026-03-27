import db from '@/db'
import { journalEntries } from '@/db/schema'
import { eq, and, gte, lt } from 'drizzle-orm'
import { currentUser } from '@clerk/nextjs/server'

export async function getJournalEntriesForCurrentDate() {
  const user = await currentUser()
  if (!user?.id) {
    throw new Error('Unauthorized')
  }

  const today = new Date()
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

  const entries = await db
    .select()
    .from(journalEntries)
    .where(
      and(
        eq(journalEntries.userId, user.id),
        gte(journalEntries.createdAt, startOfDay),
        lt(journalEntries.createdAt, endOfDay)
      )
    )
    .orderBy(journalEntries.createdAt)

  return entries
}

export async function createJournalEntry(content: string) {
  const user = await currentUser()
  if (!user?.id) {
    throw new Error('Unauthorized')
  }

  const [entry] = await db
    .insert(journalEntries)
    .values({
      userId: user.id,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning()

  return entry
}

export async function updateJournalEntry(id: string, content: string) {
  const user = await currentUser()
  if (!user?.id) {
    throw new Error('Unauthorized')
  }

  const [entry] = await db
    .update(journalEntries)
    .set({
      content,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(journalEntries.id, id),
        eq(journalEntries.userId, user.id)
      )
    )
    .returning()

  if (!entry) {
    throw new Error('Entry not found or unauthorized')
  }

  return entry
}

export async function deleteJournalEntry(id: string) {
  const user = await currentUser()
  if (!user?.id) {
    throw new Error('Unauthorized')
  }

  const [entry] = await db
    .delete(journalEntries)
    .where(
      and(
        eq(journalEntries.id, id),
        eq(journalEntries.userId, user.id)
      )
    )
    .returning()

  if (!entry) {
    throw new Error('Entry not found or unauthorized')
  }

  return entry
}
