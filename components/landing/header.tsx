import React from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Building2} from 'lucide-react';

function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Building2 className="h-6 w-6" />
          <span className="text-xl font-bold">Conference</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/venues" className="text-muted-foreground hover:text-foreground">
            Venues
          </Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link href="/contact" className="text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </nav>
        <div className="flex space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/signup">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header