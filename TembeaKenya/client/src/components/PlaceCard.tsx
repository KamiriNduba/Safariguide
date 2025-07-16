import { Place } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

interface PlaceCardProps {
  place: Place;
  onClick: () => void;
}

export function PlaceCard({ place, onClick }: PlaceCardProps) {
  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={place.imageUrl} 
        alt={place.name}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">{place.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{place.shortDescription}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {place.vibes.map((vibe) => (
            <Badge 
              key={vibe} 
              variant="secondary" 
              className="text-xs"
            >
              {vibe}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-kenyan-green font-semibold">{place.price}</span>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );
}
