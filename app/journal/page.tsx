import { getJournalEntriesForCurrentDate } from '@/data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { JournalForm } from '@/components/journal-form'
import { JournalCalendar } from '@/components/journal-calendar'
import { format } from 'date-fns'

export default async function JournalPage() {
  const entries = await getJournalEntriesForCurrentDate()
  const today = new Date()

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Journal</h1>
          <p className="text-muted-foreground">
            {format(today, 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        <div className="lg:w-auto">
          <JournalCalendar />
        </div>
      </div>

      <div className="space-y-6">
        {entries.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No journal entries for today. Start writing!
              </p>
            </CardContent>
          </Card>
        ) : (
          entries.map((entry) => (
            <Card key={entry.id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {format(new Date(entry.createdAt), 'h:mm a')}
                </CardTitle>
                <CardDescription>
                  Entry created at {format(new Date(entry.createdAt), 'h:mm a')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap">
                  {entry.content}
                </div>
              </CardContent>
            </Card>
          ))
        )}

        <Card>
          <CardHeader>
            <CardTitle>New Entry</CardTitle>
            <CardDescription>
              Write your thoughts for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <JournalForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
