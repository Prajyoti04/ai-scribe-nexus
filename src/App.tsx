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

// Sample article data
const sampleArticles = [
  {
    id: "sample-1",
    title: "Building Scalable Microservices with Go and Kubernetes",
    excerpt: "Learn how to design and implement a highly scalable microservice architecture using Go, Kubernetes, and the latest cloud-native technologies.",
    cover: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?q=80&w=1080&auto=format&fit=crop",
    author: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=32",
      id: "sarah-johnson"
    },
    publishDate: "Apr 15, 2025",
    readTime: 12,
    tags: ["golang", "kubernetes", "microservices", "cloud"],
    likes: 254,
    views: 2489,
    comments: 27,
    trending: true,
    aiEnhanced: true
  },
  {
    id: "sample-2",
    title: "WebGPU: The Future of Graphics Programming on the Web",
    excerpt: "Learn how WebGPU is transforming graphics and parallel computing on the web with modern GPU access.",
    cover: "https://images.unsplash.com/photo-1628277613967-6abca504d0ac?q=80&w=1080&auto=format&fit=crop",
    author: {
      name: "Lila Patel",
      avatar: "https://i.pravatar.cc/150?img=17",
      id: "lila-patel"
    },
    publishDate: "Apr 12, 2025",
    readTime: 10,
    tags: ["webgpu", "graphics", "javascript", "game-dev"],
    likes: 611,
    views: 9872,
    comments: 31,
    trending: true
  }
];

// Initialize articles storage if not exists
const initializeStorage = () => {
  // Initialize articles storage
  if (!localStorage.getItem("techoh-articles")) {
    localStorage.setItem("techoh-articles", JSON.stringify(sampleArticles));
  } else {
    // Check if sample articles exist, add them if not
    const existingArticles = JSON.parse(localStorage.getItem("techoh-articles") || "[]");
    if (existingArticles.length === 0) {
      localStorage.setItem("techoh-articles", JSON.stringify(sampleArticles));
    }
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

const App = () => {
  useEffect(() => {
    // Initialize storage on app load
    initializeStorage();
  }, []);

  return (
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
};

export default App;
