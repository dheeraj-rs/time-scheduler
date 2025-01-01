"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X } from "lucide-react"

interface TimeRangeSelectorProps {
  availability: { start: string; end: string }[]
  onChange: (value: { start: string; end: string }[]) => void
}

export function TimeRangeSelector({ availability, onChange }: TimeRangeSelectorProps) {
  const addTimeSlot = () => {
    onChange([...availability, { start: '', end: '' }])
  }

  const removeTimeSlot = (index: number) => {
    onChange(availability.filter((_, i) => i !== index))
  }

  const updateTimeSlot = (index: number, field: 'start' | 'end', value: string) => {
    const newAvailability = [...availability]
    newAvailability[index] = { ...newAvailability[index], [field]: value }
    onChange(newAvailability)
  }

  return (
    <div className="space-y-4">
      {availability.map((slot, index) => (
        <div key={index} className="flex gap-4 items-center">
          <Input
            type="time"
            value={slot.start}
            onChange={(e) => updateTimeSlot(index, 'start', e.target.value)}
          />
          <span>to</span>
          <Input
            type="time"
            value={slot.end}
            onChange={(e) => updateTimeSlot(index, 'end', e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeTimeSlot(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addTimeSlot}>
        <Plus className="mr-2 h-4 w-4" />
        Add Time Slot
      </Button>
    </div>
  )
}