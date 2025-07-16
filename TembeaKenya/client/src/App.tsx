import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "./hooks/useAuth";

// Pages
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Places from "@/pages/Places";
import Events from "@/pages/Events";
import Chatbot from "@/pages/Chatbot";
import Collections from "@/pages/Collections";
import Profile from "@/pages/Profile";
import Community from "@/pages/Community";
import AdminDashboard from "@/pages/AdminDashboard";
import HostDashboard from "@/pages/HostDashboard";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-kenyan-green to-kenyan-orange rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
            <span className="text-white font-bold">TK</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Redirect to="/login" />;
  }
  
  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user || user.role !== 'admin') {
    return <Redirect to="/places" />;
  }
  
  return <>{children}</>;
}

function HostRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user || user.role !== 'host') {
    return <Redirect to="/places" />;
  }
  
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (user) {
    // Redirect based on user role
    if (user.role === 'admin') {
      return <Redirect to="/admin" />;
    } else if (user.role === 'host') {
      return <Redirect to="/host" />;
    } else {
      return <Redirect to="/places" />;
    }
  }
  
  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/login">
        <PublicRoute>
          <Login />
        </PublicRoute>
      </Route>
      
      <Route path="/signup">
        <PublicRoute>
          <Signup />
        </PublicRoute>
      </Route>
      
      {/* Default redirect to login */}
      <Route path="/">
        <Redirect to="/login" />
      </Route>
      
      {/* Protected Routes */}
      <Route path="/places">
        <ProtectedRoute>
          <Places />
        </ProtectedRoute>
      </Route>
      
      <Route path="/events">
        <ProtectedRoute>
          <Events />
        </ProtectedRoute>
      </Route>
      
      <Route path="/chatbot">
        <ProtectedRoute>
          <Chatbot />
        </ProtectedRoute>
      </Route>
      
      <Route path="/collections">
        <ProtectedRoute>
          <Collections />
        </ProtectedRoute>
      </Route>
      
      <Route path="/community">
        <ProtectedRoute>
          <Community />
        </ProtectedRoute>
      </Route>
      
      <Route path="/profile">
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      </Route>
      
      {/* Admin Routes */}
      <Route path="/admin">
        <ProtectedRoute>
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        </ProtectedRoute>
      </Route>
      
      {/* Host Routes */}
      <Route path="/host">
        <ProtectedRoute>
          <HostRoute>
            <HostDashboard />
          </HostRoute>
        </ProtectedRoute>
      </Route>
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <div className="app-container">
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
