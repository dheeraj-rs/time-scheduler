"use client"

import { ProgramDetailsForm } from '@/components/programs/ProgramDetailsForm'

export default function NewProgramPage() {
  return (
    <div>
      <div className="header">
        <h1>Create New Program</h1>
      </div>
      <ProgramDetailsForm />
    </div>
  )
}