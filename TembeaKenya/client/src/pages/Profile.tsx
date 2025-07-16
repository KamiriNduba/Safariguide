import { useState } from 'react';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Profile() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    travelStyle: user?.travelStyle || '',
    interests: user?.interests || [],
    budgetRange: user?.budgetRange || '',
    accessibilityPreferences: user?.accessibilityPreferences || []
  });

  const interests = [
    '🦁 Wildlife',
    '🎭 Culture', 
    '🏖️ Beaches',
    '⛰️ Mountains',
    '🍽️ Food',
    '🎵 Music',
    '🎨 Art',
    '🌿 Nature',
    '🏛️ Heritage',
    '💃 Dance'
  ];

  const accessibilityOptions = [
    'Wheelchair accessible venues',
    'Audio descriptions',
    'Sign language interpretation',
    'Large print materials',
    'Quiet spaces available'
  ];

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }));
  };

  const handleAccessibilityChange = (option: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      accessibilityPreferences: checked 
        ? [...prev.accessibilityPreferences, option]
        : prev.accessibilityPreferences.filter(p => p !== option)
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    toast({
      title: "Profile Updated",
      description: "Your preferences have been saved successfully!"
    });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="page-content">
        <div className="px-4 py-6">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-kenyan-green to-kenyan-orange rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{user?.name || 'Explorer'}</h2>
            <p className="text-gray-500">Kenya Travel Enthusiast</p>
            <p className="text-sm text-kenyan-green font-medium capitalize">{user?.role} Account</p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  className="w-full"
                />
              </div>

              {/* Travel Style */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Travel Style
                </Label>
                <Select 
                  value={formData.travelStyle} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, travelStyle: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your travel style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adventure">Adventure Seeker</SelectItem>
                    <SelectItem value="cultural">Cultural Explorer</SelectItem>
                    <SelectItem value="relaxation">Relaxation Focused</SelectItem>
                    <SelectItem value="budget">Budget Traveler</SelectItem>
                    <SelectItem value="luxury">Luxury Traveler</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Interests */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-3">
                  Interests
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {interests.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest}
                        checked={formData.interests.includes(interest)}
                        onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                      />
                      <Label htmlFor={interest} className="text-sm">
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range (per day)
                </Label>
                <Select 
                  value={formData.budgetRange} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, budgetRange: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="$20 - $50">$20 - $50</SelectItem>
                    <SelectItem value="$50 - $100">$50 - $100</SelectItem>
                    <SelectItem value="$100 - $200">$100 - $200</SelectItem>
                    <SelectItem value="$200 - $500">$200 - $500</SelectItem>
                    <SelectItem value="$500+">$500+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Accessibility Preferences */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-3">
                  Accessibility Preferences
                </Label>
                <div className="space-y-2">
                  {accessibilityOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={option}
                        checked={formData.accessibilityPreferences.includes(option)}
                        onCheckedChange={(checked) => handleAccessibilityChange(option, checked as boolean)}
                      />
                      <Label htmlFor={option} className="text-sm">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleSave}
                  className="w-full bg-kenyan-green hover:bg-kenyan-green/90 text-white"
                >
                  Save Profile
                </Button>
                
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full border-kenyan-red text-kenyan-red hover:bg-kenyan-red/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
}
