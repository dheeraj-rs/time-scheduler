"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ProgramCalendar } from "@/components/programs/ProgramCalendar"
import { HallList } from "@/components/halls/HallList"
import { AddHallDialog } from "@/components/halls/AddHallDialog"
import { samplePrograms, sampleHalls } from "@/lib/sample-data"

export default function Programs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h1>Programs</h1>
            <p className="text-sm text-muted-foreground">
              Manage halls and view program schedules
            </p>
          </div>
          <AddHallDialog halls={sampleHalls}>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" /> New Hall
            </Button>
          </AddHallDialog>
        </div>

        <div className="flex flex-col gap-4">
        <Card className="p-4">
            <ProgramCalendar 
              programs={samplePrograms}
              onDateSelect={setSelectedDate}
              selectedDate={selectedDate}
              limitedDays={[28, 29, 30]}
            />
          </Card>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search halls or stages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          
          
        </div>
      </div>

      <div className="mt-6">
        <HallList searchQuery={searchQuery} />
      </div>
    </div>
  )
}