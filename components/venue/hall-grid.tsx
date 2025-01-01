'use client';
import React from 'react';
import { Hall } from '@/types/hall';
import { Stall } from '@/types/stall';
import { cn } from '@/lib/utils';
import { 
  DoorOpen, 
  Coffee,
  Info,
  Theater,
  Users,
  Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface HallGridProps {
  hall: Hall;
  stalls: Stall[];
  onStallSelect: (stall: Stall) => void;
  selectedStall: Stall | null;
}

interface HallFeature {
  type: 'entry' | 'exit' | 'stage' | 'amenity';
  position: { x: number; y: number };
  label: string;
  icon: React.ReactNode;
}

export function HallGrid({ hall, stalls, onStallSelect, selectedStall }: HallGridProps) {
  const hallFeatures: HallFeature[] = [
    {
      type: 'entry',
      position: { x: 10, y: 10 },
      label: 'Main Entrance',
      icon: <DoorOpen className="h-4 w-4 md:h-6 md:w-6 text-green-600" />
    },
    {
      type: 'exit',
      position: { x: hall.dimensions.width - 40, y: 10 },
      label: 'Emergency Exit',
      icon: <DoorOpen className="h-4 w-4 md:h-6 md:w-6 text-red-600" />
    },
    {
      type: 'stage',
      position: { x: hall.dimensions.width / 2 - 80, y: 30 },
      label: 'Main Stage',
      icon: <Theater className="h-6 w-6 md:h-8 md:w-8 text-primary" />
    },
    {
      type: 'amenity',
      position: { x: hall.dimensions.width - 60, y: hall.dimensions.height - 60 },
      label: 'Café Area',
      icon: <Coffee className="h-4 w-4 md:h-6 md:w-6 text-amber-600" />
    }
  ];

  const getStallCategory = React.useCallback((stall: Stall | null) => {
    if (!stall) return null;
    return hall.stallCategories.find(c => c.id === stall.categoryId);
  }, [hall.stallCategories]);

  const getStallContent = (stall: Stall) => {
    const category = getStallCategory(stall);
    return (
      <>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              {category?.name === 'Premium' && (
                <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-amber-500 flex-shrink-0" />
              )}
              <h4 className="font-medium text-xs md:text-sm truncate">{stall.name}</h4>
            </div>
            <div className="text-[10px] md:text-xs text-muted-foreground flex items-center gap-1">
              <Users className="h-2.5 w-2.5 md:h-3 md:w-3" />
              {stall.size.width}×{stall.size.height}m
            </div>
          </div>
          <div className="flex-shrink-0">
            {getStallStatusBadge(stall.status)}
          </div>
        </div>
        <div className="mt-auto pt-2 flex items-end justify-between gap-2">
          <Badge variant="outline" className="text-[10px] md:text-xs">
            {category?.name}
          </Badge>
          <span className="text-[10px] md:text-xs font-medium">
            AED {stall.price}
          </span>
        </div>
      </>
    );
  };

  const getStallStyles = (stall: Stall) => {
    const category = getStallCategory(stall);
    const baseStyles: Record<string, string> = {
      premium: 'bg-gradient-to-br from-amber-50/90 to-yellow-50/90 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-200',
      standard: 'bg-gradient-to-br from-blue-50/90 to-indigo-50/90 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200',
      economy: 'bg-gradient-to-br from-green-50/90 to-emerald-50/90 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200'
    };

    return cn(
      'absolute border-2 rounded-lg transition-all duration-300',
      'backdrop-blur-sm shadow-lg',
      'flex flex-col p-2 md:p-3',
      category && stall.status === 'available' && baseStyles[category.name.toLowerCase()],
      stall.status === 'available' && [
        'hover:ring-2 hover:ring-primary/50',
        'hover:scale-[1.02]',
        'hover:shadow-xl',
        'cursor-pointer'
      ],
      stall.status === 'booked' && 'bg-destructive/10 border-destructive/20',
      stall.status === 'maintenance' && 'bg-muted border-muted-foreground/20',
      selectedStall?.id === stall.id && [
        'ring-4 ring-primary ring-opacity-50',
        'scale-[1.02]',
        'z-10'
      ]
    );
  };

  const getStallStatusBadge = (status: string) => {
    const badges = {
      available: <Badge className="bg-primary/20 text-primary text-xs">Available</Badge>,
      booked: <Badge variant="destructive" className="text-xs">Booked</Badge>,
      maintenance: <Badge variant="secondary" className="text-xs">Maintenance</Badge>
    };
    return badges[status as keyof typeof badges];
  };

  const positionedStalls = React.useMemo(() => {
    const calculateStallPositions = (hall: Hall, stalls: Stall[]) => {
      const isMobile = window.innerWidth < 768;
      const STALL_BASE_WIDTH = isMobile ? 120 : 180;
      const STALL_BASE_HEIGHT = isMobile ? 80 : 120;
      const HALL_PADDING = isMobile ? 40 : 80;
      const STALL_GAP = isMobile ? 20 : 30;
      const STAGE_PADDING = isMobile ? 80 : 120;

      const stallsByCategory = stalls.reduce((acc, stall) => {
        const category = getStallCategory(stall)?.name.toLowerCase() || 'other';
        return {
          ...acc,
          [category]: [...(acc[category] || []), stall]
        };
      }, {} as Record<string, Stall[]>);

      let currentY = STAGE_PADDING;
      const positionedStalls: (Stall & { position: { x: number; y: number } })[] = [];

      Object.entries(stallsByCategory).forEach(([, categoryStalls]) => {
        currentY += 40;

        let currentX = HALL_PADDING;
        let maxHeightInRow = 0;
        
        categoryStalls.forEach((stall) => {
          const width = STALL_BASE_WIDTH * (stall.size.width / 2);
          const height = STALL_BASE_HEIGHT * (stall.size.height / 2);

          if (currentX + width > hall.dimensions.width - HALL_PADDING) {
            currentX = HALL_PADDING;
            currentY += maxHeightInRow + STALL_GAP;
            maxHeightInRow = 0;
          }

          positionedStalls.push({
            ...stall,
            position: { x: currentX, y: currentY }
          });

          maxHeightInRow = Math.max(maxHeightInRow, height);
          currentX += width + STALL_GAP;
        });

        currentY += maxHeightInRow + STALL_GAP * 2;
      });

      return positionedStalls;
    };
    
    return calculateStallPositions(hall, stalls);
  }, [hall, stalls, getStallCategory]);

  return (
    <TooltipProvider>
      <div className="space-y-4 md:space-y-6">
        <Card className="p-3 md:p-4 bg-gradient-to-r from-background to-muted/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {hall.stallCategories.map((category) => (
              <div key={category.id} className="flex items-center gap-2">
                <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${category.color} ring-2 ring-background shadow-sm`} />
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm font-medium truncate">{category.name}</span>
                  <span className="text-xs text-muted-foreground">
                    From AED {category.basePrice}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="relative h-[400px] md:h-[600px] border rounded-xl shadow-xl bg-background/50 backdrop-blur-sm overflow-hidden transition-all duration-300">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-muted/30 rounded-lg p-4 mt-4">
            <Theater className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-2" />
            <span className="text-xs md:text-sm font-medium">Main Stage</span>
          </div>
          {positionedStalls.map((stall) => (
            <div
              key={stall.id}
              className={getStallStyles(stall)}
              style={{
                width: `${stall.size.width}px`,
                height: `${stall.size.height}px`,
                left: `${stall.position.x}px`,
                top: `${stall.position.y}px`
              }}
              onClick={() => stall.status === 'available' && onStallSelect(stall)}
            >
              {getStallContent(stall)}
            </div>
          ))}
          {hallFeatures.map((feature) => (
            <Tooltip key={feature.label}>
              <TooltipTrigger asChild>
                <div
                  className="absolute"
                  style={{
                    left: `${feature.position.x}px`,
                    top: `${feature.position.y}px`
                  }}
                >
                  {feature.icon}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{feature.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </Card>
        <Card className="p-3 md:p-4 bg-primary/5">
          <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
            <Info className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
            <span>Click on available stalls to view details and proceed with booking</span>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
}

export default HallGrid;