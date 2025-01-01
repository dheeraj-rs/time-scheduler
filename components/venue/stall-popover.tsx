import { Stall } from '@/types/stall';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface StallPopoverProps {
  stall: Stall;
  isSelected: boolean;
  onClick: () => void;
}

export function StallPopover({ stall, isSelected, onClick }: StallPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'absolute border-2 rounded cursor-pointer transition-all',
            stall.status === 'available' ? 'hover:ring-2 hover:ring-primary' : '',
            stall.status === 'booked' ? 'bg-destructive/20 cursor-not-allowed' : '',
            stall.status === 'maintenance' ? 'bg-muted cursor-not-allowed' : '',
            isSelected ? 'ring-2 ring-primary' : ''
          )}
          style={{
            width: `${stall.size.width}px`,
            height: `${stall.size.height}px`,
            left: `${stall.position.x}px`,
            top: `${stall.position.y}px`,
          }}
          onClick={onClick}
        >
          <div className="p-2 text-sm">
            <div className="font-medium">{stall.name}</div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-2">
          <h4 className="font-medium">Stall {stall.name}</h4>
          <div className="text-sm text-muted-foreground">
            <p>Size: {stall.size.width}m × {stall.size.height}m</p>
            <p>Price: AED {stall.price}</p>
            <p>Status: {stall.status}</p>
          </div>
          {stall.status === 'available' && (
            <Button className="w-full" onClick={onClick}>
              Select Stall
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
} 