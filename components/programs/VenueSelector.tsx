"use client"

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { venues } from '@/lib/sample-venues'

interface VenueSelectorProps {
  onVenueChange: (venueId: string, hallId: string, stageId: string) => void
}

export function VenueSelector({ onVenueChange }: VenueSelectorProps) {
  const [selectedVenue, setSelectedVenue] = useState<string>('')
  const [selectedHall, setSelectedHall] = useState<string>('')

  const venue = venues.find(v => v.id.toString() === selectedVenue)
  const hall = venue?.halls.find(h => h.id === selectedHall)

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Venue</Label>
        <Select
          value={selectedVenue}
          onValueChange={(value) => {
            setSelectedVenue(value)
            setSelectedHall('')
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select venue" />
          </SelectTrigger>
          <SelectContent>
            {venues.map((venue) => (
              <SelectItem key={venue.id} value={venue.id.toString()}>
                {venue.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedVenue && (
        <div className="space-y-2">
          <Label>Hall</Label>
          <Select
            value={selectedHall}
            onValueChange={setSelectedHall}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select hall" />
            </SelectTrigger>
            <SelectContent>
              {venue?.halls.map((hall) => (
                <SelectItem key={hall.id} value={hall.id.toString()}>
                  {hall.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedHall && (
        <div className="space-y-2">
          <Label>Stage</Label>
          <Select
            onValueChange={(stageId) => onVenueChange(selectedVenue, selectedHall, stageId)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              {hall?.stages.map((stage) => (
                <SelectItem key={stage.id} value={stage.id.toString()}>
                  {stage.name} (Capacity: {stage.capacity})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}