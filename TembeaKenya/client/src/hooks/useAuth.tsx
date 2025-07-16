import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, userType: 'traveler' | 'host') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('tembeaKenya_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string, userType: 'traveler' | 'host'): Promise<boolean> => {
    // Admin login
    if (username === 'Administrator' && password === '1234567890') {
      const adminUser: User = {
        id: 'admin-1',
        username: 'Administrator',
        name: 'System Administrator',
        role: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem('tembeaKenya_user', JSON.stringify(adminUser));
      return true;
    }

    // Simulated login for demo purposes
    if (username && password) {
      const demoUser: User = {
        id: `${userType}-1`,
        username,
        name: username === 'host' ? 'Host User' : 'Adventure Explorer',
        role: userType,
        travelStyle: userType === 'traveler' ? 'Adventure Seeker' : undefined,
        interests: userType === 'traveler' ? ['🦁 Wildlife', '🎭 Culture', '🏖️ Beaches'] : undefined,
        budgetRange: userType === 'traveler' ? '$100 - $200' : undefined
      };
      setUser(demoUser);
      localStorage.setItem('tembeaKenya_user', JSON.stringify(demoUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tembeaKenya_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
