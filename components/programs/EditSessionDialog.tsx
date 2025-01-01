"use client"

import { Session } from "@/app/types/program"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Save, AlertCircle } from "lucide-react"
import { isBreakTime } from "@/lib/utils/time"

interface EditSessionDialogProps {
  session: Session
  allSessions: Session[]
  children: React.ReactNode
  onSave: (session: Session, adjustedSessions: Session[]) => void
}

export function EditSessionDialog({ 
  session, 
  allSessions, 
  children, 
  onSave 
}: EditSessionDialogProps) {
  const [editedSession, setEditedSession] = useState({
    title: session.title,
    start: session.timeSlot.start.toTimeString().slice(0, 5),
    end: session.timeSlot.end.toTimeString().slice(0, 5)
  })
  const [error, setError] = useState<string>("")

  const calculateTimeAdjustments = (
    originalEnd: Date,
    newEnd: Date,
    affectedSessions: Session[]
  ): Session[] => {
    const timeDifference = newEnd.getTime() - originalEnd.getTime()
    
    return affectedSessions.map(session => {
      const adjustedStart = new Date(session.timeSlot.start.getTime() + timeDifference)
      const adjustedEnd = new Date(session.timeSlot.end.getTime() + timeDifference)

      // Check if adjusted time would fall in break time
      if (isBreakTime(adjustedStart) || isBreakTime(adjustedEnd)) {
        // If break time, shift to after the break
        const breakEndHour = isBreakTime(adjustedStart) ? 13 : 19
        const timeShift = (breakEndHour - adjustedStart.getHours()) * 60 * 60 * 1000
        
        return {
          ...session,
          timeSlot: {
            start: new Date(adjustedStart.getTime() + timeShift),
            end: new Date(adjustedEnd.getTime() + timeShift)
          }
        }
      }

      return {
        ...session,
        timeSlot: {
          start: adjustedStart,
          end: adjustedEnd
        }
      }
    })
  }

  const handleSubmit = () => {
    const newStart = new Date(`2024-01-01T${editedSession.start}`)
    const newEnd = new Date(`2024-01-01T${editedSession.end}`)
    const originalEnd = session.timeSlot.end

    // Validate new time slot
    if (newStart >= newEnd) {
      setError("End time must be after start time")
      return
    }

    if (isBreakTime(newStart) || isBreakTime(newEnd)) {
      setError("Cannot schedule during break times (12-13 or 18-19)")
      return
    }

    // Find sessions that need to be adjusted
    const subsequentSessions = allSessions
      .filter(s => s.id !== session.id && 
                  s.timeSlot.start >= originalEnd)
      .sort((a, b) => a.timeSlot.start.getTime() - b.timeSlot.start.getTime())

    // Calculate adjusted times for subsequent sessions
    const adjustedSessions = calculateTimeAdjustments(
      originalEnd,
      newEnd,
      subsequentSessions
    )

    const updatedSession = {
      ...session,
      title: editedSession.title,
      timeSlot: {
        start: newStart,
        end: newEnd
      }
    }

    onSave(updatedSession, adjustedSessions)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Session</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Session Title</Label>
            <Input
              id="title"
              value={editedSession.title}
              onChange={(e) => setEditedSession({ ...editedSession, title: e.target.value })}
              placeholder="Enter session title"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start">Start Time</Label>
              <Input
                id="start"
                type="time"
                value={editedSession.start}
                onChange={(e) => setEditedSession({ ...editedSession, start: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">End Time</Label>
              <Input
                id="end"
                type="time"
                value={editedSession.end}
                onChange={(e) => setEditedSession({ ...editedSession, end: e.target.value })}
              />
            </div>
          </div>
          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
        </div>
        <Button className="w-full" onClick={handleSubmit}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  )
} 