"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

interface JournalCalendarProps {
  onDateSelect: (date: Date | undefined) => void
}

export function JournalCalendar({ onDateSelect }: JournalCalendarProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    onDateSelect(selectedDate)
  }

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={handleDateSelect}
      className="rounded-lg border"
      captionLayout="dropdown"
    />
  )
}
