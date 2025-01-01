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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export function ProgramForm({ hallId, onSuccess }: ProgramFormProps) {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [sessions, setSessions] = useState<Partial<Session>[]>([])

  const handleVenueSelect = (venueId: string, hallId: string, stageId: string) => {
    console.log({ venueId, hallId, stageId })
  }

  const handleAddSession = (session: Partial<Session>) => {
    setSessions([...sessions, session])
  }

  return (
    <Card className="w-full max-w-4xl mx-auto p-6">
      <form className="space-y-8">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-3 gap-4 mb-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="venue">Venue Details</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Program Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter program title"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Program description"
                  className="min-h-[150px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Program Date</Label>
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
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="venue" className="space-y-6">
            <VenueSelector onVenueChange={handleVenueSelect} />
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Sessions</Label>
              <ScheduleManager 
                sessions={sessions as Session[]}
                onAddSession={handleAddSession}
              />
            </div>

            <div className="space-y-4">
              {sessions.map((session, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{session.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {session.description}
                      </p>
                    </div>
                    <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {session.timeSlot?.start.toLocaleTimeString()} - {session.timeSlot?.end.toLocaleTimeString()}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="min-w-[100px]"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="min-w-[100px]"
          >
            Create Program
          </Button>
        </div>
      </form>
    </Card>
  )
}