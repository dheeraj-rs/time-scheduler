"use client"

import { ProgramDetailsForm } from '@/components/programs/ProgramDetailsForm'
import { samplePrograms } from '@/lib/sample-data'

export default function ProgramDetailPage({ params }: { params: { programId: string } }) {
  const program = samplePrograms.find(p => p.id === params.programId)

  if (!program) {
    return <div>Program not found</div>
  }

  return (
    <div>
      <div className="header">
        <h1>Program Details: {program.title}</h1>
      </div>
      <ProgramDetailsForm initialData={program} isEditing={false} />
    </div>
  )
}