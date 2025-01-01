"use client"

import { useState } from 'react'
import { Program, Session } from '@/app/types/program'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Edit2, Plus, Save, Users, Tag } from "lucide-react"
import { format } from 'date-fns'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { AddSessionDialog } from '@/components/programs/AddSessionDialog'
import { SpeakerList } from '@/components/programs/SpeakerList'

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

  const handleUpdateSession = (sessionId: string, updatedSession: Session, adjustedSessions: Session[]) => {
    setProgram(prev => ({
      ...prev,
      sessions: prev.sessions.map(session => {
        if (session.id === sessionId) return updatedSession
        const adjustedSession = adjustedSessions.find(adj => adj.id === session.id)
        return adjustedSession || session
      })
    }))
  }

  const handleDeleteSession = (sessionId: string) => {
    setProgram(prev => ({
      ...prev,
      sessions: prev.sessions.filter(session => session.id !== sessionId)
    }))
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(sessions)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setSessions(items)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">{program.title}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {format(program.dateRange.startDate, 'dd/MM/yyyy')} - {format(program.dateRange.endDate, 'dd/MM/yyyy')}
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                {program.venue.name}
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                {program.currentAttendees}/{program.maxAttendees} Attendees
              </div>
              <div className="flex items-center">
                <Tag className="mr-2 h-4 w-4" />
                {program.categories.join(', ')}
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
            <TabsTrigger value="details">Details</TabsTrigger>
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
                        isDragDisabled={!editMode}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-4"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{session.title}</h3>
                                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <Clock className="mr-2 h-4 w-4" />
                                    {format(session.timeSlot.start, 'HH:mm')} - {format(session.timeSlot.end, 'HH:mm')}
                                  </div>
                                  <div className="flex items-center">
                                    <Users className="mr-2 h-4 w-4" />
                                    {session.ticketsSold}/{session.capacity}
                                  </div>
                                </div>
                              </div>
                              {editMode && (
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleDeleteSession(session.id)}
                                >
                                  Delete
                                </Button>
                              )}
                            </div>
                          </Card>
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
              speakers={program.speakers}
              editMode={editMode}
            />
          </TabsContent>

          <TabsContent value="details">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{program.description}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <p>Email: {program.contactInfo.email}</p>
                  <p>Phone: {program.contactInfo.phone}</p>
                  {program.contactInfo.website && (
                    <p>Website: {program.contactInfo.website}</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Venue Details</h3>
                <div className="space-y-2 text-sm">
                  <p>{program.venue.name}</p>
                  <p className="text-muted-foreground">{program.venue.address}</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}