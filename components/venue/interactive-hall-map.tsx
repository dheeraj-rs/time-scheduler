import { useState, useRef } from 'react';
import { Hall } from '@/types/hall';
import { Stall } from '@/types/stall';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StallPopover } from './stall-popover';

interface InteractiveHallMapProps {
  hall: Hall;
  stalls: Stall[];
  onStallSelect: (stall: Stall) => void;
}

export function InteractiveHallMap({ hall, stalls, onStallSelect }: InteractiveHallMapProps) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedStall, setSelectedStall] = useState<Stall | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleStallClick = (stall: Stall) => {
    if (stall.status === 'available') {
      setSelectedStall(stall);
      onStallSelect(stall);
    }
  };

  return (
    <div className="relative w-full h-[600px] border rounded-lg bg-background overflow-hidden">
      {/* Zoom controls */}
      <div className="absolute top-4 right-4 z-10 space-y-2">
        <Button variant="secondary" size="icon" onClick={handleZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={handleZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Map container */}
      <div
        ref={mapRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="relative transition-transform duration-100"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            width: hall.dimensions.width,
            height: hall.dimensions.height,
          }}
        >
          {stalls.map((stall) => (
            <StallPopover
              key={stall.id}
              stall={stall}
              isSelected={selectedStall?.id === stall.id}
              onClick={() => handleStallClick(stall)}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 