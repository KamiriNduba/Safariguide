import { useState } from 'react';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { PlaceCard } from '../components/PlaceCard';
import { PlaceDetailModal } from '../components/PlaceDetailModal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { Place } from '../types';
import placesData from '../data/places.json';

export default function Places() {
  const [places] = useState<Place[]>(placesData);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>(places);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredPlaces(places);
    } else {
      const filtered = places.filter(place =>
        place.name.toLowerCase().includes(query.toLowerCase()) ||
        place.description.toLowerCase().includes(query.toLowerCase()) ||
        place.location.toLowerCase().includes(query.toLowerCase()) ||
        place.vibes.some(vibe => vibe.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredPlaces(filtered);
    }
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="page-content">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Explore Places</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2 rounded-full bg-kenyan-green/10 text-kenyan-green hover:bg-kenyan-green/20"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-gray-100 rounded-xl focus:ring-2 focus:ring-kenyan-green focus:bg-white border-0"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          {/* Places Grid */}
          <div className="space-y-4">
            {filteredPlaces.length > 0 ? (
              filteredPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onClick={() => setSelectedPlace(place)}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No places found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <PlaceDetailModal
        place={selectedPlace}
        isOpen={!!selectedPlace}
        onClose={() => setSelectedPlace(null)}
      />
      
      <BottomNavigation />
    </div>
  );
}
