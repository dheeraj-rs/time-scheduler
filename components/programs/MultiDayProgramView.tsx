import { useState } from 'react'
import { Program, Hall, Stage } from '@/app/types/program'
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format, addDays, isSameDay } from 'date-fns'
import { Calendar, Clock, MapPin, Users, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface MultiDayProgramViewProps {
  startDate: Date
  programs: Program[]
  halls: Hall[]
}

export function MultiDayProgramView({ startDate, programs, halls }: MultiDayProgramViewProps) {
  const [selectedDate, setSelectedDate] = useState(startDate)
  const dates = [startDate, addDays(startDate, 1), addDays(startDate, 2)]

  const getProgramsByDate = (date: Date) => {
    return programs.filter(program => isSameDay(new Date(program.date), date))
  }

  const getLivePrograms = (datePrograms: Program[]) => {
    return datePrograms.filter(program => program.status === 'live')
  }

  const getUpcomingPrograms = (datePrograms: Program[]) => {
    return datePrograms.filter(program => program.status === 'upcoming')
  }

  const getEndedPrograms = (datePrograms: Program[]) => {
    return datePrograms.filter(program => program.status === 'ended')
  }

  const getHallName = (hallId: string) => {
    return halls.find(hall => hall.id === hallId)?.name || 'Unknown Hall'
  }

  const getStageName = (hallId: string, stageId: string) => {
    const hall = halls.find(h => h.id === hallId)
    return hall?.stages.find(s => s.id === stageId)?.name || 'Unknown Stage'
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        {dates.map(date => (
          <Button
            key={date.toISOString()}
            variant={isSameDay(date, selectedDate) ? "default" : "outline"}
            onClick={() => setSelectedDate(date)}
            className="flex-1"
          >
            {format(date, 'dd/MM/yyyy')}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Programs */}
        <Card className="p-4">
          <h2 className="font-semibold mb-4 flex items-center">
            <Clock className="mr-2 h-4 w-4 text-red-500" />
            Live Now
          </h2>
          <div className="space-y-4">
            {getLivePrograms(getProgramsByDate(selectedDate)).map(program => (
              <ProgramCard
                key={program.id}
                program={program}
                hallName={getHallName(program.hallId)}
                stageName={getStageName(program.hallId, program.stageId)}
              />
            ))}
          </div>
        </Card>

        {/* Upcoming Programs */}
        <Card className="p-4">
          <h2 className="font-semibold mb-4 flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-blue-500" />
            Upcoming Today
          </h2>
          <div className="space-y-4">
            {getUpcomingPrograms(getProgramsByDate(selectedDate)).map(program => (
              <ProgramCard
                key={program.id}
                program={program}
                hallName={getHallName(program.hallId)}
                stageName={getStageName(program.hallId, program.stageId)}
              />
            ))}
          </div>
        </Card>

        {/* Ended Programs */}
        <Card className="p-4">
          <h2 className="font-semibold mb-4 flex items-center">
            <Clock className="mr-2 h-4 w-4 text-gray-500" />
            Completed
          </h2>
          <div className="space-y-4">
            {getEndedPrograms(getProgramsByDate(selectedDate)).map(program => (
              <ProgramCard
                key={program.id}
                program={program}
                hallName={getHallName(program.hallId)}
                stageName={getStageName(program.hallId, program.stageId)}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function ProgramCard({ program, hallName, stageName }: { 
  program: Program
  hallName: string
  stageName: string
}) {
  return (
    <Card className="p-4 hover:border-primary transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{program.title}</h3>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/programs/detail/${program.id}`}>
            Manage
          </Link>
        </Button>
      </div>
      
      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4" />
          {hallName} - {stageName}
        </div>
        <div className="flex items-center">
          <Users className="mr-2 h-4 w-4" />
          {program.speakers.length} speakers
        </div>
        <div className="flex items-center">
          <Ticket className="mr-2 h-4 w-4" />
          ${program.ticketPrice}
        </div>
      </div>
    </Card>
  )
} 