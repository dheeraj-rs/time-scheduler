"use client"

import { useState } from 'react'

interface ProgramDetailProps {
  program: any // Replace 'any' with your program type
}

export function ProgramDetail({ program }: ProgramDetailProps) {
  const [editMode, setEditMode] = useState(false)

  return (
    <div>
      {/* Your existing ProgramDetail UI */}
      <div className="header">
        <h1>{program.title}</h1>
        <button onClick={() => setEditMode(!editMode)}>
          {editMode ? 'Cancel Edit' : 'Edit Program'}
        </button>
      </div>
      {/* Rest of your component */}
    </div>
  )
}