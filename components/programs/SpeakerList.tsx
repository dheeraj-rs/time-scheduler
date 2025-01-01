"use client"

import { Session, Speaker } from '@/app/types/program'
import { Card } from "@/components/ui/card"
import { Clock } from "lucide-react"

interface SpeakerListProps {
  sessions: Session[]
  editMode?: boolean
}

export function SpeakerList({ sessions, editMode }: SpeakerListProps) {
  // Get unique speakers from all sessions
  const speakers = Array.from(
    new Set(
      sessions.flatMap(session => session.speakers)
        .filter((speaker): speaker is Speaker => speaker !== undefined)
    )
  )

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {speakers.length === 0 ? (
          <p className="text-muted-foreground text-center">No speakers assigned</p>
        ) : (
          speakers.map((speaker) => (
            <div key={speaker.id} className="p-4 rounded-lg border bg-card">
              <h3 className="font-medium">{speaker.name}</h3>
              <div className="mt-2 text-sm text-muted-foreground">
                {sessions
                  .filter(session => session.speakers.some(sp => sp.id === speaker.id))
                  .map(session => (
                    <div key={session.id} className="flex items-center mt-1">
                      <Clock className="mr-2 h-4 w-4" />
                      {session.title} ({session.timeSlot.start.toLocaleTimeString()} - {session.timeSlot.end.toLocaleTimeString()})
                    </div>
                  ))}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}