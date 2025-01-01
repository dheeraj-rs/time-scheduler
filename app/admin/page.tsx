"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Users, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div>
      <div className="header">
        <h1>Dashboard</h1>
        <Button asChild>
          <Link href="/admin/programs/new">Create New Program</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Programs</p>
              <h2 className="text-3xl font-bold">5</h2>
            </div>
            <CalendarDays className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Speakers</p>
              <h2 className="text-3xl font-bold">12</h2>
            </div>
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Changes</p>
              <h2 className="text-3xl font-bold">3</h2>
            </div>
            <AlertCircle className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Recent Programs</h2>
      <Card className="p-6">
        <div className="space-y-4">
          {[
            {
              title: "Main Hall Program",
              date: "2024-03-15",
              speakers: 4,
              status: "Active"
            },
            {
              title: "Evening Symposium",
              date: "2024-03-16",
              speakers: 3,
              status: "Draft"
            }
          ].map((program, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
              <div>
                <h3 className="font-medium">{program.title}</h3>
                <p className="text-sm text-muted-foreground">{program.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm">{program.speakers} speakers</span>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/programs/detail/${index + 1}`}>View</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}