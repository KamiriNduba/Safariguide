import { Place } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, MapPin, DollarSign } from 'lucide-react';

interface PlaceDetailModalProps {
  place: Place | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PlaceDetailModal({ place, isOpen, onClose }: PlaceDetailModalProps) {
  if (!place) return null;

  const handleBookTour = () => {
    // Simulated booking
    alert(`Booking tour for ${place.name}. This would redirect to a payment gateway.`);
  };

  const handleViewAR = () => {
    // Simulated AR view
    alert(`AR view for ${place.name} would open here using WebXR or a similar technology.`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Place Details
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <img 
            src={place.imageUrl} 
            alt={place.name}
            className="w-full h-48 object-cover rounded-xl"
          />
          
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{place.name}</h3>
            <p className="text-gray-600 mb-4">{place.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {place.vibes.map((vibe) => (
                <Badge key={vibe} variant="secondary">
                  {vibe}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center space-x-2 mb-1">
                <MapPin className="h-4 w-4 text-gray-600" />
                <p className="text-sm font-medium text-gray-800">Location</p>
              </div>
              <p className="text-sm text-gray-600">{place.location}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center space-x-2 mb-1">
                <DollarSign className="h-4 w-4 text-gray-600" />
                <p className="text-sm font-medium text-gray-800">Price</p>
              </div>
              <p className="text-sm text-gray-600">{place.price}</p>
            </div>
          </div>
          
          {place.accommodations && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">Nearby Accommodations</h4>
              <div className="space-y-2">
                {place.accommodations.map((accommodation) => (
                  <div 
                    key={accommodation.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                  >
                    <div>
                      <p className="font-medium text-sm text-gray-800">{accommodation.name}</p>
                      <p className="text-xs text-gray-500">{accommodation.type} • {accommodation.distance}</p>
                    </div>
                    <span className="text-kenyan-green font-semibold text-sm">{accommodation.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex space-x-3">
            <Button 
              onClick={handleBookTour}
              className="flex-1 bg-kenyan-green hover:bg-kenyan-green/90 text-white"
            >
              Book Tour
            </Button>
            <Button 
              onClick={handleViewAR}
              variant="outline" 
              className="px-4 border-kenyan-green text-kenyan-green hover:bg-kenyan-green/10"
            >
              View AR
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
