"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import { useRouter } from 'next/navigation'
import { sampleHalls } from "@/lib/sample-data"

interface HallListProps {
  searchQuery: string
}

export function HallList({ searchQuery }: HallListProps) {
  const router = useRouter()
  const filteredHalls = sampleHalls.filter(hall =>
    hall.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hall.stages.some(stage => stage.name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="space-y-4">
      {filteredHalls.map(hall => (
        <Card 
          key={hall.id} 
          className="overflow-hidden cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={() => router.push(`/admin/programs/${hall.id}`)}
        >
          <div className="p-4">
            <div className="flex gap-4">
              <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={hall.imageUrl || '/images/placeholder-hall.jpg'}
                  alt={hall.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{hall.name}</h3>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Capacity: {hall.capacity} people
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {hall.stages.map(stage => (
                    <span 
                      key={stage.id} 
                      className="text-xs bg-secondary px-2 py-1 rounded-full"
                    >
                      {stage.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
} 