"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { HallDetailsModal } from './components/HallDetailsModal'
import { TransactionDetailsModal } from './components/TransactionDetailsModal'
import { useState } from 'react'

import { 
  CalendarDays, 
  Users, 
  Building2, 
  TicketIcon, 
  ArrowUpRight,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Store,
  LayoutGrid,
  Plus,
  ArrowDownRight,
  MapPin,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import { Hall } from '@/types/hall'
import { sampleHalls } from '@/lib/sample-data'

export default function AdminDashboard() {

  const [selectedHall, setSelectedHall] = useState<Hall | null>(null)
  const [isHallModalOpen, setIsHallModalOpen] = useState(false)
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)

  // Enhanced mock data
  const stats = {
    programs: {
      total: 25,
      active: 8,
      upcoming: 12,
      completed: 5,
      currentRunning: [
        { id: 1, name: "Tech Summit 2024", hall: "Main Hall", stage: "Stage A", attendees: 280, capacity: 300 },
        { id: 2, name: "Business Conference", hall: "Innovation Hub", stage: "Stage B", attendees: 150, capacity: 200 }
      ],
      nextPrograms: [
        { id: 3, name: "Digital Workshop", date: "2024-04-15", hall: "Training Center" },
        { id: 4, name: "AI Conference", date: "2024-04-20", hall: "Tech Hub" }
      ]
    },
    halls: {
      total: 10,
      totalCapacity: 5000,
      currentOccupancy: 2800,
      activeHalls: 6,
      availableHalls: 4,
      maintenanceHalls: 1
    },
    stalls: {
      total: 150,
      available: 45,
      booked: 95,
      pending: 10,
      maintenance: 5,
      bookings: {
        confirmed: 85,
        pending: 15,
        cancelled: 5
      }
    },
    tickets: {
      total: 2000,
      sold: 1250,
      available: 750,
      revenue: 125000,
      categories: {
        vip: { sold: 200, total: 300 },
        standard: { sold: 800, total: 1200 },
        economy: { sold: 250, total: 500 }
      }
    },
    transactions: {
      success: 450,
      pending: 28,
      failed: 12,
      recent: [
        { id: 1, amount: 499, status: 'success', type: 'VIP Ticket', date: '2024-03-28' },
        { id: 2, amount: 299, status: 'pending', type: 'Standard Ticket', date: '2024-03-28' },
        { id: 3, amount: 799, status: 'failed', type: 'Stall Booking', date: '2024-03-27' }
      ]
    },
    issues: [
      { id: 1, type: 'Technical', status: 'High', description: 'Stage A audio system maintenance required' },
      { id: 2, type: 'Booking', status: 'Medium', description: 'Double booking reported for Stall #45' }
    ]
  }

    // Add click handlers to the cards
    const handleHallClick = (hall: Hall) => {
      setSelectedHall(hall)
      setIsHallModalOpen(true)
    }

    const handleTransactionClick = () => {
      setIsTransactionModalOpen(true)
    }

  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-primary/10 via-primary/5 to-background p-4 sm:p-6 rounded-lg">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <Button size="lg" className="gap-2 w-full sm:w-auto" asChild>
          <Link href="/admin/programs/new">
            <Plus className="w-4 h-4" />
            Create New Program
          </Link>
        </Button>
      </div>

      {/* Enhanced Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Programs Stats */}
        <Card className="p-4 md:p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Programs</p>
              <h2 className="text-3xl font-bold">{stats.programs.total}</h2>
              <div className="flex flex-col text-sm gap-1">
                <span className="text-green-500 flex items-center gap-1">
                  <ArrowUpRight className="h-4 w-4" />
                  {stats.programs.active} Active
                </span>
                <span className="text-blue-500">{stats.programs.upcoming} Upcoming</span>
              </div>
            </div>
            <CalendarDays className="h-10 w-10 text-primary opacity-80" />
          </div>
        </Card>

        {/* Halls Stats */}
        <Card 
          className="p-4 md:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => handleHallClick(sampleHalls[0])}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Halls</p>
              <h2 className="text-3xl font-bold">{stats.halls.activeHalls}/{stats.halls.total}</h2>
            </div>
            <Building2 className="h-10 w-10 text-primary opacity-80" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-muted/50 rounded-lg gap-1 flex items-center justify-center">
              <p className="text-lg font-semibold text-green-600">{stats.halls.activeHalls}</p>
              <p className="text-sm text-muted-foreground">Full</p>
            </div>
            <div className="bg-muted/50 rounded-lg gap-1 flex items-center justify-center">
              <p className="text-xl font-semibold text-blue-600">{stats.halls.availableHalls}</p>
              <p className="text-sm text-muted-foreground">Available</p>
            </div>
          </div>
        </Card>

        {/* Stalls Stats */}
        <Card className="p-4 md:p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-start xl:items-center justify-between gap-4">
            <div className="space-y-2 min-w-[160px]">
              <p className="text-sm font-medium text-muted-foreground">Stall Bookings</p>
              <h2 className="text-2xl sm:text-3xl font-bold">{stats.stalls.booked}/{stats.stalls.total}</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-muted/50 rounded-lg gap-1 flex items-center justify-center">
              <p className="text-green-500 whitespace-nowrap flex-1 sm:flex-none justify-center">{stats.stalls.bookings.confirmed}</p>
              <p className="text-sm text-muted-foreground">Confirmed</p>
            </div>
            <div className="bg-muted/50 rounded-lg gap-1 flex items-center justify-center">
              <p className="text-yellow-500 whitespace-nowrap flex-1 sm:flex-none justify-center">{stats.stalls.bookings.pending}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
            </div>
            
          </div>
        </Card>

        {/* Revenue Stats */}
        <Card className="p-4 md:p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <h2 className="text-3xl font-bold">AED {stats.tickets.revenue.toLocaleString()}</h2>
              <div className="flex items-center text-sm gap-1 text-green-500">
                <ArrowUpRight className="h-4 w-4" />
                <span>{((stats.tickets.sold / stats.tickets.total) * 100).toFixed(1)}% Ticket Sales</span>
              </div>
            </div>
            <DollarSign className="h-10 w-10 text-primary opacity-80" />
          </div>
        </Card>
      </div>

      {/* Current Programs and Transactions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {/* Current Running Programs */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-500" />
            Currently Running Programs
          </h3>
          <div className="space-y-4">
            {stats.programs.currentRunning.map((program) => (
              <Card key={program.id} className="p-4 hover:border-primary transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{program.name}</h4>
                    <div className="text-sm text-muted-foreground mt-1">
                      {program.hall} • {program.stage}
                    </div>
                    <div className="mt-2">
                      <Progress 
                        value={(program.attendees / program.capacity) * 100} 
                        className="h-2" 
                      />
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>{program.attendees} attending</span>
                        <span>{program.capacity} capacity</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/programs/${program.id}`}>Manage</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Transaction Overview */}
        <Card 
          className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
          onClick={handleTransactionClick}
        >
          <h3 className="text-xl font-semibold mb-6">Transaction Overview</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Successful', value: stats.transactions.success, icon: CheckCircle2, color: 'text-green-500' },
                { label: 'Pending', value: stats.transactions.pending, icon: Clock, color: 'text-yellow-500' },
                { label: 'Failed', value: stats.transactions.failed, icon: AlertTriangle, color: 'text-red-500' }
              ].map((item) => (
                <div key={item.label} className="text-center p-4 bg-muted/50 rounded-lg">
                  <item.icon className={`h-6 w-6 ${item.color} mx-auto mb-2`} />
                  <p className="font-semibold text-2xl">{item.value}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>       
          </div>
        </Card>
      </div>

      {/* Issues and Alerts Section */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-yellow-500" />
          Active Issues
        </h3>
        <div className="grid gap-4">
          {stats.issues.map((issue) => (
            <div key={issue.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant={issue.status === 'High' ? 'destructive' : 'secondary'}>
                    {issue.status}
                  </Badge>
                  <span className="font-medium">{issue.type}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
              </div>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          ))}
        </div>
      </Card>

      <HallDetailsModal
        halls={sampleHalls}
        selectedHall={selectedHall}
        onHallSelect={setSelectedHall}
        isOpen={isHallModalOpen}
        onClose={() => setIsHallModalOpen(false)}
      />
      
      <TransactionDetailsModal
        transactions={stats.transactions.recent}
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
      />
    </div>
  )
}