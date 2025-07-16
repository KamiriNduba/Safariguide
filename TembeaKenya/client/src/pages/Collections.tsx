import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Place, Event, Collection } from '../types';
import placesData from '../data/places.json';
import eventsData from '../data/events.json';

export default function Collections() {
  const [savedCollections] = useLocalStorage<{placeIds: string[], eventIds: string[]}>('tembeaKenya_collections', {
    placeIds: ['masai-mara', 'diani-beach'],
    eventIds: ['lamu-cultural-festival', 'nairobi-food-festival']
  });
  
  const [collections, setCollections] = useState<Collection>({
    places: [],
    events: []
  });

  useEffect(() => {
    // Filter places and events based on saved IDs
    const savedPlaces = placesData.filter(place => 
      savedCollections.placeIds.includes(place.id)
    );
    const savedEvents = eventsData.filter(event => 
      savedCollections.eventIds.includes(event.id)
    );
    
    setCollections({
      places: savedPlaces,
      events: savedEvents
    });
  }, [savedCollections]);

  return (
    <div className="app-container">
      <Header />
      
      <main className="page-content">
        <div className="px-4 py-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Collections</h2>
          
          {/* Collection Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-r from-kenyan-green to-green-600 rounded-2xl p-4 text-white">
              <p className="text-sm opacity-80">Saved Places</p>
              <p className="text-2xl font-bold">{collections.places.length}</p>
            </div>
            <div className="bg-gradient-to-r from-kenyan-orange to-orange-600 rounded-2xl p-4 text-white">
              <p className="text-sm opacity-80">Saved Events</p>
              <p className="text-2xl font-bold">{collections.events.length}</p>
            </div>
          </div>

          {/* Saved Places */}
          {collections.places.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Saved Places</h3>
              <div className="grid grid-cols-2 gap-4">
                {collections.places.map((place) => (
                  <Card key={place.id} className="overflow-hidden">
                    <img 
                      src={place.imageUrl} 
                      alt={place.name}
                      className="w-full h-20 object-cover"
                    />
                    <CardContent className="p-3">
                      <h4 className="font-medium text-sm text-gray-800 truncate">{place.name}</h4>
                      <p className="text-xs text-gray-500">{place.category}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {place.vibes.slice(0, 2).map((vibe) => (
                          <Badge key={vibe} variant="outline" className="text-xs">
                            {vibe.split(' ')[0]}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Saved Events */}
          {collections.events.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Saved Events</h3>
              <div className="space-y-3">
                {collections.events.map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-kenyan-red/10 rounded-xl flex items-center justify-center">
                          <span className="text-lg">{event.vibes[0]?.split(' ')[0] || '🎭'}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{event.title}</h4>
                          <p className="text-sm text-gray-500">{event.date}</p>
                          <p className="text-sm text-kenyan-green font-semibold">{event.price}</p>
                        </div>
                        <Heart className="h-4 w-4 text-kenyan-red fill-current" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {collections.places.length === 0 && collections.events.length === 0 && (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No saved items yet</p>
              <p className="text-sm text-gray-400">
                Start exploring places and events to build your collection!
              </p>
            </div>
          )}
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
}
