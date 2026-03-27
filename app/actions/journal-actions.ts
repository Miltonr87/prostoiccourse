'use server'
import { z } from 'zod'
import { createJournalEntry, updateJournalEntry, deleteJournalEntry } from '@/data'

const createEntrySchema = z.object({
  content: z.string().min(1).max(5000),
  philosopher: z.string().max(100).optional(),
  philosophicalSchool: z.string().max(100).optional(),
  keyConcept: z.string().max(200).optional(),
  personalReflection: z.string().max(1000).optional(),
  mood: z.string().max(50).optional()
})

const updateEntrySchema = z.object({
  id: z.string().uuid(),
  content: z.string().min(1).max(5000),
  philosopher: z.string().max(100).optional(),
  philosophicalSchool: z.string().max(100).optional(),
  keyConcept: z.string().max(200).optional(),
  personalReflection: z.string().max(1000).optional(),
  mood: z.string().max(50).optional()
})

const deleteEntrySchema = z.object({
  id: z.string().uuid()
})

export async function createJournalEntryAction(data: unknown) {
  const validatedData = createEntrySchema.parse(data)
  return await createJournalEntry(
    validatedData.content,
    validatedData.philosopher,
    validatedData.philosophicalSchool,
    validatedData.keyConcept,
    validatedData.personalReflection,
    validatedData.mood
  )
}

export async function updateJournalEntryAction(data: unknown) {
  const validatedData = updateEntrySchema.parse(data)
  return await updateJournalEntry(
    validatedData.id,
    validatedData.content,
    validatedData.philosopher,
    validatedData.philosophicalSchool,
    validatedData.keyConcept,
    validatedData.personalReflection,
    validatedData.mood
  )
}

export async function deleteJournalEntryAction(data: unknown) {
  const validatedData = deleteEntrySchema.parse(data)
  return await deleteJournalEntry(validatedData.id)
}
