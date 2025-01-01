import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { 
  MapPin, 
  Clock, 
  ArrowUpRight,
  Store,
  Users
} from "lucide-react"

interface HallDetailsModalProps {
  hall: any;
  isOpen: boolean;
  onClose: () => void;
}

export function HallDetailsModal({ hall, isOpen, onClose }: HallDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <div className="flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-4">{hall.name}</h2>
          
          <Tabs defaultValue="overview" className="flex-1">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="programs">Running Programs</TabsTrigger>
              <TabsTrigger value="stalls">Stall Layout</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[calc(80vh-180px)] mt-4">
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Users className="h-4 w-4" />
                      Current Occupancy
                    </div>
                    <Progress value={75} className="h-2 mb-2" />
                    <div className="flex justify-between text-sm">
                      <span>750/1000 people</span>
                      <span className="text-primary">75%</span>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Store className="h-4 w-4" />
                      Stall Occupancy
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-2xl font-bold">{hall.stages[0].totalStalls}</span>
                        <span className="text-muted-foreground ml-2">Total</span>
                      </div>
                      <div>
                        <span className="text-2xl font-bold text-primary">{hall.stages[0].availableStalls}</span>
                        <span className="text-muted-foreground ml-2">Available</span>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Stall Categories</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {hall.stallCategories.map((category: any) => (
                      <Card key={category.id} className="p-4">
                        <div className={`w-4 h-4 rounded-full mb-2 ${category.color}`} />
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Base Price: AED {category.basePrice}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="programs" className="space-y-6">
                {hall.currentPrograms.map((program: any) => (
                  <Card key={program.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{program.name}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {program.stage}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Running Now
                          </div>
                        </div>
                        <Progress 
                          value={(program.attendees / program.capacity) * 100} 
                          className="h-2 mt-4" 
                        />
                        <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                          <span>{program.attendees} attending</span>
                          <span>{program.capacity} capacity</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/programs/${program.id}`}>
                          View Details
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="stalls" className="space-y-6">
                {hall.stages.map((stage: any) => (
                  <Card key={stage.id} className="p-4">
                    <h3 className="font-medium mb-4">{stage.name}</h3>
                    <div className="grid grid-cols-5 gap-2">
                      {Array.from({ length: stage.totalStalls }).map((_, index) => (
                        <div
                          key={index}
                          className={`aspect-square rounded-md border ${
                            index < (stage.totalStalls - stage.availableStalls)
                              ? 'bg-primary/10 border-primary'
                              : 'bg-muted border-border'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                      <span>{stage.availableStalls} stalls available</span>
                      <span>{stage.totalStalls - stage.availableStalls} stalls occupied</span>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
} 