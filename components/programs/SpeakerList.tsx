"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"

interface SpeakerListProps {
  speakers: Array<{
    name: string;
    role: string;
  }>;
  editMode: boolean;
  onEdit?: (index: number, speaker: { name: string; role: string }) => void;
  onDelete?: (index: number) => void;
}

export function SpeakerList({ speakers, editMode, onEdit, onDelete }: SpeakerListProps) {
  return (
    <Card className="p-4">
      {speakers.map((speaker, index) => (
        <div key={index} className="flex justify-between items-start py-2">
          <div>
            <h3 className="font-medium">{speaker.name}</h3>
            <p className="text-sm text-muted-foreground">{speaker.role}</p>
          </div>
          {editMode && (
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => onEdit?.(index, speaker)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => onDelete?.(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          )}
        </div>
      ))}
    </Card>
  );
}