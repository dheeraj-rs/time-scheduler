"use client"

import { CalendarDays, Users, Settings, Layout } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: Layout },
    { href: '/admin/programs', label: 'Programs', icon: CalendarDays },
    { href: '/admin/speakers', label: 'Speakers', icon: Users },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="sidebar">
      <div className="logo">
        <CalendarDays className="inline-block mr-2" />
        PMS Admin
      </div>
      <nav>
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'nav-item flex items-center',
                pathname === item.href && 'active'
              )}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}