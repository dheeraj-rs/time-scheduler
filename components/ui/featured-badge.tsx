import { cn } from "@/lib/utils"

interface FeaturedBadgeProps {
  className?: string
}

export function FeaturedBadge({ className }: FeaturedBadgeProps) {
  return (
    <div className={cn(
      // Positioning
      "absolute inset-0 z-10",
      // Background and border
      "bg-gradient-to-br from-primary/5 to-primary/10",
      "border-2 border-primary/20",
      "rounded-lg backdrop-blur-[2px]",
      // Content styling
      "flex items-center justify-center",
      // Animation
      "animate-in fade-in-0 duration-500",
      className
    )}>
      <div className="absolute -right-[2px] -top-[2px] px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-bl-lg rounded-tr-lg">
        Featured
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
    </div>
  )
} 