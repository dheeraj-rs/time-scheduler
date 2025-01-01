"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Program } from "@/app/types/program"
import { format } from "date-fns"
import { isSameDay } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

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
                  variant={isSameDay(date, selectedDate) ? "default" : "outline"}
                  className={cn(
                    "w-[calc(14.28%-8px)] aspect-square p-0 flex flex-col items-center justify-center transition-all",
                    hasPrograms && "border-primary ring-1 ring-primary/20",
                    !hasPrograms && "opacity-50 hover:opacity-75",
                    isSameDay(date, selectedDate) && "shadow-md scale-105"
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