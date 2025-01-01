import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { 
  MapPin, 
  Clock, 
  ArrowUpRight,
  Store,
  Users,
  Search,
  X,
  Maximize2,
  Minimize2
} from "lucide-react"
import { useState } from "react"
import { Hall } from "@/types/hall"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface HallDetailsModalProps {
  halls: Hall[];
  selectedHall: Hall | null;
  onHallSelect: (hall: Hall) => void;
  isOpen: boolean;
  onClose: () => void;
}

function getStallStatus(stage: any, index: number): 'available' | 'booked' | 'pending' | 'cancelled' {
  const bookedCount = stage.totalStalls - stage.availableStalls;
  
  if (index < bookedCount * 0.7) return 'booked';
  if (index < bookedCount * 0.85) return 'pending';
  if (index < bookedCount) return 'cancelled';
  return 'available';
}

export function HallDetailsModal({ 
  halls = [],
  selectedHall, 
  onHallSelect, 
  isOpen, 
  onClose 
}: HallDetailsModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [fullScreen, setFullScreen] = useState(false);
  const [stallFilter, setStallFilter] = useState('all'); // 'all' | 'available' | 'booked' | 'pending' | 'cancelled'
  const [stageFilter, setStageFilter] = useState('all');

  const filteredHalls = (halls || []).filter(hall => 
    hall.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={onClose}
      className={fullScreen ? "fixed inset-0 z-50" : ""}
    >
      <DialogContent 
        className={`
          ${fullScreen ? 'w-screen h-screen max-w-none m-0 rounded-none' : 'max-w-5xl h-[90vh]'}
        `}
      >
        <DialogTitle className="sr-only">
          {selectedHall ? `${selectedHall.name} Details` : 'Hall Management'}
        </DialogTitle>

        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold">
                {selectedHall ? selectedHall.name : 'Hall Management'}
              </h2>
              {selectedHall && (
                <p className="text-sm text-muted-foreground mt-1">
                  Capacity: {selectedHall.capacity} | Stages: {selectedHall.stages?.length || 0}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setFullScreen(!fullScreen)}
              className="ml-auto"
            >
              {fullScreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </div>

          <Tabs defaultValue="overview" className="flex-1">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="programs">Running Programs</TabsTrigger>
              <TabsTrigger value="stalls">Stall Layout</TabsTrigger>
            </TabsList>

            <div className={`h-[calc(${fullScreen ? '100vh' : '90vh'}-180px)] mt-4`}>
              <TabsContent value="overview" className="h-full">
                <div className={`grid grid-cols-12 gap-6 h-full ${
                  fullScreen ? 'max-w-7xl mx-auto' : ''
                }`}>
                  {/* Left Side - Hall List */}
                  <div className="col-span-5 border rounded-lg p-4">
                    <div className="relative mb-4">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search halls..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                    
                    <ScrollArea className={`h-[calc(${fullScreen ? '100vh' : '80vh'}-300px)]`}>
                      <div className="space-y-3">
                        {filteredHalls.map((hall) => (
                          <Card 
                            key={hall.id}
                            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                              selectedHall?.id === hall.id ? 'ring-2 ring-primary' : ''
                            }`}
                            onClick={() => onHallSelect(hall)}
                          >
                            <div className="space-y-2">
                              <h3 className="font-medium">{hall.name}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {hall.capacity || 0}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Store className="h-4 w-4" />
                                  {hall.stallCategories?.length || 0} categories
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Right Side - Selected Hall Details */}
                  <div className="col-span-7">
                    {selectedHall ? (
                      <ScrollArea className="h-[calc(80vh-300px)]">
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <Card className="p-4">
                              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                <Users className="h-4 w-4" />
                                Current Occupancy
                              </div>
                              <Progress 
                                value={(selectedHall.currentOccupancy || 0) / (selectedHall.maxOccupancy || 1) * 100} 
                                className="h-2 mb-2" 
                              />
                              <div className="flex justify-between text-sm">
                                <span>{selectedHall.currentOccupancy || 0}/{selectedHall.maxOccupancy || 0} people</span>
                                <span className="text-primary">
                                  {Math.round((selectedHall.currentOccupancy || 0) / (selectedHall.maxOccupancy || 1) * 100)}%
                                </span>
                              </div>
                            </Card>

                            <Card className="p-4">
                              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                <Store className="h-4 w-4" />
                                Stall Occupancy
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-2xl font-bold">
                                    {selectedHall.stallCategories?.length || 0}
                                  </span>
                                  <span className="text-muted-foreground ml-2">
                                    Categories
                                  </span>
                                </div>
                                <div>
                                  <span className="text-2xl font-bold text-primary">
                                    {selectedHall.stallCategories?.reduce((sum, cat) => sum + (cat.basePrice || 0), 0) || 0}
                                  </span>
                                  <span className="text-muted-foreground ml-2">
                                    Total Base
                                  </span>
                                </div>
                              </div>
                            </Card>
                          </div>

                          <div className="space-y-4">
                            <h3 className="font-semibold">Stall Categories</h3>
                            <div className="grid grid-cols-2 gap-4">
                              {selectedHall.stallCategories?.map((category) => (
                                <Card key={category.id} className="p-4">
                                  <div className={`w-4 h-4 rounded-full mb-2 ${category.color || 'bg-gray-200'}`} />
                                  <div className="font-medium">{category.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    Base Price: AED {category.basePrice || 0}
                                  </div>
                                </Card>
                              )) || (
                                <div className="col-span-2 text-center text-muted-foreground py-4">
                                  No stall categories defined
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                    ) : (
                      <div className="h-full flex items-center justify-center text-muted-foreground">
                        Select a hall to view details
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="programs" className="h-full overflow-y-auto">
                <ScrollArea className="h-full pr-4">
                  <div className="space-y-4">
                    {selectedHall?.currentPrograms?.map((program) => (
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
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="stalls" className="h-full">
                <div className="space-y-4">
                  {/* Filters */}
                  <div className="flex flex-wrap gap-3 p-4 bg-muted rounded-lg">
                    <Select value={stallFilter} onValueChange={setStallFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Stalls</SelectItem>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="booked">Booked</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={stageFilter} onValueChange={setStageFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Stages</SelectItem>
                        {selectedHall?.stages?.map((stage) => (
                          <SelectItem key={stage.id} value={stage.id}>
                            {stage.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Stalls Grid */}
                  <ScrollArea className="h-[calc(100vh-380px)]">
                    <div className="space-y-6 p-1">
                      {selectedHall?.stages
                        ?.filter(stage => stageFilter === 'all' || stage.id === stageFilter)
                        .map((stage) => (
                          <Card key={stage.id} className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="font-medium">{stage.name}</h3>
                              <Badge variant="outline">
                                {stage.availableStalls} available / {stage.totalStalls} total
                              </Badge>
                            </div>

                            <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                              {Array.from({ length: stage.totalStalls }).map((_, index) => {
                                const stallStatus = getStallStatus(stage, index);
                                const showStall = stallFilter === 'all' || stallFilter === stallStatus;

                                return showStall && (
                                  <TooltipProvider key={index}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <div
                                          className={cn(
                                            "aspect-square rounded-md border transition-all hover:scale-105",
                                            {
                                              'bg-primary/10 border-primary': stallStatus === 'booked',
                                              'bg-yellow-100 border-yellow-400': stallStatus === 'pending',
                                              'bg-red-100 border-red-400': stallStatus === 'cancelled',
                                              'bg-muted border-border cursor-pointer': stallStatus === 'available',
                                            }
                                          )}
                                        >
                                          <div className="w-full h-full flex items-center justify-center text-xs font-medium">
                                            {index + 1}
                                          </div>
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Stall #{index + 1}</p>
                                        <p className="text-xs text-muted-foreground capitalize">
                                          Status: {stallStatus}
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                );
                              })}
                            </div>

                            <div className="flex flex-wrap gap-3 mt-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-sm bg-muted border-border border" />
                                <span>Available</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-sm bg-primary/10 border-primary border" />
                                <span>Booked</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-sm bg-yellow-100 border-yellow-400 border" />
                                <span>Pending</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-sm bg-red-100 border-red-400 border" />
                                <span>Cancelled</span>
                              </div>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
} 