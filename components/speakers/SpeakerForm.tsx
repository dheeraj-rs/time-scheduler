"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TimeRangeSelector } from './TimeRangeSelector'

export function SpeakerForm() {
  const router = useRouter()
  const [availability, setAvailability] = useState<{ start: string; end: string }[]>([])

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Enter speaker's name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter email address" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" placeholder="Enter phone number" />
        </div>

        <div className="space-y-2">
          <Label>Availability</Label>
          <TimeRangeSelector 
            availability={availability}
            onChange={setAvailability}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Add Speaker</Button>
        </div>
      </form>
    </Card>
  )
}