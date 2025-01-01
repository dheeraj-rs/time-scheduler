"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { VenueSelector } from './VenueSelector'
import { ScheduleManager } from './ScheduleManager'
import { Session } from '@/types/program'

interface ProgramFormProps {
  hallId: string;
  onSuccess: () => void;
}

export function ProgramForm({ }: ProgramFormProps) {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [sessions, setSessions] = useState<Partial<Session>[]>([])

  const handleVenueSelect = (venueId: string, hallId: string, stageId: string) => {
    // Handle venue selection
    console.log({ venueId, hallId, stageId })
  }

  const handleAddSession = (session: Partial<Session>) => {
    setSessions([...sessions, session])
  }

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Program Title</Label>
          <Input id="title" placeholder="Enter program title" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Program description" />
        </div>

        <VenueSelector onVenueChange={handleVenueSelect} />

        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Sessions</Label>
            <ScheduleManager 
              sessions={sessions as Session[]}
              onAddSession={handleAddSession}
            />
          </div>

          {sessions.map((session, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{session.title}</h3>
                <span className="text-sm text-muted-foreground">
                  {session.timeSlot?.start.toLocaleTimeString()} - {session.timeSlot?.end.toLocaleTimeString()}
                </span>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Create Program</Button>
        </div>
      </form>
    </Card>
  )
}