'use client'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { createJournalEntryAction } from '@/app/actions/journal-actions'
import { useRouter } from 'next/navigation'

export function JournalForm() {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)
    try {
      await createJournalEntryAction({ content })
      setContent('')
      router.refresh()
    } catch (error) {
      console.error('Failed to create entry:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="What's on your mind?"
        className="min-h-30"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        name="content"
      />
      <Button type="submit" disabled={!content.trim() || isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Entry'}
      </Button>
    </form>
  )
}
