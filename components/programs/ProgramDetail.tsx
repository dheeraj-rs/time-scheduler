"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Edit2, Plus, Save } from "lucide-react"
import { SpeakerList } from './SpeakerList'
import { AddSessionDialog } from './AddSessionDialog'
import { format } from 'date-fns'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { Program } from '@/types/program'
import { Session } from '@/types/program'

interface ProgramDetailProps {
  program: Program
}

export function ProgramDetail({ program: initialProgram }: ProgramDetailProps) {
  const [program, setProgram] = useState(initialProgram)
  const [editMode, setEditMode] = useState(false)
  const [sessions, setSessions] = useState(program.sessions)

  const handleAddSession = (newSession: Session) => {
    setProgram(prev => ({
      ...prev,
      sessions: [...prev.sessions, newSession]
    }))
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(sessions)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setSessions(items)
  }

  return (
    <div>
      <div className="header">
        <div>
          <h1>{program.title}</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center">
  <Calendar className="mr-2 h-4 w-4" />
  {format(new Date(program.date), 'dd/MM/yyyy')}
</div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              {program.venue}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setEditMode(!editMode)}>
            {editMode ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Program
              </>
            )}
          </Button>
          {editMode && (
            <AddSessionDialog onAddSession={handleAddSession}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Session
              </Button>
            </AddSessionDialog>
          )}
        </div>
      </div>

      <Tabs defaultValue="schedule" className="mt-6">
        <TabsList>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="speakers">Speakers</TabsTrigger>
        </TabsList>
        <TabsContent value="schedule">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sessions">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {sessions.map((session, index) => (
                    <Draggable 
                      key={session.id} 
                      draggableId={session.id} 
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {/* Existing session card content */}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </TabsContent>
        <TabsContent value="speakers">
          <SpeakerList 
            sessions={program.sessions}
            editMode={editMode}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}