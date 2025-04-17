
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ArticleCreate from "./pages/ArticleCreate";
import ArticleView from "./pages/ArticleView";
import Users from "./pages/Users";
import Trending from "./pages/Trending";
import NotFound from "./pages/NotFound";
import SavedArticles from "./pages/SavedArticles";
import LatestArticles from "./pages/LatestArticles";
import TopRatedArticles from "./pages/TopRatedArticles";

const queryClient = new QueryClient();

// Initialize articles storage if not exists
const initializeStorage = () => {
  // Initialize articles storage
  if (!localStorage.getItem("techoh-articles")) {
    localStorage.setItem("techoh-articles", JSON.stringify([]));
  }
  
  // Initialize comments storage
  if (!localStorage.getItem("techoh-comments")) {
    localStorage.setItem("techoh-comments", JSON.stringify([]));
  }
  
  // Initialize liked articles storage
  if (!localStorage.getItem("techoh-liked-articles")) {
    localStorage.setItem("techoh-liked-articles", JSON.stringify([]));
  }
  
  // Initialize saved articles storage
  if (!localStorage.getItem("techoh-saved-articles")) {
    localStorage.setItem("techoh-saved-articles", JSON.stringify([]));
  }
};

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Initialize storage on app load
    initializeStorage();
    
    const user = localStorage.getItem("techoh-user");
    setIsAuthenticated(!!user);
  }, []);

  if (isAuthenticated === null) {
    // Still checking authentication
    return null;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route path="/profile/:id" element={<Profile />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create" 
            element={
              <ProtectedRoute>
                <ArticleCreate />
              </ProtectedRoute>
            } 
          />
          <Route path="/article/:id" element={<ArticleView />} />
          <Route path="/users" element={<Users />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/latest" element={<LatestArticles />} />
          <Route path="/top-rated" element={<TopRatedArticles />} />
          <Route 
            path="/bookmarks" 
            element={
              <ProtectedRoute>
                <SavedArticles />
              </ProtectedRoute>
            } 
          />
          {/* Temporarily redirect Edit Profile requests to dashboard since we don't have that page yet */}
          <Route 
            path="/edit-profile" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
