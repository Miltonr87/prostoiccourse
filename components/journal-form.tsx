'use client'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createJournalEntryAction } from '@/app/actions/journal-actions'
import { useRouter } from 'next/navigation'

const PHILOSOPHICAL_SCHOOLS = [
  'Stoicism',
  'Existentialism',
  'Platonism',
  'Aristotelianism',
  'Epicureanism',
  'Cynicism',
  'Skepticism',
  'Nihilism',
  'Pragmatism',
  'Phenomenology',
  'Eastern Philosophy',
  'Other'
]

const MOODS = [
  'Contemplative',
  'Inspired',
  'Confused',
  'Clarity',
  'Anxious',
  'Peaceful',
  'Excited',
  'Melancholy',
  'Hopeful',
  'Doubtful'
]

export function JournalForm() {
  const [content, setContent] = useState('')
  const [philosopher, setPhilosopher] = useState('')
  const [philosophicalSchool, setPhilosophicalSchool] = useState('')
  const [keyConcept, setKeyConcept] = useState('')
  const [personalReflection, setPersonalReflection] = useState('')
  const [mood, setMood] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)
    try {
      await createJournalEntryAction({
        content,
        philosopher: philosopher || undefined,
        philosophicalSchool: philosophicalSchool || undefined,
        keyConcept: keyConcept || undefined,
        personalReflection: personalReflection || undefined,
        mood: mood || undefined
      })
      
      // Reset form
      setContent('')
      setPhilosopher('')
      setPhilosophicalSchool('')
      setKeyConcept('')
      setPersonalReflection('')
      setMood('')
      
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
        placeholder="What philosophical thoughts are on your mind?"
        className="min-h-30"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        name="content"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Philosopher (e.g., Marcus Aurelius)"
          value={philosopher}
          onChange={(e) => setPhilosopher(e.target.value)}
          name="philosopher"
        />
        
        <Select value={philosophicalSchool} onValueChange={(value) => setPhilosophicalSchool(value || '')}>
          <SelectTrigger>
            <SelectValue placeholder="School of thought" />
          </SelectTrigger>
          <SelectContent>
            {PHILOSOPHICAL_SCHOOLS.map((school) => (
              <SelectItem key={school} value={school}>
                {school}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Input
        placeholder="Key concept (e.g., Amor Fati, Authenticity)"
        value={keyConcept}
        onChange={(e) => setKeyConcept(e.target.value)}
        name="keyConcept"
      />
      
      <Textarea
        placeholder="How does this apply to your life?"
        className="min-h-20"
        value={personalReflection}
        onChange={(e) => setPersonalReflection(e.target.value)}
        name="personalReflection"
      />
      
      <Select value={mood} onValueChange={(value) => setMood(value || '')}>
        <SelectTrigger>
          <SelectValue placeholder="Current mood" />
        </SelectTrigger>
        <SelectContent>
          {MOODS.map((moodOption) => (
            <SelectItem key={moodOption} value={moodOption}>
              {moodOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Button type="submit" disabled={!content.trim() || isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Entry'}
      </Button>
    </form>
  )
}
