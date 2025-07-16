import { useState } from 'react';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { EventCard } from '../components/EventCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Event } from '../types';
import eventsData from '../data/events.json';

export default function Events() {
  const [events] = useState<Event[]>(eventsData);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [activeFilter, setActiveFilter] = useState<'all' | 'recreational' | 'functional'>('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filterEvents = (category: 'all' | 'recreational' | 'functional') => {
    setActiveFilter(category);
    if (category === 'all') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.category === category));
    }
  };

  const handleBookEvent = () => {
    if (selectedEvent) {
      alert(`Booking ${selectedEvent.title} for ${selectedEvent.price}. This would redirect to a payment gateway.`);
      setSelectedEvent(null);
    }
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="page-content">
        <div className="px-4 py-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
          
          {/* Event Categories */}
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            <Button
              onClick={() => filterEvents('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeFilter === 'all' 
                  ? 'bg-kenyan-green text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Events
            </Button>
            <Button
              onClick={() => filterEvents('recreational')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeFilter === 'recreational' 
                  ? 'bg-kenyan-green text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🎉 Recreational
            </Button>
            <Button
              onClick={() => filterEvents('functional')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeFilter === 'functional' 
                  ? 'bg-kenyan-green text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              💼 Functional
            </Button>
          </div>

          {/* Events List */}
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Event Detail Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-4">
              <img 
                src={selectedEvent.imageUrl} 
                alt={selectedEvent.title}
                className="w-full h-48 object-cover rounded-xl"
              />
              
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedEvent.title}</h3>
                <p className="text-gray-600 mb-4">{selectedEvent.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedEvent.vibes.map((vibe) => (
                    <Badge key={vibe} variant="secondary">
                      {vibe}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-sm font-medium text-gray-800">📅 Date</p>
                    <p className="text-sm text-gray-600">{selectedEvent.date}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-sm font-medium text-gray-800">📍 Location</p>
                    <p className="text-sm text-gray-600">{selectedEvent.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-kenyan-green">{selectedEvent.price}</span>
                  <Badge variant={selectedEvent.category === 'recreational' ? 'default' : 'secondary'}>
                    {selectedEvent.category}
                  </Badge>
                </div>
              </div>
              
              <Button 
                onClick={handleBookEvent}
                className="w-full bg-kenyan-green hover:bg-kenyan-green/90 text-white"
              >
                Book Event
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <BottomNavigation />
    </div>
  );
}
