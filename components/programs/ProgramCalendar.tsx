"use client"

import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { isSameDay } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "lucide-react"
import { Program } from "@/types/program"

interface ProgramCalendarProps {
  programs: Program[]
  selectedDate?: Date
  onDateSelect: (date: Date) => void
  limitedDays?: number[]
}

export function ProgramCalendar({ 
  programs, 
  selectedDate, 
  onDateSelect,
  limitedDays = [] 
}: ProgramCalendarProps) {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground border-b pb-3">
          <Calendar className="h-4 w-4" />
          <span className="font-medium">Select Date</span>
        </div>
          <div className="flex flex-wrap gap-2">
            {limitedDays.map(day => {
              const date = new Date(currentYear, currentMonth, day)
              const hasPrograms = programs.some(p => isSameDay(p.date, date))
              
              return (
                <Button
                  key={day}
                  variant={selectedDate && isSameDay(date, selectedDate) ? "default" : "outline"}
                  className={cn(
                    "w-[calc(14.28%-8px)] aspect-square p-0 flex flex-col items-center justify-center transition-all",
                    hasPrograms && "border-primary ring-1 ring-primary/20",
                    !hasPrograms && "opacity-50 hover:opacity-75",
                    selectedDate && isSameDay(date, selectedDate) && "shadow-md scale-105"
                  )}
                  onClick={() => onDateSelect(date)}
                >
                  <span className="text-sm font-semibold">{format(date, 'd')}</span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">{format(date, 'EEE')}</span>
                  {hasPrograms && (
                    <div className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
                  )}
                </Button>
              )
            })}
          </div>
      </div>
  )
} 