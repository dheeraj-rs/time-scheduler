import { StallCategory } from '@/types/hall';

interface HallLegendProps {
  categories: StallCategory[];
}

export function HallLegend({ categories }: HallLegendProps) {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-sm">
      {categories.map((category) => (
        <div key={category.id} className="flex items-center space-x-2">
          <div className={`w-4 h-4 rounded ${category.color}`} />
          <span className="text-sm font-medium">{category.name}</span>
          <span className="text-sm text-muted-foreground">
            (AED {category.basePrice})
          </span>
        </div>
      ))}
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded bg-destructive/20" />
        <span className="text-sm font-medium">Booked</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded bg-muted" />
        <span className="text-sm font-medium">Maintenance</span>
      </div>
    </div>
  );
}