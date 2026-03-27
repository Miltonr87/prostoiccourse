'use server'
import { z } from 'zod'
import { getJournalEntriesForDate } from '@/data'

const getEntriesSchema = z.object({
  date: z.string().datetime()
})

export async function getJournalEntriesForDateAction(dateString: string) {
  const validatedDate = getEntriesSchema.parse({ date: dateString })
  const date = new Date(validatedDate.date)
  return await getJournalEntriesForDate(date)
}
