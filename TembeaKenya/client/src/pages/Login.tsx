import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [userType, setUserType] = useState<'traveler' | 'host' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!userType || !username || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(username, password, userType);
      if (success) {
        // Redirect based on user type
        if (username === 'Administrator') {
          setLocation('/admin');
        } else if (userType === 'host') {
          setLocation('/host');
        } else {
          setLocation('/places');
        }
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kenyan-green via-kenyan-orange to-kenyan-red flex flex-col">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Tembea Kenya</h1>
          <p className="text-white/90 text-lg">Discover Kenya's Culture & Adventures</p>
        </div>
        
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Welcome! Choose Your Role
            </h2>
            
            {!userType ? (
              <div className="space-y-3">
                <Button 
                  onClick={() => setUserType('traveler')}
                  className="w-full bg-kenyan-green hover:bg-kenyan-green/90 text-white font-medium py-3 px-4 rounded-xl"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  I'm a Traveler
                </Button>
                <Button 
                  onClick={() => setUserType('host')}
                  className="w-full bg-kenyan-orange hover:bg-kenyan-orange/90 text-white font-medium py-3 px-4 rounded-xl"
                >
                  <Building className="mr-2 h-4 w-4" />
                  I'm a Host/Venue Owner
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kenyan-green focus:border-transparent"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kenyan-green focus:border-transparent"
                />
                <Button 
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full bg-kenyan-red hover:bg-kenyan-red/90 text-white font-medium py-3 px-4 rounded-xl"
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
                <div className="text-center space-y-2">
                  <p className="text-xs text-gray-600">
                    Admin access: Username: Administrator, Password: 1234567890
                  </p>
                  <div className="flex flex-col gap-1">
                    <Button 
                      variant="link" 
                      onClick={() => setUserType(null)}
                      className="text-xs text-kenyan-green"
                    >
                      Choose different role
                    </Button>
                    <Button 
                      variant="link" 
                      onClick={() => setLocation('/signup')}
                      className="text-xs text-kenyan-orange"
                    >
                      Don't have an account? Sign up
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
