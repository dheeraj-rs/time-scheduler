"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { sampleSpeakers } from "@/lib/sample-data"

export default function SpeakersPage() {
  return (
    <div>
      <div className="header">
        <h1>Speakers</h1>
        <Button asChild>
          <Link href="/admin/speakers/new">
            <Plus className="mr-2 h-4 w-4" /> New Speaker
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleSpeakers.map((speaker) => (
          <Card key={speaker.id} className="p-6">
            <h3 className="text-lg font-semibold mb-4">{speaker.name}</h3>
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                {speaker.email}
              </div>
              {speaker.phone && (
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  {speaker.phone}
                </div>
              )}
            </div>
            <Button variant="outline" size="sm" asChild className="w-full">
              <Link href={`/admin/speakers/${speaker.id}`}>View Profile</Link>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}