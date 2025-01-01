"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sampleHalls } from "@/lib/sample-data"

interface StageSelectorProps {
  onStageSelect: (stageId: string) => void
}

export function StageSelector({ onStageSelect }: StageSelectorProps) {
  const stages = sampleHalls.flatMap(hall => hall.stages)

  return (
    <Select onValueChange={onStageSelect}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a stage" />
      </SelectTrigger>
      <SelectContent>
        {stages.map(stage => (
          <SelectItem key={stage.id} value={stage.id}>
            {stage.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}