import { useState } from 'react';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Building, 
  Calendar, 
  Star, 
  Edit3, 
  Eye,
  MapPin,
  DollarSign,
  Users,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function HostDashboard() {
  const { toast } = useToast();
  const [showCreateListing, setShowCreateListing] = useState(false);
  const [listingType, setListingType] = useState<'place' | 'event'>('place');
  
  const [stats] = useState({
    totalListings: 3,
    totalBookings: 47,
    monthlyRevenue: 2340,
    averageRating: 4.6
  });

  const [myListings] = useState([
    {
      id: 1,
      type: 'place',
      name: 'Safari Lodge Mara',
      description: 'Luxury accommodation in the heart of Masai Mara',
      location: 'Masai Mara',
      price: '$340/night',
      status: 'approved',
      bookings: 12,
      rating: 4.8,
      vibes: ['🏨 Luxury', '🦁 Wildlife', '🌿 Nature'],
      imageUrl: 'https://images.unsplash.com/photo-1571932208282-ca5b8b7c6800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'
    },
    {
      id: 2,
      type: 'event',
      name: 'Cultural Experience Center',
      description: 'Traditional Kenyan cultural workshops and performances',
      location: 'Nairobi',
      price: '$25/person',
      status: 'pending',
      bookings: 0,
      rating: 0,
      vibes: ['🎭 Cultural', '🎵 Music', '💃 Dance'],
      imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'
    },
    {
      id: 3,
      type: 'place',
      name: 'Coastal Retreat Diani',
      description: 'Beachfront villa with stunning ocean views',
      location: 'Diani Beach',
      price: '$180/night',
      status: 'approved',
      bookings: 8,
      rating: 4.5,
      vibes: ['🏖️ Beach', '🌊 Ocean', '☀️ Relaxation'],
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'
    }
  ]);

  const [feedback] = useState([
    {
      id: 1,
      venue: 'Safari Lodge Mara',
      rating: 5,
      comment: 'Incredible experience! The staff was amazing and the location is perfect for wildlife viewing.',
      user: 'Adventure Explorer',
      date: '3 hours ago'
    },
    {
      id: 2,
      venue: 'Coastal Retreat Diani',
      rating: 4,
      comment: 'Beautiful villa with stunning ocean views. Perfect for a romantic getaway.',
      user: 'Beach Lover',
      date: '1 day ago'
    },
    {
      id: 3,
      venue: 'Safari Lodge Mara',
      rating: 5,
      comment: 'Best safari lodge experience in Kenya. Highly recommend!',
      user: 'Wildlife Photographer',
      date: '2 days ago'
    }
  ]);

  const [newListing, setNewListing] = useState({
    name: '',
    description: '',
    location: '',
    price: '',
    category: '',
    vibes: [] as string[],
    imageUrl: ''
  });

  const vibeOptions = [
    '🏨 Luxury',
    '🏖️ Beach',
    '🦁 Wildlife',
    '🌿 Nature',
    '🎭 Cultural',
    '🎵 Music',
    '💃 Dance',
    '🍽️ Food',
    '⛰️ Adventure',
    '🌊 Ocean',
    '☀️ Relaxation',
    '🏛️ Heritage'
  ];

  const handleVibeChange = (vibe: string, checked: boolean) => {
    setNewListing(prev => ({
      ...prev,
      vibes: checked 
        ? [...prev.vibes, vibe]
        : prev.vibes.filter(v => v !== vibe)
    }));
  };

  const handleCreateListing = () => {
    if (!newListing.name || !newListing.description || !newListing.location || !newListing.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Listing Submitted",
      description: "Your listing has been submitted for review and will be live once approved."
    });

    setNewListing({
      name: '',
      description: '',
      location: '',
      price: '',
      category: '',
      vibes: [],
      imageUrl: ''
    });
    setShowCreateListing(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">✓ Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">⏳ Pending Review</Badge>;
      case 'rejected':
        return <Badge variant="destructive">✗ Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleEditListing = (id: number) => {
    toast({
      title: "Edit Listing",
      description: "Edit functionality would open here with pre-filled form data."
    });
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="page-content">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Host Dashboard</h2>
            <Button 
              onClick={() => setShowCreateListing(true)}
              className="bg-kenyan-green hover:bg-kenyan-green/90 text-white px-4 py-2 rounded-xl text-sm font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Listing
            </Button>
          </div>

          {/* Host Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="bg-kenyan-green text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">My Listings</p>
                    <p className="text-2xl font-bold">{stats.totalListings}</p>
                  </div>
                  <Building className="h-6 w-6 opacity-80" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-kenyan-orange text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Total Bookings</p>
                    <p className="text-2xl font-bold">{stats.totalBookings}</p>
                  </div>
                  <Calendar className="h-6 w-6 opacity-80" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-blue-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Monthly Revenue</p>
                    <p className="text-2xl font-bold">${stats.monthlyRevenue}</p>
                  </div>
                  <TrendingUp className="h-6 w-6 opacity-80" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-purple-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Avg Rating</p>
                    <p className="text-2xl font-bold">{stats.averageRating}</p>
                  </div>
                  <Star className="h-6 w-6 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Host Tabs */}
          <Tabs defaultValue="listings" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="listings">My Listings</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>

            {/* My Listings */}
            <TabsContent value="listings" className="space-y-4">
              {myListings.map((listing) => (
                <Card key={listing.id}>
                  <CardContent className="p-0">
                    <div className="flex">
                      <img 
                        src={listing.imageUrl} 
                        alt={listing.name}
                        className="w-24 h-24 object-cover rounded-l-lg"
                      />
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-800">{listing.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{listing.description}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                              <MapPin className="h-3 w-3" />
                              <span>{listing.location}</span>
                              <DollarSign className="h-3 w-3 ml-2" />
                              <span>{listing.price}</span>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditListing(listing.id)}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {listing.vibes.map((vibe) => (
                            <Badge key={vibe} variant="outline" className="text-xs">
                              {vibe}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm">
                            {getStatusBadge(listing.status)}
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3 text-gray-500" />
                              <span className="text-gray-600">{listing.bookings} bookings</span>
                            </div>
                            {listing.rating > 0 && (
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span className="text-gray-600">{listing.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Feedback */}
            <TabsContent value="feedback" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {feedback.map((item) => (
                    <div key={item.id} className="p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{item.venue}</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${
                                i < item.rating 
                                  ? 'text-yellow-500 fill-current' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">"{item.comment}"</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>From: {item.user}</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Create Listing Modal */}
      <Dialog open={showCreateListing} onOpenChange={setShowCreateListing}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Listing</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>Listing Type</Label>
              <Select 
                value={listingType} 
                onValueChange={(value: 'place' | 'event') => setListingType(value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="place">Place/Venue</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="name">
                {listingType === 'place' ? 'Place Name' : 'Event Title'}
              </Label>
              <Input
                id="name"
                value={newListing.name}
                onChange={(e) => setNewListing(prev => ({ ...prev, name: e.target.value }))}
                placeholder={listingType === 'place' ? 'Enter place name' : 'Enter event title'}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newListing.description}
                onChange={(e) => setNewListing(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your listing..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newListing.location}
                onChange={(e) => setNewListing(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Enter location"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                value={newListing.price}
                onChange={(e) => setNewListing(prev => ({ ...prev, price: e.target.value }))}
                placeholder={listingType === 'place' ? 'e.g., $150/night' : 'e.g., $25/person'}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select 
                value={newListing.category} 
                onValueChange={(value) => setNewListing(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {listingType === 'place' ? (
                    <>
                      <SelectItem value="safari">Safari</SelectItem>
                      <SelectItem value="beach">Beach</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                      <SelectItem value="adventure">Adventure</SelectItem>
                      <SelectItem value="nature">Nature</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="recreational">Recreational</SelectItem>
                      <SelectItem value="functional">Functional</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Vibes/Tags</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {vibeOptions.map((vibe) => (
                  <div key={vibe} className="flex items-center space-x-2">
                    <Checkbox
                      id={vibe}
                      checked={newListing.vibes.includes(vibe)}
                      onCheckedChange={(checked) => handleVibeChange(vibe, checked as boolean)}
                    />
                    <Label htmlFor={vibe} className="text-sm">
                      {vibe}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={newListing.imageUrl}
                onChange={(e) => setNewListing(prev => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="Enter image URL"
                className="mt-1"
              />
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={() => setShowCreateListing(false)}
                variant="outline" 
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateListing}
                className="flex-1 bg-kenyan-green hover:bg-kenyan-green/90 text-white"
              >
                Submit for Review
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <BottomNavigation />
    </div>
  );
}
