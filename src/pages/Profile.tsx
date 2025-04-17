import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  UserPlus,
  ExternalLink,
  Award
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

// Default user data
const defaultUserData = {
  id: "",
  name: "",
  username: "",
  email: "",
  avatar: "",
  bio: "",
  location: "",
  joinedDate: "",
  articles: 0,
  followers: 0,
  following: 0,
  badges: [] as string[]
};

interface Article {
  id: string;
  title: string;
  excerpt: string;
  cover: string;
  author: {
    name: string;
    avatar: string;
    id: string;
  };
  publishDate: string;
  readTime: number;
  tags: string[];
  likes: number;
  views: number;
  comments: number;
  trending?: boolean;
  aiEnhanced?: boolean;
}

export default function Profile() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [userData, setUserData] = useState(defaultUserData);
  const [userArticles, setUserArticles] = useState<Article[]>([]);
  const { id } = useParams();

  // Define mock articles for the user
  const mockArticles = [
    {
      id: "1",
      title: "Getting Started with Kubernetes",
      excerpt: "A beginner's guide to understanding and deploying Kubernetes clusters",
      cover: `https://images.unsplash.com/photo-1649972904349-6e44c42644a7`, // Using a placeholder image
      author: {
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?img=32",
        id: "user1"
      },
      publishDate: "April 15, 2025",
      readTime: 7,
      tags: ["kubernetes", "devops", "cloud"],
      likes: 142,
      views: 3526,
      comments: 24,
      trending: true,
      aiEnhanced: true
    },
    {
      id: "2",
      title: "Advanced React Performance Optimization",
      excerpt: "Techniques to improve your React application's rendering and load times",
      cover: `https://images.unsplash.com/photo-1488590528505-98d2b5aba04b`, // Using a placeholder image
      author: {
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?img=32",
        id: "user1"
      },
      publishDate: "March 22, 2025",
      readTime: 5,
      tags: ["react", "performance", "web-development"],
      likes: 87,
      views: 2103,
      comments: 15,
      aiEnhanced: true
    },
    {
      id: "3",
      title: "Building Scalable Microservices with Go",
      excerpt: "Design patterns and best practices for creating robust microservice architectures",
      cover: `https://images.unsplash.com/photo-1461749280684-dccba630e2f6`, // Using a placeholder image
      author: {
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?img=32",
        id: "user1"
      },
      publishDate: "February 10, 2025",
      readTime: 9,
      tags: ["go", "microservices", "backend"],
      likes: 213,
      views: 4507,
      comments: 37,
      trending: true
    }
  ];

  useEffect(() => {
    // Get user data from localStorage
    const currentUser = JSON.parse(localStorage.getItem("techoh-user") || "null");
    
    if (currentUser) {
      setIsAuthenticated(true);
      
      // If no ID is provided in the URL, show the current user's profile
      if (!id) {
        setUserData(currentUser);
        setIsCurrentUser(true);
      } else {
        // If ID is provided, check if it matches the current user's ID
        if (id === currentUser.id) {
          setUserData(currentUser);
          setIsCurrentUser(true);
        } else {
          // If ID doesn't match current user, find the user with that ID
          const allUsers = JSON.parse(localStorage.getItem("techoh-users") || "[]");
          const profileUser = allUsers.find((user: any) => user.id === id);
          
          if (profileUser) {
            setUserData(profileUser);
            setIsCurrentUser(false);
          } else {
            // If no user found with that ID, fallback to showing current user
            setUserData(currentUser);
            setIsCurrentUser(true);
          }
        }
      }
    } else {
      setIsAuthenticated(false);
      
      // If no user is logged in but ID is provided, try to find that user
      if (id) {
        const allUsers = JSON.parse(localStorage.getItem("techoh-users") || "[]");
        const profileUser = allUsers.find((user: any) => user.id === id);
        
        if (profileUser) {
          setUserData(profileUser);
        }
      }
    }

    // When it's the current user's profile, set the mock articles
    if (isCurrentUser) {
      setUserData(prevUser => ({
        ...prevUser,
        articles: mockArticles.length
      }));
      setUserArticles(mockArticles);
    }
  }, [id, isCurrentUser]);

  return (
    <Layout isAuthenticated={isAuthenticated}>
      <div className="container max-w-5xl py-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="w-full lg:w-1/3">
            <Card className="space-y-4">
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-2xl font-semibold">{userData.name}</h2>
                <p className="text-muted-foreground">@{userData.username}</p>
              </div>
              <div className="flex flex-col gap-2 px-6 pb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{userData.location || "Earth"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Joined {userData.joinedDate}</span>
                </div>
                <p className="text-sm">{userData.bio || "No bio available."}</p>
                <div className="mt-4 flex items-center justify-center gap-4">
                  {isCurrentUser ? (
                    <Button asChild variant="outline">
                      <Link to="/edit-profile">Edit Profile</Link>
                    </Button>
                  ) : (
                    <Button variant="outline">
                      <UserPlus className="mr-2 h-4 w-4" /> Follow
                    </Button>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                    <ExternalLink className="mr-1 h-4 w-4" />
                    Portfolio
                  </Link>
                </div>
              </div>
            </Card>
            <Card className="mt-6">
              <div className="flex flex-col gap-4 p-6">
                <h3 className="text-xl font-semibold">Badges</h3>
                <div className="flex gap-2">
                  {userData.badges && userData.badges.length > 0 ? (
                    userData.badges.map((badge, index) => (
                      <Badge key={index}>{badge}</Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No badges earned yet.</p>
                  )}
                </div>
              </div>
            </Card>
          </div>
          <div className="w-full lg:w-2/3">
            <Tabs defaultValue="articles" className="w-full">
              <TabsList>
                <TabsTrigger value="articles">Articles ({userData.articles})</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="articles" className="mt-6">
                {userArticles.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {userArticles.map((article) => (
                      <Link
                        key={article.id}
                        to={`/article/${article.id}`}
                        className="group relative overflow-hidden rounded-lg border border-border/50 bg-card transition-all hover:border-border hover:shadow-md"
                      >
                        <div className="aspect-video w-full overflow-hidden">
                          <img
                            src={article.cover}
                            alt={article.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <div className="mb-3 flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={article.author.avatar} alt={article.author.name} />
                              <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">{article.author.name}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{article.publishDate}</span>
                          </div>
                          <h3 className="mb-2 line-clamp-2 font-semibold">{article.title}</h3>
                          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{article.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{article.readTime} min read</span>
                              <span>•</span>
                              <span>{article.views.toLocaleString()} views</span>
                            </div>
                            {article.aiEnhanced && (
                              <Badge variant="secondary">
                                <Award className="mr-1.5 h-3 w-3" />
                                <span>AI Enhanced</span>
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Card className="p-6">
                    <h3 className="text-lg font-medium">No articles yet</h3>
                    <p className="text-muted-foreground">This user hasn't published any articles.</p>
                  </Card>
                )}
              </TabsContent>
              <TabsContent value="activity" className="mt-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium">No activity yet</h3>
                  <p className="text-muted-foreground">This user hasn't performed any activity yet.</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
