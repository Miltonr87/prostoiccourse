"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { JournalForm } from '@/components/journal-form'
import { format } from 'date-fns'
import { getJournalEntriesForDateAction } from '@/app/actions/get-entries-action'

interface JournalEntry {
  id: string
  userId: string
  content: string
  philosopher?: string | null
  philosophicalSchool?: string | null
  keyConcept?: string | null
  personalReflection?: string | null
  mood?: string | null
  createdAt: Date
  updatedAt: Date
}

export function JournalEntries({ selectedDate }: { selectedDate: Date }) {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadEntries() {
      try {
        setLoading(true)
        const fetchedEntries = await getJournalEntriesForDateAction(selectedDate.toISOString())
        setEntries(fetchedEntries)
      } catch (error) {
        console.error('Failed to load entries:', error)
      } finally {
        setLoading(false)
      }
    }

    loadEntries()
  }, [selectedDate])

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Loading entries...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {entries.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No journal entries for {format(selectedDate, 'MMMM d, yyyy')}. Start writing!
            </p>
          </CardContent>
        </Card>
      ) : (
        entries.map((entry) => (
          <Card key={entry.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    {format(new Date(entry.createdAt), 'h:mm a')}
                  </CardTitle>
                  <CardDescription>
                    Entry created at {format(new Date(entry.createdAt), 'h:mm a')}
                  </CardDescription>
                </div>
                {entry.mood && (
                  <Badge variant="secondary" className="ml-2">
                    {entry.mood}
                  </Badge>
                )}
              </div>
              
              {/* Philosophical Information */}
              {(entry.philosopher || entry.philosophicalSchool || entry.keyConcept) && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {entry.philosopher && (
                    <Badge variant="outline">
                      📚 {entry.philosopher}
                    </Badge>
                  )}
                  {entry.philosophicalSchool && (
                    <Badge variant="outline">
                      🏛️ {entry.philosophicalSchool}
                    </Badge>
                  )}
                  {entry.keyConcept && (
                    <Badge variant="outline">
                      💡 {entry.keyConcept}
                    </Badge>
                  )}
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="whitespace-pre-wrap">
                  {entry.content}
                </div>
                
                {entry.personalReflection && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">
                      Personal Reflection:
                    </h4>
                    <div className="whitespace-pre-wrap text-sm">
                      {entry.personalReflection}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}

      <Card>
        <CardHeader>
          <CardTitle>New Entry</CardTitle>
          <CardDescription>
            Write your philosophical thoughts for {format(selectedDate, 'MMMM d, yyyy')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JournalForm />
        </CardContent>
      </Card>
    </div>
  )
}
