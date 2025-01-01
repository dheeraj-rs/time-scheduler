"use client"

import { useState, Suspense } from 'react'
import { StageSelector } from '@/components/schedule/StageSelector'
import { ScheduleTimeline } from '@/components/schedule/ScheduleTimeline'
import { SpecialGuestList } from '@/components/schedule/SpecialGuestList'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ScheduleDashboard() {
  const [selectedStage, setSelectedStage] = useState<string>('')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Schedule Overview</h1>
      </div>

      <StageSelector onStageSelect={setSelectedStage} />

      <Tabs defaultValue="timeline" className="mt-6">
        <TabsList>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="special-guests">Special Guests</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <Card className="p-6">
            <Suspense fallback={<div>Loading timeline...</div>}>
              <ScheduleTimeline stageId={selectedStage} />
            </Suspense>
          </Card>
        </TabsContent>

        <TabsContent value="special-guests">
          <Card className="p-6">
            <Suspense fallback={<div>Loading guests...</div>}>
              <SpecialGuestList stageId={selectedStage} />
            </Suspense>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}