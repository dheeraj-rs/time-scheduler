'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"

export function EditProgramClient({ hallId }: { hallId: string }) {
  const [isEditing, setIsEditing] = useState(false)
  
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Program</h2>
      {/* Add your form components here */}
    </Card>
  )
} 