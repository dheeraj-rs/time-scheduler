 
"use client"

import { useRouter } from 'next/navigation';
import { Calendar, Clock, MapPin, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Schedule } from '@/components/program/schedule';
import { SpeakerList } from '@/components/program/speaker-list';
import { BookingSection } from '@/components/program/booking-section';
import { useScrollStore } from '@/lib/store/scroll-store'
import { Button } from '@/components/ui/button'
import { Program } from '@/lib/data/programs';

interface ProgramDetailsClientProps {
  program: Program;
}

export function ProgramDetailsClient({ program }: ProgramDetailsClientProps) {
  const router = useRouter()
  const { setScrollPosition } = useScrollStore()

  const handleBack = () => {
    setScrollPosition('featured-programs', window.scrollY)
    router.back()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="text-muted-foreground hover:text-foreground"
        >
          ← Back
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <div 
              className="h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${program.imageUrl})` }}
            />
            <CardHeader>
              <CardTitle className="text-3xl">{program.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Rest of your component JSX */}
            </CardContent>
          </Card>
        </div>
        <div>
          <BookingSection program={program} />
        </div>
      </div>
    </div>
  );
}