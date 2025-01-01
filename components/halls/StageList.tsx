import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Users } from "lucide-react"
import Link from "next/link"
import { Stage } from "@/types/venue"

interface StageListProps {
  stages: Stage[]
  hallId: string
  searchQuery: string
}

export function StageList({ stages, hallId, searchQuery }: StageListProps) {
  const filteredStages = stages.filter((stage: Stage) =>
    stage.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-3">
      {filteredStages.map(stage => (
        <Card key={stage.id} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{stage.name}</h4>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  Capacity: {stage.capacity}
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  Programs: {stage.programs?.length || 0}
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/halls/${hallId}/stages/${stage.id}`}>
                View Details
              </Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
} 