"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Upload, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Program, Speaker } from '@/app/types/program'

interface ProgramDetailsFormProps {
  initialData: Program;
  isEditing: boolean;
  onError?: (error: Error) => void;
}

export function ProgramDetailsForm({ initialData, isEditing, onError }: ProgramDetailsFormProps) {
  const router = useRouter()
  const [dateRange, setDateRange] = useState({
    startDate: initialData?.dateRange?.startDate || undefined,
    endDate: initialData?.dateRange?.endDate || undefined
  })
  const [mainGuests, setMainGuests] = useState<Partial<Speaker>[]>(
    initialData?.mainGuests || []
  )
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.venue?.image || null
  )

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddMainGuest = () => {
    setMainGuests([...mainGuests, { name: '', bio: '' }])
  }

  const handleRemoveMainGuest = (index: number) => {
    setMainGuests(mainGuests.filter((_, i) => i !== index))
  }

  return (
    <Card className="max-w-4xl mx-auto p-6">
      <form className="space-y-8">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList>
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="venue">Venue Details</TabsTrigger>
            <TabsTrigger value="guests">Main Guests</TabsTrigger>
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Program Title</Label>
              <Input 
                id="title" 
                defaultValue={initialData?.title}
                placeholder="Enter program title" 
              />
            </div>

            <div className="space-y-2">
              <Label>Program Dates</Label>
              <div className="flex gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.startDate ? format(dateRange.startDate, "PPP") : "Start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.startDate}
                      onSelect={(date) => setDateRange({ ...dateRange, startDate: date })}
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.endDate ? format(dateRange.endDate, "PPP") : "End date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.endDate}
                      onSelect={(date) => setDateRange({ ...dateRange, endDate: date })}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Program Description</Label>
              <Textarea 
                id="description"
                defaultValue={initialData?.description}
                placeholder="Enter program description"
                rows={5}
              />
            </div>
          </TabsContent>

          <TabsContent value="venue" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="venueName">Venue Name</Label>
              <Input 
                id="venueName"
                defaultValue={initialData?.venue?.name}
                placeholder="Enter venue name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="venueAddress">Venue Address</Label>
              <Input 
                id="venueAddress"
                defaultValue={initialData?.venue?.address}
                placeholder="Enter venue address"
              />
            </div>

            <div className="space-y-2">
              <Label>Venue Image</Label>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="w-[200px]" asChild>
                  <label>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </Button>
                {imagePreview && (
                  <div className="relative w-32 h-32">
                    <img
                      src={imagePreview}
                      alt="Venue preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2"
                      onClick={() => setImagePreview(null)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="guests" className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Main Guests</Label>
              <Button onClick={handleAddMainGuest} type="button">
                <Plus className="mr-2 h-4 w-4" />
                Add Guest
              </Button>
            </div>

            <div className="space-y-4">
              {mainGuests.map((guest, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <Label>Guest Name</Label>
                        <Input
                          value={guest.name}
                          onChange={(e) => {
                            const updated = [...mainGuests]
                            updated[index] = { ...guest, name: e.target.value }
                            setMainGuests(updated)
                          }}
                          placeholder="Enter guest name"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveMainGuest(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label>Guest Bio</Label>
                      <Textarea
                        value={guest.bio}
                        onChange={(e) => {
                          const updated = [...mainGuests]
                          updated[index] = { ...guest, bio: e.target.value }
                          setMainGuests(updated)
                        }}
                        placeholder="Enter guest bio"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                defaultValue={initialData?.contactInfo?.email}
                placeholder="Enter contact email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                type="tel"
                defaultValue={initialData?.contactInfo?.phone}
                placeholder="Enter contact phone"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                defaultValue={initialData?.contactInfo?.website}
                placeholder="Enter website URL"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? 'Update Program' : 'Create Program'}
          </Button>
        </div>
      </form>
    </Card>
  )
} 