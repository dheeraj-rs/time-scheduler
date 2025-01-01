"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Phone, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Speaker } from "@/types/program"
interface SpeakerProfileProps {
  speaker: Speaker
}

export function SpeakerProfile({ speaker }: SpeakerProfileProps) {
  return (
    <div>
      <div className="header">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/speakers">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1>{speaker.name}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4" />
              {speaker.email}
            </div>
            {speaker.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4" />
                {speaker.phone}
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Availability</h2>
          <div className="space-y-2">
            {speaker.availability.length > 0 ? (
              speaker.availability.map((slot, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  {slot.start.toLocaleTimeString()} - {slot.end.toLocaleTimeString()}
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No availability set</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}