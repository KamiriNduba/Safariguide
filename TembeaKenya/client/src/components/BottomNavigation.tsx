import { useLocation } from 'wouter';
import { 
  MapPin, 
  Calendar, 
  MessageCircle, 
  Heart, 
  User, 
  Users,
  Shield,
  Building
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const navItems = [
  { path: '/places', icon: MapPin, label: 'Places' },
  { path: '/events', icon: Calendar, label: 'Events' },
  { path: '/chatbot', icon: MessageCircle, label: 'Assistant' },
  { path: '/collections', icon: Heart, label: 'Saved' },
  { path: '/community', icon: Users, label: 'Community' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const adminNavItems = [
  { path: '/admin', icon: Shield, label: 'Admin' },
];

const hostNavItems = [
  { path: '/host', icon: Building, label: 'Host' },
];

export function BottomNavigation() {
  const [location, setLocation] = useLocation();
  const { user } = useAuth();

  let items = navItems;
  if (user?.role === 'admin') {
    items = [...navItems.slice(0, 4), ...adminNavItems];
  } else if (user?.role === 'host') {
    items = [...navItems.slice(0, 4), ...hostNavItems, navItems[5]];
  }

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200">
      <div className="flex items-center justify-around py-2">
        {items.map(({ path, icon: Icon, label }) => {
          const isActive = location === path;
          return (
            <button
              key={path}
              onClick={() => setLocation(path)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-colors ${
                isActive
                  ? 'text-kenyan-green bg-kenyan-green/10'
                  : 'text-gray-600 hover:text-kenyan-green'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
