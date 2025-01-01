'use client';

import { Stall } from '@/types/stall';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StallDetails } from './stall-details';
import { Calendar } from 'lucide-react';

interface StallListProps {
  stalls: Stall[];
  onSelectStall: (stall: Stall) => void;
}

export function StallList({ stalls, onSelectStall }: StallListProps) {
  const availableStalls = stalls.filter(stall => stall.status === 'available');
  const otherStalls = stalls.filter(stall => stall.status !== 'available');

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Available Stalls</h3>
          <div className="space-y-4">
            {availableStalls.map(stall => (
              <div key={stall.id} className="group">
                <StallDetails stall={stall} />
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    className="w-full" 
                    onClick={() => onSelectStall(stall)}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Other Stalls</h3>
          <div className="space-y-4 opacity-75">
            {otherStalls.map(stall => (
              <StallDetails key={stall.id} stall={stall} />
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}