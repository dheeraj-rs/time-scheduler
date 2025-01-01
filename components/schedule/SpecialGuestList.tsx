"use client"

import { samplePrograms } from "@/lib/sample-data"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SpecialGuestListProps {
  stageId: string
}

export function SpecialGuestList({ stageId }: SpecialGuestListProps) {
  const stagePrograms = samplePrograms.filter(program => program.stageId === stageId)
  const specialGuests = stagePrograms
    .flatMap(program => program.speakers)
    .filter(speaker => speaker.specialGuest)

  if (!stageId) {
    return <div className="text-muted-foreground">Select a stage to view special guests</div>
  }

  return (
    <div className="space-y-4">
      {specialGuests.map(guest => (
        <Card key={guest.id} className="p-4 flex items-center gap-4">
          <Avatar>
            <AvatarImage src={guest.image} alt={guest.name} />
            <AvatarFallback>{guest.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{guest.name}</h3>
            <p className="text-sm text-muted-foreground">{guest.bio}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}