"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Clock, AlertCircle } from "lucide-react"
import { isBreakTime, isTimeConflict } from '@/lib/utils/time'
import { Session } from '@/app/types/program'

interface ScheduleManagerProps {
  sessions: Session[]
  onAddSession: (session: Partial<Session>) => void
}

export function ScheduleManager({ sessions, onAddSession }: ScheduleManagerProps) {
  const [newSession, setNewSession] = useState({
    title: '',
    start: '',
    end: ''
  })
  const [error, setError] = useState<string>('')

  const validateTime = (start: string, end: string) => {
    const startDate = new Date(`2024-01-01T${start}`)
    const endDate = new Date(`2024-01-01T${end}`)

    if (isBreakTime(startDate) || isBreakTime(endDate)) {
      return "Cannot schedule during lunch (12-13) or dinner (18-19) hours"
    }

    const newTimeSlot = { start: startDate, end: endDate }
    const hasConflict = sessions.some(session => 
      isTimeConflict(newTimeSlot, session.timeSlot)
    )

    if (hasConflict) {
      return "Time slot conflicts with an existing session"
    }

    return null
  }

  const handleSubmit = () => {
    const timeError = validateTime(newSession.start, newSession.end)
    if (timeError) {
      setError(timeError)
      return
    }

    onAddSession({
      title: newSession.title,
      timeSlot: {
        start: new Date(`2024-01-01T${newSession.start}`),
        end: new Date(`2024-01-01T${newSession.end}`)
      }
    })

    setNewSession({ title: '', start: '', end: '' })
    setError('')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Session
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Session</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Session Title</Label>
            <Input
              value={newSession.title}
              onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
              placeholder="Enter session title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input
                type="time"
                value={newSession.start}
                onChange={(e) => setNewSession({ ...newSession, start: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>End Time</Label>
              <Input
                type="time"
                value={newSession.end}
                onChange={(e) => setNewSession({ ...newSession, end: e.target.value })}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <Button className="w-full" onClick={handleSubmit}>
            <Clock className="mr-2 h-4 w-4" />
            Schedule Session
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}