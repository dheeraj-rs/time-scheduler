'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TimeRangeSelector } from "@/components/speakers/TimeRangeSelector"
import { toast } from 'sonner'

interface EditProgramClientProps {
  hallId: string
}

export function EditProgramClient({ hallId }: EditProgramClientProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [availability, setAvailability] = useState([{ start: '', end: '' }])
  
  const handleSave = async () => {
    try {
      setIsEditing(true)
      // Here you would make an API call to update the program
      // using the hallId and other form data
      await fetch(`/api/programs/${hallId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          availability,
          // Add other form data here
        }),
      })
      
      toast.success('Program updated successfully')
      router.push('/admin/programs')
    } catch (error) {
      toast.error('Failed to update program')
      console.error(error)
    } finally {
      setIsEditing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Program</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList>
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Program Title</Label>
                <Input id="title" placeholder="Enter program title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Enter program description" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <TimeRangeSelector 
              availability={availability}
              onChange={setAvailability}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 mt-6">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            disabled={isEditing}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isEditing}
          >
            {isEditing ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 