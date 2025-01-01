"use client"

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import type { Speaker } from '@/types/program'

interface SpeakerDetailClientProps {
  initialSpeaker: Speaker
}

export function SpeakerDetailClient({ initialSpeaker }: SpeakerDetailClientProps) {
  const [speaker] = useState(initialSpeaker)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{speaker.name}</h1>
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold">Bio</h2>
            <p className="text-muted-foreground">{speaker.bio}</p>
          </div>
          <div>
            <h2 className="font-semibold">Contact</h2>
            <p className="text-muted-foreground">{speaker.email}</p>
          </div>
        </div>
      </Card>
    </div>
  )
} 