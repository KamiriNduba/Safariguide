import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Send } from 'lucide-react';

interface PlaceTimeSelectorProps {
  onSelectionSend: (place: string, timeframe: string) => void;
}

export function PlaceTimeSelector({ onSelectionSend }: PlaceTimeSelectorProps) {
  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('');

  const places = [
    'Maasai Mara National Reserve',
    'Diani Beach',
    'Amboseli National Park',
    'Lake Nakuru',
    'Samburu National Reserve',
    'Tsavo National Park',
    'Mount Kenya',
    'Lamu Island',
    'Hell\'s Gate National Park',
    'Nairobi National Park',
    'Karen Blixen Museum',
    'Maasai Cultural Village'
  ];

  const timeframes = [
    'This weekend',
    'Next week',
    'In 2 weeks',
    'Next month',
    'In 3 months',
    'During dry season (June-October)',
    'During green season (November-May)',
    'Holiday period',
    'Flexible timing'
  ];

  const handleSend = () => {
    if (selectedPlace && selectedTimeframe) {
      onSelectionSend(selectedPlace, selectedTimeframe);
      // Reset selections after sending
      setSelectedPlace('');
      setSelectedTimeframe('');
    }
  };

  const canSend = selectedPlace && selectedTimeframe;

  return (
    <Card className="bg-gradient-to-r from-kenyan-green/5 to-kenyan-orange/5 border-kenyan-green/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 text-kenyan-green font-medium">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Quick Trip Planner</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Where do you want to go?
            </label>
            <Select value={selectedPlace} onValueChange={setSelectedPlace}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select a destination" />
              </SelectTrigger>
              <SelectContent>
                {places.map(place => (
                  <SelectItem key={place} value={place}>
                    {place}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              When are you planning to visit?
            </label>
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                {timeframes.map(timeframe => (
                  <SelectItem key={timeframe} value={timeframe}>
                    {timeframe}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleSend}
            disabled={!canSend}
            size="sm"
            className="w-full bg-kenyan-green hover:bg-kenyan-green/90 text-white"
          >
            <Send className="h-3 w-3 mr-2" />
            Get Personalized Recommendations
          </Button>
        </div>

        {selectedPlace && selectedTimeframe && (
          <div className="mt-2 p-2 bg-white/50 rounded text-xs text-gray-600">
            <Calendar className="h-3 w-3 inline mr-1" />
            Planning: <span className="font-medium">{selectedPlace}</span> - <span className="font-medium">{selectedTimeframe}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}