"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProgramForm } from "./ProgramForm"

interface AddProgramDialogProps {
  children: React.ReactNode
  hallId: string
}

export function AddProgramDialog({ children, hallId }: AddProgramDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add New Program</DialogTitle>
        </DialogHeader>
        <ProgramForm 
          hallId={hallId}
          onSuccess={() => {
            // Handle success (e.g., close dialog, refresh data)
          }}
        />
      </DialogContent>
    </Dialog>
  )
} 