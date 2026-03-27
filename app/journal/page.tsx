"use client"

import { useState } from "react"
import { JournalCalendar } from '@/components/journal-calendar'
import { JournalEntries } from '@/components/journal-entries'
import { format } from 'date-fns'

export default function JournalPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Journal</h1>
          <p className="text-muted-foreground">
            {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}
          </p>
        </div>
        <div className="lg:w-auto">
          <JournalCalendar onDateSelect={handleDateSelect} />
        </div>
      </div>

      {selectedDate && <JournalEntries selectedDate={selectedDate} />}
    </div>
  )
}
