import { Event } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

export function EventCard({ event, onClick }: EventCardProps) {
  const getCategoryColor = (category: string) => {
    return category === 'recreational' 
      ? 'bg-kenyan-red text-white' 
      : 'bg-blue-500 text-white';
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={event.imageUrl} 
          alt={event.title}
          className="w-full h-32 object-cover"
        />
        <Badge 
          className={`absolute top-2 right-2 ${getCategoryColor(event.category)}`}
        >
          {event.vibes[0]}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-1">{event.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{event.shortDescription}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">📅 {event.date}</span>
          <span className="text-kenyan-green font-semibold">{event.price}</span>
        </div>
      </CardContent>
    </Card>
  );
}
