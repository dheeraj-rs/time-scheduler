"use client"

import { useState } from 'react'
import { use } from 'react'
import { ProgramDetailsForm } from '@/components/programs/ProgramDetailsForm'
import { samplePrograms } from '@/lib/sample-data'
import { notFound } from 'next/navigation'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { toast } from "sonner"

interface Props {
  params: Promise<{
    hallId: string
  }>
}

export default function EditProgramPage({ params }: Props) {
  const { hallId } = use(params)
  const [program, setProgram] = useState(samplePrograms.find(p => p.hallId === hallId))

  if (!program) {
    notFound()
  }

  return (
    <ErrorBoundary
      fallback={
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was an error loading the program details.
            <Button variant="link" asChild className="pl-0">
              <Link href="/admin/programs">Return to Programs</Link>
            </Button>
          </AlertDescription>
        </Alert>
      }
    >
      <div>
        <div className="mb-6">
          <Button variant="ghost" asChild className="gap-2">
            <Link href={`/admin/programs/${hallId}`}>
              <ArrowLeft className="h-4 w-4" />
              Back to Programs
            </Link>
          </Button>
        </div>
        <div className="header">
          <h1>Edit Program: {program.title}</h1>
        </div>
        <ProgramDetailsForm 
          initialData={program} 
          isEditing={true}
          onError={(error: Error) => {
            console.error('Form error:', error)
            toast.error('Failed to save program changes')
          }}
        />
      </div>
    </ErrorBoundary>
  )
}