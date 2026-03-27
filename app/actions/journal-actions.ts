'use server'
import { z } from 'zod'
import { createJournalEntry, updateJournalEntry, deleteJournalEntry } from '@/data'

const createEntrySchema = z.object({
  content: z.string().min(1).max(5000)
})

const updateEntrySchema = z.object({
  id: z.string().uuid(),
  content: z.string().min(1).max(5000)
})

const deleteEntrySchema = z.object({
  id: z.string().uuid()
})

export async function createJournalEntryAction(data: unknown) {
  const validatedData = createEntrySchema.parse(data)
  return await createJournalEntry(validatedData.content)
}

export async function updateJournalEntryAction(data: unknown) {
  const validatedData = updateEntrySchema.parse(data)
  return await updateJournalEntry(validatedData.id, validatedData.content)
}

export async function deleteJournalEntryAction(data: unknown) {
  const validatedData = deleteEntrySchema.parse(data)
  return await deleteJournalEntry(validatedData.id)
}
