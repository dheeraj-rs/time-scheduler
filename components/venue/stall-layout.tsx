'use client';

import { Stall } from '@/types/stall';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface StallLayoutProps {
  stalls: Stall[];
  onStallSelect: (stall: Stall) => void;
}

export function StallLayout({ stalls, onStallSelect }: StallLayoutProps) {
  const [selectedStall, setSelectedStall] = useState<string | null>(null);

  const handleStallClick = (stall: Stall) => {
    if (stall.status === 'available') {
      setSelectedStall(stall.id.toString());
      onStallSelect(stall);
    }
  };

  return (
    <div className="relative w-full h-[600px] border rounded-lg bg-secondary/20">
      {stalls.map((stall) => (
        <div
          key={stall.id}
          className={cn(
            'absolute border-2 rounded cursor-pointer transition-colors',
            stall.status === 'available' ? 'hover:bg-primary/10' : '',
            stall.status === 'booked' ? 'bg-destructive/20 cursor-not-allowed' : '',
            stall.status === 'maintenance' ? 'bg-muted cursor-not-allowed' : '',
            selectedStall === stall.id ? 'border-primary bg-primary/20' : 'border-border'
          )}
          style={{
            width: `${stall.size.width}px`,
            height: `${stall.size.height}px`,
            left: `${stall.position.x}px`,
            top: `${stall.position.y}px`,
          }}
          onClick={() => handleStallClick(stall)}
        >
          <div className="p-2 text-sm">
            <div className="font-medium">{stall.name}</div>
            <div className="text-muted-foreground">AED {stall.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}