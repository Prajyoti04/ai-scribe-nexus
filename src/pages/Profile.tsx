
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

    // Get user articles from localStorage
    const storedArticles = localStorage.getItem("techoh-articles");
    if (storedArticles) {
      const parsedArticles = JSON.parse(storedArticles);
      // Filter articles by the user ID we're viewing
      const userID = id || (currentUser ? currentUser.id : null);
      if (userID) {
        const filteredArticles = parsedArticles.filter(
          (article: Article) => article.author.id === userID
        );
        setUserArticles(filteredArticles);
        
        // Update article count in user data
        if (userID) {
          setUserData(prevUser => ({
            ...prevUser,
            articles: filteredArticles.length
          }));
        }
      }
    }
  }, [id]);

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
                <TabsTrigger value="articles">Articles ({userData.articles || 0})</TabsTrigger>
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
                    <p className="text-muted-foreground">
                      {isCurrentUser 
                        ? "You haven't published any articles yet. Click 'New Article' to create your first article!"
                        : "This user hasn't published any articles yet."}
                    </p>
                    {isCurrentUser && (
                      <div className="mt-4">
                        <Button asChild>
                          <Link to="/create">Create New Article</Link>
                        </Button>
                      </div>
                    )}
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
