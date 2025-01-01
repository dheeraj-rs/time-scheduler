"use client"

import { ReactNode } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Hall } from "@/app/types/program"

interface AddHallDialogProps {
  children: ReactNode
  halls: Hall[]
}

export function AddHallDialog({ children, halls }: AddHallDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Hall</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Hall Name</Label>
            <Input id="name" placeholder="Enter hall name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity</Label>
            <Input id="capacity" type="number" placeholder="Enter hall capacity" />
          </div>
          <Button className="w-full">Create Hall</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 