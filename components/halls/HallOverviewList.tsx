import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Users, Store } from "lucide-react"
import { Hall } from "@/types/hall"

interface HallOverviewListProps {
  halls: Hall[]
  onHallSelect: (hall: Hall) => void
  selectedHallId: number | null
}

export function HallOverviewList({ halls, onHallSelect, selectedHallId }: HallOverviewListProps) {
  return (
    <div className="space-y-4">
      {halls.map((hall) => (
        <Card 
          key={hall.id}
          className={`p-4 cursor-pointer transition-all hover:shadow-md ${
            selectedHallId === hall.id ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => onHallSelect(hall)}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                <h3 className="font-medium">{hall.name}</h3>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Capacity: {hall.capacity}
                </div>
                <div className="flex items-center gap-1">
                  <Store className="h-4 w-4" />
                  Stalls: {hall.stallCategories.length}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              View Details
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
} 