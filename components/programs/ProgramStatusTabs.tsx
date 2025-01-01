import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, CheckCircle } from "lucide-react"
import { format } from "date-fns"
import { Program } from "@/types/program"
import Link from "next/link"

interface ProgramStatusTabsProps {
  programs: Program[]
}

export function ProgramStatusTabs({ programs }: ProgramStatusTabsProps) {
  const now = new Date()

  const currentPrograms = programs.filter(program => {
    const programDate = new Date(program.date)
    return programDate.toDateString() === now.toDateString()
  })

  const upcomingPrograms = programs.filter(program => {
    const programDate = new Date(program.date)
    return programDate > now
  })

  const endedPrograms = programs.filter(program => {
    const programDate = new Date(program.date)
    return programDate < now && programDate.toDateString() !== now.toDateString()
  })

  const ProgramList = ({ programs, emptyMessage }: { programs: Program[], emptyMessage: string }) => (
    <div className="space-y-4">
      {programs.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">{emptyMessage}</p>
      ) : (
        programs.map((program) => (
          <Card key={program.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{program.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(program.date), 'PPP')}
                </div>
              </div>
              <Link 
                href={`/admin/programs/${program.id}`}
                className="text-sm text-primary hover:underline"
              >
                Manage
              </Link>
            </div>
          </Card>
        ))
      )}
    </div>
  )

  return (
    <Tabs defaultValue="current" className="w-full">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="current" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Current
          {currentPrograms.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {currentPrograms.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="upcoming" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Upcoming
          {upcomingPrograms.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {upcomingPrograms.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="ended" className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          Ended
          {endedPrograms.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {endedPrograms.length}
            </Badge>
          )}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="current">
        <ProgramList 
          programs={currentPrograms} 
          emptyMessage="No programs running today" 
        />
      </TabsContent>
      <TabsContent value="upcoming">
        <ProgramList 
          programs={upcomingPrograms} 
          emptyMessage="No upcoming programs" 
        />
      </TabsContent>
      <TabsContent value="ended">
        <ProgramList 
          programs={endedPrograms} 
          emptyMessage="No ended programs" 
        />
      </TabsContent>
    </Tabs>
  )
} 