"use client"

import { Session } from '@/app/types/program'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Trash2, Edit2 } from "lucide-react"
import { format } from 'date-fns'
import { EditSessionDialog } from './EditSessionDialog'

interface SessionListProps {
  sessions: Session[]
  editMode: boolean
  onUpdateSession: (sessionId: string, session: Session, adjustedSessions: Session[]) => void
  onDeleteSession: (sessionId: string) => void
}

export function SessionList({ 
  sessions, 
  editMode,
  onUpdateSession,
  onDeleteSession 
}: SessionListProps) {
  const handleSessionUpdate = (sessionId: string, updatedSession: Session, adjustedSessions: Session[]) => {
    onUpdateSession(sessionId, updatedSession, adjustedSessions)
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Card key={session.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{session.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Clock className="mr-2 h-4 w-4" />
                {format(session.timeSlot.start, 'HH:mm')} - 
                {format(session.timeSlot.end, 'HH:mm')}
              </div>
            </div>
            {editMode && (
              <div className="flex gap-2">
                <EditSessionDialog
                  session={session}
                  allSessions={sessions}
                  onSave={(updated, adjusted) => handleSessionUpdate(session.id, updated, adjusted)}
                >
                  <Button size="sm" variant="ghost">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </EditSessionDialog>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => onDeleteSession(session.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}