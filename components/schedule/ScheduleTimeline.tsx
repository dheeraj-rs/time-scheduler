"use client"

import { samplePrograms } from "@/lib/sample-data"
import { Card } from "@/components/ui/card"
import { format } from "date-fns"

interface ScheduleTimelineProps {
  stageId: string
}

export function ScheduleTimeline({ stageId }: ScheduleTimelineProps) {
  const stagePrograms = samplePrograms.filter(program => program.stageId === stageId)

  if (!stageId) {
    return <div className="text-muted-foreground">Select a stage to view schedule</div>
  }

  return (
    <div className="space-y-4">
      {stagePrograms.map(program => (
        <Card key={program.id} className="p-4">
          <h3 className="font-medium">{program.title}</h3>
          <div className="text-sm text-muted-foreground mt-1">
            {format(program.sessions[0]?.timeSlot.start || new Date(), 'HH:mm')} - 
            {format(program.sessions[0]?.timeSlot.end || new Date(), 'HH:mm')}
          </div>
        </Card>
      ))}
    </div>
  )
}