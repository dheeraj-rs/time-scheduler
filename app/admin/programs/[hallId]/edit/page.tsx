"use client"

import { ProgramDetailsForm } from '@/components/programs/ProgramDetailsForm'
import { samplePrograms } from '@/lib/sample-data'
import { notFound } from 'next/navigation'
import { use } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { toast } from "sonner"

interface Props {
  params: {
    hallId: string
  }
}

export default function EditProgramPage({ params }: Props) {
  try {
    const unwrappedParams = use(Promise.resolve(params))
    const program = samplePrograms.find(p => p.id === unwrappedParams.hallId)

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
              There was an error loading the program details. Please try again later.
              <Button variant="link" asChild className="pl-0">
                <Link href="/admin/programs">Return to Programs</Link>
              </Button>
            </AlertDescription>
          </Alert>
        }
      >
        <div>
          <div className="header">
            <h1>Edit Program: {program.title}</h1>
          </div>
          <ProgramDetailsForm 
            initialData={program} 
            isEditing={true}
            onError={(error) => {
              console.error('Form error:', error)
              toast.error('Failed to save program changes')
            }}
          />
        </div>
      </ErrorBoundary>
    )
  } catch (error) {
    console.error('Page error:', error)
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          An unexpected error occurred. Please try again later.
          <Button variant="link" asChild className="pl-0">
            <Link href="/admin/programs">Return to Programs</Link>
          </Button>
        </AlertDescription>
      </Alert>
    )
  }
}