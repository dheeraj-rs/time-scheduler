"use client"

import { useState } from 'react'
import { sampleSpeakers } from '@/lib/sample-data'
import { Card } from "@/components/ui/card"

export default function SpeakersPage() {
  const [speakers] = useState(sampleSpeakers)

  if (!speakers) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Speakers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {speakers.map((speaker) => (
          <Card key={speaker.id} className="p-4">
            <h2 className="font-semibold">{speaker.name}</h2>
            <p className="text-sm text-muted-foreground">{speaker.bio}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}