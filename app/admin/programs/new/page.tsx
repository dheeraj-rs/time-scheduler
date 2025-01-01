"use client"

import { ProgramDetailsForm } from '@/components/programs/ProgramDetailsForm'

export default function NewProgramPage() {
  return (
    <div>
      <div className="header">
        <h1>Add New Program</h1>
      </div>
      <ProgramDetailsForm 
        initialData={{
          id: "",
          title: "",
          date: new Date(),
          status: "upcoming",
          hallId: "",
          stageId: "",
          speakers: [],
          ticketPrice: 0,
          sessions: [],
          venue: ""
        }} 
        isEditing={false} 
      />
    </div>
  )
}