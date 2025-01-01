"use client"

import { useState, useEffect } from 'react'
import { use } from 'react'
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ProgramCalendar } from "@/components/programs/ProgramCalendar"
import { MultiDayProgramView } from "@/components/programs/MultiDayProgramView"
import { AddProgramDialog } from "@/components/programs/AddProgramDialog"
import Link from 'next/link'
import { Hall } from '@/types/program'
import { Alert, AlertDescription } from "@/components/ui/alert"

interface HallProgramsPageProps {
  params: Promise<{
    hallId: string
  }>
}

export default function HallProgramsPage({ params }: HallProgramsPageProps) {
  const { hallId } = use(params)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [hall, setHall] = useState<Hall | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHallData = async () => {
      try {
        const mockHall: Hall = {
          id: hallId,
          name: "Main Hall",
          capacity: 500,
          address: "123 Main Street",
          description: "Main exhibition hall with multiple stages",
          price: 1000,
          venueId: 1,
          venue:'',
          facilities: ["WiFi", "Parking"],
          dimensions: { width: 1000, height: 800 },
          stallCategories: [],
          stages: [
            { id: "stage1", name: "Stage 1" },
            { id: "stage2", name: "Stage 2" }
          ]
        }
        
        setHall(mockHall)
      } catch (err) {
        setError("Failed to load hall data")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHallData()
  }, [hallId])

  if (isLoading) {
    return <div className="p-4">Loading...</div>
  }

  if (error || !hall) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {error || "Hall not found"}
          <Button variant="link" asChild className="pl-0">
            <Link href="/admin/programs">Return to Programs</Link>
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link 
              href="/admin/programs"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Programs
            </Link>
            <span className="text-muted-foreground">/</span>
            <h1>{hall.name}</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage programs and schedules for {hall.name}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/admin/programs/${hallId}/edit`}>
              Edit Hall
            </Link>
          </Button>
          <AddProgramDialog hallId={hallId}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Program
            </Button>
          </AddProgramDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-3 p-4">
          <ProgramCalendar 
            programs={[]} // Pass your filtered programs here
            onDateSelect={setSelectedDate}
            selectedDate={selectedDate}
          />
        </Card>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Stages</h2>
            </div>
            <div className="space-y-2">
              {hall.stages.map((stage) => (
                <Button
                  key={stage.id}
                  variant="outline"
                  className="w-full justify-start"
                >
                  {stage.name}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <MultiDayProgramView
        startDate={selectedDate}
        programs={[]} // Pass your filtered programs here
        halls={[hall]}
      />
    </div>
  )
}