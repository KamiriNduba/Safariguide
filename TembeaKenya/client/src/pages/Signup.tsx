import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Building, ArrowLeft, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [userType, setUserType] = useState<'traveler' | 'host' | null>(null);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Common fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // Traveler specific fields
  const [travelStyle, setTravelStyle] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState('');
  const [accessibilityPreferences, setAccessibilityPreferences] = useState<string[]>([]);
  
  // Host specific fields
  const [venueName, setVenueName] = useState('');
  const [venueType, setVenueType] = useState('');
  const [venueLocation, setVenueLocation] = useState('');
  const [venueDescription, setVenueDescription] = useState('');
  const [venuePhotos, setVenuePhotos] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState('');

  const interestOptions = ['Wildlife', 'Culture', 'Adventure', 'Beach', 'Food', 'Photography', 'History', 'Nature'];
  const accessibilityOptions = ['Wheelchair Access', 'Audio Guides', 'Visual Aids', 'Mobility Support'];
  const venueTypes = ['Hotel', 'Restaurant', 'Tour Company', 'Activity Center', 'Cultural Site', 'Nature Reserve'];

  const handleInterestToggle = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleAccessibilityToggle = (option: string) => {
    setAccessibilityPreferences(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const handlePhotoAdd = () => {
    // Simulate photo upload - in real app would handle file upload
    const photoUrls = [
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400',
      'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400',
      'https://images.unsplash.com/photo-1571919743851-2a3ba57307cc?w=400',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
    ];
    const randomPhoto = photoUrls[Math.floor(Math.random() * photoUrls.length)];
    if (venuePhotos.length < 3) {
      setVenuePhotos([...venuePhotos, randomPhoto]);
    }
  };

  const handlePhotoRemove = (index: number) => {
    setVenuePhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Simulate account creation - in real app would call API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Account Created!",
        description: `Welcome to Tembea Kenya, ${name}!`,
      });
      
      // Redirect to login
      setLocation('/login');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateStep = () => {
    if (step === 1) {
      return username && password && name && email;
    }
    if (userType === 'traveler') {
      return travelStyle && interests.length > 0;
    }
    if (userType === 'host') {
      return venueName && venueType && venueLocation && venueDescription;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kenyan-green via-kenyan-orange to-kenyan-red flex flex-col">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Join Tembea Kenya</h1>
          <p className="text-white/90">Create your account to start exploring</p>
        </div>
        
        <Card className="bg-white/95 backdrop-blur-sm max-w-md mx-auto w-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              {(userType || step > 1) && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    if (step > 1) {
                      setStep(1);
                    } else {
                      setUserType(null);
                      setStep(1);
                    }
                  }}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <CardTitle className="text-lg">
                {!userType ? 'Choose Your Role' : 
                 step === 1 ? 'Basic Information' : 
                 userType === 'traveler' ? 'Travel Preferences' : 'Venue Details'}
              </CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {!userType ? (
              <div className="space-y-3">
                <Button 
                  onClick={() => setUserType('traveler')}
                  className="w-full bg-kenyan-green hover:bg-kenyan-green/90 text-white py-3"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  I'm a Traveler
                </Button>
                <Button 
                  onClick={() => setUserType('host')}
                  className="w-full bg-kenyan-orange hover:bg-kenyan-orange/90 text-white py-3"
                >
                  <Building className="mr-2 h-4 w-4" />
                  I'm a Host/Venue Owner
                </Button>
                <div className="text-center pt-2">
                  <Button 
                    variant="link" 
                    onClick={() => setLocation('/login')}
                    className="text-sm text-kenyan-green"
                  >
                    Already have an account? Login
                  </Button>
                </div>
              </div>
            ) : step === 1 ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                  />
                </div>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
                <Button 
                  onClick={() => setStep(2)}
                  disabled={!validateStep()}
                  className="w-full bg-kenyan-red hover:bg-kenyan-red/90 text-white"
                >
                  Continue
                </Button>
              </div>
            ) : userType === 'traveler' ? (
              <div className="space-y-4">
                <div>
                  <Label>Travel Style</Label>
                  <Select value={travelStyle} onValueChange={setTravelStyle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your travel style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adventure">Adventure Seeker</SelectItem>
                      <SelectItem value="cultural">Cultural Explorer</SelectItem>
                      <SelectItem value="relaxation">Relaxation Focused</SelectItem>
                      <SelectItem value="wildlife">Wildlife Enthusiast</SelectItem>
                      <SelectItem value="budget">Budget Traveler</SelectItem>
                      <SelectItem value="luxury">Luxury Traveler</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Interests</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {interestOptions.map(interest => (
                      <Button
                        key={interest}
                        variant={interests.includes(interest) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleInterestToggle(interest)}
                        className={interests.includes(interest) ? "bg-kenyan-green text-white" : ""}
                      >
                        {interest}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Budget Range (per day)</Label>
                  <Select value={budgetRange} onValueChange={setBudgetRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">$20-50 (Budget)</SelectItem>
                      <SelectItem value="mid">$50-100 (Mid-range)</SelectItem>
                      <SelectItem value="luxury">$100+ (Luxury)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Accessibility Preferences</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {accessibilityOptions.map(option => (
                      <Button
                        key={option}
                        variant={accessibilityPreferences.includes(option) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleAccessibilityToggle(option)}
                        className={accessibilityPreferences.includes(option) ? "bg-kenyan-orange text-white" : ""}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleSubmit}
                  disabled={!validateStep() || isLoading}
                  className="w-full bg-kenyan-red hover:bg-kenyan-red/90 text-white"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="venueName">Venue Name</Label>
                  <Input
                    id="venueName"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="Name of your venue"
                  />
                </div>

                <div>
                  <Label>Venue Type</Label>
                  <Select value={venueType} onValueChange={setVenueType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select venue type" />
                    </SelectTrigger>
                    <SelectContent>
                      {venueTypes.map(type => (
                        <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="venueLocation">Location</Label>
                  <Input
                    id="venueLocation"
                    value={venueLocation}
                    onChange={(e) => setVenueLocation(e.target.value)}
                    placeholder="City, Region"
                  />
                </div>

                <div>
                  <Label htmlFor="venueDescription">Description</Label>
                  <Textarea
                    id="venueDescription"
                    value={venueDescription}
                    onChange={(e) => setVenueDescription(e.target.value)}
                    placeholder="Describe your venue, services, and what makes it special"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Price Range</Label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">$ (Budget-friendly)</SelectItem>
                      <SelectItem value="moderate">$$ (Moderate)</SelectItem>
                      <SelectItem value="premium">$$$ (Premium)</SelectItem>
                      <SelectItem value="luxury">$$$$ (Luxury)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Venue Photos (max 3)</Label>
                  <div className="space-y-2">
                    {venuePhotos.length < 3 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePhotoAdd}
                        className="w-full border-dashed"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Add Sample Photo
                      </Button>
                    )}
                    {venuePhotos.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {venuePhotos.map((photo, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={photo} 
                              alt={`Venue ${index + 1}`}
                              className="w-full h-20 object-cover rounded"
                            />
                            <Button
                              size="sm"
                              variant="destructive"
                              className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0"
                              onClick={() => handlePhotoRemove(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  onClick={handleSubmit}
                  disabled={!validateStep() || isLoading}
                  className="w-full bg-kenyan-red hover:bg-kenyan-red/90 text-white"
                >
                  {isLoading ? 'Creating Account...' : 'Create Host Account'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}