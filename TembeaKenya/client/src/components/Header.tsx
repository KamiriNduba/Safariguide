import { useAuth } from '../hooks/useAuth';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-kenyan-green to-kenyan-orange rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">TK</span>
        </div>
        <div>
          <h1 className="font-semibold text-gray-800">
            Welcome, {user?.name || 'Explorer'}!
          </h1>
          <p className="text-xs text-gray-500">Discover Kenya's Magic</p>
        </div>
      </div>
      <Button variant="ghost" size="sm" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
        <Bell className="h-4 w-4 text-gray-600" />
      </Button>
    </header>
  );
}
